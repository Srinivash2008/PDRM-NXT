import React from 'react';
import { Card } from 'react-bootstrap';

const OrderCard = ({ params, style }) => {
  let cardClass = ['order-card'];
  if (params.class) {
    cardClass.push(params.class);
  }

  // Base styles for the card
  const cardStyle = {
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    height: '140px',
    width:"100%"
  };

  // Hover styles
  const hoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  // Shark-wrap effect style
  const sharkWrapStyle = {
    content: '""',
    position: 'absolute',
    inset: '-20%',
    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 60%)',
    animation: isHovered ? 'shark-wrap 3.5s infinite' : 'none', 
    transform: isHovered ? 'translateX(-100%)' : 'translateX(100%)',
    transition: 'transform 1s linear', 
  };
  
  
  return (
    <Card
      className={cardClass.join(' ')}
      style={{
        ...cardStyle,
        ...(isHovered ? hoverStyle : {}),
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={sharkWrapStyle} />
      <Card.Body className="d-flex flex-column justify-content-center text-center">
        <h6 
          className="text-white" 
          style={{
            fontSize: '1.2rem', 
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', 
            marginBottom: '15px', 
          }}
        >
          {params.title}
        </h6>
        <h2 className="text-end text-white">
          {params.icon ? ( 
            <span className="float-start" style={{ opacity: 0.5, marginTop: 10 }}>
              {params.icon} 
            </span>
          ) : null}
          <span>{params.primaryText}</span>
        </h2>
        <p className="mb-0">
          {params.secondaryText}
          <span className="float-end">{params.extraText}</span>
        </p>
      </Card.Body>
    </Card>
  );
};

export default OrderCard;
