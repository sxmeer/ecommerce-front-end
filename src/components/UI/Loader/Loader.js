import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import './Loader.css';

const Loader = (props) => {
  let res = null;
  if (!props.show) {
    return res;
  }
  if (props.componentLoading) {
    res = <div className="loader" style={{ position: "absolute", height: "2rem", width: "2rem", marginLeft: "-2rem" }} />
  } else {
    res = <React.Fragment>
      <Backdrop zIndex={1000} show={props.show} close={() => { }} />
      <div className="loader"></div>
    </React.Fragment>
  }
  return res;
};

export default Loader;