import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AppContext } from "../context/AppContext";
import AddPackage from "./AddPackage";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

function PackageList() {
  const { appData, addPackage, CustomerData } = useContext(AppContext);

  const packages = appData.packages;
  //add new package
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sortedPackages, setSortedPackages] = useState([...packages]);

  // Add new package
  const handleAddPackage = (newPackage) => {
    const updatedPackages = [...sortedPackages, newPackage];
    const packagesWithUpdatedShippingOrder =
      updateShippingOrder(updatedPackages);
    setSortedPackages(packagesWithUpdatedShippingOrder);
    addPackage(newPackage);
    console.log(newPackage);
  };

  //handle Up and down buttons for packages
  const updateShippingOrder = (packages) => {
    return packages.map((pkg, index) => {
      return { ...pkg, shippingOrder: index + 1 };
    });
  };

  const moveRow = (currentIndex, newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    }
    if (newIndex >= sortedPackages.length) {
      newIndex = sortedPackages.length - 1;
    }

    const updatedPackages = [...sortedPackages];
    const [movedItem] = updatedPackages.splice(currentIndex, 1);
    updatedPackages.splice(newIndex, 0, movedItem);
    const packagesWithUpdatedShippingOrder =
      updateShippingOrder(updatedPackages);
    setSortedPackages(packagesWithUpdatedShippingOrder);
  };
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, justifyContent: "center", alignItems: "center" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>shippingOrder</TableCell>
            <TableCell>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsModalOpen(true)}
              >
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPackages.map((row, currentIndex) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{CustomerData[row.customerid]}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.shippingOrder}</TableCell>

              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => moveRow(currentIndex, currentIndex - 1)}
                  disabled={currentIndex === 0}
                >
                  <ArrowUpward />
                </Button>
                <span style={{ width: "5px" }}> </span>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => moveRow(currentIndex, currentIndex + 1)}
                  disabled={currentIndex === sortedPackages.length - 1}
                >
                  <ArrowDownward />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <AddPackage
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddPackage={handleAddPackage}
        />
      </Table>
    </TableContainer>
  );
}

export default PackageList;
