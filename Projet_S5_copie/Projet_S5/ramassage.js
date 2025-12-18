document.getElementById('ramassage').addEventListener('submit', function(e) {
    e.preventDefault(); // empêche l'envoi automatique

    let ville = document.getElementById('ville_ramassage');
    let nom = document.getElementById('nom');
    let tel = document.getElementById('telephone');
    let adresse = document.getElementById('adresse');
    let colis = document.getElementById('nombre_colis');

    let inputs = [ville, nom, tel, adresse, colis];
    let allValid = true;

    // Vérifie chaque champ
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

    // Si tout est rempli → stocker dans localStorage
    localStorage.setItem('ville_ramassage', ville.value);
    localStorage.setItem('nom', nom.value);
    localStorage.setItem('telephone', tel.value);
    localStorage.setItem('adresse', adresse.value);
    localStorage.setItem('nombre_colis', colis.value);

    alert("✅ Informations de ramassage enregistrées avec succès !");
});
if(localStorage.length>0){
    document.getElementById('ville_ramassage').value = localStorage.getItem('ville_ramassage');
    document.getElementById('nom').value = localStorage.getItem('nom');
    document.getElementById('telephone').value = localStorage.getItem('telephone');
    document.getElementById('adresse').value = localStorage.getItem('adresse');
    document.getElementById('nombre_colis').value = localStorage.getItem('nombre_colis');
}

