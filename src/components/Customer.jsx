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
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  ShoppingCart as ShoppingCartIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import './Customer.css';

const Customer = () => {
  const [receipts, setReceipts] = useState([
    {
      id: 1,
      shopName: 'Local Grocery Store',
      items: [
        { name: 'Milk', quantity: 2, price: 0, available: true },
        { name: 'Bread', quantity: 1, price: 0, available: true },
      ],
      status: 'pending',
      date: '2024-03-20',
      totalAmount: 0,
    },
  ]);

  const [newReceipt, setNewReceipt] = useState({
    shopName: '',
    items: [{ name: '', quantity: 1, price: 0 }],
  });

  const [openNewReceipt, setOpenNewReceipt] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenNewReceipt = () => {
    setOpenNewReceipt(true);
  };

  const handleCloseNewReceipt = () => {
    setOpenNewReceipt(false);
    setNewReceipt({
      shopName: '',
      items: [{ name: '', quantity: 1, price: 0 }],
    });
    setActiveStep(0);
  };

  const handleAddItem = () => {
    setNewReceipt({
      ...newReceipt,
      items: [...newReceipt.items, { name: '', quantity: 1, price: 0 }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = newReceipt.items.filter((_, i) => i !== index);
    setNewReceipt({
      ...newReceipt,
      items: updatedItems,
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = newReceipt.items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setNewReceipt({
      ...newReceipt,
      items: updatedItems,
    });
  };

  const handleSubmitReceipt = () => {
    const newReceiptData = {
      id: receipts.length + 1,
      shopName: newReceipt.shopName,
      items: newReceipt.items,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      totalAmount: newReceipt.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    };

    setReceipts([...receipts, newReceiptData]);
    handleCloseNewReceipt();
    setSnackbar({
      open: true,
      message: 'Receipt sent successfully!',
      severity: 'success',
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Shop Name"
              value={newReceipt.shopName}
              onChange={(e) => setNewReceipt({ ...newReceipt, shopName: e.target.value })}
              margin="normal"
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            {newReceipt.items.map((item, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Item Name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    inputProps={{ min: 1 }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(index)}
                    disabled={newReceipt.items.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddItem}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add Item
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="customer-container" maxWidth="lg">
      <Box className="dashboard-header">
        <Typography variant="h4" component="h1" className="dashboard-title">
          Customer Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className="receipts-section">
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">My Receipts</Typography>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={handleOpenNewReceipt}
                className="new-receipt-button"
              >
                New Receipt
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Receipt ID</TableCell>
                    <TableCell>Shop</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipts.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell>{receipt.id}</TableCell>
                      <TableCell>{receipt.shopName}</TableCell>
                      <TableCell>{receipt.date}</TableCell>
                      <TableCell>{receipt.items.length} items</TableCell>
                      <TableCell>${receipt.totalAmount}</TableCell>
                      <TableCell>
                        <Chip
                          className={`status-chip ${receipt.status}`}
                          label={receipt.status}
                          icon={
                            receipt.status === 'approved' ? (
                              <CheckCircleIcon />
                            ) : receipt.status === 'rejected' ? (
                              <CancelIcon />
                            ) : null
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Receipt Summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Receipts: {receipts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending: {receipts.filter(r => r.status === 'pending').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved: {receipts.filter(r => r.status === 'approved').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rejected: {receipts.filter(r => r.status === 'rejected').length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={openNewReceipt}
        onClose={handleCloseNewReceipt}
        maxWidth="md"
        fullWidth
        className="new-receipt-dialog"
      >
        <DialogTitle>Create New Receipt</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mt: 2, mb: 4 }}>
            <Step>
              <StepLabel>Shop Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Items</StepLabel>
            </Step>
          </Stepper>
          {getStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewReceipt}>Cancel</Button>
          {activeStep > 0 && (
            <Button onClick={handleBack}>Back</Button>
          )}
          {activeStep < 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!newReceipt.shopName}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmitReceipt}
              startIcon={<SendIcon />}
              disabled={!newReceipt.items.every(item => item.name)}
            >
              Submit Receipt
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Customer; 