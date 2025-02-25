import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Switch } from '@mui/material';
import { acceptReject, viewVendors, editVendor, enableDisableVendor } from '../../Services/allApi';
import EditVendorModal from './EditVendorModal'; // Import the EditVendorModal component
import { useNavigate } from 'react-router-dom';
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material';

const ViewVendors = () => {
    const [search, setSearch] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false); // State for edit modal
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [vendors, setVendors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getVendors = async () => {
            try {
                const data = await viewVendors();

                if (data && Array.isArray(data.vendors)) {
                    setVendors(data.vendors); // Extract the 'vendors' array
                } else {
                    console.error("Invalid vendors data:", data);
                    setVendors([]); // Fallback to empty array if response is not valid
                }
            } catch (error) {
                console.error("Failed to fetch vendors:", error);
                setVendors([]); // Ensure `vendors` is always an array
            }
        };
        getVendors();
    }, []);


    const handleAcceptReject = async (id, isApproved) => {
        try {
            const updatedVendor = await acceptReject(id, { is_approved: isApproved });
            setVendors(vendors.map(v => v.id === id ? { ...v, is_approved: isApproved } : v));
        } catch (error) {
            console.error("Failed to update vendor status:", error);
        }
    };

    const handleDeleteClick = (vendor) => {
        setSelectedVendor(vendor);
        setOpenDeleteModal(true);
    };

    const handleEditClick = (vendor) => {
        setSelectedVendor(vendor);
        setOpenEditModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedVendor(null);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedVendor(null);
    };

    const handleToggleEnableDisable = async (id, isEnable) => {
        try {
            const reqBody = { is_active: isEnable };
            const updatedVendor = await enableDisableVendor(id, reqBody);
    
            // Update the vendor's is_enable status in the state
            setVendors(vendors.map(v => v.id === id ? { ...v, is_active: isEnable } : v));
        } catch (error) {
            console.error("Failed to toggle vendor status:", error);
        }
    };

    const handleConfirmDelete = () => {
        console.log("Deleting vendor: ", selectedVendor);
        handleCloseDeleteModal();
    };

    const handleSaveEdit = async (id, updatedData) => {
        try {
            const originalVendor = vendors.find(v => v.id === id);
            const changes = {};

            // Compare each field and add to changes if modified
            if (updatedData.name !== originalVendor.name) changes.name = updatedData.name;
            if (updatedData.contact_number !== originalVendor.contact_number) changes.contact_number = updatedData.contact_number;
            if (updatedData.whatsapp_number !== originalVendor.whatsapp_number) changes.whatsapp_number = updatedData.whatsapp_number;
            if (updatedData.email !== originalVendor.email) changes.email = updatedData.email;
            if (updatedData.display_image !== originalVendor.display_image) changes.display_image = updatedData.display_image;

            // Only send changes if there are any
            if (Object.keys(changes).length > 0) {
                const formData = new FormData();
                for (const key in changes) {
                    formData.append(key, changes[key]);
                }

                const updatedVendor = await editVendor(id, formData);
                setVendors(vendors.map(v => v.id === id ? { ...v, ...updatedVendor } : v));
                handleCloseEditModal();
            } else {
                console.log("No changes detected.");
            }
        } catch (error) {
            console.error("Failed to update vendor:", error);
        }
    };

    const handleViewClick = (vendorId) => {
        navigate(`/vendor-details/${vendorId}`); // Navigate to Vendor Details page with vendor ID
    };


    const filteredVendors = Array.isArray(vendors)
        ? vendors.filter(vendor =>
            vendor.name?.toLowerCase().includes(search.toLowerCase()) ||
            vendor.email?.toLowerCase().includes(search.toLowerCase())
        )
        : [];


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
                {/* <Button variant="contained" color="primary">Add Vendor</Button> */}
            </Box>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>Phone Number</TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>Whatsapp Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Request</TableCell>
                            <TableCell>Enable </TableCell>
                            <TableCell >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredVendors.map((vendor, index) => (
                            <TableRow key={vendor.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{vendor.name}</TableCell>
                                <TableCell>
                                    <img src={vendor.display_image} alt={vendor.name} width="40" height="40" style={{ borderRadius: '50%' }} />
                                </TableCell>
                                <TableCell>{vendor.contact_number}</TableCell>
                                <TableCell>{vendor.whatsapp_number}</TableCell>
                                <TableCell>{vendor.email}</TableCell>
                                <TableCell>
                                    {vendor.is_approved ? (
                                        <Typography color="success.main">Accepted</Typography>
                                    ) : (
                                        <>
                                            <Button variant="outlined" color="success" size="small" onClick={() => handleAcceptReject(vendor.id, true)}>Accept</Button>
                                            <Button variant="outlined" color="error" size="small" sx={{ marginLeft: 1 }} onClick={() => handleAcceptReject(vendor.id, false)}>Reject</Button>
                                        </>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={vendor.is_active} // Use the vendor's is_enable field
                                        onChange={() => handleToggleEnableDisable(vendor.id, !vendor.is_active)} // Toggle the status
                                        color="primary"
                                    />
                                </TableCell>

                                <TableCell style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color='primary'
                                        sx={{ ml: 1 }}
                                        onClick={() => handleViewClick(vendor.id)} // Trigger delete confirmation
                                    >
                                        <RemoveRedEye />

                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color='secondary'
                                        sx={{ ml: 1 }}
                                        onClick={() => handleEditClick(vendor)} // Trigger delete confirmation
                                    >
                                        <Edit />

                                    </IconButton>  
                                                                        {/* <IconButton
                                        size="small"
                                        sx={{ color: '#d32f2f', ml: 1 }}
                                        onClick={() => handleDeleteClick(vendor)} // Trigger delete confirmation
                                    >
                                        <Delete />

                                    </IconButton> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Confirmation Modal */}
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {selectedVendor?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Vendor Modal */}
            <EditVendorModal
                open={openEditModal}
                onClose={handleCloseEditModal}
                vendor={selectedVendor}
                onSave={handleSaveEdit}
            />
        </Box>
    );
};

export default ViewVendors;