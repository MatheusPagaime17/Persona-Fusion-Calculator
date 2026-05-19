document.addEventListener('DOMContentLoaded', () => {

            // --- LÓGICA DO LOADER PERSONA 5 ---
            const loader = document.getElementById('p5-loader');
            const loaderBar = document.getElementById('loader-bar');
            const loaderPercent = document.getElementById('loader-percent');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15; 
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    loaderBar.style.width = '100%';
                    loaderPercent.textContent = '100%';
                    setTimeout(() => {
                        loader.classList.add('slide-out');
                        setTimeout(() => { loader.style.display = 'none'; }, 600);
                    }, 500);
                } else {
                    loaderBar.style.width = `${progress}%`;
                    loaderPercent.textContent = `${Math.floor(progress)}%`;
                }
            }, 100);

            // --- ELEMENTOS DOM ---
            const searchInput1 = document.getElementById('search-input-1');
            const resultsContainer1 = document.getElementById('results-container-1');
            const searchInput2 = document.getElementById('search-input-2');
            const resultsContainer2 = document.getElementById('results-container-2');
            const calculateBtn = document.getElementById('calculateBtn');
            const resultText = document.getElementById('result-text');

            const reverseSearchInput = document.getElementById('reverse-search-input');
            const reverseResultsContainer = document.getElementById('reverse-results-container');
            const reverseCalculateBtn = document.getElementById('reverse-calculate-btn');
            const reverseRecipesList = document.getElementById('reverse-recipes-list');
            const reverseResultArea = document.getElementById('reverse-result-area');

            const modal = document.getElementById('persona-modal');
            const closeModalBtn = document.getElementById('close-modal-btn');
            
            let selectedPersonas = { persona1: null, persona2: null, target: null };
            let personas = [];

   
            const arcanaOrder = {
                'Fool': 0, 'Magician': 1, 'Priestess': 2, 'Empress': 3, 'Emperor': 4, 'Hierophant': 5,
                'Lovers': 6, 'Chariot': 7, 'Justice': 8, 'Hermit': 9, 'Fortune': 10, 'Strength': 11,
                'Hanged': 12, 'Death': 13, 'Temperance': 14, 'Devil': 15, 'Tower': 16, 'Star': 17,
                'Moon': 18, 'Sun': 19, 'Judgement': 20, 'Faith': 21, 'Councillor': 22, 'World': 23
            };

            const fusionChart = {
                //Mesmo Arcana
                'Fool+Fool': 'Fool', 'Magician+Magician': 'Magician', 'Priestess+Priestess': 'Priestess', 'Empress+Empress': 'Empress', 'Emperor+Emperor': 'Emperor', 'Hierophant+Hierophant': 'Hierophant', 'Lovers+Lovers': 'Lovers', 'Chariot+Chariot': 'Chariot', 'Justice+Justice': 'Justice', 'Hermit+Hermit': 'Hermit', 'Fortune+Fortune': 'Fortune', 'Strength+Strength': 'Strength', 'Hanged+Hanged': 'Hanged', 'Death+Death': 'Death', 'Temperance+Temperance': 'Temperance', 'Devil+Devil': 'Devil', 'Tower+Tower': 'Tower', 'Star+Star': 'Star', 'Moon+Moon': 'Moon', 'Sun+Sun': 'Sun', 'Judgement+Judgement': 'Judgement', 'Faith+Faith': 'Faith', 'Councillor+Councillor': 'Councillor',
                //Combinações de Arcana Diferentes
                // --- Fool (0) + ... ---
                'Fool+Magician': 'Death', 'Fool+Priestess': 'Moon', 'Fool+Empress': 'Hanged', 'Fool+Emperor': 'Temperance', 'Fool+Hierophant': 'Hermit', 'Fool+Lovers': 'Chariot', 'Fool+Chariot': 'Moon', 'Fool+Justice': 'Star', 'Fool+Hermit': 'Priestess', 'Fool+Fortune': 'Justice', 'Fool+Strength': 'Death', 'Fool+Hanged': 'Tower', 'Fool+Death': 'Strength', 'Fool+Temperance': 'Hierophant', 'Fool+Devil': 'Strength', 'Fool+Tower': 'Empress', 'Fool+Star': 'Magician', 'Fool+Moon': 'Justice', 'Fool+Sun': 'Judgement', 'Fool+Judgement': 'Sun', 'Fool+Faith': 'Priestess', 'Fool+Councillor': 'Hierophant',
                // --- Magician (1) + ... ---
                'Magician+Priestess': 'Justice', 'Magician+Empress': 'Death', 'Magician+Emperor': 'Faith', 'Magician+Hierophant': 'Death', 'Magician+Lovers': 'Devil', 'Magician+Chariot': 'Priestess', 'Magician+Justice': 'Emperor', 'Magician+Hermit': 'Lovers', 'Magician+Fortune': 'Faith', 'Magician+Strength': 'Devil', 'Magician+Hanged': 'Empress', 'Magician+Death': 'Hermit', 'Magician+Temperance': 'Chariot', 'Magician+Devil': 'Hierophant', 'Magician+Tower': 'Temperance', 'Magician+Star': 'Priestess', 'Magician+Moon': 'Lovers', 'Magician+Sun': 'Hierophant', 'Magician+Judgement': 'Strength', 'Magician+Faith': 'Tower', 'Magician+Councillor': 'Priestess',
                // --- Priestess (2) + ... ---
                'Priestess+Empress': 'Emperor', 'Priestess+Emperor': 'Empress', 'Priestess+Hierophant': 'Fortune', 'Priestess+Lovers': 'Star', 'Priestess+Chariot': 'Hierophant', 'Priestess+Justice': 'Star', 'Priestess+Hermit': 'Temperance', 'Priestess+Fortune': 'Lovers', 'Priestess+Strength': 'Chariot', 'Priestess+Hanged': 'Death', 'Priestess+Death': 'Magician', 'Priestess+Temperance': 'Moon', 'Priestess+Devil': 'Faith', 'Priestess+Tower': 'Hanged', 'Priestess+Star': 'Moon', 'Priestess+Moon': 'Hierophant', 'Priestess+Sun': 'Hermit', 'Priestess+Judgement': 'Justice', 'Priestess+Faith': 'Hanged',
                // --- Empress (3) + ... ---
                'Empress+Emperor': 'Justice', 'Empress+Hierophant': 'Fortune', 'Empress+Lovers': 'Judgement', 'Empress+Chariot': 'Star', 'Empress+Justice': 'Star', 'Empress+Hermit': 'Strength', 'Empress+Fortune': 'Hermit', 'Empress+Strength': 'Hanged', 'Empress+Hanged': 'Priestess', 'Empress+Death': 'Fool', 'Empress+Temperance': 'Faith', 'Empress+Devil': 'Hierophant', 'Empress+Tower': 'Faith', 'Empress+Star': 'Justice', 'Empress+Moon': 'Sun', 'Empress+Sun': 'Moon', 'Empress+Judgement': 'Priestess', 'Empress+Faith': 'Magician',
                // --- Emperor (4) + ... ---
                'Emperor+Hierophant': 'Fortune', 'Emperor+Lovers': 'Faith', 'Emperor+Chariot': 'Faith', 'Emperor+Justice': 'Chariot', 'Emperor+Hermit': 'Hierophant', 'Emperor+Fortune': 'Sun', 'Emperor+Strength': 'Sun', 'Emperor+Hanged': 'Devil', 'Emperor+Death': 'Hermit', 'Emperor+Temperance': 'Devil', 'Emperor+Devil': 'Justice', 'Emperor+Tower': 'Star', 'Emperor+Star': 'Lovers', 'Emperor+Moon': 'Tower', 'Emperor+Sun': 'Judgement', 'Emperor+Judgement': 'Magician', 'Emperor+Faith': 'Chariot', 'Emperor+Councillor': 'Lovers',
                // --- Hierophant (5) + ... ---
                'Hierophant+Lovers': 'Strength', 'Hierophant+Chariot': 'Star', 'Hierophant+Justice': 'Hanged', 'Hierophant+Hermit': 'Councillor', 'Hierophant+Fortune': 'Justice', 'Hierophant+Strength': 'Fool', 'Hierophant+Hanged': 'Sun', 'Hierophant+Death': 'Councillor', 'Hierophant+Temperance': 'Strength', 'Hierophant+Devil': 'Moon', 'Hierophant+Tower': 'Judgement', 'Hierophant+Star': 'Tower', 'Hierophant+Moon': 'Death', 'Hierophant+Sun': 'Lovers', 'Hierophant+Faith': 'Justice', 'Hierophant+Councillor': 'Chariot',
                // --- Lovers (6) + ... ---
                'Lovers+Chariot': 'Temperance', 'Lovers+Justice': 'Judgement', 'Lovers+Hermit': 'Chariot', 'Lovers+Fortune': 'Priestess', 'Lovers+Strength': 'Temperance', 'Lovers+Hanged': 'Death', 'Lovers+Death': 'Councillor', 'Lovers+Temperance': 'Strength', 'Lovers+Devil': 'Moon', 'Lovers+Tower': 'Fool', 'Lovers+Star': 'Faith', 'Lovers+Moon': 'Devil', 'Lovers+Sun': 'Strength', 'Lovers+Faith': 'Judgement', 'Lovers+Councillor': 'Emperor',
                // --- Chariot (7) + ... ---
                'Chariot+Justice': 'Moon', 'Chariot+Hermit': 'Councillor', 'Chariot+Fortune': 'Moon', 'Chariot+Strength': 'Devil', 'Chariot+Hanged': 'Fool', 'Chariot+Death': 'Devil', 'Chariot+Temperance': 'Strength', 'Chariot+Devil': 'Tower', 'Chariot+Tower': 'Faith', 'Chariot+Star': 'Moon', 'Chariot+Moon': 'Fortune', 'Chariot+Sun': 'Lovers', 'Chariot+Judgement': 'Lovers', 'Chariot+Faith': 'Devil',
                // --- Justice (8) + ... ---
                'Justice+Hermit': 'Magician', 'Justice+Fortune': 'Sun', 'Justice+Strength': 'Councillor', 'Justice+Hanged': 'Lovers', 'Justice+Death': 'Fool', 'Justice+Temperance': 'Priestess', 'Justice+Devil': 'Fool', 'Justice+Tower': 'Sun', 'Justice+Star': 'Emperor', 'Justice+Moon': 'Devil', 'Justice+Sun': 'Hanged', 'Justice+Judgement': 'Hanged', 'Justice+Faith': 'Star', 'Justice+Councillor': 'Star',
                // --- Hermit (9) + ... ---
                'Hermit+Fortune': 'Star', 'Hermit+Strength': 'Faith', 'Hermit+Hanged': 'Star', 'Hermit+Death': 'Star', 'Hermit+Temperance': 'Strength', 'Hermit+Devil': 'Priestess', 'Hermit+Tower': 'Judgement', 'Hermit+Star': 'Priestess', 'Hermit+Moon': 'Devil', 'Hermit+Sun': 'Devil', 'Hermit+Judgement': 'Emperor', 'Hermit+Faith': 'Councillor',
                // --- Fortune (10) + ... ---
                'Fortune+Strength': 'Faith', 'Fortune+Hanged': 'Priestess', 'Fortune+Death': 'Emperor', 'Fortune+Temperance': 'Star', 'Fortune+Devil': 'Hanged', 'Fortune+Tower': 'Sun', 'Fortune+Star': 'Sun', 'Fortune+Moon': 'Judgement', 'Fortune+Sun': 'Star', 'Fortune+Judgement': 'Tower', 'Fortune+Faith': 'Sun', 'Fortune+Councillor': 'Star',
                // --- Strength (11) + ... ---
                'Strength+Hanged': 'Temperance', 'Strength+Death': 'Hierophant', 'Strength+Temperance': 'Chariot', 'Strength+Devil': 'Faith', 'Strength+Tower': 'Hanged', 'Strength+Star': 'Moon', 'Strength+Moon': 'Magician', 'Strength+Sun': 'Star', 'Strength+Judgement': 'Fool', 'Strength+Faith': 'Chariot', 'Strength+Councillor': 'Faith',
                // --- Hanged (12) + ... ---
                'Hanged+Death': 'Moon', 'Hanged+Temperance': 'Death', 'Hanged+Devil': 'Hermit', 'Hanged+Tower': 'Sun', 'Hanged+Star': 'Councillor', 'Hanged+Moon': 'Hierophant', 'Hanged+Sun': 'Star', 'Hanged+Judgement': 'Star', 'Hanged+Faith': 'Councillor',
                // --- Death (13) + ... ---
                'Death+Temperance': 'Hanged', 'Death+Devil': 'Moon', 'Death+Tower': 'Sun', 'Death+Star': 'Councillor', 'Death+Moon': 'Hermit', 'Death+Sun': 'Fool', 'Death+Judgement': 'Hanged', 'Death+Faith': 'Strength', 'Death+Councillor': 'Hermit',
                // --- Temperance (14) + ... ---
                'Temperance+Devil': 'Fool', 'Temperance+Tower': 'Fool', 'Temperance+Star': 'Sun', 'Temperance+Moon': 'Councillor', 'Temperance+Sun': 'Magician', 'Temperance+Judgement': 'Fortune', 'Temperance+Faith': 'Moon', 'Temperance+Councillor': 'Chariot',
                // --- Devil (15) + ... ---
                'Devil+Tower': 'Magician', 'Devil+Star': 'Hermit', 'Devil+Moon': 'Chariot', 'Devil+Sun': 'Hermit', 'Devil+Judgement': 'Death', 'Devil+Faith': 'Fortune', 'Devil+Councillor': 'Death',
                // --- Tower (16) + ... ---
                'Tower+Star': 'Councillor', 'Tower+Moon': 'Hermit', 'Tower+Sun': 'Emperor', 'Tower+Judgement': 'Sun', 'Tower+Faith': 'Hanged',
                // --- Star (17) + ... ---
                'Star+Moon': 'Temperance', 'Star+Sun': 'Judgement', 'Star+Judgement': 'Fortune', 'Star+Faith': 'Moon', 'Star+Councillor': 'Fortune',
                // --- Moon (18) + ... ---
                'Moon+Sun': 'Empress', 'Moon+Judgement': 'Fool', 'Moon+Faith': 'Sun', 'Moon+Councillor': 'Sun',
                // --- Sun (19) + ... ---
                'Sun+Judgement': 'Fortune', 'Sun+Faith': 'Death', 'Sun+Councillor': 'Fortune',
                // --- Judgement (20) + ... ---
                'Judgement+Faith': 'Fortune', 'Judgement+Councillor': 'Devil',
                // --- Faith (21) + ... ---
                'Faith+Councillor': 'Priestess'
                // Councillor não precisa porque já foi citada em todas
                // World não participa de fusões
            };

            const specialFusionNames = [
            'Alice', 'Ardha', 'Asura', 'Black Frost', 'Bugs', 'Chi You', 'Flauros',
            'Kohryu', 'Lucifer', 'Metatron', 'Michael', 'Neko Shogun', 'Ongyo-Ki',
            'Satanael', 'Seth', 'Shiva', 'Sraosha', 'Trumpeter', 'Yoshitsune'
            ];

            const specificFusions = [
                { result: 'Alice', parents: ['Nebiros', 'Belial'] },
                { result: 'Ardha', parents: ['Parvati', 'Shiva'] },
                { result: 'Asura', parents: ['Zouchouten', 'Jikokuten', 'Koumokuten', 'Bishamonten'] },
                { result: 'Black Frost', parents: ["Jack-o'-Lantern", 'Jack Frost', 'King Frost'] },
                { result: 'Bugs', parents: ['Pixie', 'Pisaca', 'Hariti'] },
                { result: 'Chi You', parents: ['Hecatoncheires', 'White Rider', 'Thor', 'Yoshitsune', 'Cu Chulainn'] },
                { result: 'Flauros', parents: ['Berith', 'Andras', 'Eligor'] },
                { result: 'Kohryu', parents: ['Genbu', 'Seiryu', 'Suzaku', 'Byakko'] },
                { result: 'Lucifer', parents: ['Anubis', 'Ananta', 'Trumpeter', 'Michael', 'Metatron', 'Satan'] },
                { result: 'Metatron', parents: ['Principality', 'Power', 'Dominion', 'Melchizedek', 'Sandalphon', 'Michael'] },
                { result: 'Michael', parents: ['Uriel', 'Raphael', 'Gabriel'] },
                { result: 'Neko Shogun', parents: ['Kodama', 'Sudama', 'Anzu'] },
                { result: 'Ongyo-Ki', parents: ['Kin-Ki', 'Sui-Ki', 'Fuu-Ki'] },
                { result: 'Satanael', parents: ['Arsene', 'Anzu', 'Ishtar', 'Satan', 'Lucifer', 'Michael'] },
                { result: 'Seth', parents: ['Isis', 'Thoth', 'Anubis', 'Horus'] },
                { result: 'Shiva', parents: ['Barong', 'Rangda'] },
                { result: 'Sraosha', parents: ['Mithra', 'Mithras', 'Melchizedek', 'Lilith', 'Gabriel'] },
                { result: 'Trumpeter', parents: ['White Rider', 'Red Rider', 'Black Rider', 'Pale Rider'] },
                { result: 'Yoshitsune', parents: ['Shiki-Ouji', 'Arahabaki', 'Okuninushi', 'Yatagarasu', 'Futsunushi'] }
            ];

            const specialDlcUpgrades = {
                'Izanagi': 'Izanagi Picaro', 'Izanagi-no-Okami': 'Izanagi-no-Okami Picaro', 'Orpheus': 'Orpheus Picaro', 'Ariadne': 'Ariadne Picaro', 'Asterius': 'Asterius Picaro', 'Thanatos': 'Thanatos Picaro', 'Kaguya': 'Kaguya Picaro', 'Magatsu-Izanagi': 'Magatsu-Izanagi Picaro', 'Tsukiyomi': 'Tsukiyomi Picaro', 'Messiah': 'Messiah Picaro'
            };

            // =====================================================================
            // FETCH DA NOVA BASE (personaMap.json ou data.json)
            // =====================================================================
            async function loadPersonas() {
                try {
                    // Tenta puxar a base nova (personaMap.json)
                    let response = await fetch('personaMap.json');
                    if (!response.ok) throw new Error('personaMap.json não encontrado');
                    
                    let apiData = await response.json();
                    let rawData = Array.isArray(apiData) ? apiData : Object.values(apiData);

                    // Mapeia adicionando o atributo special baseado na nossa lógica e garante propriedade level
                    personas = rawData.map(p => ({
                        ...p,
                        level: p.level || p.baseLevel || 1, // Fallback se a chave mudar
                        special: p.special || specificFusions.some(sf => sf.result === p.name) || Object.values(specialDlcUpgrades).includes(p.name)
                    }));
                    
                } catch (error) {
                    console.warn('Tentando puxar data.json como fallback...');
                    try {
                        let fallbackResponse = await fetch('data.json');
                        let fallbackData = await fallbackResponse.json();
                        let rawData = Array.isArray(fallbackData) ? fallbackData : Object.values(fallbackData);
                        
                        personas = rawData.map(p => ({
                            ...p,
                            level: p.level || p.baseLevel || 1,
                            special: p.special || specificFusions.some(sf => sf.result === p.name) || Object.values(specialDlcUpgrades).includes(p.name)
                        }));
                    } catch (fatalError) {
                        alert("ERRO: Banco de dados não encontrado. Certifique-se de que personaMap.json está na pasta e use o Live Server.");
                    }
                }
                setupAllAutocomplete();
            }

            function setupAllAutocomplete() {
                setupAutocomplete(searchInput1, resultsContainer1, 'persona1');
                setupAutocomplete(searchInput2, resultsContainer2, 'persona2');
                setupAutocomplete(reverseSearchInput, reverseResultsContainer, 'target');
            }

            function setupAutocomplete(inputElement, resultsElement, personaKey) {
                inputElement.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase();
                    resultsElement.innerHTML = '';
                    resultsElement.style.display = 'none';
                    selectedPersonas[personaKey] = null;

                    if (query.length < 2) return;

                    const matches = personas.filter(p => p.name.toLowerCase().includes(query));
                    if (matches.length > 0) {
                        resultsElement.style.display = 'block';
                        matches.forEach(persona => {
                            const item = document.createElement('div');
                            item.classList.add('result-item');
                            item.textContent = `${persona.name} (Lvl ${persona.level} - ${persona.arcana})`;
                            if (persona.dlc === 1) item.textContent += " [DLC]";
                            
                            item.addEventListener('click', () => {
                                inputElement.value = persona.name;
                                selectedPersonas[personaKey] = persona;
                                resultsElement.innerHTML = '';
                                resultsElement.style.display = 'none';
                            });
                            resultsElement.appendChild(item);
                        });
                    }
                });
            }

            // =====================================================================
            // LÓGICA DE CÁLCULO
            // =====================================================================
            function handleCalculation() {
                const p1 = selectedPersonas.persona1;
                const p2 = selectedPersonas.persona2;
            
                if (!p1 || !p2) { resultText.textContent = "Selecione duas Personas válidas."; return; }
                if (p1.name === p2.name) { resultText.textContent = "Não pode fundir uma Persona com ela mesma."; return; }
            
                const result = calculateFusion(p1, p2);
            
                if (result) {       
                    resultText.innerHTML = '';
                    const span = document.createElement('span');
                    span.textContent = result.name;
                    span.addEventListener('click', () => {
                        populateModal(result);
                        modal.classList.add('open');
                    });
                    
                    resultText.appendChild(span);
                    resultText.appendChild(document.createTextNode(` (Arcana: ${result.arcana}, Lvl: ${result.level})`));
                } else {
                    resultText.textContent = "Combinação inválida ou sem resultado possível.";
                }
            }

            function calculateFusion(p1, p2) {
                // 1. Receitas Específicas
                const parentNames = [p1.name, p2.name].sort();
                const specific = specificFusions.find(r => 
                    r.parents.length === 2 && r.parents[0] === parentNames[0] && r.parents[1] === parentNames[1]
                );
                if (specific) return personas.find(p => p.name === specific.result);

                // Tratamento seguro para Demônios do Tesouro (Caso a propriedade não exista no JSON novo)
                const isP1Treasure = p1.hasOwnProperty('treasureDemonModifier') || p1.treasure;
                const isP2Treasure = p2.hasOwnProperty('treasureDemonModifier') || p2.treasure;
                
                // 2. Upgrades de DLC
                if (isP1Treasure || isP2Treasure) {
                    const basePersona = isP1Treasure ? p2 : p1;
                    const upgradedName = specialDlcUpgrades[basePersona.name];
                    if (upgradedName) return personas.find(p => p.name === upgradedName);
                }

                // (Bypass na lógica de Treasure Demon se eles não possuírem modificador no novo JSON)
                if ((isP1Treasure || isP2Treasure) && (!p1.treasureDemonModifier && !p2.treasureDemonModifier)) {
                    return null; // O JSON novo não possui a lógica matemática de subida/descida do tesouro configurada
                }

                // 3. Fusão Normal
                const resultArcana = getResultArcana(p1.arcana, p2.arcana);
                if (!resultArcana) return null;

                const avgLevel = Math.floor((p1.level + p2.level) / 2) + 1;
                const candidates = personas
                    .filter(p => p.arcana === resultArcana && !p.special && (!p.dlc || p.dlc === 0))
                    .sort((a, b) => a.level - b.level);

                if (p1.arcana === p2.arcana) {
                    const validCandidates = candidates.filter(p => p.level < avgLevel && p.name !== p1.name && p.name !== p2.name);
                    return validCandidates.length > 0 ? validCandidates[validCandidates.length - 1] : null;
                } else {
                    const validCandidates = candidates.filter(p => p.level >= avgLevel);
                    return validCandidates.length > 0 ? validCandidates[0] : candidates[candidates.length - 1];
                }
            }

            function getResultArcana(a1, a2) {
                if (arcanaOrder[a1] === undefined || arcanaOrder[a2] === undefined) return null;
                const sorted = [a1, a2].sort((x, y) => arcanaOrder[x] - arcanaOrder[y]);
                const key = sorted.join('+');
                return fusionChart[key] || null;
            }

            // =====================================================================
            // CALCULADORA REVERSA (ATUALIZADA IGUAL P3R - SEM O MODAL VELHO)
            // =====================================================================
            function handleReverseCalculation() {
                const target = selectedPersonas.target;
                if (!target) return;

                // Limpa o link de Target antigo
                const oldTargetBtn = document.getElementById('dynamic-target-link');
                if (oldTargetBtn) oldTargetBtn.remove();

                // Cria o link brilhante para abrir a Persona alvo
                const targetLinkContainer = document.createElement('div');
                targetLinkContainer.id = 'dynamic-target-link';
                targetLinkContainer.style.marginBottom = '20px';
                targetLinkContainer.style.textAlign = 'center';

                const targetSpan = document.createElement('span');
                targetSpan.className = 'clickable-persona';
                targetSpan.style.fontSize = '1.3em';
                targetSpan.textContent = `★ Ver detalhes de ${target.name} ★`;
                targetSpan.addEventListener('click', () => {
                    populateModal(target);
                    modal.classList.add('open');
                });

                targetLinkContainer.appendChild(targetSpan);
                reverseResultArea.insertBefore(targetLinkContainer, reverseRecipesList);

                reverseRecipesList.innerHTML = '<li>Buscando registros na Velvet Room...</li>';

                // Tratamento Especial
                if (target.special) {
                    const recipe = specificFusions.find(r => r.result === target.name);
                    reverseRecipesList.innerHTML = '';
                    
                    if (recipe) {
                        const li = document.createElement('li');
                        li.textContent = `Guilhotina Avançada: Requer `;
                        
                        recipe.parents.forEach((parentName, index) => {
                            const parentObj = personas.find(p => p.name === parentName);
                            const span = document.createElement('span');
                            span.textContent = parentName;
                            
                            if (parentObj) {
                                span.className = 'clickable-persona';
                                span.addEventListener('click', () => {
                                    populateModal(parentObj);
                                    modal.classList.add('open');
                                });
                            }
                            li.appendChild(span);
                            if (index < recipe.parents.length - 1) li.appendChild(document.createTextNode(' + '));
                        });
                        reverseRecipesList.appendChild(li);
                    } else {
                        reverseRecipesList.innerHTML = '<li>Receita avançada não documentada para esta simulação.</li>';
                    }
                    return;
                }

                // Cálculo Reverso Força Bruta
                const recipes = [];
                for (let i = 0; i < personas.length; i++) {
                    for (let j = i + 1; j < personas.length; j++) {
                        const p1 = personas[i];
                        const p2 = personas[j];
                        
                        if (p1.special || p2.special || p1.dlc === 1 || p2.dlc === 1) continue; 
                        
                        // Ignora tesouros se eles não tiverem a lógica completa mapeada
                        if (p1.treasure || p2.treasure) continue;

                        const res = calculateFusion(p1, p2);
                        if (res && res.name === target.name) {
                            recipes.push({ p1, p2 });
                            if (recipes.length >= 25) break; 
                        }
                    }
                    if (recipes.length >= 25) break;
                }

                reverseRecipesList.innerHTML = '';
                if (recipes.length === 0) {
                    reverseRecipesList.innerHTML = '<li>Nenhuma combinação básica encontrada.</li>';
                } else {
                    recipes.forEach(r => {
                        const li = document.createElement('li');
                        
                        const span1 = document.createElement('span');
                        span1.textContent = r.p1.name;
                        span1.className = 'clickable-persona';
                        span1.addEventListener('click', () => { populateModal(r.p1); modal.classList.add('open'); });

                        const text1 = document.createTextNode(` (Lvl ${r.p1.level}) + `);

                        const span2 = document.createElement('span');
                        span2.textContent = r.p2.name;
                        span2.className = 'clickable-persona';
                        span2.addEventListener('click', () => { populateModal(r.p2); modal.classList.add('open'); });

                        const text2 = document.createTextNode(` (Lvl ${r.p2.level})`);

                        li.appendChild(span1); li.appendChild(text1); li.appendChild(span2); li.appendChild(text2);
                        reverseRecipesList.appendChild(li);
                    });
                }
            }

            // =====================================================================
            // MODAL ATUALIZADO (TRAIT + NOVOS STATUS)
            // =====================================================================
            function populateModal(persona) {
                document.getElementById('modal-persona-name').textContent = persona.name;
                
                let levelBadge = document.getElementById('modal-persona-level');
                if (levelBadge) levelBadge.textContent = `Lvl ${persona.level}`;
                
                let traitElement = document.getElementById('modal-persona-trait');
                if (traitElement) {
                    if(persona.trait) {
                        traitElement.innerHTML = `TRAIT: <span style="color: var(--p5-white);">${persona.trait}</span>`;
                    } else {
                        traitElement.textContent = "TRAIT: Desconhecido.";
                    }
                }

                const statsList = document.querySelector('#modal-stats ul');
                statsList.innerHTML = `
                    <li>STRENGTH: <span>${persona.strength || 0}</span></li>
                    <li>MAGIC: <span>${persona.magic || 0}</span></li>
                    <li>ENDURANCE: <span>${persona.endurance || 0}</span></li>
                    <li>AGILITY: <span>${persona.agility || 0}</span></li>
                    <li>LUCK: <span>${persona.luck || 0}</span></li>
                `;

                const elemList = document.querySelector('#modal-elements ul');
                elemList.innerHTML = '';
                
                const affinities = [
                    { key: 'weak', label: 'Weak', color: '#ff5555' },
                    { key: 'resists', label: 'Resist', color: '#aaaaaa' },
                    { key: 'nullifies', label: 'Null', color: '#55ff55' },
                    { key: 'reflects', label: 'Repel', color: '#55ffff' },
                    { key: 'absorbs', label: 'Drain', color: '#ff55ff' }
                ];

                let hasAffinities = false;
                affinities.forEach(aff => {
                    if (persona[aff.key] && persona[aff.key].length > 0) {
                        hasAffinities = true;
                        elemList.innerHTML += `<li>${aff.label}: <span style="background: var(--p5-black); padding: 2px 5px; color:${aff.color};">${persona[aff.key].join(', ')}</span></li>`;
                    }
                });

                if (!hasAffinities) {
                    elemList.innerHTML = '<li>Nenhuma afinidade de elemento mapeada.</li>';
                }
            }

            // --- EVENTOS ---
            closeModalBtn.addEventListener('click', () => modal.classList.remove('open'));
            window.addEventListener('click', (e) => { if (e.target == modal) modal.classList.remove('open'); });
            calculateBtn.addEventListener('click', handleCalculation);
            reverseCalculateBtn.addEventListener('click', handleReverseCalculation);
            document.getElementById('hamburger-menu').addEventListener('click', () => {
                document.getElementById('nav-list').classList.toggle('open');
            });
            window.addEventListener('click', (e) => {
                if (!e.target.matches('.search-input')) {
                    resultsContainer1.style.display = 'none';
                    resultsContainer2.style.display = 'none';
                    reverseResultsContainer.style.display = 'none';
                }
            });

            loadPersonas();
        });