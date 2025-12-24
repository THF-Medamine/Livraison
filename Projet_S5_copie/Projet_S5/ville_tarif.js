    /* TRANSLATIONS*/
const translations = {
  fr: {
    title: "Ramassage",
    menu: "Menu",
    home: "Accueil",
    add: "Ajouter une livraison",
    pickup: "Ramassage",
    list: "Liste des livraisons",
    prices: "Tarifs de livraison",
    status: "Statut",
    modify: "Modifier",
    logout: "Déconnexion",
    delivery_prices:"Tarifs de livraison – Grandes villes du Maroc",
    city: "Ville",
    standard_rate: "Tarif Standard",
    express_rate: "Tarif Express ",
  },
  en: {
    title: "Pickup",
    menu: "Menu",
    home: "Home",
    add: "Add Delivery",
    pickup: "Pickup",
    list: "Delivery List",
    prices: "Delivery Rates",
    status: "Status",
    modify: "Modify",
    logout: "Logout",
    delivery_prices:"Delivery Prices – Major Cities in Morocco",
    city: "City",
    standard_rate: "Standard Rate",
    express_rate: "Express Rate",
  },
  ar: {
    title: "الاستلام",
    menu: "القائمة",
    home: "الصفحة الرئيسية",
    add: "إضافة تسليم",
    pickup: "الاستلام",
    list: "قائمة التسليم",
    prices: "أسعار التسليم",
    status: "الحالة",
    modify: "تعديل",
    logout: "تسجيل الخروج",
    delivery_prices:"أسعار التسليم – المدن الكبرى في المغرب",
    city: "المدينة",
    standard_rate: "السعر العادي",
    express_rate: "السعر السريع",
  }
};

 //DARK | LIGHT MODE 

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} 

// Tableau associatif des tarifs de livraison
const tarifsLivraison = {
  "Casablanca": { standard: 25, express: 40 },
  "Rabat": { standard: 30, express: 45 },
  "Marrakech": { standard: 35, express: 50 },
  "Fès": { standard: 30, express: 45 },
  "Tanger": { standard: 35, express: 50 },
  "Agadir": { standard: 40, express: 55 },
  "Oujda": { standard: 45, express: 60 },
  "Meknès": { standard: 30, express: 45 },
  "Kenitra": { standard: 28, express: 42 },
  "El Jadida": { standard: 32, express: 47 },
  "Nador": { standard: 40, express: 55 },
  "Settat": { standard: 28, express: 42 },
  "Mohammedia": { standard: 26, express: 41 },
  "Laâyoune": { standard: 60, express: 80 },
  "Dakhla": { standard: 70, express: 90 }
};
/* APPLY LANGUAGE */
function applyLanguage() {
  const lang = localStorage.getItem("language") || "fr";

  // text
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key] || key;
  });

  // value (button, input)
  document.querySelectorAll("[data-i18n-value]").forEach(el => {
    const key = el.dataset.i18nValue;
    el.value = translations[lang][key] || key;
  });

 if (lang === "ar") {
    document.documentElement.dir = "rtl";
    document.body.classList.add("rtl");
  } else {
    document.documentElement.dir = "ltr";
    document.body.classList.remove("rtl");
  }
}

applyLanguage();
