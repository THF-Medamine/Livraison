 //DARK | LIGHT MODE 

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} 
/* TRANSLATIONS*/
const translations = {
  fr: {
   title  : "Liste Noire",
   menu : "Menu",
    home : "Accueil",
    add: "Ajouter une colis",
    pickup: "Ramassage",
    list: "Liste des livraisons",
    prices: "Liste des tarifs",
    status: "Statut",
    Black_liste: "Liste Noire",
    modify: "Modifier",
    location: "Localisation",
    logout: "Déconnexion",
    ajouter : "Ajouter",
   blacklist_title : "📵 Liste Noire",
   empty_list : "Aucun numéro ajouté",
   total_numbers : "Total :",
   numbers_suffix : "numéro(s)",
   modal_title : "Modifier le numéro",
   modal_placeholder : "Entrez le nouveau numéro...",
   cancel_button : "Annuler",
   confirm_button : "Confirmer",
   input_placeholder : "Entrez un numéro de téléphone",
   message1 : "Veuillez entrer un numéro !!",
   message2 : "Le numéro doit contenir uniquement des chiffres !!",
   message3 : "Le numéro doit contenir entre 6 et 15 chiffres !!",
   message4 : "Ce numéro est déjà dans la liste",
   message5 : "Veuillez entrer un numéro !!",
   message6 : "Ce numéro est déjà dans la liste",
   Modifier : "Modifier",
   Supprimer : "Supprimer",
   error : "Erreur",
   success : "Succès",
   ok : "OK",
  },
  en: {
    title  : "Black List",
    menu : "Menu",
    home : "Home",
   add: "Add parcel",
    pickup: "Pickup",
    list: "Deliveries list",
    prices: "Prices list",
    status: "Status",
    Black_liste: "Black List",
    modify: "Modify",
    logout: "Logout",
    location: "Location",
     ajouter : "Add",
    blacklist_title : "📵 Black List",
    empty_list : "No numbers added",
   total_numbers : "Total:",
   numbers_suffix : "number(s)",
    modal_title : "Modify Number",
    modal_placeholder : "Enter new number...",
    cancel_button : "Cancel",
    confirm_button : "Confirm",
    input_placeholder : "Enter a phone number",
    message1 : "Please enter a number !!",
    message2 : "The number must contain only digits !!",
    message3 : "The number must be between 6 and 15 digits !!",
    message4 : "This number is already in the list",
    message5 : "Please enter a number !!",
    message6 : "This number is already in the list",
    Modifier : "Modify",
    Supprimer : "Delete",
    error : "Error",
   success : "Success",
   ok : "OK",
  },
  ar : {
    title  : "القائمة السوداء",
    menu : "القائمة",
    home : "الرئيسية",
    add: "إضافة حزمة",
    pickup: "الجمع",
    list: "قائمة التوصيلات",
    prices: "قائمة الأسعار",
    status: "الحالة",
    Black_liste: "القائمة السوداء",
    modify: "تعديل",
    logout: "تسجيل الخروج",
    location: "الموقع",
     ajouter : "إضافة",
    blacklist_title : "📵 القائمة السوداء",
    empty_list : "لم تتم إضافة أرقام",
   total_numbers : "المجموع:",
   numbers_suffix : "رقم/أرقام",
    modal_title : "تعديل الرقم",
    modal_placeholder : "أدخل الرقم الجديد...",
    cancel_button : "إلغاء",
    confirm_button : "تأكيد",
    input_placeholder : "أدخل رقم هاتف",
    message1 : "يرجى إدخال رقم !!",
    message2 : "يجب أن يحتوي الرقم على أرقام فقط !!",
    message3 : "يجب أن يكون الرقم بين 6 و 15 رقمًا !!",
    message4 : "هذا الرقم موجود بالفعل في القائمة",
    message5 : "يرجى إدخال رقم !!",
    message6 : "هذا الرقم موجود بالفعل في القائمة",
    Modifier : "تعديل",
    Supprimer : "حذف",
    error : "خطأ",
   success : "نجاح",
   ok : "حسناً",
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

  // placeholder (input / textarea)
document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
  const key = el.dataset.i18nPlaceholder;
  el.placeholder = translations[lang][key] || key;
});
    // direction
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
  const popup = document.getElementById("popup");
  document.getElementById("popup-title").textContent =
    type;
    console.log(type);
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup-btn").textContent = t("ok");
  popup.classList.remove("hidden");
}
function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

