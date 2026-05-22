import { useState } from 'react'
import './OtherServicesSection.css'

const TOILET_SCHEME_LABEL_EN = 'Toilet scheme'
const GAS_BOOKING_LABEL_EN = 'Gas cylinder booking'
const SELF_HELP_SCHEME_LABEL_EN = 'Self-help scheme'
const RATION_EKYC_LABEL_EN = 'Ration card e-KYC'
const BANK_BALANCE_LABEL_EN = 'Check bank balance'

const toiletSchemeActions = [
  {
    id: 'toilet-registration',
    labelHi: 'आवेदन हेतु रजिस्ट्रेशन',
    labelEn: 'Registration',
    descriptionHi: 'नया आवेदन शुरू करने के लिए रजिस्ट्रेशन करें।',
    descriptionEn: 'Register to start a new application.',
    url: 'https://sbm.gov.in/SBM_DBT/Secure/DBT/DBT_Registration.aspx'
  },
  {
    id: 'toilet-login',
    labelHi: 'आवेदन हेतु लॉगिन',
    labelEn: 'Login',
    descriptionHi: 'रजिस्ट्रेशन के बाद लॉगिन करके आवेदन पूरा करें।',
    descriptionEn: 'Login after registration to continue your application.',
    url: 'https://sbm.gov.in/sbm_dbt/secure/login.aspx'
  },
  {
    id: 'toilet-status',
    labelHi: 'चेक एप्लीकेशन स्टेटस',
    labelEn: 'Check application status',
    descriptionHi: 'अपने आवेदन की वर्तमान स्थिति यहां देखें।',
    descriptionEn: 'Track your current application status here.',
    url: 'https://sbm.gov.in/sbm_dbt/secure/login.aspx'
  }
]

const gasCylinderCards = [
  {
    id: 'indane',
    nameHi: 'इंडेन गैस',
    nameEn: 'Indane Gas',
    bookingUrl: 'https://play.google.com/store/apps/details?id=cx.indianoil.in',
    secondaryUrl: 'https://cx.indianoil.in/webcenter/portal/LPG/pages_lpgservices?ref=judge.me'
  },
  {
    id: 'hp',
    nameHi: 'एचपी गैस',
    nameEn: 'HP Gas',
    bookingUrl: 'https://play.google.com/store/apps/details?id=com.drivetrackplusrefuel',
    secondaryUrl: 'https://myhpgas.in/myHPGas/QuickPay.aspx'
  },
  {
    id: 'bharat',
    nameHi: 'भारत गैस',
    nameEn: 'Bharat Gas',
    bookingUrl: 'https://play.google.com/store/apps/details?id=com.cgt.bharatgas',
    secondaryUrl: 'https://my.ebharatgas.com/bharatgas/QuickBook/BookAndPay?source=MB'
  }
]

const gasWhatsappBookingRows = [
  {
    id: 'hp-whatsapp',
    providerHi: 'एचपी गैस',
    providerEn: 'HP GAS',
    contact: '9222201122',
    bookingUrl: 'https://wa.me/919222201122'
  },
  {
    id: 'bharat-whatsapp',
    providerHi: 'भारत गैस',
    providerEn: 'BHARAT GAS',
    contact: '1800224344',
    bookingUrl: 'https://my.ebharatgas.com/bharatgas/Home/Index'
  },
  {
    id: 'indane-whatsapp',
    providerHi: 'इंडेन गैस',
    providerEn: 'INDANE GAS',
    contact: '7588888824',
    bookingUrl: 'https://wa.me/917588888824'
  }
]

const selfHelpSchemeActions = [
  {
    id: 'self-help-registration',
    labelHi: 'नया रजिस्ट्रेशन',
    labelEn: 'New Registration',
    url: 'https://www.7nishchay-yuvaupmission.bihar.gov.in/'
  },
  {
    id: 'self-help-login',
    labelHi: 'एप्लीकेशन लॉगिन',
    labelEn: 'Application Login',
    url: 'https://www.7nishchay-yuvaupmission.bihar.gov.in/'
  },
  {
    id: 'self-help-forgot-password',
    labelHi: 'पासवर्ड भूल गए',
    labelEn: 'Forgot Password',
    url: 'https://www.7nishchay-yuvaupmission.bihar.gov.in/'
  },
  {
    id: 'self-help-status',
    labelHi: 'एप्लीकेशन स्टेटस',
    labelEn: 'Application Status',
    url: 'https://www.7nishchay-yuvaupmission.bihar.gov.in/'
  }
]

const rationEkycStepsHi = [
  'राशन कार्ड में e-KYC करने के लिए सबसे पहले अपने मोबाइल फोन में Play Store ओपन करें।',
  'यहां पर Aadhar Face RD सर्च करें।',
  'दिखाई देने वाली एप्लीकेशन को इंस्टॉल करें।',
  'इसके बाद Play Store में Mera E Kyc App सर्च करके इंस्टॉल करें।',
  'अब एप्लीकेशन ओपन करके अपने राज्य का नाम चुनें।',
  'अपना आधार नंबर दर्ज करें और आधार से लिंक मोबाइल पर आए OTP को दर्ज करें।',
  'जानकारी दिखने के बाद नीचे दिए Face eKYC विकल्प पर क्लिक करें।',
  'Consent pop-up को Accept करें।',
  'इसके बाद Aadhar Face RD App खुलेगा, वहां Proceed विकल्प पर क्लिक करें।',
  'अपना फोटो कैप्चर करें।',
  'फोटो सफल होने के बाद e-KYC प्रक्रिया पूरी हो जाएगी।',
  'ऊपर दिए गए सभी स्टेप्स फॉलो करके आप आसानी से राशन कार्ड e-KYC पूरा कर सकते हैं।'
]

