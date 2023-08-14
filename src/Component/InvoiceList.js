import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AppContext } from "../context/AppContext";

function InvoiceList() {
  const { appData } = useContext(AppContext);
  const packageObj = appData.packageObj || {};

  // Calculate total price and total weight for each customer
  const customerInvoices = Object.keys(appData.customerObj).map(
    (customerId) => {
      const customerName = appData.customerObj[customerId];
      const packagesForCustomer = Object.values(packageObj).filter(
        (pkg) => pkg.customerid === parseInt(customerId)
      );
      //calculate total price and total weight
      const totalWeight = packagesForCustomer.reduce(
        (total, pkg) => total + parseFloat(pkg.weight),
        0
      );
      const totalPrice = packagesForCustomer.reduce(
        (total, pkg) => total + parseFloat(pkg.price),
        0
      );

      return {
        customerName,
        totalPrice,
        totalWeight,
      };
    }
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="invoice table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Total Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerInvoices.map((invoice) => (
            <TableRow key={invoice.customerName}>
              <TableCell>{invoice.customerName}</TableCell>
              <TableCell>{invoice.totalPrice}</TableCell>
              <TableCell>{invoice.totalWeight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InvoiceList;
