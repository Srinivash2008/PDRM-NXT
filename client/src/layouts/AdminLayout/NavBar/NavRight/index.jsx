import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// react-bootstrap
import { ListGroup, Dropdown, Card } from 'react-bootstrap';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project import
import ChatList from './ChatList';

// assets
import avatar1 from '../../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../../assets/images/user/avatar-3.jpg';
import avatar4 from '../../../../assets/images/user/avatar-4.jpg';
import { logout } from 'StoreRedux/constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedIcon from 'components/AnimatedIcons/AnimatedIcons';
import { useScreenDetector } from 'components/ScreenDetector/useScreenDetector';

// ==============================|| NAV RIGHT ||============================== //

const NavRight = () => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isMobile, isDesktop } = useScreenDetector();
  function HandleLogout() {
    dispatch(logout());
  }

  return (
    <React.Fragment>
      {isDesktop && <div style={{ marginRight: '4%' }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          height: '40px',
          width: "max-content",
          padding: '15%'
        }}>
          <AnimatedIcon
            iconId="fmasbomy"
            size={17}
            trigger="click"
            colors={!isMobile ? "primary:#ffffff" : "#000"}
            style={{ marginRight: '5%' }}
          />
          <p className='mt-3' style={{ textTransform: 'uppercase', color: isMobile ? '#000' : "white" }}>
            {user?.username}
          </p>
        </div>
      </div>}
      <Link onClick={HandleLogout} className="logout-link" style={{ display: 'flex', alignItems: 'center', marginBottom: !isDesktop ? '10px' : '0px'  }}>
        <i className="feather icon-log-out" style={{ fontWeight: 'bolder', marginRight: '8px', color: "white" }} />
        <span style={{ fontSize: '12px', fontWeight: 'bolder', marginRight: '20px', color: "white" }}>LOGOUT</span>
      </Link>

    </React.Fragment >
  );
};

export default NavRight;
