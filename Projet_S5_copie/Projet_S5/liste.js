// Récupérer les produits depuis localStorage
let listeProduits = JSON.parse(localStorage.getItem("produits")) || [];

let tbody = document.querySelector("#dataTable tbody");

tbody.innerHTML = "";

listeProduits.forEach(produit => {
  let row = document.createElement("tr");
  row.innerHTML = `
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
