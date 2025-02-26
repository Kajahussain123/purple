import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
} from '@mui/material';
import { getUserById, updateUser } from './UserService';
import { updateAddress, createAddress } from './AddressService';

const EditUserWithAddressModal = ({ open, handleClose, userId, refreshUsers }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user (with addresses) when modal opens.
  useEffect(() => {
    if (userId && open) {
      setLoading(true);
      getUserById(userId)
        .then((data) => setUser(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [userId, open]);

  // Handlers for user field changes.
  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserCheckboxChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.checked });
  };

  // Handlers for address field changes.
  const handleAddressChange = (index, e) => {
    const updatedAddresses = user.addresses.map((addr, i) =>
      i === index ? { ...addr, [e.target.name]: e.target.value } : addr
    );
    setUser({ ...user, addresses: updatedAddresses });
  };

  const handleAddressCheckboxChange = (index, e) => {
    const updatedAddresses = user.addresses.map((addr, i) =>
      i === index ? { ...addr, [e.target.name]: e.target.checked } : addr
    );
    setUser({ ...user, addresses: updatedAddresses });
  };

  // Add a new blank address.
  const handleAddAddress = () => {
    const newAddress = {
      // These fields are default empty values.
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      is_primary: false,
    };
    setUser({ ...user, addresses: [...(user.addresses || []), newAddress] });
  };

  // Save both user info and addresses.
  const handleSave = async () => {
    try {
      // console.log("Starting user update...");
      await updateUser(userId, {
        username: user.username,
        email: user.email,
        is_verified: user.is_verified,
        is_active: user.is_active,
        is_staff: user.is_staff,
      });
      // console.log("User update complete.");
  
      if (user.addresses && user.addresses.length > 0) {
        for (const addr of user.addresses) {
          if (addr.id) {
            console.log("Updating address with id:", addr.id);
            await updateAddress(addr.id, addr);
            console.log("Address", addr.id, "updated.");
          } else {
            console.log("Creating new address for user:", userId);
            await createAddress({ ...addr, user: userId });
            console.log("New address created.");
          }
        }
      }
      refreshUsers();
      handleClose();
      console.log("Save changes complete.");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };
  

  if (!open) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit User & Addresses</DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : user ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* User Information */}
            <Typography variant="h6">User Information</Typography>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={user.username || ''}
              onChange={handleUserChange}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email || ''}
              onChange={handleUserChange}
              margin="dense"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.is_verified || false}
                  onChange={handleUserCheckboxChange}
                  name="is_verified"
                />
              }
              label="Verified"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.is_active || false}
                  onChange={handleUserCheckboxChange}
                  name="is_active"
                />
              }
              label="Active"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.is_staff || false}
                  onChange={handleUserCheckboxChange}
                  name="is_staff"
                />
              }
              label="Staff"
            />

            {/* Addresses Section */}
            <Typography variant="h6" sx={{ mt: 3 }}>
              Addresses
            </Typography>
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((addr, index) => (
                <Box
                  key={addr.id || index} // use index as key for new addresses without id
                  sx={{ border: '1px solid #ccc', p: 2, mb: 2 }}
                >
                  <Typography variant="subtitle1">
                    {addr.id ? `Address ID: ${addr.id}` : "New Address"}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    name="address_line1"
                    value={addr.address_line1 || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="address_line2"
                    value={addr.address_line2 || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={addr.city || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={addr.state || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={addr.country || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={addr.pincode || ''}
                    onChange={(e) => handleAddressChange(index, e)}
                    margin="dense"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addr.is_primary || false}
                        onChange={(e) => handleAddressCheckboxChange(index, e)}
                        name="is_primary"
                      />
                    }
                    label="Primary Address"
                  />
                </Box>
              ))
            ) : (
              <Typography>No addresses available.</Typography>
            )}
            {/* Button to add a new address */}
            <Button variant="outlined" onClick={handleAddAddress}>
              Add Address
            </Button>

            <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
              Save Changes
            </Button>
          </Box>
        ) : (
          <Typography>User not found.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUserWithAddressModal;
