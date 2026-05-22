import { useMemo, useState } from 'react'
import { City, State } from 'country-state-city'
import './ComplaintAnonymousFormScreen.css'

function ComplaintAnonymousFormScreen() {
  const [selectedStateCode, setSelectedStateCode] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const indianStates = useMemo(() => State.getStatesOfCountry('IN'), [])

  const districts = useMemo(() => {
    if (!selectedStateCode) {
      return []
    }

    const cities = City.getCitiesOfState('IN', selectedStateCode)
    const uniqueDistricts = [...new Set(cities.map((item) => item.name).filter(Boolean))]
    return uniqueDistricts.sort((a, b) => a.localeCompare(b))
  }, [selectedStateCode])

  return (
    <section id="complaint-anonymous-form" className="anonymous-form-wrap">
      <div className="anonymous-form-shell">
        <h2>REPORT ANONYMOUSLY</h2>

        <div className="anonymous-step-tabs">
          <button type="button" className="active">Complaint &amp; Incident Details</button>
          <button type="button">Suspect Details</button>
          <button type="button">Preview &amp; Submit</button>
        </div>

        <div className="anonymous-row top-row">
          <label htmlFor="complaint-category">Category of complaint: <span>*</span></label>
          <div className="field-stack">
            <select id="complaint-category" defaultValue="">
              <option value="" disabled>--Select--</option>
              <option>Rape/Gang Rape (RGR)-Sexually abusive Content</option>
              <option>Sexually Obscene material</option>
              <option>Sexually Explicit Act</option>
              <option>CSEAM-Child Sexual Exploitative and Abuse Material</option>
            </select>
            <small>Please select category of crime.</small>
          </div>
        </div>

        <div className="anonymous-box-title">
          <h3>Complaint / Incident Details</h3>
          <p>i Kindly fill in the below form with details of the crime</p>
        </div>

        <div className="anonymous-row">
          <label>Approximate date &amp; time of Incident/receiving/viewing of content<span>*</span></label>
          <div className="anonymous-date-time-grid">
            <input type="text" placeholder="dd / mm / yyyy" />
            <input type="text" placeholder="HH" />
            <input type="text" placeholder="MM" />
            <select defaultValue="AM">
              <option>AM</option>
              <option>PM</option>
            </select>
            <small>Please select approximate date.</small>
          </div>
        </div>

        <div className="anonymous-row">
          <label htmlFor="delay-reason">Reason for delay in reporting :</label>
          <input id="delay-reason" type="text" />
        </div>

        <div className="anonymous-row">
          <label htmlFor="state-ut">State / UTs : <span>*</span></label>
          <div className="field-stack">
            <select
              id="state-ut"
              value={selectedStateCode}
              onChange={(event) => {
                setSelectedStateCode(event.target.value)
                setSelectedDistrict('')
              }}
            >
              <option value="" disabled>--Select--</option>
              {indianStates.map((stateItem) => (
                <option key={stateItem.isoCode} value={stateItem.isoCode}>
                  {stateItem.name}
                </option>
              ))}
            </select>
            <small>Please select state / UTs.</small>
          </div>
        </div>

        <div className="anonymous-row">
          <label htmlFor="district">District : <span>*</span></label>
          <div className="field-stack">
            <select
              id="district"
              value={selectedDistrict}
              onChange={(event) => setSelectedDistrict(event.target.value)}
              disabled={!selectedStateCode}
            >
              <option value="" disabled>--Select--</option>
              {districts.map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              ))}
            </select>
            <small>Please select district.</small>
          </div>
        </div>

        <div className="anonymous-row">
          <label htmlFor="police-station">Police Station :</label>
          <select id="police-station" defaultValue="">
            <option value="" disabled>--Select--</option>
          </select>
        </div>

        <div className="anonymous-row">
          <label htmlFor="incident-place">Where did the incident occur? <span>*</span></label>
          <select id="incident-place" defaultValue="">
            <option value="" disabled>--Select--</option>
          </select>
        </div>

        <div className="anonymous-row">
          <label htmlFor="additional-info">Please provide any additional information about the incident:<span>*</span></label>
          <div className="field-stack">
            <textarea id="additional-info" rows={4}></textarea>
            <div className="anonymous-help-row">
              <small>Maximum of 1500 characters - 1500 characters left</small>
              <small>(Insert at least 200 Characters. Special Characters like ~!#%^$|&lt;&gt;{}* are not allowed)</small>
            </div>
            <small>Please insert additional information about the incident</small>
          </div>
        </div>

        <div className="anonymous-actions">
          <button type="button">SAVE &amp; NEXT</button>
        </div>
      </div>
    </section>
  )
}

export default ComplaintAnonymousFormScreen
