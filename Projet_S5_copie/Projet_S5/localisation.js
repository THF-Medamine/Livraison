  /* TRANSLATIONS*/
  const translations = {
    fr: {
      title: "Localisation",
      menu: "Menu",
      home: "Accueil",
      add: "Ajouter une livraison",
      pickup: "Ramassage",
      list: "Liste des livraisons",
      prices: "Tarifs de livraison",
      status: "Statut",
      location: "Localisation",
        Black_liste : "Liste noire",
        logout: "Déconnexion",
        location_title: "Localisation de compagnie",
    },
    en: {
      title: "Location",
        menu: "Menu",
        home: "Home",
        add: "Add a delivery",
        pickup: "Pickup",
        list: "List of deliveries",
        prices: "Delivery prices",
        status: "Status",
        location: "Location",
        Black_liste : "Black list",
        logout: "Logout",
        location_title: "Company Location",
    },
    ar: {   
        title: "الموقع",
        menu: "القائمة",
        home: "الرئيسية",
        add: "إضافة توصيل",
        pickup: "الاستلام",
        list: "قائمة التوصيلات",
        prices: "أسعار التوصيل",
        status: "الحالة",
        location: "الموقع",
        Black_liste : "القائمة السوداء",
        logout: "تسجيل الخروج",
        location_title: "موقع الشركة"
    }
  };

 //DARK | LIGHT MODE 

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

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
