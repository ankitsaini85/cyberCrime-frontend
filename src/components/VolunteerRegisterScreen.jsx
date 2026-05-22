import { Link } from 'react-router-dom'
import './VolunteerRegisterScreen.css'

function VolunteerRegisterScreen() {
  return (
    <section id="cyber-volunteer-register" className="volunteer-register-wrap">
      <div className="volunteer-register-panel">
        <h2>Register as "Cyber Volunteer" on National Cybercrime Reporting Portal</h2>

        <h3>Preface</h3>
        <p>
          For any society to feel safe and secure, citizen support enhances the efficacy of police
          efforts. Cyber Crime Volunteer Program aims to bring together citizens having passion to
          serve the society in making the cyber space clean and safe. Any Indian citizen can
          associate by registering in any of the three categories of "Cyber Volunteer", as mentioned
          below.
        </p>

        <h3>Process of "Registration"</h3>
        <ol className="volunteer-register-steps" type="i">
          <li>Any citizen of India may register as Cyber volunteer.</li>
          <li>
            To contribute as a Cyber Volunteer, register on National Cybercrime Reporting Portal
            (www.cybercrime.gov.in).
          </li>
          <li>
            To register on Portal, create "Login Id". Mention name of State/UT of your residence and
            mobile number which are mandatory. Enter OTP received on your mobile on "Login Id" page
            and "submit".
          </li>
          <li>
            Provide the required information in "Registration Step 1" on page "USER VOLUNTEER PROFILE
            DETAILS". Further,
            <ul className="volunteer-register-subpoints">
              <li>Upload resume, ID Proof*, Address Proof* and Passport size photograph.</li>
              <li>Select Type of Volunteership:-</li>
            </ul>
            <div className="volunteer-register-types">
              <p>Cyber Volunteer Unlawful Content Flagger</p>
              <p>Cyber Awareness Promoter</p>
              <p>Cyber Expert.</p>
            </div>
          </li>
          <li>
            In "Registration Step 2", mention the reason to be a Cyber Volunteer, including other
            details, skill set etc.
          </li>
          <li>"Save and continue" to come to "Preview and Final Submit".</li>
          <li>
            In "Preview and Final Submit", recheck the details again before clicking "Final Submit".
          </li>
          <li>
            For registration as "Cyber Volunteer unlawful content flagger", no prior verification
            (KYC) is required. After clicking "Final Submit", direct reporting of unlawful content
            noticed on internet or any social media platform/group, website, email, etc. may be done
            at www.cybercrime.gov.in.
          </li>
          <li>
            For registration as "Cyber Awareness Promoter or Cyber Expert", prior verification (KYC)
            will be carried out.
          </li>
          <li>To check the status of registration, go to "View Profile".</li>
          <li>
            *Applicable ID and Address proof required to be uploaded:
            <ul className="volunteer-register-subpoints">
              <li>
                ID proof i.e. Aadhar Card/Indian Passport/Voter ID card/PAN Card/Driving license.
              </li>
              <li>
                Residence proof i.e. Indian Passport/Voter ID card/Electricity Bill (not older than 3
                months)/Domicile Certificate with photo of addressee.
              </li>
            </ul>
          </li>
        </ol>

        <div className="volunteer-register-action">
          <Link to="/volunteer-register" className="volunteer-register-btn">
            Click here to register
          </Link>
          <Link to="/volunteer-login" className="volunteer-register-btn volunteer-login-btn">
            Already registered? Login
          </Link>
        </div>
      </div>
    </section>
  )
}

export default VolunteerRegisterScreen
