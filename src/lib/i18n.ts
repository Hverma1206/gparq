import { createContext, useContext } from "react";

export type Language = "en" | "hi" | "kn" | "ta" | "te" | "mr";

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  "nav.home": {
    en: "Home",
    hi: "होम",
    kn: "ಮುಖಪುಟ",
    ta: "முகப்பு",
    te: "హోమ్",
    mr: "मुख्यपृष्ठ"
  },
  "nav.dashboard": {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    ta: "டாஷ்போர்ட்",
    te: "డాష్‌బోర్డ్",
    mr: "डॅशबोर्ड"
  },
  "nav.findParking": {
    en: "Find Parking",
    hi: "पार्किंग खोजें",
    kn: "ಪಾರ್ಕಿಂಗ್ ಹುಡುಕಿ",
    ta: "பார்க்கிங் கண்டுபிடி",
    te: "పార్కింగ్ కనుగొనండి",
    mr: "पार्किंग शोधा"
  },
  "nav.myBookings": {
    en: "My Bookings",
    hi: "मेरी बुकिंग",
    kn: "ನನ್ನ ಬುಕಿಂಗ್‌ಗಳು",
    ta: "என் புக்கிங்ஸ்",
    te: "నా బుకింగ్‌లు",
    mr: "माझे बुकिंग"
  },
  "nav.wallet": {
    en: "Wallet",
    hi: "वॉलेट",
    kn: "ವಾಲೆಟ್",
    ta: "வாலட்",
    te: "వాలెట్",
    mr: "वॉलेट"
  },
  "nav.profile": {
    en: "Profile",
    hi: "प्रोफाइल",
    kn: "ಪ್ರೊಫೈಲ್",
    ta: "சுயவிவரம்",
    te: "ప్రొఫైల్",
    mr: "प्रोफाइल"
  },
  "nav.settings": {
    en: "Settings",
    hi: "सेटिंग्स",
    kn: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    ta: "அமைப்புகள்",
    te: "సెట్టింగులు",
    mr: "सेटिंग्ज"
  },

  // Common actions
  "action.search": {
    en: "Search",
    hi: "खोजें",
    kn: "ಹುಡುಕಿ",
    ta: "தேடு",
    te: "వెతకండి",
    mr: "शोधा"
  },
  "action.book": {
    en: "Book Now",
    hi: "अभी बुक करें",
    kn: "ಈಗ ಬುಕ್ ಮಾಡಿ",
    ta: "இப்போது புக் செய்",
    te: "ఇప్పుడు బుక్ చేయండి",
    mr: "आता बुक करा"
  },
  "action.cancel": {
    en: "Cancel",
    hi: "रद्द करें",
    kn: "ರದ್ದುಮಾಡಿ",
    ta: "ரத்து செய்",
    te: "రద్దు చేయండి",
    mr: "रद्द करा"
  },
  "action.confirm": {
    en: "Confirm",
    hi: "पुष्टि करें",
    kn: "ದೃಢೀಕರಿಸಿ",
    ta: "உறுதிப்படுத்து",
    te: "నిర్ధారించండి",
    mr: "पुष्टी करा"
  },
  "action.save": {
    en: "Save",
    hi: "सहेजें",
    kn: "ಉಳಿಸಿ",
    ta: "சேமி",
    te: "సేవ్ చేయండి",
    mr: "जतन करा"
  },
  "action.edit": {
    en: "Edit",
    hi: "संपादित करें",
    kn: "ಸಂಪಾದಿಸಿ",
    ta: "திருத்து",
    te: "సవరించండి",
    mr: "संपादित करा"
  },
  "action.delete": {
    en: "Delete",
    hi: "हटाएं",
    kn: "ಅಳಿಸಿ",
    ta: "நீக்கு",
    te: "తొలగించండి",
    mr: "हटवा"
  },
  "action.logout": {
    en: "Logout",
    hi: "लॉग आउट",
    kn: "ಲಾಗ್ ಔಟ್",
    ta: "வெளியேறு",
    te: "లాగ్ అవుట్",
    mr: "लॉग आउट"
  },

  // Booking related
  "booking.upcoming": {
    en: "Upcoming",
    hi: "आगामी",
    kn: "ಮುಂಬರುವ",
    ta: "வரவிருக்கும்",
    te: "రాబోయే",
    mr: "आगामी"
  },
  "booking.active": {
    en: "Active",
    hi: "सक्रिय",
    kn: "ಸಕ್ರಿಯ",
    ta: "செயலில்",
    te: "క్రియాశీల",
    mr: "सक्रिय"
  },
  "booking.completed": {
    en: "Completed",
    hi: "पूर्ण",
    kn: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    ta: "நிறைவடைந்தது",
    te: "పూర్తయింది",
    mr: "पूर्ण"
  },
  "booking.cancelled": {
    en: "Cancelled",
    hi: "रद्द",
    kn: "ರದ್ದುಮಾಡಲಾಗಿದೆ",
    ta: "ரத்து செய்யப்பட்டது",
    te: "రద్దు చేయబడింది",
    mr: "रद्द"
  },

  // Payment related
  "payment.pay": {
    en: "Pay",
    hi: "भुगतान करें",
    kn: "ಪಾವತಿಸಿ",
    ta: "செலுத்து",
    te: "చెల్లించండి",
    mr: "पैसे द्या"
  },
  "payment.success": {
    en: "Payment Successful",
    hi: "भुगतान सफल",
    kn: "ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ",
    ta: "பணம் செலுத்தல் வெற்றி",
    te: "చెల్లింపు విజయవంతమైంది",
    mr: "पेमेंट यशस्वी"
  },
  "payment.failed": {
    en: "Payment Failed",
    hi: "भुगतान विफल",
    kn: "ಪಾವತಿ ವಿಫಲವಾಗಿದೆ",
    ta: "பணம் செலுத்தல் தோல்வி",
    te: "చెల్లింపు విఫలమైంది",
    mr: "पेमेंट अयशस्वी"
  },
  "payment.addMoney": {
    en: "Add Money",
    hi: "पैसे जोड़ें",
    kn: "ಹಣ ಸೇರಿಸಿ",
    ta: "பணம் சேர்",
    te: "డబ్బు జోడించండి",
    mr: "पैसे जोडा"
  },

  // Time related
  "time.hours": {
    en: "hours",
    hi: "घंटे",
    kn: "ಗಂಟೆಗಳು",
    ta: "மணி",
    te: "గంటలు",
    mr: "तास"
  },
  "time.minutes": {
    en: "minutes",
    hi: "मिनट",
    kn: "ನಿಮಿಷಗಳು",
    ta: "நிமிடங்கள்",
    te: "నిమిషాలు",
    mr: "मिनिटे"
  },
  "time.today": {
    en: "Today",
    hi: "आज",
    kn: "ಇಂದು",
    ta: "இன்று",
    te: "ఈరోజు",
    mr: "आज"
  },
  "time.tomorrow": {
    en: "Tomorrow",
    hi: "कल",
    kn: "ನಾಳೆ",
    ta: "நாளை",
    te: "రేపు",
    mr: "उद्या"
  },

  // Vehicle types
  "vehicle.car": {
    en: "Car",
    hi: "कार",
    kn: "ಕಾರು",
    ta: "கார்",
    te: "కారు",
    mr: "कार"
  },
  "vehicle.bike": {
    en: "Bike",
    hi: "बाइक",
    kn: "ಬೈಕ್",
    ta: "பைக்",
    te: "బైక్",
    mr: "बाईक"
  },
  "vehicle.suv": {
    en: "SUV",
    hi: "एसयूवी",
    kn: "ಎಸ್‌ಯುವಿ",
    ta: "எஸ்யூவி",
    te: "ఎస్‌యువి",
    mr: "एसयूव्ही"
  },

  // Messages
  "message.welcome": {
    en: "Welcome to Parq",
    hi: "पार्क में आपका स्वागत है",
    kn: "ಪಾರ್ಕ್‌ಗೆ ಸುಸ್ವಾಗತ",
    ta: "பார்க்கிற்கு வரவேற்கிறோம்",
    te: "పార్క్‌కి స్వాగతం",
    mr: "पार्कमध्ये आपले स्वागत आहे"
  },
  "message.noResults": {
    en: "No results found",
    hi: "कोई परिणाम नहीं मिला",
    kn: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    ta: "முடிவுகள் இல்லை",
    te: "ఫలితాలు కనుగొనబడలేదు",
    mr: "कोणतेही परिणाम नाहीत"
  },
  "message.loading": {
    en: "Loading...",
    hi: "लोड हो रहा है...",
    kn: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    ta: "ஏற்றுகிறது...",
    te: "లోడ్ అవుతోంది...",
    mr: "लोड होत आहे..."
  },
  "message.error": {
    en: "Something went wrong",
    hi: "कुछ गलत हो गया",
    kn: "ಏನೋ ತಪ್ಪಾಗಿದೆ",
    ta: "ஏதோ தவறு நடந்தது",
    te: "ఏదో తప్పు జరిగింది",
    mr: "काहीतरी चूक झाली"
  }
};

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  kn: "ಕನ್ನಡ",
  ta: "தமிழ்",
  te: "తెలుగు",
  mr: "मराठी"
};

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key
});

export const useI18n = () => useContext(I18nContext);

export const getTranslation = (key: string, language: Language): string => {
  return translations[key]?.[language] || translations[key]?.en || key;
};
