import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { logout } from 'StoreRedux/constants/actionTypes';

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch()
  function HandleLogout() {
    dispatch(logout());
  }

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    HandleLogout();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar
          alt="User Avatar"
          src="/path-to-user-image.jpg"
          variant="square"
          sx={{ width: 32, height: 32, borderRadius: "6px" }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileMenu;
