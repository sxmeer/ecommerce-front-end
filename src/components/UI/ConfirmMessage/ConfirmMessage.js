import React from 'react'
import Modal from '../Modal/Modal.js';
import './ConfirmMessage.css';
import logo from "../../../assets/logo_dark.svg";


const ConfirmMessage = (props) => {
  return (
    <Modal
      show={props.show}
      closeModal={props.onNegativeBtnClick} >
      <div className="confirmMessage">
        <img src={logo} alt="" />
        <p className="md">{props.message}</p>
        <div className="confirmMessage__btnDiv">
          <button className="confirmMessage__negBtn danger-btn sm" onClick={props.onNegativeBtnClick}>{props.negativeBtn}</button>
          <button className="confirmMessage__posBtn primary-btn sm" onClick={props.onPositiveBtnClick}>{props.positiveBtn}</button>
        </div>
      </div>
    </Modal >
  )
}

export default ConfirmMessage;
