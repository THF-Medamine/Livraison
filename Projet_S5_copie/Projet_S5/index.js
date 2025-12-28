 /* TRANSLATIONS*/
const translations = {
  fr: {
    title: "Gestion des livraisons",
    menu: "Menu",
    home: "Accueil",
    add: "Ajouter une livraison",
    pickup: "Ramassage",
    list: "Liste des livraisons",
    prices: "Tarifs de livraison",
    status: "Statut",
      Black_liste : "Liste noire",
    modify: "Modifier",
    logout: "Déconnexion",

    welcome_message: "Bienvenue sur notre plateforme de livraison",
  subtitle:"Votre partenaire de confiance pour vos livraisons au Maroc",
  add_package: "Ajouter un colis",
  add_package_desc:"Créez facilement une nouvelle livraison avec tous les détails",
  pickup:" Demander un ramassage",
 pickup_desc:"Planifiez le ramassage de vos colis directement depuis votre adresse",
 track_shipments: "Suivre vos livraisons",
 track_shipments_desc:"Consultez l'état et l'historique de tous vos colis en temps réel",
 transparent_prices: "Tarifs transparents",
 transparent_prices_desc:"Découvrez nos tarifs compétitifs pour toutes les grandes villes",
commencer:"Commencer maintenant",
  voir_tarifs:"Voir nos tarifs"
  },
  en: {
    title: "Delivery Management",
    menu: "Menu",
    home: "Home",
    add: "Add Delivery",
    pickup: "Pickup",
    list: "Delivery List",
    prices: "Delivery Prices",
    status: "Status",
    Black_liste: "Black List",
    modify: "Edit",
    logout: "Logout",
    welcome_message: "Welcome to our delivery platform",
  subtitle:"Your trusted partner for deliveries in Morocco",
  add_package: "Add Package",
  add_package_desc:"Easily create a new delivery with all the details",
  pickup:" Request Pickup",
 pickup_desc:"Schedule the pickup of your packages directly from your address",
  track_shipments: "Track Your Deliveries",
  track_shipments_desc:"Check the status and history of all your packages in real-time",
  transparent_prices: "Transparent Pricing",
  transparent_prices_desc:"Discover our competitive rates for all major cities",
commencer:"Get Started",
  voir_tarifs:"See our prices",
  },
  ar: {
    title: "إدارة التسليم",
    menu: "القائمة",
    home: "الصفحة الرئيسية",
    add: "إضافة تسليم",
    pickup: "الاستلام",
    list: "قائمة التسليم",
    prices: "أسعار التوصيل",
    status: "الحالة",
    Black_liste : "القائمة السوداء",
    modify: "تعديل",
    logout: "تسجيل الخروج",
    welcome_message: "مرحبًا بكم في منصة التوصيل الخاصة بنا",
  subtitle:"شريكك الموثوق لتوصيل الطلبات في المغرب",
  add_package: "إضافة طرد",
  add_package_desc:"قم بإنشاء توصيل جديد بسهولة مع جميع التفاصيل",
  pickup:" طلب استلام",
 pickup_desc:"جدولة استلام طرودك مباشرة من عنوانك",
  track_shipments: "تتبع توصيلاتك",
  track_shipments_desc:"تحقق من حالة وتاريخ جميع طرودك في الوقت الفعلي",
  transparent_prices: "أسعار شفافة",
  transparent_prices_desc:"اكتشف أسعارنا التنافسية لجميع المدن الكبرى",
commencer:"البدء الآن",
  voir_tarifs:"عرض أسعارنا"
  }
};

// pour cacher les options admin si user connecté
if(JSON.parse(sessionStorage.getItem("connectedUser")).role=="user"){
  document.body.classList.add("admin");
}
function t(key) {
  const lang = localStorage.getItem("language") || "fr";
  return translations[lang][key] || key;
}
/* APPLY LANGUAGE */
function setLanguage(lang) {
  localStorage.setItem("language", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n); // dataset pour tout les proprietés qui commence par data-
  });

  document.querySelectorAll("[data-i18n-value]").forEach(el => {
    el.value = t(el.dataset.i18nValue);
  });

if (lang === "ar") {
    document.documentElement.dir = "rtl";
    document.body.classList.add("rtl");
  } else {
    document.documentElement.dir = "ltr";
    document.body.classList.remove("rtl");
  }}

const languageSelect = document.getElementById("languageSelect");
if (languageSelect) {
  languageSelect.value = localStorage.getItem("language") || "fr";
  setLanguage(languageSelect.value);
  languageSelect.addEventListener("change", e => setLanguage(e.target.value));
}

/* DARK / LIGHT MODE*/

const toggle = document.getElementById("toggleDark");
toggle.classList.add("bi");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggle.classList.add("bi-brightness-high-fill");

} else {
  toggle.classList.add("bi-moon");
}

toggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggle.className = "bi " + (isDark ? "bi-brightness-high-fill" : "bi-moon");
});

