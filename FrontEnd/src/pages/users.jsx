import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import { Typography, Grid } from '@mui/material';
import { Card, CardContent, CardActions } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
export default function User() {
  const [rows, setRows] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('http://localhost:5000/user');
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setRows(responseData.users) // Adjust the property name here based on your response data structure
        console.log(responseData)
      } catch (error) {
        console.log(error.message);
      }
    };
  
    sendRequest();
  }, []);
  const handleToggleLock = (id) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const locked = !row.locked;
        console.log(`Row ID ${id} is now ${locked ? 'locked' : 'unlocked'}`);
        return { ...row, locked };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Box height={30}></Box>
      <Box sx={{ display: 'flex' }}>
        <Sidebar></Sidebar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <br></br>
          <Typography
            variant="h3"
            component="h3"
            sx={{ textAlign: 'center', mt: 3, mb: 3 }}
          >
            Manage Users
          </Typography>

          <Grid container spacing={2}>
            {rows && rows.map((row) => (
              <Grid item key={row.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {row.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Last Name:</strong> {row.firstName}
                      <br />
                      <strong>First Name:</strong> {row.lastName}
                      <br />
                      <strong>Email:</strong> {row.address}
                      <br />
                      <strong>Email:</strong> {row.email}
                      <br />
                      <strong>Password:</strong> {row.confirmPassword}
                      <br />
                      <strong>Phone Number:</strong> {row.tel}
                      
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => handleToggleLock(row.id)}
                      style={{ color: row.locked ? 'red' : 'green' }}
                    >
                      {row.locked ? <LockIcon /> : <LockOpenIcon />}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
