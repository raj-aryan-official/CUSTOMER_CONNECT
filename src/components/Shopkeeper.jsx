import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import './Shopkeeper.css';

const Shopkeeper = () => {
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      items: [
        { name: 'Product 1', quantity: 2, price: 0, available: true },
        { name: 'Product 2', quantity: 1, price: 0, available: true },
      ],
      status: 'pending',
      date: '2024-03-20',
    },
  ]);

  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleOpenDialog = (receipt) => {
    setSelectedReceipt(receipt);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReceipt(null);
    setEditingItem(null);
  };

  const handleUpdatePrice = (receiptId, itemIndex, newPrice) => {
    setReceipts(receipts.map(receipt => {
      if (receipt.id === receiptId) {
        const updatedItems = [...receipt.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          price: newPrice
        };
        return { ...receipt, items: updatedItems };
      }
      return receipt;
    }));
  };

  const handleUpdateAvailability = (receiptId, itemIndex, available) => {
    setReceipts(receipts.map(receipt => {
      if (receipt.id === receiptId) {
        const updatedItems = [...receipt.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          available
        };
        return { ...receipt, items: updatedItems };
      }
      return receipt;
    }));
  };

  const handleApproveReceipt = (receiptId) => {
    setReceipts(receipts.map(receipt => 
      receipt.id === receiptId ? { ...receipt, status: 'approved' } : receipt
    ));
  };

  const handleRejectReceipt = (receiptId) => {
    setReceipts(receipts.map(receipt => 
      receipt.id === receiptId ? { ...receipt, status: 'rejected' } : receipt
    ));
  };

  return (
    <Container className="shopkeeper-container" maxWidth="lg">
      <Box className="dashboard-header">
        <Typography variant="h4" component="h1" className="dashboard-title">
          Shopkeeper Dashboard
        </Typography>
      </Box>
      
      <TableContainer component={Paper} className="receipt-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receipt ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>{receipt.id}</TableCell>
                <TableCell>{receipt.customerName}</TableCell>
                <TableCell>{receipt.date}</TableCell>
                <TableCell>{receipt.items.length} items</TableCell>
                <TableCell>
                  <Chip
                    className={`status-chip ${receipt.status}`}
                    label={receipt.status}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    className="action-button view-details-button"
                    variant="contained"
                    size="small"
                    onClick={() => handleOpenDialog(receipt)}
                    sx={{ mr: 1 }}
                  >
                    View Details
                  </Button>
                  {receipt.status === 'pending' && (
                    <>
                      <Button
                        className="action-button approve-button"
                        variant="contained"
                        size="small"
                        onClick={() => handleApproveReceipt(receipt.id)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        className="action-button reject-button"
                        variant="contained"
                        size="small"
                        onClick={() => handleRejectReceipt(receipt.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        className="details-dialog"
      >
        <DialogTitle>Receipt Details</DialogTitle>
        <DialogContent>
          {selectedReceipt && (
            <Box>
              <Box className="customer-info">
                <Typography variant="h6" gutterBottom>
                  Customer: {selectedReceipt.customerName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Date: {selectedReceipt.date}
                </Typography>
              </Box>
              <TableContainer component={Paper} className="items-table">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Availability</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedReceipt.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {editingItem === index ? (
                            <TextField
                              className="price-edit-field"
                              type="number"
                              value={item.price}
                              onChange={(e) => handleUpdatePrice(selectedReceipt.id, index, e.target.value)}
                              size="small"
                            />
                          ) : (
                            `$${item.price}`
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            className={`availability-chip ${item.available ? 'available' : 'not-available'}`}
                            label={item.available ? 'Available' : 'Not Available'}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            className="action-icon-button"
                            onClick={() => setEditingItem(editingItem === index ? null : index)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            className="action-icon-button"
                            onClick={() => handleUpdateAvailability(selectedReceipt.id, index, !item.available)}
                            color={item.available ? 'error' : 'success'}
                          >
                            {item.available ? <CloseIcon /> : <CheckIcon />}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            className="close-dialog-button"
            onClick={handleCloseDialog}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Shopkeeper; 