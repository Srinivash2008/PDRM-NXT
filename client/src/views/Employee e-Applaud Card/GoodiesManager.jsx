import React, { useState, useEffect } from "react";
import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Avatar,
    MenuItem,
    Stack,
    TableContainer,
    Paper,
    TablePagination,
    useMediaQuery,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    Box,
    Tooltip
} from "@mui/material";
import { Add, Edit, Delete, ViewList, ViewModule } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
const InfoRow = ({ label, value, color }) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
            {label}
        </Typography>
        <Typography variant="body2" fontWeight={600} sx={{ color }}>
            {value}
        </Typography>
    </Stack>
);
const initialGoodies = [
    {
        id: 1,
        goodies_name: "T-shirt",
        goodies_eligible_points: 500,
        total_goodies: 100,
        goodies_instock: 60,
        goodies_delivered: 40,
        goodies_image: "http://pdmrindia.in/fms/uploads/eapplaud//jurgin.jpg",
        created_by: 1,
        goodies_status: "Active",
        created_date: "2025-07-21T10:00:00"
    },
    {
        id: 2,
        goodies_name: "Mug",
        goodies_eligible_points: 200,
        total_goodies: 80,
        goodies_instock: 50,
        goodies_delivered: 30,
        goodies_image: "http://pdmrindia.in/fms/uploads/eapplaud//Orion_bag.jpg",
        created_by: 2,
        goodies_status: "Active",
        created_date: "2025-07-20T08:30:00"
    },
    {
        id: 3,
        goodies_name: "Mug",
        goodies_eligible_points: 200,
        total_goodies: 80,
        goodies_instock: 50,
        goodies_delivered: 30,
        goodies_image: "http://pdmrindia.in/fms/uploads/eapplaud//Orion_bag.jpg",
        created_by: 2,
        goodies_status: "Active",
        created_date: "2025-07-20T08:30:00"
    }, {
        id: 4,
        goodies_name: "Mug",
        goodies_eligible_points: 200,
        total_goodies: 80,
        goodies_instock: 50,
        goodies_delivered: 30,
        goodies_image: "http://pdmrindia.in/fms/uploads/eapplaud//Orion_bag.jpg",
        created_by: 2,
        goodies_status: "Active",
        created_date: "2025-07-20T08:30:00"
    }, {
        id: 5,
        goodies_name: "Mug",
        goodies_eligible_points: 200,
        total_goodies: 80,
        goodies_instock: 50,
        goodies_delivered: 30,
        goodies_image: "http://pdmrindia.in/fms/uploads/eapplaud//Orion_bag.jpg",
        created_by: 2,
        goodies_status: "Active",
        created_date: "2025-07-20T08:30:00"
    },
];

