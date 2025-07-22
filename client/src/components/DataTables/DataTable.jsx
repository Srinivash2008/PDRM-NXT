import { createTheme, Paper, ThemeProvider, Box, Select, MenuItem, InputLabel, FormControl, Skeleton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

// Create a custom theme
const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                row: {
                    '&.even-row': {
                        backgroundColor: '#f2efef',
                    },
                    '&.odd-row': {
                        backgroundColor: '#ffffff',
                    },
                },
                columnHeader: {
                    backgroundColor: '#D34848',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    '& .MuiIconButton-root': {
                        color: '#ffffff',
                    },
                },
            },
        },
    },
});

function DataTable({ columns = [], data = [], loading = true }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100); // Default to 100

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const modifiedData = data?.map((item, index) => ({
        id: index,
        sno: index + 1,
        ...item,
    }));

    const paginatedData = useMemo(() => {
        if (!Array.isArray(modifiedData)) return [];
        return modifiedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [modifiedData, page, rowsPerPage]);

    useEffect(() => {
        if (page >= Math.ceil(modifiedData.length / rowsPerPage)) {
            setPage(0);
        }
    }, [modifiedData, page, rowsPerPage]);

    const updatedColumns = [
        {
            field: 'sno',
            headerName: 'S.No',
            flex: 0.5,
            headerClassName: 'small-header',
            cellClassName: 'small-cell',
            renderCell: (params) => (
                <span>{params.row.sno}</span>
            ),
        },
        ...columns
    ];

    const totalPages = Math.ceil(modifiedData.length / rowsPerPage);

    // Generate skeleton rows with 6 rows and 6 columns
    const skeletonRows = [...Array(10)].map((_, rowIndex) => {
        const skeletonRow = { id: rowIndex };
        for (let colIndex = 0; colIndex < 6; colIndex++) {
            skeletonRow[`col${colIndex}`] = <Skeleton variant="text" width="100%" />;
        }
        return skeletonRow;
    });

    return (
        <ThemeProvider theme={theme}>
            <div className="bg-body-emphasis border-top border-bottom border-translucent position-relative top-1" style={{ boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)', width: "auto" }}>
                <div className="table-responsive mx-n1">
                    <Paper sx={{ height: '100%', width: '100%' }}>
                        <DataGrid
                            rows={loading ? skeletonRows : paginatedData}
                            columns={loading ? Array.from({ length: 6 }, (_, index) => ({
                                field: `col${index}`,
                                headerName: `Column ${index + 1}`,
                                flex: 1,
                                renderHeader: () => <Skeleton variant="text" width={300} height={30}/>,
                                renderCell: (params) => params.value,
                            })) : updatedColumns}
                            hideFooter
                            sx={{ borderBottom: "1" }}
                            style={{ width: "auto" }}
                        />
                    </Paper>
                </div>

                {/* CUSTOM PAGINATION TO AVOID HTML SEMANTICS ISSUE */}
                {modifiedData.length > 0 && !loading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px', width: '100%' }}>
                        <FormControl variant="outlined" size="small" sx={{ minWidth: 80, marginRight: '10px', display: 'flex' }}>
                            <InputLabel variant="standard">Rows</InputLabel>
                            <Select
                                value={rowsPerPage}
                                onChange={handleChangeRowsPerPage}
                                label="Rows"
                                variant="standard"
                            >
                                {[100, 150, 200, 250].map(option => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                            style={{
                                cursor: page === 0 ? 'not-allowed' : 'pointer',
                                opacity: page === 0 ? 0.5 : 1,
                                margin: '0 10px',
                                color: 'black'
                            }}
                        />
                        <span style={{ margin: '0 10px' }}>{`Page ${page + 1} of ${totalPages}`}</span>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                            style={{
                                cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
                                opacity: page >= totalPages - 1 ? 0.5 : 1,
                                margin: '0 10px',
                                color: 'black'
                            }}
                        />
                    </Box>
                )}

            </div>
            {data?.length === 0 && (
                <div className='mt-5'>
                    <p style={{ textAlign: 'center' }}>No Results Found....!</p>
                </div>
            )}
        </ThemeProvider>
    );
}

export default DataTable;
