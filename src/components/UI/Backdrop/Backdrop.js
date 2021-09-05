import React from 'react';
import './Backdrop.css'
const backdrop = (props) => {
  const onClick = (event) => {
    props.close();
    event.cancelBubble = true;
    event.stopPropagation();
  }
  return (
    props.show && <div className="backdrop" style={{ zIndex: props.zIndex ? props.zIndex : 100 }} onClick={onClick}></div>
  )
};

export default backdrop;