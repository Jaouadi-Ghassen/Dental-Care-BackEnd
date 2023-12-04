import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/Navbar';
import {
  Box,
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddClinicalDialog from '../components/Clinicalmodal';
import AddIcon from '@mui/icons-material/Add';

const StyledFormModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
`;

export default function Tasks() {
  const [clinicals, setClinicals] = useState([]);
  const [selectedClinical, setSelectedClinical] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [nTel, setNTel] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('http://localhost:5000/clinical');
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setClinicals(responseData.clinicals);
      } catch (error) {
        console.log(error.message);
      }
    };

    sendRequest();
  }, [clinicals]);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleSave = async (clinicalId) => {
    try {
      const response = await fetch(`http://localhost:5000/clinical/${clinicalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          address,
          nTel,
        }),
      });

      if (response.status === 200) {
        // If the clinical was successfully updated, update the state
        // to reflect the changes
        setClinicals((prevClinicals) =>
          prevClinicals.map((clinical) =>
            clinical._id === clinicalId ? { ...clinical, name, email, address, nTel } : clinical
          )
        );
        handleCloseModal();
      } else {
        throw new Error('Error updating clinical');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (clinicalId) => {
    try {
      const response = await fetch(`http://localhost:5000/clinical/${clinicalId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        setClinicals((prevClinicals) => prevClinicals.filter((clinical) => clinical._id !== clinicalId));
      } else {
        throw new Error('Error deleting clinical');
      }
    } catch (error) {
      console.log(error.message);
    }
    setDeleteModalOpen(false);
  };

  const handleSaveClinical = (clinicalData) => {
    console.log('Saving clinical:', clinicalData);
    handleCloseAddModal();
  };

  const handleOpenFormModal = (clinical) => {
    setSelectedClinical(clinical);
    setOpenModal(true);
    setName(clinical.name);
    setEmail(clinical.email);
    setAddress(clinical.address);
    setNTel(clinical.nTel);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const DeleteDialog = () => {
    const handleDeleteConfirmed = () => {
      handleDelete(selectedClinical?._id);
    };

    const handleDeleteCanceled = () => {
      setDeleteModalOpen(false);
    };

    return (
      <Dialog open={deleteModalOpen} onClose={handleDeleteCanceled}>
        <DialogTitle>
          <div style={{ display: 'flex' }}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              <b>Confirm Deletion</b>
            </Typography>
            <IconButton onClick={handleDeleteCanceled} color="error">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>Are you sure you want to delete this clinical?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" onClick={handleDeleteConfirmed}>
              Yes
            </Button>
            <Button variant="outlined" onClick={handleDeleteCanceled}>
              No
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
              Existing Clinicals
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={handleOpenAddModal}
              >
                Add Clinical
              </Button>
            </Box>
            <AddClinicalDialog open={addModalOpen} onClose={handleCloseAddModal} onSave={handleSaveClinical} />
            <StyledPaper elevation={3}>
              <Box p={3}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clinicals.map((clinical) => (
                        <TableRow key={clinical._id}>
                          <TableCell>{clinical._id}</TableCell>
                          <TableCell>{clinical.name}</TableCell>
                          <TableCell>{clinical.email}</TableCell>
                          <TableCell>{clinical.address}</TableCell>
                          <TableCell>{clinical.nTel}</TableCell>
                          <TableCell>
                            <IconButton
                              color="success"
                              size="small"
                              onClick={() => handleOpenFormModal(clinical)}
                            >
                              Change
                              <SaveAltIcon></SaveAltIcon>
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => {
                                setSelectedClinical(clinical);
                                setDeleteModalOpen(true);
                              }}
                            >
                              Delete
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </StyledPaper>
          </Container>
        </Box>
      </Box>
      <StyledFormModal open={openModal} onClose={handleCloseModal}>
        <StyledPaper>
          <DialogTitle>
            <div style={{ display: 'flex' }}>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                <b>Change Clinical</b>
              </Typography>
              <IconButton onClick={handleCloseModal} color="error">
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <Typography paragraph>Please fill in all the information</Typography>
            <Grid>
              <Card style={{ padding: '20px 5px', margin: '0 auto' }}>
                <CardContent>
                  <form>
                    <Grid container spacing={2} direction="column">
                      <Grid item>
                        <TextField
                          required
                          fullWidth
                          label="Name"
                          variant="outlined"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          variant="outlined"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          required
                          fullWidth
                          label="Address"
                          variant="outlined"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          required
                          fullWidth
                          label="Phone"
                          variant="outlined"
                          value={nTel}
                          onChange={(e) => setNTel(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <Box justifyContent="center" alignItems="center">
                          <Button variant="contained" startIcon={<SaveAltIcon />} onClick={() => handleSave(selectedClinical?._id)}>
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </DialogContent>
        </StyledPaper>
      </StyledFormModal>
      <DeleteDialog />
    </div>
  );
}
