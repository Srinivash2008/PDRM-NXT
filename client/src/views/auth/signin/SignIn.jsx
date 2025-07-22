import React from 'react';
import { Box, Button, Container, Grid, TextField, Typography, MenuItem, Avatar, Link } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import usaFlag from '../../../assets/images/auth/usa-flag.svg';
import sampleImage from '../../../assets/images/auth/sign_in_illustration.png'; // Use the file you uploaded

const FullHeightGrid = styled(Grid)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f4f4ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '20px',
  overflow: 'hidden',
  display: 'flex',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  maxWidth: '900px',
  width: '100%',
}));

const LeftPane = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  flex: 1,
}));

const RightPane = styled(motion.div)({
  flex: 1,
  backgroundColor: '#3c30ff',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
});

export default function SignUpPage() {
  return (
    <FullHeightGrid container>
      <FormContainer>
        <LeftPane>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">Pela Design</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2">Questions?</Typography>
              <Link href="#" variant="body2" color="primary" underline="hover">Ask Ho3ein</Link>
              <Avatar src="https://i.pravatar.cc/40" sx={{ width: 32, height: 32 }} />
            </Box>
          </Box>

          <Box mt={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Get started
            </Typography>
            <Typography variant="body2" gutterBottom>
              Already have an account? <Link href="#" underline="hover">Sign in</Link>
            </Typography>

            <Box mt={4}>
              <TextField fullWidth label="Name" margin="normal" />
              <TextField fullWidth label="Email" margin="normal" />
              <TextField
                fullWidth
                label="Country"
                margin="normal"
                select
                defaultValue="United States"
              >
                <MenuItem value="United States">
                  <img src={usaFlag} alt="USA" style={{ width: 20, marginRight: 10 }} /> United States
                </MenuItem>
                {/* Add more countries if needed */}
              </TextField>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, py: 1.5, borderRadius: '10px', fontWeight: 'bold' }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </LeftPane>

        <RightPane
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={sampleImage}
            alt="illustration"
            style={{ width: '80%', borderRadius: '20px' }}
          />
          <Typography variant="h5" mt={4} textAlign="center">
            Have your own <br /> personal website
          </Typography>
        </RightPane>
      </FormContainer>
    </FullHeightGrid>
  );
}
