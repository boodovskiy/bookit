'use client';
import React from 'react'
import { AuthProvider } from '../context/authContext';

const AuthWrapper = ({ children }) => {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}

export default AuthWrapper