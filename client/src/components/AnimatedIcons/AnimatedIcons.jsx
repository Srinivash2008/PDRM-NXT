import { Skeleton } from '@mui/material';
import React, { useRef, Suspense, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

const AnimatedIcon = forwardRef(({ iconId, size = 250, colors, isHovered, onClick, style, ...props }, ref) => {
    const playerRef = useRef(null);

    useEffect(() => {
        if (isHovered) {
            playerRef.current.setAttribute('trigger', 'in');
        }
    }, [isHovered]);

    return (
        <div
            ref={ref}
            style={{ display: 'inline-block', width: size, height: size, ...style }}
            onMouseEnter={() => {
                if (playerRef.current) {
                    playerRef.current.setAttribute('trigger', 'hover');
                }
            }}
            onMouseLeave={() => {
                if (playerRef.current) {
                    playerRef.current.setAttribute('trigger', 'in');
                }
            }}
            onClick={onClick}
            {...props} // Spread props here to the div
        >
            <Suspense fallback={<Skeleton variant="circular" width={size} height={size} />}>
                <lord-icon
                    ref={playerRef}
                    src={`https://cdn.lordicon.com/${iconId}.json`}
                    trigger='in'
                    state="in-assignment"
                    stroke="bold"
                    colors={colors}
                    style={{ width: `${size}px`, height: `${size}px` }}
                />
            </Suspense>
        </div>
    );
});

AnimatedIcon.propTypes = {
    iconId: PropTypes.string.isRequired,
    size: PropTypes.number,
    colors: PropTypes.string,
    isHovered: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object,
};

export default AnimatedIcon;
