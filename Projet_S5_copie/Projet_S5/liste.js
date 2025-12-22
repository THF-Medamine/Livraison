// Récupérer les produits depuis localStorage
/*let listeProduits = JSON.parse(localStorage.getItem("produits")) || [];

let tbody = document.querySelector("#dataTable tbody");

tbody.innerHTML = "";  

listeProduits.forEach(produit => {
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
  `;
  tbody.appendChild(row);
});
*/
//localStorage.clear();


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