//khask t2kd wach ra9m !isNaN
let numeroAModifier = null;
        const numeroInput = document.getElementById('numeroInput');

        // Charger les données au démarrage
        window.addEventListener('DOMContentLoaded', function() {
            afficherListe();
            numeroInput.focus();
        });

        // Permet d'ajouter en appuyant sur Entrée
        numeroInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                ajouterNumero();
            }
        });

        function ajouterNumero() {
            const numero = numeroInput.value.trim();
            
            if (!numero) {
                alert('Veuillez entrer un numéro');
                numeroInput.focus();
                return;
            }

            let numeros = JSON.parse(localStorage.getItem('blacklist')) || [];
            
            if (numeros.includes(numero)) {
                alert('Ce numéro est déjà dans la liste');
                numeroInput.focus();
                return;
            }

            numeros.push(numero);
            localStorage.setItem('blacklist', JSON.stringify(numeros));
            numeroInput.value = '';
            afficherListe();
            numeroInput.focus();
        }

        function afficherListe() {
            const numeros = JSON.parse(localStorage.getItem('blacklist')) || [];
            const container = document.getElementById('listeContainer');
            const count = document.getElementById('countNumeros');

            count.textContent = numeros.length;

            if (numeros.length === 0) {
                container.innerHTML = '<div class="liste-vide">Aucun numéro ajouté</div>';
                return;
            }

            container.innerHTML = numeros.map((numero, index) => `
                <div class="numero-item">
                    <span class="numero-text">${numero}</span>
                    <div class="actions">
                        <button class="btn-modifier" onclick="ouvrirModal('${numero}')">Modifier</button>
                        <button class="btn-supprimer" onclick="supprimerNumero('${numero}')">Supprimer</button>
                    </div>
                </div>
            `).join('');
        }

        function ouvrirModal(numero) {
            numeroAModifier = numero;
            document.getElementById('modalInput').value = numero;
            document.getElementById('modalModifier').classList.add('active');
            document.getElementById('modalInput').focus();
            document.getElementById('modalInput').select();
        }

        function fermerModal() {
            document.getElementById('modalModifier').classList.remove('active');
            numeroAModifier = null;
        }

        function confirmerModification() {
            const nouveauNumero = document.getElementById('modalInput').value.trim();

            if (!nouveauNumero) {
                alert('Veuillez entrer un numéro');
                return;
            }

            let numeros = JSON.parse(localStorage.getItem('blacklist')) || [];
            const index = numeros.indexOf(numeroAModifier);

            if (numeros.includes(nouveauNumero) && nouveauNumero !== numeroAModifier) {
                alert('Ce numéro est déjà dans la liste');
                return;
            }

            if (index > -1) {
                numeros[index] = nouveauNumero;
                localStorage.setItem('blacklist', JSON.stringify(numeros));
                fermerModal();
                afficherListe();
            }
        }

        function supprimerNumero(numero) {
            if (confirm(`Êtes-vous sûr de vouloir supprimer le numéro ${numero} ?`)) {
                let numeros = JSON.parse(localStorage.getItem('blacklist')) || [];
                numeros = numeros.filter(n => n !== numero);
                localStorage.setItem('blacklist', JSON.stringify(numeros));
                afficherListe();
            }
        }

        // Fermer le modal en cliquant dehors
        document.getElementById('modalModifier').addEventListener('click', function(e) {
            if (e.target === this) {
                fermerModal();
            }
        });

        // Fermer le modal en appuyant sur Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('modalModifier').classList.contains('active')) {
                fermerModal();
            }
        });

        // Confirmer la modification en appuyant sur Entrée
        document.getElementById('modalInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                confirmerModification();
            }
        });
   