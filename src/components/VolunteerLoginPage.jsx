import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './VolunteerLoginPage.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const normalizeText = (value) => String(value || '').trim()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValidEmail = (value) => emailPattern.test(normalizeText(value))

function VolunteerLoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!isValidEmail(email)) {
      setError('Enter a valid email address that includes @')
      return
    }

    if (!normalizeText(password)) {
      setError('Password is required')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/volunteers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login volunteer')
      }

      if (typeof onLogin === 'function') {
        onLogin(data.data)
      }

      navigate(`/volunteer-dashboard/${data.data.id}`)
    } catch (loginError) {
      setError(loginError.message || 'Failed to login volunteer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="volunteer-login-wrap">
      <div className="volunteer-login-panel">
        <h2>Volunteer Login</h2>
        <p>Already registered volunteers can login here.</p>

        <form onSubmit={handleSubmit} className="volunteer-login-form">
          <label htmlFor="volunteer-login-email">Email</label>
          <input
            id="volunteer-login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="volunteer-login-password">Password</label>
          <input
            id="volunteer-login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error ? <p className="volunteer-login-error">{error}</p> : null}

          <div className="volunteer-login-actions">
            <button type="button" className="volunteer-outline-btn" onClick={() => navigate('/')}>Back</button>
            <button type="submit" className="volunteer-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </div>

          <p className="volunteer-login-register-link">
            New volunteer? <Link to="/volunteer-register">Register here</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default VolunteerLoginPage
