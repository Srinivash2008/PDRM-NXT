import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlink } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';

const ErrorComponent = ({ message }) => {
    return (
        <div style={{ margin: '40px auto 20px', textAlign: 'center', color: '#A80000' }}>
            <div style={{
                fontSize: '34px',
                margin: '15px',
                animation: 'animateIcon 5s infinite',
            }}>
                <FontAwesomeIcon icon={faUnlink} />
            </div>
            <Typography variant="h6" color="error" align="center" style={{ fontSize: '14px' }}>
               {message}
            </Typography>
            {/* <style>
                {`
                    @keyframes animateIcon {
                        0% { transform: scale(1); }
                        50% { transform: scale(2); }
                        100% { transform: scale(1); }
                    }
                `}
            </style> */}
        </div>
    );
};

export default ErrorComponent;
