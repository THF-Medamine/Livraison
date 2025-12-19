let listeProduits = JSON.parse(localStorage.getItem("produits")) || [];
let tbody = document.querySelector("#dataTable tbody");
tbody.innerHTML = "";

listeProduits.forEach((produit, index) => {
  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${produit.code}</td>
    <td>
      <select onchange="changerStatut(this, ${index})">
        <option value="En attente" ${produit.statut === "En attente" ? "selected" : ""}>En attente</option>
        <option value="En cours" ${produit.statut === "En cours" ? "selected" : ""}>En cours</option>
        <option value="Livrée" ${produit.statut === "Livrée" ? "selected" : ""}>Livrée</option>
        <option value="Annulée" ${produit.statut === "Annulée" ? "selected" : ""}>Annulée</option>
      </select>
    </td>
  `;
  tbody.appendChild(row);
});

function changerStatut(select, index) {
  listeProduits[index].statut = select.value;
  localStorage.setItem("produits", JSON.stringify(listeProduits));

}




function changerStatut(select, index) {
  listeProduits[index].statut = select.value;
  localStorage.setItem("produits", JSON.stringify(listeProduits));

  // Supprimer anciennes classes
  select.classList.remove("statut-attente", "statut-encours", "statut-livree", "statut-annulee");

  // Ajouter la classe selon le statut choisi
  if (select.value === "En attente") select.classList.add("statut-attente");
  if (select.value === "En cours") select.classList.add("statut-encours");
  if (select.value === "Livrée") select.classList.add("statut-livree");
  if (select.value === "Annulée") select.classList.add("statut-annulee");
}

