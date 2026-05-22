export const LANGUAGE_STORAGE_KEY = 'cybercrime_site_language'
export const HEADER_TRANSLATION_SELECTOR = '.gov-header, .portal-header, .main-nav'

const HI_TRANSLATIONS = {
  'Lang.': 'भाषा',
  English: 'अंग्रेजी',
  Hindi: 'हिंदी',
  Home: 'होम',
  'Go to home': 'होम पर जाएं',
  'Back to Home': 'होम पर वापस जाएं',
  'Register a Complaint': 'शिकायत दर्ज करें',
  'Track your Complaint': 'अपनी शिकायत ट्रैक करें',
  'Report & Check Suspect': 'संदिग्ध की रिपोर्ट और जांच करें',
  'Cyber Volunteers': 'साइबर वॉलंटियर्स',
  'Learning Corner': 'लर्निंग कॉर्नर',
  'Contact Us': 'संपर्क करें',
  'Admin Login': 'एडमिन लॉगिन',
  'Block Login': 'ब्लॉक लॉगिन',
  'Member Login': 'मेंबर लॉगिन',
  Dashboard: 'डैशबोर्ड',
  'Add Block & Villages': 'ब्लॉक और गांव जोड़ें',
  'Saved Blocks': 'सेव किए गए ब्लॉक',
  'Manage Users': 'यूजर प्रबंधन',
  'Withdrawal Requests': 'निकासी अनुरोध',
  'Wallet History': 'वॉलेट हिस्ट्री',
  'Card Submissions': 'कार्ड सबमिशन',
  'Reward Settings': 'रिवॉर्ड सेटिंग्स',
  Logout: 'लॉगआउट',
  Refresh: 'रिफ्रेश',
  'Search users': 'यूजर खोजें',
  Search: 'खोजें',
  Clear: 'साफ करें',
  'Select All': 'सभी चुनें',
  Delete: 'डिलीट',
  'Delete Selected': 'चयनित डिलीट करें',
  'Delete Record': 'रिकॉर्ड डिलीट करें',
  'Delete Block': 'ब्लॉक डिलीट करें',
  'Hide Details': 'विवरण छिपाएं',
  'Edit Block': 'ब्लॉक एडिट करें',
  'Save Changes': 'परिवर्तन सेव करें',
  'Add Village': 'गांव जोड़ें',
  Village: 'गांव',
  Block: 'ब्लॉक',
  District: 'जिला',
  Tehsil: 'तहसील',
  State: 'राज्य',
  'Loading...': 'लोड हो रहा है...',
  'Loading blocks...': 'ब्लॉक लोड हो रहे हैं...',
  'Loading wallet history...': 'वॉलेट हिस्ट्री लोड हो रही है...',
  'Loading card submissions...': 'कार्ड सबमिशन लोड हो रहे हैं...',
  'No matching users found.': 'कोई मिलान करने वाला यूजर नहीं मिला।',
  'No wallet users found.': 'कोई वॉलेट यूजर नहीं मिला।',
  'No card submissions found.': 'कोई कार्ड सबमिशन नहीं मिला।',
  'No photo': 'कोई फोटो नहीं',
  'No matches found.': 'कोई परिणाम नहीं मिला।',
  'Saved at:': 'सेव समय:',
  Mobile: 'मोबाइल',
  Email: 'ईमेल',
  Role: 'भूमिका',
  Village: 'गांव',
  'Referral ID': 'रेफरल आईडी',
  'Total Transactions': 'कुल ट्रांजैक्शन',
  'All Wallet History': 'सभी वॉलेट हिस्ट्री',
  'Cyber Crime Suraksha Sangh Portal': 'साइबर क्राइम सुरक्षा संघ पोर्टल',
  'Track your Complaint': 'अपनी शिकायत ट्रैक करें',
  'Financial Fraud': 'वित्तीय धोखाधड़ी',
  'FINANCIAL FRAUD': 'वित्तीय धोखाधड़ी',
  'Other Cyber Crime': 'अन्य साइबर अपराध',
  'OTHER CYBER CRIME': 'अन्य साइबर अपराध',
  'Women/Children Related Crime': 'महिला/बाल संबंधित अपराध',
  'PRIVATE LEAK PHOTO COMPLAINT': 'प्राइवेट लीक फोटो शिकायत',
  'STOLEN PHONE COMPLAINT': 'चोरी हुआ फोन शिकायत',
  'WRONG UPI COMPLAINT': 'गलत यूपीआई शिकायत',
  'WOMEN HELP': 'महिला सहायता',
  'Register Anonymously': 'गुमनाम रूप से शिकायत दर्ज करें',
  'Register & Track': 'रजिस्टर और ट्रैक करें',
  'Register and Track': 'रजिस्टर और ट्रैक करें',
  'Suspect Repository': 'संदिग्ध रिपॉजिटरी',
  'Report Suspect': 'संदिग्ध की रिपोर्ट करें',
  'Cyber Volunteer Concept': 'साइबर वॉलंटियर अवधारणा',
  'Terms & Conditions': 'नियम और शर्तें',
  'Register as a volunteer': 'वॉलंटियर के रूप में रजिस्टर करें',
  'What is Unlawful Content': 'गैरकानूनी कंटेंट क्या है',
  FAQ: 'अक्सर पूछे जाने वाले प्रश्न',
  Advisories: 'एडवाइजरी',
  'Cyber Safety Tips': 'साइबर सुरक्षा सुझाव',
  'Cyber Awareness': 'साइबर जागरूकता',
  'Media Gallery': 'मीडिया गैलरी',
  'Photo Gallery': 'फोटो गैलरी',
  'Video Gallery': 'वीडियो गैलरी',
  'Radio Jingles': 'रेडियो जिंगल्स',
  'Daily Digest': 'डेली डाइजेस्ट',
  'Training Resources': 'ट्रेनिंग संसाधन',
  'Screen Reader': 'स्क्रीन रीडर',
  'RTI Public Notices': 'आरटीआई पब्लिक नोटिस',
  'CPGRAMS Public Notices': 'सीपीग्राम्स पब्लिक नोटिस',
  "What's New": 'नया अपडेट',
  'Best practices for secure UPI and banking usage': 'सुरक्षित यूपीआई और बैंकिंग उपयोग के सर्वोत्तम तरीके',
  'Citizen volunteer registration open now': 'सिटीजन वॉलंटियर पंजीकरण अब खुला है',
  'Safety advisory for digital payment fraud cases': 'डिजिटल पेमेंट धोखाधड़ी मामलों के लिए सुरक्षा सलाह',
  'New awareness guide for women and children safety online': 'महिला और बच्चों की ऑनलाइन सुरक्षा के लिए नई जागरूकता गाइड',
  'How to report social media harassment quickly': 'सोशल मीडिया उत्पीड़न की जल्दी रिपोर्ट कैसे करें',
  'Helpline support expanded for cyber financial fraud victims': 'साइबर वित्तीय धोखाधड़ी पीड़ितों के लिए हेल्पलाइन सहायता बढ़ाई गई',
  Login: 'लॉगिन',
  'Signing in...': 'साइन इन हो रहा है...',
  Password: 'पासवर्ड',
  Username: 'यूजरनेम',
}

