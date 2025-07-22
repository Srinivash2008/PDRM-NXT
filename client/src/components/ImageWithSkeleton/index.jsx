import React, { useRef } from 'react';
import { Skeleton } from '@mui/material';
import { useScreenDetector } from '../ScreenDetector/useScreenDetector';
const ImageWithSkeleton = ({ src, alt, width, height }) => {
    const imgRef = useRef(null);
    const skeletonRef = useRef(null);

    const { isMobile, isTablet, isDesktop } = useScreenDetector();

    const handleImageLoad = () => {
        if (imgRef.current) {
            imgRef.current.style.display = 'block';
        }
        if (skeletonRef.current) {
            skeletonRef.current.style.display = 'none';
        }
    };


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Skeleton
                variant="rectangular"
                width={!isMobile ? 500 : 200}
                height={!isMobile ? 500 : 100}
                animation="wave"
                ref={skeletonRef}
            />
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{ display: 'none' }} 
                ref={imgRef}
                onLoad={handleImageLoad}
            />
        </div>
    );
};

export default ImageWithSkeleton;