import './OtherServicesSection.css'

const otherServiceCategories = [
  {
    id: 'new-links',
    titleHi: 'नया लिंक',
    titleEn: 'New Links',
    items: [
      { labelHi: 'किसके नाम कितनी जमीन है पता करें', labelEn: 'Check land records', url: 'https://upbhulekh.gov.in/' },
      { labelHi: 'सहारा बैंक का पैसा आपके खाता में आया की नहीं चेक करे', labelEn: 'Check bank deposit', url: 'https://mocrefund.crcs.gov.in/depositor/#/depositor/login' },
      { labelHi: 'PM आवास नई लिस्ट जारी, यहाँ से चेक करें अपना नाम', labelEn: 'PM Awas new list', url: 'https://pmaymis.gov.in/' },
      { labelHi: 'फसल नुकसान पर ₹22,500 तक सहायता आवेदन शुरू', labelEn: 'Crop insurance claim', url: 'https://pmfby.gov.in/' },
      { labelHi: 'ई-श्रम कार्ड Rs.3000/- अवेदान करें', labelEn: 'e-Shram card', url: 'https://eshram.gov.in/' },
      { labelHi: 'फ्री बिजली बिल योजना', labelEn: 'Free electricity scheme', url: 'https://www.india.gov.in/' },
      { labelHi: 'अपने गाड़ी का PUC सर्टिफिकेट ऐसे निकले', labelEn: 'PUC certificate', url: 'https://vahan.parivahan.gov.in/puc/' },
      { labelHi: 'शौचालय योजना (12000 रु)', labelEn: 'Toilet scheme', url: 'https://swachhbharatmission.ddws.gov.in/' },
      { labelHi: 'गैस सिलेंडर बुकिंग', labelEn: 'Gas cylinder booking', url: 'https://indane.co.in/' },
      { labelHi: 'मुख्यमंत्री निश्चय स्वयं सहायता भत्ता योजना शुरू', labelEn: 'Self-help scheme', url: 'https://www.india.gov.in/' },
      { labelHi: 'लेबर पंजीयन 7000 रु /-', labelEn: 'Labor registration', url: 'https://www.india.gov.in/' },
      { labelHi: 'LIC बीमा सखी योजना 7000 रूपये आवेदन करें', labelEn: 'LIC insurance scheme', url: 'https://www.licindia.in/' },
      { labelHi: 'विधवा महिला को रु. 30000/- की सहायता', labelEn: 'Widow assistance', url: 'https://www.india.gov.in/' },
      { labelHi: 'राशन कार्ड e-KYC करें', labelEn: 'Ration card e-KYC', url: 'https://nfsa.gov.in/' },
      { labelHi: 'PM इंटर्नशिप (रु 5000)', labelEn: 'PM internship', url: 'https://www.india.gov.in/' },
      { labelHi: 'अपने घर के छत पर फ्री में सोलर पैनल लगवाए आवेदन शुरू', labelEn: 'Solar panel scheme', url: 'https://www.india.gov.in/' },
      { labelHi: 'PM विद्यालक्ष्मी लोन (10 लाख)', labelEn: 'PM Vidyalaxmi loan', url: 'https://www.vidyalakshmi.co.in/' },
      { labelHi: 'महिलाओ के लिए फ्री सिलाई मशीन या रु15000/-', labelEn: 'Free sewing machine', url: 'https://www.india.gov.in/' },
      { labelHi: 'पक्का मकान बनाने के लिए 2.5 लाख', labelEn: 'Housing loan', url: 'https://www.india.gov.in/' },
      { labelHi: 'CM युवा उद्यमी योजना (5 लाख लोन)', labelEn: 'Youth entrepreneurship', url: 'https://www.india.gov.in/' },
      { labelHi: 'UP पंचायत चुनाव नयी वोटर लिस्ट', labelEn: 'UP voter list', url: 'https://electoralsearch.eci.gov.in/' },
      { labelHi: 'अपना Resume बनाये', labelEn: 'Create resume', url: 'https://www.india.gov.in/' },
      { labelHi: 'LIC बिमा सखी', labelEn: 'LIC insurance', url: 'https://www.licindia.in/' },
      { labelHi: 'कन्या उत्थान योजना (बेटी को आगे पढ़ने के लिए 25000 की सहायता)', labelEn: 'Girl education scheme', url: 'https://www.india.gov.in/' },
      { labelHi: 'LPG Gas eKYC', labelEn: 'LPG e-KYC', url: 'https://www.india.gov.in/' },
      { labelHi: 'नयी वोटर लिस्ट (SIR Draft Roll)', labelEn: 'New voter list', url: 'https://electoralsearch.eci.gov.in/' },
      { labelHi: 'चेक बिजली बिल', labelEn: 'Check electricity bill', url: 'https://www.india.gov.in/' },
      { labelHi: 'SIR (2003, 2002 वोटर लिस्ट)', labelEn: 'SIR voter list', url: 'https://electoralsearch.eci.gov.in/' },
      { labelHi: 'बैंक से आधार लिंक करे (NPCI)', labelEn: 'Link Aadhaar with bank', url: 'https://www.npci.org.in/' },
      { labelHi: 'UPI से गलत पेमेंट होने पर कंप्लेंट करे', labelEn: 'UPI complaint', url: 'https://www.india.gov.in/' },
      { labelHi: 'आधार नंबर से राशन कार्ड डाऊनलोड करे', labelEn: 'Download ration card', url: 'https://nfsa.gov.in/' },
      { labelHi: 'बुजुर्ग के लिए 1000 रूपये (UP)', labelEn: 'Senior citizen assistance', url: 'https://www.india.gov.in/' },
      { labelHi: 'ग्राहक शिकायत', labelEn: 'Consumer complaint', url: 'https://pgportal.gov.in/' },
      { labelHi: 'UPI से 5 मिनट में PF का पैसा निकाले', labelEn: 'PF withdrawal', url: 'https://www.india.gov.in/' },
    ],
  },
  {
    id: 'government-work',
    titleHi: 'सरकारी काम',
    titleEn: 'Government Work',
    items: [
      { labelHi: 'बैंक से आधार लिंक करे (NPCI)', labelEn: 'Link Aadhaar with bank', url: 'https://www.npci.org.in/' },
      { labelHi: 'पीएम उज्ज्वला नई कनेक्शन', labelEn: 'PM Ujjwala', url: 'https://pmuy.gov.in/' },
      { labelHi: 'पासपोर्ट सेवा', labelEn: 'Passport service', url: 'https://www.passportindia.gov.in/' },
      { labelHi: 'चेक बिजली बिल', labelEn: 'Check electricity bill', url: 'https://www.india.gov.in/' },
      { labelHi: 'फॉर्मर रजिस्ट्री (Farmer Registry)', labelEn: 'Farmer registry', url: 'https://www.india.gov.in/' },
      { labelHi: 'आधार कार्ड', labelEn: 'Aadhaar card', url: 'https://uidai.gov.in/' },
      { labelHi: 'पैन कार्ड', labelEn: 'PAN card', url: 'https://www.onlineservices.nsdl.com/' },
      { labelHi: 'PM किसान', labelEn: 'PM Kisan', url: 'https://pmkisan.gov.in/' },
      { labelHi: 'भूलेख', labelEn: 'Land records', url: 'https://upbhulekh.gov.in/' },
      { labelHi: 'भू नक्शा (ज़मीन का नक्शा)', labelEn: 'Land map', url: 'https://upbhunaksha.gov.in/' },
      { labelHi: 'PM आवास', labelEn: 'PM Awas', url: 'https://pmaymis.gov.in/' },
      { labelHi: 'नरेगा (जॉबकार्ड, हाज़िरी)', labelEn: 'NREGA', url: 'https://www.india.gov.in/' },
      { labelHi: 'ई श्रम कार्ड', labelEn: 'e-Shram card', url: 'https://eshram.gov.in/' },
      { labelHi: 'आयुष्मान कार्ड', labelEn: 'Ayushman card', url: 'https://www.india.gov.in/' },
      { labelHi: 'आभा कार्ड', labelEn: 'ABHA card', url: 'https://www.india.gov.in/' },
      { labelHi: 'समग्र id कार्ड', labelEn: 'Samagra ID', url: 'https://www.india.gov.in/' },
      { labelHi: 'PUC Service', labelEn: 'PUC service', url: 'https://vahan.parivahan.gov.in/puc/' },
      { labelHi: 'APAAR ID कार्ड', labelEn: 'APAAR ID', url: 'https://www.india.gov.in/' },
      { labelHi: 'वोटर कार्ड', labelEn: 'Voter card', url: 'https://voters.eci.gov.in/' },
      { labelHi: 'ड्राइविंग लाइसेंस', labelEn: 'Driving license', url: 'https://parivahan.gov.in/' },
      { labelHi: 'शौचालय योजना (रू.12000)', labelEn: 'Toilet scheme', url: 'https://swachhbharatmission.ddws.gov.in/' },
      { labelHi: 'गैस सब्सिडी देखे', labelEn: 'Check gas subsidy', url: 'https://www.india.gov.in/' },
      { labelHi: 'राशन कार्ड', labelEn: 'Ration card', url: 'https://nfsa.gov.in/' },
      { labelHi: 'NSP नेशनल स्कालरशिप OTR', labelEn: 'National scholarship', url: 'https://scholarships.gov.in/' },
      { labelHi: 'LPG Gas eKYC', labelEn: 'LPG e-KYC', url: 'https://www.india.gov.in/' },
      { labelHi: 'लाडो लक्ष्मी योजना', labelEn: 'Lado Lakshmi scheme', url: 'https://www.india.gov.in/' },
      { labelHi: 'माझी लाड़की बहिण योजना', labelEn: 'Mazi Ladki Bahin scheme', url: 'https://www.india.gov.in/' },
    ],
  },
  {
    id: 'tehsil-work',
    titleHi: 'तहसील के कार्य',
    titleEn: 'Tehsil Work',
    items: [
      { labelHi: 'जमीन विवाद में है या नहीं जाने', labelEn: 'Check land dispute', url: 'https://upbhulekh.gov.in/' },
      { labelHi: 'भू नक्शा', labelEn: 'Land map', url: 'https://upbhunaksha.gov.in/' },
      { labelHi: 'भूलेख', labelEn: 'Land records', url: 'https://upbhulekh.gov.in/' },
    ],
  },
  {
    id: 'complaint-portal',
    titleHi: 'शिकायत पोर्टल',
    titleEn: 'Complaint Portal',
    items: [
      { labelHi: 'थाने में रिपोर्ट करें', labelEn: 'Police complaint', url: 'https://cybercrime.gov.in/' },
      { labelHi: 'राशन कार्ड की शिकायत करें', labelEn: 'Ration card complaint', url: 'https://nfsa.gov.in/' },
      { labelHi: 'प्रधानमंत्री जी से शिकायत करें', labelEn: 'PM grievance portal', url: 'https://pgportal.gov.in/' },
      { labelHi: 'ग्राम प्रधान की शिकायत करें', labelEn: 'Local grievance portal', url: 'https://pgportal.gov.in/' },
    ],
  },
  {
    id: 'scholarship',
    titleHi: 'Scholarship',
    titleEn: 'Scholarship',
    items: [
      { labelHi: 'मैट्रिक पास लड़का-लड़की दोनों को मिलेगा Rs.10,000', labelEn: 'Post-matric scholarship', url: 'https://scholarships.gov.in/' },
      { labelHi: 'इंटर पास लड़का-लड़की दोनों को मिलेगा Rs.25,000', labelEn: 'Inter pass scholarship', url: 'https://scholarships.gov.in/' },
    ],
  },
  {
    id: 'election',
    titleHi: 'चुनाव',
    titleEn: 'Election',
    items: [
      { labelHi: 'UP पंचायत चुनाव वोटर लिस्ट', labelEn: 'UP voter list', url: 'https://electoralsearch.eci.gov.in/' },
      { labelHi: 'सरपंच/प्रधान/मुखिया किस काम का कितना पैसा निकला', labelEn: 'Panchayat funds', url: 'https://www.india.gov.in/' },
      { labelHi: 'यूपी चुनाव 2021 में सीट कौन सा था जाने (ग्राम, क्षेत्र, जिला)', labelEn: 'UP election 2021', url: 'https://www.india.gov.in/' },
      { labelHi: 'यू.पी. ग्राम पंचायत चुनाव (प्रधानी)', labelEn: 'Gram panchayat election', url: 'https://sec.up.nic.in/' },
      { labelHi: 'यूपी चुनाव 2015 में सीट कौन सा था जाने (ग्राम, क्षेत्र, जिला)', labelEn: 'UP election 2015', url: 'https://www.india.gov.in/' },
      { labelHi: 'बिहार 2003 वोटर लिस्ट', labelEn: 'Bihar voter list', url: 'https://electoralsearch.eci.gov.in/' },
      { labelHi: '2003 बिहार मतदाता सूची में अपना नाम खोजें', labelEn: 'Search Bihar voter', url: 'https://electoralsearch.eci.gov.in/' },
      { labelHi: 'राजस्थान ग्राम पंचायत चुनाव (सरपंच)', labelEn: 'Rajasthan panchayat', url: 'https://sec.rajasthan.gov.in/' },
    ],
  },
  {
    id: 'other',
    titleHi: 'अन्य',
    titleEn: 'Other',
    items: [
      { labelHi: 'कन्या सुमंगला योजना 25000 मिलेगा', labelEn: 'Kanya Sumangal scheme', url: 'https://www.india.gov.in/' },
      { labelHi: 'बैंक बैलेंस चेक (कॉल या मैसेज से)', labelEn: 'Check bank balance', url: 'https://www.india.gov.in/' },
      { labelHi: 'PF Balance सम्बंधित कार्य', labelEn: 'PF balance', url: 'https://www.india.gov.in/' },
      { labelHi: 'वृद्धा पेंशन बिहार', labelEn: 'Senior citizen pension', url: 'https://www.india.gov.in/' },
      { labelHi: 'जन्म प्रमाण पत्र आवेदन (CRS)', labelEn: 'Birth certificate', url: 'https://www.india.gov.in/' },
      { labelHi: 'गैस सब्सिडी देखें', labelEn: 'Check gas subsidy', url: 'https://www.india.gov.in/' },
      { labelHi: 'PM Free Wi-Fi Yojana', labelEn: 'PM Free Wi-Fi', url: 'https://www.india.gov.in/' },
    ],
  },
  {
    id: 'wedding-subsidy',
    titleHi: 'शादी अनुदान योजना',
    titleEn: 'Wedding Subsidy Scheme',
    items: [
      { labelHi: 'बेटी की शादी के लिए 1 लाख रू०', labelEn: 'Daughter wedding subsidy', url: 'https://www.india.gov.in/' },
      { labelHi: 'विधबा महिला से शादी करने के लिए 11 हज़ार रू०', labelEn: 'Widow remarriage', url: 'https://www.india.gov.in/' },
      { labelHi: 'विधबा महिला के बेटी से शादी करने के लिए 11 हज़ार रू०', labelEn: 'Widow daughter marriage', url: 'https://www.india.gov.in/' },
      { labelHi: 'दूसरी जाति के लड़की से शादी के लिए 2.5 लाख रू योजना', labelEn: 'Inter-caste marriage', url: 'https://www.india.gov.in/' },
    ],
  },
  {
    id: 'loan-scheme',
    titleHi: 'Loan योजना',
    titleEn: 'Loan Scheme',
    items: [
      { labelHi: 'PMEGP Loan Yojana', labelEn: 'PMEGP loan', url: 'https://www.kviconline.gov.in/pmegpeportal/' },
      { labelHi: 'PM विद्यालक्ष्मी लोन (8 लाख)', labelEn: 'PM Vidyalaxmi loan', url: 'https://www.vidyalakshmi.co.in/' },
      { labelHi: 'व्यापर के लिए 5 लाख', labelEn: 'Business loan', url: 'https://www.mudra.org.in/' },
      { labelHi: 'ठेला वालो के लिए 10 हज़ार', labelEn: 'Cart vendor loan', url: 'https://www.mudra.org.in/' },
      { labelHi: 'जन समर्थ लोन (1 लाख से 20 लाख तक लोन)', labelEn: 'Jan Samriddhi loan', url: 'https://www.mudra.org.in/' },
      { labelHi: 'खेत तारबंदी के लिए 40000 रू की सब्सिडी', labelEn: 'Farm fencing subsidy', url: 'https://www.india.gov.in/' },
      { labelHi: 'ट्रेक्टर के लिए 3 लाख रू की सब्सिडी', labelEn: 'Tractor subsidy', url: 'https://www.india.gov.in/' },
    ],
  },
  {
    id: 'government-scheme',
    titleHi: 'सरकारी योजना',
    titleEn: 'Government Scheme',
    items: [
      { labelHi: 'कन्या विवाह योजना (राज्यवार)', labelEn: 'Girl marriage scheme', url: 'https://www.india.gov.in/' },
      { labelHi: 'बिहार सरकारी काम', labelEn: 'Bihar govt services', url: 'https://www.bihar.gov.in/' },
      { labelHi: 'उत्तर प्रदेश सरकारी काम', labelEn: 'UP govt services', url: 'https://www.up.gov.in/' },
      { labelHi: 'मध्य प्रदेश सरकारी काम', labelEn: 'MP govt services', url: 'https://www.mponline.gov.in/' },
      { labelHi: 'झारखंड सरकारी काम', labelEn: 'Jharkhand govt services', url: 'https://www.jharkhand.gov.in/' },
      { labelHi: 'राजस्थान सरकारी काम', labelEn: 'Rajasthan govt services', url: 'https://www.rajasthan.gov.in/' },
      { labelHi: 'छत्तीसगढ़ सरकारी काम', labelEn: 'Chhattisgarh govt services', url: 'https://www.chhattisgarh.gov.in/' },
    ],
  },
  {
    id: 'driving',
    titleHi: 'गाड़ी और लाइसेंस',
    titleEn: 'Driving & Licenses',
    items: [
      { labelHi: 'ड्राइविंग लाइसेंस में मोबाइल अपडेट', labelEn: 'Update DL mobile', url: 'https://sarathi.parivahan.gov.in/' },
      { labelHi: 'गाड़ी मालिक मोबाइल नंबर अपडेट करे', labelEn: 'Update RC mobile', url: 'https://vahan.parivahan.gov.in/' },
      { labelHi: 'लर्निंग लाइसेंस', labelEn: 'Learning license', url: 'https://parivahan.gov.in/' },
      { labelHi: 'Driving Licence Download', labelEn: 'Download driving license', url: 'https://sarathi.parivahan.gov.in/' },
      { labelHi: 'ड्राइविंग लाइसेंस', labelEn: 'Driving license', url: 'https://parivahan.gov.in/' },
      { labelHi: 'ड्राइविंग लाइसेंस का स्टेटस', labelEn: 'DL status', url: 'https://sarathi.parivahan.gov.in/' },
      { labelHi: 'RC दुबारा प्रिंट करवाए', labelEn: 'Reprint RC', url: 'https://vahan.parivahan.gov.in/' },
      { labelHi: 'गाड़ी का RC डाउनलोड करे', labelEn: 'Download RC', url: 'https://vahan.parivahan.gov.in/' },
      { labelHi: 'चालान चेक करे', labelEn: 'Check traffic fine', url: 'https://www.india.gov.in/' },
      { labelHi: 'Know Your Vehicle Status', labelEn: 'Vehicle status', url: 'https://vahan.parivahan.gov.in/' },
      { labelHi: 'गाड़ी मालिक जाने', labelEn: 'Know vehicle owner', url: 'https://vahan.parivahan.gov.in/' },
      { labelHi: 'PUC Service', labelEn: 'PUC service', url: 'https://vahan.parivahan.gov.in/puc/' },
      { labelHi: 'इन्सुरेंस एक्सपायरी जाने', labelEn: 'Check insurance expiry', url: 'https://www.india.gov.in/' },
      { labelHi: 'आधिकारिक वेबसाइट (Parivahan)', labelEn: 'Parivahan official', url: 'https://parivahan.gov.in/' },
      { labelHi: 'आधिकारिक वेबसाइट (Sarathi)', labelEn: 'Sarathi official', url: 'https://sarathi.parivahan.gov.in/' },
    ],
  },
  {
    id: 'sim-mobile',
    titleHi: 'सिम और मोबाइल',
    titleEn: 'SIM and Mobile',
    items: [
      { labelHi: 'आपके नाम पर कितने सिम', labelEn: 'SIMs on your name', url: 'https://tafcop.sancharsaathi.gov.in/' },
      { labelHi: 'चोरी हुई मोबाइल को ब्लॉक करे', labelEn: 'Block lost mobile', url: 'https://ceir.sancharsaathi.gov.in/' },
      { labelHi: 'मिल जाने पर अनब्लॉक करे', labelEn: 'Unblock mobile', url: 'https://ceir.sancharsaathi.gov.in/' },
      { labelHi: 'आपका मोबाइल चोरी का या डुबलीकेट तो नहीं', labelEn: 'Check mobile authenticity', url: 'https://ceir.sancharsaathi.gov.in/' },
    ],
  },
  {
    id: 'tehsil-case',
    titleHi: 'तहसील और केस',
    titleEn: 'Tehsil and Case',
    items: [
      { labelHi: 'जाने आपके ऊपर किसी ने केस तो नहीं किया', labelEn: 'Check case against you', url: 'https://ecourts.gov.in/' },
      { labelHi: 'अपने केस की स्थिति जाने', labelEn: 'Case status', url: 'https://ecourts.gov.in/' },
      { labelHi: 'केस की अगली तारीख कब है जाने', labelEn: 'Next hearing date', url: 'https://ecourts.gov.in/' },
      { labelHi: 'खेत/प्लॉट पर केस हुआ या नहीं जाने (UP)', labelEn: 'Land case status', url: 'https://upbhulekh.gov.in/' },
    ],
  },
]

