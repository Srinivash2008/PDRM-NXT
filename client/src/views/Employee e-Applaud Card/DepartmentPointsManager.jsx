import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Leaderboard } from "@mui/icons-material";
import {
    Box,
    Typography,
    Grid,
    Paper,
    IconButton,
    Collapse,
    TextField,
    Button,
    Fab,
    Stack,
    useMediaQuery
} from "@mui/material";
import {
    Edit,
    Delete,
    ExpandMore,
    Save,
    Cancel,
    Add
} from "@mui/icons-material";

const initialData = [
    {
        id: 1,
        department_id: null,
        department_name: "Director",
        manager_id: 1400,
        month_year: "2021-05",
        points: 120000,
        given_by: null,
        created_date: "2021-05-12T07:07:52"
    },
    {
        id: 2,
        department_id: null,
        department_name: "Bloomsbury_pagination",
        manager_id: 1606,
        month_year: "2021-05",
        points: 190000,
        given_by: null,
        created_date: "2021-05-12T07:08:56"
    },
    {
        id: 3,
        department_id: null,
        department_name: "Software",
        manager_id: 1554,
        month_year: "2021-05",
        points: 140000,
        given_by: null,
        created_date: "2021-05-12T07:08:56"
    },
    {
        id: 4,
        department_id: null,
        department_name: "ACS",
        manager_id: 1817,
        month_year: "2021-05",
        points: 360000,
        given_by: null,
        created_date: "2021-05-12T07:10:30"
    },
    {
        id: 5,
        department_id: null,
        department_name: "language_editing",
        manager_id: 1706,
        month_year: "2021-05",
        points: 40000,
        given_by: null,
        created_date: "2021-05-12T07:10:30"
    },
    {
        id: 6,
        department_id: null,
        department_name: "hr",
        manager_id: 1722,
        month_year: "2021-05",
        points: 30000,
        given_by: null,
        created_date: "2021-05-12T07:12:00"
    },
    {
        id: 7,
        department_id: null,
        department_name: "Business",
        manager_id: 1768,
        month_year: "2021-05",
        points: 40000,
        given_by: null,
        created_date: "2021-05-12T07:12:00"
    },
    {
        id: 8,
        department_id: null,
        department_name: "login",
        manager_id: 1410,
        month_year: "2021-05",
        points: 30000,
        given_by: null,
        created_date: "2021-05-12T07:13:56"
    },
    {
        id: 9,
        department_id: null,
        department_name: "ACS",
        manager_id: 1627,
        month_year: "2021-05",
        points: 40000,
        given_by: null,
        created_date: "2021-05-12T07:13:56"
    },
    {
        id: 10,
        department_id: null,
        department_name: "Book",
        manager_id: 1457,
        month_year: "2021-05",
        points: 300000,
        given_by: null,
        created_date: "2021-05-12T07:15:55"
    },
    {
        id: 11,
        department_id: null,
        department_name: "Graphics",
        manager_id: 1442,
        month_year: "2021-05",
        points: 60000,
        given_by: null,
        created_date: "2021-05-12T07:15:55"
    },
    {
        id: 12,
        department_id: null,
        department_name: "Quality",
        manager_id: 1804,
        month_year: "2021-05",
        points: 110000,
        given_by: null,
        created_date: "2021-05-12T07:17:24"
    },
    {
        id: 13,
        department_id: null,
        department_name: "Admin",
        manager_id: 1584,
        month_year: "2021-05",
        points: 60000,
        given_by: null,
        created_date: "2021-05-12T07:17:24"
    },
    {
        id: 14,
        department_id: null,
        department_name: "Indesign_journal",
        manager_id: 1458,
        month_year: "2021-05",
        points: 190000,
        given_by: null,
        created_date: "2021-05-12T07:18:36"
    }
];


