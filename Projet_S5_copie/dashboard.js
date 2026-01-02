       let commandes = [];
        let editingId = null;
        let charts = {};

        // Load data from localStorage
        function loadData() {
            const stored = localStorage.getItem('produits');
            if (stored) {
                try {
                    commandes = JSON.parse(stored);
                } catch (e) {
                    console.error('Error loading data:', e);
                    commandes = [];
                }
            }
            updateDashboard();
        }

        // Save data to localStorage
        function saveData() {
            localStorage.setItem('produits', JSON.stringify(commandes));
        }

        // Calculate Statistics
        function calculateStats() {
            const stats = {
                total: commandes.length,
                attente: commandes.filter(c => c.statut === "En attente").length,
                cours: commandes.filter(c => c.statut === "En cours").length,
                livrees: commandes.filter(c => c.statut === "Livrée").length,
                annulees: commandes.filter(c => c.statut === "Annulée").length,
                revenue: commandes.filter(c => c.statut === "Livrée").reduce((sum, c) => sum + (c.montant_net || 0), 0)
            };

            document.getElementById('stat-total').textContent = stats.total;
            document.getElementById('stat-attente').textContent = stats.attente;
            document.getElementById('stat-cours').textContent = stats.cours;
            document.getElementById('stat-livrees').textContent = stats.livrees;
            document.getElementById('stat-annulees').textContent = stats.annulees;
            document.getElementById('revenue-total').textContent = stats.revenue.toLocaleString() + ' DH';

            return stats;
        }

        // Update Charts
        function updateCharts() {
            const stats = calculateStats();

            // Destroy existing charts
            Object.values(charts).forEach(chart => chart.destroy());

            // Pie Chart
            const pieCtx = document.getElementById('pieChart').getContext('2d');
            charts.pie = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['En attente', 'En cours', 'Livrée', 'Annulée'],
                    datasets: [{
                        data: [stats.attente, stats.cours, stats.livrees, stats.annulees],
                        backgroundColor: ['#fbbf24', '#3b82f6', '#10b981', '#ef4444'],
                        borderWidth: 3,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                font: { size: 12, weight: 'bold' }
                            }
                        }
                    }
                }
            });

            // Bar Chart
            const villeRevenue = {};
            commandes.filter(c => c.statut === "Livrée").forEach(c => {
                const ville = c.ville_client || 'Non spécifié';
                villeRevenue[ville] = (villeRevenue[ville] || 0) + (c.montant_net || 0);
            });

            const barCtx = document.getElementById('barChart').getContext('2d');
            charts.bar = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(villeRevenue),
                    datasets: [{
                        label: 'Revenue (DH)',
                        data: Object.values(villeRevenue),
                        backgroundColor: 'rgba(102, 126, 234, 0.8)',
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: '#667eea'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });

            // Line Chart
            const last7Days = [];
            const today = new Date();
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                last7Days.push(date.toLocaleDateString('fr-FR', { weekday: 'short' }));
            }

            const dailyCounts = new Array(7).fill(0);
            commandes.forEach(c => {
                if (c.date) {
                    const cmdDate = new Date(c.date);
                    const diffDays = Math.floor((today - cmdDate) / (1000 * 60 * 60 * 24));
                    if (diffDays >= 0 && diffDays < 7) {
                        dailyCounts[6 - diffDays]++;
                    }
                }
            });

            const lineCtx = document.getElementById('lineChart').getContext('2d');
            charts.line = new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: last7Days,
                    datasets: [{
                        label: 'Commandes',
                        data: dailyCounts,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Render Table
        function renderTable(data = commandes) {
            const tbody = document.getElementById('tableBody');
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state">Aucune commande trouvée</div></td></tr>';
                return;
            }

            tbody.innerHTML = data.map(cmd => {
                const statusClass = cmd.statut === "En attente" ? "status-attente" :
                                   cmd.statut === "En cours" ? "status-cours" :
                                   cmd.statut === "Livrée" ? "status-livree" : "status-annulee";

                if (editingId === cmd.id) {
                    return `
                        <tr>
                            <td><strong>${cmd.code}</strong></td>
                            <td>
                                <div style="font-weight: 600;">${cmd.nom_client}</div>
                                <small style="color: #64748b;">${cmd.telephone_client}</small>
                            </td>
                            <td>${cmd.produit}</td>
                            <td>
                                <small style="color: #64748b;">De: ${cmd.ville_ramassage}</small><br>
                                <small style="color: #64748b;">À: ${cmd.ville_client}</small>
                            </td>
                            <td>${cmd.type_livraison}</td>
                            <td><strong>${cmd.montant_net} DH</strong></td>
                            <td>
                                <select class="status-select" id="status-${cmd.id}">
                                    <option ${cmd.statut === "En attente" ? "selected" : ""}>En attente</option>
                                    <option ${cmd.statut === "En cours" ? "selected" : ""}>En cours</option>
                                    <option ${cmd.statut === "Livrée" ? "selected" : ""}>Livrée</option>
                                    <option ${cmd.statut === "Annulée" ? "selected" : ""}>Annulée</option>
                                </select>
                            </td>
                            <td><small>${new Date(cmd.date).toLocaleDateString('fr-FR')}</small></td>
                            <td>
                                <button class="btn btn-save" onclick="saveStatus(${cmd.id})">✓</button>
                                <button class="btn btn-cancel" onclick="cancelEdit()">✕</button>
                            </td>
                        </tr>
                    `;
                }

                return `
                    <tr>
                        <td><strong>${cmd.code}</strong></td>
                        <td>
                            <div style="font-weight: 600;">${cmd.nom_client}</div>
                            <small style="color: #64748b;">${cmd.telephone_client}</small>
                        </td>
                        <td>${cmd.produit}</td>
                        <td>
                            <small style="color: #64748b;">De: ${cmd.ville_ramassage}</small><br>
                            <small style="color: #64748b;">À: ${cmd.ville_client}</small>
                        </td>
                        <td>${cmd.type_livraison}</td>
                        <td><strong>${cmd.montant_net} DH</strong></td>
                        <td><span class="status-badge ${statusClass}">${cmd.statut}</span></td>
                        <td><small>${new Date(cmd.date).toLocaleDateString('fr-FR')}</small></td>
                        <td>
                            <button class="btn btn-edit" onclick="editStatus(${cmd.id})">✏️</button>
                            <button class="btn btn-delete" onclick="deleteCommande(${cmd.id})">🗑️</button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        // Edit Status
        function editStatus(id) {
            editingId = id;
            renderTable(getFilteredData());
        }

        // Save Status
        function saveStatus(id) {
            const newStatus = document.getElementById(`status-${id}`).value;
            commandes = commandes.map(cmd => 
                cmd.id === id ? { ...cmd, statut: newStatus } : cmd
            );
            saveData();
            editingId = null;
            updateDashboard();
        }

        // Cancel Edit
        function cancelEdit() {
            editingId = null;
            renderTable(getFilteredData());
        }

        // Delete Commande
        function deleteCommande(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette commande?')) {
                commandes = commandes.filter(cmd => cmd.id !== id);
                saveData();
                updateDashboard();
            }
        }

        // Get Filtered Data
        function getFilteredData() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const filterStatus = document.getElementById('filterStatus').value;

            return commandes.filter(cmd => {
                const matchesSearch = (cmd.code || '').toLowerCase().includes(searchTerm) ||
                                     (cmd.nom_client || '').toLowerCase().includes(searchTerm) ||
                                     (cmd.ville_client || '').toLowerCase().includes(searchTerm);
                const matchesStatus = filterStatus === 'Tous' || cmd.statut === filterStatus;
                return matchesSearch && matchesStatus;
            });
        }

        // Update Dashboard
        function updateDashboard() {
            calculateStats();
            updateCharts();
            renderTable(getFilteredData());
        }

        // Event Listeners
        document.getElementById('searchInput').addEventListener('input', () => {
            renderTable(getFilteredData());
        });

        document.getElementById('filterStatus').addEventListener('change', () => {
            renderTable(getFilteredData());
        });

        // Initialize
        loadData();
