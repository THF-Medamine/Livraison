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
    alert("⚠️ Veuillez remplir tous les champs !");
    return;
  }

  // Vérifier que la ville existe dans le tableau
  if (!tarifsLivraison[villeClient]) {
    alert("⚠️ Ville non trouvée dans la liste des tarifs !");
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
  alert(
    "✅ Colis enregistré !\n" +
    "Ville: " + villeClient + "\n" +
    "Type: " + typeLivraison + "\n" +
    "Montant net: " + montantNet + " MAD"
  );

  // Réinitialiser les champs
  document.querySelectorAll("#ville_ramassage, #ville_client, #type_livraison, #Nom_client, #Montant, #telephone_client, #Adreese_client, #Produit")
    .forEach(input => input.value = "");
}


// modification des champs si id_modif existe
let id_modifier = JSON.parse(localStorage.getItem("modif_id"));
if (id_modifier !== null) {
  console.log("Modification ID:", id_modifier);
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