import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import VolunteerBadgeCard from './VolunteerBadgeCard'
import siteLogo from '../images/cybercrime-logo.png'
import './VolunteerDashboardPage.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

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

function VolunteerDashboardPage({ volunteer, onLogout }) {
  const navigate = useNavigate()
  const { volunteerId } = useParams()
  const [profile, setProfile] = useState(volunteer || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeSection, setActiveSection] = useState('profile')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [downloadingCard, setDownloadingCard] = useState(false)
  const badgeCardRef = useRef(null)

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout()
    }
    setMobileMenuOpen(false)
    navigate('/', { replace: true })
  }

  useEffect(() => {
    let active = true

    const fetchProfile = async () => {
      if (!volunteerId) {
        return
      }

      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}/api/volunteers/${volunteerId}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch volunteer profile')
        }

        if (active) {
          setProfile(data.data)
        }
      } catch (profileError) {
        if (active) {
          setError(profileError.message || 'Failed to fetch volunteer profile')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchProfile()

    return () => {
      active = false
    }
  }, [volunteerId])

  const handleDownloadCardPdf = async () => {
    if (!badgeCardRef.current) {
      return
    }

    setDownloadingCard(true)
    setError('')

    try {
      const canvas = await html2canvas(badgeCardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      })
      const imageData = canvas.toDataURL('image/png')

      const mmPerPx = 0.264583
      const pageWidth = canvas.width * mmPerPx
      const pageHeight = canvas.height * mmPerPx

      const pdf = new jsPDF({
        orientation: pageHeight > pageWidth ? 'portrait' : 'landscape',
        unit: 'mm',
        format: [pageWidth, pageHeight],
      })

      pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight)
      pdf.save(`${(profile?.fullName || 'volunteer').replace(/\s+/g, '-').toLowerCase()}-badge.pdf`)
    } catch (_downloadError) {
      setError('Failed to download volunteer card')
    } finally {
      setDownloadingCard(false)
    }
  }

  return (
    <section className="volunteer-dashboard-wrap role-dashboard-view">
      <div className="dashboard-mobile-topbar">
        <Link to="/" aria-label="Go to home" onClick={() => setMobileMenuOpen(false)}>
          <img src={siteLogo} alt="Portal Logo" className="dashboard-mobile-logo" />
        </Link>
        <button
          type="button"
          className="dashboard-mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle volunteer menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="dashboard-mobile-welcome-strip">
        Welcome, {profile?.fullName || volunteer?.fullName || 'Volunteer'}
      </div>

      {mobileMenuOpen ? (
        <>
          <button
            type="button"
            className="dashboard-mobile-menu-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close volunteer menu"
          />
          <div className="dashboard-mobile-menu-panel">
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => handleSectionChange('profile')}
            >
              Profile
            </button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'card' ? 'active' : ''}`}
              onClick={() => handleSectionChange('card')}
            >
              Get Card
            </button>
            <button type="button" className="admin-logout-btn admin-left-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : null}

      <div className="volunteer-dashboard-panel">
        <div className="volunteer-dashboard-head">
          <h2>Volunteer Dashboard</h2>
          <div className="volunteer-dashboard-actions">
            <button type="button" className="volunteer-outline-btn" onClick={() => navigate('/')}>Home</button>
            <button
              type="button"
              className="volunteer-submit-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? <p>Loading profile...</p> : null}
        {error ? <p className="volunteer-form-error">{error}</p> : null}

        {profile ? (
          <div className="volunteer-dashboard-layout">
            <aside className="volunteer-sidepanel">
              <button
                type="button"
                className={`volunteer-side-btn ${activeSection === 'profile' ? 'active' : ''}`}
                onClick={() => handleSectionChange('profile')}
              >
                Profile
              </button>
              <button
                type="button"
                className={`volunteer-side-btn ${activeSection === 'card' ? 'active' : ''}`}
                onClick={() => handleSectionChange('card')}
              >
                Get Card
              </button>
            </aside>

            <div className="volunteer-content-panel">
              {activeSection === 'profile' ? (
                <div className="volunteer-dashboard-grid">
                  <div>
                    <span>Name</span>
                    <strong>{profile.fullName || '-'}</strong>
                  </div>
                  <div>
                    <span>Email</span>
                    <strong>{profile.email || '-'}</strong>
                  </div>
                  <div>
                    <span>Mobile Number</span>
                    <strong>{profile.mobileNumber || '-'}</strong>
                  </div>
                  <div>
                    <span>Date of Birth</span>
                    <strong>{formatDob(profile.dateOfBirth)}</strong>
                  </div>
                  <div className="volunteer-dashboard-grid-full">
                    <span>Address</span>
                    <strong>{profile.address || '-'}</strong>
                  </div>
                  <div>
                    <span>Account Status</span>
                    <strong>{profile.accountStatus || 'active'}</strong>
                  </div>
                  <div className="volunteer-dashboard-photo">
                    <span>Profile Photo</span>
                    {profile.profilePhotoUrl ? (
                      <img src={profile.profilePhotoUrl} alt={`${profile.fullName} profile`} />
                    ) : (
                      <strong>-</strong>
                    )}
                  </div>
                </div>
              ) : (
                <div className="volunteer-card-panel">
                  <VolunteerBadgeCard ref={badgeCardRef} profile={profile} />
                  <button type="button" className="volunteer-submit-btn" onClick={handleDownloadCardPdf} disabled={downloadingCard}>
                    {downloadingCard ? 'Downloading...' : 'Download PDF'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default VolunteerDashboardPage
