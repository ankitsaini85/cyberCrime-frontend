import './ComplaintIntroScreen.css'

function ComplaintIntroScreen({ onFileComplaint }) {
  return (
    <section id="complaint-intro-screen" className="complaint-intro-wrap">
      <div className="complaint-intro-card">
        <h2>Filing a Complaint on Cyber Crime Suraksha Sangh Portal</h2>

        <p>
          This portal is an initiative to facilitate victims and complainants to report cyber crime
          complaints online. The portal caters to cyber crimes with special focus on crimes against
          women and children.Complaints reported on this portal are dealt by law enforcement agencies/ police based on the information available in the complaints. It is imperative to provide correct and accurate details while filing complaint for prompt action. 
        </p>

        <p>
          Please contact local police in case of emergency or for reporting crimes other than cyber
          crimes. National police helpline number is 112. National women helpline number is 181 and
          Cyber Crime Helpline is 1930.
        </p>

        <div className="complaint-intro-actions">
          <button type="button" className="complaint-intro-btn complaint-intro-btn-secondary">
            Learn about cyber crime
          </button>
          <button type="button" className="complaint-intro-btn" onClick={onFileComplaint}>
            File a complaint
          </button>
        </div>
      </div>
    </section>
  )
}

export default ComplaintIntroScreen
