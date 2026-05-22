import { useEffect, useMemo, useRef, useState } from 'react'
import { State } from 'country-state-city'
import siteLogo from './images/cybercrime-logo.png'
import './App.css'
import emblem from './images/Emblem_of_India.png'
import i4c from './images/i4cpng.png'
import womenChildrenCrime from './images/womenchildren related crime.jpeg'
import financialFraud from './images/financial fraud.jpeg'
import otherCyberCrime from './images/other cyber crime.jpeg'
import photoLeakComplaint from './images/photo-leak.png'
import stolenPhoneComplaint from './images/stolen-phone.png'
import wrongUpiComplaint from './images/wrong-upi.png'
import citizenManual from './images/citizen manual.png'
import cyberAwareness from './images/cyber awareness.png'
import cyberSafety from './images/cyber safety.png'
import dailyDigest from './images/daily digest.png'
import learningCornerIcon from './images/learning corner.png'
import checkConnectionsImage from './images/check connections on your name.png'
import blockStolenPhoneImage from './images/request blocking stolen phone.jpg'
import unblockRecoveredPhoneImage from './images/unblock recovered mobile phone.png'
import handsetGenuinenessImage from './images/genuineness of handset.jpg'
import statusCheckLostStolenPhoneImage from './images/status check for lost stolen phone.jpg'
import reportInternationalCallImage from './images/report incoming international calls.avif'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import carouselOne from './images/curosel-1.png'
import carouselTwo from './images/curosel-2.png'
import mobileCarouselOne from './images/mobile-curosel-1.png'
import mobileCarouselTwo from './images/mobile-curosel-2.webp'
import ComplaintAcceptScreen from './components/ComplaintAcceptScreen'
import ComplaintIntroScreen from './components/ComplaintIntroScreen'
import ComplaintAnonymousFormScreen from './components/ComplaintAnonymousFormScreen'
import VolunteerTermsConditionsScreen from './components/VolunteerTermsConditionsScreen'
import VolunteerRegisterScreen from './components/VolunteerRegisterScreen'
import VolunteerUnlawfulContentScreen from './components/VolunteerUnlawfulContentScreen'
import VolunteerRegistrationPage from './components/VolunteerRegistrationPage'
import VolunteerDashboardPage from './components/VolunteerDashboardPage'
import VolunteerLoginPage from './components/VolunteerLoginPage'
import ContactUsScreen from './components/ContactUsScreen'
import CyberAwarenessScreen from './components/CyberAwarenessScreen'
import FaqScreen from './components/FaqScreen'
import MemberCardSetup from './components/MemberCardSetup'
import CoordinatorCardSetup from './components/CoordinatorCardSetup'
import OtherServicesSection from './components/OtherServicesSection'
import womenhelp from './images/womwn help.png'
import * as XLSX from 'xlsx'
import {
  applyLanguageToHeader,
  applyLanguageToDocument,
  LANGUAGE_STORAGE_KEY,
  startLanguageObserver,
  startHeaderLanguageObserver,
} from './utils/languageTranslator'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const ADMIN_AUTH_KEY = 'cybercrime_admin_authenticated'
const BLOCK_AUTH_KEY = 'cybercrime_block_authenticated'
const BLOCK_USER_KEY = 'cybercrime_block_user'
const MEMBER_AUTH_KEY = 'cybercrime_member_authenticated'
const MEMBER_USER_KEY = 'cybercrime_member_user'
const VOLUNTEER_AUTH_KEY = 'cybercrime_volunteer_authenticated'
const VOLUNTEER_USER_KEY = 'cybercrime_volunteer_user'
const INDIA_CODE = 'IN'
const UP_STATE_NAME = 'Uttar Pradesh'
const MORADABAD_DISTRICT_NAME = 'Moradabad'
const UP_DISTRICTS = [
  'Agra',
  'Aligarh',
  'Ambedkar Nagar',
  'Amethi',
  'Amroha',
  'Auraiya',
  'Ayodhya',
  'Azamgarh',
  'Baghpat',
  'Bahraich',
  'Ballia',
  'Balrampur',
  'Banda',
  'Barabanki',
  'Bareilly',
  'Basti',
  'Bhadohi',
  'Bijnor',
  'Budaun',
  'Bulandshahr',
  'Chandauli',
  'Chitrakoot',
  'Deoria',
  'Etah',
  'Etawah',
  'Farrukhabad',
  'Fatehpur',
  'Firozabad',
  'Gautam Buddha Nagar',
  'Ghaziabad',
  'Ghazipur',
  'Gonda',
  'Gorakhpur',
  'Hamirpur',
  'Hapur',
  'Hardoi',
  'Hathras',
  'Jalaun',
  'Jaunpur',
  'Jhansi',
  'Kannauj',
  'Kanpur Dehat',
  'Kanpur Nagar',
  'Kasganj',
  'Kaushambi',
  'Kushinagar',
  'Lakhimpur Kheri',
  'Lalitpur',
  'Lucknow',
  'Maharajganj',
  'Mahoba',
  'Mainpuri',
  'Mathura',
  'Mau',
  'Meerut',
  'Mirzapur',
  'Moradabad',
  'Muzaffarnagar',
  'Pilibhit',
  'Pratapgarh',
  'Prayagraj',
  'Raebareli',
  'Rampur',
  'Saharanpur',
  'Sambhal',
  'Sant Kabir Nagar',
  'Shahjahanpur',
  'Shamli',
  'Shrawasti',
  'Siddharthnagar',
  'Sitapur',
  'Sonbhadra',
  'Sultanpur',
  'Unnao',
  'Varanasi',
]

const normalizeHierarchyKey = (value) => String(value || '').trim().toLowerCase()
const normalizeText = (value) => String(value || '').trim()
const getHierarchyPairKey = (tehsilName, blockName) => `${normalizeHierarchyKey(tehsilName)}::${normalizeHierarchyKey(blockName)}`
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobilePattern = /^\d{10}$/
const aadhaarPattern = /^\d{12}$/
const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/

const isValidEmail = (value) => emailPattern.test(normalizeText(value))
const isValidMobile = (value) => mobilePattern.test(normalizeText(value))
const isValidAadhaar = (value) => aadhaarPattern.test(normalizeText(value))
const isValidPan = (value) => panPattern.test(normalizeText(value).toUpperCase())

const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result || ''))
  reader.onerror = () => reject(new Error('Failed to read selected file'))
  reader.readAsDataURL(file)
})

const getDownloadLabelFromName = (name, fallback) => {
  const normalizedName = normalizeText(name)
  return normalizedName || fallback
}

const extractVillageNamesFromWorkbook = async (file) => {
  const arrayBuffer = await file.arrayBuffer()
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })
  const sheetName = workbook.SheetNames[0]

  if (!sheetName) {
    throw new Error('The uploaded file does not contain any worksheets')
  }

  const worksheet = workbook.Sheets[sheetName]
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '', blankrows: false })

  if (rows.length < 2) {
    throw new Error('The uploaded file must contain village rows')
  }

  const headerRow = Array.isArray(rows[0])
    ? rows[0].map((cell) => normalizeText(cell).toLowerCase())
    : []
  const villageColumnIndex = headerRow.findIndex((header) => header === 'village name' || header === 'village')
  const resolvedVillageColumnIndex = villageColumnIndex >= 0 ? villageColumnIndex : 1

  const villages = rows
    .slice(1)
    .map((row) => {
      if (!Array.isArray(row)) {
        return ''
      }

      return normalizeText(row[resolvedVillageColumnIndex] ?? row[1] ?? row[0])
    })
    .filter(Boolean)

  const uniqueVillages = Array.from(new Set(villages))

  if (uniqueVillages.length === 0) {
    throw new Error('No village names were found in the uploaded file')
  }

  return uniqueVillages
}

const mergeUniqueVillageNames = (existingVillages, importedVillages) => {
  const uniqueVillages = []
  const seenVillages = new Set()

  existingVillages.forEach((village) => {
    const trimmedVillage = normalizeText(village)
    if (!trimmedVillage) {
      return
    }

    const villageKey = normalizeHierarchyKey(trimmedVillage)
    if (seenVillages.has(villageKey)) {
      return
    }

    seenVillages.add(villageKey)
    uniqueVillages.push(trimmedVillage)
  })

  let addedCount = 0

  importedVillages.forEach((village) => {
    const trimmedVillage = normalizeText(village)
    if (!trimmedVillage) {
      return
    }

    const villageKey = normalizeHierarchyKey(trimmedVillage)
    if (seenVillages.has(villageKey)) {
      return
    }

    seenVillages.add(villageKey)
    uniqueVillages.push(trimmedVillage)
    addedCount += 1
  })

  return {
    uniqueVillages,
    addedCount,
  }
}

const externalComplaintCards = [
  {
    id: 'private-leak-delete',
    titleEn: 'PRIVATE LEAK PHOTO COMPLAINT',
    titleHi: 'प्राइवेट लीक फोटो शिकायत',
    image: photoLeakComplaint,
    alt: 'Private leak photo complaint',
    url: 'https://stopncii.org/create-your-case/',
  },
  {
    id: 'stolen-phone',
    titleEn: 'STOLEN PHONE COMPLAINT',
    titleHi: 'चोरी हुआ फोन शिकायत',
    image: stolenPhoneComplaint,
    alt: 'Stolen phone complaint',
    url: 'https://ceir.sancharsaathi.gov.in/Request/CeirUserBlockRequestDirect.jsp',
  },
  {
    id: 'wrong-upi',
    titleEn: 'WRONG UPI COMPLAINT',
    titleHi: 'गलत यूपीआई शिकायत',
    image: wrongUpiComplaint,
    alt: 'Wrong UPI complaint',
    url: 'https://www.upihelp.npci.org.in/',
  },
  {
    id: 'women-help',
    titleEn: 'WOMEN HELP',
    titleHi: 'महिला सहायता',
    image: womenhelp,
    alt: 'Women help complaint',
    url: 'https://cybercrime.gov.in/Webform/Index.aspx',
  },
]

const complaintServiceCards = [
  {
    id: 'know-connections',
    image: checkConnectionsImage,
    alt: 'Know mobile connections in your name',
    titleEn: 'Know Mobile Connections in Your Name',
    titleHi: 'आपके नाम पर कितने सिम हैं',
    url: 'https://tafcop.sancharsaathi.gov.in/telecomUser/',
  },
  {
    id: 'block-lost-stolen-mobile',
    image: blockStolenPhoneImage,
    alt: 'Request for blocking lost or stolen mobile',
    titleEn: 'Request for blocking lost/stolen mobile',
    titleHi: 'गुम / चोरी हुए मोबाइल को ब्लॉक करने के लिए अनुरोध',
    url: 'https://ceir.sancharsaathi.gov.in/Request/CeirUserBlockRequestDirect.jsp',
  },
  {
    id: 'unblock-recovered-mobile',
    image: unblockRecoveredPhoneImage,
    alt: 'Request for un-blocking recovered or found mobile',
    titleEn: 'Request for un-blocking recovered/found mobile',
    titleHi: 'मोबाइल मिल जानें पर अनब्लॉक करें',
    url: 'https://ceir.sancharsaathi.gov.in/Request/CeirUserUnblockRequestDirect.jsp',
  },
  {
    id: 'know-handset-genuineness',
    image: handsetGenuinenessImage,
    alt: 'Know genuineness of your mobile handset',
    titleEn: 'Know Genuineness of Your Mobile Handset',
    titleHi: 'आपका मोबाइल चोरी का या डूबलीकेट तो नही देखें',
    url: 'https://ceir.sancharsaathi.gov.in/Device/SancharSaathiKym.jsp',
  },
  {
    id: 'check-request-status',
    image: statusCheckLostStolenPhoneImage,
    alt: 'Check lost/stolen mobile request status',
    titleEn: 'Check lost/stolen Mobile Request Status',
    titleHi: 'गुम / चोरी हुए मोबाइल अनुरोध स्थिति जांचें',
    url: 'https://ceir.sancharsaathi.gov.in/Request/CeirRequestStatus.jsp',
  },
  {
    id: 'report-international-call',
    image: reportInternationalCallImage,
    alt: 'Report incoming international call with Indian number',
    titleEn: 'Report Incoming International Call With Indian Number',
    titleHi: 'भारतीय नंबर के साथ आने वाली अंतरराष्ट्रीय कॉल की रिपोर्ट करें',
    url: 'https://sancharsaathi.gov.in/InternationalCall/ReportIntCall.jsp',
  },
  {
    id: 'other-services',
    image: learningCornerIcon,
    alt: 'Other services',
    titleEn: 'Other Services',
    titleHi: 'अन्य सेवाएं',
    actionLabelEn: 'Open Services',
    actionLabelHi: 'सेवाएं खोलें',
    actionType: 'section',
  },
]

const TRACK_COMPLAINT_URL = 'https://cybercrime.gov.in/Webform/chkackstatus.aspx'
const SUSPECT_LINKS = {
  suspectMobileEmail: 'https://cybercrime.gov.in/Webform/suspect_search_repository.aspx',
  suspectAppWebsite: 'https://cybercrime.gov.in/Webform/suspect_search_websites.aspx',
  reportToI4C: 'https://cybercrime.gov.in/Webform/cyber_suspect.aspx',
  reportAbuseSocialMedia: 'https://cybercrime.gov.in/Webform/report_abuse_social_media.aspx',
  tafcop: 'https://tafcop.sancharsaathi.gov.in/telecomUser/',
  gacAppeal: 'https://gac.gov.in/',
}

const complaintRedirectByType = {
  'women-anonymous': 'https://cybercrime.gov.in/Webform/Crime_ReportAnonymously.aspx',
  financial: 'https://cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx?rnt=5',
  other: 'https://cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx',
  'women-track': TRACK_COMPLAINT_URL,
}

const createInitialBankDetailsState = (user = {}, profile = {}) => ({
  bankAccountHolderName: profile.bankAccountHolderName || user.fullName || '',
  bankName: profile.bankName || '',
  bankAccountNumber: profile.bankAccountNumber || '',
  bankIfscCode: profile.bankIfscCode || '',
  bankBranchName: profile.bankBranchName || '',
  bankUpiId: profile.bankUpiId || '',
})

const getStoredBoolean = (key) => {
  if (typeof window === 'undefined') {
    return false
  }
  return window.localStorage.getItem(key) === 'true'
}

const getStoredJson = (key) => {
  if (typeof window === 'undefined') {
    return null
  }

  const value = window.localStorage.getItem(key)
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch (_error) {
    return null
  }
}

