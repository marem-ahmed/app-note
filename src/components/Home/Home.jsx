import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Note from '../Note/Note';
import Swal from 'sweetalert2';

export default function Home() {
  const[validate,setvalidate]=useState(null)
  async function addNote(values){
  try {
         let { data } = await axios.post(
           `https://note-sigma-black.vercel.app/api/v1/notes`,values,{
            headers:{token:'3b8ny__'+localStorage.getItem('userToken')}
           }
         );
           handleClose();
           getUserNote()
           clearForm()
         console.log(data);         
       } catch (error) {
         setvalidate(error.response.data.msg);
         console.log(error.response.data.msg);
       }
  }
  async function getUserNote(){
    try {
      let { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        { headers: { token: "3b8ny__" + localStorage.getItem("userToken") } }
      );          
        setnotes(data.notes);
        console.log(data);

    } catch (error) {
      console.log(error);
    }
  }
  async function deleteNote(id){
    try {
      let { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
        }
      );
      getUserNote()
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  function sweatDelete(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ms-2",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteNote(id)
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });

  }
  async function updateNote(id,values) {
    try {
      let { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        values,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("userToken") },
        }
      );
      handleClose();
      getUserNote();
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() =>{ getUserNote()},[]);
  const noteFormik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit:addNote 
  }
  );
  const [notes,setnotes]=useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
function clearForm(){
  noteFormik.values.title='';
    noteFormik.values.content = "";

}
  return (
    <>
      <div className="bg">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="main-color">
            <Modal.Title>New Note</Modal.Title>
          </Modal.Header>
          <Modal.Body className="main-color">
            <form onSubmit={noteFormik.handleSubmit} className="p-3 main-color">
              {validate ? (
                <div className="alert bg-danger-subtle text danger mb-2">
                  {validate}
                </div>
              ) : ''}
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  placeholder="Note Title"
                  defaultValue=''

                  value={noteFormik.values.title}
                  onChange={noteFormik.handleChange}
                  onBlur={noteFormik.handleBlur}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="content"
                  id="content"
                  className="form-control pb-5"
                  placeholder="Note Content"
                  defaultValue=''
                  value={noteFormik.values.content}
                  onChange={noteFormik.handleChange}
                  onBlur={noteFormik.handleBlur}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer className="main-color">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={noteFormik.handleSubmit}>
              Add Note
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container">
          <button
            onClick={handleShow}
            className="main-color btn text-muted align-items-center fs-4 my-5 px-5 py-2"
          >
            <i className="fa-solid fa-plus fs-4 p-2 bg-dark rounded-circle text-light"></i>
            Add New Note
          </button>
          <div className="row gy-4">
            {notes.map((ele) => {
              return (
                <Note
                  key={ele._id}
                  noteDetis={ele}
                  deleteNote={sweatDelete}
                  validation={validate}
                  update={updateNote}
                  userNotes={getUserNote}
                ></Note>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
