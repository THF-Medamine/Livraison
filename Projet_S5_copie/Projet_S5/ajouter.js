
/*function ajouter() {
    // Récupération des champs
    let ville_ramassage = document.getElementById("ville_ramassage");
    let ville_client = document.getElementById("ville_client");
    let nom_client = document.getElementById("Nom_client");
    let montant = document.getElementById("Montant");
    let telephone_client = document.getElementById("telephone_client");
    let adresse_client = document.getElementById("Adreese_client");
    let produit = document.getElementById("Produit");
    // Quand la page se charge, remplir automatiquement le champ ville_ramassage

    if (
        trim(ville_ramassage) === "" ||
        trim(ville_client) === "" ||
        trim(nom_client) === "" ||
        trim(montant) === "" ||
        trim(telephone_client) === "" ||
        trim(adresse_client) === "" ||
        trim(produit) === ""
    ) 
    {
        alert("⚠️ Veuillez remplir tous les champs avant d'enregistrer !");
        return; // stoppe la fonction
    }

    // Si tout est rempli → stocker dans localStorage
    localStorage.setItem("ville_ramassage", ville_ramassage.value);
    localStorage.setItem("ville_client", ville_client.value);
    localStorage.setItem("Nom_client", nom_client.value);
    localStorage.setItem("Montant", montant.value);
    localStorage.setItem("telephone_client", telephone_client.value);
    localStorage.setItem("Adreese_client", adresse_client.value);
    localStorage.setItem("Produit", produit.value);

    alert("✅ Données enregistrées avec succès !");
    localStorage.clear();
}*/
 




 /*if(localStorage.length>0){
   ville_ramassage.value=localStorage.getItem("ville_ramassage");
   console.log(ville_ramassage.value);
  }*/
   // Initialiser le tableau depuis localStorage
// Initialiser le tableau depuis localStorage
let data_array = [];
if (localStorage.getItem("produits") != null) {
    data_array = JSON.parse(localStorage.getItem("produits"));
}

// Fonction ajouter (appelée au submit du formulaire)
function ajouter(e) {
    e.preventDefault(); // empêche le rechargement automatique

    // Récupération des champs
    let ville_ramassage = document.getElementById("ville_ramassage");
    let ville_client = document.getElementById("ville_client");
    let Nom_client = document.getElementById("Nom_client");
    let Montant = document.getElementById("Montant");
    let telephone_client = document.getElementById("telephone_client");
    let Adresse_client = document.getElementById("Adreese_client");
    let Produit = document.getElementById("Produit");

    // Vérification si un champ est vide
    let inputs = [ville_ramassage, ville_client, Nom_client, Montant, telephone_client, Adresse_client, Produit];
    let allValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add("invalid");
            allValid = false;
        } else {
            input.classList.remove("invalid");
        }
    });

    if (!allValid) {
        alert("⚠️ Veuillez remplir tous les champs avant d'enregistrer !");
        return;
    }

    // Création de l’objet colis
    const date = new Date();
    let data = {
        ville_ramassage: ville_ramassage.value,
        ville_client: ville_client.value,
        Nom_client: Nom_client.value,
        Montant: Montant.value,
        telephone_client: telephone_client.value,
        Adresse_client: Adresse_client.value,
        Produit: Produit.value,
        date: date
    };

    // Ajouter au tableau
    data_array.push(data);

    // Sauvegarde dans localStorage
    localStorage.setItem("produits", JSON.stringify(data_array));

    alert("✅ Colis enregistré avec succès !");

    // Réinitialiser les champs
    inputs.forEach(input => input.value = "");
}



// crere le 13/3/244
// statue ...
// CODE 
// FRAIS DE LIVRASION 