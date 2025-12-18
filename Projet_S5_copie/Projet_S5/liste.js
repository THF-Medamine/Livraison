
 /*let data_array;

if(localStorage.produits !=null){
   data_array=JSON.parse(localStorage.produits);

let tbody = document.querySelector("table tbody"); // premier tbody qui se trouve dans table  presque getElementsByTagName("tbody")[0] mais tbody en quelconque
   for(j= 0;j<data_array.length;j++){
   let tr = document.createElement("tr");
  Object.values(data_array[j]).forEach(element => {
     let td = document.createElement("td");
        td.textContent = element;
        tr.appendChild(td);
   });
        tbody.appendChild(tr);
  }
const aujourdhui = new Date();
console.log(aujourdhui); 

  }
 else{
console.log("La liste est vide !!!")    
 }


//localStorage.clear();

console.log(data_array);*/

let listeColis = JSON.parse(localStorage.getItem("colis")) || [];

    let tbody = document.querySelector("#dataTable tbody");

    // Afficher chaque colis
    listeColis.forEach(colis => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${colis.ville_ramassage}</td>
        <td>${colis.ville_client}</td>
        <td>${colis.nom_client}</td>
        <td>${colis.montant}</td>
        <td>${colis.telephone_client}</td>
        <td>${colis.adresse_client}</td>
        <td>${colis.produit}</td>
      `;
      tbody.appendChild(row);
    });
