// Récupérer les produits depuis localStorage
let listeProduits = JSON.parse(localStorage.getItem("produits")) || [];

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
let td = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";  
  td.appendChild(deleteButton);
  row.appendChild(td);
  tbody.appendChild(row);
 
  deleteButton.addEventListener("click", () => {
   
 try {
        // Show Yes/No dialog
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

    let td2 = document.createElement("td");
  let modifierButton = document.createElement("button");
  modifierButton.textContent = "Modifier";  
  td2.appendChild(modifierButton);
  row.appendChild(td2);
  tbody.appendChild(row);
  modifierButton.addEventListener("click", (event) => {
    localStorage.setItem("modif_id", JSON.stringify(produit.id));
    // Redirect to the modification page
    window.location.href = "ajouter.html";    

});
});
//localStorage.clear();
