 /* TRANSLATIONS*/
const translations = {
  fr: {
    title: "Liste des livraisons",
    menu: "Menu",
    home: "Accueil",
    add: "Ajouter une livraison",
    pickup: "Ramassage",
    list: "Liste des livraisons",
    prices: "Tarifs de livraison",
    status: "Statut",
    modify: "Modifier",
    logout: "Déconnexion",

    filter_by_status: "Filtrer par statut :",
    all: "Tous",
    in_progress: "En cours",
    delivered: "Livrée",
    pending: "En attente",
    cancelled: "Annulée",

    code: "Code",
    pickup_city: "Ville de ramassage",
    client_city: "Ville du client",
    delivery_type: "Type de livraison",
    client_name: "Nom du client",
    product_amount: "Montant des produits",
    delivery_fee: "Tarif de livraison",
    net_amount: "Montant net",
    phone: "Téléphone",
    address: "Adresse",
    product: "Produit",
    date: "Date",
    status: "Statut"
  },
  en: { 
    title: "Delivery List",
    menu: "Menu",
    home: "Home",
    add: "Add Delivery",
    pickup: "Pickup",
    list: "Delivery List",
    prices: "Delivery Rates",
    status: "Status",
    modify: "Modify",
    logout: "Logout",
    filter_by_status: "Filter by status:",
    all: "All",
    in_progress: "In Progress",
    delivered: "Delivered",
    pending: "Pending",
    cancelled: "Cancelled",
    code: "Code",
    pickup_city: "Pickup City",
    client_city: "Client City",
    delivery_type: "Delivery Type",
    client_name: "Client Name",
    product_amount: "Product Amount",
    delivery_fee: "Delivery Fee",
    net_amount: "Net Amount",
    phone: "Phone",
    address: "Address",
    product: "Product",
    date: "Date",
    status: "Status",
  },
  ar: {
    title: "قائمة التسليمات",
    menu: "القائمة",
    home: "الصفحة الرئيسية",
    add: "إضافة تسليم",
    pickup: "الاستلام",
    list: "قائمة التسليم",
    prices: "أسعار التوصيل",
    status: "الحالة",
    modify: "تعديل",
    logout: "تسجيل الخروج",
    filter_by_status: "التصفية حسب الحالة:",
    all: "الكل",
    in_progress: "قيد التنفيذ",
    delivered: "تم التوصيل",
    pending: "قيد الانتظار",
    cancelled: "ملغاة",
    code: "الرمز",
    pickup_city: "مدينة الاستلام",
    client_city: "مدينة العميل",
    delivery_type: "نوع التسليم",
    client_name: "اسم العميل",
    product_amount: "قيمة المنتجات",
    delivery_fee: "رسوم التسليم",
    net_amount: "المبلغ الصافي",
    phone: "الهاتف",
    address: "العنوان",
    product: "المنتج",
    date: "التاريخ",
    status: "الحالة",
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

// Récupérer les produits depuis localStorage
let listeProduits = JSON.parse(localStorage.getItem("produits")) || [];

let tbody = document.querySelector("#dataTable tbody");
let statutFilter = document.querySelector("#statutFilter");

// Fonction pour afficher les livraisons selon le filtre
function afficherLivraisons(filtreStatut) {
  tbody.innerHTML = "";
  
  // Filtrer selon le statut sélectionné
  let livraisonsFiltrees = listeProduits;
  
  if (filtreStatut !== "tous") {
    livraisonsFiltrees = listeProduits.filter(produit => 
      produit.statut && produit.statut.toLowerCase() === filtreStatut.toLowerCase()
    );
  }
  
  // Afficher les livraisons filtrées
  if (livraisonsFiltrees.length === 0) {
    tbody.innerHTML = '<tr><td colspan="13" style="text-align:center; padding:40px; color:#a0aec0;">Aucune livraison avec ce statut</td></tr>';
  } else {
    livraisonsFiltrees.forEach(produit => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${produit.code}</td>
        <td>${produit.ville_ramassage}</td>
        <td>${produit.ville_client}</td>
        <td>${produit.type_livraison}</td>
        <td>${produit.nom_client}</td>
        <td>${produit.montant_produits}</td>
        <td>${produit.tarif_livraison}</td>
        <td>${produit.montant_net}</td>
        <td>${produit.telephone_client}</td>
        <td>${produit.adresse_client}</td>
        <td>${produit.produit}</td>
        <td>${produit.date}</td>
        <td><span class="badge-statut badge-${(produit.statut || 'inconnu').toLowerCase().replace(' ', '-')}">${produit.statut || 'N/A'}</span></td>
      `;
      tbody.appendChild(row);
    });
  }
}

// Afficher toutes les livraisons au chargement
afficherLivraisons("tous");

// Écouter les changements du select
statutFilter.addEventListener("change", function() {
  afficherLivraisons(this.value);
});