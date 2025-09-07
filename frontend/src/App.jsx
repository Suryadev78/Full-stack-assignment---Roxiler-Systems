import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import { Routes,Route } from 'react-router-dom'
import AdminDashboard from './pages/adminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import UnAuthorized from './pages/unAuthorized'
import NormalUserDashboard from './pages/storeListings'
import StoreOwnerDashboard from './pages/storeOwnerDashboard'

function App() {
  return (
    <Routes>
      <Route path ="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard
      /></ProtectedRoute>}/>
      <Route path="/unauthorized" element={<UnAuthorized/>}/>
      <Route path="/store-listings" element={<ProtectedRoute allowedRoles={["NORMAL_USER","ADMIN"]}><NormalUserDashboard/></ProtectedRoute>}/>
      <Route
       path="/store-owner-dashboard"
       element={
       <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
       <StoreOwnerDashboard />
       </ProtectedRoute>
        }
/>
    </Routes>
    
  )
}

export default App
