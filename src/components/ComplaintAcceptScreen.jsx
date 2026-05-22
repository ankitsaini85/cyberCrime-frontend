import './ComplaintAcceptScreen.css'

function ComplaintAcceptScreen({ onAccept }) {
  return (
    <section id="complaint-accept-screen" className="complaint-accept-wrap">
      <div className="complaint-accept-card">
        <h2>Filing a Complaint on Cyber Crime Suraksha Sangh Portal</h2>

        <p>
          Prior to filing a complaint with this portal, we would request you to read the information
          regarding terms and conditions. Should you have queries prior to filing your complaint,
          view <span className="yellow-text">Frequently Asked Questions FAQ</span>.
        </p>

        <p>
          The information provided on this form is correct to the best of my knowledge. I acknowledge
          that providing false information could make me liable to penal actions under Indian Laws.
        </p>

        <p>
          I understand that action on the complaints reported on this portal shall be taken by
          concerned authorities as per Indian Laws.
        </p>

        <p>
          The complaint information submitted on this site is encrypted via secure socket layer (SSL)
          encryption. Please see the<span className="yellow-text"> Privacy Policy </span> for further information.
        </p>

        <p>We thank you for your cooperation.</p>

        <div className="complaint-accept-actions">
          <button type="button" className="complaint-accept-btn" onClick={onAccept}>
            I Accept
          </button>
        </div>
      </div>
    </section>
  )
}

export default ComplaintAcceptScreen
