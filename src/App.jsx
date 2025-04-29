import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Products from './pages/Products'
import ShopOwnerDashboard from './pages/ShopOwnerDashboard'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const { user } = useAuth()
  const isAuthenticated = !!user
  const userType = user?.userType || 'customer'

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="signup"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Signup />
          }
        />
        
        {/* Protected Routes */}
        <Route
          path="products"
          element={
            isAuthenticated ? (
              <Products />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="dashboard"
          element={
            isAuthenticated && userType === 'shop_owner' ? (
              <ShopOwnerDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
