import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
export default function Register() {
    const [errMsg,seterrMsg]=useState(false)
    const[isLoading,setisLoading]=useState(false)
    const navigate=useNavigate()

     async function register(values) {     
        seterrMsg("");
        setisLoading(true);
        try {
            let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
            console.log(data);
            if(data.msg==="done"){
            navigate("/login");
            }
           
        } catch (error) {
            console.log(error);
        }
         

     }
      const validate = Yup.object({
        name: Yup.string()
          .min(4, "name is too short")
          .max(19, "name is too long")
          .required("name is requried"),
        email: Yup.string()
          .email("email not valid")
          .required("email is required"),
        password: Yup.string()
          .min(4).max(12)
          .required("password is required"),
        age: Yup.number().required("phone is required").min(18),
        phone: Yup.string()
          .required("phone is required")
          .matches(/^01[0125][0-9]{8}$/, "invalid phone"),
      });
     const registerFormik = useFormik({
       initialValues: {
         name: "",
         email: "",
         password: "",
         age: "",
         phone: "",
       },

       validationSchema: validate,
       onSubmit: register,
     });
  return (
    <div className="bg py-5">
      <form
        className="w-50 p-5  rounded-3 mx-5  "
        onSubmit={registerFormik.handleSubmit}
      >
        <h1 className="Text-center main-color-text">Register Now:</h1>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            id="name"
            className="form-control py-2"
            placeholder="Name"
            value={registerFormik.values.name}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
          />
          {registerFormik.errors.name && registerFormik.touched.name ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
              {registerFormik.errors.name}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            id="email"
            className="form-control  py-2"
            placeholder="Email"
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
          />
          {registerFormik.errors.email && registerFormik.touched.email ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
              {registerFormik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <input
            type="Password"
            name="password"
            id="password"
            className="form-control  py-2"
            placeholder="Password"
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
          />
          {registerFormik.errors.password && registerFormik.touched.password ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
              {registerFormik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="mb-3">
          <input
            type="age"
            name="age"
            id="age"
            className="form-control  py-2"
            placeholder="Age"
            value={registerFormik.values.age}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
          />
          {registerFormik.errors.age && registerFormik.touched.age ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
              {registerFormik.errors.age}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control  py-2"
            placeholder="Phone"
            value={registerFormik.values.phone}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
          />
          {registerFormik.errors.phone && registerFormik.touched.phone ? (
            <div className="alert bg-danger-subtle mt-1 p-2 fw-bold text-danger">
              {registerFormik.errors.phone}
            </div>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="btn main-color text-muted">
          {" "}
          Register
        </button>
        <p className="mt-2 fw-bold text-muted ">
          if you have account ?{" "}
          <Link className="main-color-text">Login Now</Link>
        </p>
      </form>
    </div>
  );
}
