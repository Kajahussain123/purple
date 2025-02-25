import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const vendorsData = [
    { id: 1, name: 'John Doe', photo: 'https://via.placeholder.com/50', phone: '123-456-7890', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', photo: 'https://via.placeholder.com/50', phone: '987-654-3210', email: 'janesmith@example.com' }
];

const ViewVendors = () => {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    const handleDeleteClick = (vendor) => {
        setSelectedVendor(vendor);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVendor(null);
    };

    const handleConfirmDelete = () => {
        console.log("Deleting vendor: ", selectedVendor);
        handleClose();
    };

    const filteredVendors = vendorsData.filter(vendor =>
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h5">View Vendors</Typography>
                <TextField
                    label="Search Vendors"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: '300px' }}
                />
                <Button variant="contained" color="primary">Add Vendor</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Request</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredVendors.map((vendor, index) => (
                            <TableRow key={vendor.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{vendor.name}</TableCell>
                                <TableCell>
                                    <img src={vendor.photo} alt={vendor.name} width="40" height="40" style={{ borderRadius: '50%' }} />
                                </TableCell>
                                <TableCell>{vendor.phone}</TableCell>
                                <TableCell>{vendor.email}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="success" size="small">Accept</Button>
                                    <Button variant="outlined" color="error" size="small" sx={{ marginLeft: 1 }}>Reject</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" size="small">View</Button>
                                    <Button variant="outlined" color="secondary" size="small" sx={{ marginLeft: 1 }}>Edit</Button>
                                    <Button variant="outlined" color="secondary" size="small" sx={{ marginLeft: 1 }} onClick={() => handleDeleteClick(vendor)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Confirmation Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {selectedVendor?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ViewVendors;