const textNodeOriginalMap = new WeakMap()
const attributeOriginalMap = new WeakMap()

const ATTRIBUTES_TO_TRANSLATE = ['placeholder', 'title', 'aria-label', 'alt']
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT'])

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const translationEntries = Object.entries(HI_TRANSLATIONS)
  .sort((left, right) => right[0].length - left[0].length)

const translateString = (value, language) => {
  const original = String(value || '')
  if (language !== 'hi' || !original.trim()) {
    return original
  }

  let translated = original

  for (const [source, target] of translationEntries) {
    const matcher = new RegExp(escapeRegExp(source), 'gi')
    translated = translated.replace(matcher, target)
  }

  return translated
}

const translateTextNode = (node, language) => {
  const initialValue = textNodeOriginalMap.has(node)
    ? textNodeOriginalMap.get(node)
    : node.nodeValue

  if (!textNodeOriginalMap.has(node)) {
    textNodeOriginalMap.set(node, initialValue)
  }

  const nextValue = language === 'hi'
    ? translateString(initialValue, 'hi')
    : initialValue

  if (node.nodeValue !== nextValue) {
    node.nodeValue = nextValue
  }
}

const translateElementAttributes = (element, language) => {
  if (!attributeOriginalMap.has(element)) {
    attributeOriginalMap.set(element, {})
  }

  const originalAttributes = attributeOriginalMap.get(element)

  ATTRIBUTES_TO_TRANSLATE.forEach((attributeName) => {
    const currentValue = element.getAttribute(attributeName)
    if (currentValue == null) {
      return
    }

    if (!Object.prototype.hasOwnProperty.call(originalAttributes, attributeName)) {
      originalAttributes[attributeName] = currentValue
    }

    const baseValue = originalAttributes[attributeName]
    const nextValue = language === 'hi'
      ? translateString(baseValue, 'hi')
      : baseValue

    if (element.getAttribute(attributeName) !== nextValue) {
      element.setAttribute(attributeName, nextValue)
    }
  })
}

