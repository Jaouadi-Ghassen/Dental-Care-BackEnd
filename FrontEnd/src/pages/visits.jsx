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
} from '@mui/material';
import { styled } from '@mui/system';



const StyledPaper = styled(Paper)`
  padding: 16px;
`;

export default function Visits() {
  const [visits, setVisits] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('http://localhost:5000/visit');
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setVisits(responseData.visits) // Adjust the property name here based on your response data structure
        console.log(responseData)
      } catch (error) {
        console.log(error.message);
      }
    };
  
    sendRequest();
  }, []);
  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
              Visits
            </Typography>
            <StyledPaper elevation={3}>
              <Box p={3}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date of Visit</TableCell>       
                        <TableCell>Visitor Name</TableCell>
                        <TableCell>Clinical Visited</TableCell>
                        <TableCell>Clinical Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visits && visits.map((visit) => (
                        <TableRow key={visit._id}>
                          <TableCell>{visit._id}</TableCell>
                          <TableCell>{visit.dateOfVisit}</TableCell>
                          <TableCell>{visit.visitorName}</TableCell>
                          <TableCell>{visit.clinicalVisited}</TableCell>
                          <TableCell>{visit.clinicalName}</TableCell>
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
    </div>
  );
}
