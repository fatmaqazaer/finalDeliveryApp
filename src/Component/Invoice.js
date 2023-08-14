import React, { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import './InvoiceList.css';

function Invoice() {
  const { appData } = useContext(AppContext);
  const { customerId } = useParams(); 
  const customerObj = appData.customerObj || {};
  const packageObj = appData.packageObj || {};

  // show total price and Weight for customer
  const packagesForCustomer = Object.values(packageObj).filter(pkg => pkg.customerid === parseInt(customerId));
  //calculate total price and total weight
  const totalWeight = packagesForCustomer.reduce((total,pkg) => total + parseFloat(pkg.weight),0);
  const totalPrice = packagesForCustomer.reduce((total,pkg) => total + parseFloat(pkg.price),0);

  //calc package count 
  const packageCount = packagesForCustomer.length;

  //get Date
  const randomDate = new Date(Math.random() * 1000);
  const day = randomDate.getDate();
  const month = randomDate.getMonth() + 1; // Months are 0-based
  const year = randomDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  //generated id of invoice 
  const generatedId  = `${customerId}`;

    return (
      <div className="invoice-list-container">
      <div className="header">
        <div>
          <p>Date: {formattedDate}</p>
          <p>Customer Name: {customerObj[customerId]}</p>
        </div>
        <div>
          <p>Invoice</p>
          <p>No. {generatedId}</p>
        </div>
        </div>

        <TableContainer component={Paper} className="table-container">
          <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
              <TableRow>
                <TableCell >Package ID</TableCell>
                <TableCell >Weight</TableCell>
                <TableCell >Price</TableCell>
              </TableRow>
              {packagesForCustomer.map(pkg => (
                <TableRow key={pkg.id}>
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell>{pkg.weight}</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                </TableRow>
              ))}
               <TableRow>
              <TableCell colSpan={1}></TableCell>
              <TableCell>{totalWeight.toFixed(2)}</TableCell>
              <TableCell>Total :{totalPrice.toFixed(2)}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <div  className="Text">
        <p>You received {packageCount} packages</p>
        <p> Thank you for using our services</p>
      </div>
    </div>
   
  );
}

export default Invoice;
