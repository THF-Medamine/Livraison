 /* TRANSLATIONS*/
const translations = {
  fr: {
    title: "Tableau de bord",
  dashboard: "Tableau de bord",
  add_package: "Ajouter un colis",
  list: "Liste des colis",
  pickup: "Demander un ramassage",
  pickup_list: "Liste des ramassages",
 billing: "Facturation",
 returns: "Demandes de retour",
 prices: "Tarifs",
 total_orders: "Total orders",
 total_revenue: "Total revenue",
  },
  en: {
    title: "dashboard",
  dashboard: "Dashboard",
  add_package: "Add package",
  list: "Package list",
  pickup: "Request pickup",
  pickup_list: "Pickup list",
 billing: "Billing",
 returns: "Return requests",
  prices: "Prices",
  total_orders: "Total orders",
  total_revenue: "Total revenue",
  },
  ar: { 
    title: "لوحة القيادة",
  dashboard: "لوحة القيادة",
  add_package: "إضافة طرد",
  list: "قائمة الطرود",
  pickup: "طلب استلام",
  pickup_list: "قائمة الاستلام",
 billing: "الفواتير",
 returns: "طلبات الإرجاع",  
  prices: "الأسعار",
  total_orders: "إجمالي الطلبات",
  total_revenue: "إجمالي الإيرادات",
  }
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


//DARK | LIGHT MODE 

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} 
// pour cacher les options admin si user connecté
if(JSON.parse(sessionStorage.getItem("connectedUser")).role=="user"){
  document.body.classList.add("admin");
}