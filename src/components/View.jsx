import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./View.css"; // Make sure to import your CSS file
import { useSelector } from "react-redux";

const View = ({ onhandleclose, id }) => {
  const dataAll = useSelector((state) => state.fetchapp.user);
  const singleUserData = dataAll.filter((ele) => ele.id === id);
  return (
    <div>
      <div className="modal-overlay">
        <Modal.Dialog className="custom-modal">
          <Modal.Header>
            <Modal.Title className="modal_title">
              {singleUserData[0].name}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{singleUserData[0].email}</p>
          </Modal.Body>
          <Modal.Body>
            <p>Age is {singleUserData[0].age}</p>
          </Modal.Body>
          <Modal.Body>
            <p>
              Gender is <strong>{singleUserData[0].gender}</strong>{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={onhandleclose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default View;
