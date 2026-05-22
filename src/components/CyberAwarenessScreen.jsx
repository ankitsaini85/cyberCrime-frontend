import './CyberAwarenessScreen.css'

const awarenessItems = [
  {
    title: 'Raju and 40 thieves-RBI Ombudsman Mumbai II_Mobile landscape',
    href: 'https://cybercrime.gov.in/pdf/Raju_and_40_thieves_RBI_Ombudsman_Mumbai_II_Mobile_landscape.pdf',
    disclaimer: "The booklet is Reserve Bank of India Customer's awareness initiative. I4C(MHA) does not provide any warranties of any kind regarding any information contained herein. The I4C does not endorse any commercial product or service referenced in this report or otherwise.",
  },
  {
    title: 'Cyber Hygiene for cyber space (English)',
    href: 'https://cybercrime.gov.in/pdf/Final_English_Manual_Basic.pdf',
  },
  {
    title: 'Cyber Hygiene for cyber space (Hindi)',
    href: 'https://cybercrime.gov.in/pdf/Final_Hindi_Manual_Basic.pdf',
  },
  {
    title: 'Financial Fraud',
    href: 'https://cybercrime.gov.in/pdf/Financial%20Fraud%20Brochures%20final.pdf',
  },
  {
    title: 'Job Fraud',
    href: 'https://cybercrime.gov.in/pdf/Job%20Fraud%20Brochure%20Final.pdf',
  },
  {
    title: 'Matrimonial fraud',
    href: 'https://cybercrime.gov.in/pdf/Matrimonial%20fraud%20brochure%20final.pdf',
  },
  {
    title: 'Safe Use of social Media Platform',
    href: 'https://cybercrime.gov.in/pdf/Safe%20Use%20of%20social%20Media%20Platform%20Brochure%20final.pdf',
  },
  {
    title: 'Cyber Crime Awareness Booklet on Cyber Security Awareness',
    href: 'https://cybercrime.gov.in/pdf/Cyber%20Security%20Awareness%20Booklet%20for%20Citizens.pdf',
  },
]

function CyberAwarenessScreen() {
  return (
    <section id="cyber-awareness-page" className="cyber-awareness-wrap">
      <div className="cyber-awareness-panel">
        {awarenessItems.map((item) => (
          <article key={item.title} className="cyber-awareness-item">
            <h3>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h3>

            {item.disclaimer ? (
              <p>
                <strong>Disclaimer:</strong><br />
                {item.disclaimer}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

export default CyberAwarenessScreen
