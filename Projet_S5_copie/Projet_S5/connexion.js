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
