import * as React from 'react';
import { Skeleton, Box } from "@mui/material";

const TableLoader = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 900 }}>
     
        <Skeleton variant="text" width="100%" height={30}/>
    </Box>
  );
};

export default TableLoader;
