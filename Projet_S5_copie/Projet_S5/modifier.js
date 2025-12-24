 /* TRANSLATIONS*/
const translations = {
  fr: {
    title: "Modifier la livraison",
    menu: "Menu",
    home: "Accueil",
    add: "Ajouter une livraison",
    pickup: "Ramassage",
    list: "Liste des livraisons",
    prices: "Tarifs de livraison",
    status: "Statut",
    modify: "Modifier",
    logout: "Déconnexion",
    management: "Gestion des livraisons",
    code: "Code",
    actions: "Actions",
  },
  en: { 
    title: "Modify Delivery",
    menu: "Menu",
    home: "Home",
    add: "Add Delivery",
    pickup: "Pickup",
    list: "Delivery List",
    prices: "Delivery Rates",
    status: "Status",
    modify: "Modify",
    logout: "Logout",
    management: "Delivery Management",
    code: "Code",
    actions: "Actions",
  },
  ar: {
    title: "تعديل التسليم",
    menu: "القائمة",
    home: "الصفحة الرئيسية",
    add: "إضافة تسليم",
    pickup: "الاستلام",
    list: "قائمة التسليم",
    prices: "أسعار التسليم",
    status: "الحالة",
    modify: "تعديل",
    logout: "تسجيل الخروج",
    management: "إدارة التسليم",
    code: "الرمز",
    actions: "الإجراءات",
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


listeProduits.forEach(produit => {
  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${produit.code}</td>
  `;
  
  // Colonne Actions
  let td = document.createElement("td");
  td.className = "actions-cell";
  
  // Bouton Modifier
  let modifierButton = document.createElement("button");
  modifierButton.className = "btn-modifier";
  modifierButton.textContent = "Modifier";
  modifierButton.addEventListener("click", () => {
    localStorage.setItem("modif_id", JSON.stringify(produit.id));
    window.location.href = "ajouter.html";    
  });
  td.appendChild(modifierButton);
  
  // Bouton Supprimer
  let deleteButton = document.createElement("button");
  deleteButton.className = "btn-supprimer";
  deleteButton.textContent = "Supprimer";
  deleteButton.addEventListener("click", () => {
    try {
      let userConfirmed = confirm("This element will be deleted.\n Are you sure?");
      
      if (userConfirmed) {
        listeProduits = listeProduits.filter(p => p !== produit);
        localStorage.setItem("produits", JSON.stringify(listeProduits));
        row.remove();
      } else {
        alert("This element will not be deleted.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
  td.appendChild(deleteButton);
  
  row.appendChild(td);
  tbody.appendChild(row);
});
