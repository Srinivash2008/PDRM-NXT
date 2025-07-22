import React, { useContext } from 'react';

// react-bootstrap
import { Alert } from 'react-bootstrap';
import AlertLink from 'react-bootstrap/AlertLink';

// project import
import { useSelector } from 'react-redux';

// ==============================|| NOTIFICATION ||============================== //

const Notification = (props) => {
  const { layoutType } = useSelector((state)=>state.layout)
  return (
    <React.Fragment>
      <Alert variant="warning">
        {props.message}
        <AlertLink href={props.link} target="_blank" className="float-end" style={{ color: layoutType === 'dark' ? 'black' : 'initial' }}>
          Demo & Documentation
        </AlertLink>
      </Alert>
    </React.Fragment>
  );
};

export default Notification;
