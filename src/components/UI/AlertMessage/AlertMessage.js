import React from 'react'
import Modal from '../Modal/Modal.js';
import './AlertMessage.css';
import logo from "../../../assets/logo_dark.svg";

const AlertMessage = (props) => {
  return (
    <Modal
      borderRadius="1rem"
      show={props.show}
      closeModal={props.onPositiveBtnClick} >
      <div className="alertMessage">
        <img src={logo} alt="" />
        <p className="md">{props.message}</p>
        <button className="alertMessage__negBtn primary-btn sm" onClick={props.onPositiveBtnClick}>{props.positiveBtn}</button>
      </div>
    </Modal>
  )
}

export default AlertMessage;
