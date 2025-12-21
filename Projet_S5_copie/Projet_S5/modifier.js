let listeProduits = JSON.parse(localStorage.getItem("produits")) || [];

let tbody = document.querySelector("#dataTable tbody");

tbody.innerHTML = ""; 

listeProduits.forEach(produit => {
  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${produit.code}</td>
  `;
  
  // Colonne Actions
  let td = document.createElement("td");
  td.className = "actions-cell";
  
  // Bouton Modifier
  let modifierButton = document.createElement("button");
  modifierButton.className = "btn-modifier";
  modifierButton.textContent = "Modifier";
  modifierButton.addEventListener("click", () => {
    localStorage.setItem("modif_id", JSON.stringify(produit.id));
    window.location.href = "ajouter.html";    
  });
  td.appendChild(modifierButton);
  
  // Bouton Supprimer
  let deleteButton = document.createElement("button");
  deleteButton.className = "btn-supprimer";
  deleteButton.textContent = "Supprimer";
  deleteButton.addEventListener("click", () => {
    try {
      let userConfirmed = confirm("This element will be deleted.\n Are you sure?");
      
      if (userConfirmed) {
        listeProduits = listeProduits.filter(p => p !== produit);
        localStorage.setItem("produits", JSON.stringify(listeProduits));
        row.remove();
      } else {
        alert("This element will not be deleted.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
  td.appendChild(deleteButton);
  
  row.appendChild(td);
  tbody.appendChild(row);
});
