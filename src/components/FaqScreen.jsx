import './FaqScreen.css'

const faqItems = [
  {
    question: 'What is the purpose of National Cyber Crime Reporting Portal?',
    answer: [
      'This portal is an initiative of Government of India to facilitate victims/complainants to report cyber crime complaints online.',
      'This portal caters all types of cyber crime complaints including complaints pertaining to online Child Sexual Exploitative and Abuse Material (CSEAM) or sexually explicit content such as Rape/Gang Rape (RGR) content and other cyber crimes such as mobile crimes, online and social media crimes, online financial frauds, ransomware, hacking, cryptocurrency crimes and online cyber trafficking.',
      'The portal also provides an option of reporting an anonymous complaint for reporting online or sexually explicit content such as Rape/Gang Rape (RGR) content.',
    ],
  },
  {
    question: 'What is CSEAM - Child Sexual Exploitative and Abuse Material?',
    answer: [
      'Child Sexual Exploitative and Abuse Material (CSEAM) refers to material containing sexual image in any form, of a child who is abused or sexually exploited.',
      'Section 67 (B) of IT Act states that it is punishable for publishing or transmitting of material depicting children in sexually explicit act, etc. in electronic form.',
    ],
  },
  {
    question: 'Apart from this portal, are there any alternative ways to remove objectionable content from social media websites?',
    answer: [
      'Yes, most social media websites like Facebook, YouTube, Twitter and Instagram provide options to report or flag objectionable content. The platforms may take action as per their content policy.',
    ],
  },
  {
    question: 'Which type of cybercrimes I can report on the portal?',
    answer: [
      'There are two options for reporting cybercrimes on the portal.',
      'Report Crime related to Women/Child: complaints pertaining to online CSEAM or sexually explicit content such as Rape/Gang Rape (RGR) content.',
      'Report Other Cybercrimes: complaints pertaining to mobile crimes, online and social media crimes, online financial frauds, ransomware, hacking, cryptocurrency crimes and online cyber trafficking.',
    ],
  },
  {
    question: 'What kind of information should I provide to report complaint?',
    answer: [
      'There are two options for filing a report on www.cybercrime.gov.in: (i) Report Crime related to Women/Child and (ii) Report Other Cybercrimes.',
      'For Report Crime related to Women/Child there are two ways of registering complaint.',
      'Report Anonymously: You can report crimes related to online Rape or Gang Rape (RGR) content anonymously. No personal information is required, but complaint details should be accurate and complete.',
      'Report and Track: Fields marked with a red asterisk (*) are mandatory. Provide accurate details such as name, phone number, email address, complaint details and supporting information.',
      'Initially, register using your name and valid Indian mobile number. You will receive an OTP valid for 30 minutes. After successful registration, you can report the complaint.',
      'For Report Other Cybercrimes, registration using name and valid Indian mobile number is required. OTP is valid for 30 minutes. After successful registration, complaint can be filed by selecting category and sub-category.',
    ],
  },
  {
    question: 'Which State/UT shall I select while reporting a complaint?',
    answer: [
      'For Report Crime related to Women/Child using Report Anonymously, select the victim location/State/UT where the incident happened.',
      'If the report pertains to website hosting Rape or Gang Rape (RGR) content, complainant may select current State/UT of residence.',
      'As a responsible citizen, use Report and Track whenever possible, as it helps law enforcement contact you for further details.',
    ],
  },
  {
    question: 'How can I file the complaints about other cybercrimes?',
    answer: [
      'Use Report Other Cybercrimes section.',
      'Register with your name and valid Indian mobile number, receive OTP (valid for 30 minutes), then file complaint by selecting category and sub-category.',
      'Fields marked with a red asterisk (*) are mandatory. Provide complete and accurate details for prompt action.',
    ],
  },
  {
    question: 'What type of information would be considered as evidence while filing my complaint related to cybercrime?',
    answer: [
      'It is important to keep any evidence related to your complaint. Evidence may include the following.',
    ],
    list: [
      'Credit card receipt',
      'Bank statement',
      'Envelope (if letter or item was received by mail/courier)',
      'Brochure/Pamphlet',
      'Online money transfer receipt',
      'Copy of email',
      'URL of webpage',
      'Chat transcripts',
      'Suspect mobile number screenshot',
      'Videos',
      'Images',
      'Any other relevant document',
    ],
  },
  {
    question: 'What action will be taken if complainant reports any false complaint/information?',
    answer: [
      'Providing false information could make complainant liable to penal action as per the Indian Penal Code.',
    ],
  },
  {
    question: 'Can I report a complaint without uploading any information?',
    answer: [
      'It is recommended to provide as much information as possible so police authorities can take appropriate and prompt action.',
    ],
  },
  {
    question: 'What happens once I report a complaint?',
    answer: [
      'Complaints reported on the portal are handled by concerned State/UT police authorities based on your selected State/UT while reporting.',
    ],
  },
  {
    question: 'Will I be informed that my complaint has been submitted successfully?',
    answer: [
      'Yes, after submission, a confirmation message appears on the portal.',
      'If complaint is filed through Report and Track or Report Other Cybercrime, SMS and email with complaint reference number are sent to your registered mobile number and email ID.',
    ],
  },
  {
    question: 'Can I check the status of my complaint?',
    answer: [
      'Yes, status can be checked if complaint was reported using Report and Track or Report Other Cybercrime section.',
      'You receive an acknowledgement number to track progress by logging in and using check status option.',
    ],
  },
  {
    question: 'Can I withdraw my complaint from the portal?',
    answer: [
      'Complaint filed under Report Women/Child Related Crime section cannot be withdrawn.',
      'Complaint filed under Report Cyber Crime section can be withdrawn before it is converted into FIR.',
    ],
  },
  {
    question: 'What is Hash value and what is its purpose?',
    answer: [
      'Hash value is an alphanumeric value of fixed length that uniquely identifies data.',
      'It acts as a unique fingerprint for digital files uploaded as evidence (images, videos, documents, etc.) and helps ensure integrity of uploaded digital evidence.',
    ],
  },
  {
    question: 'Can I file a complaint if I am an Indian citizen but have been victimized online/in cyberspace by a foreign national or company?',
    answer: [
      'Yes, you may file complaint related to all types of cyber crime on the portal.',
    ],
  },
  {
    question: 'Can I file a complaint if I have been victimized online/in cyberspace by an individual or company in India, but I am not a citizen of India?',
    answer: [
      'Yes, you can register complaint on the portal by selecting appropriate section and reporting option.',
      'Report Crime related to Women/Child includes options for Report Anonymously and Report and Track.',
      'Report Other Cybercrimes also allows complaint filing after registration via valid Indian mobile number and OTP verification.',
    ],
  },
]

function FaqScreen() {
  return (
    <section id="faq-page" className="faq-wrap">
      <div className="faq-container">
        <header className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>National Cyber Crime Reporting Portal</p>
        </header>

        <div className="faq-list">
          {faqItems.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>

              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {item.list ? (
                <ul>
                  {item.list.map((listItem) => (
                    <li key={listItem}>{listItem}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqScreen
