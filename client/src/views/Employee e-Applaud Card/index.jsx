import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Stack,
  Tabs,
  Tab,
  Button,
  useTheme
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import StarIcon from "@mui/icons-material/Star";
import { DepartmentPointsManager, GoodiesManager } from "lazyImports";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  backgroundColor: "#ffffff",
  color: theme.palette.text.primary
}));

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ width: "100%" }}
      aria-labelledby={`tabpanel-${index}`}
    >
      {value === index && <Box sx={{ py: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

export default function SuperAdminDashboard() {
  const [tab, setTab] = useState(0);
  const theme = useTheme();

  const handleGoodiesAction = () => alert("Goodies action!");
  const handleCreditsAction = () => alert("Credits action!");
  const handleReportAction = () => alert("Generate report!");
  const handleOtherAction = () => alert("Other action!");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        p: { xs: 2, sm: 4 }
      }}
    >

      <Box sx={{
        width: {
          xs: "100%",   // full width on small devices
          sm: "100%",   // full width on tablets
          md: "100%"    // full width on desktop
        },
        maxWidth: {
          xs: "100%",    // no max width on small
          sm: "100%",    // no max width on tablets
          md: "100%"     // full width on desktop
        },
        mx: {
          xs: 0,
          sm: 0,
          md: 0
        }
      }}>
        <StyledCard>
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              mb: 2,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.1rem" }
              }
            }}
          >
            <Tab label="Goodies" icon={<LocalOfferIcon />} iconPosition="start" />
            <Tab label="Credits" icon={<CreditCardIcon />} iconPosition="start" />
            <Tab label="Report" icon={<AssessmentIcon />} iconPosition="start" />
            <Tab label="Orders" icon={<ShoppingCartIcon />} iconPosition="start" />
            <Tab label="Team Applaud" icon={<StarIcon />} iconPosition="start" />
          </Tabs>

          <Box>
            <TabPanel value={tab} index={0}>
              <GoodiesManager />
            </TabPanel>

            <TabPanel value={tab} index={1}>
              <DepartmentPointsManager />
            </TabPanel>

            <TabPanel value={tab} index={2}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Generate Reports 📊
              </Typography>
              <Typography sx={{ mb: 3, color: "text.secondary" }}>
                View reports on goodies, credits, and team activity.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#1976d2", color: "#fff" }}
                  onClick={handleReportAction}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#1976d2", borderColor: "#1976d2" }}
                  onClick={() => alert("View Reports")}
                >
                  View Reports
                </Button>
              </Stack>
            </TabPanel>

            <TabPanel value={tab} index={3}>

            </TabPanel>
            <TabPanel value={tab} index={4}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Team Applaud 🌟
              </Typography>
              <Typography sx={{ mb: 3, color: "text.secondary" }}>
                Recognize team contributions and efforts.
              </Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: "#43a047", color: "#fff" }}
                onClick={handleOtherAction}
              >
                View Team Applaud
              </Button>
            </TabPanel>
          </Box>
        </StyledCard>
      </Box>
    </Box>
  );
}
