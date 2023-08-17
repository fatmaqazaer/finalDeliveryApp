import React, { useContext, useState} from "react";
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
import { AppContext } from '../context/AppContext';
import AddPackage from "./AddPackage";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

function PackageList() {
  const {
    appData,
    handleAddPackage,
    moveRow,
  } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const packages = appData.packages;
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
          {packages.map((row, currentIndex) => (
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
              <TableCell>
                {row.id ? appData.customerObj[row.customerid] : ""}
              </TableCell>
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
                  disabled={currentIndex === packages.length - 1}
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
