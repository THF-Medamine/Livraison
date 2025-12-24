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
    pickup_city: "Ville de ramassage",
    client_name: "Nom du client",
    client_phone: "Téléphone",
    address_client: "Adresse",
    number_of_packages: "Nombre de colis",
    save: "Enregistrer"
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
    pickup_city: "Pickup City",
    client_name: "Client Name",
    client_phone: "Phone",
    address_client: "Address",
    number_of_packages: "Number of Packages",
    save: "Save"
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
    pickup_city: "مدينة الاستلام",
    client_name: "اسم العميل",
    client_phone: "الهاتف",
    address_client: "العنوان",
    number_of_packages: "عدد الطرود",
    save: "حفظ"
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


document.getElementById('ramassage').addEventListener('submit', function(e) {
    e.preventDefault(); // empêche l'envoi automatique

    let ville = document.getElementById('ville_ramassage');
    let nom = document.getElementById('nom');
    let tel = document.getElementById('telephone');
    let adresse = document.getElementById('adresse');
    let colis = document.getElementById('nombre_colis');

    let inputs = [ville, nom, tel, adresse, colis];
    let allValid = true;

    // Vérifie chaque champ
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add("invalid");
            allValid = false;
        } else {
            input.classList.remove("invalid");
        }
    });

    if (!allValid) {
        alert("⚠️ Veuillez remplir tous les champs avant d'enregistrer !");
        return;
    }

    // Si tout est rempli → stocker dans localStorage
    localStorage.setItem('ville_ramassage', ville.value);
    localStorage.setItem('nom', nom.value);
    localStorage.setItem('telephone', tel.value);
    localStorage.setItem('adresse', adresse.value);
    localStorage.setItem('nombre_colis', colis.value);

    alert("✅ Informations de ramassage enregistrées avec succès !");
});
if(localStorage.length>0){
    document.getElementById('ville_ramassage').value = localStorage.getItem('ville_ramassage');
    document.getElementById('nom').value = localStorage.getItem('nom');
    document.getElementById('telephone').value = localStorage.getItem('telephone');
    document.getElementById('adresse_client').value = localStorage.getItem('adresse');
    document.getElementById('nombre_colis').value = localStorage.getItem('nombre_colis');
}

