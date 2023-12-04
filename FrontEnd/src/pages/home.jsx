import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/sidebar'
import Box from '@mui/material/Box';
export default function Home() {
  return (
    <>
     <Navbar></Navbar>
      <Box height={70}></Box>
      <Box sx={{ display: 'flex' }}>
      
      <Sidebar></Sidebar>
      
      </Box>
    </>
  )
}