const otherServiceSections = [
  {
    id: 'section-1',
    categoryIds: ['new-links']
  },
  {
    id: 'section-2',
    categoryIds: ['government-work', 'tehsil-work', 'complaint-portal', 'scholarship']
  },
  {
    id: 'section-3',
    categoryIds: ['election', 'other', 'wedding-subsidy', 'loan-scheme']
  },
  {
    id: 'section-4',
    categoryIds: ['government-scheme', 'driving', 'sim-mobile', 'tehsil-case']
  },
]

function openServiceUrl(url) {
  if (typeof window === 'undefined' || !url) {
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

function OtherServicesSection({ siteLanguage, onClose }) {
  const isHindi = siteLanguage === 'hi'
  
  // Create a map of categories by ID for quick lookup
  const categoryMap = {}
  otherServiceCategories.forEach((cat) => {
    categoryMap[cat.id] = cat
  })

  return (
    <section id="other-services-section" className="other-services-section">
      <div className="other-services-shell">
        <div className="other-services-header">
          <div>
            <p className="other-services-kicker">Citizen shortcuts</p>
            <h2>{isHindi ? 'अन्य सेवाएं' : 'Other Services'}</h2>
            {/* <p className="other-services-subtitle">
              {isHindi
                ? 'आवश्यक सरकारी पोर्टल और नागरिक उपयोगिता लिंक सीधे खोलें।'
                : 'Quick access to frequently used government portals and citizen utility links.'}
            </p> */}
          </div>
          <button type="button" className="other-services-close-btn" onClick={onClose}>
            {isHindi ? 'सेवाएं वापस' : 'Back to services'}
          </button>
        </div>

        <div className="other-services-sections-grid">
          {otherServiceSections.map((section) => (
            <div className="other-services-section-column" key={section.id}>
              {section.categoryIds.map((categoryId) => {
                const category = categoryMap[categoryId]
                if (!category) return null
                return (
                  <article className="other-services-card" key={category.id}>
                    <div className="other-services-card-title">{category.titleHi}</div>
                    <div className="other-services-card-body">
                      <div className="other-services-card-label">{isHindi ? category.titleHi : category.titleEn}</div>
                      <ul className="other-services-list">
                        {category.items.map((item) => (
                          <li key={`${category.id}-${item.labelEn}`}>
                            <button
                              type="button"
                              className="other-services-item-btn"
                              onClick={() => openServiceUrl(item.url)}
                            >
                              <span className="other-services-tick">✓</span>
                              <span>{isHindi ? item.labelHi : item.labelEn}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          ))}
        </div>

        <div className="other-services-footer">
          {/* <p>
            {isHindi
              ? 'ऊपर दिए गए लिंक से आधिकारिक पोर्टल सीधे खोलें। काम पूरा होने पर वापस जाएं।'
              : 'Use the links above to reach official portals directly. Tap back when you are done.'}
          </p> */}
          <button type="button" className="other-services-footer-btn" onClick={onClose}>
            {isHindi ? 'सेक्शन बंद करें' : 'Close section'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default OtherServicesSection
