import React, { useContext, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AppContext } from '../context/AppContext';

function AddPackage({ isOpen, onClose, onAddPackage }) {
  const { appData } = useContext(AppContext);


  const getRandomId = () => {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  };
  
  const [newPackage, setNewPackage] = useState({
    customerid : 0,
    weight: 0,
    price: 0,
    shippingOrder: 0,
    id: getRandomId(),
  });
  const handleAddClick = () => {
    onAddPackage(newPackage);
    setNewPackage({
      customerid : 0,
      weight: 0,
      price: 0,
      shippingOrder: 0,
      id: getRandomId(),
        });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Package</DialogTitle>
      <DialogContent>
        <TextField
          label="ID"
          value={newPackage.id}
          onChange={(e) => setNewPackage({ ...newPackage, id: e.target.value })}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="customer-name">Customer Name</InputLabel>
          <Select
            value={newPackage.customerName}
            onChange={(e) => setNewPackage({ ...newPackage, customerid: e.target.value })}
            inputProps={{ id: 'customer-name' }}
          >
            {appData.customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Weight"
          value={newPackage.weight}
          onChange={(e) => setNewPackage({ ...newPackage, weight: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          value={newPackage.price}
          onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Shipping Order"
          value={newPackage.shippingOrder}
          onChange={(e) => setNewPackage({ ...newPackage, shippingOrder: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddClick}>
          Add Package
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddPackage;
