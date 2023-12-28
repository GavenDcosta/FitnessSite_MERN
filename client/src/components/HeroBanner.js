import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import HeroBannerImg from '../assets/images/banner2.png'

const HeroBanner = () => {
  return (
    <Box 
      sx={{
        mt : { lg: '112px', xs: '70px' },
        ml : { sm: '50px' }
      }}
      position= 'relative' 
      p= '20px' 
    >
      <Typography 
        sx={{
          background: 'linear-gradient(to right, #007BFF, #00BFFF)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: '700',
          fontSize: '44px',
          display: 'inline-block'
        }}
      >
        Gaven's Gym
      </Typography>
      <Typography 
        fontWeight="600"
        sx={{
          fontSize: { lg: '34px', xs: '30px' },
          mb: '23px',
          mt: '30px',
          background: 'linear-gradient(to right, #00FF00, #00AA00)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Do the Hard Work <br /> especially when you don't <br /> feel like it
      </Typography>
      <Typography
        fontSize="22px" 
        lineHeight="35px"
        mb={9}
      >
        Learn about various exercises!
      </Typography>
      <Button  
        variant='contained'
        color="primary"
        href="#exercises"
        sx = {{ backgroundColor : "dodgerblue", padding: "10px", borderRadius:"30px" }}

      >
        Explore Exercises
      </Button>
      <Typography
        fontWeight={600}
        color="#ff2625"
        sx={{
          opacity: 0.3,
          display: { lg: 'block', xs: 'none' },
          background: 'linear-gradient(to right, #007BFF, #00BFFF)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
        fontSize="200px"
      >
        Exercise
      </Typography>
      <img src={HeroBannerImg} alt="HeroBannerImg" className="hero-banner-img"/>
    </Box>
  )
}

export default HeroBanner