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
    res = <>
      <Backdrop show={props.show} />
      <div className="loader"></div>
    </>
  }
  return res;
};

export default Loader;