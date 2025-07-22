import React from 'react';
import {
    Box,
    Typography,
    Button,
    Chip,
    Stack,
    Container,
    useTheme,
    keyframes
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { ChipSlider } from 'lazyImports';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Home = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                bgcolor: '#f5f8fb',
                py: { xs: 8, md: 12 },
                textAlign: 'center',
                animation: `${fadeInUp} 1s ease-out`,
            }}
        >
            <Container maxWidth="md">
                <Chip
                    label="One Hub, Limitless Publishing Support"
                    color="primary"
                    icon={<RocketLaunchIcon />}
                    sx={{
                        mb: 3,
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        animation: `${fadeInUp} 0.8s ease-out`,
                    }}
                />

                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', md: '3.2rem' },
                        color: '#1a202c',
                        animation: `${fadeInUp} 1s ease-out`,
                    }}
                >
                    Centralized Publishing Platform
                    <br />
                    for Effortless Workflow
                </Typography>

                {/* Decorative Divider */}
                <Box
                    sx={{
                        width: 60,
                        height: 4,
                        background: theme.palette.primary.main,
                        borderRadius: 999,
                        my: 2,
                        mx: 'auto',
                        animation: `${fadeInUp} 1.2s ease-out`,
                    }}
                />

                <Typography
                    variant="body1"
                    sx={{
                        color: '#4a5568',
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        mt: 2,
                        mb: 5,
                        maxWidth: '700px',
                        mx: 'auto',
                        animation: `${fadeInUp} 1.3s ease-out`,
                    }}
                >
                    Perfect Digital Media Resources (P) Ltd empowers publishers, authors,
                    and institutions with a complete suite for editing, typesetting, and
                    managing publications — all from one powerful hub.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: '999px',
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        textTransform: 'none',
                        fontWeight: '600',
                        boxShadow: '0 4px 14px rgba(0, 118, 255, 0.3)',
                        transition: '0.3s',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 18px rgba(0, 118, 255, 0.35)',
                        },
                        animation: `${fadeInUp} 1.4s ease-out`,
                    }}
                >
                    Explore Platform
                </Button>

              <ChipSlider/>

            </Container>
        </Box>
    );
};

export default Home;
