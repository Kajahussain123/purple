// src/pages/users/UserList.js
import React, { useEffect, useState } from "react";
import { getUsers } from "./UserService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import EditUserWithAddressModal from "./EditUserWithAddressModal";
import ViewUserWithAddressModal from "./ViewUserWithAddressModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      // Assuming the API returns { total_users: X, users: [ ... ] }
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleViewClick = (userId) => {
    setSelectedUserId(userId);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };

  return (
    <Box sx={{ m: 3, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        User List
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleViewClick(user.id)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditClick(user.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No users found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedUserId && isEditModalOpen && (
        <EditUserWithAddressModal
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          userId={selectedUserId}
          refreshUsers={fetchUsers}
        />
      )}

      {selectedUserId && isViewModalOpen && (
        <ViewUserWithAddressModal
          open={isViewModalOpen}
          handleClose={() => setIsViewModalOpen(false)}
          userId={selectedUserId}
        />
      )}
    </Box>
  );
};

export default UserList;
