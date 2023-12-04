import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from '@mui/material';

const AddClinicalDialog = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [nTel, setNTel] = useState('');
  const [formValid, setFormValid] = useState(false);

  const handleSave = () => {
    // Add your logic to save the clinical here
    onSave({
      name,
      email,
      address,
      nTel,
    });

    // Reset the form fields
    setName('');
    setEmail('');
    setAddress('');
    setNTel('');

    // Close the add clinical dialog
    onClose();
  };

  const validateForm = () => {
    if (name && email && address && nTel) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the input value
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'nTel':
        setNTel(value);
        break;
      default:
        break;
    }

    // Validate the form
    validateForm();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/clinical', {
        name: name,
        email: email,
        address: address,
        nTel: nTel,
      });

      if (response.status === 201) {
        // If the new clinical was successfully created, update the state
        // to include the new clinical in the list of existing clinicals
        onSave(response.data);
        // Clear the form input values
        setName('');
        setEmail('');
        setAddress('');
        setNTel('');
        // Close the add clinical dialog
        onClose();
      } else {
        throw new Error('Error creating new clinical');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            <b>Add Clinical</b>
          </Typography>
          <Button onClick={onClose} color="error">
            Close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <Typography paragraph>Please fill in all the information</Typography>
        <Grid>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  name="nTel"
                  value={nTel}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <Box justifyContent="center" alignItems="center">
                  {formValid ? (
                    <Button type="submit" variant="contained">
                      Save
                    </Button>
                  ) : (
                    <Typography color="error">Please fill in all fields</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddClinicalDialog;
