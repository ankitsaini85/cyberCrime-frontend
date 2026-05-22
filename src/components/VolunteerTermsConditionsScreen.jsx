import './VolunteerTermsConditionsScreen.css'

const termsItems = [
  'This is purely volunteer program and volunteer shall not use this program for any commercial gain.',
  'Volunteer shall not be entitled for any monetary benefits or Identity Cards/Designation etc., at present or in future.',
  'Volunteer shall not issue any public statement about his/her association with this program.',
  'Volunteers are strictly prohibited from using the name of Ministry of Home Affairs or claim to have an association with Ministry of Home Affairs on any social media or public platform.',
  'Volunteer is strictly prohibited from creating social media account in the name of this program or issue any statement about this program or pursue discussion or share his/her work or express opinions on public platforms on behalf of this program.',
  'Volunteer shall maintain strict confidentiality of task assigned/carried out by him/her, as a part of this program.',
  'Volunteer shall not share any information, logo, slogan relating to this program on social media or public platform.',
  'Volunteer shall furnish his/her true and correct personal information.',
  'The volunteer would work within the Indian legal framework and rules made there under.',
  "Volunteer shall sign a declaration of acceptance of terms and conditions of this program. Volunteer shall be de-registered in case of violation/breach of any of the terms and conditions of 'Cyber Volunteer Program'. The State Nodal Officer of States/UTs also reserves the right to take legal action as the provisions of law against the Volunteer, in case of violation of terms and conditions of Cyber Volunteer Program.",
]

function VolunteerTermsConditionsScreen() {
  return (
    <section id="cyber-volunteer-terms" className="volunteer-terms-wrap">
      <div className="volunteer-terms-panel">
        <h2>Terms &amp; Conditions</h2>

        <ul>
          {termsItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default VolunteerTermsConditionsScreen