export default function DepartmentPointsManager() {
    const [data, setData] = useState(initialData);
    const [expandedId, setExpandedId] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [form, setForm] = useState({});
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


    const handleToggle = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const handleChange = (e, field) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleEdit = (item) => {
        setEditMode(item.id);
        setForm({ ...item });
    };

    const handleSave = () => {
        setData((prev) =>
            prev.map((item) => (item.id === editMode ? { ...form } : item))
        );
        setEditMode(null);
    };

    const handleCancel = () => {
        setEditMode(null);
        setForm({});
    };

    const handleDelete = (id) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    const handleAddNew = () => {
        const newId = Date.now();
        const newEntry = {
            id: newId,
            department_id: null,
            department_name: "",
            manager_id: "",
            month_year: "",
            points: 0,
            given_by: null,
            created_date: new Date().toISOString()
        };
        setData((prev) => [...prev, newEntry]);
        setExpandedId(newId);
        setEditMode(newId);
        setForm(newEntry);
    };

    return (
       <Box>
    {/* Header Section */}
    <Box
    sx={{
        position: "relative",
        width: "100%",
        background: "linear-gradient(90deg, #e3f2fd 0%, #ffffff 60%)",
        borderRadius: 3,
        px: { xs: 3, sm: 5 },
        py: 3,
        boxShadow: "0px 3px 12px rgba(0,0,0,0.06)",
        overflow: "hidden"
    }}
>
    <Grid container alignItems="center" spacing={2}>
        {/* Left Side: Icon + Title + Subtitle */}
        <Grid item xs={12} sm={8}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Box
                        sx={{
                            bgcolor: "#1a73e8",
                            color: "#fff",
                            p: 1.5,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Leaderboard sx={{ fontSize: 32 }} />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Typography variant="h5" fontWeight={700} sx={{ color: "#1a3c72" }}>
                        Department Points Dashboard
                    </Typography>
                    <Typography
                        sx={{
                            color: "#5f6b7a",
                            fontSize: "0.95rem",
                            mt: 0.5
                        }}
                    >
                        Analyze and manage performance scores across all departments.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>

        {/* Right Side: Decorative Badge */}
        <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
            <Box
                        sx={{
                            bgcolor: "#1a73e8",
                            color: "#fff",
                            p: 1.5,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Leaderboard sx={{ fontSize: 32 }} />
                    </Box>
        </Grid>
    </Grid>

    {/* Optional Background Circle Accent */}
    <Box
        sx={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 140,
            height: 140,
            background: "radial-gradient(circle at center, #1a73e8 10%, transparent 60%)",
            opacity: 0.08,
            borderRadius: "50%",
            display: { xs: "none", sm: "block" }
        }}
    />
</Box>

    {/* Cards Section */}
    <Grid container spacing={3} mt={2}>
        {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Paper elevation={3} sx={{ p: 2, position: "relative" }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {item.department_name || "Unnamed"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Manager ID: {item.manager_id}
                    </Typography>
                    <Typography variant="body2">Points: {item.points}</Typography>

                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <IconButton onClick={() => handleToggle(item.id)}>
                            <ExpandMore />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(item)}>
                            <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(item.id)}>
                            <Delete />
                        </IconButton>
                    </Stack>

                    <Collapse in={expandedId === item.id} timeout="auto" unmountOnExit>
                        <Box mt={2}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Department Name"
                                    value={editMode === item.id ? form.department_name : item.department_name}
                                    onChange={(e) => handleChange(e, "department_name")}
                                    fullWidth
                                    disabled={editMode !== item.id}
                                />
                                <TextField
                                    label="Manager ID"
                                    type="number"
                                    value={editMode === item.id ? form.manager_id : item.manager_id}
                                    onChange={(e) => handleChange(e, "manager_id")}
                                    fullWidth
                                    disabled={editMode !== item.id}
                                />
                                <TextField
                                    label="Month-Year"
                                    value={editMode === item.id ? form.month_year : item.month_year}
                                    onChange={(e) => handleChange(e, "month_year")}
                                    fullWidth
                                    disabled={editMode !== item.id}
                                />
                                <TextField
                                    label="Points"
                                    type="number"
                                    value={editMode === item.id ? form.points : item.points}
                                    onChange={(e) => handleChange(e, "points")}
                                    fullWidth
                                    disabled={editMode !== item.id}
                                />

                                {editMode === item.id && (
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" onClick={handleSave}>
                                            <Save sx={{ mr: 1 }} /> Save
                                        </Button>
                                        <Button variant="outlined" onClick={handleCancel}>
                                            <Cancel sx={{ mr: 1 }} /> Cancel
                                        </Button>
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    </Collapse>
                </Paper>
            </Grid>
        ))}
    </Grid>

    {/* Floating Action Button */}
    <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={handleAddNew}
    >
        <Add />
    </Fab>
</Box>

    );
}
