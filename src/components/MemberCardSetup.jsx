import { useEffect, useMemo, useState } from 'react'
import MemberIdCard from './MemberIdCard'
import './MemberCardSetup.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const createInitialFormState = (member = {}, profile = {}) => ({
  fullName: profile.fullName || member.fullName || '',
  email: profile.email || member.email || '',
  referralCode: profile.referralCode || member.referralCode || member.id || '',
  mobileNumber: profile.mobileNumber || member.mobileNumber || '',
  dateOfBirth: profile.dateOfBirth || member.dateOfBirth || '',
  registrationDate: profile.registrationDate || profile.createdAt || member.registrationDate || member.createdAt || '',
  stateName: profile.stateName || member.stateName || '',
  districtName: profile.districtName || member.districtName || '',
  tehsilName: profile.tehsilName || member.tehsilName || '',
  blockName: profile.blockName || member.blockName || '',
  villageName: profile.villageName || member.villageName || '',
  cardPhotoDataUrl: profile.cardPhotoDataUrl || member.cardPhotoDataUrl || '',
})

export default function MemberCardSetup({ member, showForm = false }) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formState, setFormState] = useState(() => createInitialFormState(member))
  const [profileLoaded, setProfileLoaded] = useState(false)

  const previewMember = useMemo(() => ({
    ...member,
    ...formState,
    cardPhotoDataUrl: formState.cardPhotoDataUrl || member?.cardPhotoDataUrl || '',
    mobileNumber: formState.mobileNumber || member?.mobileNumber || '',
    dateOfBirth: formState.dateOfBirth || member?.dateOfBirth || '',
    registrationDate: formState.registrationDate || member?.registrationDate || member?.createdAt || '',
  }), [member, formState])

  useEffect(() => {
    if (!member?.id) {
      return
    }

    const loadMemberCard = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}/api/blocks/card/${member.id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load member card data')
        }

        const profile = data.data || {}
        setFormState(createInitialFormState(member, profile))
        setProfileLoaded(Boolean(profile.dateOfBirth || profile.cardPhotoDataUrl))
      } catch (loadError) {
        setError(loadError.message || 'Failed to load member card data')
        setFormState(createInitialFormState(member))
      } finally {
        setLoading(false)
      }
    }

    loadMemberCard()
  }, [member])

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value
    setFormState((previous) => ({ ...previous, [field]: value }))
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const sourceDataUrl = String(reader.result || '')
      if (!sourceDataUrl) {
        return
      }

      const image = new Image()
      image.onload = () => {
        const maxWidth = 900
        const maxHeight = 900
        const widthRatio = maxWidth / image.width
        const heightRatio = maxHeight / image.height
        const scale = Math.min(1, widthRatio, heightRatio)
        const outputWidth = Math.max(1, Math.round(image.width * scale))
        const outputHeight = Math.max(1, Math.round(image.height * scale))

        const canvas = document.createElement('canvas')
        canvas.width = outputWidth
        canvas.height = outputHeight
        const context = canvas.getContext('2d')
        if (!context) {
          return
        }

        context.drawImage(image, 0, 0, outputWidth, outputHeight)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78)

        if (compressedDataUrl.length > 1_700_000) {
          setError('Photo size is too large. Please choose a smaller image.')
          return
        }

        setError('')
        setFormState((previous) => ({
          ...previous,
          cardPhotoDataUrl: compressedDataUrl,
        }))
      }
      image.src = sourceDataUrl
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!member?.id) {
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/card/${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: formState.mobileNumber,
          dateOfBirth: formState.dateOfBirth,
          cardPhotoDataUrl: formState.cardPhotoDataUrl,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save member card details')
      }

      const profile = data.data || {}
      setFormState(createInitialFormState(member, profile))
      setSuccess(data.message || 'Card details saved successfully')
      setProfileLoaded(Boolean(profile.dateOfBirth || profile.cardPhotoDataUrl))
    } catch (saveError) {
      setError(saveError.message || 'Failed to save member card details')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="member-card-setup-shell">
      <div className="member-card-setup-copy">
        <h2>Get Card</h2>
        <p>Upload your photo, confirm your details, and save once. The card will be available for download anytime.</p>
      </div>

      <div className="member-card-setup-grid">
        {showForm ? (
        <form className="member-card-setup-form" onSubmit={handleSubmit}>
          <div className="member-card-form-grid">
            <div className="member-card-field member-card-field-full">
              <label>Member ID</label>
              <input type="text" value={formState.referralCode || '-'} readOnly />
            </div>
            <div className="member-card-field">
              <label>Name</label>
              <input type="text" value={formState.fullName} readOnly />
            </div>
            <div className="member-card-field">
              <label>Email</label>
              <input type="text" value={formState.email} readOnly />
            </div>
            <div className="member-card-field">
              <label>Mobile Number</label>
              <input type="text" value={formState.mobileNumber} onChange={handleFieldChange('mobileNumber')} placeholder="Enter mobile number" required />
            </div>
            <div className="member-card-field">
              <label>Date of Birth</label>
              <input type="date" value={formState.dateOfBirth} onChange={handleFieldChange('dateOfBirth')} required />
            </div>
            <div className="member-card-field">
              <label>State</label>
              <input type="text" value={formState.stateName} readOnly />
            </div>
            <div className="member-card-field">
              <label>District</label>
              <input type="text" value={formState.districtName} readOnly />
            </div>
            <div className="member-card-field">
              <label>Tehsil</label>
              <input type="text" value={formState.tehsilName} readOnly />
            </div>
            <div className="member-card-field">
              <label>Block</label>
              <input type="text" value={formState.blockName} readOnly />
            </div>
            <div className="member-card-field">
              <label>Village</label>
              <input type="text" value={formState.villageName} readOnly />
            </div>
            <div className="member-card-field member-card-field-full">
              <label>Upload Photo</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} required={!formState.cardPhotoDataUrl} />
            </div>
          </div>

          {error && <p className="admin-error-text">{error}</p>}
          {success && <p className="admin-success-text">{success}</p>}

          <div className="member-card-form-actions">
            <button type="submit" className="admin-submit-btn" disabled={saving || loading}>
              {saving ? 'Saving...' : profileLoaded ? 'Update Card Details' : 'Save Card Details'}
            </button>
          </div>
        </form>
        ) : null}

        {profileLoaded ? (
          <div className="member-card-preview-wrap">
            <MemberIdCard member={previewMember} />
          </div>
        ) : (
          <div className="member-card-preview-wrap member-card-preview-placeholder">
            <p>Card preview will appear after you submit and save details.</p>
          </div>
        )}
      </div>
    </section>
  )
}
