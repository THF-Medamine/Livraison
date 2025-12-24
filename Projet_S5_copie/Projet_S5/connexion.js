  /* TRANSLATIONS*/
const translations = {
  fr: {
    title: "Connexion",
    titre: "Veuillez vous connecter",
    email: "Email",
    password: "Mot de passe",
    login: "Se connecter",
    connect_user: "Connecté en tant que",
    lougout: "Se déconnecter",
  },
  en: {
    title: "login",
     titre: "complete your login",
    email: "Email",
    password: "Password",
    login: "Se connecter",
    connect_user: "Connected as",
    lougout: "Logout",
  },
  ar: {
    title: "تسجيل الدخول",
    titre: "الرجاء تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    connect_user: "متصل باسم",
    lougout: "تسجيل الخروج"
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


// Liste des utilisateurs autorisés
const users = [
  { email: "admin@app.com", password: "admin123" },
  { email: "user@app.com", password: "user123" }
];

// Récupération des éléments du DOM
const loginForm = document.getElementById("loginForm");
const connectedZone = document.getElementById("connectedZone");
const logoutBtn = document.getElementById("logoutBtn");
const titre = document.getElementById("titre");
const usernameSpan = document.getElementById("username");

// Masquer la zone connectée au départ
connectedZone.style.display = "none";

// Vérification de la connexion
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Vérifier si l'utilisateur existe
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    alert("✅ Connexion réussie !");
    
    // Sauvegarder la session
    sessionStorage.setItem("connectedUser", JSON.stringify(user));
    
    // Rediriger vers la page ajouter
    window.location.href = "ajouter.html";
  } else {
    alert("❌ Email ou mot de passe incorrect !");
  }
});

// Vérifier si un utilisateur est déjà connecté (dans sessionStorage)
window.onload = function() {
  const savedUser = JSON.parse(sessionStorage.getItem("connectedUser"));
  if (savedUser) {
    loginForm.style.display = "none";
    connectedZone.style.display = "block";
    titre.textContent = "Bienvenue " + savedUser.email;
    usernameSpan.textContent = savedUser.email;
  }
};

// Déconnexion
logoutBtn.addEventListener("click", function() {
  sessionStorage.removeItem("connectedUser");
  connectedZone.style.display = "none";
  loginForm.style.display = "block";
  titre.textContent = "Veuillez vous connecter";
});
