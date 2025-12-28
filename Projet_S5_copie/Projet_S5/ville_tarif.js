/* TRANSLATIONS */
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
    blacklist_title : "Liste des tarifs",
    modify: "Modifier",
    logout: "Déconnexion",
    delivery_prices: "Tarifs de livraison – Grandes villes du Maroc",
    city: "Ville",
    standard_rate: "Tarif Standard",
    express_rate: "Tarif Express",
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
    blacklist_title: "Black List",
    modify: "Modify",
    logout: "Logout",
    delivery_prices: "Delivery Prices – Major Cities in Morocco",
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
    blacklist_title : "القائمة السوداء",
    modify: "تعديل",
    logout: "تسجيل الخروج",
    delivery_prices: "أسعار التسليم – المدن الكبرى في المغرب",
    city: "المدينة",
    standard_rate: "السعر العادي",
    express_rate: "السعر السريع",
  }
};

/* DARK MODE */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// pour cacher les options admin si user connecté
if(JSON.parse(sessionStorage.getItem("connectedUser")).role=="user"){
  document.body.classList.add("admin");
}

/* APPLY LANGUAGE */
function applyLanguage() {
  const lang = localStorage.getItem("language") || "fr";
  
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n] || el.dataset.i18n;
  });
  
  document.querySelectorAll("[data-i18n-value]").forEach(el => {
    el.value = translations[lang][el.dataset.i18nValue] || el.dataset.i18nValue;
  });
  
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", lang === "ar");
}

applyLanguage();

/* TARIFS MANAGEMENT */
const STORAGE_KEY = 'tarifs_simple_v1';

const defaultTarifs = {
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

// Get tarifs
function getTarifs() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { ...defaultTarifs };
}

// Save tarifs
function setTarifs(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

// Check if user is admin
function isAdmin() {
  const user = sessionStorage.getItem('connectedUser');
  return user && JSON.parse(user).role === 'admin';
}

// Render table
function render() {
  const tbody = document.getElementById('tarifs-body');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  const tarifs = getTarifs();
  const admin = isAdmin();
  
  Object.keys(tarifs).sort().forEach(city => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${city}</td>
      <td>${tarifs[city].standard} MAD</td>
      <td>${tarifs[city].express} MAD</td>
      <td>
        <button class="edit" data-city="${city}" ${!admin ? 'style="display:none"' : ''}>Modifier</button>
        <button class="del" data-city="${city}" ${!admin ? 'style="display:none"' : ''}>Supprimer</button>
      </td>
    `;
    tbody.appendChild(tr);
    
    if (admin) {
      tr.querySelector('.edit').onclick = () => openForEdit(city);
      tr.querySelector('.del').onclick = () => deleteCity(city);
    }
  });
  
  const openAdd = document.getElementById('open-add');
  if (openAdd) openAdd.style.display = admin ? '' : 'none';
}

// Open edit form
function openForEdit(city) {
  if (!isAdmin()) {
          showPopup("error", t("Action réservée aux administrateurs"));

    return;
  }
  
  const tarifs = getTarifs();
  document.getElementById('original-city').value = city;
  document.getElementById('city-input').value = city;
  document.getElementById('standard-input').value = tarifs[city].standard;
  document.getElementById('express-input').value = tarifs[city].express;
  document.getElementById('form-container').style.display = 'block';
}

// Delete city
function deleteCity(city) {
  if (!isAdmin()) {
      showPopup("error", t("Action réservée aux administrateurs"));

    return;
  }
  
  if (!confirm(`Supprimer ${city} ?`)) return;
  
  const tarifs = getTarifs();
  delete tarifs[city];
  setTarifs(tarifs);
  render();
}

// Save from form
function saveFromForm(e) {
  e.preventDefault();
  
  if (!isAdmin()) {
    showPopup("error", t("Action réservée aux administrateurs"));
    return;
  }
  
  const original = document.getElementById('original-city').value;
  const city = document.getElementById('city-input').value.trim();
  const standard = Number(document.getElementById('standard-input').value);
  const express = Number(document.getElementById('express-input').value);
  
  if (!city) {
    showPopup("error", t("Ville requise"));
    return;
  }
  
  if (isNaN(standard) || isNaN(express)) {
    showPopup("error", t("Tarifs invalides"));
    return;
  }
  
  const tarifs = getTarifs();
  if (original && original !== city) delete tarifs[original];
  tarifs[city] = { standard, express };
  setTarifs(tarifs);
  
  document.getElementById('form-container').style.display = 'none';
  render();
}

// Show add form
function showAdd() {
  if (!isAdmin()) {
    showPopup("error", t("Action réservée aux administrateurs"));
    return;
  }
  
  document.getElementById('original-city').value = '';
  document.getElementById('city-input').value = '';
  document.getElementById('standard-input').value = '';
  document.getElementById('express-input').value = '';
  document.getElementById('form-container').style.display = 'block';
}

/* POPUP*/
function t(key) {
  const lang = localStorage.getItem("language") || "fr";
  return translations[lang][key] || key;
}

function showPopup(type, message) {
  const popup = document.getElementById("popup");
  document.getElementById("popup-title").textContent =
    type === "error" ? t("error") : t("success");
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup-btn").textContent = t("popup_ok");
  popup.classList.remove("hidden");
}
function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

document.getElementById("popup-btn").onclick = closePopup;
document.getElementById("popup-close").onclick = closePopup;


// Initialize
document.addEventListener('DOMContentLoaded', () => {
  render();
  
  const openAdd = document.getElementById('open-add');
  if (openAdd) openAdd.onclick = showAdd;
  
  const form = document.getElementById('tarif-form');
  if (form) form.onsubmit = saveFromForm;
  
  const cancel = document.getElementById('cancel-btn');
  if (cancel) cancel.onclick = () => document.getElementById('form-container').style.display = 'none';
});

