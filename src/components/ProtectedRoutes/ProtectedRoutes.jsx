import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoutes({children}) {
  const token=localStorage.getItem('userToken')
  const navigate=useNavigate()
  if(token===null){
    navigate('./login')
  }
  return (
    <>
    {children}</>
  )
}