export const applyLanguageToDocument = (language, rootNode = document.body) => {
  if (!rootNode) {
    return
  }

  const normalizedLanguage = language === 'hi' ? 'hi' : 'en'
  const walker = document.createTreeWalker(
    rootNode,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parentTagName = node.parentElement?.tagName
        if (parentTagName && SKIP_TAGS.has(parentTagName)) {
          return NodeFilter.FILTER_REJECT
        }

        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT
        }

        return NodeFilter.FILTER_ACCEPT
      },
    },
  )

  const nodes = []
  let current = walker.nextNode()

  while (current) {
    nodes.push(current)
    current = walker.nextNode()
  }

  nodes.forEach((node) => translateTextNode(node, normalizedLanguage))

  if (rootNode.nodeType === Node.ELEMENT_NODE) {
    translateElementAttributes(rootNode, normalizedLanguage)
  }

  if (rootNode.querySelectorAll) {
    rootNode.querySelectorAll('*').forEach((element) => {
      if (!SKIP_TAGS.has(element.tagName)) {
        translateElementAttributes(element, normalizedLanguage)
      }
    })
  }
}

const getHeaderRoots = () => {
  if (typeof window === 'undefined') {
    return []
  }

  return Array.from(window.document.querySelectorAll(HEADER_TRANSLATION_SELECTOR))
}

const isNodeWithinHeader = (node) => {
  if (!node) {
    return false
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node
    if (element.matches?.(HEADER_TRANSLATION_SELECTOR)) {
      return true
    }

    if (element.closest?.(HEADER_TRANSLATION_SELECTOR)) {
      return true
    }

    return Boolean(element.querySelector?.(HEADER_TRANSLATION_SELECTOR))
  }

  if (node.nodeType === Node.TEXT_NODE) {
    return Boolean(node.parentElement?.closest?.(HEADER_TRANSLATION_SELECTOR))
  }

  return false
}

export const applyLanguageToHeader = (language) => {
  const headerRoots = getHeaderRoots()
  headerRoots.forEach((headerRoot) => {
    applyLanguageToDocument(language, headerRoot)
  })
}

export const startHeaderLanguageObserver = (getLanguage) => {
  if (typeof window === 'undefined' || !window.document?.body) {
    return () => {}
  }

  const observer = new MutationObserver((mutations) => {
    const currentLanguage = getLanguage() === 'hi' ? 'hi' : 'en'

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (isNodeWithinHeader(node)) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            applyLanguageToDocument(currentLanguage, node)
          } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
            applyLanguageToDocument(currentLanguage, node.parentElement)
          }
        }
      })
    })
  })

  observer.observe(window.document.body, {
    childList: true,
    subtree: true,
  })

  return () => observer.disconnect()
}

export const startLanguageObserver = (getLanguage) => {
  if (typeof window === 'undefined' || !window.document?.body) {
    return () => {}
  }

  const observer = new MutationObserver((mutations) => {
    const currentLanguage = getLanguage() === 'hi' ? 'hi' : 'en'

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          applyLanguageToDocument(currentLanguage, node)
        } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
          applyLanguageToDocument(currentLanguage, node.parentElement)
        }
      })
    })
  })

  observer.observe(window.document.body, {
    childList: true,
    subtree: true,
  })

  return () => observer.disconnect()
}
