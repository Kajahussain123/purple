import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const ViewOrders = () => {
  const [orderData,setOrderData] = useState([]);

  const handleChange = async (orderId, event, index) => {
    const status = event.target.value;
    try {
      const response = await axios.patch(
        `https://purpleecommerce.pythonanywhere.com/productsapp/orders/${orderId}/update-status/`,
        { status }
      );
      
      if (response.status === 200) {
        // Update local state to reflect the change
        const updatedOrders = [...orderData];
        updatedOrders[index] = {
          ...updatedOrders[index],
          status: status
        };
        setOrderData(updatedOrders);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const fetchOrdersData = async() => {
    try {
        const response = await axios.get('https://purpleecommerce.pythonanywhere.com/productsapp/orders/');
        if(response.status === 200){
            setOrderData(response.data.orders)
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchOrdersData()
  },[])

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5">Orders</Typography>
        {/* <TextField
          label="Search Vendors"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "300px" }}
        /> */}
        {/* <Button variant="contained" color="primary">
          Add Vendor
        </Button> */}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.user}</TableCell>
                {/* <TableCell>
                  <img
                    src={order.photo}
                    alt={order.name}
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%" }}
                  />
                </TableCell> */}
                <TableCell>{order.payment_method}</TableCell>
                <TableCell>{order.order_ids}</TableCell>
                <TableCell>
                    <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id={`status-select-label-${index}`}>status</InputLabel>
                    <Select
                      labelId={`status-select-label-${index}`}
                      id={`status-select-${index}`}
                      value={order.status ? order.status.trim() : ""}
                      label="Status"
                      onChange={(event) => handleChange(order.id, event, index)}
                    >
                      <MenuItem value="WAITING FOR CONFIRMATION">Waiting for confirmation</MenuItem>
                      <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                      <MenuItem value="OUT FOR DELIVERY">Out for delivery</MenuItem>
                      <MenuItem value="DELIVERED">Delivered</MenuItem>
                      <MenuItem value="REJECTED">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{order.order_time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedVendor?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default ViewOrders;