export default function GoodiesManager() {
    const [goodies, setGoodies] = useState(initialGoodies);
    const [openDialog, setOpenDialog] = useState(false);
    const [editGoodie, setEditGoodie] = useState(null);
    const [formData, setFormData] = useState({
        goodies_name: "",
        goodies_eligible_points: "",
        total_goodies: "",
        goodies_instock: "",
        goodies_delivered: "",
        goodies_image: "",
        goodies_status: "Active"
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [viewMode, setViewMode] = useState("card");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (page > 0 && page * rowsPerPage >= goodies.length) {
            setPage(0);
        }
    }, [goodies, page, rowsPerPage]);

    const paginatedGoodies = goodies.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleOpenDialog = (goodie = null) => {
        if (goodie) {
            setEditGoodie(goodie);
            setFormData(goodie);
        } else {
            setEditGoodie(null);
            setFormData({
                goodies_name: "",
                goodies_eligible_points: "",
                total_goodies: "",
                goodies_instock: "",
                goodies_delivered: "",
                goodies_image: "",
                goodies_status: "Active"
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => setOpenDialog(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (editGoodie) {
            setGoodies((prev) =>
                prev.map((g) => (g.id === editGoodie.id ? { ...formData, id: g.id } : g))
            );
        } else {
            setGoodies((prev) => [
                ...prev,
                {
                    ...formData,
                    id: Date.now(),
                    created_by: 1,
                    created_date: new Date().toISOString()
                }
            ]);
        }
        handleCloseDialog();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this goodie?")) {
            setGoodies((prev) => prev.filter((g) => g.id !== id));
        }
    };

    return (
        <>
            <Stack
                direction={isMobile ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isMobile ? "flex-start" : "center"}
                spacing={2}
                mb={2}
            >
                <Box
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1.2,
                        backgroundColor: "#f7faff", // soft blue-gray tint
                        color: "#1a3c72", // deep professional blue
                        px: 3,
                        py: 1.2,
                        borderLeft: "5px solid #1a73e8", // brand/Google blue
                        borderRadius: "10px",
                        fontWeight: 600,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                        fontSize: isMobile ? "1rem" : "1.2rem",
                        letterSpacing: "0.3px",
                        width: "fit-content"
                    }}
                >
                    <Box component="span" sx={{ fontSize: "1.3rem" }}>🎁</Box>
                    Manage Goodies
                </Box>


                <Stack direction="row" spacing={1}>
                    <Tooltip title="Card View">
                        <IconButton
                            onClick={() => setViewMode("card")}
                            color={viewMode === "card" ? "primary" : "default"}
                        >
                            <ViewModule />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Table View">
                        <IconButton
                            onClick={() => setViewMode("table")}
                            color={viewMode === "table" ? "primary" : "default"}
                        >
                            <ViewList />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => handleOpenDialog()}
                    >
                        Add Goodie
                    </Button>
                </Stack>
            </Stack>

            {viewMode === "table" ? (
                <Paper sx={{ width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <TableContainer sx={{ flexGrow: 1 }}>
                        <Table size="small" sx={{ minWidth: 1000 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Points</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>In Stock</TableCell>
                                    <TableCell>Delivered</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Actions</TableCell> {/* Aligned right */}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {paginatedGoodies.map((goodie, index) => (
                                    <TableRow key={goodie.id} hover>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>
                                            <Avatar
                                                src={goodie.goodies_image}
                                                alt={goodie.goodies_name}
                                                variant="rounded"
                                                sx={{ width: 48, height: 48 }}
                                            />
                                        </TableCell>
                                        <TableCell>{goodie.goodies_name}</TableCell>
                                        <TableCell>{goodie.goodies_eligible_points}</TableCell>
                                        <TableCell>{goodie.total_goodies}</TableCell>
                                        <TableCell>{goodie.goodies_instock}</TableCell>
                                        <TableCell>{goodie.goodies_delivered}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={goodie.goodies_status}
                                                size="small"
                                                sx={{
                                                    backgroundColor: goodie.goodies_status === 'Active' ? 'success.light' : 'error.light',
                                                    color: goodie.goodies_status === 'Active' ? 'success.dark' : 'error.dark',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                <IconButton onClick={() => handleOpenDialog(goodie)} size="small">
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(goodie.id)} size="small">
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={goodies.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 25, 50]}
                    />
                </Paper>

            ) : (
                <Grid container spacing={3}>
                    {paginatedGoodies.length > 0 ? (
                        paginatedGoodies.map((goodie) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={goodie.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        boxShadow: 4,
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            boxShadow: 8,
                                            transform: 'translateY(-5px)',
                                        },
                                    }}
                                >
                                    {/* Responsive Image Container */}
                                    <Box sx={{ position: 'relative', width: '100%', pt: '70%', backgroundColor: '#f9f9f9' }}>
                                        <Box
                                            component="img"
                                            src={goodie.goodies_image}
                                            alt={goodie.goodies_name}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                p: 2,
                                            }}
                                        />
                                        <Chip
                                            label={goodie.goodies_status}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                backgroundColor: goodie.goodies_status === 'Active' ? 'success.main' : 'error.main',
                                                color: '#fff',
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>

                                    {/* Content */}
                                    <CardContent sx={{ flexGrow: 1, px: 2, py: 1.5 }}>
                                        <Typography variant="subtitle1" fontWeight={700} noWrap>
                                            {goodie.goodies_name}
                                        </Typography>

                                        <Stack spacing={1.2} mt={1}>
                                            <InfoRow label="Points" value={goodie.goodies_eligible_points} color="primary.main" />
                                            <InfoRow
                                                label="Stock"
                                                value={`${goodie.goodies_instock} / ${goodie.total_goodies}`}
                                                color="warning.main"
                                            />
                                            <InfoRow label="Delivered" value={goodie.goodies_delivered} color="secondary.main" />
                                        </Stack>
                                    </CardContent>

                                    {/* Actions */}
                                    <CardActions
                                        sx={{
                                            px: 2,
                                            pb: 2,
                                            pt: 0,
                                            mt: 'auto',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid #eee',
                                        }}
                                    >
                                        <Button size="small" variant="outlined" onClick={() => handleOpenDialog(goodie)}>
                                            Edit
                                        </Button>
                                        <Button size="small" variant="contained" color="error" onClick={() => handleDelete(goodie.id)}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                                No goodies found.
                            </Typography>
                        </Grid>
                    )}
                </Grid>


            )}

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>{editGoodie ? "Edit Goodie" : "Add Goodie"}</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2}>
                        <TextField name="goodies_name" label="Goodie Name" fullWidth value={formData.goodies_name} onChange={handleChange} />
                        <TextField name="goodies_eligible_points" label="Eligible Points" type="number" fullWidth value={formData.goodies_eligible_points} onChange={handleChange} />
                        <TextField name="total_goodies" label="Total Goodies" type="number" fullWidth value={formData.total_goodies} onChange={handleChange} />
                        <TextField name="goodies_instock" label="Goodies In Stock" type="number" fullWidth value={formData.goodies_instock} onChange={handleChange} />
                        <TextField name="goodies_delivered" label="Goodies Delivered" type="number" fullWidth value={formData.goodies_delivered} onChange={handleChange} />
                        <TextField name="goodies_image" label="Image URL" fullWidth value={formData.goodies_image} onChange={handleChange} />
                        <TextField name="goodies_status" label="Status" select fullWidth value={formData.goodies_status} onChange={handleChange}>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
