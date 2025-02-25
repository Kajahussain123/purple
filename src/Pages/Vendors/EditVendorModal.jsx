import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const EditVendorModal = ({ open, onClose, vendor, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact_number: '',
        whatsapp_number: '',
        email: '',
        display_image: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || '',
                contact_number: vendor.contact_number || '',
                whatsapp_number: vendor.whatsapp_number || '',
                email: vendor.email || '',
                display_image: vendor.display_image || '',
            });
        }
    }, [vendor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, display_image: file }); // Store the file object
        }
    };

    const handleDeleteImage = () => {
        setFormData({ ...formData, display_image: '' });
    };

    const handleSubmit = async () => {
        try {
            await onSave(vendor.id, formData);
            onClose();
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data); // Set backend errors
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Vendor</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name[0] : ''}
                        fullWidth
                    />
                    <TextField
                        label="Contact Number"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        error={!!errors.contact_number}
                        helperText={errors.contact_number ? errors.contact_number[0] : ''}
                        fullWidth
                    />
                    <TextField
                        label="WhatsApp Number"
                        name="whatsapp_number"
                        value={formData.whatsapp_number}
                        onChange={handleChange}
                        error={!!errors.whatsapp_number}
                        helperText={errors.whatsapp_number ? errors.whatsapp_number[0] : ''}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email[0] : ''}
                        fullWidth
                    />

                    {/* Image Upload Field */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: 'column' }}>
                        <Button variant="contained" component="label">
                            Upload Image
                            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                        </Button>

                        {/* Image Preview Section */}
                        {formData.display_image && (
                            <Box sx={{ position: 'relative', display: 'inline-block', marginTop: 2 }}>
                                <img
                                    src={formData.display_image instanceof File ? URL.createObjectURL(formData.display_image) : formData.display_image}
                                    alt="Vendor Preview"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <IconButton
                                    onClick={handleDeleteImage}
                                    sx={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
                                    size="small"
                                >
                                    <Delete />
                                </IconButton>
                                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, textAlign: 'center' }}>
                                    Current Image
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditVendorModal;