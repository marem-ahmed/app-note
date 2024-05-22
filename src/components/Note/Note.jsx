import React, { useState } from 'react'
import { useFormik } from 'formik';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';

export default function Note({ noteDetis, deleteNote, validation, update, userNotes }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function sweatUpdate(x) {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        updateNote(x);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  function updateNote(x) {
    update(noteDetis._id, x);
    userNotes()
    handleClose();
    console.log(x);
  }
  const upFormik = useFormik({
    initialValues: {
      title: noteDetis.title,
      content: noteDetis.content,
    },
    onSubmit: sweatUpdate,
  });
  return (
    <>
      <div className="col-md-4">
        <div className="main-color note p-4 rounded-3 ">
          <div className="text-center">
            <h6 className="lobster-regular">{noteDetis.title}</h6>
            <hr />
            <p className="text-start Poppins-regular">{noteDetis.content}</p>
            <div className="d-flex ">
              <i
                style={{ cursor: "pointer" }}
                className="fa fa-trash-can fs-5 me-3"
                onClick={() => deleteNote(noteDetis._id)}
              ></i>
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-pen-to-square fs-5"
                onClick={handleShow}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto fw-bold">Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={upFormik.handleSubmit}>
            {validation ? (
              <div className="alert bg-danger-subtle text danger mb-2">
                {validation}
              </div>
            ) : null}
            <input
              onChange={upFormik.handleChange}
              defaultValue={noteDetis.title}
              type="text"
              className="form-control mb-2 fw-semibold"
              id="title"
              name="title"
              placeholder="Note Title"
            />
            <textarea
              onChange={upFormik.handleChange}
              defaultValue={noteDetis.content}
              className="form-control fw-semibold"
              name="content"
              id="content"
              rows="5"
              col="20"
              placeholder="Note Content"
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={upFormik.handleSubmit}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
