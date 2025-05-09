import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Signup.css'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

const Signup = () => {
  const toast = useToast()
  const [userType, setUserType] = useState('customer')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '', // Only for shop owners
    address: '', // Only for shop owners
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/signup', formData)
      toast({
        title: 'Signup successful',
        description: 'You can now login with your credentials',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      // Optionally, redirect to login page here
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: error.response?.data?.error || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <div className="user-type-selector">
          <button
            className={`type-btn ${userType === 'customer' ? 'active' : ''}`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
          <button
            className={`type-btn ${userType === 'shop' ? 'active' : ''}`}
            onClick={() => setUserType('shop')}
          >
            Shop Owner
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {userType === 'shop' && (
            <>
              <div className="form-group">
                <label htmlFor="shopName">Shop Name</label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Shop Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