const rationImportantLinks = [
  {
    id: 'ration-ekyc-main',
    nameHi: 'राशन कार्ड e-KYC करें',
    nameEn: 'Ration card e-KYC',
    ctaHi: 'Click Here',
    ctaEn: 'Click Here',
    url: 'https://play.google.com/store/apps/details?id=com.nic.facialauth&hl=hi'
  },
  {
    id: 'aadhar-face-rd',
    nameHi: 'Aadhar Face RD',
    nameEn: 'Aadhar Face RD',
    ctaHi: 'Click Here',
    ctaEn: 'Click Here',
    url: 'https://play.google.com/store/apps/details?id=in.gov.uidai.facerd'
  },
 
  {
    id: 'ration-name-check',
    nameHi: 'राशन कार्ड में नाम जुड़ा की नहीं, देखें।',
    nameEn: 'Check name in ration card',
    ctaHi: 'Click Here',
    ctaEn: 'Click Here',
    url: 'https://nfsa.gov.in/public/frmPublicGetMyRCDetails.aspx'
  },
  {
    id: 'ration-member-count',
    nameHi: 'राशन कार्ड में सदस्यों की संख्या चेक करें',
    nameEn: 'Check family members count',
    ctaHi: 'Click Here',
    ctaEn: 'Click Here',
    url: 'https://nfsa.gov.in/public/frmPublicGetMyRCDetails.aspx'
  },
  {
    id: 'ration-six-month-history',
    nameHi: '6 महीने में आपने कितना राशन लिया है, यहां देखें',
    nameEn: 'Check last 6 months ration history',
    ctaHi: 'Click Here',
    ctaEn: 'Click Here',
    url: 'https://impds.nic.in/sale/'
  },
  {
    id: 'new-ration-card',
    nameHi: 'नया राशन कार्ड आवेदन',
    nameEn: 'New ration card application',
    ctaHi: 'Click Here',
    ctaEn: 'Click Here',
    url: 'https://nfsa.gov.in/sso/frmSSOUserRegistration.aspx'
  },
  {
    id: 'aadhaar-link-status',
    nameHi: 'परिवार सदस्य आधार लिंक स्थिति चेक',
    nameEn: 'Check family Aadhaar link status',
    ctaHi: 'Click Here',
    ctaEn: 'Click Here',
    url: 'https://play.google.com/store/apps/details?id=com.nic.onenationonecard&hl=hi'
  }
]

const bankBalanceCards = [
  {
    id: 'sbi',
    bankName: 'State Bank of India (SBI)',
    callNumber: '09223766666',
    smsCode: 'BAL',
    smsNumber: '09223766666'
  },
  {
    id: 'union-bank',
    bankName: 'Union Bank of India',
    callNumber: '09223008586',
    smsCode: 'UBAL',
    smsNumber: '09223008586',
    note: '(Andhra Bank & Corporation Bank merged)'
  },
  {
    id: 'pnb',
    bankName: 'Punjab National Bank (PNB)',
    callNumber: '18001802223',
    smsCode: 'BAL <A/C No>',
    smsNumber: ''
  },
  {
    id: 'hdfc',
    bankName: 'HDFC Bank',
    callNumber: '18002703333',
    smsCode: 'BALANCE',
    smsNumber: ''
  },
  {
    id: 'icici',
    bankName: 'ICICI Bank',
    callNumber: '9594612612',
    smsCode: 'IBAL',
    smsNumber: ''
  },
  {
    id: 'bob',
    bankName: 'Bank of Baroda',
    callNumber: '8468001111',
    smsCode: 'BAL',
    smsNumber: ''
  },
  {
    id: 'axis',
    bankName: 'Axis Bank',
    callNumber: '18004195959',
    smsCode: 'BAL',
    smsNumber: ''
  },
  {
    id: 'canara',
    bankName: 'Canara Bank',
    callNumber: '09015483483',
    smsCode: 'BAL',
    smsNumber: ''
  },
  {
    id: 'ippb',
    bankName: 'India Post Payments Bank (IPPB)',
    callNumber: '8424046556',
    smsCode: 'BAL',
    smsNumber: ''
  }
]

function createSmsUrl(number, code) {
  const body = encodeURIComponent(code)
  if (number) {
    return `sms:${number}?body=${body}`
  }

  return `sms:?body=${body}`
}

