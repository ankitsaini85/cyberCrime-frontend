import './VolunteerUnlawfulContentScreen.css'

const unlawfulItems = [
  'Against sovereignty and integrity of India',
  'Against defence of India',
  'Against Security of the State',
  'Against friendly relations with foreign States',
  'Content aimed at disturbing Public Order',
  'Disturbing communal harmony',
  'Child Sex Abuse material',
]

function VolunteerUnlawfulContentScreen() {
  return (
    <section id="cyber-volunteer-unlawful-content" className="volunteer-unlawful-wrap">
      <div className="volunteer-unlawful-panel">
        <h2>What is unlawful content</h2>

        <p>
          In general, content that violates any law in force in India. Such content may fall under
          following broad categories:
        </p>

        <ol className="volunteer-unlawful-list" type="i">
          {unlawfulItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>

        <p>
          For vii category of unlawful content, a separate section "Report Child/Women related crime"
          has been provided on the portal where one can report such content. For all other categories
          of unlawful content, we welcome you to register as volunteer and contribute your best to
          support law enforcement agencies in dealing with such content.
        </p>

        <p>Volunteers are advised to study Article 19 of the Indian Constitution.</p>
      </div>
    </section>
  )
}

export default VolunteerUnlawfulContentScreen
