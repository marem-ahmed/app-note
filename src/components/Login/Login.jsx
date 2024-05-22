import React from 'react'
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import{ useState } from "react";
import * as Yup from "yup";

export default function Login() {
    const navigate=useNavigate()
    const[errMsg,seterrMsg]=useState(false)
    const [isLoading, setisLoading] =useState(false) ;

     async function login(values) {
       seterrMsg("");
       setisLoading(true);
       try {
         let { data } = await axios.post(
           `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
           values
         );
         console.log(data);
        localStorage.setItem("userToken", data.token);
        navigate("/home");
         
       } catch (error) {
         console.log(error);
       }
     }
      const validate = Yup.object({
        email: Yup.string()
          .email("email not valid")
          .required("email is required"),
        password: Yup.string().min(4).max(12).required("password is required"),
      
      });
     const loginFormik = useFormik({
       initialValues: {
         email: "",
         password: "",
         
       },

       validationSchema: validate,
       onSubmit: login,
     });
    
  return (
    <>
      <div className="bg py-5">
        <form
          className="w-50 p-md-5 mx-5  rounded-3"
          onSubmit={loginFormik.handleSubmit}
        >
          <h1 className="Text-center main-color-text">Login Now:</h1>

          <div class="mb-3">
            <input
              type="email"
              name="email"
              id="email"
              class="form-control  py-2"
              placeholder="Email"
              value={loginFormik.values.email}
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
            />
            {loginFormik.errors.email && loginFormik.touched.email ? (
              <div className="alert bg-danger-subtle mt-1 p-2 text-danger  fw-bold ">
                {loginFormik.errors.email}
              </div>
            ) : null}
          </div>
          <div class="mb-3">
            <input
              type="Password"
              name="password"
              id="password"
              class="form-control  py-2"
              placeholder="Password"
              value={loginFormik.values.password}
              onBlur={loginFormik.handleBlur}
              onChange={loginFormik.handleChange}
            />
            {loginFormik.errors.password && loginFormik.touched.password ? (
              <div className="alert bg-danger-subtle mt-1 fw-bold text-danger">
                {loginFormik.errors.password}
              </div>
            ) : null}
          </div>

          <button type="submit" className="btn main-color text-muted">
            Login
          </button>
          <p className="mt-2 fw-bold text-muted ">
            Don't have account ?{" "}
            <Link className="main-color-text">Register Now</Link>
          </p>
        </form>
      </div>
    </>
  );
}