const otherServiceCategories = [
  {
    id: 'new-links',
    titleHi: 'नया लिंक',
    titleEn: 'New Links',
    items: [
      { labelHi: 'किसके नाम कितनी जमीन है पता करें', labelEn: 'Check land records', url: 'https://upbhunaksha.gov.in/home' },
      { labelHi: 'सहारा बैंक का पैसा आपके खाता में आया की नहीं चेक करे', labelEn: 'Check bank deposit', url: 'https://mocrefund.crcs.gov.in/depositor/#/depositor/login' },
      { labelHi: 'PM आवास नई लिस्ट जारी, यहाँ से चेक करें अपना नाम', labelEn: 'PM Awas new list', url: 'https://rhreporting.nic.in/netiay/SocialAuditReport/BeneficiaryDetailForSocialAuditReport.aspx' },
      { labelHi: 'फसल नुकसान पर ₹22,500 तक सहायता आवेदन शुरू', labelEn: 'Crop insurance claim', url: 'https://dbtagriculture.bihar.gov.in/InputTest/Input2526Rabi/OnlineApplication2223.aspx' },
      { labelHi: 'ई-श्रम कार्ड Rs.3000/- आवेदन करें', labelEn: 'e-Shram card', url: 'https://register.eshram.gov.in/#/user/self' },
      { labelHi: 'फ्री बिजली बिल योजना', labelEn: 'Free electricity scheme', url: 'https://consumer.pmsuryaghar.gov.in/consumer/#/login' },
      { labelHi: 'अपने गाड़ी का PUC सर्टिफिकेट ऐसे निकाले', labelEn: 'PUC certificate', url: 'https://puc.parivahan.gov.in/puc/views/PucCertificate.xhtml' },
      { labelHi: 'शौचालय योजना (12000 रु)', labelEn: 'Toilet scheme', url: 'https://swachhbharatmission.ddws.gov.in/' },
      { labelHi: 'गैस सिलेंडर बुकिंग', labelEn: 'Gas cylinder booking', url: 'https://indane.co.in/' },
      // { labelHi: 'मुख्यमंत्री निश्चय स्वयं सहायता भत्ता योजना शुरू', labelEn: 'Self-help scheme', url: 'https://www.india.gov.in/' },
      { labelHi: 'लेबर पंजीयन 7000 रु /-', labelEn: 'Labor registration', url: 'https://upbocw.in/index.aspx' },
      { labelHi: 'LIC बीमा सखी योजना 7000 रूपये आवेदन करें', labelEn: 'LIC insurance scheme', url: 'https://app-urls.searchpope.com/loan-hi?ret=Ro0A&utm_source=google&utm_medium=bharatjobresult.com&utm_campaign=22842081240&gad_source=5&gad_campaignid=22842081240&gclid=CjwKCAjwnZfPBhAGEiwAzg-VzLXd6D_-Rj5r_IUHUQZtRf4_QITSoyqdTf9wL-IH8AHkLNmql2R7qBoCADsQAvD_BwE' },
      { labelHi: 'विधवा महिला को रु. 30000/- की सहायता', labelEn: 'Widow assistance', url: 'https://nfbs.upsdc.gov.in/Registration_New.aspx' },
      { labelHi: 'राशन कार्ड e-KYC करें', labelEn: 'Ration card e-KYC', url: 'https://nfsa.gov.in/' },
      { labelHi: 'PM इंटर्नशिप (रु 5000)', labelEn: 'PM internship', url: 'https://pminternship.mca.gov.in/login/' },
      { labelHi: 'अपने घर के छत पर फ्री में सोलर पैनल लगवाए आवेदन शुरू', labelEn: 'Solar panel scheme', url: 'https://solarrooftop.pmsuryaghar.gov.in/' },
      { labelHi: 'PM विद्यालक्ष्मी लोन (10 लाख)', labelEn: 'PM Vidyalaxmi loan', url: 'https://pmvidyalaxmi.co.in/Index.aspx' },
      { labelHi: 'महिलाओ के लिए फ्री सिलाई मशीन या रु15000/-', labelEn: 'Free sewing machine', url: 'https://pmvishwakarma.gov.in/' },
      { labelHi: 'पक्का मकान बनाने के लिए 2.5 लाख', labelEn: 'Housing loan', url: 'https://pmaymis.gov.in/' },
      { labelHi: 'CM युवा उद्यमी योजना (5 लाख लोन)', labelEn: 'Youth entrepreneurship', url: 'https://msme.up.gov.in/login/registration_login' },
      { labelHi: 'UP पंचायत चुनाव नयी वोटर लिस्ट', labelEn: 'UP voter list', url: 'https://sec.up.nic.in/site/VoterList2026.aspx' },
      { labelHi: 'अपना Resume बनाये', labelEn: 'Create resume', url: 'https://novoresume.com/?noRedirect=true' },
      { labelHi: 'LIC बिमा सखी', labelEn: 'LIC insurance', url: 'https://sarkariportal.online/lic-bima-sakhi-yojana/' },
      { labelHi: 'कन्या उत्थान योजना (बेटी को आगे पढ़ने के लिए 25000 की सहायता)', labelEn: 'Girl education scheme', url: 'https://medhasoft.bihar.gov.in/' },
      { labelHi: 'LPG Gas eKYC', labelEn: 'LPG e-KYC', url: 'https://www.pmuy.gov.in/ujjwala2.html' },
      { labelHi: 'नयी वोटर लिस्ट (SIR Draft Roll)', labelEn: 'New voter list', url: 'https://voters.eci.gov.in/download-eroll' },
      { labelHi: 'चेक बिजली बिल', labelEn: 'Check electricity bill', url: 'https://consumer.uppcl.org/wss/auth/login' },
      { labelHi: 'SIR (2003, 2002 वोटर लिस्ट)', labelEn: 'SIR voter list', url: 'https://voters.eci.gov.in/searchInSIR/S2UA4DPDF-JK4QWODSE' },
      { labelHi: 'बैंक से आधार लिंक करे (NPCI)', labelEn: 'Link Aadhaar with bank', url: 'https://www.npci.org.in/' },
      { labelHi: 'UPI से गलत पेमेंट होने पर कंप्लेंट करे', labelEn: 'UPI complaint', url: 'https://www.npci.org.in/upi-complaint' },
      { labelHi: 'आधार नंबर से राशन कार्ड डाऊनलोड करे', labelEn: 'Download ration card', url: 'https://play.google.com/store/apps/details?id=com.nic.onenationonecard&hl=hi' },
      { labelHi: 'बुजुर्ग के लिए 1000 रूपये (UP)', labelEn: 'Senior citizen assistance', url: 'https://sspy-up.gov.in/' },
      { labelHi: 'ग्राहक शिकायत', labelEn: 'Consumer complaint', url: 'https://consumerhelpline.gov.in/public/' },
      { labelHi: 'UPI से 5 मिनट में PF का पैसा निकाले', labelEn: 'PF withdrawal', url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/x' },
    ],
  },
  {
    id: 'government-work',
    titleHi: 'सरकारी काम',
    titleEn: 'Government Work',
    items: [
      { labelHi: 'बैंक से आधार लिंक करे (NPCI)', labelEn: 'Link Aadhaar with bank', url: 'https://www.npci.org.in/' },
      { labelHi: 'पीएम उज्ज्वला नई कनेक्शन', labelEn: 'PM Ujjwala', url: 'https://www.pmuy.gov.in/ujjwala2.html' },
      { labelHi: 'पासपोर्ट सेवा', labelEn: 'Passport service', url: 'https://www.passportindia.gov.in/psp/ApplyPassport' },
      { labelHi: 'चेक बिजली बिल', labelEn: 'Check electricity bill', url: 'https://consumer.uppcl.org/wss/pay_bill_home' },
      { labelHi: 'फॉर्मर रजिस्ट्री (Farmer Registry)', labelEn: 'Farmer registry', url: 'https://upfr.agristack.gov.in/farmer-registry-up/#/' },
      { labelHi: 'आधार कार्ड', labelEn: 'Aadhaar card', url: 'https://myaadhaar.uidai.gov.in/' },
      { labelHi: 'पैन कार्ड', labelEn: 'PAN card', url: 'https://onlineservices.proteantech.in/paam/endUserRegisterContact.html' },
      { labelHi: 'PM किसान', labelEn: 'PM Kisan', url: 'https://pmkisan.gov.in/' },
      { labelHi: 'भूलेख', labelEn: 'Land records', url: 'https://upbhulekh.gov.in/' },
      { labelHi: 'भू नक्शा (ज़मीन का नक्शा)', labelEn: 'Land map', url: 'https://upbhunaksha.gov.in/home' },
      { labelHi: 'PM आवास', labelEn: 'PM Awas', url: 'https://pmay-urban.gov.in/' },
      { labelHi: 'नरेगा (जॉबकार्ड, हाज़िरी)', labelEn: 'NREGA', url: 'https://sarkariportal.online/nrega-job-card-list/' },
      { labelHi: 'ई श्रम कार्ड', labelEn: 'e-Shram card', url: 'https://register.eshram.gov.in/#/user/self' },
      { labelHi: 'आयुष्मान कार्ड', labelEn: 'Ayushman card', url: 'https://beneficiary.nha.gov.in/' },
      { labelHi: 'आभा कार्ड', labelEn: 'ABHA card', url: 'https://abha.abdm.gov.in/abha/v3/register' },
      { labelHi: 'समग्र id कार्ड', labelEn: 'Samagra ID', url: 'https://samagra.gov.in/' },
      { labelHi: 'PUC Service', labelEn: 'PUC service', url: 'https://puc.parivahan.gov.in/puc/' },
      { labelHi: 'APAAR ID कार्ड', labelEn: 'APAAR ID', url: 'https://digilocker.meripehchaan.gov.in/' },
      { labelHi: 'वोटर कार्ड', labelEn: 'Voter card', url: 'https://voters.eci.gov.in/' },
      { labelHi: 'ड्राइविंग लाइसेंस', labelEn: 'Driving license', url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do' },
      { labelHi: 'शौचालय योजना (रू.12000)', labelEn: 'Toilet scheme', url: 'https://swachhbharatmission.ddws.gov.in/' },
      { labelHi: 'गैस सब्सिडी देखे', labelEn: 'Check gas subsidy', url: 'https://cx.indianoil.in/EPICIOCL/faces/GrievanceMainPage.jspx' },
      { labelHi: 'राशन कार्ड', labelEn: 'Ration card', url: 'https://nfsa.gov.in/' },
      { labelHi: 'NSP नेशनल स्कालरशिप OTR', labelEn: 'National scholarship', url: 'https://scholarships.gov.in/otrapplication/#/' },
      { labelHi: 'LPG Gas eKYC', labelEn: 'LPG e-KYC', url: 'https://www.pmuy.gov.in/ujjwala2.html' },
      { labelHi: 'लाडो लक्ष्मी योजना', labelEn: 'Lado Lakshmi scheme', url: 'https://pension.socialjusticehry.gov.in/ben_List' },
      { labelHi: 'माझी लाड़की बहिण योजना', labelEn: 'Mazi Ladki Bahin scheme', url: 'https://pension.socialjusticehry.gov.in/ben_List' },
    ],
  },
  {
    id: 'tehsil-work',
    titleHi: 'तहसील के कार्य',
    titleEn: 'Tehsil Work',
    items: [
      { labelHi: 'जमीन विवाद में है या नहीं जाने', labelEn: 'Check land dispute', url: 'https://upbhulekh.gov.in/#/home' },
      { labelHi: 'भू नक्शा', labelEn: 'Land map', url: 'https://upbhunaksha.gov.in/' },
      { labelHi: 'भूलेख', labelEn: 'Land records', url: 'https://upbhulekh.gov.in/' },
    ],
  },
  {
    id: 'complaint-portal',
    titleHi: 'शिकायत पोर्टल',
    titleEn: 'Complaint Portal',
    items: [
      { labelHi: 'थाने में रिपोर्ट करें', labelEn: 'Police complaint', url: 'https://jansunwai.up.nic.in/' },
      { labelHi: 'राशन कार्ड की शिकायत करें', labelEn: 'Ration card complaint', url: 'https://jansunwai.up.nic.in/' },
      { labelHi: 'प्रधानमंत्री जी से शिकायत करें', labelEn: 'PM grievance portal', url: 'https://pmopg.gov.in/citizenreforms?language=en' },
      { labelHi: 'ग्राम प्रधान की शिकायत करें', labelEn: 'Local grievance portal', url: 'https://jansunwai.up.nic.in/' },
    ],
  },
  {
    id: 'scholarship',
    titleHi: 'Scholarship',
    titleEn: 'Scholarship',
    items: [
      { labelHi: 'मैट्रिक पास लड़का-लड़की दोनों को मिलेगा Rs.10,000', labelEn: 'Post-matric scholarship', url: 'https://medhasoft.bihar.gov.in/' },
      { labelHi: 'इंटर पास लड़का-लड़की दोनों को मिलेगा Rs.25,000', labelEn: 'Inter pass scholarship', url: 'https://medhasoft.bihar.gov.in/' },
    ],
  },
  {
    id: 'election',
    titleHi: 'चुनाव',
    titleEn: 'Election',
    items: [
      { labelHi: 'UP पंचायत चुनाव वोटर लिस्ट', labelEn: 'UP voter list', url: 'https://sec.up.nic.in/site/VoterList2026.aspx' },
      { labelHi: 'सरपंच/प्रधान/मुखिया किस काम का कितना पैसा निकला', labelEn: 'https://play.google.com/store/apps/details?id=nic.in.unified&hl=en_IN' },
      { labelHi: 'यूपी चुनाव 2021 में सीट कौन सा था जाने (ग्राम, क्षेत्र, जिला)', labelEn: 'UP election 2021', url: 'https://sec.up.nic.in/site/SearchReservationOnPost.aspx' },
      { labelHi: 'यू.पी. ग्राम पंचायत चुनाव (प्रधानी)', labelEn: 'Gram panchayat election', url: 'https://sec.up.nic.in/site/SearchReservationOnPost.aspx' },
      { labelHi: 'यूपी चुनाव 2015 में सीट कौन सा था जाने (ग्राम, क्षेत्र, जिला)', labelEn: 'UP election 2015', url: 'https://sec.up.nic.in/ElecLive/SearchReservationOnPost.aspx' },
      { labelHi: 'बिहार 2003 वोटर लिस्ट', labelEn: 'Bihar voter list', url: 'https://voters.eci.gov.in/bh_2003_eroll' },
      { labelHi: '2003 बिहार मतदाता सूची में अपना नाम खोजें', labelEn: 'Search Bihar voter', url: 'https://voters.eci.gov.in/bh_2003_eroll' },
      { labelHi: 'राजस्थान ग्राम पंचायत चुनाव (सरपंच)', labelEn: 'Rajasthan panchayat', url: 'https://sec.rajasthan.gov.in/grampanchayatdetails.aspx' },
    ],
  },
  {
    id: 'other',
    titleHi: 'अन्य',
    titleEn: 'Other',
    items: [
      { labelHi: 'कन्या सुमंगला योजना 25000 मिलेगा', labelEn: 'Kanya Sumangal scheme', url: 'https://mksy.up.gov.in/women_welfare/index.php' },
      { labelHi: 'बैंक बैलेंस चेक (कॉल या मैसेज से)', labelEn: 'Check bank balance', url: 'https://www.india.gov.in/' },
      { labelHi: 'PF Balance सम्बंधित कार्य', labelEn: 'PF balance', url: 'https://passbook.epfindia.gov.in/MemberPassBook/login' },
      { labelHi: 'वृद्धा पेंशन बिहार', labelEn: 'Senior citizen pension', url: 'https://www.sspmis.bihar.gov.in/HomePage' },
      { labelHi: 'जन्म प्रमाण पत्र आवेदन (CRS)', labelEn: 'Birth certificate', url: 'https://dc.crsorgi.gov.in/crs/' },
      { labelHi: 'गैस सब्सिडी देखें', labelEn: 'Check gas subsidy', url: 'https://cx.indianoil.in/EPICIOCL/faces/GrievanceMainPage.jspx' },
     
      { labelHi: 'PM Free Wi-Fi Yojana', labelEn: 'PM Free Wi-Fi', url: 'https://pmwani.gov.in/wani' },
    ],
  },
  {
    id: 'wedding-subsidy',
    titleHi: 'शादी अनुदान योजना',
    titleEn: 'Wedding Subsidy Scheme',
    items: [
      { labelHi: 'बेटी की शादी के लिए 1 लाख रू०', labelEn: 'Daughter wedding subsidy', url: 'https://cmsvy.upsdc.gov.in/' },
      { labelHi: 'विधबा महिला से शादी करने के लिए 11 हज़ार रू०', labelEn: 'Widow remarriage', url: 'https://shadianudan.upsdc.gov.in/' },
      { labelHi: 'विधबा महिला के बेटी से शादी करने के लिए 11 हज़ार रू०', labelEn: 'Widow daughter marriage', url: 'https://shadianudan.upsdc.gov.in/' },
      { labelHi: 'दूसरी जाति के लड़की से शादी के लिए 2.5 लाख रू योजना', labelEn: 'Inter-caste marriage', url: 'https://saralharyana.gov.in/' },
    ],
  },
  {
    id: 'loan-scheme',
    titleHi: 'Loan योजना',
    titleEn: 'Loan Scheme',
    items: [
      { labelHi: 'PMEGP Loan Yojana', labelEn: 'PMEGP loan', url: 'https://kviconline.gov.in/pmegpeportal/pmegphome/index.jsp' },
      { labelHi: 'PM विद्यालक्ष्मी लोन (8 लाख)', labelEn: 'PM Vidyalaxmi loan', url: 'https://pmvidyalaxmi.co.in/Index.aspx' },
      { labelHi: 'व्यापर के लिए 5 लाख', labelEn: 'Business loan', url: 'https://msme.up.gov.in/login/registration_login' },
      { labelHi: 'ठेला वालो के लिए 10 हज़ार', labelEn: 'Cart vendor loan', url: 'https://www.pmsvanidhi.mohua.gov.in/LoginLoRCumLoan' },
      { labelHi: 'जन समर्थ लोन (1 लाख से 20 लाख तक लोन)', labelEn: 'Jan Samriddhi loan', url: 'https://www.jansamarth.in/register' },
      // { labelHi: 'खेत तारबंदी के लिए 40000 रू की सब्सिडी', labelEn: 'Farm fencing subsidy', url: 'https://www.india.gov.in/' },
      { labelHi: 'ट्रेक्टर के लिए 3 लाख रू की सब्सिडी', labelEn: 'Tractor subsidy', url: 'https://agriharyana.gov.in/sctractor.aspx' },
    ],
  },
  {
    id: 'government-scheme',
    titleHi: 'सरकारी योजना',
    titleEn: 'Government Scheme',
    items: [
      { labelHi: 'कन्या विवाह योजना (राज्यवार)', labelEn: 'Girl marriage scheme', url: 'https://cmsvy.upsdc.gov.in/reg/index.php' },
      { labelHi: 'बिहार सरकारी काम', labelEn: 'Bihar govt services', url: 'https://bharatjobresult.com/bihar-sarkari-kaam/' },
      { labelHi: 'उत्तर प्रदेश सरकारी काम', labelEn: 'UP govt services', url: 'https://bharatjobresult.com/uttar-pradesh-sarkari-kaam/' },
      { labelHi: 'मध्य प्रदेश सरकारी काम', labelEn: 'MP govt services', url: 'https://bharatjobresult.com/madhya-pradesh-sarkari-kaam/' },
      { labelHi: 'झारखंड सरकारी काम', labelEn: 'Jharkhand govt services', url: 'https://bharatjobresult.com/jharkhand-sarkari-kaam/' },
      { labelHi: 'राजस्थान सरकारी काम', labelEn: 'Rajasthan govt services', url: 'https://bharatjobresult.com/rajasthan-sarkari-kaam/' },
      { labelHi: 'छत्तीसगढ़ सरकारी काम', labelEn: 'Chhattisgarh govt services', url: 'https://bharatjobresult.com/chhattisgarh-sarkari-kaam/' },
    ],
  },
  {
    id: 'driving',
    titleHi: 'गाड़ी और लाइसेंस',
    titleEn: 'Driving & Licenses',
    items: [
      { labelHi: 'ड्राइविंग लाइसेंस में मोबाइल अपडेट', labelEn: 'Update DL mobile', url: 'https://sarathi.parivahan.gov.in/sarathiservice/mobNumUpdpub.do' },
      { labelHi: 'गाड़ी मालिक मोबाइल नंबर अपडेट करे', labelEn: 'Update RC mobile', url: 'https://vahan.parivahan.gov.in/mobileupdate/vahan/ui/statevalidation/editMobileNumber.xhtml' },
      { labelHi: 'लर्निंग लाइसेंस', labelEn: 'Learning license', url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do' },
      { labelHi: 'Driving Licence Download', labelEn: 'Download driving license', url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelectBean.do' },
      { labelHi: 'ड्राइविंग लाइसेंस', labelEn: 'Driving license', url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do' },
      { labelHi: 'ड्राइविंग लाइसेंस का स्टेटस', labelEn: 'DL status', url: 'https://parivahan.gov.in/rcdlstatus/?pur_cd=101' },
      { labelHi: 'RC दुबारा प्रिंट करवाए', labelEn: 'Reprint RC', url: 'https://vahan.parivahan.gov.in/' },
      { labelHi: 'गाड़ी का RC डाउनलोड करे', labelEn: 'Download RC', url: 'https://vahan.parivahan.gov.in/vahanservice/vahan/ui/onlineservice/form_print_Rc.xhtml' },
      { labelHi: 'चालान चेक करे', labelEn: 'Check traffic fine', url: 'https://echallan.parivahan.gov.in/index/accused-challan' },
      { labelHi: 'Know Your Vehicle Status', labelEn: 'Vehicle status', url: 'https://vahan.parivahan.gov.in/nrservices/faces/user/citizen/citizenlogin.xhtml' },
      { labelHi: 'गाड़ी मालिक जाने', labelEn: 'Know vehicle owner', url: 'https://vahan.parivahan.gov.in/nrservices/faces/user/citizen/citizenlogin.xhtml' },
      { labelHi: 'PUC Service', labelEn: 'PUC service', url: 'https://puc.parivahan.gov.in/puc/' },
      { labelHi: 'इन्सुरेंस एक्सपायरी जाने', labelEn: 'Check insurance expiry', url: 'https://vahan.parivahan.gov.in/nrservices/faces/user/citizen/citizenlogin.xhtml' },
      { labelHi: 'आधिकारिक वेबसाइट (Parivahan)', labelEn: 'Parivahan official', url: 'https://parivahan.gov.in/' },
      { labelHi: 'आधिकारिक वेबसाइट (Sarathi)', labelEn: 'Sarathi official', url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do' },
    ],
  },
  {
    id: 'sim-mobile',
    titleHi: 'सिम और मोबाइल',
    titleEn: 'SIM and Mobile',
    items: [
      { labelHi: 'आपके नाम पर कितने सिम', labelEn: 'SIMs on your name', url: 'https://tafcop.sancharsaathi.gov.in/telecomUser/' },
      { labelHi: 'चोरी हुई मोबाइल को ब्लॉक करे', labelEn: 'Block lost mobile', url: 'https://ceir.sancharsaathi.gov.in/Request/CeirUserBlockRequestDirect.jsp' },
      { labelHi: 'मिल जाने पर अनब्लॉक करे', labelEn: 'Unblock mobile', url: 'https://ceir.sancharsaathi.gov.in/Request/CeirUserUnblockRequestDirect.jsp' },
      { labelHi: 'आपका मोबाइल चोरी का या डुबलीकेट तो नहीं', labelEn: 'Check mobile authenticity', url: 'https://ceir.sancharsaathi.gov.in/Device/SancharSaathiKym.jsp' },
    ],
  },
  {
    id: 'tehsil-case',
    titleHi: 'तहसील और केस',
    titleEn: 'Tehsil and Case',
    items: [
      { labelHi: 'जाने आपके ऊपर किसी ने केस तो नहीं किया', labelEn: 'Check case against you', url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index' },
      { labelHi: 'अपने केस की स्थिति जाने', labelEn: 'Case status', url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index' },
      { labelHi: 'केस की अगली तारीख कब है जाने', labelEn: 'Next hearing date', url: 'https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index' },
      { labelHi: 'खेत/प्लॉट पर केस हुआ या नहीं जाने (UP)', labelEn: 'Land case status', url: 'https://vaad.up.nic.in/Search_Party_Wise.aspx' },
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

function isToiletSchemeItem(item) {
  return item?.labelEn === TOILET_SCHEME_LABEL_EN
}

function isGasCylinderItem(item) {
  return item?.labelEn === GAS_BOOKING_LABEL_EN
}

function isSelfHelpSchemeItem(item) {
  return item?.labelEn === SELF_HELP_SCHEME_LABEL_EN
}

function isRationEkycItem(item) {
  return item?.labelEn === RATION_EKYC_LABEL_EN
}

function isBankBalanceItem(item) {
  return item?.labelEn === BANK_BALANCE_LABEL_EN
}

function OtherServicesSection({ siteLanguage, onClose }) {
  const isHindi = siteLanguage === 'hi'
  const [activePanel, setActivePanel] = useState(null)
  
  // Create a map of categories by ID for quick lookup
  const categoryMap = {}
  otherServiceCategories.forEach((cat) => {
    categoryMap[cat.id] = cat
  })

  const handleServiceItemClick = (item) => {
    if (isToiletSchemeItem(item)) {
      setActivePanel('toilet-scheme')
      return
    }

    if (isGasCylinderItem(item)) {
      setActivePanel('gas-booking')
      return
    }

    if (isSelfHelpSchemeItem(item)) {
      setActivePanel('self-help-scheme')
      return
    }

    if (isRationEkycItem(item)) {
      setActivePanel('ration-ekyc')
      return
    }

    if (isBankBalanceItem(item)) {
      setActivePanel('bank-balance')
      return
    }

    openServiceUrl(item.url)
  }

  const closeActivePanel = () => {
    setActivePanel(null)
  }

  return (
    <section id="other-services-section" className="other-services-section">
      <div className="other-services-shell">
        <div className="other-services-header">
          <div>
            <p className="other-services-kicker">
              {activePanel === 'toilet-scheme'
                ? (isHindi ? 'योजना पोर्टल' : 'Scheme portal')
                : activePanel === 'gas-booking'
                  ? (isHindi ? 'बुकिंग पोर्टल' : 'Booking portal')
                  : activePanel === 'self-help-scheme'
                    ? (isHindi ? 'सहायता पोर्टल' : 'Assistance portal')
                    : activePanel === 'ration-ekyc'
                      ? (isHindi ? 'e-KYC गाइड' : 'e-KYC Guide')
                      : activePanel === 'bank-balance'
                        ? (isHindi ? 'बैंक सेवा' : 'Bank services')
                  : 'Citizen shortcuts'}
            </p>
            <h2>
              {activePanel === 'toilet-scheme'
                ? (isHindi ? 'शौचालय योजना (12000 रु)' : 'Toilet Scheme (Rs. 12000)')
                : activePanel === 'gas-booking'
                  ? (isHindi ? 'गैस सिलेंडर बुकिंग' : 'Gas Cylinder Booking')
                  : activePanel === 'self-help-scheme'
                    ? (isHindi ? 'मुख्यमंत्री निश्चय स्वयं सहायता भत्ता योजना' : 'Self Help Allowance Scheme')
                    : activePanel === 'ration-ekyc'
                      ? (isHindi ? 'राशन कार्ड e-KYC करें' : 'Ration Card e-KYC')
                      : activePanel === 'bank-balance'
                        ? (isHindi ? 'बैंक बैलेंस चेक - कॉल या SMS' : 'Bank Balance Check - Call or SMS')
                  : (isHindi ? 'अन्य सेवाएं' : 'Other Services')}
            </h2>
            {/* <p className="other-services-subtitle">
              {isHindi
                ? 'आवश्यक सरकारी पोर्टल और नागरिक उपयोगिता लिंक सीधे खोलें।'
                : 'Quick access to frequently used government portals and citizen utility links.'}
            </p> */}
          </div>
          <button type="button" className="other-services-close-btn" onClick={activePanel ? closeActivePanel : onClose}>
            {activePanel ? (isHindi ? 'सूची पर वापस' : 'Back to list') : (isHindi ? 'सेवाएं वापस' : 'Back to services')}
          </button>
        </div>

        {activePanel === 'toilet-scheme' ? (
          <div className="toilet-scheme-panel">
            <div className="toilet-scheme-grid">
              {toiletSchemeActions.map((action) => (
                <article className="toilet-scheme-card" key={action.id}>
                  <h3>{isHindi ? action.labelHi : action.labelEn}</h3>
                  <p>{isHindi ? action.descriptionHi : action.descriptionEn}</p>
                  <button type="button" className="toilet-scheme-card-btn" onClick={() => openServiceUrl(action.url)}>
                    {isHindi ? 'यहाँ क्लिक करें' : 'Open'}
                  </button>
                </article>
              ))}
            </div>
          </div>
        ) : activePanel === 'gas-booking' ? (
          <div className="gas-booking-panel">
            <div className="gas-booking-grid">
              {gasCylinderCards.map((card) => (
                <article className="gas-booking-card" key={card.id}>
                  <h3>{isHindi ? card.nameHi : card.nameEn}</h3>
                  <div className="gas-cylinder-art" aria-hidden="true">
                    <span>{card.nameEn.split(' ')[0]}</span>
                  </div>
                  <div className="gas-booking-actions">
                    <button type="button" className="gas-booking-primary-btn" onClick={() => openServiceUrl(card.bookingUrl)}>
                      {isHindi ? 'बुकिंग करें' : 'Booking Now'}
                    </button>
                    <button type="button" className="gas-booking-secondary-btn" onClick={() => openServiceUrl(card.secondaryUrl)}>
                      {isHindi ? 'लिंक-2 बुकिंग' : 'Link-2 Booking'}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="gas-whatsapp-block">
              <h4>{isHindi ? 'LPG गैस WhatsApp बुकिंग' : 'LPG Gas WhatsApp Booking'}</h4>
              <div className="gas-whatsapp-list">
                {gasWhatsappBookingRows.map((row) => (
                  <div className="gas-whatsapp-row" key={row.id}>
                    <div>
                      <div className="gas-whatsapp-provider">{isHindi ? row.providerHi : row.providerEn}</div>
                      <div className="gas-whatsapp-contact">WhatsApp: {row.contact}</div>
                    </div>
                    <button type="button" className="gas-whatsapp-btn" onClick={() => openServiceUrl(row.bookingUrl)}>
                      {isHindi ? 'बुकिंग करें' : 'Booking Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activePanel === 'self-help-scheme' ? (
          <div className="self-help-scheme-panel">
            <div className="self-help-scheme-grid">
              {selfHelpSchemeActions.map((action) => (
                <article className="self-help-scheme-card" key={action.id}>
                  <h3>{isHindi ? action.labelHi : action.labelEn}</h3>
                  <button type="button" className="self-help-scheme-btn" onClick={() => openServiceUrl(action.url)}>
                    {isHindi ? 'यहाँ क्लिक करें' : 'Click here'}
                  </button>
                </article>
              ))}
            </div>
          </div>
        ) : activePanel === 'ration-ekyc' ? (
          <div className="ration-ekyc-panel">
            <div className="ration-ekyc-instructions-card">
              <h3>💡 {isHindi ? 'राशन कार्ड e-KYC करने की प्रक्रिया' : 'How to complete ration card e-KYC'}</h3>
              <ol className="ration-ekyc-steps-list">
                {rationEkycStepsHi.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="ration-ekyc-links-card">
              <h4>{isHindi ? '🔗 Important Links (महत्वपूर्ण लिंक)' : 'Important Links'}</h4>
              <div className="ration-ekyc-links-list">
                {rationImportantLinks.map((linkItem) => (
                  <div className="ration-ekyc-link-row" key={linkItem.id}>
                    <div className="ration-ekyc-link-name">{isHindi ? linkItem.nameHi : linkItem.nameEn}</div>
                    <button type="button" className="ration-ekyc-link-btn" onClick={() => openServiceUrl(linkItem.url)}>
                      {isHindi ? linkItem.ctaHi : linkItem.ctaEn}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activePanel === 'bank-balance' ? (
          <div className="bank-balance-panel">
            <div className="bank-balance-grid">
              {bankBalanceCards.map((bank) => (
                <article className="bank-balance-card" key={bank.id}>
                  <h3>{bank.bankName}</h3>
                  <a className="bank-balance-call" href={`tel:${bank.callNumber}`}>
                    📞 Call: {bank.callNumber}
                  </a>
                  <a className="bank-balance-sms" href={createSmsUrl(bank.smsNumber, bank.smsCode)}>
                    💬 SMS: {bank.smsCode}
                  </a>
                  {bank.note ? <p>{bank.note}</p> : null}
                </article>
              ))}
            </div>
            <div className="bank-balance-note">
              ⚠️ {isHindi ? 'बैलेंस चेक सामान्यतः आपके रजिस्टर्ड मोबाइल नंबर से ही काम करता है।' : 'Balance enquiry usually works only from your registered mobile number.'}
            </div>
          </div>
        ) : (
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
                                onClick={() => handleServiceItemClick(item)}
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
        )}

        <div className="other-services-footer">
          {/* <p>
            {isHindi
              ? 'ऊपर दिए गए लिंक से आधिकारिक पोर्टल सीधे खोलें। काम पूरा होने पर वापस जाएं।'
              : 'Use the links above to reach official portals directly. Tap back when you are done.'}
          </p> */}
          <button type="button" className="other-services-footer-btn" onClick={activePanel ? closeActivePanel : onClose}>
            {activePanel ? (isHindi ? 'अन्य सेवाएं देखें' : 'View other services') : (isHindi ? 'सेक्शन बंद करें' : 'Close section')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default OtherServicesSection
