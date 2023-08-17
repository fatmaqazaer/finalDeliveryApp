import React, { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from '@mui/material';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import './InvoiceList.css';

function Invoice() {
  const { appData, getInvoiceByCustomerId } = useContext(AppContext);
  const { customerId } = useParams();
  const { customer, packagesForCustomer, totalWeight, totalPrice } = getInvoiceByCustomerId(customerId);

 //get Date
  const randomDate = new Date(Math.random() * 1000);
  const day = randomDate.getDate();
  const month = randomDate.getMonth() + 1; 
  const year = randomDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  //generated id of invoice 
  const generatedId  = `${customerId}`;

    return (
      <div className="invoice-list-container">
       <div className="header">
        <div>
          <p>Date: {formattedDate}</p>
          <p>Customer Name:  {customer ? customer.name : ""}</p>
        </div>
        <div>
          <p>Invoice</p>
          <p>No. {generatedId}</p>
        </div>
        </div>

        <TableContainer component={Paper} className="table-container">
          <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
          <TableBody>
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
              <TableCell> {totalWeight.toFixed(2)}</TableCell>
              <TableCell>Total : {totalPrice.toFixed(2)}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
        <div  className="Text">
        <p>You received {packagesForCustomer.length} packages</p>
        <p> Thank you for using our services</p>
      </div> 
   
          </div>
        );
      }
      
export default Invoice;