document.getElementById("popup-btn").onclick = closePopup;
document.getElementById("popup-close").onclick = closePopup;


let numeroAModifier = null;
let numeroInput = null;

function ajouterNumero() {
    const numero = numeroInput.value.trim();
    if (!numero) {
        showPopup(t("error"), t("message1"));
        numeroInput.focus();
        return;
    }
    if (isNaN(numero)) {
           showPopup("error", t("message2"));
          numeroInput.focus();
            return;
        }
     if (!/^\d{6,15}$/.test(numero)) {
        showPopup("error", t("message3"));
      return;
     }

    let numeros = JSON.parse(localStorage.getItem('blacklist')) || [];
    
    if (numeros.includes(numero)) {
        showPopup("error", t("message4"));
        numeroInput.focus();
        return;
    }

    numeros.push(numero);
    localStorage.setItem('blacklist', JSON.stringify(numeros));
    numeroInput.value = '';
    afficherListe();
    numeroInput.focus();
}

function afficherListe() {
    const numeros = JSON.parse(localStorage.getItem('blacklist')) || [];
    const container = document.getElementById('listeContainer');
    const count = document.getElementById('countNumeros');
    if (count) {
        count.textContent = numeros.length;
    }
    
        if (numeros.length === 0) {
            container.innerHTML = '<div class="liste-vide">Aucun numéro ajouté</div>';
            return;
        }

        container.innerHTML = numeros.map((numero, index) => `
            <div class="numero-item">
                <span class="numero-text">${numero}</span>
                <div class="actions">
                    <button class="btn-modifier" onclick="ouvrirModal('${numero}')">${t("Modifier")}</button>
                    <button class="btn-supprimer" onclick="supprimerNumero('${numero}')">${t("Supprimer")}</button>
                </div>
            </div>
        `).join('');
    }

function ouvrirModal(numero) {
        numeroAModifier = numero;
        document.getElementById('modalInput').value = numero;
        document.getElementById('modalModifier').classList.add('active');
        document.getElementById('modalInput').focus();
        document.getElementById('modalInput').select();
    }

function fermerModal() {
        document.getElementById('modalModifier').classList.remove('active');
        numeroAModifier = null;
    }

function confirmerModification() {
        const nouveauNumero = document.getElementById('modalInput').value.trim();

        if (!nouveauNumero) {
           showPopup("error", t("message5"));
            return;
        }

        let numeros = JSON.parse(localStorage.getItem('blacklist')) || [];
        const index = numeros.indexOf(numeroAModifier);

        if (numeros.includes(nouveauNumero) && nouveauNumero !== numeroAModifier) {
        showPopup("error", t("message6"));
            return;
        }

        if (index > -1) {
            numeros[index] = nouveauNumero;
            localStorage.setItem('blacklist', JSON.stringify(numeros));
            fermerModal();
            afficherListe();
        }
    }

function supprimerNumero(numero) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le numéro ${numero} ?`)) {
            let numeros = JSON.parse(localStorage.getItem('blacklist')) || [];
            numeros = numeros.filter(n => n !== numero);
            localStorage.setItem('blacklist', JSON.stringify(numeros));
            afficherListe();
        }
    }
// juste pour DOM loaded car count.context ca peut etre null si on l'appelle avant le load dans la fonction afficherListe
// Charger les données au démarrage
document.addEventListener('DOMContentLoaded', function() {
        numeroInput = document.getElementById('numeroInput');
    afficherListe();
    numeroInput.focus();
});


