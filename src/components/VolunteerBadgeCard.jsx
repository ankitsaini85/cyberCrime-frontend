import { forwardRef } from 'react'
import siteLogo from '../images/card-header.PNG'
import './VolunteerBadgeCard.css'

const formatDob = (value) => {
  const raw = String(value || '').trim()
  if (!raw) {
    return '-'
  }

  if (/^\d{2}-\d{2}-\d{4}$/.test(raw)) {
    return raw
  }

  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (match) {
    const [, year, month, day] = match
    return `${day}-${month}-${year}`
  }

  return raw
}

const VolunteerBadgeCard = forwardRef(function VolunteerBadgeCard({ profile }, ref) {
  const addressText = String(profile?.address || '-').trim()
  const profilePhotoUrl = String(profile?.profilePhotoUrl || '').trim()
  const addressSizeClass = addressText.length > 95
    ? 'volunteer-badge-address-small'
    : addressText.length > 60
      ? 'volunteer-badge-address-medium'
      : ''

  return (
    <article ref={ref} className="volunteer-badge-card" aria-label="Volunteer front card">
      <header className="volunteer-badge-header">
        <img src={siteLogo} alt="Cyber Crime Portal" className="volunteer-badge-logo" />
        <div>
          <p className="volunteer-badge-title">Volunteer</p>
        </div>
      </header>

      <div className="volunteer-badge-body">
        <div className="volunteer-badge-photo-wrap">
          {profilePhotoUrl ? (
            <img src={profilePhotoUrl} alt={`${profile?.fullName || 'Volunteer'} profile`} className="volunteer-badge-photo" />
          ) : (
            <div className="volunteer-badge-photo volunteer-badge-photo-placeholder">Photo</div>
          )}
        </div>

        <div className="volunteer-badge-details">
          <div className="volunteer-badge-line">
            <span className="volunteer-badge-label">Name</span>
            <span className="volunteer-badge-separator">:</span>
            <strong className="volunteer-badge-value">{profile?.fullName || '-'}</strong>
          </div>
          <div className="volunteer-badge-line">
            <span className="volunteer-badge-label">DOB</span>
            <span className="volunteer-badge-separator">:</span>
            <strong className="volunteer-badge-value">{formatDob(profile?.dateOfBirth)}</strong>
          </div>
          <div className="volunteer-badge-line">
            <span className="volunteer-badge-label">Mobile</span>
            <span className="volunteer-badge-separator">:</span>
            <strong className="volunteer-badge-value">{profile?.mobileNumber || '-'}</strong>
          </div>
          <div className="volunteer-badge-line volunteer-badge-line-address">
            <span className="volunteer-badge-label">Address</span>
            <span className="volunteer-badge-separator">:</span>
            <strong className={`volunteer-badge-value ${addressSizeClass}`}>{addressText || '-'}</strong>
          </div>
        </div>
      </div>
          <div className='footer-badge'>जागरूक रहें, सुरक्षित रहें</div>
    </article>
  )
})

export default VolunteerBadgeCard
