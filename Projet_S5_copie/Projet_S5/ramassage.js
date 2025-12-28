  /* TRANSLATIONS*/
  const translations = {
    fr: {
      title: "Ramassage",
      menu: "Menu",
      home: "Accueil",
      add: "Ajouter une livraison",
      pickup: "Ramassage",
      list: "Liste des livraisons",
      prices: "Tarifs de livraison",
      status: "Statut",
      Black_liste : "Liste noire",
      modify: "Modifier",
      delete: "Supprimer",
      logout: "Déconnexion",
      pickup_city: "Ville de ramassage",
      client_name: "Nom du client",
      client_phone: "Téléphone",
      address_client: "Adresse",
      number_of_packages: "Nombre de colis",
      save: "Enregistrer",
      actions: "Actions"
    },
    en: {
      title: "Pickup",
      menu: "Menu",
      home: "Home",
      add: "Add Delivery",
      pickup: "Pickup",
      list: "Delivery List",
      prices: "Delivery Rates",
      status: "Status",
      Black_liste: "Black List",
      modify: "Modify",
      delete: "Delete",
      logout: "Logout",
      pickup_city: "Pickup City",
      client_name: "Client Name",
      client_phone: "Phone",
      address_client: "Address",
      number_of_packages: "Number of Packages",
      save: "Save",
      actions: "Actions"
    },
    ar: {
      title: "الاستلام",
      menu: "القائمة",
      home: "الصفحة الرئيسية",
      add: "إضافة تسليم",
      pickup: "الاستلام",
      list: "قائمة التسليم",
      prices: "أسعار التسليم",
      status: "الحالة",
      Black_liste : "القائمة السوداء",
      modify: "تعديل",
      delete: "حذف",
      logout: "تسجيل الخروج",
      pickup_city: "مدينة الاستلام",
      client_name: "اسم العميل",
      client_phone: "الهاتف",
      address_client: "العنوان",
      number_of_packages: "عدد الطرود",
      save: "حفظ",
      actions: "الإجراءات"
    }
  };
  /* APPLY LANGUAGE */
  function applyLanguage() {
    const lang = localStorage.getItem("language") || "fr";

    // text
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // value (button, input)
    document.querySelectorAll("[data-i18n-value]").forEach(el => {
      const key = el.dataset.i18nValue;
      el.value = translations[lang][key] || key;
    });

   if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
    }
  }

  applyLanguage();

   //DARK | LIGHT MODE 

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Gérer plusieurs ramassages (array)
  let ramassages = JSON.parse(localStorage.getItem('ramassages') || '[]');
  let editId = null;

  // Migration: si anciens champs isolés existent, les ajouter
  if (ramassages.length === 0 && (localStorage.getItem('ville_ramassage') || localStorage.getItem('nom'))) {
    const migrated = {
      id: Date.now(),
      ville_ramassage: localStorage.getItem('ville_ramassage') || '',
      nom: localStorage.getItem('nom') || '',
      telephone: localStorage.getItem('telephone') || '',
      adresse: localStorage.getItem('adresse') || localStorage.getItem('adresse_client') || '',
      nombre_colis: localStorage.getItem('nombre_colis') || ''
    };
    ramassages.push(migrated);
    localStorage.setItem('ramassages', JSON.stringify(ramassages));
  }

  const form = document.getElementById('ramassage');
  const villeEl = document.getElementById('ville_ramassage');
  const nomEl = document.getElementById('nom');
  const telEl = document.getElementById('telephone');
  const adresseEl = document.getElementById('adresse_client') || document.getElementById('adresse');
  const colisEl = document.getElementById('nombre_colis');
  const tbody = document.getElementById('ramassageTbody');
  const submitBtn = document.getElementById('enregistrerbtn');

  function saveRamassages() {
    localStorage.setItem('ramassages', JSON.stringify(ramassages));
  }

  function clearForm() {
    form.reset();
    editId = null;
    if (submitBtn) submitBtn.value = translations[localStorage.getItem('language') || 'fr']['save'] || 'Enregistrer';
  }

  function renderRamassages() {
    tbody.innerHTML = '';
    if (!ramassages || ramassages.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:12px; color:#4a5568;">Aucun ramassage</td></tr>';
      return;
    }

    ramassages.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="padding:10px;">${r.ville_ramassage}</td>
        <td style="padding:10px;">${r.nom}</td>
        <td style="padding:10px;">${r.telephone}</td>
        <td style="padding:10px;">${r.adresse}</td>
        <td style="padding:10px;">${r.nombre_colis}</td>
        <td style="padding:10px;"></td>
      `;

      // actions
      const actionsTd = tr.querySelector('td:last-child');
      const btnEdit = document.createElement('button');
      btnEdit.className = 'btn-modifier';
      btnEdit.textContent = translations[localStorage.getItem('language') || 'fr']['modify'] || 'Modifier';
      btnEdit.style.marginRight = '8px';
      btnEdit.addEventListener('click', () => {
        editId = r.id;
        villeEl.value = r.ville_ramassage;
        nomEl.value = r.nom;
        telEl.value = r.telephone;
        adresseEl.value = r.adresse;
        colisEl.value = r.nombre_colis;
        if (submitBtn) submitBtn.value = translations[localStorage.getItem('language') || 'fr']['modify'] || 'Modifier';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      const btnDel = document.createElement('button');
      btnDel.className = 'btn-supprimer';
      btnDel.textContent = translations[localStorage.getItem('language') || 'fr']['delete'] || 'Supprimer';
      btnDel.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment supprimer ce ramassage ?')) {
          ramassages = ramassages.filter(x => x.id !== r.id);
          saveRamassages();
          renderRamassages();
          if (editId === r.id) clearForm();
        }
      });

      actionsTd.appendChild(btnEdit);
      actionsTd.appendChild(btnDel);

      tbody.appendChild(tr);
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // validation
    const inputs = [villeEl, nomEl, telEl, adresseEl, colisEl];
    let valid = true;
    inputs.forEach(i => { if (!i || i.value.trim() === '') valid = false; });
    if (!valid) {
       showPopup("error", t("Veuillez remplir tous les champs."));
 return;
 }

    if (editId) {
      // update
      const idx = ramassages.findIndex(r => r.id === editId);
      if (idx !== -1) {
        ramassages[idx] = {
          id: editId,
          ville_ramassage: villeEl.value.trim(),
          nom: nomEl.value.trim(),
          telephone: telEl.value.trim(),
          adresse: adresseEl.value.trim(),
          nombre_colis: colisEl.value.trim()
        };
        saveRamassages();
        renderRamassages();
        clearForm();
         showPopup("error", t("Ramassage mis à jour."));
      }
    } else {
      // create
      const newR = {
        id: Date.now(),
        ville_ramassage: villeEl.value.trim(),
        nom: nomEl.value.trim(),
        telephone: telEl.value.trim(),
        adresse: adresseEl.value.trim(),
        nombre_colis: colisEl.value.trim()
      };
      ramassages.push(newR);
      saveRamassages();
      renderRamassages();
      clearForm();
        showPopup("error", t("Ramassage enregistré."));

    }
  });

  // initial render
  renderRamassages();
/* POPUP*/
function t(key) {
  const lang = localStorage.getItem("language") || "fr";
  return translations[lang][key] || key;
}

function showPopup(type, message) {
  const popup = document.getElementById("popup");
  document.getElementById("popup-title").textContent =
    type === "error" ? t("error") : t("success");
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup-btn").textContent = t("popup_ok");
  popup.classList.remove("hidden");
}
function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

document.getElementById("popup-btn").onclick = closePopup;
document.getElementById("popup-close").onclick = closePopup;


// pour cacher les options admin si user connecté
if(JSON.parse(sessionStorage.getItem("connectedUser")).role=="user"){
  document.body.classList.add("admin");
}
