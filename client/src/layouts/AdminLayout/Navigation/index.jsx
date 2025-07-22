import React, { useEffect, useState } from 'react';

// project import
import useWindowSize from '../../../hooks/useWindowSize';
import NavContent from './NavContent';
import navigation from '../../../menu-items';
import {useSelector } from 'react-redux';

// ==============================|| NAVIGATION ||============================== //

const Navigation = () => {
  const { layoutType, collapseMenu } = useSelector((state) => state.layout);
  const { user } = useSelector((state) => state.auth);
  const [filteredMenus, setFilteredMenus] = useState([]);

  const filterMenus = (items) => {
    return items.reduce((acc, item) => {
      if (item.role && item.role.includes(user.role)) {
        const newItem = { ...item }; 
        if (item.children) {
          newItem.children = filterMenus(item.children);
        }
        acc.push(newItem); 
      }
      return acc; 
    }, []);
  };

  useEffect(() => {
    const filtered = filterMenus(navigation.items[0].children);
    setFilteredMenus(filtered);
  }, [user.role]);

  const windowSize = useWindowSize();

  const scroll = () => {
    document.querySelector('.pcoded-navbar').removeAttribute('style');
  };

  let navClass = ['pcoded-navbar', layoutType, 'menupos-fixed'];

  // Handle mobile and collapse menu states
  if (windowSize.width < 992 && collapseMenu) {
    navClass.push('mob-open');
  } else if (collapseMenu) {
    navClass.push('navbar-collapsed');
  }

  const navBarClass = ['navbar-wrapper'];

  return (
    <React.Fragment>
      <nav className={navClass.join(' ')}>
        <div className={navBarClass.join(' ')}>
          {/* Pass the filtered navigation object to NavContent */}
          <NavContent navigation={[{ ...navigation.items[0], children: filteredMenus }]} />
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
