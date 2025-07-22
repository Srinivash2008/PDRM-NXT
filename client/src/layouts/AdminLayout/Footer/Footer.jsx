import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box component="footer" sx={{ bgcolor: '#fff', pt: 10, pb: 2, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Perfect Digital
            </Typography>
            <Typography variant="body2" color="text.secondary">
              v2.0.0
              <br />
              Empowering publication workflows with advanced solutions for editing, typesetting, and distribution.
            </Typography>
            <List dense sx={{ mt: 2 }}>
              <ListItem disablePadding>
                <ListItemText primary="Digital Typesetting Suite" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="MUI v5 Interface" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Full Documentation" />
              </ListItem>
            </List>
          </Grid>

          {/* Company Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemText primary="About Us" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Our Team" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Careers" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Contact" />
              </ListItem>
            </List>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Services
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemText primary="Typesetting" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Proofreading" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Metadata Management" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="XML Conversion" />
              </ListItem>
            </List>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <List dense>
              <ListItem disablePadding>
                <ListItemText primary="Documentation" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Privacy Policy" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Terms of Service" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="FAQs" />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          mt={6}
          px={3}
          py={2}
          sx={{
            bgcolor: '#f4f7fb',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Perfect Digital Media Resources (P) Ltd. All rights reserved.
          </Typography>
          <Box>
            <IconButton color="primary">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary">
              <YouTubeIcon />
            </IconButton>
            <IconButton color="primary">
              <GitHubIcon />
            </IconButton>
            <IconButton color="primary">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Scroll To Top Button */}
      {visible && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            bgcolor: '#01579b',
            color: '#fff',
            '&:hover': {
              bgcolor: '#004080',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Footer;
