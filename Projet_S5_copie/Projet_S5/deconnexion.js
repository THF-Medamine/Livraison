 /* TRANSLATIONS*/
const translations = {
  fr: {
    title: "Déconnexion",
    logout: "Déconnexion",
    logout_message: "Vous êtes en train de vous déconnecter...",
  },
  en: {
    title: "logout",
    logout: "Logout",
    logout_message: "You are logging out...",
  },
  ar: {
    title: "تسجيل الخروج",
    logout: "تسجيل الخروج",
    logout_message: "أنت تقوم بتسجيل الخروج...",
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

// Déconnexion de l'utilisateur
window.addEventListener('load', function() {
  // Récupérer le message
  const message = document.getElementById("message");
  
  // Afficher un message de déconnexion
  message.textContent = "✅ Vous avez été déconnecté avec succès !";
  
  // Supprimer la session de l'utilisateur
  sessionStorage.removeItem("connectedUser");
  localStorage.removeItem("connectedUser");
  
  // Rediriger vers la page de connexion après 2 secondes
  setTimeout(function() {
    window.location.href = "connexion.html";
  }, 2000);
});
