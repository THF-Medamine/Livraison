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
