import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './VolunteerRegistrationPage.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const normalizeText = (value) => String(value || '').trim()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobilePattern = /^\d{10}$/
const aadhaarPattern = /^\d{12}$/
const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/

const isValidEmail = (value) => emailPattern.test(normalizeText(value))
const isValidMobile = (value) => mobilePattern.test(normalizeText(value))
const isValidAadhaar = (value) => aadhaarPattern.test(normalizeText(value))
const isValidPan = (value) => panPattern.test(normalizeText(value).toUpperCase())

const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result || ''))
  reader.onerror = () => reject(new Error('Failed to read selected file'))
  reader.readAsDataURL(file)
})

function VolunteerRegistrationPage({ onRegister }) {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [idProofType, setIdProofType] = useState('pan')
  const [panNumber, setPanNumber] = useState('')

  const [aadhaarDocumentName, setAadhaarDocumentName] = useState('')
  const [aadhaarDocumentDataUrl, setAadhaarDocumentDataUrl] = useState('')
  const [panDocumentName, setPanDocumentName] = useState('')
  const [panDocumentDataUrl, setPanDocumentDataUrl] = useState('')
  const [domicileDocumentName, setDomicileDocumentName] = useState('')
  const [domicileDocumentDataUrl, setDomicileDocumentDataUrl] = useState('')
  const [profilePhotoDataUrl, setProfilePhotoDataUrl] = useState('')
  const [profilePhotoName, setProfilePhotoName] = useState('')

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileRead = async (file, setter, nameSetter, requiredTypeLabel) => {
    if (!file) {
      setter('')
      nameSetter('')
      return
    }

    const isAllowed = requiredTypeLabel === 'image'
      ? file.type.startsWith('image/')
      : (file.type.startsWith('image/') || file.type === 'application/pdf')

    if (!isAllowed) {
      throw new Error(requiredTypeLabel === 'image' ? 'Please upload an image file' : 'Please upload an image or PDF file')
    }

    const dataUrl = await fileToDataUrl(file)
    setter(dataUrl)
    nameSetter(file.name)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!isValidEmail(email)) {
      setError('Enter a valid email address that includes @')
      return
    }

    if (!isValidMobile(mobileNumber)) {
      setError('Mobile number must be exactly 10 digits')
      return
    }

    if (!isValidAadhaar(aadhaarNumber)) {
      setError('Aadhaar number must be exactly 12 digits')
      return
    }

    if (!normalizeText(address)) {
      setError('Address is required')
      return
    }

    if (idProofType === 'pan' && !isValidPan(panNumber)) {
      setError('PAN number format is invalid')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!aadhaarDocumentDataUrl) {
      setError('Aadhaar document is required')
      return
    }

    if (idProofType === 'pan' && !panDocumentDataUrl) {
      setError('PAN document is required')
      return
    }

    if (idProofType === 'domicile' && !domicileDocumentDataUrl) {
      setError('Domicile document is required')
      return
    }

    if (!profilePhotoDataUrl) {
      setError('Profile photo is required')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/volunteers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          mobileNumber,
          dateOfBirth,
          address,
          password,
          confirmPassword,
          aadhaarNumber,
          aadhaarDocumentName,
          aadhaarDocumentDataUrl,
          idProofType,
          panNumber,
          panDocumentName,
          panDocumentDataUrl,
          domicileDocumentName,
          domicileDocumentDataUrl,
          profilePhotoDataUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register volunteer')
      }

      setMessage(data.message || 'Volunteer registered successfully')
      if (typeof onRegister === 'function') {
        onRegister(data.data)
      }
      navigate(`/volunteer-dashboard/${data.data.id}`)
    } catch (submitError) {
      setError(submitError.message || 'Failed to register volunteer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="volunteer-form-wrap">
      <div className="volunteer-form-panel">
        <h2>Volunteer Registration</h2>
        <p>Fill all fields to create your volunteer profile.</p>
        <p className="volunteer-inline-login-note">Already registered? <Link to="/volunteer-login">Login here</Link></p>

        <form className="volunteer-form-grid" onSubmit={handleSubmit}>
          <div className="volunteer-field">
            <label htmlFor="volunteer-full-name">Name</label>
            <input id="volunteer-full-name" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
          </div>

          <div className="volunteer-field">
            <label htmlFor="volunteer-email">Email</label>
            <input id="volunteer-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>

          <div className="volunteer-field">
            <label htmlFor="volunteer-mobile">Mobile Number</label>
            <input id="volunteer-mobile" type="tel" maxLength={10} value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value.replace(/\D/g, '').slice(0, 10))} required />
          </div>

          <div className="volunteer-field">
            <label htmlFor="volunteer-dob">DOB</label>
            <input id="volunteer-dob" type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} required />
          </div>

          <div className="volunteer-field volunteer-field-full">
            <label htmlFor="volunteer-address">Address</label>
            <textarea
              id="volunteer-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="volunteer-field">
            <label htmlFor="volunteer-password">Password</label>
            <input id="volunteer-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>

          <div className="volunteer-field">
            <label htmlFor="volunteer-confirm-password">Confirm Password</label>
            <input id="volunteer-confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
          </div>

          <div className="volunteer-field">
            <label htmlFor="volunteer-aadhaar-number">Aadhaar Number</label>
            <input id="volunteer-aadhaar-number" type="text" maxLength={12} value={aadhaarNumber} onChange={(event) => setAadhaarNumber(event.target.value.replace(/\D/g, '').slice(0, 12))} required />
          </div>

          <div className="volunteer-field">
            <label htmlFor="volunteer-aadhaar-upload">Aadhaar Card Upload (PDF/Image)</label>
            <input
              id="volunteer-aadhaar-upload"
              type="file"
              accept="image/*,application/pdf"
              onChange={async (event) => {
                try {
                  await handleFileRead(event.target.files?.[0], setAadhaarDocumentDataUrl, setAadhaarDocumentName, 'document')
                  setError('')
                } catch (uploadError) {
                  setError(uploadError.message)
                }
              }}
              required
            />
            {aadhaarDocumentName ? <small>{aadhaarDocumentName}</small> : null}
          </div>

          <div className="volunteer-field volunteer-field-full">
            <label htmlFor="volunteer-id-proof">Choose PAN or Domicile</label>
            <select id="volunteer-id-proof" value={idProofType} onChange={(event) => setIdProofType(event.target.value)}>
              <option value="pan">PAN</option>
              <option value="domicile">Domicile</option>
            </select>
          </div>

          {idProofType === 'pan' ? (
            <>
              <div className="volunteer-field">
                <label htmlFor="volunteer-pan-number">PAN Number</label>
                <input id="volunteer-pan-number" type="text" maxLength={10} value={panNumber} onChange={(event) => setPanNumber(event.target.value.toUpperCase())} required />
              </div>

              <div className="volunteer-field">
                <label htmlFor="volunteer-pan-upload">PAN Upload (PDF/Image)</label>
                <input
                  id="volunteer-pan-upload"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={async (event) => {
                    try {
                      await handleFileRead(event.target.files?.[0], setPanDocumentDataUrl, setPanDocumentName, 'document')
                      setError('')
                    } catch (uploadError) {
                      setError(uploadError.message)
                    }
                  }}
                  required
                />
                {panDocumentName ? <small>{panDocumentName}</small> : null}
              </div>
            </>
          ) : (
            <div className="volunteer-field volunteer-field-full">
              <label htmlFor="volunteer-domicile-upload">Domicile Upload (PDF/Image)</label>
              <input
                id="volunteer-domicile-upload"
                type="file"
                accept="image/*,application/pdf"
                onChange={async (event) => {
                  try {
                    await handleFileRead(event.target.files?.[0], setDomicileDocumentDataUrl, setDomicileDocumentName, 'document')
                    setError('')
                  } catch (uploadError) {
                    setError(uploadError.message)
                  }
                }}
                required
              />
              {domicileDocumentName ? <small>{domicileDocumentName}</small> : null}
            </div>
          )}

          <div className="volunteer-field volunteer-field-full">
            <label htmlFor="volunteer-photo-upload">Profile Photo Upload</label>
            <input
              id="volunteer-photo-upload"
              type="file"
              accept="image/*"
              onChange={async (event) => {
                try {
                  await handleFileRead(event.target.files?.[0], setProfilePhotoDataUrl, setProfilePhotoName, 'image')
                  setError('')
                } catch (uploadError) {
                  setError(uploadError.message)
                }
              }}
              required
            />
            {profilePhotoName ? <small>{profilePhotoName}</small> : null}
          </div>

          {error ? <p className="volunteer-form-error">{error}</p> : null}
          {message ? <p className="volunteer-form-success">{message}</p> : null}

          <div className="volunteer-field volunteer-field-full volunteer-actions">
            <button type="button" className="volunteer-outline-btn" onClick={() => navigate('/')}>Back</button>
            <button type="submit" className="volunteer-submit-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register Volunteer'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default VolunteerRegistrationPage
