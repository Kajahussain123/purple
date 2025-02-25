// src/pages/users/ViewUserWithAddressModal.js
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
import { getUserById } from './UserService';

const ViewUserWithAddressModal = ({ open, handleClose, userId }) => {
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

  if (!open) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>View User & Addresses</DialogTitle>
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
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email || ''}
              margin="dense"
              InputProps={{ readOnly: true }}
            />
            <FormControlLabel
              control={<Checkbox checked={user.is_verified || false} disabled />}
              label="Verified"
            />
            <FormControlLabel
              control={<Checkbox checked={user.is_active || false} disabled />}
              label="Active"
            />
            <FormControlLabel
              control={<Checkbox checked={user.is_staff || false} disabled />}
              label="Staff"
            />

            {/* Addresses Section */}
            <Typography variant="h6" sx={{ mt: 3 }}>
              Addresses
            </Typography>
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((addr) => (
                <Box key={addr.id} sx={{ border: '1px solid #ccc', p: 2, mb: 2 }}>
                  <Typography variant="subtitle1">Address ID: {addr.id}</Typography>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    name="address_line1"
                    value={addr.address_line1 || ''}
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="address_line2"
                    value={addr.address_line2 || ''}
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={addr.city || ''}
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={addr.state || ''}
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={addr.country || ''}
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={addr.pincode || ''}
                    margin="dense"
                    InputProps={{ readOnly: true }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={addr.is_primary || false} disabled />}
                    label="Primary Address"
                  />
                </Box>
              ))
            ) : (
              <Typography>No addresses available.</Typography>
            )}

            <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        ) : (
          <Typography>User not found.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserWithAddressModal;
