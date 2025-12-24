// Tableau des tarifs par ville et type
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
function genererCodeLivraison() { 
  let datePart = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 8);
   let randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); 
   return "LIV-" + datePart + "-" + randomPart; 
  }
 //DARK | LIGHT MODE 

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} 

 /* TRANSLATIONS*/
const translations = {
  fr: {
    title: "livraison",
    menu: "Menu",
    home: "Accueil",
    add: "Ajouter une colis",
    pickup: "Ramassage",
    list: "Liste des livraisons",
    prices: "Liste des tarifs",
    status: "Statut",
    modify: "Modifier",
    logout: "Déconnexion",
    pickup_city: "Ville de ramassage",
    client_city: "Ville du client",
    client_name: "Nom du client",
    amount: "Montant total",
    phone_client: "Téléphone du client",
    address_client: "Adresse du client",
    products: "Produits",
    delivery_type: "Type de livraison",
    choose_type: "Choisir le type",
    standard: "Standard",
    express: "Express",
    save: "Enregistrer",

    fill_all_fields: "Veuillez remplir tous les champs",
    city_not_found: "Ville non trouvée dans la liste des tarifs",
    success: "Succès",
    error: "Erreur",
    popup_ok: "OK",
    colis_saved: "Colis enregistré",
    city: "Ville",
    type: "Type",
    net_amount: "Montant net"
  },
  en: {
    title: "delivery",
    menu: "Menu",
    home: "Home",
    add: "Add parcel",
    pickup: "Pickup",
    list: "Deliveries list",
    prices: "Prices list",
    status: "Status",
    modify: "Modify",
    logout: "Logout",
    pickup_city: "Pickup city",
    client_city: "Client city",
    client_name: "Client name",
    amount: "Total amount",
    phone: "Client phone",
    address: "Client address",
    products: "Products",
    delivery_type: "Delivery type",
    choose_type: "Choose type",
    standard: "Standard",
    express: "Express",
    save: "Save",

    fill_all_fields: "Please fill all fields",
    city_not_found: "City not found in price list",
    success: "Success",
    error: "Error",
    popup_ok: "OK",
    colis_saved: "Parcel saved",
    city: "City",
    type: "Type",
    net_amount: "Net amount"
  },ar: {
    title: "التسليم",
    menu: "القائمة",
    home: "الرئيسية",
    add: "إضافة طرد",
    pickup: "الاستلام",
    list: "لائحة التوصيلات",
    prices: "لائحة الأسعار",
    status: "الحالة",
    modify: "تعديل",
    logout: "تسجيل الخروج",
    pickup_city: "مدينة الاستلام",
    client_city: "مدينة الزبون",
    client_name: "اسم الزبون",
    amount: "المبلغ الإجمالي",
    phone: "هاتف الزبون",
    address: "عنوان الزبون",
    products: "المنتجات",
    delivery_type: "نوع التوصيل",
    choose_type: "اختر النوع",
    standard: "عادي",
    express: "سريع",
    save: "حفظ",
    fill_all_fields: "المرجو ملء جميع الخانات",
    city_not_found: "المدينة غير موجودة في لائحة الأسعار",
    success: "نجاح",
    error: "خطأ",
    popup_ok: "حسناً",
    colis_saved: "تم تسجيل الطرد",
    city: "المدينة",
    type: "النوع",
    net_amount: "المبلغ الصافي"
  },
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


/* POPUP*/
function t(key) {
  const lang = localStorage.getItem("language") || "fr";
  return translations[lang][key] || key;
}

function showPopup(type, message) {
  console.log("fs");
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

// Charger les données existantes
let data_array = [];
if (localStorage.getItem("produits") !== null) {
  data_array = JSON.parse(localStorage.getItem("produits"));
}

// Fonction ajouter
function ajouter(e) {
  e.preventDefault();
  
  // Récupération des champs
  let villeRamassage = document.getElementById("ville_ramassage").value.trim();
  let villeClient = document.getElementById("ville_client").value.trim();
  let typeLivraison = document.getElementById("type_livraison").value.trim();
  let nomClient = document.getElementById("Nom_client").value.trim();
  let montantProduits = parseFloat(document.getElementById("Montant").value);
  let telephoneClient = document.getElementById("telephone_client").value.trim();
  let adresseClient = document.getElementById("Adreese_client").value.trim();
  let produit = document.getElementById("Produit").value.trim();

  // Vérification si un champ est vide
  if (!villeRamassage || !villeClient || !typeLivraison || !nomClient || !montantProduits || !telephoneClient || !adresseClient || !produit) {
showPopup("error", t("fill_all_fields"));
return;
  }

  // Vérifier que la ville existe dans le tableau
  if (!tarifsLivraison[villeClient]) {
    showPopup("error", t("city_not_found"));
return;

  }

  // Récupérer le tarif selon ville et type
  let tarif = tarifsLivraison[villeClient][typeLivraison];
  let montantNet = montantProduits - tarif;

  let codeLivraison = genererCodeLivraison();
  // Création de l’objet colis
  const date = new Date();
  let data = {
    code: codeLivraison,
    ville_ramassage: villeRamassage,
    ville_client: villeClient,
    type_livraison: typeLivraison,
    nom_client: nomClient,
    montant_produits: montantProduits,
    tarif_livraison: tarif,
    montant_net: montantNet,
    telephone_client: telephoneClient,
    adresse_client: adresseClient,
    produit: produit,
    statut: "En attente",
    date: date.toLocaleString(),
    id: Date.now(),   //crypto.randomUUID();        Identifiant unique
  };

  // Ajouter au tableau
  data_array.push(data);

  // Sauvegarde dans localStorage
  localStorage.setItem("produits", JSON.stringify(data_array));

  // Confirmation
showPopup(
  "success",
  t("colis_saved") + "\n" +
  t("city") + ": " + villeClient + "\n" +
  t("type") + ": " + t(typeLivraison) + "\n" +
  t("net_amount") + ": " + montantNet + " MAD"
);


  // Réinitialiser les champs
  document.querySelectorAll("#ville_ramassage, #ville_client, #type_livraison, #Nom_client, #Montant, #telephone_client, #Adreese_client, #Produit")
    .forEach(input => input.value = "");
}


// modification des champs si id_modif existe
let id_modifier = JSON.parse(localStorage.getItem("modif_id"));
if (id_modifier !== null) {
  let produitAModifier = data_array.find(p => p.id === id_modifier);
  if (produitAModifier) {
    document.getElementById("ville_ramassage").value = produitAModifier.ville_ramassage;
    document.getElementById("ville_client").value = produitAModifier.ville_client;
    document.getElementById("type_livraison").value = produitAModifier.type_livraison;
    document.getElementById("Nom_client").value = produitAModifier.nom_client;
    document.getElementById("Montant").value = produitAModifier.montant_produits;
    document.getElementById("telephone_client").value = produitAModifier.telephone_client;
    document.getElementById("Adreese_client").value = produitAModifier.adresse_client;
    document.getElementById("Produit").value = produitAModifier.produit;
  }
  // Supprimer l'ID de modification après le chargement
  localStorage.removeItem("modif_id");
   let delet = data_array.filter(p => p.id !== id_modifier);
   localStorage.setItem("produits", JSON.stringify(delet));
   data_array = delet;
}