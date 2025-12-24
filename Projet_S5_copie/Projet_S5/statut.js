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
    status_management:"Gestion des Statuts",
    code: "Code",
    change_status: "Statut",
  },
  en: {
    title: "Status",
    menu: "Menu",
    home: "Home",
    add: "Add Delivery",
    pickup: "Pickup",
    list: "Delivery List",
    prices: "Delivery Rates",
    status: "Status",
    modify: "Modify",
    logout: "Logout",
    status_management:"Status Management",
    code: "Code",
    change_status: "Change Status",
  },
  ar: {
    title: "الحالة",
    menu: "القائمة",
    home: "الصفحة الرئيسية",
    add: "إضافة تسليم",
    pickup: "الاستلام",
    list: "قائمة التسليم",
    prices: "أسعار التسليم",
    status: "الحالة",
    modify: "تعديل",
    logout: "تسجيل الخروج",
    status_management:"إدارة الحالة",
    code: "الرمز",
    change_status: "تغيير الحالة",
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

let listeProduits = JSON.parse(localStorage.getItem("produits")) || [];
let tbody = document.querySelector("#dataTable tbody");
tbody.innerHTML = "";

listeProduits.forEach((produit, index) => {
  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${produit.code}</td>
    <td>
      <select onchange="changerStatut(this, ${index})">
        <option value="En attente" ${produit.statut === "En attente" ? "selected" : ""}>En attente</option>
        <option value="En cours" ${produit.statut === "En cours" ? "selected" : ""}>En cours</option>
        <option value="Livrée" ${produit.statut === "Livrée" ? "selected" : ""}>Livrée</option>
        <option value="Annulée" ${produit.statut === "Annulée" ? "selected" : ""}>Annulée</option>
      </select>
    </td>
  `;
  tbody.appendChild(row);
});

function changerStatut(select, index) {
  listeProduits[index].statut = select.value;
  localStorage.setItem("produits", JSON.stringify(listeProduits));

}




function changerStatut(select, index) {
  listeProduits[index].statut = select.value;
  localStorage.setItem("produits", JSON.stringify(listeProduits));

  // Supprimer anciennes classes
  select.classList.remove("statut-attente", "statut-encours", "statut-livree", "statut-annulee");

  // Ajouter la classe selon le statut choisi
  if (select.value === "En attente") select.classList.add("statut-attente");
  if (select.value === "En cours") select.classList.add("statut-encours");
  if (select.value === "Livrée") select.classList.add("statut-livree");
  if (select.value === "Annulée") select.classList.add("statut-annulee");
}

