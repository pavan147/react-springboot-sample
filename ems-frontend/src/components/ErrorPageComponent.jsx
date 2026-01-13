import React from 'react'

const ErrorPageComponent = ({ message }) => {
  return (
    <div className="error-page" style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
    <h2>Something went wrong</h2>
    <p>{message || "An unexpected error occurred. Please try again later."}</p>
  </div>
  )
}

export default ErrorPageComponent