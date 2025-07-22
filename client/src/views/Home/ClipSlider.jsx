import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ChipSlider = () => {
  const scrollRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const labels = [
    'Editing',
    'Typesetting',
    'Journal Management',
    'Content Delivery',
    'Metadata Handling',
    'Proofing & QC',
  ];

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1); // buffer for rounding
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleScroll(); // initial check
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (current) {
        current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        mt: 6,
        width: '100%',
      }}
    >
      {/* Scrollable Chip List */}
      <Box
        ref={scrollRef}
        sx={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          px: 4,
          py: 1,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {labels.map((label, idx) => (
          <Chip
            key={idx}
            label={label}
            variant="outlined"
            sx={{
              display: 'inline-block',
              mx: 0.5,
              my: 1,
              px: 2,
              py: 0.5,
              fontSize: '0.9rem',
              fontWeight: 500,
              borderRadius: '16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#e0f2ff',
              },
            }}
          />
        ))}
      </Box>

      {/* Left Button */}
      {showLeft && (
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      )}

      {/* Right Button */}
      {showRight && (
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default ChipSlider;
