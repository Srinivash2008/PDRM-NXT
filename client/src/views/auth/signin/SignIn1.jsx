import React from 'react';
import { Grid, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import AuthLogin from './JWTLogin';
import flameIcon from '../../../assets/images/logo-dark.png'; // Replace with actual flame icon

const Signin1 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // e.g. md = 960px

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      
      {/* Left Panel */}
      {!isMobile && (
        <Grid
          item
          md={6}
          sx={{
            background: 'linear-gradient(135deg, #2b4fc4, #1e3a8a)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: 4,
          }}
        >
          {/* Blurred Background Circle */}
          <Box
            sx={{
              position: 'absolute',
              width: 250,
              height: 250,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '50%',
              top: '20%',
              left: '-100px',
              filter: 'blur(40px)',
            }}
          />
          
          {/* Flame Logo Circle */}
          <Box
            sx={{
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: 70,
              height: 70,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              zIndex: 1,
              mb: 3,
            }}
          >
            <img src={flameIcon} alt="Flame Icon" width={30} height={30} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              zIndex: 1,
            }}
          >
            PDMR <span style={{ color: '#ffdd57' }}>NXT</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 300,
              textAlign: 'center',
              opacity: 0.9,
              lineHeight: 1.6,
              zIndex: 1,
            }}
          >
            Accelerate your project pipeline with blazing performance. Powerfully simple.
          </Typography>
        </Grid>
      )}

      {/* Right Panel */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#fff', p: { xs: 2, sm: 4, md: 6 } }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Hey, enter your details to access your account.
          </Typography>
          <AuthLogin />
        </Box>
      </Grid>

    </Grid>
  );
};

export default Signin1;