function SiteShell({ children }) {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobileCarouselView, setIsMobileCarouselView] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(max-width: 768px)').matches
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileComplaintMenuOpen, setMobileComplaintMenuOpen] = useState(false)
  const [mobileWomenSubmenuOpen, setMobileWomenSubmenuOpen] = useState(false)
  const [mobileReportMenuOpen, setMobileReportMenuOpen] = useState(false)
  const [mobileSuspectRepositoryOpen, setMobileSuspectRepositoryOpen] = useState(false)
  const [mobileReportSuspectOpen, setMobileReportSuspectOpen] = useState(false)
  const [mobileVolunteerMenuOpen, setMobileVolunteerMenuOpen] = useState(false)
  const [mobileLearningMenuOpen, setMobileLearningMenuOpen] = useState(false)
  const [selectedComplaintView, setSelectedComplaintView] = useState('')
  const [selectedVolunteerView, setSelectedVolunteerView] = useState('')
  const [selectedUtilityView, setSelectedUtilityView] = useState('')
  const [showOtherServicesSection, setShowOtherServicesSection] = useState(false)
  const [showComplaintIntroScreen, setShowComplaintIntroScreen] = useState(false)
  const [showComplaintAcceptScreen, setShowComplaintAcceptScreen] = useState(false)
  const [showAnonymousComplaintForm, setShowAnonymousComplaintForm] = useState(false)
  const [siteLanguage, setSiteLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'en'
    }

    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return storedLanguage === 'hi' ? 'hi' : 'en'
  })
  const siteLanguageRef = useRef(siteLanguage)
  const location = useLocation()
  const isHomepageRoute = location.pathname === '/'
  const isMemberOrBlockDashboard = location.pathname === '/block-dashboard'
    || location.pathname === '/member-dashboard'
    || location.pathname === '/admin'
    || location.pathname.startsWith('/volunteer-dashboard/')
  const complaintText = getComplaintCardText(siteLanguage)

  const bannerSlides = isMobileCarouselView ? [mobileCarouselOne, mobileCarouselTwo] : [carouselOne, carouselTwo]
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const onViewportChange = (event) => {
      setIsMobileCarouselView(event.matches)
    }

    setIsMobileCarouselView(mediaQuery.matches)
    mediaQuery.addEventListener('change', onViewportChange)

    return () => {
      mediaQuery.removeEventListener('change', onViewportChange)
    }
  }, [])

  useEffect(() => {
    siteLanguageRef.current = siteLanguage
  }, [siteLanguage])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const stopObserver = startHeaderLanguageObserver(() => siteLanguageRef.current)
    return () => {
      stopObserver()
    }
  }, [])

  useEffect(() => {
    if (!isHomepageRoute || typeof window === 'undefined') {
      return undefined
    }

    const stopObserver = startLanguageObserver(() => siteLanguageRef.current)
    return () => {
      stopObserver()
    }
  }, [isHomepageRoute])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, siteLanguage)
    window.document.documentElement.lang = siteLanguage

    applyLanguageToDocument(siteLanguage)
    applyLanguageToHeader(siteLanguage)
  }, [siteLanguage, isHomepageRoute, location.pathname])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    if (!menuOpen) {
      return undefined
    }

    const originalOverflow = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'

    return () => {
      window.document.body.style.overflow = originalOverflow
    }
  }, [menuOpen])

  const openExternalLink = (url) => {
    if (typeof window === 'undefined') {
      return
    }

    window.location.href = url
  }

  const handleComplaintSelect = (selection) => {
    if (!isHomepageRoute) {
      handleMobileNavClose()
      navigate('/', {
        state: {
          shellAction: {
            type: 'complaint',
            selection,
          },
        },
      })
      return
    }

    setSelectedComplaintView(selection)
    setSelectedVolunteerView('')
    setSelectedUtilityView('')
    setShowOtherServicesSection(false)
    setShowComplaintIntroScreen(false)
    setShowComplaintAcceptScreen(false)
    setShowAnonymousComplaintForm(false)
    setMenuOpen(false)
    setMobileComplaintMenuOpen(false)
    setMobileWomenSubmenuOpen(false)
    setMobileReportMenuOpen(false)
    setMobileSuspectRepositoryOpen(false)
    setMobileReportSuspectOpen(false)
    setMobileVolunteerMenuOpen(false)
    setMobileLearningMenuOpen(false)

    if (typeof window !== 'undefined') {
      const section = window.document.getElementById('complaint-render-body')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleVolunteerSelect = (selection) => {
    if (!isHomepageRoute) {
      handleMobileNavClose()
      navigate('/', {
        state: {
          shellAction: {
            type: 'volunteer',
            selection,
          },
        },
      })
      return
    }

    setSelectedVolunteerView(selection)
    setSelectedComplaintView('')
    setSelectedUtilityView('')
    setShowOtherServicesSection(false)
    setShowComplaintIntroScreen(false)
    setShowComplaintAcceptScreen(false)
    setShowAnonymousComplaintForm(false)
    setMenuOpen(false)
    setMobileComplaintMenuOpen(false)
    setMobileWomenSubmenuOpen(false)
    setMobileReportMenuOpen(false)
    setMobileSuspectRepositoryOpen(false)
    setMobileReportSuspectOpen(false)
    setMobileVolunteerMenuOpen(false)
    setMobileLearningMenuOpen(false)

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        let targetId = 'cyber-volunteer-concept'
        if (selection === 'terms') {
          targetId = 'cyber-volunteer-terms'
        } else if (selection === 'register') {
          targetId = 'cyber-volunteer-register'
        } else if (selection === 'unlawful-content') {
          targetId = 'cyber-volunteer-unlawful-content'
        }
        const section = window.document.getElementById(targetId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }

  const handleUtilitySelect = (selection) => {
    if (!isHomepageRoute) {
      handleMobileNavClose()
      navigate('/', {
        state: {
          shellAction: {
            type: 'utility',
            selection,
          },
        },
      })
      return
    }

    setSelectedUtilityView(selection)
    setSelectedComplaintView('')
    setSelectedVolunteerView('')
    setShowOtherServicesSection(false)
    setShowComplaintIntroScreen(false)
    setShowComplaintAcceptScreen(false)
    setShowAnonymousComplaintForm(false)
    setMenuOpen(false)
    setMobileComplaintMenuOpen(false)
    setMobileWomenSubmenuOpen(false)
    setMobileReportMenuOpen(false)
    setMobileSuspectRepositoryOpen(false)
    setMobileReportSuspectOpen(false)
    setMobileVolunteerMenuOpen(false)
    setMobileLearningMenuOpen(false)

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        let targetId = ''
        if (selection === 'faq') {
          targetId = 'faq-page'
        } else if (selection === 'contact') {
          targetId = 'contact-us-page'
        } else if (selection === 'cyber-awareness') {
          targetId = 'cyber-awareness-page'
        }
        if (!targetId) {
          return
        }
        const section = window.document.getElementById(targetId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }

  const handleComplaintCardAction = () => {
    setShowComplaintIntroScreen(true)
    setShowComplaintAcceptScreen(false)
    setShowAnonymousComplaintForm(false)
    setShowOtherServicesSection(false)

    if (typeof window !== 'undefined') {
      const section = window.document.getElementById('complaint-accept-screen')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleMobileNavClose = () => {
    setMenuOpen(false)
    setMobileComplaintMenuOpen(false)
    setMobileWomenSubmenuOpen(false)
    setMobileReportMenuOpen(false)
    setMobileSuspectRepositoryOpen(false)
    setMobileReportSuspectOpen(false)
    setMobileVolunteerMenuOpen(false)
    setMobileLearningMenuOpen(false)
  }

  const resetHomeViewState = () => {
    setSelectedComplaintView('')
    setSelectedVolunteerView('')
    setSelectedUtilityView('')
    setShowOtherServicesSection(false)
    setShowComplaintIntroScreen(false)
    setShowComplaintAcceptScreen(false)
    setShowAnonymousComplaintForm(false)
    handleMobileNavClose()
  }

  const handleOtherServicesOpen = () => {
    handleUtilitySelect('other-services')
  }

  const handleOtherServicesClose = () => {
    resetHomeViewState()
    navigate('/', { replace: true, state: {} })
  }

  const handleLanguageChange = (nextLanguage) => {
    const normalizedLanguage = nextLanguage === 'hi' ? 'hi' : 'en'

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage)
      window.document.documentElement.lang = normalizedLanguage
      window.location.reload()
      return
    }

    setSiteLanguage(normalizedLanguage)
  }

  useEffect(() => {
    if (!isHomepageRoute) {
      return
    }

    const shellAction = location.state?.shellAction
    if (!shellAction || !shellAction.type) {
      return
    }

    setSelectedComplaintView(shellAction.type === 'complaint' ? (shellAction.selection || '') : '')
    setSelectedVolunteerView(shellAction.type === 'volunteer' ? (shellAction.selection || '') : '')
    setSelectedUtilityView(shellAction.type === 'utility' ? (shellAction.selection || '') : '')
    setShowOtherServicesSection(false)
    setShowComplaintIntroScreen(false)
    setShowComplaintAcceptScreen(false)
    setShowAnonymousComplaintForm(false)
    handleMobileNavClose()

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        if (shellAction.type === 'volunteer') {
          let targetId = 'cyber-volunteer-concept'
          if (shellAction.selection === 'terms') {
            targetId = 'cyber-volunteer-terms'
          } else if (shellAction.selection === 'register') {
            targetId = 'cyber-volunteer-register'
          } else if (shellAction.selection === 'unlawful-content') {
            targetId = 'cyber-volunteer-unlawful-content'
          }
          const volunteerSection = window.document.getElementById(targetId)
          if (volunteerSection) {
            volunteerSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          return
        }

        if (shellAction.type === 'utility') {
          const targetId = shellAction.selection === 'faq'
            ? 'faq-page'
            : shellAction.selection === 'contact'
              ? 'contact-us-page'
              : shellAction.selection === 'cyber-awareness'
                ? 'cyber-awareness-page'
                : 'complaint-render-body'
          const utilitySection = window.document.getElementById(targetId)
          if (utilitySection) {
            utilitySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          return
        }

        const complaintSection = window.document.getElementById('complaint-render-body')
        if (complaintSection) {
          complaintSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }

    navigate('/', { replace: true, state: {} })
  }, [isHomepageRoute, location.state, navigate])

  return (
    <div className={`page-wrapper ${isMemberOrBlockDashboard ? 'member-block-dashboard-page' : ''}`}>
      <div className="gov-header">
        <div className="gov-ribbon">
          <div className="gov-text-section">
            <div className="gov-text-item">
              <span className="gov-text-hi first-text">साइबर अपराध जागरूकता</span>
              <span className="gov-text-en">Cyber Crime Awareness</span>
            </div>
            <div className="gov-separator"></div>
            <div className="gov-text-item">
              <span className="gov-text-hi">साइबर सुरक्षा कवच</span>
              <span className="gov-text-en">Cyber Shield India</span>
            </div>
          </div>

          <div className="gov-language">
            <span className="language-label">Lang.</span>
            <div className="language-icons">
              <button
                className={`lang-btn ${siteLanguage === 'en' ? 'active' : ''}`}
                title="English"
                type="button"
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </button>
              <button
                className={`lang-btn ${siteLanguage === 'hi' ? 'active' : ''}`}
                title="Hindi"
                type="button"
                onClick={() => handleLanguageChange('hi')}
              >
                HI
              </button>
            </div>
          </div>
        </div>
      </div>

      <header className="portal-header">
        <div className="logo-item">
          <Link to="/" className="logo-home-link" aria-label="Go to home" onClick={resetHomeViewState}>
            <img src={siteLogo} alt="Government Logo" className="header-logo emblem" />
          </Link>
        </div>
        <div className="gov-separator-2"></div>
        <div className="logo-item">
          <Link to="/" className="logo-home-link" aria-label="Go to home" onClick={resetHomeViewState}>
            <img src={i4c} alt="NIC Logo" className="header-logo i4c-logo" />
          </Link>
        </div>
        <div className="portal-title-container">
          <h1 className="portal-title-hi">साइबर क्राइम सुरक्षा संघ पोर्टल</h1>
          <h2 className="portal-title-en">Cyber Crime Suraksha Sangh Portal</h2>
        </div>
        <div className="logo-item">
          <Link to="/" className="logo-home-link" aria-label="Go to home" onClick={resetHomeViewState}>
            <img src={siteLogo} alt="Azadi Logo" className="header-logo" />
          </Link>
        </div>
      </header>

      <nav className="main-nav">
        <div className="nav-container">
          <Link
            to="/"
            className="nav-home"
            aria-label="Home"
            onClick={resetHomeViewState}
          >
            ⌂
          </Link>
          <div className="nav-item nav-complaint-dropdown">
            <button type="button" className="nav-complaint-trigger">
              Register a Complaint
              <span className="dropdown-arrow">▼</span>
            </button>

            <div className="nav-complaint-menu">
              <div className="nav-complaint-menu-item nav-complaint-has-submenu">
                <button type="button" onClick={() => handleComplaintSelect('women')}>
                  Women/Children Related Crime
                  <span className="dropdown-arrow">▶</span>
                </button>

                <div className="nav-complaint-submenu">
                  <button type="button" onClick={() => handleComplaintSelect('women-anonymous')}>
                    Register Anonymously
                  </button>
                  <button type="button" onClick={() => openExternalLink(TRACK_COMPLAINT_URL)}>
                    Register & Track
                  </button>
                </div>
              </div>

              <div className="nav-complaint-menu-item">
                <button type="button" onClick={() => handleComplaintSelect('financial')}>
                  Financial Fraud
                </button>
              </div>

              <div className="nav-complaint-menu-item">
                <button type="button" onClick={() => handleComplaintSelect('other')}>
                  Other Cyber Crime
                </button>
              </div>
            </div>
          </div>
          <a
            href={TRACK_COMPLAINT_URL}
            className="nav-item"
            onClick={(event) => {
              event.preventDefault()
              openExternalLink(TRACK_COMPLAINT_URL)
            }}
          >
            Track your Complaint
          </a>
          <div className="nav-item nav-report-dropdown">
            <button type="button" className="nav-report-trigger">
              Report & Check Suspect
              <span className="dropdown-arrow">▼</span>
            </button>

            <div className="nav-report-menu">
              <div className="nav-report-menu-item nav-report-has-submenu">
                <button type="button">
                  Suspect Repository
                  <span className="dropdown-arrow">▶</span>
                </button>
                <div className="nav-report-submenu">
                  <button type="button" onClick={() => openExternalLink(SUSPECT_LINKS.suspectMobileEmail)}>
                    Check Suspect (Mobile/Email etc)
                  </button>
                  <button type="button" onClick={() => openExternalLink(SUSPECT_LINKS.suspectAppWebsite)}>
                    Check Suspect (App/Website)
                  </button>
                </div>
              </div>

              <div className="nav-report-menu-item nav-report-has-submenu">
                <button type="button">
                  Report Suspect
                  <span className="dropdown-arrow">▶</span>
                </button>
                <div className="nav-report-submenu">
                  <button type="button" onClick={() => openExternalLink(SUSPECT_LINKS.reportToI4C)}>
                    Report Suspect to I4C
                  </button>
                  <button type="button" onClick={() => openExternalLink(SUSPECT_LINKS.reportAbuseSocialMedia)}>
                    Report Abuse to Social Media
                  </button>
                  <button type="button" onClick={() => openExternalLink(SUSPECT_LINKS.tafcop)}>
                    Know Your Mobile Connections - TAFCOP
                  </button>
                </div>
              </div>

              <div className="nav-report-menu-item">
                <button type="button" onClick={() => openExternalLink(SUSPECT_LINKS.gacAppeal)}>
                  File an Appeal with GAC
                </button>
              </div>
            </div>
          </div>
          <div className="nav-item nav-volunteer-dropdown">
            <button type="button" className="nav-volunteer-trigger">
              Cyber Volunteers
              <span className="dropdown-arrow">▼</span>
            </button>

            <div className="nav-volunteer-menu">
              <button
                type="button"
                className="nav-volunteer-option nav-volunteer-option-btn"
                onClick={() => handleVolunteerSelect('concept')}
              >
                Cyber Volunteer Concept
              </button>
              <button
                type="button"
                className="nav-volunteer-option nav-volunteer-option-btn"
                onClick={() => handleVolunteerSelect('terms')}
              >
                Terms &amp; Conditions
              </button>
              <button
                type="button"
                className="nav-volunteer-option nav-volunteer-option-btn"
                onClick={() => handleVolunteerSelect('register')}
              >
                Register as a volunteer
              </button>
              <button
                type="button"
                className="nav-volunteer-option nav-volunteer-option-btn"
                onClick={() => handleVolunteerSelect('unlawful-content')}
              >
                What is Unlawful Content
              </button>
            </div>
          </div>
          <div className="nav-item nav-learning-dropdown">
            <button type="button" className="nav-learning-trigger">
              Learning Corner
              <span className="dropdown-arrow">▼</span>
            </button>

            <div className="nav-learning-menu">
              <button
                type="button"
                className="nav-learning-option nav-learning-option-btn"
                onClick={() => handleUtilitySelect('faq')}
              >
                FAQ
              </button>
              <a href="https://cybercrime.gov.in/Webform/Advisory.aspx" className="nav-learning-option">Advisories</a>
              <a href="https://cybercrime.gov.in/Webform/Crime_OnlineSafetyTips.aspx" className="nav-learning-option">Cyber Safety Tips</a>
              <button
                type="button"
                className="nav-learning-option nav-learning-option-btn"
                onClick={() => handleUtilitySelect('cyber-awareness')}
              >
                Cyber Awareness
              </button>
              <div className="nav-learning-menu-item nav-learning-has-submenu">
                <button type="button" className="nav-learning-option nav-learning-option-btn nav-learning-submenu-trigger">
                  Media Gallery
                  <span className="dropdown-arrow">▶</span>
                </button>
                <div className="nav-learning-submenu">
                  <a href="https://cybercrime.gov.in/Webform/photoGallery.aspx" className="nav-learning-suboption">Photo Gallery</a>
                  <a href="https://cybercrime.gov.in/Webform/video-category.aspx" className="nav-learning-suboption">Video Gallery</a>
                  <a href="https://cybercrime.gov.in/Webform/radioGallery.aspx" className="nav-learning-suboption">Radio Jingles</a>
                </div>
              </div>
              <a href="https://cybercrime.gov.in/Webform/daily-digest.aspx" className="nav-learning-option">Daily Digest</a>
              <a href="https://cybercrime.gov.in/Webform/training-resource.aspx" className="nav-learning-option">Training Resources</a>
              <a href="https://www.nvaccess.org/download/" className="nav-learning-option">Screen Reader</a>
              <a href="https://cybercrime.gov.in/UploadMedia/PublicNotice.pdf" className="nav-learning-option">RTI Public Notices</a>
              <a href="https://cybercrime.gov.in/UploadMedia/PublicNotice_CPGRAMS.pdf" className="nav-learning-option">CPGRAMS Public Notices</a>
            </div>
          </div>
          <button type="button" className="nav-item nav-link-button" onClick={() => handleUtilitySelect('contact')}>
            Contact Us
          </button>
          <Link type="button" className="nav-admin-btn" to="/login">
            Admin Login
          </Link>
          <Link type="button" className="nav-block-btn" to="/block-login">
            Block Login
          </Link>
          <Link type="button" className="nav-member-btn" to="/member-login">
            Member Login
          </Link>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((open) => {
                const nextState = !open
                if (!nextState) {
                  setMobileComplaintMenuOpen(false)
                  setMobileWomenSubmenuOpen(false)
                  setMobileReportMenuOpen(false)
                  setMobileSuspectRepositoryOpen(false)
                  setMobileReportSuspectOpen(false)
                  setMobileVolunteerMenuOpen(false)
                  setMobileLearningMenuOpen(false)
                }
                return nextState
              })
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {menuOpen ? (
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label="Close mobile menu"
            onClick={handleMobileNavClose}
          />
        ) : null}

        <div className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-panel-header">
            <strong>Menu</strong>
            <button type="button" className="mobile-nav-close-btn" onClick={handleMobileNavClose} aria-label="Close menu">
              ×
            </button>
          </div>

          <Link to="/" onClick={handleMobileNavClose}>Home</Link>
          <button
            type="button"
            className="mobile-complaint-parent-btn"
            onClick={() => setMobileComplaintMenuOpen((open) => !open)}
            aria-expanded={mobileComplaintMenuOpen}
          >
            Register a Complaint
            <span className="mobile-chevron">{mobileComplaintMenuOpen ? '▲' : '▼'}</span>
          </button>

          {mobileComplaintMenuOpen ? (
            <div className="mobile-complaint-options">
              <button
                type="button"
                className="mobile-complaint-parent-btn mobile-suboption-toggle"
                onClick={() => setMobileWomenSubmenuOpen((open) => !open)}
                aria-expanded={mobileWomenSubmenuOpen}
              >
                Women/Children Related Crime
                <span className="mobile-chevron">{mobileWomenSubmenuOpen ? '▲' : '▼'}</span>
              </button>

              {mobileWomenSubmenuOpen ? (
                <div className="mobile-suboption-panel">
                  <button type="button" className="mobile-complaint-btn" onClick={() => handleComplaintSelect('women-anonymous')}>Register Anonymously</button>
                  <button type="button" className="mobile-complaint-btn" onClick={() => openExternalLink(TRACK_COMPLAINT_URL)}>Register & Track</button>
                </div>
              ) : null}

              <button type="button" className="mobile-complaint-btn" onClick={() => handleComplaintSelect('financial')}>Financial Fraud</button>
              <button type="button" className="mobile-complaint-btn" onClick={() => handleComplaintSelect('other')}>Other Cyber Crime</button>
            </div>
          ) : null}

          <button
            type="button"
            className="mobile-complaint-parent-btn"
            onClick={() => setMobileReportMenuOpen((open) => !open)}
            aria-expanded={mobileReportMenuOpen}
          >
            Report &amp; Check Suspect
            <span className="mobile-chevron">{mobileReportMenuOpen ? '▲' : '▼'}</span>
          </button>

          {mobileReportMenuOpen ? (
            <div className="mobile-complaint-options">
              <button
                type="button"
                className="mobile-complaint-parent-btn mobile-suboption-toggle"
                onClick={() => setMobileSuspectRepositoryOpen((open) => !open)}
                aria-expanded={mobileSuspectRepositoryOpen}
              >
                Suspect Repository
                <span className="mobile-chevron">{mobileSuspectRepositoryOpen ? '▲' : '▼'}</span>
              </button>

              {mobileSuspectRepositoryOpen ? (
                <div className="mobile-suboption-panel">
                  <button type="button" className="mobile-complaint-btn" onClick={() => openExternalLink(SUSPECT_LINKS.suspectMobileEmail)}>Check Suspect (Mobile/Email etc)</button>
                  <button type="button" className="mobile-complaint-btn" onClick={() => openExternalLink(SUSPECT_LINKS.suspectAppWebsite)}>Check Suspect (App/Website)</button>
                </div>
              ) : null}

              <button
                type="button"
                className="mobile-complaint-parent-btn mobile-suboption-toggle"
                onClick={() => setMobileReportSuspectOpen((open) => !open)}
                aria-expanded={mobileReportSuspectOpen}
              >
                Report Suspect
                <span className="mobile-chevron">{mobileReportSuspectOpen ? '▲' : '▼'}</span>
              </button>

              {mobileReportSuspectOpen ? (
                <div className="mobile-suboption-panel">
                  <button type="button" className="mobile-complaint-btn" onClick={() => openExternalLink(SUSPECT_LINKS.reportToI4C)}>Report Suspect to I4C</button>
                  <button type="button" className="mobile-complaint-btn" onClick={() => openExternalLink(SUSPECT_LINKS.reportAbuseSocialMedia)}>Report Abuse to Social Media</button>
                  <button type="button" className="mobile-complaint-btn" onClick={() => openExternalLink(SUSPECT_LINKS.tafcop)}>Know Your Mobile Connections - TAFCOP</button>
                </div>
              ) : null}

              <button type="button" className="mobile-complaint-btn" onClick={() => openExternalLink(SUSPECT_LINKS.gacAppeal)}>File an Appeal with GAC</button>
            </div>
          ) : null}

          <button
            type="button"
            className="mobile-complaint-parent-btn"
            onClick={() => setMobileVolunteerMenuOpen((open) => !open)}
            aria-expanded={mobileVolunteerMenuOpen}
          >
            Cyber Volunteers
            <span className="mobile-chevron">{mobileVolunteerMenuOpen ? '▲' : '▼'}</span>
          </button>

          {mobileVolunteerMenuOpen ? (
            <div className="mobile-suboption-panel mobile-volunteer-panel">
              <button type="button" onClick={() => handleVolunteerSelect('concept')}>Cyber Volunteer Concept</button>
              <button type="button" onClick={() => handleVolunteerSelect('terms')}>Terms &amp; Conditions</button>
              <button type="button" onClick={() => handleVolunteerSelect('register')}>Register as a volunteer</button>
              <button type="button" onClick={() => handleVolunteerSelect('unlawful-content')}>What is Unlawful Content</button>
            </div>
          ) : null}

          <button
            type="button"
            className="mobile-complaint-parent-btn"
            onClick={() => setMobileLearningMenuOpen((open) => !open)}
            aria-expanded={mobileLearningMenuOpen}
          >
            Learning Corner
            <span className="mobile-chevron">{mobileLearningMenuOpen ? '▲' : '▼'}</span>
          </button>

          {mobileLearningMenuOpen ? (
            <div className="mobile-suboption-panel mobile-learning-panel">
              <button type="button" onClick={() => handleUtilitySelect('faq')}>FAQ</button>
              <a href="https://cybercrime.gov.in/Webform/Advisory.aspx" onClick={handleMobileNavClose}>Advisories</a>
              <a href="https://cybercrime.gov.in/Webform/Crime_OnlineSafetyTips.aspx" onClick={handleMobileNavClose}>Cyber Safety Tips</a>
              <button type="button" onClick={() => handleUtilitySelect('cyber-awareness')}>Cyber Awareness</button>
              <div className="mobile-learning-gallery-group">
                <span className="mobile-learning-gallery-title">Media Gallery</span>
                <a href="https://cybercrime.gov.in/Webform/photoGallery.aspx" onClick={handleMobileNavClose}>Photo Gallery</a>
                <a href="https://cybercrime.gov.in/Webform/video-category.aspx" onClick={handleMobileNavClose}>Video Gallery</a>
                <a href="https://cybercrime.gov.in/Webform/radioGallery.aspx" onClick={handleMobileNavClose}>Radio Jingles</a>
              </div>
              <a href="https://cybercrime.gov.in/Webform/daily-digest.aspx" onClick={handleMobileNavClose}>Daily Digest</a>
              <a href="https://cybercrime.gov.in/Webform/training-resource.aspx" onClick={handleMobileNavClose}>Training Resources</a>
              <a href="https://www.nvaccess.org/download/" onClick={handleMobileNavClose}>Screen Reader</a>
              <a href="https://cybercrime.gov.in/UploadMedia/PublicNotice.pdf" onClick={handleMobileNavClose}>RTI Public Notices</a>
              <a href="https://cybercrime.gov.in/UploadMedia/PublicNotice_CPGRAMS.pdf" onClick={handleMobileNavClose}>CPGRAMS Public Notices</a>
            </div>
          ) : null}

          <a
            href={TRACK_COMPLAINT_URL}
            onClick={(event) => {
              event.preventDefault()
              openExternalLink(TRACK_COMPLAINT_URL)
            }}
          >
            Track your Complaint
          </a>
          <button type="button" className="mobile-nav-link-btn" onClick={() => handleUtilitySelect('contact')}>Contact Us</button>
          {/* <Link
            to="/login"
            className="mobile-admin-btn"
            onClick={handleMobileNavClose}
          >
            Admin Login
          </Link> */}
          <Link
            to="/block-login"
            className="mobile-block-btn"
            onClick={handleMobileNavClose}
          >
            Block Login
          </Link>
          <Link
            to="/member-login"
            className="mobile-member-btn"
            onClick={handleMobileNavClose}
          >
            Member Login
          </Link>
        </div>
      </nav>

      {location.pathname === '/' && selectedVolunteerView === 'concept' ? (
        <CyberVolunteerConceptPage />
      ) : location.pathname === '/' && selectedVolunteerView === 'terms' ? (
        <VolunteerTermsConditionsScreen />
      ) : location.pathname === '/' && selectedVolunteerView === 'register' ? (
        <VolunteerRegisterScreen />
      ) : location.pathname === '/' && selectedVolunteerView === 'unlawful-content' ? (
        <VolunteerUnlawfulContentScreen />
      ) : location.pathname === '/' && selectedUtilityView === 'faq' ? (
        <FaqScreen />
      ) : location.pathname === '/' && selectedUtilityView === 'cyber-awareness' ? (
        <CyberAwarenessScreen />
      ) : location.pathname === '/' && selectedUtilityView === 'other-services' ? (
        <OtherServicesSection siteLanguage={siteLanguage} onClose={handleOtherServicesClose} />
      ) : location.pathname === '/' && selectedUtilityView === 'contact' ? (
        <ContactUsScreen />
      ) : location.pathname === '/' && showAnonymousComplaintForm && selectedComplaintView === 'women-anonymous' ? (
        <ComplaintAnonymousFormScreen />
      ) : location.pathname === '/' && showComplaintAcceptScreen ? (
        <ComplaintAcceptScreen
          onAccept={() => {
            setShowComplaintAcceptScreen(false)
            const redirectUrl = complaintRedirectByType[selectedComplaintView]

            if (redirectUrl && typeof window !== 'undefined') {
              window.location.href = redirectUrl
              return
            }

            if (selectedComplaintView === 'women-anonymous') {
              setShowAnonymousComplaintForm(true)
            }
          }}
        />
      ) : location.pathname === '/' && showComplaintIntroScreen ? (
        <ComplaintIntroScreen
          onFileComplaint={() => {
            setShowComplaintIntroScreen(false)
            setShowComplaintAcceptScreen(true)
          }}
        />
      ) : location.pathname === '/' && selectedComplaintView ? (
        <ComplaintCardsBody
          onComplaintSelect={handleComplaintSelect}
          onComplaintAction={handleComplaintCardAction}
          onTrackComplaint={() => openExternalLink(TRACK_COMPLAINT_URL)}
          onOpenOtherServices={handleOtherServicesOpen}
          showOtherServicesSection={showOtherServicesSection}
          onCloseOtherServices={handleOtherServicesClose}
          siteLanguage={siteLanguage}
        />
      ) : (
        children({
          currentSlide,
          nextSlide,
          prevSlide,
          bannerSlides,
          onComplaintSelect: handleComplaintSelect,
          onComplaintAction: handleComplaintCardAction,
          onTrackComplaint: () => openExternalLink(TRACK_COMPLAINT_URL),
          onOpenOtherServices: handleOtherServicesOpen,
          showOtherServicesSection,
          onCloseOtherServices: handleOtherServicesClose,
          siteLanguage,
        })
      )}

      <footer className="site-footer">
        <div className="site-footer-top">
          <div className="site-footer-links" role="list" aria-label="Footer quick links">
            <a href="https://cybercrime.gov.in/Webform/Feedback.aspx" target="_blank" rel="noopener noreferrer">Feedback</a>
            <a href="#faq" onClick={(event) => { event.preventDefault(); handleUtilitySelect('faq') }}>FAQ</a>
            <button type="button" className="footer-link-button" onClick={() => handleUtilitySelect('contact')}>Contact Us</button>
            <a href="https://cybercrime.gov.in/Webform/Wbsitepolice.aspx" target="_blank" rel="noopener noreferrer">Website Policies</a>
            <a href="https://cybercrime.gov.in/Webform/privacy_policy.aspx" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <a href="https://cybercrime.gov.in/Webform/Disclaimer.aspx" target="_blank" rel="noopener noreferrer">Disclaimer</a>
          </div>

          <div className="site-footer-social" aria-label="Social media links">
            <a href="https://twitter.com/CyberDost" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="X">X</a>
            <a href="https://www.facebook.com/cyberdosti4c" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">f</a>
            <a href="https://www.youtube.com/@cyberdost" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">▶</a>
            <a href="https://www.instagram.com/cyberdosti4c" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">◎</a>
            <a href="https://t.me/cyberdosti4c" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Telegram">✈</a>
            <a href="https://www.linkedin.com/company/indian-cyber-crime-coordination-centre/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">in</a>
          </div>
        </div>

        <div className="site-footer-bottom">
          {complaintText.footerText}
        </div>
      </footer>
    </div>
  )
}

function CyberVolunteerConceptPage() {
  return (
    <section id="cyber-volunteer-concept" className="volunteer-concept-wrap">
      <div className="volunteer-concept-panel">
        <h2>Cyber Crime Volunteers Concept</h2>

        <p>
          Indian Cyber Crime Coordination Centre (I4C) has been established under Ministry of Home
          Affairs (MHA) to act as a nodal point at National level in the fight against cybercrime. It
          aims to provide a platform to deal with cybercrimes in a coordinated and comprehensive
          manner. One of the important objectives of I4C is to create ecosystem that brings together
          academia, industry, public and government in prevention, detection, investigation and
          prosecution of cybercrimes.
        </p>

        <p>
          I4C has envisaged the Cyber Crime Volunteers Program to bring together citizens with
          passion to serve the nation on a single platform and contribute in fight against cybercrime
          in the country.
        </p>

        <p>
          Good Samaritans are welcome to register as Cyber Crime Volunteers in the role of Unlawful
          Content Flaggers for facilitating law enforcement agencies in identifying, reporting and
          removal of illegal or unlawful online content.
        </p>

        <p>
          We also welcome individuals who are willing to volunteer in any other area that can help in
          fighting cybercrime. The applications shall be received directly by the State Nodal and they
          shall contact the applicants on an as-needed basis.
        </p>
      </div>
    </section>
  )
}

const getComplaintCardText = (siteLanguage) => ({
  womenTitle: siteLanguage === 'hi' ? 'महिला/बाल संबंधित अपराध' : 'Women/Children Related Crime',
  womenAnonymous: siteLanguage === 'hi' ? 'गुमनाम रूप से शिकायत दर्ज करें' : 'Register Anonymously',
  womenTrack: siteLanguage === 'hi' ? 'रजिस्टर और ट्रैक करें' : 'Register and Track',
  financialTitle: siteLanguage === 'hi' ? 'वित्तीय धोखाधड़ी' : 'FINANCIAL FRAUD',
  registerComplaint: siteLanguage === 'hi' ? 'शिकायत दर्ज करें' : 'Register a Complaint',
  otherTitle: siteLanguage === 'hi' ? 'अन्य साइबर अपराध' : 'OTHER CYBER CRIME',
  externalRegister: siteLanguage === 'hi' ? 'शिकायत दर्ज करें' : 'Register a Complaint',
  whatsNew: siteLanguage === 'hi' ? 'नया अपडेट' : "What's New",
  learningCorner: siteLanguage === 'hi' ? 'लर्निंग कॉर्नर' : 'Learning Corner',
  footerText: siteLanguage === 'hi'
    ? 'वेबसाइट सामग्री साइबर क्राइम सुरक्षा संघ टेक टीम द्वारा प्रबंधित। Mozilla Firefox, Google Chrome पर सर्वोत्तम दृश्य।'
    : 'Website Content Managed by Cyber Crime Suraksha Sangh Tech Team. Best viewed in Mozilla Firefox, Google Chrome.',
})

const getComplaintServiceText = (siteLanguage) => ({
  sectionTitle: siteLanguage === 'hi' ? 'मोबाइल शिकायत सेवाएं' : 'Mobile Complaint Services',
  sectionSubtitle: siteLanguage === 'hi'
    ? 'भाषा चयन के अनुसार सही सेवा चुनें और आधिकारिक पोर्टल पर जाएं।'
    : 'Choose the right service and open the official portal directly.',
  visitLabel: siteLanguage === 'hi' ? 'सेवा पर जाएं' : 'Visit Service',
})

const getLearningCornerText = (siteLanguage) => ({
  heading: siteLanguage === 'hi' ? 'लर्निंग कॉर्नर' : 'Learning Corner',
  cards: siteLanguage === 'hi'
    ? [
      {
        title: 'नागरिक मैनुअल',
        description: 'यह दस्तावेज़ साइबर क्राइम पोर्टल पर नागरिकों को उपलब्ध सुविधाओं और शिकायत दर्ज करने की प्रक्रिया को समझाता है।',
      },
      {
        title: 'साइबर सुरक्षा सुझाव',
        description: 'ऑनलाइन दुनिया में सुरक्षित रहने के लिए साइबर सुरक्षा प्रथाओं का पालन करना जरूरी है, जिससे हम अपने और अपने परिवार को खतरों से बचा सकें।',
      },
      {
        title: 'साइबर जागरूकता',
        description: 'साइबर जागरूकता कर्मचारियों और नागरिकों को साइबर खतरों तथा डिजिटल सेवाओं के जिम्मेदारी से उपयोग के बारे में शिक्षित करने की एक सतत प्रक्रिया है।',
      },
      {
        title: 'डेली डाइजेस्ट',
        description: 'यह दस्तावेज़ कर्मचारियों और नागरिकों को साइबर धोखाधड़ी की कार्यप्रणाली और नियमित साइबर सुरक्षा सलाह के बारे में जागरूक करने के लिए तैयार किया गया है।',
      },
    ]
    : [
      {
        title: 'CITIZEN MANUAL',
        description: 'It is a document to describe the functionalities and workflow that is provided to citizens on the cybercrime portal for reporting cybercrimes.',
      },
      {
        title: 'CYBER SAFETY TIPS',
        description: 'To stay safe in the online world, it is important to follow cyber safety practices which may help in protecting ourselves and our families from imminent threats.',
      },
      {
        title: 'CYBER AWARENESS',
        description: 'Cyber awareness is an ongoing process of educating employees and citizens about threats in cyberspace and how to act responsibly while using digital services.',
      },
      {
        title: 'DAILY DIGEST',
        description: 'Comprehensive document prepared to aware employees and citizens about cyber fraud modus operandi and regular cyber safety advisories.',
      },
    ],
  readMore: siteLanguage === 'hi' ? 'और पढ़ें' : 'Read More',
})

function ComplaintServiceSection({ siteLanguage, onOpenOtherServices }) {
  const { sectionTitle, sectionSubtitle, visitLabel } = getComplaintServiceText(siteLanguage)

  return (
    <section id="complaint-service-section" className="complaint-service-section">
      <div className="complaint-service-header">
        <h2>{sectionTitle}</h2>
        {/* <p>{sectionSubtitle}</p> */}
      </div>
      <div className="complaint-service-grid">
        {complaintServiceCards.map((card) => (
          <article className="card complaint-card complaint-service-card" key={card.id}>
            <img src={card.image} alt={card.alt} className="complaint-image" />
            <div className="complaint-body complaint-service-body">
              <h3>{siteLanguage === 'hi' ? card.titleHi : card.titleEn}</h3>
              <div className="card-actions">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => {
                    if (card.actionType === 'section') {
                      onOpenOtherServices()
                      return
                    }

                    window.open(card.url, '_blank', 'noopener,noreferrer')
                  }}
                >
                  {siteLanguage === 'hi' ? (card.actionLabelHi || visitLabel) : (card.actionLabelEn || visitLabel)}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ComplaintCardsBody({
  onComplaintSelect,
  onComplaintAction,
  onTrackComplaint,
  onOpenOtherServices,
  siteLanguage,
}) {
  const complaintText = getComplaintCardText(siteLanguage)

  return (
    <section id="complaint-render-body" className="complaint-render-wrap">
      <div className="complaint-render-grid">
        <article className="card complaint-card">
          <img src={womenChildrenCrime} alt="Women and Children Related Crime" className="complaint-image" />
          <div className="complaint-body">
            <h3>{complaintText.womenTitle}</h3>
            <div className="card-actions two-actions">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => {
                    onComplaintSelect('women-anonymous')
                    onComplaintAction()
                  }}
                >
                    {complaintText.womenAnonymous}
                </button>
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={onTrackComplaint}
                >
                    {complaintText.womenTrack}
                </button>
            </div>
          </div>
        </article>

        <article className="card complaint-card">
          <img src={financialFraud} alt="Financial Fraud" className="complaint-image" />
          <div className="complaint-body">
            <h3>{complaintText.financialTitle}</h3>
            <div className="card-actions">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => {
                    onComplaintSelect('financial')
                    onComplaintAction()
                  }}
                >
                    {complaintText.registerComplaint}
                </button>
            </div>
          </div>
        </article>

        <article className="card complaint-card">
          <img src={otherCyberCrime} alt="Other Cyber Crime" className="complaint-image" />
          <div className="complaint-body">
            <h3>{complaintText.otherTitle}</h3>
            <div className="card-actions">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => {
                    onComplaintSelect('other')
                    onComplaintAction()
                  }}
                >
                    {complaintText.registerComplaint}
                </button>
            </div>
          </div>
        </article>

        {externalComplaintCards.map((card) => (
          <article className="card complaint-card" key={card.id}>
            <img src={card.image} alt={card.alt} className="complaint-image" />
            <div className="complaint-body">
              <h3>{siteLanguage === 'hi' ? card.titleHi : card.titleEn}</h3>
              <div className="card-actions">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => {
                    window.open(card.url, '_blank', 'noopener,noreferrer')
                  }}
                >
                  {complaintText.externalRegister}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ComplaintServiceSection siteLanguage={siteLanguage} onOpenOtherServices={onOpenOtherServices} />
    </section>
  )
}

function HomePage({
  currentSlide,
  nextSlide,
  prevSlide,
  bannerSlides,
  onComplaintSelect,
  onComplaintAction,
  onTrackComplaint,
  onOpenOtherServices,
  showOtherServicesSection,
  onCloseOtherServices,
  siteLanguage,
}) {
  const complaintText = getComplaintCardText(siteLanguage)
  const learningText = getLearningCornerText(siteLanguage)

  return (
    <>
      <section className="banner-carousel">
        <button className="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous" type="button">
          ‹
        </button>

        <div className="banner-content">
          <img
            key={currentSlide}
            src={bannerSlides[currentSlide]}
            alt={`Carousel slide ${currentSlide + 1}`}
            className="banner-slide-image"
          />
        </div>

        <button className="carousel-btn next-btn" onClick={nextSlide} aria-label="Next" type="button">
          ›
        </button>
      </section>

      <section className="content-cards">
        <article className="card complaint-card">
          <img src={womenChildrenCrime} alt="Women and Children Related Crime" className="complaint-image" />
          <div className="complaint-body">
            <h3>{complaintText.womenTitle}</h3>
            <div className="card-actions two-actions">
              <button
                type="button"
                className="card-action-btn"
                onClick={() => {
                  onComplaintSelect('women-anonymous')
                  onComplaintAction()
                }}
              >
                {complaintText.womenAnonymous}
              </button>
              <button
                type="button"
                className="card-action-btn"
                onClick={onTrackComplaint}
              >
                {complaintText.womenTrack}
              </button>
            </div>
          </div>
        </article>

        <article className="card complaint-card">
          <img src={financialFraud} alt="Financial Fraud" className="complaint-image" />
          <div className="complaint-body">
            <h3>{complaintText.financialTitle}</h3>
            <div className="card-actions">
              <button
                type="button"
                className="card-action-btn"
                onClick={() => {
                  onComplaintSelect('financial')
                  onComplaintAction()
                }}
              >
                {complaintText.registerComplaint}
              </button>
            </div>
          </div>
        </article>

        <article className="card complaint-card">
          <img src={otherCyberCrime} alt="Other Cyber Crime" className="complaint-image" />
          <div className="complaint-body">
            <h3>{complaintText.otherTitle}</h3>
            <div className="card-actions">
              <button
                type="button"
                className="card-action-btn"
                onClick={() => {
                  onComplaintSelect('other')
                  onComplaintAction()
                }}
              >
                {complaintText.registerComplaint}
              </button>
            </div>
          </div>
        </article>

        {externalComplaintCards.map((card) => (
          <article className="card complaint-card" key={card.id}>
            <img src={card.image} alt={card.alt} className="complaint-image" />
            <div className="complaint-body">
              <h3>{siteLanguage === 'hi' ? card.titleHi : card.titleEn}</h3>
              <div className="card-actions">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => {
                    window.open(card.url, '_blank', 'noopener,noreferrer')
                  }}
                >
                  {complaintText.externalRegister}
                </button>
              </div>
            </div>
          </article>
        ))}

        <aside className="card whats-new-card">
          <div className="whats-new-title">{complaintText.whatsNew}</div>
          <div className="whats-new-ticker">
            <ul className="ticker-track">
              <li><a href="#">Safety advisory for digital payment fraud cases</a></li>
              <li><a href="#">New awareness guide for women and children safety online</a></li>
              <li><a href="#">How to report social media harassment quickly</a></li>
              <li><a href="#">Helpline support expanded for cyber financial fraud victims</a></li>
              <li><a href="#">Best practices for secure UPI and banking usage</a></li>
              <li><a href="#">Citizen volunteer registration open now</a></li>
              <li><a href="#">Safety advisory for digital payment fraud cases</a></li>
              <li><a href="#">New awareness guide for women and children safety online</a></li>
              <li><a href="#">How to report social media harassment quickly</a></li>
              <li><a href="#">Helpline support expanded for cyber financial fraud victims</a></li>
              <li><a href="#">Best practices for secure UPI and banking usage</a></li>
              <li><a href="#">Citizen volunteer registration open now</a></li>
            </ul>
          </div>
        </aside>
      </section>

      <ComplaintServiceSection siteLanguage={siteLanguage} onOpenOtherServices={onOpenOtherServices} />

      <section className="learning-corner" id="learning">
        <div className="learning-heading">
          <img src={learningCornerIcon} alt="Learning Corner" className="learning-heading-icon" />
          <h2>{complaintText.learningCorner}</h2>
        </div>
        <div className="learning-grid">
          <article className="learning-card">
            <img src={citizenManual} alt="Citizen Manual" className="learning-icon" />
            <h3>{learningText.cards[0].title}</h3>
            <p>{learningText.cards[0].description}</p>
            <a href="https://cybercrime.gov.in/Webform/Citizen_Manual.aspx" className="learning-readmore">{learningText.readMore}</a>
          </article>

          <article className="learning-card">
            <img src={cyberSafety} alt="Cyber Safety Tips" className="learning-icon" />
            <h3>{learningText.cards[1].title}</h3>
            <p>{learningText.cards[1].description}</p>
            <a href="https://cybercrime.gov.in/Webform/Crime_OnlineSafetyTips.aspx" className="learning-readmore">{learningText.readMore}</a>
          </article>

          <article className="learning-card">
            <img src={cyberAwareness} alt="Cyber Awareness" className="learning-icon" />
            <h3>{learningText.cards[2].title}</h3>
            <p>{learningText.cards[2].description}</p>
            <a href="https://cybercrime.gov.in/Webform/CyberAware.aspx" className="learning-readmore">{learningText.readMore}</a>
          </article>

          <article className="learning-card">
            <img src={dailyDigest} alt="Daily Digest" className="learning-icon" />
            <h3>{learningText.cards[3].title}</h3>
            <p>{learningText.cards[3].description}</p>
            <a href="https://cybercrime.gov.in/Webform/daily-digest.aspx" className="learning-readmore">{learningText.readMore}</a>
          </article>
        </div>
      </section>
    </>
  )
}

function AdminPage({ onLogout }) {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [mobileDashboardMenuOpen, setMobileDashboardMenuOpen] = useState(false)
  const [districtName, setDistrictName] = useState(MORADABAD_DISTRICT_NAME)
  const [tehsilInputs, setTehsilInputs] = useState([])
  const [currentTehsilInput, setCurrentTehsilInput] = useState('')
  const [selectedTehsilForBlock, setSelectedTehsilForBlock] = useState('')
  const [blockEntries, setBlockEntries] = useState([])
  const [currentBlockInput, setCurrentBlockInput] = useState('')
  const [selectedBlockForVillage, setSelectedBlockForVillage] = useState('')
  const [currentVillageInput, setCurrentVillageInput] = useState('')
  const [villageEntries, setVillageEntries] = useState([])
  const [importingVillageTargetId, setImportingVillageTargetId] = useState('')
  const [adminMessage, setAdminMessage] = useState('')
  const [adminError, setAdminError] = useState('')
  const [savingBlock, setSavingBlock] = useState(false)
  const [loadingBlocks, setLoadingBlocks] = useState(false)
  const [savedBlocks, setSavedBlocks] = useState([])
  const [deletingBlockId, setDeletingBlockId] = useState('')
  const [expandedSavedBlockId, setExpandedSavedBlockId] = useState('')
  const [savedBlockDrafts, setSavedBlockDrafts] = useState({})
  const [savingEditedBlockId, setSavingEditedBlockId] = useState('')
  const [loadingManagement, setLoadingManagement] = useState(false)
  const [memberRecords, setMemberRecords] = useState([])
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [volunteerRecords, setVolunteerRecords] = useState([])
  const [selectedPendingApprovalMemberId, setSelectedPendingApprovalMemberId] = useState('')
  const [selectedVolunteerRecordId, setSelectedVolunteerRecordId] = useState('')
  const [editedWallets, setEditedWallets] = useState({})
  const [editedPasswords, setEditedPasswords] = useState({})
  const [editedVolunteerPasswords, setEditedVolunteerPasswords] = useState({})
  const [updatingWalletMemberId, setUpdatingWalletMemberId] = useState('')
  const [updatingPasswordMemberId, setUpdatingPasswordMemberId] = useState('')
  const [updatingVolunteerPasswordId, setUpdatingVolunteerPasswordId] = useState('')
  const [approvingMemberId, setApprovingMemberId] = useState('')
  const [deletingMemberId, setDeletingMemberId] = useState('')
  const [deletingVolunteerId, setDeletingVolunteerId] = useState('')
  const [selectedMemberId, setSelectedMemberId] = useState('')
  const [selectedRegisteredUserId, setSelectedRegisteredUserId] = useState('')
  const [managementSearch, setManagementSearch] = useState('')
  const [managementSectionOpen, setManagementSectionOpen] = useState({
    members: false,
    advisors: false,
    coordinators: false,
    proMedia: false,
    teamLeaders: false,
    registeredUsers: false,
  })
  const [loadingRewardSettings, setLoadingRewardSettings] = useState(false)
  const [savingRewardSettings, setSavingRewardSettings] = useState(false)
  const [loadingWithdrawalRequests, setLoadingWithdrawalRequests] = useState(false)
  const [withdrawalRequests, setWithdrawalRequests] = useState([])
  const [approvingWithdrawalRequestId, setApprovingWithdrawalRequestId] = useState('')
  const [rejectingWithdrawalRequestId, setRejectingWithdrawalRequestId] = useState('')
  const [deletingWithdrawalRequestId, setDeletingWithdrawalRequestId] = useState('')
  const [selectedWithdrawalRequestId, setSelectedWithdrawalRequestId] = useState('')
  const [loadingWalletHistory, setLoadingWalletHistory] = useState(false)
  const [walletHistoryUsers, setWalletHistoryUsers] = useState([])
  const [selectedWalletHistoryMemberId, setSelectedWalletHistoryMemberId] = useState('')
  const [walletHistorySearch, setWalletHistorySearch] = useState('')
  const [selectedWalletHistoryTransactionIdsByMember, setSelectedWalletHistoryTransactionIdsByMember] = useState({})
  const [deletingWalletHistoryEntries, setDeletingWalletHistoryEntries] = useState(false)
  const [loadingCardSubmissions, setLoadingCardSubmissions] = useState(false)
  const [cardSubmissionUsers, setCardSubmissionUsers] = useState([])
  const [selectedCardSubmissionMemberId, setSelectedCardSubmissionMemberId] = useState('')
  const [cardSubmissionSearch, setCardSubmissionSearch] = useState('')
  const [selectedCardSubmissionIdsByMember, setSelectedCardSubmissionIdsByMember] = useState({})
  const [deletingCardSubmissionEntries, setDeletingCardSubmissionEntries] = useState(false)
  const [rewardSectionOpen, setRewardSectionOpen] = useState({
    blockFlow: false,
    memberFlow: false,
    teamLeaderFlow: false,
  })
  const [rewardSettings, setRewardSettings] = useState({
    directReferralForVcap: '50',
    blockVillageCoordinatorBonus: '20',
    blockVillageAdvisorBonus: '20',
    blockVillageProMediaBonus: '10',
    directReferralForMemberToMember: '40',
    memberVillageCoordinatorBonus: '15',
    memberVillageAdvisorBonus: '15',
    memberVillageProMediaBonus: '15',
    teamLeaderDirectReferral: '50',
    teamLeaderVillageCoordinatorBonus: '15',
    teamLeaderVillageAdvisorBonus: '15',
    teamLeaderVillageProMediaBonus: '15',
    teamLeaderUpgradeRegistrationCount: '2',
  })
  const indianStates = useMemo(() => State.getStatesOfCountry(INDIA_CODE), [])

  const fetchBlocks = async () => {
    setLoadingBlocks(true)
    setAdminError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blocks`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch block data')
      }

      setSavedBlocks(data.data || [])
    } catch (error) {
      setAdminError(error.message || 'Failed to fetch block data')
    } finally {
      setLoadingBlocks(false)
    }
  }

  const fetchManagementData = async () => {
    setLoadingManagement(true)
    setAdminError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/management`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch management data')
      }

      const members = data.data?.members || []
      setMemberRecords(members)
      setSelectedPendingApprovalMemberId((previousId) => (
        members.some((member) => member._id === previousId) ? previousId : ''
      ))
      const approverMembers = members.filter((member) => ['technical advisor', 'village coordinator', 'member', 'team leader'].includes(member.role))
      setSelectedMemberId((previousId) => (
        approverMembers.some((member) => member._id === previousId) ? previousId : (approverMembers[0]?._id || '')
      ))

      const users = data.data?.users || []
      setRegisteredUsers(users)
      setSelectedRegisteredUserId((previousId) => (
        users.some((userItem) => userItem._id === previousId) ? previousId : (users[0]?._id || '')
      ))

      const volunteers = data.data?.volunteers || []
      setVolunteerRecords(volunteers)
      setSelectedVolunteerRecordId((previousId) => (
        volunteers.some((volunteer) => volunteer._id === previousId) ? previousId : ''
      ))

      const walletMap = {}
      members.forEach((member) => {
        walletMap[member._id] = String(member.walletBalance ?? 0)
      })
      setEditedWallets(walletMap)
    } catch (error) {
      setAdminError(error.message || 'Failed to fetch management data')
    } finally {
      setLoadingManagement(false)
    }
  }

  const fetchRewardSettings = async () => {
    setLoadingRewardSettings(true)
    setAdminError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reward-settings`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch reward settings')
      }

      setRewardSettings({
        directReferralForVcap: String(data.data?.directReferralForVcap ?? 50),
        blockVillageCoordinatorBonus: String(data.data?.blockVillageCoordinatorBonus ?? 20),
        blockVillageAdvisorBonus: String(data.data?.blockVillageAdvisorBonus ?? 20),
        blockVillageProMediaBonus: String(data.data?.blockVillageProMediaBonus ?? 10),
        directReferralForMemberToMember: String(data.data?.directReferralForMemberToMember ?? 40),
        memberVillageCoordinatorBonus: String(data.data?.memberVillageCoordinatorBonus ?? 15),
        memberVillageAdvisorBonus: String(data.data?.memberVillageAdvisorBonus ?? 15),
        memberVillageProMediaBonus: String(data.data?.memberVillageProMediaBonus ?? 15),
        teamLeaderDirectReferral: String(data.data?.teamLeaderDirectReferral ?? 50),
        teamLeaderVillageCoordinatorBonus: String(data.data?.teamLeaderVillageCoordinatorBonus ?? 15),
        teamLeaderVillageAdvisorBonus: String(data.data?.teamLeaderVillageAdvisorBonus ?? 15),
        teamLeaderVillageProMediaBonus: String(data.data?.teamLeaderVillageProMediaBonus ?? 15),
        teamLeaderUpgradeRegistrationCount: String(data.data?.teamLeaderUpgradeRegistrationCount ?? 2),
      })
    } catch (error) {
      setAdminError(error.message || 'Failed to fetch reward settings')
    } finally {
      setLoadingRewardSettings(false)
    }
  }

  const fetchWithdrawalRequests = async () => {
    setLoadingWithdrawalRequests(true)
    setAdminError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/withdrawals`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch withdrawal requests')
      }

      setWithdrawalRequests(data.data?.requests || [])
      setSelectedWithdrawalRequestId('')
    } catch (error) {
      setAdminError(error.message || 'Failed to fetch withdrawal requests')
    } finally {
      setLoadingWithdrawalRequests(false)
    }
  }

  const fetchAllWalletHistory = async () => {
    setLoadingWalletHistory(true)
    setAdminError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/wallet-history`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch wallet history')
      }

      setWalletHistoryUsers(data.data?.walletHistory || [])
      setSelectedWalletHistoryMemberId('')
      setSelectedWalletHistoryTransactionIdsByMember({})
    } catch (error) {
      setAdminError(error.message || 'Failed to fetch wallet history')
    } finally {
      setLoadingWalletHistory(false)
    }
  }

  const fetchCardSubmissions = async () => {
    setLoadingCardSubmissions(true)
    setAdminError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/card-submissions`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch card submissions')
      }

      setCardSubmissionUsers(data.data?.users || [])
      setSelectedCardSubmissionMemberId('')
      setSelectedCardSubmissionIdsByMember({})
    } catch (error) {
      setAdminError(error.message || 'Failed to fetch card submissions')
    } finally {
      setLoadingCardSubmissions(false)
    }
  }

  useEffect(() => {
    fetchBlocks()
    fetchManagementData()
    fetchRewardSettings()
    fetchWithdrawalRequests()
    fetchAllWalletHistory()
    fetchCardSubmissions()
  }, [])

  useEffect(() => {
    setExpandedSavedBlockId((previousId) => (
      previousId && savedBlocks.some((block) => block._id === previousId)
        ? previousId
        : ''
    ))

    setSavedBlockDrafts((previousDrafts) => {
      const validBlockIds = new Set(savedBlocks.map((block) => block._id))
      const nextDrafts = {}

      Object.entries(previousDrafts).forEach(([blockId, draft]) => {
        if (validBlockIds.has(blockId)) {
          nextDrafts[blockId] = draft
        }
      })

      return nextDrafts
    })
  }, [savedBlocks])

  const handleLogout = () => {
    onLogout()
    navigate('/login', { replace: true })
  }

  const handleAdminSectionChange = (section) => {
    setActiveSection(section)
    setMobileDashboardMenuOpen(false)
  }

  const toggleManagementSection = (sectionKey) => {
    setManagementSectionOpen((previous) => ({
      ...previous,
      [sectionKey]: !previous[sectionKey],
    }))
  }

  const handleAddVillage = () => {
    const normalizedVillageName = currentVillageInput.trim()

    if (!selectedBlockForVillage) {
      setAdminError('Please select a block before adding villages')
      return
    }

    if (!normalizedVillageName) {
      return
    }

    const selectedBlockEntry = blockEntries.find(
      (entry) => getHierarchyPairKey(entry.tehsilName, entry.blockName) === selectedBlockForVillage,
    )

    if (!selectedBlockEntry) {
      setAdminError('Please select a valid block before adding villages')
      return
    }

    const duplicateExists = villageEntries.some(
      (entry) => getHierarchyPairKey(entry.tehsilName, entry.blockName) === selectedBlockForVillage
        && normalizeHierarchyKey(entry.villageName) === normalizeHierarchyKey(normalizedVillageName),
    )

    if (duplicateExists) {
      setCurrentVillageInput('')
      return
    }

    setVillageEntries((previousEntries) => [
      ...previousEntries,
      {
        tehsilName: selectedBlockEntry.tehsilName,
        blockName: selectedBlockEntry.blockName,
        villageName: normalizedVillageName,
      },
    ])
    setCurrentVillageInput('')
    setAdminError('')
  }

  const handleRemoveVillage = (villageToRemove) => {
    setVillageEntries((previousEntries) => previousEntries.filter(
      (entry) => !(entry.tehsilName === villageToRemove.tehsilName
        && entry.blockName === villageToRemove.blockName
        && entry.villageName === villageToRemove.villageName),
    ))
  }

  const handleImportVillagesForSelectedBlock = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    if (!selectedBlockForVillage) {
      setAdminError('Please select a block before uploading villages')
      return
    }

    const selectedBlockEntry = blockEntries.find(
      (entry) => getHierarchyPairKey(entry.tehsilName, entry.blockName) === selectedBlockForVillage,
    )

    if (!selectedBlockEntry) {
      setAdminError('Please select a valid block before uploading villages')
      return
    }

    setAdminMessage('')
    setAdminError('')
    setImportingVillageTargetId(selectedBlockForVillage)

    try {
      const importedVillages = await extractVillageNamesFromWorkbook(file)
      let addedCount = 0

      setVillageEntries((previousEntries) => {
        const selectedBlockKey = getHierarchyPairKey(selectedBlockEntry.tehsilName, selectedBlockEntry.blockName)
        const otherEntries = previousEntries.filter(
          (entry) => getHierarchyPairKey(entry.tehsilName, entry.blockName) !== selectedBlockKey,
        )
        const currentVillages = previousEntries
          .filter((entry) => getHierarchyPairKey(entry.tehsilName, entry.blockName) === selectedBlockKey)
          .map((entry) => entry.villageName)
        const mergeResult = mergeUniqueVillageNames(currentVillages, importedVillages)
        addedCount = mergeResult.addedCount

        if (mergeResult.addedCount === 0) {
          return previousEntries
        }

        return [
          ...otherEntries,
          ...mergeResult.uniqueVillages.map((villageName) => ({
            tehsilName: selectedBlockEntry.tehsilName,
            blockName: selectedBlockEntry.blockName,
            villageName,
          })),
        ]
      })

      if (addedCount === 0) {
        setAdminMessage('All villages from the uploaded file already exist for the selected block')
      } else {
        setAdminMessage(`Imported ${addedCount} village(s) into ${selectedBlockEntry.blockName} (${selectedBlockEntry.tehsilName})`)
      }
    } catch (error) {
      setAdminError(error.message || 'Failed to import villages')
    } finally {
      setImportingVillageTargetId('')
    }
  }

  const handleImportVillagesForSavedBlock = async (blockId, event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    const draft = savedBlockDrafts[blockId]
    if (!draft) {
      return
    }

    setAdminMessage('')
    setAdminError('')
    setImportingVillageTargetId(blockId)

    try {
      const importedVillages = await extractVillageNamesFromWorkbook(file)
      let addedCount = 0

      setSavedBlockDrafts((previousDrafts) => {
        const currentDraft = previousDrafts[blockId]
        if (!currentDraft) {
          return previousDrafts
        }

        const mergeResult = mergeUniqueVillageNames(currentDraft.villages || [], importedVillages)
        addedCount = mergeResult.addedCount

        if (mergeResult.addedCount === 0) {
          return previousDrafts
        }

        return {
          ...previousDrafts,
          [blockId]: {
            ...currentDraft,
            villages: mergeResult.uniqueVillages,
          },
        }
      })

      if (addedCount === 0) {
        setAdminMessage('All villages from the uploaded file already exist for this block')
      } else {
        setAdminMessage(`Imported ${addedCount} village(s) into ${draft.blockName}`)
      }
    } catch (error) {
      setAdminError(error.message || 'Failed to import villages')
    } finally {
      setImportingVillageTargetId('')
    }
  }

  useEffect(() => {
    if (selectedTehsilForBlock && !tehsilInputs.some((tehsil) => normalizeHierarchyKey(tehsil) === normalizeHierarchyKey(selectedTehsilForBlock))) {
      setSelectedTehsilForBlock('')
    }
  }, [tehsilInputs, selectedTehsilForBlock])

  useEffect(() => {
    if (selectedBlockForVillage && !blockEntries.some((entry) => getHierarchyPairKey(entry.tehsilName, entry.blockName) === selectedBlockForVillage)) {
      setSelectedBlockForVillage('')
    }
  }, [blockEntries, selectedBlockForVillage])

  const handleAddBlockEntry = () => {
    const normalizedBlockName = currentBlockInput.trim()

    if (!selectedTehsilForBlock) {
      setAdminError('Please select a tehsil before adding blocks')
      return
    }

    if (!normalizedBlockName) {
      return
    }

    const duplicateExists = blockEntries.some(
      (entry) => normalizeHierarchyKey(entry.tehsilName) === normalizeHierarchyKey(selectedTehsilForBlock)
        && normalizeHierarchyKey(entry.blockName) === normalizeHierarchyKey(normalizedBlockName),
    )

    if (duplicateExists) {
      setCurrentBlockInput('')
      return
    }

    setBlockEntries((previousEntries) => [
      ...previousEntries,
      {
        tehsilName: selectedTehsilForBlock,
        blockName: normalizedBlockName,
      },
    ])
    setSelectedBlockForVillage(getHierarchyPairKey(selectedTehsilForBlock, normalizedBlockName))
    setCurrentBlockInput('')
    setAdminError('')
  }

  const handleRemoveBlockEntry = (entryToRemove) => {
    const entryKey = getHierarchyPairKey(entryToRemove.tehsilName, entryToRemove.blockName)
    setBlockEntries((previousEntries) => previousEntries.filter(
      (entry) => !(entry.tehsilName === entryToRemove.tehsilName && entry.blockName === entryToRemove.blockName),
    ))
    setVillageEntries((previousEntries) => previousEntries.filter(
      (entry) => getHierarchyPairKey(entry.tehsilName, entry.blockName) !== entryKey,
    ))
  }

  const handleSaveBlock = async (event) => {
    event.preventDefault()
    setAdminMessage('')
    setAdminError('')

    if (!districtName.trim()) {
      setAdminError('Please select a district')
      return
    }

    if (tehsilInputs.length === 0) {
      setAdminError('Please add at least one tehsil')
      return
    }

    if (blockEntries.length === 0) {
      setAdminError('Please add at least one block')
      return
    }

    if (villageEntries.length === 0) {
      setAdminError('Please add at least one village')
      return
    }

    const blockEntriesWithVillages = blockEntries.map((entry) => {
      const villages = villageEntries
        .filter((villageEntry) => getHierarchyPairKey(villageEntry.tehsilName, villageEntry.blockName) === getHierarchyPairKey(entry.tehsilName, entry.blockName))
        .map((villageEntry) => villageEntry.villageName)

      return {
        tehsilName: entry.tehsilName,
        blockName: entry.blockName,
        villages,
      }
    })

    const missingVillageBlock = blockEntriesWithVillages.find((entry) => entry.villages.length === 0)
    if (missingVillageBlock) {
      setAdminError(`Please add at least one village for block ${missingVillageBlock.blockName} (${missingVillageBlock.tehsilName})`)
      return
    }

    setSavingBlock(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blocks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stateName: UP_STATE_NAME,
          districtName,
          blockEntries: blockEntriesWithVillages,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save block')
      }

      setAdminMessage(data.message || 'Block saved successfully')
      setTehsilInputs([])
      setCurrentTehsilInput('')
      setSelectedTehsilForBlock('')
      setBlockEntries([])
      setSelectedBlockForVillage('')
      setCurrentBlockInput('')
      setVillageEntries([])
      setCurrentVillageInput('')
      await fetchBlocks()
      setActiveSection('saved')
    } catch (error) {
      setAdminError(error.message || 'Failed to save block')
    } finally {
      setSavingBlock(false)
    }
  }

  const handleDeleteBlock = async (blockId, blockName) => {
    const confirmed = window.confirm(`Delete block ${blockName || 'this block'}? This will remove it from saved blocks.`)
    if (!confirmed) {
      return
    }

    setAdminMessage('')
    setAdminError('')
    setDeletingBlockId(blockId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blocks/${blockId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete block')
      }

      setAdminMessage(data.message || 'Block deleted successfully')
      await fetchBlocks()
    } catch (error) {
      setAdminError(error.message || 'Failed to delete block')
    } finally {
      setDeletingBlockId('')
    }
  }

  const initializeSavedBlockDraft = (block) => {
    if (!block?._id) {
      return
    }

    setSavedBlockDrafts((previousDrafts) => {
      if (previousDrafts[block._id]) {
        return previousDrafts
      }

      return {
        ...previousDrafts,
        [block._id]: {
          districtName: block.districtName || MORADABAD_DISTRICT_NAME,
          tehsilName: block.tehsilName || '',
          blockName: block.blockName || '',
          villages: Array.isArray(block.villages) ? [...block.villages] : [],
          newVillageInput: '',
        },
      }
    })
  }

  const handleToggleSavedBlock = (block) => {
    if (!block?._id) {
      return
    }

    initializeSavedBlockDraft(block)
    setExpandedSavedBlockId((previousId) => (previousId === block._id ? '' : block._id))
  }

  const handleSavedBlockDraftChange = (blockId, updates) => {
    setSavedBlockDrafts((previousDrafts) => {
      const existingDraft = previousDrafts[blockId]
      if (!existingDraft) {
        return previousDrafts
      }

      return {
        ...previousDrafts,
        [blockId]: {
          ...existingDraft,
          ...updates,
        },
      }
    })
  }

  const handleAddVillageToSavedBlock = (blockId) => {
    const draft = savedBlockDrafts[blockId]
    if (!draft) {
      return
    }

    const villageName = draft.newVillageInput.trim()
    if (!villageName) {
      return
    }

    const duplicateVillage = draft.villages.some((village) => normalizeHierarchyKey(village) === normalizeHierarchyKey(villageName))
    if (duplicateVillage) {
      handleSavedBlockDraftChange(blockId, { newVillageInput: '' })
      return
    }

    handleSavedBlockDraftChange(blockId, {
      villages: [...draft.villages, villageName],
      newVillageInput: '',
    })
  }

  const handleRemoveVillageFromSavedBlock = (blockId, villageNameToRemove) => {
    const draft = savedBlockDrafts[blockId]
    if (!draft) {
      return
    }

    handleSavedBlockDraftChange(blockId, {
      villages: draft.villages.filter((village) => village !== villageNameToRemove),
    })
  }

  const handleSaveEditedBlock = async (blockId) => {
    const draft = savedBlockDrafts[blockId]
    if (!draft) {
      return
    }

    const normalizedDistrictName = String(draft.districtName || '').trim()
    const normalizedTehsilName = String(draft.tehsilName || '').trim()
    const normalizedBlockName = String(draft.blockName || '').trim()
    const normalizedVillages = draft.villages
      .map((village) => String(village || '').trim())
      .filter(Boolean)

    if (!normalizedDistrictName || !normalizedTehsilName || !normalizedBlockName) {
      setAdminError('District, tehsil, and block names are required')
      return
    }

    if (normalizedVillages.length === 0) {
      setAdminError('At least one village is required for each block')
      return
    }

    setAdminMessage('')
    setAdminError('')
    setSavingEditedBlockId(blockId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/blocks/${blockId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stateName: UP_STATE_NAME,
          districtName: normalizedDistrictName,
          tehsilName: normalizedTehsilName,
          blockName: normalizedBlockName,
          villages: normalizedVillages,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update block')
      }

      setAdminMessage(data.message || 'Block updated successfully')
      await fetchBlocks()
    } catch (error) {
      setAdminError(error.message || 'Failed to update block')
    } finally {
      setSavingEditedBlockId('')
    }
  }

  const handleUpdateWallet = async (memberId) => {
    setAdminMessage('')
    setAdminError('')
    setUpdatingWalletMemberId(memberId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members/${memberId}/wallet`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletBalance: Number(editedWallets[memberId] || 0),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update wallet')
      }

      setAdminMessage(data.message || 'Wallet updated successfully')
      await fetchManagementData()
    } catch (error) {
      setAdminError(error.message || 'Failed to update wallet')
    } finally {
      setUpdatingWalletMemberId('')
    }
  }

  const handleUpdatePassword = async (memberId) => {
    setAdminMessage('')
    setAdminError('')
    setUpdatingPasswordMemberId(memberId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members/${memberId}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: editedPasswords[memberId] || '',
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password')
      }

      setEditedPasswords((prev) => ({ ...prev, [memberId]: '' }))
      setAdminMessage(data.message || 'Password updated successfully')
    } catch (error) {
      setAdminError(error.message || 'Failed to update password')
    } finally {
      setUpdatingPasswordMemberId('')
    }
  }

  const handleApproveMember = async (memberId) => {
    setAdminMessage('')
    setAdminError('')
    setApprovingMemberId(memberId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members/${memberId}/approve`, {
        method: 'PATCH',
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to approve member')
      }

      setAdminMessage(data.message || 'Member approved successfully')
      await fetchManagementData()
    } catch (error) {
      setAdminError(error.message || 'Failed to approve member')
    } finally {
      setApprovingMemberId('')
    }
  }

  const handleDeleteMember = async (memberId, memberName) => {
    const confirmed = window.confirm(`Delete ${memberName || 'this member'}? This action cannot be undone.`)
    if (!confirmed) {
      return
    }

    setAdminMessage('')
    setAdminError('')
    setDeletingMemberId(memberId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members/${memberId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete member')
      }

      setAdminMessage(data.message || 'Member deleted successfully')
      setEditedWallets((prev) => {
        const next = { ...prev }
        delete next[memberId]
        return next
      })
      setEditedPasswords((prev) => {
        const next = { ...prev }
        delete next[memberId]
        return next
      })
      await fetchManagementData()
    } catch (error) {
      setAdminError(error.message || 'Failed to delete member')
    } finally {
      setDeletingMemberId('')
    }
  }

  const handleUpdateVolunteerPassword = async (volunteerId) => {
    setAdminMessage('')
    setAdminError('')
    setUpdatingVolunteerPasswordId(volunteerId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/volunteers/${volunteerId}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: editedVolunteerPasswords[volunteerId] || '',
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update volunteer password')
      }

      setEditedVolunteerPasswords((prev) => ({ ...prev, [volunteerId]: '' }))
      setAdminMessage(data.message || 'Volunteer password updated successfully')
    } catch (error) {
      setAdminError(error.message || 'Failed to update volunteer password')
    } finally {
      setUpdatingVolunteerPasswordId('')
    }
  }

  const handleDeleteVolunteer = async (volunteerId, volunteerName) => {
    const confirmed = window.confirm(`Delete ${volunteerName || 'this volunteer'}? This action cannot be undone.`)
    if (!confirmed) {
      return
    }

    setAdminMessage('')
    setAdminError('')
    setDeletingVolunteerId(volunteerId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/volunteers/${volunteerId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete volunteer')
      }

      setEditedVolunteerPasswords((prev) => {
        const next = { ...prev }
        delete next[volunteerId]
        return next
      })
      setAdminMessage(data.message || 'Volunteer deleted successfully')
      await fetchManagementData()
    } catch (error) {
      setAdminError(error.message || 'Failed to delete volunteer')
    } finally {
      setDeletingVolunteerId('')
    }
  }

  const handleSaveRewardSettings = async (event) => {
    event.preventDefault()
    setAdminMessage('')
    setAdminError('')
    setSavingRewardSettings(true)

    try {
      const payload = {
        directReferralForVcap: Number(rewardSettings.directReferralForVcap),
        blockVillageCoordinatorBonus: Number(rewardSettings.blockVillageCoordinatorBonus),
        blockVillageAdvisorBonus: Number(rewardSettings.blockVillageAdvisorBonus),
        blockVillageProMediaBonus: Number(rewardSettings.blockVillageProMediaBonus),
        directReferralForMemberToMember: Number(rewardSettings.directReferralForMemberToMember),
        memberVillageCoordinatorBonus: Number(rewardSettings.memberVillageCoordinatorBonus),
        memberVillageAdvisorBonus: Number(rewardSettings.memberVillageAdvisorBonus),
        memberVillageProMediaBonus: Number(rewardSettings.memberVillageProMediaBonus),
        teamLeaderDirectReferral: Number(rewardSettings.teamLeaderDirectReferral),
        teamLeaderVillageCoordinatorBonus: Number(rewardSettings.teamLeaderVillageCoordinatorBonus),
        teamLeaderVillageAdvisorBonus: Number(rewardSettings.teamLeaderVillageAdvisorBonus),
        teamLeaderVillageProMediaBonus: Number(rewardSettings.teamLeaderVillageProMediaBonus),
        teamLeaderUpgradeRegistrationCount: Number(rewardSettings.teamLeaderUpgradeRegistrationCount),
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/reward-settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update reward settings')
      }

      setAdminMessage(data.message || 'Reward settings updated successfully')
      await fetchRewardSettings()
    } catch (error) {
      setAdminError(error.message || 'Failed to update reward settings')
    } finally {
      setSavingRewardSettings(false)
    }
  }

  const handleApproveWithdrawalRequest = async (withdrawalRequestId) => {
    setAdminMessage('')
    setAdminError('')
    setApprovingWithdrawalRequestId(withdrawalRequestId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/withdrawals/${withdrawalRequestId}/approve`, {
        method: 'PATCH',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to approve withdrawal request')
      }

      setAdminMessage(data.message || 'Withdrawal request approved successfully')
      await fetchWithdrawalRequests()
      await fetchManagementData()
    } catch (error) {
      setAdminError(error.message || 'Failed to approve withdrawal request')
    } finally {
      setApprovingWithdrawalRequestId('')
    }
  }

  const handleDeleteWithdrawalRequest = async (withdrawalRequestId) => {
    setAdminMessage('')
    setAdminError('')
    setDeletingWithdrawalRequestId(withdrawalRequestId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/withdrawals/${withdrawalRequestId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete withdrawal request')
      }

      setAdminMessage(data.message || 'Withdrawal request deleted successfully')
      if (selectedWithdrawalRequestId === withdrawalRequestId) {
        setSelectedWithdrawalRequestId('')
      }
      await fetchWithdrawalRequests()
      await fetchManagementData()
    } catch (error) {
      setAdminError(error.message || 'Failed to delete withdrawal request')
    } finally {
      setDeletingWithdrawalRequestId('')
    }
  }

  const handleRejectWithdrawalRequest = async (withdrawalRequestId) => {
    setAdminMessage('')
    setAdminError('')
    setRejectingWithdrawalRequestId(withdrawalRequestId)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/withdrawals/${withdrawalRequestId}/reject`, {
        method: 'PATCH',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reject withdrawal request')
      }

      setAdminMessage(data.message || 'Withdrawal request rejected successfully')
      await fetchWithdrawalRequests()
    } catch (error) {
      setAdminError(error.message || 'Failed to reject withdrawal request')
    } finally {
      setRejectingWithdrawalRequestId('')
    }
  }

  const toggleWalletHistoryTransactionSelection = (memberId, transactionId) => {
    setSelectedWalletHistoryTransactionIdsByMember((previous) => {
      const currentIds = previous[memberId] || []
      const nextIds = currentIds.includes(transactionId)
        ? currentIds.filter((id) => id !== transactionId)
        : [...currentIds, transactionId]

      return {
        ...previous,
        [memberId]: nextIds,
      }
    })
  }

  const handleDeleteWalletHistoryEntries = async (transactionIds, memberId) => {
    const uniqueIds = Array.from(new Set((transactionIds || []).filter(Boolean)))
    if (uniqueIds.length === 0) {
      return
    }

    const isSingleDelete = uniqueIds.length === 1
    const confirmed = window.confirm(
      isSingleDelete
        ? 'Delete this wallet history entry?'
        : `Delete ${uniqueIds.length} selected wallet history entries?`,
    )

    if (!confirmed) {
      return
    }

    setAdminMessage('')
    setAdminError('')
    setDeletingWalletHistoryEntries(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/wallet-history`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionIds: uniqueIds }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete wallet history entries')
      }

      setAdminMessage(data.message || 'Wallet history entries deleted successfully')
      setSelectedWalletHistoryTransactionIdsByMember((previous) => ({
        ...previous,
        [memberId]: [],
      }))
      await fetchAllWalletHistory()
      setSelectedWalletHistoryMemberId(memberId)
    } catch (error) {
      setAdminError(error.message || 'Failed to delete wallet history entries')
    } finally {
      setDeletingWalletHistoryEntries(false)
    }
  }

  const toggleCardSubmissionSelection = (memberId, submissionId) => {
    setSelectedCardSubmissionIdsByMember((previous) => {
      const currentIds = previous[memberId] || []
      const nextIds = currentIds.includes(submissionId)
        ? currentIds.filter((id) => id !== submissionId)
        : [...currentIds, submissionId]

      return {
        ...previous,
        [memberId]: nextIds,
      }
    })
  }

  const handleDeleteCardSubmissionEntries = async (submissionIds, memberId) => {
    const uniqueIds = Array.from(new Set((submissionIds || []).filter(Boolean)))
    if (uniqueIds.length === 0) {
      return
    }

    const isSingleDelete = uniqueIds.length === 1
    const confirmed = window.confirm(
      isSingleDelete
        ? 'Delete this card submission entry?'
        : `Delete ${uniqueIds.length} selected card submission entries?`,
    )

    if (!confirmed) {
      return
    }

    setAdminMessage('')
    setAdminError('')
    setDeletingCardSubmissionEntries(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/card-submissions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionIds: uniqueIds }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete card submission entries')
      }

      setAdminMessage(data.message || 'Card submission entries deleted successfully')
      setSelectedCardSubmissionIdsByMember((previous) => ({
        ...previous,
        [memberId]: [],
      }))
      await fetchCardSubmissions()
      setSelectedCardSubmissionMemberId(memberId)
    } catch (error) {
      setAdminError(error.message || 'Failed to delete card submission entries')
    } finally {
      setDeletingCardSubmissionEntries(false)
    }
  }

  const renderRightContent = () => {
    if (activeSection === 'dashboard') {
      const totalMembers = memberRecords.filter((member) => ['member', 'team leader'].includes(member.role)).length
      const totalAdvisors = memberRecords.filter((member) => member.role === 'technical advisor').length
      const totalCoordinators = memberRecords.filter((member) => member.role === 'village coordinator').length
      const totalProMedia = memberRecords.filter((member) => member.role === 'pro media').length
      const totalTeamLeaders = memberRecords.filter((member) => member.role === 'team leader').length
      const totalVolunteers = volunteerRecords.length
      const totalWithdrawalRequests = withdrawalRequests.length
      const approvedWithdrawalRequests = withdrawalRequests.filter((request) => request.status === 'approved').length

      return (
        <section className="admin-content-card">
          <h2>Dashboard Overview</h2>
          <p>Use the left menu to manage block and village master data for future workflows.</p>
          <div className="admin-grid">
            <article className="admin-stat-card">
              <h3>Total Members</h3>
              <strong>{totalMembers}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Total Advisors</h3>
              <strong>{totalAdvisors}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Total Co-ordinators</h3>
              <strong>{totalCoordinators}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Total PRO Media</h3>
              <strong>{totalProMedia}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Total Team Leaders</h3>
              <strong>{totalTeamLeaders}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Total Volunteers</h3>
              <strong>{totalVolunteers}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Total Blocks</h3>
              <strong>{savedBlocks.length}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Total Villages</h3>
              <strong>{savedBlocks.reduce((count, block) => count + (block.villages?.length || 0), 0)}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Total Withdrawal Requests</h3>
              <strong>{totalWithdrawalRequests}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Approved Withdrawal Requests</h3>
              <strong>{approvedWithdrawalRequests}</strong>
            </article>
            <article className="admin-stat-card">
              <h3>Recent Action</h3>
              <strong>{savedBlocks.length > 0 ? 'Updated' : 'None'}</strong>
            </article>
          </div>
        </section>
      )
    }

    if (activeSection === 'blocks') {
      return (
        <section className="admin-content-card admin-page-blocks admin-panel-card">
          <div className="saved-blocks-header">
            <div>
              <h2>Add District Hierarchy</h2>
              <p>Add district, tehsils, blocks, and villages. All entries are saved for Uttar Pradesh → Moradabad.</p>
            </div>
            <span className="admin-panel-badge admin-panel-badge-blue">Hierarchy Builder</span>
          </div>

          <form className="block-form" onSubmit={handleSaveBlock}>
            <label htmlFor="admin-state">State</label>
            <select id="admin-state" value={UP_STATE_NAME} required>
              {indianStates.map((stateItem) => {
                const isUP = normalizeHierarchyKey(stateItem.name) === normalizeHierarchyKey(UP_STATE_NAME)
                return (
                  <option key={stateItem.isoCode} value={stateItem.name} disabled={!isUP}>
                    {stateItem.name}
                  </option>
                )
              })}
            </select>

            <label htmlFor="admin-district">District</label>
            <select id="admin-district" value={districtName} onChange={(event) => setDistrictName(event.target.value)} required>
              {UP_DISTRICTS.map((district) => {
                const isMoradabad = normalizeHierarchyKey(district) === normalizeHierarchyKey(MORADABAD_DISTRICT_NAME)
                return (
                  <option key={district} value={district} disabled={!isMoradabad}>
                    {district}
                  </option>
                )
              })}
            </select>

            <label>Tehsils</label>
            <div className="village-input-row">
              <input
                type="text"
                value={currentTehsilInput}
                onChange={(event) => setCurrentTehsilInput(event.target.value)}
                placeholder="Enter tehsil name and click Add"
              />
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => {
                  const trimmed = currentTehsilInput.trim()
                  if (!trimmed) {
                    return
                  }

                  setTehsilInputs([...tehsilInputs, trimmed])
                  setCurrentTehsilInput('')
                }}
              >
                Add Tehsil
              </button>
            </div>
            <div className="village-chip-list">
              {tehsilInputs.map((tehsil) => (
                <span className="village-chip" key={tehsil}>
                  {tehsil}
                  <button type="button" onClick={() => setTehsilInputs(tehsilInputs.filter((t) => t !== tehsil))} aria-label={`Remove ${tehsil}`}>
                    ×
                  </button>
                </span>
              ))}
            </div>

            <label htmlFor="village-block">Blocks</label>
            <select
              id="village-block"
              value={selectedTehsilForBlock}
              onChange={(event) => setSelectedTehsilForBlock(event.target.value)}
              disabled={tehsilInputs.length === 0}
              required
            >
              <option value="">{tehsilInputs.length ? 'Select tehsil for block' : 'Add tehsil first'}</option>
              {tehsilInputs.map((tehsil) => (
                <option key={tehsil} value={tehsil}>
                  {tehsil}
                </option>
              ))}
            </select>
            <div className="village-input-row">
              <input
                type="text"
                value={currentBlockInput}
                onChange={(event) => setCurrentBlockInput(event.target.value)}
                placeholder="Enter block name for selected tehsil"
              />
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={handleAddBlockEntry}
              >
                Add Block
              </button>
            </div>
            <div className="village-chip-list">
              {blockEntries.map((entry) => (
                <span className="village-chip" key={`${entry.tehsilName}-${entry.blockName}`}>
                  {entry.blockName} ({entry.tehsilName})
                  <button type="button" onClick={() => handleRemoveBlockEntry(entry)} aria-label={`Remove ${entry.blockName}`}>
                    ×
                  </button>
                </span>
              ))}
            </div>

            <label htmlFor="village-name">Village Name</label>
            <select
              id="village-block"
              value={selectedBlockForVillage}
              onChange={(event) => setSelectedBlockForVillage(event.target.value)}
              disabled={blockEntries.length === 0}
              required
            >
              <option value="">{blockEntries.length ? 'Select block for village' : 'Add block first'}</option>
              {blockEntries.map((entry) => {
                const pairKey = getHierarchyPairKey(entry.tehsilName, entry.blockName)
                return (
                  <option key={pairKey} value={pairKey}>
                    {entry.blockName} ({entry.tehsilName})
                  </option>
                )
              })}
            </select>
              <div className="village-upload-row">
                <label className="admin-secondary-btn village-upload-btn">
                  {importingVillageTargetId === selectedBlockForVillage ? 'Importing...' : 'Upload Excel'}
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleImportVillagesForSelectedBlock}
                  />
                </label>
                <span className="village-upload-hint">Use the Excel file with a Village Name column.</span>
              </div>
            <div className="village-input-row">
              <input
                id="village-name"
                type="text"
                value={currentVillageInput}
                onChange={(event) => setCurrentVillageInput(event.target.value)}
                placeholder="Enter village name for selected block"
              />
              <button type="button" className="admin-secondary-btn" onClick={handleAddVillage}>
                Add Village
              </button>
            </div>

            <div className="village-chip-list">
              {villageEntries.map((village) => (
                <span className="village-chip" key={`${village.tehsilName}-${village.blockName}-${village.villageName}`}>
                  {village.villageName} ({village.blockName})
                  <button type="button" onClick={() => handleRemoveVillage(village)} aria-label={`Remove ${village.villageName}`}>
                    ×
                  </button>
                </span>
              ))}
            </div>

            <button type="submit" className="admin-submit-btn" disabled={savingBlock}>
              {savingBlock ? 'Saving...' : 'Save Block'}
            </button>
          </form>
        </section>
      )
    }

    if (activeSection === 'management') {
      const memberOnlyRecords = memberRecords.filter((member) => member.role === 'member')
      const advisorRecords = memberRecords.filter((member) => member.role === 'technical advisor')
      const coordinatorRecords = memberRecords.filter((member) => member.role === 'village coordinator')
      const proMediaRecords = memberRecords.filter((member) => member.role === 'pro media')
      const teamLeaderRecords = memberRecords.filter((member) => member.role === 'team leader')
      const searchQuery = managementSearch.trim().toLowerCase()

      const matchesSearch = (record) => {
        if (!searchQuery) {
          return true
        }

        return [
          record.fullName,
          record.email,
          record.mobileNumber,
          record.role,
          record.blockName,
          record.villageName,
          record.referralCode,
          record.registeredByName,
          record.registeredByRole,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(searchQuery)
      }

      const filteredMemberRecords = memberOnlyRecords.filter(matchesSearch)
      const filteredAdvisorRecords = advisorRecords.filter(matchesSearch)
      const filteredCoordinatorRecords = coordinatorRecords.filter(matchesSearch)
      const filteredProMediaRecords = proMediaRecords.filter(matchesSearch)
      const filteredTeamLeaderRecords = teamLeaderRecords.filter(matchesSearch)
      const filteredRegisteredUsers = registeredUsers.filter(matchesSearch)

      const managementSuggestions = searchQuery ? [
        ...filteredMemberRecords.map((member) => ({
          id: member._id,
          label: member.fullName,
          sublabel: `${member.role} • ${member.blockName || '-'}`,
          type: 'member',
        })),
        ...filteredAdvisorRecords.map((member) => ({
          id: member._id,
          label: member.fullName,
          sublabel: `${member.role} • ${member.blockName || '-'}`,
          type: 'advisor',
        })),
        ...filteredCoordinatorRecords.map((member) => ({
          id: member._id,
          label: member.fullName,
          sublabel: `${member.role} • ${member.blockName || '-'}`,
          type: 'coordinator',
        })),
        ...filteredProMediaRecords.map((member) => ({
          id: member._id,
          label: member.fullName,
          sublabel: `${member.role} • ${member.blockName || '-'}`,
          type: 'proMedia',
        })),
        ...filteredTeamLeaderRecords.map((member) => ({
          id: member._id,
          label: member.fullName,
          sublabel: `${member.role} • ${member.blockName || '-'}`,
          type: 'teamLeader',
        })),
        ...filteredRegisteredUsers.map((userItem) => ({
          id: userItem._id,
          label: userItem.fullName,
          sublabel: `${userItem.role || 'registered user'} • ${userItem.blockName || '-'}`,
          type: 'registered',
        })),
      ].slice(0, 8) : []

      const renderMemberCategory = (title, records, categoryClassName, emptyMessage, sectionKey) => {
        const isCategoryOpen = Boolean(managementSectionOpen[sectionKey])

        return (
        <section className={`admin-user-category ${categoryClassName}`}>
          <button
            type="button"
            className={`admin-category-toggle ${isCategoryOpen ? 'open' : ''}`}
            onClick={() => toggleManagementSection(sectionKey)}
            aria-expanded={isCategoryOpen}
          >
            <span className="admin-subheading">{title}</span>
            <span className="admin-category-meta">{records.length}</span>
            <span className="admin-category-chevron">&gt;</span>
          </button>

          {isCategoryOpen ? (
            records.length === 0 ? (
              <p>{emptyMessage}</p>
            ) : (
            <div className="admin-entity-list" role="list" aria-label={`${title} list`}>
              {records.map((member) => {
                const isOpen = selectedMemberId === member._id
                const deleteRoleLabel = {
                  'village coordinator': 'Coordinator',
                  'technical advisor': 'Advisor',
                  'pro media': 'PRO',
                  'team leader': 'Team Leader',
                  member: 'Member',
                }[member.role] || 'User'

                return (
                  <div className="admin-entity-entry" key={member._id}>
                    <button
                      type="button"
                      className={`admin-entity-item ${isOpen ? 'active' : ''}`}
                      onClick={() => setSelectedMemberId((previousId) => (previousId === member._id ? '' : member._id))}
                    >
                      <span className="admin-entity-name">{member.fullName}</span>
                      <span className="admin-entity-role">{member.role}</span>
                    </button>

                    {isOpen && (
                      <article className="admin-detail-card">
                        <h4>{member.fullName}</h4>
                        <div className="admin-detail-grid">
                          <div className="admin-member-photo-field">
                            <span>Profile Photo</span>
                            {member.profilePhotoUrl ? (
                              <img className="admin-member-photo-image" src={member.profilePhotoUrl} alt={`${member.fullName} profile`} />
                            ) : (
                              <strong>N/A</strong>
                            )}
                          </div>
                          <div>
                            <span>Aadhaar Number</span>
                            <strong>{member.aadhaarNumber || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>Aadhaar Document</span>
                            {member.aadhaarDocumentUrl ? (
                              <a className="admin-doc-download-btn" href={member.aadhaarDocumentUrl} target="_blank" rel="noopener noreferrer" download>
                                Download {getDownloadLabelFromName(member.aadhaarDocumentName, 'aadhaar-document')}
                              </a>
                            ) : (
                              <strong>N/A</strong>
                            )}
                          </div>
                          <div>
                            <span>PAN Number</span>
                            <strong>{member.panNumber || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>PAN Document</span>
                            {member.panDocumentUrl ? (
                              <a className="admin-doc-download-btn" href={member.panDocumentUrl} target="_blank" rel="noopener noreferrer" download>
                                Download {getDownloadLabelFromName(member.panDocumentName, 'pan-document')}
                              </a>
                            ) : (
                              <strong>N/A</strong>
                            )}
                          </div>
                          <div>
                            <span>Domicile Certificate</span>
                            {member.domicileDocumentUrl ? (
                              <a className="admin-doc-download-btn" href={member.domicileDocumentUrl} target="_blank" rel="noopener noreferrer" download>
                                Download {getDownloadLabelFromName(member.domicileDocumentName, 'domicile-document')}
                              </a>
                            ) : (
                              <strong>N/A</strong>
                            )}
                          </div>
                          <div>
                            <span>Email</span>
                            <strong>{member.email}</strong>
                          </div>
                          <div>
                            <span>Mobile Number</span>
                            <strong>{member.mobileNumber || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>Date of Birth</span>
                            <strong>{member.dateOfBirth || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>Role</span>
                            <strong>{member.role}</strong>
                          </div>
                          <div>
                            <span>Block</span>
                            <strong>{member.blockName}</strong>
                          </div>
                          <div>
                            <span>Village</span>
                            <strong>{member.villageName}</strong>
                          </div>
                          <div>
                            <span>Referral Code</span>
                            <strong>{member.referralCode || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>Account Status</span>
                            <strong>{member.accountStatus === 'pending' ? 'Pending' : 'Active'}</strong>
                          </div>
                          <div>
                            <span>Account Holder</span>
                            <strong>{member.bankAccountHolderName || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>Bank Name</span>
                            <strong>{member.bankName || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>Account Number</span>
                            <strong>{member.bankAccountNumber || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>IFSC Code</span>
                            <strong>{member.bankIfscCode || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>Branch Name</span>
                            <strong>{member.bankBranchName || 'N/A'}</strong>
                          </div>
                          <div>
                            <span>UPI ID</span>
                            <strong>{member.bankUpiId || 'N/A'}</strong>
                          </div>
                        </div>

                        <div className="admin-detail-actions">
                          {member.accountStatus === 'pending' ? (
                            <div className="admin-detail-action-row">
                              <label>Approval</label>
                              <span className="admin-panel-note-text">This account is waiting for admin approval.</span>
                              <button
                                type="button"
                                className="admin-submit-btn"
                                onClick={() => handleApproveMember(member._id)}
                                disabled={approvingMemberId === member._id}
                              >
                                {approvingMemberId === member._id ? 'Approving...' : 'Approve Account'}
                              </button>
                            </div>
                          ) : null}

                          <div className="admin-detail-action-row">
                            <label htmlFor={`wallet-${member._id}`}>Wallet Balance</label>
                            <input
                              id={`wallet-${member._id}`}
                              type="number"
                              min="0"
                              value={editedWallets[member._id] ?? ''}
                              onChange={(event) => setEditedWallets((prev) => ({
                                ...prev,
                                [member._id]: event.target.value,
                              }))}
                            />
                            <button
                              type="button"
                              className="admin-secondary-btn"
                              onClick={() => handleUpdateWallet(member._id)}
                              disabled={updatingWalletMemberId === member._id}
                            >
                              {updatingWalletMemberId === member._id ? 'Saving...' : 'Save Wallet'}
                            </button>
                          </div>

                          <div className="admin-detail-action-row">
                            <label htmlFor={`password-${member._id}`}>New Password</label>
                            <input
                              id={`password-${member._id}`}
                              type="password"
                              value={editedPasswords[member._id] ?? ''}
                              placeholder="New password"
                              onChange={(event) => setEditedPasswords((prev) => ({
                                ...prev,
                                [member._id]: event.target.value,
                              }))}
                            />
                            <button
                              type="button"
                              className="admin-secondary-btn"
                              onClick={() => handleUpdatePassword(member._id)}
                              disabled={updatingPasswordMemberId === member._id}
                            >
                              {updatingPasswordMemberId === member._id ? 'Saving...' : 'Change Password'}
                            </button>
                          </div>

                          <div className="admin-detail-action-row">
                            <label>Delete Account</label>
                            <button
                              type="button"
                              className="admin-danger-btn"
                              onClick={() => handleDeleteMember(member._id, member.fullName)}
                              disabled={deletingMemberId === member._id}
                            >
                              {deletingMemberId === member._id ? 'Deleting...' : `Delete ${deleteRoleLabel}`}
                            </button>
                          </div>
                        </div>
                      </article>
                    )}
                  </div>
                )
              })}
            </div>
            )
          ) : null}
        </section>
        )
      }

      return (
        <section className="admin-content-card admin-page-management">
          <div className="saved-blocks-header">
            <h2>User Management</h2>
            <button type="button" className="admin-secondary-btn" onClick={fetchManagementData} disabled={loadingManagement}>
              {loadingManagement ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="admin-user-search-panel">
            <label htmlFor="admin-user-search">Search users</label>
            <div className="admin-user-search-wrap">
              <input
                id="admin-user-search"
                name="admin-user-search"
                type="text"
                value={managementSearch}
                onChange={(event) => setManagementSearch(event.target.value)}
                placeholder="Search by name, email, mobile, role, block, village..."
                autoComplete="new-password"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {managementSearch ? (
                <button type="button" className="admin-search-clear-btn" onClick={() => setManagementSearch('')}>
                  Clear
                </button>
              ) : null}
              {managementSuggestions.length > 0 ? (
                <div className="admin-search-suggestions" role="listbox" aria-label="Search suggestions">
                  {managementSuggestions.map((item) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      type="button"
                      className="admin-search-suggestion"
                      onClick={() => {
                        setManagementSearch(item.label)
                        if (item.type === 'registered') {
                          setManagementSectionOpen((previous) => ({ ...previous, registeredUsers: true }))
                          setSelectedRegisteredUserId(item.id)
                        } else {
                          const openKey = item.type === 'advisor'
                            ? 'advisors'
                            : item.type === 'coordinator'
                              ? 'coordinators'
                              : item.type === 'proMedia'
                                ? 'proMedia'
                                : item.type === 'teamLeader'
                                  ? 'teamLeaders'
                                  : 'members'
                          setManagementSectionOpen((previous) => ({ ...previous, [openKey]: true }))
                          setSelectedMemberId(item.id)
                        }
                      }}
                    >
                      <strong>{item.label}</strong>
                      <span>{item.sublabel}</span>
                    </button>
                  ))}
                </div>
              ) : managementSearch ? (
                <div className="admin-search-suggestions admin-search-suggestions-empty">
                  <span>No matches found.</span>
                </div>
              ) : null}
            </div>
          </div>

          {renderMemberCategory('Members', filteredMemberRecords, 'admin-user-category-member', searchQuery ? 'No matching member records found.' : 'No member records found.', 'members')}
          {renderMemberCategory('Team Leaders', filteredTeamLeaderRecords, 'admin-user-category-teamleader', searchQuery ? 'No matching Team Leader records found.' : 'No Team Leader records found.', 'teamLeaders')}
          {renderMemberCategory('Technical Advisors', filteredAdvisorRecords, 'admin-user-category-advisor', searchQuery ? 'No matching technical advisor records found.' : 'No technical advisor records found.', 'advisors')}
          {renderMemberCategory('Village Co-ordinators', filteredCoordinatorRecords, 'admin-user-category-coordinator', searchQuery ? 'No matching village co-ordinator records found.' : 'No village co-ordinator records found.', 'coordinators')}
          {renderMemberCategory('PRO Media', filteredProMediaRecords, 'admin-user-category-promedia', searchQuery ? 'No matching PRO Media records found.' : 'No PRO Media records found.', 'proMedia')}

          {/* <section className="admin-user-category admin-user-category-registered">
            <button
              type="button"
              className={`admin-category-toggle ${managementSectionOpen.registeredUsers ? 'open' : ''}`}
              onClick={() => toggleManagementSection('registeredUsers')}
              aria-expanded={managementSectionOpen.registeredUsers}
            >
              <span className="admin-subheading">Registered Users</span>
              <span className="admin-category-meta">{filteredRegisteredUsers.length}</span>
              <span className="admin-category-chevron">&gt;</span>
            </button>

          {managementSectionOpen.registeredUsers ? (
            filteredRegisteredUsers.length === 0 ? (
              <p>{searchQuery ? 'No matching registered users found.' : 'No registered users found.'}</p>
            ) : (
            <div className="admin-entity-list" role="list" aria-label="Registered users list">
              {filteredRegisteredUsers.map((userItem) => {
                const isOpen = selectedRegisteredUserId === userItem._id

                return (
                  <div className="admin-entity-entry" key={userItem._id}>
                    <button
                      type="button"
                      className={`admin-entity-item ${isOpen ? 'active' : ''}`}
                      onClick={() => setSelectedRegisteredUserId((previousId) => (previousId === userItem._id ? '' : userItem._id))}
                    >
                      <span className="admin-entity-name">{userItem.fullName}</span>
                      <span className="admin-entity-role">{userItem.role || 'registered user'}</span>
                    </button>

                    {isOpen && (
                      <article className="admin-detail-card">
                        <h4>{userItem.fullName}</h4>
                        <div className="admin-detail-grid">
                          <div>
                            <span>Role</span>
                            <strong>{userItem.role || 'registered user'}</strong>
                          </div>
                          <div>
                            <span>Email</span>
                            <strong>{userItem.email || '-'}</strong>
                          </div>
                          <div>
                            <span>Mobile</span>
                            <strong>{userItem.mobileNumber}</strong>
                          </div>
                          <div>
                            <span>Referral Code</span>
                            <strong>{userItem.referralCode || '-'}</strong>
                          </div>
                          <div>
                            <span>Block</span>
                            <strong>{userItem.blockName}</strong>
                          </div>
                          <div>
                            <span>Village</span>
                            <strong>{userItem.villageName}</strong>
                          </div>
                          <div>
                            <span>Registered By</span>
                            <strong>{userItem.registeredByName}</strong>
                          </div>
                          <div>
                            <span>Registrar Role</span>
                            <strong>{userItem.registeredByRole}</strong>
                          </div>
                          <div>
                            <span>Approval Status</span>
                            <strong>{userItem.status === 'approved' ? 'Approved' : 'Pending'}</strong>
                          </div>
                        </div>
                      </article>
                    )}
                  </div>
                )
              })}
            </div>
            )
          ) : null}
          </section> */}
        </section>
      )
    }

    if (activeSection === 'pendingRequests') {
      const pendingApprovalRecords = memberRecords
        .filter((member) => ['village coordinator', 'technical advisor', 'pro media'].includes(member.role))
        .filter((member) => member.accountStatus === 'pending')

      return (
        <section className="admin-content-card admin-page-management">
          <div className="saved-blocks-header">
            <h2>Pending Approval Requests</h2>
            <button type="button" className="admin-secondary-btn" onClick={fetchManagementData} disabled={loadingManagement}>
              {loadingManagement ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {pendingApprovalRecords.length === 0 ? (
            <p>No pending approval requests.</p>
          ) : (
            <div className="admin-entity-list" role="list" aria-label="Pending approval requests list">
              {pendingApprovalRecords.map((member) => (
                <article className="admin-detail-card" key={`pending-${member._id}`}>
                  <button
                    type="button"
                    className={`admin-entity-item pending-approval-summary-row ${selectedPendingApprovalMemberId === member._id ? 'active' : ''}`}
                    onClick={() => setSelectedPendingApprovalMemberId((previousId) => (previousId === member._id ? '' : member._id))}
                    aria-expanded={selectedPendingApprovalMemberId === member._id}
                  >
                    <span className="admin-entity-name">{member.fullName}</span>
                    <span className="admin-entity-role">{member.role}</span>
                  </button>

                  {selectedPendingApprovalMemberId === member._id ? (
                    <>
                      <div className="admin-detail-grid">
                        <div>
                          <span>Role</span>
                          <strong>{member.role}</strong>
                        </div>
                        <div>
                          <span>Email</span>
                          <strong>{member.email || '-'}</strong>
                        </div>
                        <div>
                          <span>Mobile</span>
                          <strong>{member.mobileNumber || '-'}</strong>
                        </div>
                        <div>
                          <span>Block</span>
                          <strong>{member.blockName || '-'}</strong>
                        </div>
                        <div>
                          <span>Village</span>
                          <strong>{member.villageName || '-'}</strong>
                        </div>
                      </div>

                      <div className="admin-detail-actions">
                        <div className="admin-detail-action-row">
                          <label>Approval</label>
                          <span className="admin-panel-note-text">Waiting for admin approval.</span>
                          <button
                            type="button"
                            className="admin-submit-btn"
                            onClick={() => handleApproveMember(member._id)}
                            disabled={approvingMemberId === member._id}
                          >
                            {approvingMemberId === member._id ? 'Approving...' : 'Approve Account'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      )
    }

    if (activeSection === 'volunteers') {
      return (
        <section className="admin-content-card admin-page-management">
          <div className="saved-blocks-header">
            <h2>Volunteers</h2>
            <button type="button" className="admin-secondary-btn" onClick={fetchManagementData} disabled={loadingManagement}>
              {loadingManagement ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {volunteerRecords.length === 0 ? (
            <p>No volunteer records found.</p>
          ) : (
            <div className="admin-entity-list" role="list" aria-label="Volunteers list">
              {volunteerRecords.map((volunteer) => (
                <article className="admin-detail-card" key={`volunteer-${volunteer._id}`}>
                  <button
                    type="button"
                    className={`admin-entity-item volunteer-summary-row ${selectedVolunteerRecordId === volunteer._id ? 'active' : ''}`}
                    onClick={() => setSelectedVolunteerRecordId((previousId) => (previousId === volunteer._id ? '' : volunteer._id))}
                    aria-expanded={selectedVolunteerRecordId === volunteer._id}
                  >
                    <span className="admin-entity-name">{volunteer.fullName}</span>
                    <span className="admin-entity-role">{volunteer.accountStatus === 'pending' ? 'Pending' : 'Active'}</span>
                  </button>

                  {selectedVolunteerRecordId === volunteer._id ? (
                    <>
                      <div className="admin-detail-grid">
                        <div className="admin-member-photo-field">
                          <span>Profile Photo</span>
                          {volunteer.profilePhotoUrl ? (
                            <img className="admin-member-photo-image" src={volunteer.profilePhotoUrl} alt={`${volunteer.fullName} profile`} />
                          ) : (
                            <strong>N/A</strong>
                          )}
                        </div>
                        <div>
                          <span>Email</span>
                          <strong>{volunteer.email || 'N/A'}</strong>
                        </div>
                        <div>
                          <span>Mobile Number</span>
                          <strong>{volunteer.mobileNumber || 'N/A'}</strong>
                        </div>
                        <div>
                          <span>Date of Birth</span>
                          <strong>{volunteer.dateOfBirth || 'N/A'}</strong>
                        </div>
                        <div>
                          <span>Aadhaar Number</span>
                          <strong>{volunteer.aadhaarNumber || 'N/A'}</strong>
                        </div>
                        <div>
                          <span>Aadhaar Document</span>
                          {volunteer.aadhaarDocumentUrl ? (
                            <a className="admin-doc-download-btn" href={volunteer.aadhaarDocumentUrl} target="_blank" rel="noopener noreferrer" download>
                              Download {getDownloadLabelFromName(volunteer.aadhaarDocumentName, 'aadhaar-document')}
                            </a>
                          ) : (
                            <strong>N/A</strong>
                          )}
                        </div>
                        <div>
                          <span>PAN Number</span>
                          <strong>{volunteer.panNumber || 'N/A'}</strong>
                        </div>
                        <div>
                          <span>PAN Document</span>
                          {volunteer.panDocumentUrl ? (
                            <a className="admin-doc-download-btn" href={volunteer.panDocumentUrl} target="_blank" rel="noopener noreferrer" download>
                              Download {getDownloadLabelFromName(volunteer.panDocumentName, 'pan-document')}
                            </a>
                          ) : (
                            <strong>N/A</strong>
                          )}
                        </div>
                        <div>
                          <span>Domicile Document</span>
                          {volunteer.domicileDocumentUrl ? (
                            <a className="admin-doc-download-btn" href={volunteer.domicileDocumentUrl} target="_blank" rel="noopener noreferrer" download>
                              Download {getDownloadLabelFromName(volunteer.domicileDocumentName, 'domicile-document')}
                            </a>
                          ) : (
                            <strong>N/A</strong>
                          )}
                        </div>
                        <div>
                          <span>Account Status</span>
                          <strong>{volunteer.accountStatus === 'pending' ? 'Pending' : 'Active'}</strong>
                        </div>
                      </div>

                      <div className="admin-detail-actions">
                        <div className="admin-detail-action-row">
                          <label htmlFor={`volunteer-password-${volunteer._id}`}>New Password</label>
                          <input
                            id={`volunteer-password-${volunteer._id}`}
                            type="password"
                            value={editedVolunteerPasswords[volunteer._id] ?? ''}
                            placeholder="New password"
                            onChange={(event) => setEditedVolunteerPasswords((prev) => ({
                              ...prev,
                              [volunteer._id]: event.target.value,
                            }))}
                          />
                          <button
                            type="button"
                            className="admin-secondary-btn"
                            onClick={() => handleUpdateVolunteerPassword(volunteer._id)}
                            disabled={updatingVolunteerPasswordId === volunteer._id}
                          >
                            {updatingVolunteerPasswordId === volunteer._id ? 'Saving...' : 'Change Password'}
                          </button>
                        </div>

                        <div className="admin-detail-action-row">
                          <label>Delete Volunteer</label>
                          <button
                            type="button"
                            className="admin-danger-btn"
                            onClick={() => handleDeleteVolunteer(volunteer._id, volunteer.fullName)}
                            disabled={deletingVolunteerId === volunteer._id}
                          >
                            {deletingVolunteerId === volunteer._id ? 'Deleting...' : 'Delete Volunteer'}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      )
    }

    if (activeSection === 'withdrawals') {
      return (
        <section className="admin-content-card admin-page-withdrawals admin-panel-card">
          <div className="saved-blocks-header">
            <div>
              <h2>Withdrawal Requests</h2>
              <p>Approve pending requests. The requested amount will be deducted from the member's wallet after approval.</p>
            </div>
            <button type="button" className="admin-secondary-btn" onClick={fetchWithdrawalRequests} disabled={loadingWithdrawalRequests}>
              {loadingWithdrawalRequests ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {loadingWithdrawalRequests ? (
            <p>Loading withdrawal requests...</p>
          ) : withdrawalRequests.length === 0 ? (
            <p>No withdrawal requests found.</p>
          ) : (
            <div className="admin-entity-list" role="list" aria-label="Withdrawal requests list">
              {withdrawalRequests.map((request) => (
                <article className="admin-detail-card withdrawal-admin-card" key={request._id}>
                  <button
                    type="button"
                    className={`admin-entity-item withdrawal-summary-row ${selectedWithdrawalRequestId === request._id ? 'active' : ''}`}
                    onClick={() => setSelectedWithdrawalRequestId((previousId) => (previousId === request._id ? '' : request._id))}
                  >
                    <span className="admin-entity-name">{request.requestedByName}</span>
                    <span className="admin-entity-role">{request.requestedByRole}</span>
                  </button>

                  {selectedWithdrawalRequestId === request._id ? (
                    <div className="withdrawal-admin-expanded">
                      <div className="withdrawal-admin-head">
                        <div>
                          <h4>{request.requestedByName}</h4>
                          <p>{request.requestedByBlockName} | {request.requestedByVillageName}</p>
                        </div>
                        <span className={`withdrawal-status withdrawal-status-${request.status}`}>{request.status}</span>
                      </div>

                      <div className="admin-detail-grid">
                        <div>
                          <span>Request Amount</span>
                          <strong>Rs. {request.requestedAmount}</strong>
                        </div>
                        <div>
                          <span>5% Deducted</span>
                          <strong>Rs. {request.taxDeductedAmount}</strong>
                        </div>
                        <div>
                          <span>Final Pay</span>
                          <strong>Rs. {request.finalPayAmount}</strong>
                        </div>
                        <div>
                          <span>Requested At</span>
                          <strong>{new Date(request.createdAt).toLocaleString()}</strong>
                        </div>
                        <div>
                          <span>Account Holder</span>
                          <strong>{request.requestedByBankAccountHolderName || '-'}</strong>
                        </div>
                        <div>
                          <span>Bank Name</span>
                          <strong>{request.requestedByBankName || '-'}</strong>
                        </div>
                        <div>
                          <span>Account Number</span>
                          <strong>{request.requestedByBankAccountNumber || '-'}</strong>
                        </div>
                        <div>
                          <span>IFSC Code</span>
                          <strong>{request.requestedByBankIfscCode || '-'}</strong>
                        </div>
                        <div>
                          <span>Branch Name</span>
                          <strong>{request.requestedByBankBranchName || '-'}</strong>
                        </div>
                        <div>
                          <span>UPI ID</span>
                          <strong>{request.requestedByBankUpiId || '-'}</strong>
                        </div>
                      </div>

                      <div className="admin-detail-actions">
                        {request.status === 'pending' ? (
                          <div className="admin-detail-actions-row">
                            <button
                              type="button"
                              className="admin-submit-btn"
                              onClick={() => handleApproveWithdrawalRequest(request._id)}
                              disabled={approvingWithdrawalRequestId === request._id || rejectingWithdrawalRequestId === request._id || deletingWithdrawalRequestId === request._id}
                            >
                              {approvingWithdrawalRequestId === request._id ? 'Approving...' : 'Approve Request'}
                            </button>
                            <button
                              type="button"
                              className="admin-secondary-btn"
                              onClick={() => handleRejectWithdrawalRequest(request._id)}
                              disabled={rejectingWithdrawalRequestId === request._id || approvingWithdrawalRequestId === request._id || deletingWithdrawalRequestId === request._id}
                            >
                              {rejectingWithdrawalRequestId === request._id ? 'Rejecting...' : 'Reject Request'}
                            </button>
                            <button
                              type="button"
                              className="admin-secondary-btn admin-danger-btn"
                              onClick={() => handleDeleteWithdrawalRequest(request._id)}
                              disabled={deletingWithdrawalRequestId === request._id || approvingWithdrawalRequestId === request._id || rejectingWithdrawalRequestId === request._id}
                            >
                              {deletingWithdrawalRequestId === request._id ? 'Deleting...' : 'Delete Record'}
                            </button>
                          </div>
                        ) : (
                          <div className="admin-detail-actions-row">
                            <p className="admin-panel-note-text">{request.status === 'approved' ? `Approved at: ${request.approvedAt ? new Date(request.approvedAt).toLocaleString() : '-'}` : `Rejected at: ${request.rejectedAt ? new Date(request.rejectedAt).toLocaleString() : '-'}`}</p>
                            <button
                              type="button"
                              className="admin-secondary-btn admin-danger-btn"
                              onClick={() => handleDeleteWithdrawalRequest(request._id)}
                              disabled={deletingWithdrawalRequestId === request._id}
                            >
                              {deletingWithdrawalRequestId === request._id ? 'Deleting...' : 'Delete Record'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      )
    }

    if (activeSection === 'walletHistory') {
      const walletSearchQuery = walletHistorySearch.trim().toLowerCase()
      const filteredWalletUsers = walletSearchQuery
        ? walletHistoryUsers.filter((member) => [
          member.fullName,
          member.email,
          member.mobileNumber,
          member.blockName,
          member.villageName,
          member.role,
          member.referralCode,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(walletSearchQuery))
        : walletHistoryUsers

      return (
        <section className="admin-content-card admin-page-wallet-history admin-panel-card">
          <div className="saved-blocks-header">
            <div>
              <h2>All Wallet History</h2>
              <p>View wallet transactions for every user. Click a user card to expand details.</p>
            </div>
            <button type="button" className="admin-secondary-btn" onClick={fetchAllWalletHistory} disabled={loadingWalletHistory}>
              {loadingWalletHistory ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="admin-user-search-panel">
            <label htmlFor="admin-wallet-history-search">Search users</label>
            <div className="admin-user-search-wrap">
              <input
                id="admin-wallet-history-search"
                name="admin-wallet-history-search"
                type="text"
                value={walletHistorySearch}
                onChange={(event) => setWalletHistorySearch(event.target.value)}
                placeholder="Search by name, email, mobile, role, block, village..."
                autoComplete="new-password"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {walletHistorySearch ? (
                <button type="button" className="admin-search-clear-btn" onClick={() => setWalletHistorySearch('')}>
                  Clear
                </button>
              ) : null}
            </div>
          </div>

          {loadingWalletHistory ? (
            <p>Loading wallet history...</p>
          ) : filteredWalletUsers.length === 0 ? (
            <p>{walletHistoryUsers.length === 0 ? 'No wallet users found.' : 'No matching users found.'}</p>
          ) : (
            <div className="admin-entity-list" role="list" aria-label="All wallet history users">
              {filteredWalletUsers.map((member) => {
                const isOpen = selectedWalletHistoryMemberId === member._id

                return (
                  <article className="admin-detail-card withdrawal-admin-card" key={member._id}>
                    <button
                      type="button"
                      className={`admin-entity-item withdrawal-summary-row ${isOpen ? 'active' : ''}`}
                      onClick={() => setSelectedWalletHistoryMemberId((previousId) => (previousId === member._id ? '' : member._id))}
                    >
                      <span className="admin-entity-name">{member.fullName || 'User'}</span>
                      <span className="admin-entity-role">{member.role || '-'} | Wallet: Rs. {Number(member.walletBalance || 0).toFixed(2)}</span>
                    </button>

                    {isOpen ? (
                      <div className="withdrawal-admin-expanded">
                        <div className="admin-detail-grid">
                          <div>
                            <span>Email</span>
                            <strong>{member.email || '-'}</strong>
                          </div>
                          <div>
                            <span>Mobile</span>
                            <strong>{member.mobileNumber || '-'}</strong>
                          </div>
                          <div>
                            <span>Block</span>
                            <strong>{member.blockName || '-'}</strong>
                          </div>
                          <div>
                            <span>Village</span>
                            <strong>{member.villageName || '-'}</strong>
                          </div>
                          <div>
                            <span>Referral ID</span>
                            <strong>{member.referralCode || '-'}</strong>
                          </div>
                          <div>
                            <span>Total Transactions</span>
                            <strong>{member.transactions?.length || 0}</strong>
                          </div>
                        </div>

                        <div className="transaction-list">
                          {(member.transactions || []).length === 0 ? (
                            <p>No wallet transactions found for this user.</p>
                          ) : (
                            <>
                              <div className="admin-multi-select-bar">
                                <label className="admin-select-all-label" htmlFor={`wallet-select-all-${member._id}`}>
                                  <input
                                    id={`wallet-select-all-${member._id}`}
                                    type="checkbox"
                                    checked={(selectedWalletHistoryTransactionIdsByMember[member._id] || []).length > 0
                                      && (selectedWalletHistoryTransactionIdsByMember[member._id] || []).length === (member.transactions || []).length}
                                    onChange={(event) => {
                                      const checked = event.target.checked
                                      setSelectedWalletHistoryTransactionIdsByMember((previous) => ({
                                        ...previous,
                                        [member._id]: checked ? (member.transactions || []).map((tx) => tx._id) : [],
                                      }))
                                    }}
                                  />
                                  Select All
                                </label>
                                <button
                                  type="button"
                                  className="admin-secondary-btn admin-danger-btn"
                                  onClick={() => handleDeleteWalletHistoryEntries(selectedWalletHistoryTransactionIdsByMember[member._id] || [], member._id)}
                                  disabled={deletingWalletHistoryEntries || (selectedWalletHistoryTransactionIdsByMember[member._id] || []).length === 0}
                                >
                                  {deletingWalletHistoryEntries ? 'Deleting...' : 'Delete Selected'}
                                </button>
                              </div>

                              {(member.transactions || []).map((transaction) => (
                                <article key={transaction._id} className={`transaction-item ${transaction.transactionType === 'debit' ? 'debit' : 'credit'}`}>
                                  <div className="transaction-item-main">
                                    <input
                                      type="checkbox"
                                      checked={(selectedWalletHistoryTransactionIdsByMember[member._id] || []).includes(transaction._id)}
                                      onChange={() => toggleWalletHistoryTransactionSelection(member._id, transaction._id)}
                                      aria-label="Select wallet history entry"
                                      disabled={deletingWalletHistoryEntries}
                                    />
                                    <div>
                                      <h4>{transaction.transactionType === 'debit' ? '-' : '+'}Rs. {transaction.amount}</h4>
                                      <p>{transaction.reason}</p>
                                      <p>Balance After: Rs. {Number(transaction.balanceAfter || 0).toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div className="transaction-entry-actions">
                                    <span>{new Date(transaction.createdAt).toLocaleString()}</span>
                                    <button
                                      type="button"
                                      className="admin-secondary-btn admin-danger-btn"
                                      onClick={() => handleDeleteWalletHistoryEntries([transaction._id], member._id)}
                                      disabled={deletingWalletHistoryEntries}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </article>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </article>
                )
              })}
            </div>
          )}
        </section>
      )
    }

    if (activeSection === 'cardSubmissions') {
      const cardSearchQuery = cardSubmissionSearch.trim().toLowerCase()
      const filteredCardUsers = cardSearchQuery
        ? cardSubmissionUsers.filter((member) => [
          member.fullName,
          member.email,
          member.mobileNumber,
          member.blockName,
          member.villageName,
          member.role,
          member.referralCode,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(cardSearchQuery))
        : cardSubmissionUsers

      return (
        <section className="admin-content-card admin-page-wallet-history admin-panel-card">
          <div className="saved-blocks-header">
            <div>
              <h2>Card Submissions</h2>
              <p>Each save creates a new card entry. Open a user card to view all saved versions with photos.</p>
            </div>
            <button type="button" className="admin-secondary-btn" onClick={fetchCardSubmissions} disabled={loadingCardSubmissions}>
              {loadingCardSubmissions ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="admin-user-search-panel">
            <label htmlFor="admin-card-submission-search">Search users</label>
            <div className="admin-user-search-wrap">
              <input
                id="admin-card-submission-search"
                name="admin-card-submission-search"
                type="text"
                value={cardSubmissionSearch}
                onChange={(event) => setCardSubmissionSearch(event.target.value)}
                placeholder="Search by name, email, mobile, role, block, village..."
                autoComplete="new-password"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {cardSubmissionSearch ? (
                <button type="button" className="admin-search-clear-btn" onClick={() => setCardSubmissionSearch('')}>
                  Clear
                </button>
              ) : null}
            </div>
          </div>

          {loadingCardSubmissions ? (
            <p>Loading card submissions...</p>
          ) : filteredCardUsers.length === 0 ? (
            <p>{cardSubmissionUsers.length === 0 ? 'No card submissions found.' : 'No matching users found.'}</p>
          ) : (
            <div className="admin-entity-list" role="list" aria-label="Card submission users">
              {filteredCardUsers.map((member) => {
                const isOpen = selectedCardSubmissionMemberId === member.memberId

                return (
                  <article className="admin-detail-card withdrawal-admin-card" key={member.memberId}>
                    <button
                      type="button"
                      className={`admin-entity-item withdrawal-summary-row ${isOpen ? 'active' : ''}`}
                      onClick={() => setSelectedCardSubmissionMemberId((previousId) => (previousId === member.memberId ? '' : member.memberId))}
                    >
                      <span className="admin-entity-name">{member.fullName || 'User'}</span>
                      <span className="admin-entity-role">{member.role || '-'} | Entries: {member.submissions?.length || 0}</span>
                    </button>

                    {isOpen ? (
                      <div className="withdrawal-admin-expanded">
                        <div className="admin-detail-grid">
                          <div>
                            <span>Email</span>
                            <strong>{member.email || '-'}</strong>
                          </div>
                          <div>
                            <span>Mobile</span>
                            <strong>{member.mobileNumber || '-'}</strong>
                          </div>
                          <div>
                            <span>Block</span>
                            <strong>{member.blockName || '-'}</strong>
                          </div>
                          <div>
                            <span>Village</span>
                            <strong>{member.villageName || '-'}</strong>
                          </div>
                          <div>
                            <span>Referral ID</span>
                            <strong>{member.referralCode || '-'}</strong>
                          </div>
                        </div>

                        <div className="transaction-list">
                          {(member.submissions || []).length === 0 ? (
                            <p>No card entries found for this user.</p>
                          ) : (
                            <>
                              <div className="admin-multi-select-bar">
                                <label className="admin-select-all-label" htmlFor={`card-select-all-${member.memberId}`}>
                                  <input
                                    id={`card-select-all-${member.memberId}`}
                                    type="checkbox"
                                    checked={(selectedCardSubmissionIdsByMember[member.memberId] || []).length > 0
                                      && (selectedCardSubmissionIdsByMember[member.memberId] || []).length === (member.submissions || []).length}
                                    onChange={(event) => {
                                      const checked = event.target.checked
                                      setSelectedCardSubmissionIdsByMember((previous) => ({
                                        ...previous,
                                        [member.memberId]: checked ? (member.submissions || []).map((entry) => entry.id) : [],
                                      }))
                                    }}
                                  />
                                  Select All
                                </label>
                                <button
                                  type="button"
                                  className="admin-secondary-btn admin-danger-btn"
                                  onClick={() => handleDeleteCardSubmissionEntries(selectedCardSubmissionIdsByMember[member.memberId] || [], member.memberId)}
                                  disabled={deletingCardSubmissionEntries || (selectedCardSubmissionIdsByMember[member.memberId] || []).length === 0}
                                >
                                  {deletingCardSubmissionEntries ? 'Deleting...' : 'Delete Selected'}
                                </button>
                              </div>

                              {(member.submissions || []).map((entry) => (
                                <article key={entry.id} className="transaction-item credit admin-card-submission-item">
                                  <div className="transaction-item-main">
                                    <input
                                      type="checkbox"
                                      checked={(selectedCardSubmissionIdsByMember[member.memberId] || []).includes(entry.id)}
                                      onChange={() => toggleCardSubmissionSelection(member.memberId, entry.id)}
                                      aria-label="Select card submission entry"
                                      disabled={deletingCardSubmissionEntries}
                                    />
                                    <div>
                                      <h4>Saved at: {new Date(entry.createdAt).toLocaleString()}</h4>
                                      <p>Mobile: {entry.mobileNumber || '-'}</p>
                                      <p>Date of Birth: {entry.dateOfBirth || '-'}</p>
                                    </div>
                                  </div>
                                  <div className="transaction-entry-actions">
                                    {entry.cardPhotoUrl ? (
                                      <img className="admin-card-submission-image" src={entry.cardPhotoUrl} alt={`${member.fullName || 'User'} card`} />
                                    ) : (
                                      <span>No photo</span>
                                    )}
                                    <button
                                      type="button"
                                      className="admin-secondary-btn admin-danger-btn"
                                      onClick={() => handleDeleteCardSubmissionEntries([entry.id], member.memberId)}
                                      disabled={deletingCardSubmissionEntries}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </article>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </article>
                )
              })}
            </div>
          )}
        </section>
      )
    }

    if (activeSection === 'rewards') {
      return (
        <section className="admin-content-card admin-page-rewards admin-panel-card">
          <div className="saved-blocks-header">
            <div>
              <h2>Reward Settings</h2>
              <p>Set the auto-credit values used across block and member registration flows.</p>
            </div>
            <button type="button" className="admin-secondary-btn" onClick={fetchRewardSettings} disabled={loadingRewardSettings}>
              {loadingRewardSettings ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="admin-panel-note admin-panel-note-green">
            <span className="admin-panel-badge admin-panel-badge-green">Wallet Rewards</span>
            <p>These values directly control the amounts credited to wallets during user registration.</p>
          </div>

          <form className="block-form" onSubmit={handleSaveRewardSettings}>
            <div className="register-form-grid">
              <div className="register-field register-field-full">
                <button
                  type="button"
                  className={`role-expand-toggle ${rewardSectionOpen.blockFlow ? 'open' : ''}`}
                  onClick={() => setRewardSectionOpen((prev) => ({ ...prev, blockFlow: !prev.blockFlow }))}
                  aria-expanded={rewardSectionOpen.blockFlow}
                >
                  Block Flow Rewards
                </button>
              </div>

              {rewardSectionOpen.blockFlow ? (
                <>
                  <div className="register-field">
                    <label htmlFor="reward-direct-referral-vcap">direct refferal for V-C. A. P.</label>
                    <input
                      id="reward-direct-referral-vcap"
                      type="number"
                      min="0"
                      value={rewardSettings.directReferralForVcap}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, directReferralForVcap: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-c-block">bonus reward for village C. (from block)</label>
                    <input
                      id="reward-bonus-village-c-block"
                      type="number"
                      min="0"
                      value={rewardSettings.blockVillageCoordinatorBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, blockVillageCoordinatorBonus: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-a-block">bonus reward for village A. (from block)</label>
                    <input
                      id="reward-bonus-village-a-block"
                      type="number"
                      min="0"
                      value={rewardSettings.blockVillageAdvisorBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, blockVillageAdvisorBonus: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-p-block">bonus reward for village P. (from block)</label>
                    <input
                      id="reward-bonus-village-p-block"
                      type="number"
                      min="0"
                      value={rewardSettings.blockVillageProMediaBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, blockVillageProMediaBonus: event.target.value }))}
                      required
                    />
                  </div>
                </>
              ) : null}

              <div className="register-field register-field-full">
                <button
                  type="button"
                  className={`role-expand-toggle ${rewardSectionOpen.memberFlow ? 'open' : ''}`}
                  onClick={() => setRewardSectionOpen((prev) => ({ ...prev, memberFlow: !prev.memberFlow }))}
                  aria-expanded={rewardSectionOpen.memberFlow}
                >
                  Member Flow Rewards
                </button>
              </div>

              {rewardSectionOpen.memberFlow ? (
                <>
                  <div className="register-field">
                    <label htmlFor="reward-direct-referral-member">direct refferal for m to m</label>
                    <input
                      id="reward-direct-referral-member"
                      type="number"
                      min="0"
                      value={rewardSettings.directReferralForMemberToMember}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, directReferralForMemberToMember: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-c-member">bonus reward for village C. (from member)</label>
                    <input
                      id="reward-bonus-village-c-member"
                      type="number"
                      min="0"
                      value={rewardSettings.memberVillageCoordinatorBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, memberVillageCoordinatorBonus: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-a-member">bonus reward for village A. (from member)</label>
                    <input
                      id="reward-bonus-village-a-member"
                      type="number"
                      min="0"
                      value={rewardSettings.memberVillageAdvisorBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, memberVillageAdvisorBonus: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-p-member">bonus reward for village P. (from member)</label>
                    <input
                      id="reward-bonus-village-p-member"
                      type="number"
                      min="0"
                      value={rewardSettings.memberVillageProMediaBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, memberVillageProMediaBonus: event.target.value }))}
                      required
                    />
                  </div>
                </>
              ) : null}

              <div className="register-field register-field-full">
                <button
                  type="button"
                  className={`role-expand-toggle ${rewardSectionOpen.teamLeaderFlow ? 'open' : ''}`}
                  onClick={() => setRewardSectionOpen((prev) => ({ ...prev, teamLeaderFlow: !prev.teamLeaderFlow }))}
                  aria-expanded={rewardSectionOpen.teamLeaderFlow}
                >
                  Team Leader Flow Rewards
                </button>
              </div>

              {rewardSectionOpen.teamLeaderFlow ? (
                <>
                  <div className="register-field">
                    <label htmlFor="reward-team-leader-upgrade-count">team leader upgrade registration count</label>
                    <input
                      id="reward-team-leader-upgrade-count"
                      type="number"
                      min="1"
                      value={rewardSettings.teamLeaderUpgradeRegistrationCount}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, teamLeaderUpgradeRegistrationCount: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-direct-referral-team-leader">direct refferal for team leader</label>
                    <input
                      id="reward-direct-referral-team-leader"
                      type="number"
                      min="0"
                      value={rewardSettings.teamLeaderDirectReferral}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, teamLeaderDirectReferral: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-c-team-leader">bonus reward for village C. (from team leader)</label>
                    <input
                      id="reward-bonus-village-c-team-leader"
                      type="number"
                      min="0"
                      value={rewardSettings.teamLeaderVillageCoordinatorBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, teamLeaderVillageCoordinatorBonus: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-a-team-leader">bonus reward for village A. (from team leader)</label>
                    <input
                      id="reward-bonus-village-a-team-leader"
                      type="number"
                      min="0"
                      value={rewardSettings.teamLeaderVillageAdvisorBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, teamLeaderVillageAdvisorBonus: event.target.value }))}
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="reward-bonus-village-p-team-leader">bonus reward for village P. (from team leader)</label>
                    <input
                      id="reward-bonus-village-p-team-leader"
                      type="number"
                      min="0"
                      value={rewardSettings.teamLeaderVillageProMediaBonus}
                      onChange={(event) => setRewardSettings((prev) => ({ ...prev, teamLeaderVillageProMediaBonus: event.target.value }))}
                      required
                    />
                  </div>
                </>
              ) : null}
            </div>

            <button type="submit" className="admin-submit-btn" disabled={savingRewardSettings}>
              {savingRewardSettings ? 'Saving...' : 'Save Reward Settings'}
            </button>
          </form>
        </section>
      )
    }

    return (
      <section className="admin-content-card admin-page-saved admin-panel-card">
        <div className="saved-blocks-header">
          <div>
            <h2>Saved Blocks</h2>
            <p>Visible block cards with quick village overview and block delete control.</p>
          </div>
          <button type="button" className="admin-secondary-btn" onClick={fetchBlocks} disabled={loadingBlocks}>
            {loadingBlocks ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {loadingBlocks ? (
          <p>Loading blocks...</p>
        ) : (
          <div className="saved-block-list">
            {savedBlocks.length === 0 ? (
              <p>No block records yet.</p>
            ) : (
              savedBlocks.map((block) => (
                <article className="saved-block-item" key={block._id}>
                  <div className="saved-block-item-head">
                    <div>
                      <h3>{block.blockName}</h3>
                      <p>{block.districtName || MORADABAD_DISTRICT_NAME} → {block.tehsilName || '-'}</p>
                    </div>
                    <div className="saved-block-item-actions">
                      <button
                        type="button"
                        className={`role-expand-toggle ${expandedSavedBlockId === block._id ? 'open' : ''}`}
                        onClick={() => handleToggleSavedBlock(block)}
                        aria-expanded={expandedSavedBlockId === block._id}
                      >
                        {expandedSavedBlockId === block._id ? 'Hide Details' : 'Edit Block'}
                      </button>
                      <button
                        type="button"
                        className="admin-danger-btn saved-block-delete-btn"
                        onClick={() => handleDeleteBlock(block._id, block.blockName)}
                        disabled={deletingBlockId === block._id}
                      >
                        {deletingBlockId === block._id ? 'Deleting...' : 'Delete Block'}
                      </button>
                    </div>
                  </div>

                  {expandedSavedBlockId === block._id ? (
                    <div className="saved-block-edit-panel">
                      <div className="saved-block-edit-grid">
                        <label htmlFor={`saved-district-${block._id}`}>District</label>
                        <input
                          id={`saved-district-${block._id}`}
                          type="text"
                          value={savedBlockDrafts[block._id]?.districtName || ''}
                          onChange={(event) => handleSavedBlockDraftChange(block._id, { districtName: event.target.value })}
                        />

                        <label htmlFor={`saved-tehsil-${block._id}`}>Tehsil</label>
                        <input
                          id={`saved-tehsil-${block._id}`}
                          type="text"
                          value={savedBlockDrafts[block._id]?.tehsilName || ''}
                          onChange={(event) => handleSavedBlockDraftChange(block._id, { tehsilName: event.target.value })}
                        />

                        <label htmlFor={`saved-block-${block._id}`}>Block Name</label>
                        <input
                          id={`saved-block-${block._id}`}
                          type="text"
                          value={savedBlockDrafts[block._id]?.blockName || ''}
                          onChange={(event) => handleSavedBlockDraftChange(block._id, { blockName: event.target.value })}
                        />
                      </div>

                      <div className="saved-block-village-tools">
                        <label htmlFor={`saved-village-input-${block._id}`}>Add Village</label>
                        <div className="village-upload-row saved-block-village-upload-row">
                          <label className="admin-secondary-btn village-upload-btn">
                            {importingVillageTargetId === block._id ? 'Importing...' : 'Upload Excel'}
                            <input
                              type="file"
                              accept=".xlsx,.xls"
                              onChange={(event) => handleImportVillagesForSavedBlock(block._id, event)}
                            />
                          </label>
                          <span className="village-upload-hint">Upload the same file format to bulk add villages.</span>
                        </div>
                        <div className="village-input-row">
                          <input
                            id={`saved-village-input-${block._id}`}
                            type="text"
                            value={savedBlockDrafts[block._id]?.newVillageInput || ''}
                            onChange={(event) => handleSavedBlockDraftChange(block._id, { newVillageInput: event.target.value })}
                            placeholder="Enter village name"
                          />
                          <button
                            type="button"
                            className="admin-secondary-btn"
                            onClick={() => handleAddVillageToSavedBlock(block._id)}
                          >
                            Add Village
                          </button>
                        </div>
                      </div>

                      <div className="saved-village-list">
                        {(savedBlockDrafts[block._id]?.villages || []).map((village) => (
                          <span key={`${block._id}-${village}`}>
                            {village}
                            <button
                              type="button"
                              className="saved-village-delete"
                              onClick={() => handleRemoveVillageFromSavedBlock(block._id, village)}
                              aria-label={`Remove ${village}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="saved-block-edit-actions">
                        <button
                          type="button"
                          className="admin-submit-btn"
                          onClick={() => handleSaveEditedBlock(block._id)}
                          disabled={savingEditedBlockId === block._id}
                        >
                          {savingEditedBlockId === block._id ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </article>
              ))
            )}
          </div>
        )}
      </section>
    )
  }

  return (
    <main className="admin-page-shell admin-dashboard-view">
      <div className="dashboard-mobile-topbar">
        <Link to="/" aria-label="Go to home" onClick={() => setMobileDashboardMenuOpen(false)}>
          <img src={siteLogo} alt="Portal Logo" className="dashboard-mobile-logo" />
        </Link>
        <button
          type="button"
          className="dashboard-mobile-menu-toggle"
          onClick={() => setMobileDashboardMenuOpen((open) => !open)}
          aria-expanded={mobileDashboardMenuOpen}
          aria-label="Toggle dashboard menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="dashboard-mobile-welcome-strip">
        Welcome, Admin
      </div>

      {mobileDashboardMenuOpen ? (
        <>
          <button
            type="button"
            className="dashboard-mobile-menu-backdrop"
            onClick={() => setMobileDashboardMenuOpen(false)}
            aria-label="Close dashboard menu"
          />
          <div className="dashboard-mobile-menu-panel">
            <button type="button" className={`admin-menu-btn ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={() => handleAdminSectionChange('dashboard')}>Dashboard</button>
            <button type="button" className={`admin-menu-btn ${activeSection === 'blocks' ? 'active' : ''}`} onClick={() => handleAdminSectionChange('blocks')}>Add Block & Villages</button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'saved' ? 'active' : ''}`}
              onClick={() => {
                handleAdminSectionChange('saved')
                fetchBlocks()
              }}
            >
              Saved Blocks
            </button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'management' ? 'active' : ''}`}
              onClick={() => {
                handleAdminSectionChange('management')
                fetchManagementData()
              }}
            >
              Manage Users
            </button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'pendingRequests' ? 'active' : ''}`}
              onClick={() => {
                handleAdminSectionChange('pendingRequests')
                fetchManagementData()
              }}
            >
              Pending Requests
            </button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'volunteers' ? 'active' : ''}`}
              onClick={() => {
                handleAdminSectionChange('volunteers')
                fetchManagementData()
              }}
            >
              Volunteers
            </button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'withdrawals' ? 'active' : ''}`}
              onClick={() => {
                handleAdminSectionChange('withdrawals')
                fetchWithdrawalRequests()
              }}
            >
              Withdrawal Requests
            </button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'walletHistory' ? 'active' : ''}`}
              onClick={() => {
                handleAdminSectionChange('walletHistory')
                fetchAllWalletHistory()
              }}
            >
              Wallet History
            </button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'cardSubmissions' ? 'active' : ''}`}
              onClick={() => {
                handleAdminSectionChange('cardSubmissions')
                fetchCardSubmissions()
              }}
            >
              Card Submissions
            </button>
            <button
              type="button"
              className={`admin-menu-btn ${activeSection === 'rewards' ? 'active' : ''}`}
              onClick={() => {
                handleAdminSectionChange('rewards')
                fetchRewardSettings()
              }}
            >
              Reward Settings
            </button>
            <button type="button" className="admin-logout-btn admin-left-logout" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : null}

      <section className="admin-layout-shell">
        <aside className="admin-left-menu">
          <div className="admin-hero-label">Admin Portal</div>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'blocks' ? 'active' : ''}`}
            onClick={() => setActiveSection('blocks')}
          >
            Add Block & Villages
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'saved' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('saved')
              fetchBlocks()
            }}
          >
            Saved Blocks
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'management' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('management')
              fetchManagementData()
            }}
          >
            Manage Users
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'pendingRequests' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('pendingRequests')
              fetchManagementData()
            }}
          >
            Pending Requests
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'volunteers' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('volunteers')
              fetchManagementData()
            }}
          >
            Volunteers
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'withdrawals' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('withdrawals')
              fetchWithdrawalRequests()
            }}
          >
            Withdrawal Requests
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'walletHistory' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('walletHistory')
              fetchAllWalletHistory()
            }}
          >
            Wallet History
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'cardSubmissions' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('cardSubmissions')
              fetchCardSubmissions()
            }}
          >
            Card Submissions
          </button>
          <button
            type="button"
            className={`admin-menu-btn ${activeSection === 'rewards' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('rewards')
              fetchRewardSettings()
            }}
          >
            Reward Settings
          </button>

          <button type="button" className="admin-logout-btn admin-left-logout" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <div className="admin-right-content">
          {(adminMessage || adminError) && (
            <div className={`admin-status-banner ${adminError ? 'error' : 'success'}`}>
              {adminError || adminMessage}
            </div>
          )}
          {renderRightContent()}
        </div>
      </section>
    </main>
  )
}

function BlockLoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showApprovalPopup, setShowApprovalPopup] = useState(false)
  const [approvalPopupMessage, setApprovalPopupMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')

    if (!normalizeText(email) || !normalizeText(password)) {
      setError('All fields are required')
      return
    }

    if (!isValidEmail(email)) {
      setError('Enter a valid email address that includes @')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Invalid block login credentials')
      }

      onLogin(data.data)
      navigate('/block-dashboard', { replace: true })
    } catch (loginError) {
      const loginErrorMessage = loginError.message || 'Block login failed'
      const isPendingApprovalError = /pending approval|not approved/i.test(loginErrorMessage)

      if (isPendingApprovalError) {
        setApprovalPopupMessage('Registration successful. Please wait for approval before login.')
        setShowApprovalPopup(true)
        setError('')
      } else {
        setError(loginErrorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="login-page-shell">
      <div className="login-card">
        <div className="login-card-header">
          <h2>Block Login</h2>
          <p>Sign in to open your block dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form page-login-form">
          <label htmlFor="block-login-email">Email</label>
          <input
            id="block-login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            required
          />

          <label htmlFor="block-login-password">Password</label>
          <input
            id="block-login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />

          {error && <p className="admin-error-text">{error}</p>}

          <div className="admin-form-actions login-form-actions">
            <Link to="/" className="admin-cancel-btn login-cancel-link">
              Back to Home
            </Link>
            <button type="submit" className="admin-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </div>

          <p className="auth-switch-text">
            Not registered? <Link to="/block-register" className="auth-switch-link">Register here</Link>
          </p>
        </form>
      </div>

      {showApprovalPopup ? (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="block-login-pending-title">
          <div className="admin-modal block-register-success-modal">
            <h3 id="block-login-pending-title">Approval Pending</h3>
            <p className="block-register-success-message">
              {approvalPopupMessage || 'Registration successful. Please wait for approval before login.'}
            </p>
            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-submit-btn"
                onClick={() => setShowApprovalPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function BlockRegisterPage() {
  const navigate = useNavigate()
  const [blocks, setBlocks] = useState([])
  const [loadingBlocks, setLoadingBlocks] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedStateName, setSelectedStateName] = useState(UP_STATE_NAME)
  const [selectedDistrictName, setSelectedDistrictName] = useState('')
  const [selectedTehsilName, setSelectedTehsilName] = useState('')
  const [blockId, setBlockId] = useState('')
  const [villageName, setVillageName] = useState('')
  const [role, setRole] = useState('village coordinator')
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [aadhaarDocumentDataUrl, setAadhaarDocumentDataUrl] = useState('')
  const [aadhaarDocumentName, setAadhaarDocumentName] = useState('')
  const [idProofType, setIdProofType] = useState('pan')
  const [panNumber, setPanNumber] = useState('')
  const [panDocumentDataUrl, setPanDocumentDataUrl] = useState('')
  const [panDocumentName, setPanDocumentName] = useState('')
  const [domicileDocumentDataUrl, setDomicileDocumentDataUrl] = useState('')
  const [domicileDocumentName, setDomicileDocumentName] = useState('')
  const [profilePhotoDataUrl, setProfilePhotoDataUrl] = useState('')
  const [profilePhotoName, setProfilePhotoName] = useState('')

  const indianStates = useMemo(() => State.getStatesOfCountry(INDIA_CODE), [])

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blocks`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load blocks')
        }

        setBlocks(data.data || [])
      } catch (loadError) {
        setError(loadError.message || 'Failed to load blocks')
      } finally {
        setLoadingBlocks(false)
      }
    }

    loadBlocks()
  }, [])

  const blocksByState = useMemo(
    () => blocks.filter((block) => normalizeHierarchyKey(block.stateName || UP_STATE_NAME) === normalizeHierarchyKey(selectedStateName)),
    [blocks, selectedStateName],
  )

  const tehsilOptions = useMemo(() => {
    const tehsilMap = new Map()
    blocksByState
      .filter((block) => normalizeHierarchyKey(block.districtName) === normalizeHierarchyKey(selectedDistrictName))
      .forEach((block) => {
        const tehsil = String(block.tehsilName || '').trim()
        const key = normalizeHierarchyKey(tehsil)
        if (tehsil && !tehsilMap.has(key)) {
          tehsilMap.set(key, tehsil)
        }
      })
    return Array.from(tehsilMap.values()).sort((a, b) => a.localeCompare(b))
  }, [blocksByState, selectedDistrictName])

  const blockOptions = useMemo(
    () => blocksByState
      .filter((block) => normalizeHierarchyKey(block.districtName) === normalizeHierarchyKey(selectedDistrictName))
      .filter((block) => normalizeHierarchyKey(block.tehsilName) === normalizeHierarchyKey(selectedTehsilName))
      .sort((a, b) => String(a.blockName || '').localeCompare(String(b.blockName || ''))),
    [blocksByState, selectedDistrictName, selectedTehsilName],
  )

  useEffect(() => {
    if (
      selectedDistrictName
      && normalizeHierarchyKey(selectedDistrictName) !== normalizeHierarchyKey(MORADABAD_DISTRICT_NAME)
    ) {
      setSelectedDistrictName('')
    }
  }, [selectedDistrictName])

  useEffect(() => {
    if (!tehsilOptions.some((tehsil) => normalizeHierarchyKey(tehsil) === normalizeHierarchyKey(selectedTehsilName))) {
      setSelectedTehsilName('')
    }
  }, [tehsilOptions, selectedTehsilName])

  useEffect(() => {
    if (!blockOptions.some((block) => block._id === blockId)) {
      setBlockId('')
      setVillageName('')
    }
  }, [blockOptions, blockId])

  useEffect(() => {
    setVillageName('')
  }, [blockId])

  const selectedBlock = blockOptions.find((block) => block._id === blockId)
  const availableVillages = selectedBlock?.villages || []

  const handleRegistrationFileChange = async (event, setDataUrl, setName, acceptedPrefix) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) {
      setDataUrl('')
      setName('')
      return
    }

    if (acceptedPrefix === 'image/' && !selectedFile.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    if (acceptedPrefix === 'doc/' && !(selectedFile.type.startsWith('image/') || selectedFile.type === 'application/pdf')) {
      setError('Please upload a PDF or image file')
      return
    }

    try {
      const dataUrl = await fileToDataUrl(selectedFile)
      setDataUrl(dataUrl)
      setName(selectedFile.name || '')
      setError('')
    } catch (fileError) {
      setError(fileError.message || 'Failed to read file')
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!isValidEmail(email)) {
      setError('Enter a valid email address that includes @')
      return
    }

    if (!isValidMobile(mobileNumber)) {
      setError('Mobile number must be exactly 10 digits')
      return
    }

    if (!isValidAadhaar(aadhaarNumber)) {
      setError('Aadhaar number must be exactly 12 digits')
      return
    }

    if (!aadhaarDocumentDataUrl) {
      setError('Aadhaar document upload is required')
      return
    }

    if (!profilePhotoDataUrl) {
      setError('Profile photo upload is required')
      return
    }

    if (idProofType === 'pan') {
      if (!isValidPan(panNumber)) {
        setError('PAN number format is invalid')
        return
      }

      if (!panDocumentDataUrl) {
        setError('PAN document upload is required')
        return
      }
    }

    if (idProofType === 'domicile' && !domicileDocumentDataUrl) {
      setError('Domicile certificate upload is required')
      return
    }

    if (!selectedStateName || !selectedDistrictName || !selectedTehsilName || !blockId || !villageName) {
      setError('Please select state, district, tehsil, block and village')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          mobileNumber,
          password,
          confirmPassword,
          stateName: selectedStateName,
          districtName: selectedDistrictName,
          tehsilName: selectedTehsilName,
          blockId,
          villageName,
          role,
          aadhaarNumber,
          aadhaarDocumentDataUrl,
          aadhaarDocumentName,
          idProofType,
          panNumber,
          panDocumentDataUrl,
          panDocumentName,
          domicileDocumentDataUrl,
          domicileDocumentName,
          profilePhotoDataUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setSuccess(data.message || 'Registration successful. Please wait for approval.')
      setShowSuccessPopup(true)
      setFullName('')
      setEmail('')
      setMobileNumber('')
      setPassword('')
      setConfirmPassword('')
      setVillageName('')
      setAadhaarNumber('')
      setAadhaarDocumentDataUrl('')
      setAadhaarDocumentName('')
      setIdProofType('pan')
      setPanNumber('')
      setPanDocumentDataUrl('')
      setPanDocumentName('')
      setDomicileDocumentDataUrl('')
      setDomicileDocumentName('')
      setProfilePhotoDataUrl('')
      setProfilePhotoName('')
    } catch (registerError) {
      setError(registerError.message || 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="login-page-shell">
      <div className="login-card block-register-card">
        <div className="login-card-header">
          <h2>Block Registration</h2>
          <p>Create your account and select your block, village, and role.</p>
        </div>

        <form onSubmit={handleRegister} className="admin-login-form block-register-form">
          <div className="register-form-grid">
            <div className="register-field">
              <label htmlFor="register-name">Name</label>
              <input id="register-name" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full name" required />
            </div>
            <div className="register-field">
              <label htmlFor="register-email">Email</label>
              <input id="register-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" required />
            </div>
            <div className="register-field">
              <label htmlFor="register-mobile">Mobile Number</label>
              <input id="register-mobile" type="text" value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} placeholder="10 digit mobile number" required />
            </div>
            <div className="register-field">
              <label htmlFor="register-password">Password</label>
              <input id="register-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
            </div>
            <div className="register-field">
              <label htmlFor="register-confirm-password">Confirm Password</label>
              <input id="register-confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" required />
            </div>
            <div className="register-field">
              <label htmlFor="register-state">State</label>
              <select id="register-state" value={selectedStateName} onChange={(event) => setSelectedStateName(event.target.value)} required>
                {indianStates.map((stateItem) => {
                  const isUP = normalizeHierarchyKey(stateItem.name) === normalizeHierarchyKey(UP_STATE_NAME)
                  return (
                    <option key={stateItem.isoCode} value={stateItem.name} disabled={!isUP}>
                      {stateItem.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="register-field">
              <label htmlFor="register-district">District</label>
              <select id="register-district" value={selectedDistrictName} onChange={(event) => setSelectedDistrictName(event.target.value)} required>
                <option value="">Select district</option>
                {UP_DISTRICTS.map((district) => {
                  const isMoradabad = normalizeHierarchyKey(district) === normalizeHierarchyKey(MORADABAD_DISTRICT_NAME)
                  return (
                    <option key={district} value={district} disabled={!isMoradabad}>
                      {district}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="register-field">
              <label htmlFor="register-tehsil">Tehsil</label>
              <select id="register-tehsil" value={selectedTehsilName} onChange={(event) => setSelectedTehsilName(event.target.value)} disabled={!selectedDistrictName} required>
                <option value="">{selectedDistrictName ? 'Select tehsil' : 'Select district first'}</option>
                {tehsilOptions.map((tehsil) => (
                  <option key={tehsil} value={tehsil}>
                    {tehsil}
                  </option>
                ))}
              </select>
            </div>
            <div className="register-field">
              <label htmlFor="register-block">Block</label>
              <select id="register-block" value={blockId} onChange={(event) => setBlockId(event.target.value)} disabled={!selectedTehsilName} required>
                <option value="">{selectedTehsilName ? 'Select block' : 'Select tehsil first'}</option>
                {blockOptions.map((block) => (
                  <option key={block._id} value={block._id}>{block.blockName}</option>
                ))}
              </select>
            </div>
            <div className="register-field">
              <label htmlFor="register-village">Village</label>
              <select id="register-village" value={villageName} onChange={(event) => setVillageName(event.target.value)} disabled={!selectedBlock} required>
                <option value="">{selectedBlock ? 'Select village' : 'Select block first'}</option>
                {availableVillages.map((village) => (
                  <option key={village} value={village}>{village}</option>
                ))}
              </select>
            </div>
            <div className="register-field register-field-full">
              <label htmlFor="register-role">Role</label>
              <select id="register-role" value={role} onChange={(event) => setRole(event.target.value)} required>
                <option value="village coordinator">Village Co-ordinator</option>
                <option value="technical advisor">Technical Advisor</option>
                <option value="pro media">PRO Media</option>
              </select>
            </div>
            <div className="register-field">
              <label htmlFor="register-aadhaar-number">Aadhaar Number</label>
              <input
                id="register-aadhaar-number"
                type="text"
                value={aadhaarNumber}
                onChange={(event) => setAadhaarNumber(event.target.value)}
                placeholder="12 digit Aadhaar number"
                required
              />
            </div>
            <div className="register-field">
              <label htmlFor="register-aadhaar-upload">Aadhaar Document (PDF/Image)</label>
              <input
                id="register-aadhaar-upload"
                type="file"
                accept="application/pdf,image/*"
                onChange={(event) => handleRegistrationFileChange(event, setAadhaarDocumentDataUrl, setAadhaarDocumentName, 'doc/')}
                required
              />
              {aadhaarDocumentName ? <small>{aadhaarDocumentName}</small> : null}
            </div>
            <div className="register-field">
              <label htmlFor="register-proof-type">Identity Proof Type</label>
              <select id="register-proof-type" value={idProofType} onChange={(event) => setIdProofType(event.target.value)} required>
                <option value="pan">PAN Card</option>
                <option value="domicile">Domicile Certificate</option>
              </select>
            </div>
            {idProofType === 'pan' ? (
              <>
                <div className="register-field">
                  <label htmlFor="register-pan-number">PAN Number</label>
                  <input
                    id="register-pan-number"
                    type="text"
                    value={panNumber}
                    onChange={(event) => setPanNumber(event.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    required
                  />
                </div>
                <div className="register-field">
                  <label htmlFor="register-pan-upload">PAN Document (PDF/Image)</label>
                  <input
                    id="register-pan-upload"
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(event) => handleRegistrationFileChange(event, setPanDocumentDataUrl, setPanDocumentName, 'doc/')}
                    required
                  />
                  {panDocumentName ? <small>{panDocumentName}</small> : null}
                </div>
              </>
            ) : (
              <div className="register-field register-field-full">
                <label htmlFor="register-domicile-upload">Domicile Certificate (PDF/Image)</label>
                <input
                  id="register-domicile-upload"
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(event) => handleRegistrationFileChange(event, setDomicileDocumentDataUrl, setDomicileDocumentName, 'doc/')}
                  required
                />
                {domicileDocumentName ? <small>{domicileDocumentName}</small> : null}
              </div>
            )}
            <div className="register-field register-field-full">
              <label htmlFor="register-profile-photo">Profile Photo</label>
              <input
                id="register-profile-photo"
                type="file"
                accept="image/*"
                onChange={(event) => handleRegistrationFileChange(event, setProfilePhotoDataUrl, setProfilePhotoName, 'image/')}
                required
              />
              {profilePhotoName ? <small>{profilePhotoName}</small> : null}
            </div>
          </div>

          {error && <p className="admin-error-text">{error}</p>}

          <div className="admin-form-actions login-form-actions">
            <Link to="/block-login" className="admin-cancel-btn login-cancel-link">Back to Login</Link>
            <button type="submit" className="admin-submit-btn" disabled={submitting}>
              {submitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>

      {showSuccessPopup ? (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="block-register-success-title">
          <div className="admin-modal block-register-success-modal">
            <h3 id="block-register-success-title">Registration Successful</h3>
            <p className="block-register-success-message">
              {success || 'Registration successful. Please wait for approval.'}
            </p>
            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => setShowSuccessPopup(false)}
              >
                Stay Here
              </button>
              <button
                type="button"
                className="admin-submit-btn"
                onClick={() => navigate('/block-login', { replace: true })}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function AdvisorCoordinatorDashboard({ user, onLogout, portalLabel, logoutPath }) {
  const navigate = useNavigate()
  const isMemberDashboard = portalLabel === 'Member Portal'
  const isBlockDashboard = portalLabel === 'Block Portal'
  const isRoleDashboard = isMemberDashboard || isBlockDashboard
  const [activeSection, setActiveSection] = useState('dashboard')
  const [mobileDashboardMenuOpen, setMobileDashboardMenuOpen] = useState(false)
  const [availableBlocks, setAvailableBlocks] = useState([])
  const [registerStateName, setRegisterStateName] = useState(UP_STATE_NAME)
  const [registerDistrictName, setRegisterDistrictName] = useState('')
  const [registerTehsilName, setRegisterTehsilName] = useState('')
  const [selectedRegisterBlockId, setSelectedRegisterBlockId] = useState('')
  const [loadingVillages, setLoadingVillages] = useState(false)
  const [loadingWallet, setLoadingWallet] = useState(false)
  const [loadingRegistrations, setLoadingRegistrations] = useState(false)
  const [walletBalance, setWalletBalance] = useState(user?.walletBalance || 0)
  const [transactions, setTransactions] = useState([])
  const [myRegistrations, setMyRegistrations] = useState([])
  const [registrationSearchTerm, setRegistrationSearchTerm] = useState('')
  const [expandedRegistrationCards, setExpandedRegistrationCards] = useState({})
  const [dashboardMessage, setDashboardMessage] = useState('')
  const [dashboardError, setDashboardError] = useState('')
  const [roleSectionOpen, setRoleSectionOpen] = useState({
    cardForm: false,
    registerForm: false,
  })
  const [bankFormOpen, setBankFormOpen] = useState(true)
  const [bankDetailsLoading, setBankDetailsLoading] = useState(false)
  const [bankDetailsSaving, setBankDetailsSaving] = useState(false)
  const [bankDetailsLoaded, setBankDetailsLoaded] = useState(false)
  const [bankDetailsMessage, setBankDetailsMessage] = useState('')
  const [bankDetailsError, setBankDetailsError] = useState('')
  const [bankDetailsForm, setBankDetailsForm] = useState(() => createInitialBankDetailsState(user))
  const [registeringUser, setRegisteringUser] = useState(false)
  const [registerUserName, setRegisterUserName] = useState('')
  const [registerUserMobile, setRegisterUserMobile] = useState('')
  const [registerUserEmail, setRegisterUserEmail] = useState('')
  const [registerUserPassword, setRegisterUserPassword] = useState('')
  const [registerUserConfirmPassword, setRegisterUserConfirmPassword] = useState('')
  const [registerUserVillage, setRegisterUserVillage] = useState(user?.villageName || '')
  const [registerUserAadhaarNumber, setRegisterUserAadhaarNumber] = useState('')
  const [registerUserAadhaarDocumentDataUrl, setRegisterUserAadhaarDocumentDataUrl] = useState('')
  const [registerUserAadhaarDocumentName, setRegisterUserAadhaarDocumentName] = useState('')
  const [registerUserIdProofType, setRegisterUserIdProofType] = useState('pan')
  const [registerUserPanNumber, setRegisterUserPanNumber] = useState('')
  const [registerUserPanDocumentDataUrl, setRegisterUserPanDocumentDataUrl] = useState('')
  const [registerUserPanDocumentName, setRegisterUserPanDocumentName] = useState('')
  const [registerUserDomicileDocumentDataUrl, setRegisterUserDomicileDocumentDataUrl] = useState('')
  const [registerUserDomicileDocumentName, setRegisterUserDomicileDocumentName] = useState('')
  const [registerUserProfilePhotoDataUrl, setRegisterUserProfilePhotoDataUrl] = useState('')
  const [registerUserProfilePhotoName, setRegisterUserProfilePhotoName] = useState('')
  const [teamLeaderUpgradeCount, setTeamLeaderUpgradeCount] = useState(2)
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [withdrawalRequests, setWithdrawalRequests] = useState([])
  const [loadingWithdrawalRequests, setLoadingWithdrawalRequests] = useState(false)
  const [requestingWithdrawal, setRequestingWithdrawal] = useState(false)
  const [withdrawalPreviewOpen, setWithdrawalPreviewOpen] = useState(false)
  const [withdrawalFormMessage, setWithdrawalFormMessage] = useState('')
  const [withdrawalFormError, setWithdrawalFormError] = useState('')
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(user?.profilePhotoUrl || '')
  const [profilePhotoSaving, setProfilePhotoSaving] = useState(false)
  const [profilePhotoError, setProfilePhotoError] = useState('')
  const [profilePhotoMessage, setProfilePhotoMessage] = useState('')

  const indianStates = useMemo(() => State.getStatesOfCountry(INDIA_CODE), [])
  const blocksByState = useMemo(
    () => availableBlocks.filter((block) => normalizeHierarchyKey(block.stateName || UP_STATE_NAME) === normalizeHierarchyKey(registerStateName)),
    [availableBlocks, registerStateName],
  )

  const registerTehsilOptions = useMemo(() => {
    const tehsilMap = new Map()
    blocksByState
      .filter((block) => normalizeHierarchyKey(block.districtName) === normalizeHierarchyKey(registerDistrictName))
      .forEach((block) => {
        const tehsil = String(block.tehsilName || '').trim()
        const key = normalizeHierarchyKey(tehsil)
        if (tehsil && !tehsilMap.has(key)) {
          tehsilMap.set(key, tehsil)
        }
      })
    return Array.from(tehsilMap.values()).sort((a, b) => a.localeCompare(b))
  }, [blocksByState, registerDistrictName])

  const filteredRegisterBlocks = useMemo(
    () => blocksByState
      .filter((block) => normalizeHierarchyKey(block.districtName) === normalizeHierarchyKey(registerDistrictName))
      .filter((block) => normalizeHierarchyKey(block.tehsilName) === normalizeHierarchyKey(registerTehsilName))
      .sort((a, b) => String(a.blockName || '').localeCompare(String(b.blockName || ''))),
    [blocksByState, registerDistrictName, registerTehsilName],
  )

  const selectedRegisterBlock = useMemo(
    () => filteredRegisterBlocks.find((block) => block._id === selectedRegisterBlockId) || null,
    [filteredRegisterBlocks, selectedRegisterBlockId],
  )

  const memberVillageOptions = selectedRegisterBlock?.villages || []

  const filteredRegistrations = useMemo(() => {
    const query = registrationSearchTerm.trim().toLowerCase()
    if (!query) {
      return myRegistrations
    }

    return myRegistrations.filter((item) => [
      item.fullName,
      item.mobileNumber,
      item.email,
      item.blockName,
      item.villageName,
      item.registeredByName,
      item.referralCode,
    ]
      .some((value) => String(value || '').toLowerCase().includes(query)))
  }, [myRegistrations, registrationSearchTerm])

  const handleLogout = () => {
    onLogout()
    navigate(logoutPath, { replace: true })
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setMobileDashboardMenuOpen(false)
  }

  const toggleRoleSection = (sectionKey) => {
    setRoleSectionOpen((previous) => ({
      ...previous,
      [sectionKey]: !previous[sectionKey],
    }))
  }

  const toggleRegistrationCard = (registrationId) => {
    setExpandedRegistrationCards((previous) => ({
      ...previous,
      [registrationId]: !previous[registrationId],
    }))
  }

  const fetchBankDetails = async () => {
    if (!user?.id) {
      return
    }

    setBankDetailsLoading(true)
    setBankDetailsError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/card/${user.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load bank details')
      }

      const profile = data.data || {}
      setBankDetailsForm(createInitialBankDetailsState(user, profile))
      setBankDetailsLoaded(Boolean(
        profile.bankAccountHolderName
        || profile.bankName
        || profile.bankAccountNumber
        || profile.bankIfscCode
        || profile.bankBranchName
        || profile.bankUpiId,
      ))
    } catch (error) {
      setBankDetailsError(error.message || 'Failed to load bank details')
      setBankDetailsForm(createInitialBankDetailsState(user))
    } finally {
      setBankDetailsLoading(false)
    }
  }

  const fetchVillages = async () => {
    setLoadingVillages(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load village list')
      }

      const blocks = data.data || []
      setAvailableBlocks(blocks)

      const matchingRegistrarBlock = blocks.find(
        (block) => normalizeHierarchyKey(block.blockName) === normalizeHierarchyKey(user?.blockName),
      )
      setRegisterDistrictName(matchingRegistrarBlock?.districtName || '')
      setRegisterTehsilName(matchingRegistrarBlock?.tehsilName || '')
      setSelectedRegisterBlockId(matchingRegistrarBlock?._id || '')
    } catch (_error) {
      setAvailableBlocks([])
      setRegisterDistrictName('')
      setRegisterTehsilName('')
      setSelectedRegisterBlockId('')
    } finally {
      setLoadingVillages(false)
    }
  }

  useEffect(() => {
    if (
      registerDistrictName
      && normalizeHierarchyKey(registerDistrictName) !== normalizeHierarchyKey(MORADABAD_DISTRICT_NAME)
    ) {
      setRegisterDistrictName('')
    }
  }, [registerDistrictName])

  useEffect(() => {
    if (!registerTehsilOptions.some((tehsil) => normalizeHierarchyKey(tehsil) === normalizeHierarchyKey(registerTehsilName))) {
      setRegisterTehsilName('')
    }
  }, [registerTehsilOptions, registerTehsilName])

  useEffect(() => {
    if (!filteredRegisterBlocks.some((block) => block._id === selectedRegisterBlockId)) {
      setSelectedRegisterBlockId('')
      setRegisterUserVillage('')
    }
  }, [filteredRegisterBlocks, selectedRegisterBlockId])

  useEffect(() => {
    if (!memberVillageOptions.includes(registerUserVillage)) {
      setRegisterUserVillage(memberVillageOptions[0] || '')
    }
  }, [memberVillageOptions, registerUserVillage])

  useEffect(() => {
    fetchBankDetails()
  }, [user?.id])

  const fetchWalletHistory = async () => {
    if (!user?.id) {
      return
    }

    setLoadingWallet(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/wallet/${user.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch wallet data')
      }

      setWalletBalance(data.data?.member?.walletBalance || 0)
      setTransactions(data.data?.transactions || [])
    } catch (error) {
      setDashboardError(error.message || 'Failed to fetch wallet data')
    } finally {
      setLoadingWallet(false)
    }
  }

  const fetchRegistrationHistory = async () => {
    if (!user?.id) {
      return
    }

    setLoadingRegistrations(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/registrations/history/${user.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch registration history')
      }

      setMyRegistrations(data.data?.myRegistrations || [])
    } catch (error) {
      setDashboardError(error.message || 'Failed to fetch registration history')
    } finally {
      setLoadingRegistrations(false)
    }
  }

  const fetchWithdrawalRequests = async () => {
    if (!user?.id) {
      return
    }

    setLoadingWithdrawalRequests(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/withdrawals/${user.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch withdrawal requests')
      }

      setWithdrawalRequests(data.data?.requests || [])
    } catch (error) {
      setWithdrawalFormError(error.message || 'Failed to fetch withdrawal requests')
    } finally {
      setLoadingWithdrawalRequests(false)
    }
  }

  const fetchTeamLeaderUpgradeCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reward-settings`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch reward settings')
      }

      setTeamLeaderUpgradeCount(Math.max(1, Number(data.data?.teamLeaderUpgradeRegistrationCount) || 2))
    } catch (_error) {
      setTeamLeaderUpgradeCount(2)
    }
  }

  useEffect(() => {
    fetchVillages()
    fetchWalletHistory()
    fetchRegistrationHistory()
    fetchTeamLeaderUpgradeCount()
    fetchWithdrawalRequests()
  }, [user?.id])

  const calculateWithdrawalPreview = (value) => {
    const requestedAmount = Number(value)
    const taxDeductedAmount = Number((requestedAmount * 0.05).toFixed(2))
    const finalPayAmount = Number((requestedAmount - taxDeductedAmount).toFixed(2))

    return {
      requestedAmount,
      taxDeductedAmount,
      finalPayAmount,
    }
  }

  const handleWithdrawalRequestSubmit = async (event) => {
    event.preventDefault()
    setDashboardMessage('')
    setDashboardError('')
    setWithdrawalFormError('')

    const numericAmount = Number(withdrawalAmount)
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setWithdrawalFormError('Please enter a valid withdrawal amount')
      return
    }

    if (numericAmount > Number(walletBalance || 0)) {
      setWithdrawalFormError('Withdrawal amount cannot exceed your wallet balance')
      return
    }

    setWithdrawalPreviewOpen(true)
  }

  const confirmWithdrawalRequest = async () => {
    const numericAmount = Number(withdrawalAmount)
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setWithdrawalFormError('Please enter a valid withdrawal amount')
      return
    }

    setRequestingWithdrawal(true)
    setWithdrawalFormError('')
    setWithdrawalFormMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/withdrawals/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: numericAmount }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit withdrawal request')
      }

      setWithdrawalPreviewOpen(false)
      setWithdrawalAmount('')
      setWithdrawalFormMessage(data.message || 'Withdrawal request submitted successfully')
      setDashboardMessage(data.message || 'Withdrawal request submitted successfully')
      await fetchWithdrawalRequests()
      await fetchWalletHistory()
    } catch (error) {
      setWithdrawalFormError(error.message || 'Failed to submit withdrawal request')
    } finally {
      setRequestingWithdrawal(false)
    }
  }

  const uploadProfilePhotoDataUrl = async (profilePhotoDataUrl) => {
    if (!user?.id) {
      return
    }

    setProfilePhotoSaving(true)
    setProfilePhotoError('')
    setProfilePhotoMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/profile/${user.id}/photo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilePhotoDataUrl,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile photo')
      }

      setProfilePhotoUrl(data.data?.profilePhotoUrl || '')
      setProfilePhotoMessage(data.message || 'Profile photo updated successfully')
    } catch (error) {
      setProfilePhotoError(error.message || 'Failed to update profile photo')
    } finally {
      setProfilePhotoSaving(false)
    }
  }

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const sourceDataUrl = String(reader.result || '')
      if (!sourceDataUrl) {
        return
      }

      const image = new Image()
      image.onload = async () => {
        const maxWidth = 900
        const maxHeight = 900
        const widthRatio = maxWidth / image.width
        const heightRatio = maxHeight / image.height
        const scale = Math.min(1, widthRatio, heightRatio)
        const outputWidth = Math.max(1, Math.round(image.width * scale))
        const outputHeight = Math.max(1, Math.round(image.height * scale))

        const canvas = document.createElement('canvas')
        canvas.width = outputWidth
        canvas.height = outputHeight
        const context = canvas.getContext('2d')
        if (!context) {
          return
        }

        context.drawImage(image, 0, 0, outputWidth, outputHeight)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78)

        if (compressedDataUrl.length > 1_700_000) {
          setProfilePhotoError('Photo size is too large. Please choose a smaller image.')
          return
        }

        await uploadProfilePhotoDataUrl(compressedDataUrl)
      }
      image.src = sourceDataUrl
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleMemberRegistrationFileChange = async (event, setDataUrl, setName, acceptedPrefix) => {
    const selectedFile = event.target.files?.[0]
    event.target.value = ''

    if (!selectedFile) {
      setDataUrl('')
      setName('')
      return
    }

    if (acceptedPrefix === 'image/' && !selectedFile.type.startsWith('image/')) {
      setDashboardError('Please upload an image file')
      return
    }

    if (acceptedPrefix === 'doc/' && !(selectedFile.type.startsWith('image/') || selectedFile.type === 'application/pdf')) {
      setDashboardError('Please upload a PDF or image file')
      return
    }

    try {
      const dataUrl = await fileToDataUrl(selectedFile)
      setDataUrl(dataUrl)
      setName(selectedFile.name || '')
      setDashboardError('')
    } catch (fileError) {
      setDashboardError(fileError.message || 'Failed to read file')
    }
  }

  const handleRegisterUserSubmit = async (event) => {
    event.preventDefault()
    setDashboardMessage('')
    setDashboardError('')

    if (!registerUserName.trim() || !registerUserMobile.trim() || !registerUserEmail.trim() || !registerUserPassword.trim() || !registerUserConfirmPassword.trim() || !registerStateName || !registerDistrictName || !registerTehsilName || !selectedRegisterBlockId || !registerUserVillage.trim()) {
      setDashboardError('Please enter name, mobile, email, password, state, district, tehsil, block and village')
      return
    }

    if (!isValidEmail(registerUserEmail)) {
      setDashboardError('Enter a valid email address that includes @')
      return
    }

    if (!isValidMobile(registerUserMobile)) {
      setDashboardError('Mobile number must be exactly 10 digits')
      return
    }

    if (!isValidAadhaar(registerUserAadhaarNumber)) {
      setDashboardError('Aadhaar number must be exactly 12 digits')
      return
    }

    if (!registerUserAadhaarDocumentDataUrl) {
      setDashboardError('Aadhaar document upload is required')
      return
    }

    if (!registerUserProfilePhotoDataUrl) {
      setDashboardError('Profile photo upload is required')
      return
    }

    if (registerUserIdProofType === 'pan') {
      if (!isValidPan(registerUserPanNumber)) {
        setDashboardError('PAN number format is invalid')
        return
      }

      if (!registerUserPanDocumentDataUrl) {
        setDashboardError('PAN document upload is required')
        return
      }
    }

    if (registerUserIdProofType === 'domicile' && !registerUserDomicileDocumentDataUrl) {
      setDashboardError('Domicile certificate upload is required')
      return
    }

    if (registerUserPassword !== registerUserConfirmPassword) {
      setDashboardError('Passwords do not match')
      return
    }

    setRegisteringUser(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrarMemberId: user.id,
          fullName: registerUserName,
          mobileNumber: registerUserMobile,
          email: registerUserEmail,
          password: registerUserPassword,
          confirmPassword: registerUserConfirmPassword,
          stateName: registerStateName,
          districtName: registerDistrictName,
          tehsilName: registerTehsilName,
          selectedBlockId: selectedRegisterBlockId,
          villageName: registerUserVillage,
          aadhaarNumber: registerUserAadhaarNumber,
          aadhaarDocumentDataUrl: registerUserAadhaarDocumentDataUrl,
          aadhaarDocumentName: registerUserAadhaarDocumentName,
          idProofType: registerUserIdProofType,
          panNumber: registerUserPanNumber,
          panDocumentDataUrl: registerUserPanDocumentDataUrl,
          panDocumentName: registerUserPanDocumentName,
          domicileDocumentDataUrl: registerUserDomicileDocumentDataUrl,
          domicileDocumentName: registerUserDomicileDocumentName,
          profilePhotoDataUrl: registerUserProfilePhotoDataUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register user')
      }

      const registrationSuccessMessage = (data.message || 'Member registered successfully').replace(/\buser\b/gi, 'member')
      setDashboardMessage(registrationSuccessMessage)
      setRegisterUserName('')
      setRegisterUserMobile('')
      setRegisterUserEmail('')
      setRegisterUserPassword('')
      setRegisterUserConfirmPassword('')
      setRegisterUserAadhaarNumber('')
      setRegisterUserAadhaarDocumentDataUrl('')
      setRegisterUserAadhaarDocumentName('')
      setRegisterUserIdProofType('pan')
      setRegisterUserPanNumber('')
      setRegisterUserPanDocumentDataUrl('')
      setRegisterUserPanDocumentName('')
      setRegisterUserDomicileDocumentDataUrl('')
      setRegisterUserDomicileDocumentName('')
      setRegisterUserProfilePhotoDataUrl('')
      setRegisterUserProfilePhotoName('')
      await fetchWalletHistory()
      await fetchRegistrationHistory()
      setActiveSection('wallet')
    } catch (error) {
      setDashboardError(error.message || 'Failed to register user')
    } finally {
      setRegisteringUser(false)
    }
  }

  const handleBankFieldChange = (field) => (event) => {
    const value = field === 'bankIfscCode' ? event.target.value.toUpperCase() : event.target.value
    setBankDetailsForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const handleBankDetailsSubmit = async (event) => {
    event.preventDefault()

    setBankDetailsMessage('')
    setBankDetailsError('')

    if (!user?.id) {
      return
    }

    if (
      !bankDetailsForm.bankAccountHolderName.trim()
      || !bankDetailsForm.bankName.trim()
      || !bankDetailsForm.bankAccountNumber.trim()
      || !bankDetailsForm.bankIfscCode.trim()
      || !bankDetailsForm.bankBranchName.trim()
    ) {
      setBankDetailsError('Please fill account holder name, bank name, account number, IFSC code, and branch name')
      return
    }

    setBankDetailsSaving(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/card/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankDetailsForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save bank details')
      }

      const profile = data.data || {}
      setBankDetailsForm(createInitialBankDetailsState(user, profile))
      setBankDetailsLoaded(Boolean(
        profile.bankAccountHolderName
        || profile.bankName
        || profile.bankAccountNumber
        || profile.bankIfscCode
        || profile.bankBranchName
        || profile.bankUpiId,
      ))
      setBankDetailsMessage(data.message || 'Bank details saved successfully')
    } catch (error) {
      setBankDetailsError(error.message || 'Failed to save bank details')
    } finally {
      setBankDetailsSaving(false)
    }
  }

  const renderContent = () => {
    if (activeSection === 'profile') {
      const isTeamLeader = user?.role === 'team leader' || (user?.role === 'member' && myRegistrations.length >= teamLeaderUpgradeCount)
      const roleDisplay = isTeamLeader ? 'Team Leader' : user?.role === 'village coordinator' ? 'Village Co-ordinator' : user?.role === 'technical advisor' ? 'Technical Advisor' : user?.role === 'pro media' ? 'PRO Media' : user?.role === 'member' ? 'Member' : (user?.role || '-')
      return (
        <section className="admin-content-card role-section role-section-profile">
          <h2>Profile</h2>
          {isTeamLeader ? (
            <div className="premium-upgrade-badge" role="status" aria-live="polite">
              <span className="premium-upgrade-badge-icon" aria-hidden="true">◆</span>
              <span className="premium-upgrade-badge-label">Premium Badge</span>
              <span className="premium-upgrade-badge-separator" aria-hidden="true">•</span>
              <span className="premium-upgrade-badge-title">Profile upgraded</span>
            </div>
          ) : null}
          <div className="profile-photo-form">
            <div className="profile-photo-editor">
              <div className="profile-photo-preview-wrap">
                {profilePhotoUrl ? (
                  <img className="profile-photo-preview" src={profilePhotoUrl} alt="Profile" />
                ) : (
                  <div className="profile-photo-placeholder">No Profile Photo</div>
                )}
              </div>
              <label htmlFor="profile-photo-upload" className="profile-photo-edit-btn" aria-label="Edit profile photo">
                <span aria-hidden="true">✎</span>
              </label>
              <input
                id="profile-photo-upload"
                className="profile-photo-hidden-input"
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
              />
            </div>
            <div className="profile-photo-input-wrap">
              <label>Profile Photo</label>
              <p>Add or update your profile photo.</p>
              {profilePhotoSaving ? <p className="admin-panel-note-text">Uploading profile photo...</p> : null}
              {profilePhotoError ? <p className="admin-error-text">{profilePhotoError}</p> : null}
              {profilePhotoMessage ? <p className="admin-success-text">{profilePhotoMessage}</p> : null}
            </div>
          </div>
          <div className="block-profile-grid">
            <div><span>Name</span><strong>{user?.fullName || 'Member'}</strong></div>
            <div><span>Email</span><strong>{user?.email || '-'}</strong></div>
            <div><span>Block</span><strong>{user?.blockName || '-'}</strong></div>
            <div><span>Village</span><strong>{user?.villageName || '-'}</strong></div>
            <div><span>Role</span><strong>{roleDisplay}</strong></div>
            <div><span>Referral ID</span><strong>{user?.referralCode || '-'}</strong></div>
            <div><span>Wallet Balance</span><strong>Rs. {walletBalance}</strong></div>
          </div>
        </section>
      )
    }

    if (activeSection === 'card') {
      return (
        <section className="admin-content-card role-section role-section-card">
          <div className="saved-blocks-header">
            {/* <h2>Get Card</h2> */}
            <button
              type="button"
              className={`role-expand-toggle ${roleSectionOpen.cardForm ? 'open' : ''}`}
              onClick={() => toggleRoleSection('cardForm')}
              aria-expanded={roleSectionOpen.cardForm}
            >
              {roleSectionOpen.cardForm ? 'Close' : 'Fill Details'}
            </button>
          </div>

          {user?.role === 'member' || user?.role === 'team leader' ? (
            <MemberCardSetup member={user} showForm={roleSectionOpen.cardForm} />
          ) : (
            <CoordinatorCardSetup coordinator={user} showForm={roleSectionOpen.cardForm} />
          )}
        </section>
      )
    }

    if (activeSection === 'bank') {
      return (
        <section className="admin-content-card role-section role-section-bank">
          <div className="saved-blocks-header">
            <div>
              <h2>Bank Details</h2>
              <p>Add the account details used for payouts and verification.</p>
            </div>
            <button
              type="button"
              className={`role-expand-toggle ${bankFormOpen ? 'open' : ''}`}
              onClick={() => setBankFormOpen((open) => !open)}
              aria-expanded={bankFormOpen}
            >
              {bankFormOpen ? 'Close' : 'Fill Details'}
            </button>
          </div>

          {bankFormOpen ? (
            <form className="member-user-register-form bank-details-form" onSubmit={handleBankDetailsSubmit}>
              <div className="bank-details-grid">
                <div className="bank-details-field bank-details-field-full">
                  <label htmlFor="bank-account-holder-name">Account Holder Name</label>
                  <input
                    id="bank-account-holder-name"
                    type="text"
                    value={bankDetailsForm.bankAccountHolderName}
                    onChange={handleBankFieldChange('bankAccountHolderName')}
                    placeholder="Enter account holder name"
                    required
                  />
                </div>
                <div className="bank-details-field">
                  <label htmlFor="bank-name">Bank Name</label>
                  <input
                    id="bank-name"
                    type="text"
                    value={bankDetailsForm.bankName}
                    onChange={handleBankFieldChange('bankName')}
                    placeholder="Enter bank name"
                    required
                  />
                </div>
                <div className="bank-details-field">
                  <label htmlFor="bank-account-number">Account Number</label>
                  <input
                    id="bank-account-number"
                    type="text"
                    inputMode="numeric"
                    value={bankDetailsForm.bankAccountNumber}
                    onChange={handleBankFieldChange('bankAccountNumber')}
                    placeholder="Enter account number"
                    required
                  />
                </div>
                <div className="bank-details-field">
                  <label htmlFor="bank-ifsc-code">IFSC Code</label>
                  <input
                    id="bank-ifsc-code"
                    type="text"
                    value={bankDetailsForm.bankIfscCode}
                    onChange={handleBankFieldChange('bankIfscCode')}
                    placeholder="Enter IFSC code"
                    required
                  />
                </div>
                <div className="bank-details-field">
                  <label htmlFor="bank-branch-name">Branch Name</label>
                  <input
                    id="bank-branch-name"
                    type="text"
                    value={bankDetailsForm.bankBranchName}
                    onChange={handleBankFieldChange('bankBranchName')}
                    placeholder="Enter branch name"
                    required
                  />
                </div>
                <div className="bank-details-field">
                  <label htmlFor="bank-upi-id">UPI ID</label>
                  <input
                    id="bank-upi-id"
                    type="text"
                    value={bankDetailsForm.bankUpiId}
                    onChange={handleBankFieldChange('bankUpiId')}
                    placeholder="Enter UPI ID"
                  />
                </div>
              </div>

              <p className="bank-details-note">These details stay with your profile and can be reviewed by the admin team.</p>

              {bankDetailsError && <p className="admin-error-text">{bankDetailsError}</p>}
              {bankDetailsMessage && <p className="admin-success-text">{bankDetailsMessage}</p>}

              <div className="admin-form-actions bank-details-actions">
                <button type="submit" className="admin-submit-btn" disabled={bankDetailsSaving || bankDetailsLoading}>
                  {bankDetailsSaving ? 'Saving...' : bankDetailsLoaded ? 'Update Bank Details' : 'Save Bank Details'}
                </button>
              </div>
            </form>
          ) : (
            <div className="admin-panel-note admin-panel-note-green">
              <p>Bank details form is closed. Use Fill Details to update account information.</p>
            </div>
          )}
        </section>
      )
    }

    if (activeSection === 'wallet') {
      return (
        <section className="admin-content-card role-section role-section-wallet">
          <div className="saved-blocks-header">
            <h2>Wallet Transactions</h2>
            <button type="button" className="admin-secondary-btn" onClick={fetchWalletHistory} disabled={loadingWallet}>
              {loadingWallet ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <p className="wallet-balance-text">Current wallet balance: Rs. {walletBalance}</p>

          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <div className="transaction-list">
              {transactions.map((transaction) => (
                <article key={transaction._id} className={`transaction-item ${transaction.transactionType === 'debit' ? 'debit' : 'credit'}`}>
                  <div>
                    <h4>{transaction.transactionType === 'debit' ? '-' : '+'}Rs. {transaction.amount}</h4>
                    <p>{transaction.reason}</p>
                  </div>
                  <span>{new Date(transaction.createdAt).toLocaleString()}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      )
    }

    if (activeSection === 'withdrawals') {
      const preview = calculateWithdrawalPreview(withdrawalAmount || 0)

      return (
        <section className="admin-content-card role-section role-section-withdrawals">
          <div className="saved-blocks-header">
            <div>
              <h2>Withdrawal Requests</h2>
              <p>Request a payout from your wallet balance. A 5% tax deduction is applied before payout.</p>
            </div>
            <button type="button" className="admin-secondary-btn" onClick={fetchWithdrawalRequests} disabled={loadingWithdrawalRequests}>
              {loadingWithdrawalRequests ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="admin-panel-note admin-panel-note-green">
            <p>Available wallet balance: Rs. {walletBalance}</p>
          </div>

          <form className="withdrawal-request-form" onSubmit={handleWithdrawalRequestSubmit}>
            <label htmlFor="withdrawal-amount">Withdrawal Amount</label>
            <input
              id="withdrawal-amount"
              type="number"
              min="1"
              step="0.01"
              value={withdrawalAmount}
              onChange={(event) => setWithdrawalAmount(event.target.value)}
              placeholder="Enter amount"
              required
            />
            <button type="submit" className="admin-submit-btn" disabled={requestingWithdrawal}>
              {requestingWithdrawal ? 'Processing...' : 'Request Withdrawal'}
            </button>
          </form>

          {withdrawalFormError ? <p className="admin-error-text">{withdrawalFormError}</p> : null}
          {withdrawalFormMessage ? <p className="admin-success-text">{withdrawalFormMessage}</p> : null}

          <div className="withdrawal-request-history">
            <h3 className="admin-subheading">My Withdrawal Requests</h3>
            {withdrawalRequests.length === 0 ? (
              <p>No withdrawal requests yet.</p>
            ) : (
              <div className="withdrawal-request-list">
                {withdrawalRequests.map((request) => (
                  <article className="withdrawal-request-card" key={request._id}>
                    <div className="withdrawal-request-head">
                      <div>
                        <h4>Rs. {request.requestedAmount}</h4>
                        <p>Tax deduction: Rs. {request.taxDeductedAmount} | Final pay: Rs. {request.finalPayAmount}</p>
                      </div>
                      <span className={`withdrawal-status withdrawal-status-${request.status}`}>{request.status}</span>
                    </div>
                    <div className="withdrawal-request-meta">
                      <span>{new Date(request.createdAt).toLocaleString()}</span>
                      <span>{request.requestedByRole}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {withdrawalPreviewOpen ? (
            <div className="admin-modal-overlay">
              <div className="admin-modal">
                <h3>Confirm Withdrawal</h3>
                <p>Requested Amount: Rs. {preview.requestedAmount}</p>
                <p>5% Tax Deduction: Rs. {preview.taxDeductedAmount}</p>
                <p>Final Pay Amount: Rs. {preview.finalPayAmount}</p>

                <div className="admin-form-actions">
                  <button type="button" className="admin-cancel-btn" onClick={() => setWithdrawalPreviewOpen(false)}>
                    Cancel
                  </button>
                  <button type="button" className="admin-submit-btn" onClick={confirmWithdrawalRequest} disabled={requestingWithdrawal}>
                    {requestingWithdrawal ? 'Sending...' : 'Confirm Request'}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      )
    }

    if (activeSection === 'userRegister') {
      return (
        <section className="admin-content-card role-section role-section-register">
          <div className="saved-blocks-header">
            <h2>Register Member</h2>
            <button
              type="button"
              className={`role-expand-toggle ${roleSectionOpen.registerForm ? 'open' : ''}`}
              onClick={() => toggleRoleSection('registerForm')}
              aria-expanded={roleSectionOpen.registerForm}
            >
                {roleSectionOpen.registerForm ? 'Close' : 'Register Member'}
            </button>
          </div>
          <p>Register a new member from this dashboard. Registration is instant and wallet rewards are credited automatically.</p>

          {roleSectionOpen.registerForm ? (
          <form className="member-user-register-form" onSubmit={handleRegisterUserSubmit}>
            <label htmlFor="member-register-user-name">User Name</label>
            <input
              id="member-register-user-name"
              type="text"
              value={registerUserName}
              onChange={(event) => setRegisterUserName(event.target.value)}
              placeholder="Enter user full name"
              required
            />

            <label htmlFor="member-register-user-mobile">Mobile Number</label>
            <input
              id="member-register-user-mobile"
              type="text"
              value={registerUserMobile}
              onChange={(event) => setRegisterUserMobile(event.target.value)}
              placeholder="Enter mobile number"
              required
            />

            <label htmlFor="member-register-user-email">Email</label>
            <input
              id="member-register-user-email"
              type="email"
              value={registerUserEmail}
              onChange={(event) => setRegisterUserEmail(event.target.value)}
              placeholder="Enter email"
              required
            />

            <label htmlFor="member-register-user-password">Password</label>
            <input
              id="member-register-user-password"
              type="password"
              value={registerUserPassword}
              onChange={(event) => setRegisterUserPassword(event.target.value)}
              placeholder="Set login password"
              required
            />

            <label htmlFor="member-register-user-confirm-password">Confirm Password</label>
            <input
              id="member-register-user-confirm-password"
              type="password"
              value={registerUserConfirmPassword}
              onChange={(event) => setRegisterUserConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              required
            />

            <label htmlFor="member-register-user-state">State</label>
            <select
              id="member-register-user-state"
              value={registerStateName}
              onChange={(event) => setRegisterStateName(event.target.value)}
              required
            >
              {indianStates.map((stateItem) => {
                const isUP = normalizeHierarchyKey(stateItem.name) === normalizeHierarchyKey(UP_STATE_NAME)
                return (
                  <option key={stateItem.isoCode} value={stateItem.name} disabled={!isUP}>
                    {stateItem.name}
                  </option>
                )
              })}
            </select>

            <label htmlFor="member-register-user-district">District</label>
            <select
              id="member-register-user-district"
              value={registerDistrictName}
              onChange={(event) => setRegisterDistrictName(event.target.value)}
              required
            >
              <option value="">Select district</option>
              {UP_DISTRICTS.map((district) => {
                const isMoradabad = normalizeHierarchyKey(district) === normalizeHierarchyKey(MORADABAD_DISTRICT_NAME)
                return (
                  <option key={district} value={district} disabled={!isMoradabad}>
                    {district}
                  </option>
                )
              })}
            </select>

            <label htmlFor="member-register-user-tehsil">Tehsil</label>
            <select
              id="member-register-user-tehsil"
              value={registerTehsilName}
              onChange={(event) => setRegisterTehsilName(event.target.value)}
              disabled={!registerDistrictName}
              required
            >
              <option value="">{registerDistrictName ? 'Select tehsil' : 'Select district first'}</option>
              {registerTehsilOptions.map((tehsil) => (
                <option key={tehsil} value={tehsil}>{tehsil}</option>
              ))}
            </select>

            <label htmlFor="member-register-user-block">Block</label>
            <select
              id="member-register-user-block"
              value={selectedRegisterBlockId}
              onChange={(event) => setSelectedRegisterBlockId(event.target.value)}
              disabled={!registerTehsilName}
              required
            >
              <option value="">{registerTehsilName ? 'Select block' : 'Select tehsil first'}</option>
              {filteredRegisterBlocks.map((block) => (
                <option key={block._id} value={block._id}>{block.blockName}</option>
              ))}
            </select>

            <label htmlFor="member-register-user-village">Village</label>
            <select
              id="member-register-user-village"
              value={registerUserVillage}
              onChange={(event) => setRegisterUserVillage(event.target.value)}
              required
            >
              <option value="">{selectedRegisterBlockId ? 'Select village' : 'Select block first'}</option>
              {memberVillageOptions.map((village) => (
                <option key={village} value={village}>{village}</option>
              ))}
            </select>

            <label htmlFor="member-register-user-aadhaar-number">Aadhaar Number</label>
            <input
              id="member-register-user-aadhaar-number"
              type="text"
              value={registerUserAadhaarNumber}
              onChange={(event) => setRegisterUserAadhaarNumber(event.target.value)}
              placeholder="12 digit Aadhaar number"
              required
            />

            <label htmlFor="member-register-user-aadhaar-upload">Aadhaar Document (PDF/Image)</label>
            <input
              id="member-register-user-aadhaar-upload"
              type="file"
              accept="application/pdf,image/*"
              onChange={(event) => handleMemberRegistrationFileChange(event, setRegisterUserAadhaarDocumentDataUrl, setRegisterUserAadhaarDocumentName, 'doc/')}
              required
            />
            {registerUserAadhaarDocumentName ? <p className="upload-file-name">Selected: {registerUserAadhaarDocumentName}</p> : null}

            <label htmlFor="member-register-user-id-proof-type">Identity Proof Type</label>
            <select
              id="member-register-user-id-proof-type"
              value={registerUserIdProofType}
              onChange={(event) => setRegisterUserIdProofType(event.target.value)}
              required
            >
              <option value="pan">PAN Card</option>
              <option value="domicile">Domicile Certificate</option>
            </select>

            {registerUserIdProofType === 'pan' ? (
              <>
                <label htmlFor="member-register-user-pan-number">PAN Number</label>
                <input
                  id="member-register-user-pan-number"
                  type="text"
                  value={registerUserPanNumber}
                  onChange={(event) => setRegisterUserPanNumber(event.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  required
                />

                <label htmlFor="member-register-user-pan-upload">PAN Document (PDF/Image)</label>
                <input
                  id="member-register-user-pan-upload"
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(event) => handleMemberRegistrationFileChange(event, setRegisterUserPanDocumentDataUrl, setRegisterUserPanDocumentName, 'doc/')}
                  required
                />
                {registerUserPanDocumentName ? <p className="upload-file-name">Selected: {registerUserPanDocumentName}</p> : null}
              </>
            ) : (
              <>
                <label htmlFor="member-register-user-domicile-upload">Domicile Certificate (PDF/Image)</label>
                <input
                  id="member-register-user-domicile-upload"
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(event) => handleMemberRegistrationFileChange(event, setRegisterUserDomicileDocumentDataUrl, setRegisterUserDomicileDocumentName, 'doc/')}
                  required
                />
                {registerUserDomicileDocumentName ? <p className="upload-file-name">Selected: {registerUserDomicileDocumentName}</p> : null}
              </>
            )}

            <label htmlFor="member-register-user-profile-photo">Profile Photo</label>
            <input
              id="member-register-user-profile-photo"
              type="file"
              accept="image/*"
              onChange={(event) => handleMemberRegistrationFileChange(event, setRegisterUserProfilePhotoDataUrl, setRegisterUserProfilePhotoName, 'image/')}
              required
            />
            {registerUserProfilePhotoName ? <p className="upload-file-name">Selected: {registerUserProfilePhotoName}</p> : null}

            <button type="submit" className="admin-submit-btn" disabled={registeringUser}>
              {registeringUser ? 'Registering...' : 'Register Member'}
            </button>
          </form>
          ) : null}
        </section>
      )
    }

    if (activeSection === 'withdrawals') {
      const preview = calculateWithdrawalPreview(withdrawalAmount || 0)

      return (
        <section className="admin-content-card role-section role-section-withdrawals">
          <div className="saved-blocks-header">
            <div>
              <h2>Withdrawal Requests</h2>
              <p>Request a withdrawal from your wallet. A 5% tax deduction is shown before you confirm.</p>
            </div>
            <button type="button" className="admin-secondary-btn" onClick={fetchWithdrawalRequests} disabled={loadingWithdrawalRequests}>
              {loadingWithdrawalRequests ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="admin-panel-note admin-panel-note-green">
            <p>Available wallet balance: Rs. {walletBalance}</p>
          </div>

          <form className="withdrawal-request-form" onSubmit={handleWithdrawalRequestSubmit}>
            <label htmlFor="withdrawal-request-amount">Withdrawal Amount</label>
            <input
              id="withdrawal-request-amount"
              type="number"
              min="1"
              step="0.01"
              value={withdrawalAmount}
              onChange={(event) => setWithdrawalAmount(event.target.value)}
              placeholder="Enter amount"
              required
            />

            <button type="submit" className="admin-submit-btn" disabled={requestingWithdrawal}>
              {requestingWithdrawal ? 'Processing...' : 'Request Withdrawal'}
            </button>
          </form>

          {withdrawalFormError ? <p className="admin-error-text">{withdrawalFormError}</p> : null}
          {withdrawalFormMessage ? <p className="admin-success-text">{withdrawalFormMessage}</p> : null}

          <div className="withdrawal-request-history">
            <h3 className="admin-subheading">My Withdrawal Requests</h3>
            {withdrawalRequests.length === 0 ? (
              <p>No withdrawal requests yet.</p>
            ) : (
              <div className="withdrawal-request-list">
                {withdrawalRequests.map((request) => (
                  <article className="withdrawal-request-card" key={request._id}>
                    <div className="withdrawal-request-head">
                      <div>
                        <h4>Rs. {request.requestedAmount}</h4>
                        <p>Tax deduction: Rs. {request.taxDeductedAmount} | Final pay: Rs. {request.finalPayAmount}</p>
                      </div>
                      <span className={`withdrawal-status withdrawal-status-${request.status}`}>{request.status}</span>
                    </div>
                    <div className="withdrawal-request-meta">
                      <span>{new Date(request.createdAt).toLocaleString()}</span>
                      <span>{request.requestedByRole}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {withdrawalPreviewOpen ? (
            <div className="admin-modal-overlay">
              <div className="admin-modal">
                <h3>Confirm Withdrawal</h3>
                <p>Requested Amount: Rs. {preview.requestedAmount}</p>
                <p>5% Tax Deduction: Rs. {preview.taxDeductedAmount}</p>
                <p>Final Pay Amount: Rs. {preview.finalPayAmount}</p>

                <div className="admin-form-actions">
                  <button type="button" className="admin-cancel-btn" onClick={() => setWithdrawalPreviewOpen(false)}>
                    Cancel
                  </button>
                  <button type="button" className="admin-submit-btn" onClick={confirmWithdrawalRequest} disabled={requestingWithdrawal}>
                    {requestingWithdrawal ? 'Sending...' : 'Confirm Request'}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      )
    }

    if (activeSection === 'approvals') {
      return (
        <section className="admin-content-card role-section role-section-approvals">
          <div className="saved-blocks-header">
            <h2>My Registration History</h2>
            <button type="button" className="admin-secondary-btn" onClick={fetchRegistrationHistory} disabled={loadingRegistrations}>
              {loadingRegistrations ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {loadingRegistrations ? (
            <p>Loading registration history...</p>
          ) : (
            <div className="approval-sections">
              <section className="approval-subsection">
                <div className="approval-list-header">
                  <h3 className="admin-subheading">My Registrations ({filteredRegistrations.length})</h3>
                  <input
                    type="search"
                    value={registrationSearchTerm}
                    onChange={(event) => setRegistrationSearchTerm(event.target.value)}
                    className="approval-search-input"
                    placeholder="Search by name, mobile, email, village, referral ID"
                    aria-label="Search registrations"
                  />
                </div>
                {myRegistrations.length === 0 ? (
                  <p>No registrations yet.</p>
                ) : filteredRegistrations.length === 0 ? (
                  <p>No matching registrations found.</p>
                ) : (
                  <div className="approval-list">
                    {filteredRegistrations.map((item) => {
                      const isExpanded = Boolean(expandedRegistrationCards[item._id])

                      return (
                      <article key={item._id} className={`approval-card ${isExpanded ? 'expanded' : ''}`}>
                        <button
                          type="button"
                          className="approval-card-header"
                          onClick={() => toggleRegistrationCard(item._id)}
                          aria-expanded={isExpanded}
                        >
                          <div>
                            <h3>{item.fullName}</h3>
                            <p>{item.mobileNumber} | {item.email || 'No email'}</p>
                          </div>
                          <div className="approval-card-header-right">
                            <span className="approval-status approved">Registered</span>
                            <span className="approval-expand-indicator" aria-hidden="true">{isExpanded ? 'Hide details' : 'View details'}</span>
                          </div>
                        </button>

                        {isExpanded ? (
                        <div className="approval-card-body">
                          <div className="approval-meta-grid">
                            <div><span>Block</span><strong>{item.blockName || '-'}</strong></div>
                            <div><span>Village</span><strong>{item.villageName || '-'}</strong></div>
                            <div><span>Registered By</span><strong>{item.registeredByName || '-'}</strong></div>
                            <div><span>Referral ID</span><strong>{item.referralCode || '-'}</strong></div>
                          </div>
                        </div>
                        ) : null}
                      </article>
                      )
                    })}
                  </div>
                )}
              </section>
            </div>
          )}
        </section>
      )
    }

    return (
      <section className="admin-content-card role-section role-section-dashboard">
        <h2>Dashboard</h2>
        <p>Welcome {user?.fullName || 'user'}. Manage user registrations and wallet rewards from this panel.</p>
        <div className="admin-grid">
          <article className="admin-stat-card">
            <h3>Assigned Block</h3>
            <strong>{user?.blockName || '-'}</strong>
          </article>
          <article className="admin-stat-card">
            <h3>Assigned Village</h3>
            <strong>{user?.villageName || '-'}</strong>
          </article>
          <article className="admin-stat-card">
            <h3>Role</h3>
            <strong>{user?.role === 'team leader' || (user?.role === 'member' && myRegistrations.length >= teamLeaderUpgradeCount) ? 'Team Leader' : user?.role === 'village coordinator' ? 'Coordinator' : user?.role === 'technical advisor' ? 'Technical Advisor' : user?.role === 'pro media' ? 'PRO Media' : user?.role === 'member' ? 'Member' : (user?.role || '-')}</strong>
          </article>
          <article className="admin-stat-card">
            <h3>Wallet Balance</h3>
            <strong>Rs. {walletBalance}</strong>
          </article>
          <article className="admin-stat-card">
            <h3>My Registrations</h3>
            <strong>{myRegistrations.length}</strong>
          </article>
        </div>
      </section>
    )
  }

  return (
    <main className={`admin-page-shell ${isMemberDashboard ? 'member-dashboard-view' : ''} ${isRoleDashboard ? 'role-dashboard-view' : ''}`}>
      <div className="dashboard-mobile-topbar">
        <Link to="/" aria-label="Go to home" onClick={() => setMobileDashboardMenuOpen(false)}>
          <img src={siteLogo} alt="Portal Logo" className="dashboard-mobile-logo" />
        </Link>
        <button
          type="button"
          className="dashboard-mobile-menu-toggle"
          onClick={() => setMobileDashboardMenuOpen((open) => !open)}
          aria-expanded={mobileDashboardMenuOpen}
          aria-label="Toggle dashboard menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="dashboard-mobile-welcome-strip">
        Welcome, {user?.fullName || 'User'}
      </div>

      {mobileDashboardMenuOpen ? (
        <>
          <button
            type="button"
            className="dashboard-mobile-menu-backdrop"
            onClick={() => setMobileDashboardMenuOpen(false)}
            aria-label="Close dashboard menu"
          />
          <div className="dashboard-mobile-menu-panel">
            <button type="button" className={`admin-menu-btn ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={() => handleSectionChange('dashboard')}>Dashboard</button>
            {(user?.role === 'member' || user?.role === 'team leader' || user?.role === 'village coordinator' || user?.role === 'technical advisor' || user?.role === 'pro media') ? <button type="button" className={`admin-menu-btn ${activeSection === 'card' ? 'active' : ''}`} onClick={() => handleSectionChange('card')}>Get Card</button> : null}
            {(user?.role === 'member' || user?.role === 'team leader' || user?.role === 'village coordinator' || user?.role === 'technical advisor' || user?.role === 'pro media') ? <button type="button" className={`admin-menu-btn ${activeSection === 'bank' ? 'active' : ''}`} onClick={() => handleSectionChange('bank')}>Bank Details</button> : null}
            <button type="button" className={`admin-menu-btn ${activeSection === 'userRegister' ? 'active' : ''}`} onClick={() => handleSectionChange('userRegister')}>Register Member</button>
            <button type="button" className={`admin-menu-btn ${activeSection === 'approvals' ? 'active' : ''}`} onClick={() => handleSectionChange('approvals')}>Registration History</button>
            <button type="button" className={`admin-menu-btn ${activeSection === 'wallet' ? 'active' : ''}`} onClick={() => handleSectionChange('wallet')}>Wallet History</button>
            <button type="button" className={`admin-menu-btn ${activeSection === 'withdrawals' ? 'active' : ''}`} onClick={() => handleSectionChange('withdrawals')}>Withdrawal Requests</button>
            <button type="button" className={`admin-menu-btn ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => handleSectionChange('profile')}>Profile</button>
            <button type="button" className="admin-logout-btn admin-left-logout" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : null}

      <section className="admin-layout-shell">
        <aside className="admin-left-menu">
          <div className="admin-hero-label">{portalLabel}</div>
          <button type="button" className={`admin-menu-btn ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSection('dashboard')}>Dashboard</button>
          {(user?.role === 'member' || user?.role === 'team leader' || user?.role === 'village coordinator' || user?.role === 'technical advisor' || user?.role === 'pro media') ? <button type="button" className={`admin-menu-btn ${activeSection === 'card' ? 'active' : ''}`} onClick={() => setActiveSection('card')}>Get Card</button> : null}
          {(user?.role === 'member' || user?.role === 'team leader' || user?.role === 'village coordinator' || user?.role === 'technical advisor' || user?.role === 'pro media') ? <button type="button" className={`admin-menu-btn ${activeSection === 'bank' ? 'active' : ''}`} onClick={() => setActiveSection('bank')}>Bank Details</button> : null}
          <button type="button" className={`admin-menu-btn ${activeSection === 'userRegister' ? 'active' : ''}`} onClick={() => setActiveSection('userRegister')}>Register Member</button>
          <button type="button" className={`admin-menu-btn ${activeSection === 'approvals' ? 'active' : ''}`} onClick={() => setActiveSection('approvals')}>Registration History</button>
          <button type="button" className={`admin-menu-btn ${activeSection === 'wallet' ? 'active' : ''}`} onClick={() => setActiveSection('wallet')}>Wallet History</button>
          <button type="button" className={`admin-menu-btn ${activeSection === 'withdrawals' ? 'active' : ''}`} onClick={() => setActiveSection('withdrawals')}>Withdrawal Requests</button>
          <button type="button" className={`admin-menu-btn ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => setActiveSection('profile')}>Profile</button>
          <button type="button" className="admin-logout-btn admin-left-logout" onClick={handleLogout}>Logout</button>
        </aside>

        <div className="admin-right-content">
          {(dashboardMessage || dashboardError) && (
            <div className={`admin-status-banner ${dashboardError ? 'error' : 'success'}`}>
              {dashboardError || dashboardMessage}
            </div>
          )}
          {renderContent()}
        </div>
      </section>
    </main>
  )
}

function BlockDashboardPage({ user, onLogout }) {
  return (
    <AdvisorCoordinatorDashboard
      user={user}
      onLogout={onLogout}
      portalLabel="Block Portal"
      logoutPath="/block-login"
    />
  )
}

function MemberLoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showApprovalPopup, setShowApprovalPopup] = useState(false)
  const [approvalPopupMessage, setApprovalPopupMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')

    const normalizedIdentifier = normalizeText(identifier)
    if (!normalizedIdentifier || !normalizeText(password)) {
      setError('All fields are required')
      return
    }

    if (normalizedIdentifier.includes('@')) {
      if (!isValidEmail(normalizedIdentifier)) {
        setError('Enter a valid email address that includes @')
        return
      }
    } else if (!isValidMobile(normalizedIdentifier)) {
      setError('Use a valid email or a 10 digit mobile number')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/blocks/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: identifier, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Invalid member login credentials')
      }

      onLogin(data.data)
      navigate('/member-dashboard', { replace: true })
    } catch (loginError) {
      const loginErrorMessage = loginError.message || 'Member login failed'
      const isPendingApprovalError = /pending approval|not approved/i.test(loginErrorMessage)

      if (isPendingApprovalError) {
        setApprovalPopupMessage('Registration successful. Please wait for approval before login.')
        setShowApprovalPopup(true)
        setError('')
      } else {
        setError(loginErrorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="login-page-shell">
      <div className="login-card">
        <div className="login-card-header">
          <h2>Member Login</h2>
          <p>Enter email/mobile and password to open member dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form page-login-form">
          <label htmlFor="member-login-identifier">Email / Mobile</label>
          <input
            id="member-login-identifier"
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="name@example.com or 98xxxxxxx"
            required
          />

          <label htmlFor="member-login-password">Password</label>
          <input
            id="member-login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />

          {error && <p className="admin-error-text">{error}</p>}

          <div className="admin-form-actions login-form-actions">
            <Link to="/" className="admin-cancel-btn login-cancel-link">
              Back to Home
            </Link>
            <button type="submit" className="admin-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>

      {showApprovalPopup ? (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="member-login-pending-title">
          <div className="admin-modal block-register-success-modal">
            <h3 id="member-login-pending-title">Approval Pending</h3>
            <p className="block-register-success-message">
              {approvalPopupMessage || 'Registration successful. Please wait for approval before login.'}
            </p>
            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-submit-btn"
                onClick={() => setShowApprovalPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function MemberDashboardPage({ user, onLogout }) {
  return (
    <AdvisorCoordinatorDashboard
      user={user}
      onLogout={onLogout}
      portalLabel="Member Portal"
      logoutPath="/member-login"
    />
  )
}

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminLoading, setAdminLoading] = useState(false)

  const handleAdminLogin = async (event) => {
    event.preventDefault()
    setAdminError('')

    if (!normalizeText(adminEmail) || !normalizeText(adminPassword)) {
      setAdminError('All fields are required')
      return
    }

    if (!isValidEmail(adminEmail)) {
      setAdminError('Enter a valid email address that includes @')
      return
    }

    setAdminLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: adminEmail,
          password: adminPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Invalid admin credentials')
      }

      onLogin()
      navigate('/admin', { replace: true })
    } catch (error) {
      setAdminError(error.message || 'Admin login failed')
    } finally {
      setAdminLoading(false)
    }
  }

  return (
    <section className="login-page-shell">
      <div className="login-card">
        <div className="login-card-header">
          <h2>Admin Login</h2>
          <p>Sign in to open the admin page.</p>
        </div>

        <form onSubmit={handleAdminLogin} className="admin-login-form page-login-form">
          <label htmlFor="admin-email">Username</label>
          <input
            id="admin-email"
            type="email"
            value={adminEmail}
            onChange={(event) => setAdminEmail(event.target.value)}
            placeholder="admin@example.com"
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={adminPassword}
            onChange={(event) => setAdminPassword(event.target.value)}
            placeholder="Enter password"
            required
          />

          {adminError && <p className="admin-error-text">{adminError}</p>}

          <div className="admin-form-actions login-form-actions">
            <Link to="/" className="admin-cancel-btn login-cancel-link">
              Back to Home
            </Link>
            <button type="submit" className="admin-submit-btn" disabled={adminLoading}>
              {adminLoading ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => getStoredBoolean(ADMIN_AUTH_KEY))
  const [blockUser, setBlockUser] = useState(() => getStoredJson(BLOCK_USER_KEY))
  const [isBlockAuthenticated, setIsBlockAuthenticated] = useState(() => getStoredBoolean(BLOCK_AUTH_KEY) && !!getStoredJson(BLOCK_USER_KEY))
  const [memberUser, setMemberUser] = useState(() => getStoredJson(MEMBER_USER_KEY))
  const [isMemberAuthenticated, setIsMemberAuthenticated] = useState(() => getStoredBoolean(MEMBER_AUTH_KEY) && !!getStoredJson(MEMBER_USER_KEY))
  const [volunteerUser, setVolunteerUser] = useState(() => getStoredJson(VOLUNTEER_USER_KEY))
  const [isVolunteerAuthenticated, setIsVolunteerAuthenticated] = useState(() => getStoredBoolean(VOLUNTEER_AUTH_KEY) && !!getStoredJson(VOLUNTEER_USER_KEY))

  const markAdminAuthenticated = () => {
    window.localStorage.setItem(ADMIN_AUTH_KEY, 'true')
    setIsAdminAuthenticated(true)
  }

  const clearAdminAuthenticated = () => {
    window.localStorage.removeItem(ADMIN_AUTH_KEY)
    setIsAdminAuthenticated(false)
  }

  const markBlockAuthenticated = (user) => {
    window.localStorage.setItem(BLOCK_AUTH_KEY, 'true')
    window.localStorage.setItem(BLOCK_USER_KEY, JSON.stringify(user))
    setIsBlockAuthenticated(true)
    setBlockUser(user)
  }

  const clearBlockAuthenticated = () => {
    window.localStorage.removeItem(BLOCK_AUTH_KEY)
    window.localStorage.removeItem(BLOCK_USER_KEY)
    setIsBlockAuthenticated(false)
    setBlockUser(null)
  }

  const markMemberAuthenticated = (user) => {
    window.localStorage.setItem(MEMBER_AUTH_KEY, 'true')
    window.localStorage.setItem(MEMBER_USER_KEY, JSON.stringify(user))
    setIsMemberAuthenticated(true)
    setMemberUser(user)
  }

  const clearMemberAuthenticated = () => {
    window.localStorage.removeItem(MEMBER_AUTH_KEY)
    window.localStorage.removeItem(MEMBER_USER_KEY)
    setIsMemberAuthenticated(false)
    setMemberUser(null)
  }

  const markVolunteerAuthenticated = (user) => {
    window.localStorage.setItem(VOLUNTEER_AUTH_KEY, 'true')
    window.localStorage.setItem(VOLUNTEER_USER_KEY, JSON.stringify(user))
    setIsVolunteerAuthenticated(true)
    setVolunteerUser(user)
  }

  const clearVolunteerAuthenticated = () => {
    window.localStorage.removeItem(VOLUNTEER_AUTH_KEY)
    window.localStorage.removeItem(VOLUNTEER_USER_KEY)
    setIsVolunteerAuthenticated(false)
    setVolunteerUser(null)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SiteShell>
            {({
              currentSlide,
              nextSlide,
              prevSlide,
              bannerSlides,
              onComplaintSelect,
              onComplaintAction,
              onTrackComplaint,
              onOpenOtherServices,
              showOtherServicesSection,
              onCloseOtherServices,
              siteLanguage,
            }) => (
              <HomePage
                currentSlide={currentSlide}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                bannerSlides={bannerSlides}
                onComplaintSelect={onComplaintSelect}
                onComplaintAction={onComplaintAction}
                onTrackComplaint={onTrackComplaint}
                onOpenOtherServices={onOpenOtherServices}
                showOtherServicesSection={showOtherServicesSection}
                onCloseOtherServices={onCloseOtherServices}
                siteLanguage={siteLanguage}
              />
            )}
          </SiteShell>
        }
      />
      <Route
        path="/login"
        element={
          <SiteShell>
            {() => <LoginPage onLogin={markAdminAuthenticated} />}
          </SiteShell>
        }
      />
      <Route
        path="/admin"
        element={
          isAdminAuthenticated ? (
            <SiteShell>
              {() => <AdminPage onLogout={clearAdminAuthenticated} />}
            </SiteShell>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/block-login"
        element={
          <SiteShell>
            {() => <BlockLoginPage onLogin={markBlockAuthenticated} />}
          </SiteShell>
        }
      />
      <Route
        path="/block-register"
        element={
          <SiteShell>
            {() => <BlockRegisterPage />}
          </SiteShell>
        }
      />
      <Route
        path="/block-dashboard"
        element={
          isBlockAuthenticated ? (
            <SiteShell>
              {() => <BlockDashboardPage user={blockUser} onLogout={clearBlockAuthenticated} />}
            </SiteShell>
          ) : (
            <Navigate to="/block-login" replace />
          )
        }
      />
      <Route
        path="/member-login"
        element={
          <SiteShell>
            {() => <MemberLoginPage onLogin={markMemberAuthenticated} />}
          </SiteShell>
        }
      />
      <Route
        path="/member-dashboard"
        element={
          isMemberAuthenticated ? (
            <SiteShell>
              {() => <MemberDashboardPage user={memberUser} onLogout={clearMemberAuthenticated} />}
            </SiteShell>
          ) : (
            <Navigate to="/member-login" replace />
          )
        }
      />
      <Route
        path="/volunteer-register"
        element={
          <SiteShell>
            {() => <VolunteerRegistrationPage onRegister={markVolunteerAuthenticated} />}
          </SiteShell>
        }
      />
      <Route
        path="/volunteer-login"
        element={
          <SiteShell>
            {() => <VolunteerLoginPage onLogin={markVolunteerAuthenticated} />}
          </SiteShell>
        }
      />
      <Route
        path="/volunteer-dashboard/:volunteerId"
        element={
          isVolunteerAuthenticated ? (
            <SiteShell>
              {() => <VolunteerDashboardPage volunteer={volunteerUser} onLogout={clearVolunteerAuthenticated} />}
            </SiteShell>
          ) : (
            <Navigate to="/volunteer-register" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
