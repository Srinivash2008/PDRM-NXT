import React, { useState, useRef } from "react";
import styles from "./Navbar.module.css";
import {
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Link as MuiLink,Zoom
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { FaPaperPlane, FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";
import { ProfileMenu } from "lazyImports";

const Navbar = () => {
  const dropdownItems = [
    { label: "PTS", url: "https://pdmrindia.in/pts/" },
    { label: "IMS", url: "http://192.168.6.38:8000/signin" },
    { label: "iCreate", url: "http://icreate.pdmrindia.in/" },
    { label: "FMS", url: "https://pdmrindia.in/fms/" },
    { label: "HELP DESk", url: "http://pdmrindia.in/pdmrhelpdesk/" },
    {label: "Chats", url: "https://pdmrindia.in/pdmrchat/user/"},
    {label:"Employee Applaud Card", url: "https://pdmrindia.in/fms/index.php/eapplaud/individual_eapplaud/2008"}
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Home");
  const [landingsOpen, setLandingsOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const scrollRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    if (landingsOpen) setLandingsOpen(false);
  };

  const handleMenuItemClick = (item) => {
    setSelectedMenu(item);
    if (item === "Landings") {
      setLandingsOpen(!landingsOpen);
    } else {
      setLandingsOpen(false);
    }
    if (isMobile) toggleMobileMenu();
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <FaPaperPlane color="#005c8a" />
          <span className={styles.logo}>PDMR NXT</span>
        </div>

        {isMobile ? (
          <>
            <IconButton
              onClick={toggleMobileMenu}
              className={styles.mobileMenuBtn}
              sx={{
                backgroundColor: "#e6f2fa",
                padding: "0px",
                borderRadius: "0px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#d4e9f5",
                  transform: "scale(1.05)",
                },
              }}
            >
              {mobileOpen ? (
                <FaTimes size={22} color="#005c8a" />
              ) : (
                <FaBars size={22} color="#005c8a" />
              )}
            </IconButton>
            <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
              <List className={styles.mobileDrawerList}>
                <ListItem className={styles.mobileDrawerHeader}>
                  <IconButton onClick={toggleMobileMenu}>
                    <FaTimes size={20} color="#005c8a" />
                  </IconButton>
                </ListItem>

                {["Home", "Landings", "Blocks", "Dashboard", "Pages", "Docs"].map((item) => (
                  <ListItem
                    button
                    key={item}
                    onClick={() => handleMenuItemClick(item)}
                    className={selectedMenu === item ? styles.active : ""}
                  >
                    <ListItemText primary={item} />
                    {item === "Landings" &&
                      (landingsOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
                  </ListItem>
                ))}

                <ListItem className={styles.mobileDrawerActions}>
                  <IconButton>
                    <FaGithub size={20} color="#005c8a" />
                  </IconButton>
                  <button className={styles.buyNowBtn}>Buy Now</button>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <div className={styles.navCenter}>
              {["Home", "Landings", "About", "Contact"].map((item) => (
                <div key={item} className={styles.navItemWrapper}>
                  <span
                    className={`${styles.navItem} ${
                      selectedMenu === item ? styles.active : ""
                    }`}
                    onClick={() => handleMenuItemClick(item)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                    {item === "Landings" &&
                      (landingsOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.navRight}>
              <ProfileMenu />
            </div>
          </>
        )}
      </nav>

      {/* Dropdown Section Below Navbar */}
      {selectedMenu === "Landings" && landingsOpen && (
        <Box
          sx={{
            
            position: "relative",
            width: "80%",
            bgcolor: "#f9f9f9",
            margin: "0 auto",
            py: 2,
            px: { xs: 1, sm: 4 },
            overflow: "hidden",
            boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.1)",
          }}
        >
          {/* Arrows (Desktop Only) */}
          {!isMobile && (
            <>
              <IconButton
                onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  bgcolor: "#fff",
                  boxShadow: 1,
                }}
              >
                <ExpandLess sx={{ transform: "rotate(90deg)" }} />
              </IconButton>
              <IconButton
                onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  bgcolor: "#fff",
                  boxShadow: 1,
                }}
              >
                <ExpandMore sx={{ transform: "rotate(90deg)" }} />
              </IconButton>
            </>
          )}

          <DropdownContent
            dropdownItems={dropdownItems}
            scrollRef={scrollRef}
          />
        </Box>
      )}
    </>
  );
};

// DropdownContent Component
const DropdownContent = ({ dropdownItems, scrollRef }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      ref={scrollRef}
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        overflowX: "auto",
        scrollBehavior: "smooth",
        gap: 3,
        px: 1,
        py: 2,
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",

        // Hide scrollbar
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, Edge
        },
      }}
    >
      {dropdownItems.map((item, i) => (
        <Zoom
          in
          style={{ transitionDelay: `${i * 100}ms` }}
          key={i}
        >
          <MuiLink
            href={item.url === 'https://pdmrindia.in/fms/index.php/eapplaud/individual_eapplaud/2008' ?  '/Employee_Applaud_Card/index' :item.url }
            target={item.url === 'https://pdmrindia.in/fms/index.php/eapplaud/individual_eapplaud/2008' ?  '' : "_blank" }
            rel="noopener"
            underline="none"
            sx={{
              flex: "0 0 auto",
              scrollSnapAlign: "start",
              width: { xs: 160, sm: 180, md: 200 },
              height: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              bgcolor: "#fff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 90,
                overflow: "hidden",
                borderBottom: "1px solid #e0e0e0",
                bgcolor: "#f9f9f9",
                position: "relative",
              }}
            >
              <Box
                component="iframe"
                src={item.url}
                title={item.label}
                sx={{
                  width: "1400px",
                  height: "768px",
                  transform: "scale(0.15)",
                  transformOrigin: "top left",
                  pointerEvents: "none",
                  border: "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </Box>
            <Box sx={{ p: 1, textAlign: "center" }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {item.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Preview
              </Typography>
            </Box>
          </MuiLink>
        </Zoom>
      ))}
    </Box>
  );
};

export default Navbar;
