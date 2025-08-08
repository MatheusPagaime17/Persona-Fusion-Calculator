// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINIÇÃO DE DADOS E CONSTANTES ---
    const searchInput1 = document.getElementById('search-input-1');
    const resultsContainer1 = document.getElementById('results-container-1');
    const searchInput2 = document.getElementById('search-input-2');
    const resultsContainer2 = document.getElementById('results-container-2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultText = document.getElementById('result-text');

    let selectedPersonas = { persona1: null, persona2: null };
    let personas = [];

        // NOVO: Objeto que define a ordem numérica das Arcanas
    const arcanaOrder = {
        'Fool': 0, 'Magician': 1, 'Priestess': 2, 'Empress': 3, 'Emperor': 4, 'Hierophant': 5,
        'Lovers': 6, 'Chariot': 7, 'Justice': 8, 'Hermit': 9, 'Fortune': 10, 'Strength': 11,
        'Hanged': 12, 'Death': 13, 'Temperance': 14, 'Devil': 15, 'Tower': 16, 'Star': 17,
        'Moon': 18, 'Sun': 19, 'Judgement': 20, 'Faith': 21, 'Councillor': 22, 'World': 23
    };

    // Tabela de fusão de Arcanas, baseada na tabela do portal The Gamer https://www.thegamer.com/persona-5-royal-p5r-fusion-chart-cheapest-recipes-compendium
    const fusionChart = {
        'Fool+Fool': 'Fool', 'Magician+Magician': 'Magician', 'Priestess+Priestess': 'Priestess', 'Empress+Empress': 'Empress', 'Emperor+Emperor': 'Emperor', 'Hierophant+Hierophant': 'Hierophant', 'Lovers+Lovers': 'Lovers', 'Chariot+Chariot': 'Chariot', 'Justice+Justice': 'Justice', 'Hermit+Hermit': 'Hermit', 'Fortune+Fortune': 'Fortune', 'Strength+Strength': 'Strength', 'Hanged+Hanged': 'Hanged', 'Death+Death': 'Death', 'Temperance+Temperance': 'Temperance', 'Devil+Devil': 'Devil', 'Tower+Tower': 'Tower', 'Star+Star': 'Star', 'Moon+Moon': 'Moon', 'Sun+Sun': 'Sun', 'Judgement+Judgement': 'Judgement', 'Faith+Faith': 'Faith', 'Councillor+Councillor': 'Councillor',
        'Fool+Magician': 'Death', 'Fool+Priestess': 'Moon', 'Fool+Empress': 'Hanged', 'Fool+Emperor': 'Temperance', 'Fool+Hierophant': 'Hermit', 'Fool+Lovers': 'Chariot', 'Fool+Chariot': 'Moon', 'Fool+Justice': 'Star', 'Fool+Hermit': 'Priestess', 'Fool+Fortune': 'Justice', 'Fool+Strength': 'Death', 'Fool+Hanged': 'Tower', 'Fool+Death': 'Strength', 'Fool+Temperance': 'Hierophant', 'Fool+Devil': 'Strength', 'Fool+Tower': 'Empress', 'Fool+Star': 'Magician', 'Fool+Moon': 'Justice', 'Fool+Sun': 'Judgement', 'Fool+Judgement': 'Sun', 'Fool+Faith': 'Priestess', 'Fool+Councillor': 'Hierophant',
        'Magician+Priestess': 'Justice', 'Magician+Empress': 'Death', 'Magician+Emperor': 'Faith', 'Magician+Hierophant': 'Death', 'Magician+Lovers': 'Devil', 'Magician+Chariot': 'Priestess', 'Magician+Justice': 'Emperor', 'Magician+Hermit': 'Lovers', 'Magician+Fortune': 'Faith', 'Magician+Strength': 'Devil', 'Magician+Hanged': 'Empress', 'Magician+Death': 'Hermit', 'Magician+Temperance': 'Chariot', 'Magician+Devil': 'Hierophant', 'Magician+Tower': 'Temperance', 'Magician+Star': 'Priestess', 'Magician+Moon': 'Lovers', 'Magician+Sun': 'Hierophant', 'Magician+Judgement': 'Strength', 'Magician+Faith': 'Tower', 'Magician+Councillor': 'Priestess',
        'Priestess+Empress': 'Emperor', 'Priestess+Emperor': 'Empress', 'Priestess+Hierophant': 'Fortune', 'Priestess+Lovers': 'Star', 'Priestess+Chariot': 'Hierophant', 'Priestess+Justice': 'Star', 'Priestess+Hermit': 'Temperance', 'Priestess+Fortune': 'Lovers', 'Priestess+Strength': 'Chariot', 'Priestess+Hanged': 'Death', 'Priestess+Death': 'Magician', 'Priestess+Temperance': 'Moon', 'Priestess+Devil': 'Faith', 'Priestess+Tower': 'Hanged', 'Priestess+Star': 'Moon', 'Priestess+Moon': 'Hierophant', 'Priestess+Sun': 'Hermit', 'Priestess+Judgement': 'Justice', 'Priestess+Faith': 'Hanged',
        'Empress+Emperor': 'Justice', 'Empress+Hierophant': 'Fortune', 'Empress+Lovers': 'Judgement', 'Empress+Chariot': 'Star', 'Empress+Justice': 'Star', 'Empress+Hermit': 'Strength', 'Empress+Fortune': 'Hermit', 'Empress+Strength': 'Hanged', 'Empress+Hanged': 'Priestess', 'Empress+Death': 'Fool', 'Empress+Temperance': 'Faith', 'Empress+Devil': 'Hierophant', 'Empress+Tower': 'Faith', 'Empress+Star': 'Justice', 'Empress+Moon': 'Sun', 'Empress+Sun': 'Moon', 'Empress+Judgement': 'Priestess', 'Empress+Faith': 'Magician',
        'Emperor+Hierophant': 'Fortune', 'Emperor+Lovers': 'Faith', 'Emperor+Chariot': 'Faith', 'Emperor+Justice': 'Chariot', 'Emperor+Hermit': 'Hierophant', 'Emperor+Fortune': 'Sun', 'Emperor+Strength': 'Sun', 'Emperor+Hanged': 'Devil', 'Emperor+Death': 'Hermit', 'Emperor+Temperance': 'Devil', 'Emperor+Devil': 'Justice', 'Emperor+Tower': 'Star', 'Emperor+Star': 'Lovers', 'Emperor+Moon': 'Tower', 'Emperor+Sun': 'Judgement', 'Emperor+Judgement': 'Magician', 'Emperor+Faith': 'Chariot', 'Emperor+Councillor': 'Lovers',
        'Hierophant+Lovers': 'Strength', 'Hierophant+Chariot': 'Star', 'Hierophant+Justice': 'Hanged', 'Hierophant+Hermit': 'Councillor', 'Hierophant+Fortune': 'Justice', 'Hierophant+Strength': 'Fool', 'Hierophant+Hanged': 'Sun', 'Hierophant+Death': 'Councillor', 'Hierophant+Temperance': 'Strength', 'Hierophant+Devil': 'Moon', 'Hierophant+Tower': 'Judgement', 'Hierophant+Star': 'Tower', 'Hierophant+Moon': 'Death', 'Hierophant+Sun': 'Lovers', 'Hierophant+Faith': 'Justice', 'Hierophant+Councillor': 'Chariot',
        'Lovers+Chariot': 'Temperance', 'Lovers+Justice': 'Judgement', 'Lovers+Hermit': 'Chariot', 'Lovers+Fortune': 'Priestess', 'Lovers+Strength': 'Temperance', 'Lovers+Hanged': 'Death', 'Lovers+Death': 'Councillor', 'Lovers+Temperance': 'Strength', 'Lovers+Devil': 'Moon', 'Lovers+Tower': 'Fool', 'Lovers+Star': 'Faith', 'Lovers+Moon': 'Devil', 'Lovers+Sun': 'Strength', 'Lovers+Faith': 'Judgement', 'Lovers+Councillor': 'Emperor',
        'Chariot+Justice': 'Moon', 'Chariot+Hermit': 'Councillor', 'Chariot+Fortune': 'Moon', 'Chariot+Strength': 'Devil', 'Chariot+Hanged': 'Fool', 'Chariot+Death': 'Devil', 'Chariot+Temperance': 'Strength', 'Chariot+Devil': 'Tower', 'Chariot+Tower': 'Faith', 'Chariot+Star': 'Moon', 'Chariot+Moon': 'Fortune', 'Chariot+Sun': 'Lovers', 'Chariot+Judgement': 'Lovers', 'Chariot+Faith': 'Devil',
        'Justice+Hermit': 'Magician', 'Justice+Fortune': 'Sun', 'Justice+Strength': 'Councillor', 'Justice+Hanged': 'Lovers', 'Justice+Death': 'Fool', 'Justice+Temperance': 'Priestess', 'Justice+Devil': 'Fool', 'Justice+Tower': 'Sun', 'Justice+Star': 'Emperor', 'Justice+Moon': 'Devil', 'Justice+Sun': 'Hanged', 'Justice+Judgement': 'Hanged', 'Justice+Faith': 'Star', 'Justice+Councillor': 'Star',
        'Hermit+Fortune': 'Star', 'Hermit+Strength': 'Faith', 'Hermit+Hanged': 'Star', 'Hermit+Death': 'Star', 'Hermit+Temperance': 'Strength', 'Hermit+Devil': 'Priestess', 'Hermit+Tower': 'Judgement', 'Hermit+Star': 'Priestess', 'Hermit+Moon': 'Devil', 'Hermit+Sun': 'Devil', 'Hermit+Judgement': 'Emperor', 'Hermit+Faith': 'Councillor',
        'Fortune+Strength': 'Faith', 'Fortune+Hanged': 'Priestess', 'Fortune+Death': 'Emperor', 'Fortune+Temperance': 'Star', 'Fortune+Devil': 'Hanged', 'Fortune+Tower': 'Sun', 'Fortune+Star': 'Sun', 'Fortune+Moon': 'Judgement', 'Fortune+Sun': 'Star', 'Fortune+Judgement': 'Tower', 'Fortune+Faith': 'Sun', 'Fortune+Councillor': 'Star',
        'Strength+Hanged': 'Temperance', 'Strength+Death': 'Hierophant', 'Strength+Temperance': 'Chariot', 'Strength+Devil': 'Faith', 'Strength+Tower': 'Hanged', 'Strength+Star': 'Moon', 'Strength+Moon': 'Magician', 'Strength+Sun': 'Star', 'Strength+Judgement': 'Fool', 'Strength+Faith': 'Chariot', 'Strength+Councillor': 'Faith',
        'Hanged+Death': 'Moon', 'Hanged+Temperance': 'Death', 'Hanged+Devil': 'Hermit', 'Hanged+Tower': 'Sun', 'Hanged+Star': 'Councillor', 'Hanged+Moon': 'Hierophant', 'Hanged+Sun': 'Star', 'Hanged+Judgement': 'Star', 'Hanged+Faith': 'Councillor',
        'Death+Temperance': 'Hanged', 'Death+Devil': 'Moon', 'Death+Tower': 'Sun', 'Death+Star': 'Councillor', 'Death+Moon': 'Hermit', 'Death+Sun': 'Fool', 'Death+Judgement': 'Hanged', 'Death+Faith': 'Strength', 'Death+Councillor': 'Hermit',
        'Temperance+Devil': 'Fool', 'Temperance+Tower': 'Fool', 'Temperance+Star': 'Sun', 'Temperance+Moon': 'Councillor', 'Temperance+Sun': 'Magician', 'Temperance+Judgement': 'Fortune', 'Temperance+Faith': 'Moon', 'Temperance+Councillor': 'Chariot',
        'Devil+Tower': 'Magician', 'Devil+Star': 'Hermit', 'Devil+Moon': 'Chariot', 'Devil+Sun': 'Hermit', 'Devil+Judgement': 'Death', 'Devil+Faith': 'Fortune', 'Devil+Councillor': 'Death',
        'Tower+Star': 'Councillor', 'Tower+Moon': 'Hermit', 'Tower+Sun': 'Emperor', 'Tower+Judgement': 'Sun', 'Tower+Faith': 'Hanged',
        'Star+Moon': 'Temperance', 'Star+Sun': 'Judgement', 'Star+Judgement': 'Fortune', 'Star+Faith': 'Moon', 'Star+Councillor': 'Fortune',
        'Moon+Sun': 'Empress', 'Moon+Judgement': 'Fool', 'Moon+Faith': 'Sun', 'Moon+Councillor': 'Sun',
        'Sun+Judgement': 'Fortune', 'Sun+Faith': 'Death', 'Sun+Councillor': 'Fortune',
        'Judgement+Faith': 'Fortune', 'Judgement+Councillor': 'Devil',
        'Faith+Councillor': 'Priestess'
    };

const specificFusions = [
        { result: 'Alice', parents: ['Belial', 'Nebiros'] },
        { result: 'Ardha', parents: ['Parvati', 'Shiva'] },
        { result: 'Shiva', parents: ['Barong', 'Rangda'] }
    ];

    const specialDlcUpgrades = {
        'Izanagi': 'Izanagi Picaro', 'Izanagi-no-Okami': 'Izanagi-no-Okami Picaro', 'Orpheus': 'Orpheus Picaro', 'Ariadne': 'Ariadne Picaro', 'Asterius': 'Asterius Picaro', 'Thanatos': 'Thanatos Picaro', 'Kaguya': 'Kaguya Picaro', 'Magatsu-Izanagi': 'Magatsu-Izanagi Picaro', 'Tsukiyomi': 'Tsukiyomi Picaro', 'Messiah': 'Messiah Picaro'
    };

    // --- LÓGICA PRINCIPAL ---

    async function loadPersonas() {
        try {
            const response = await fetch('personas.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            personas = await response.json();
            setupAutocomplete(searchInput1, resultsContainer1, 'persona1');
            setupAutocomplete(searchInput2, resultsContainer2, 'persona2');
        } catch (error) {
            console.error("Não foi possível carregar o arquivo de personas:", error);
            resultText.textContent = "Erro ao carregar dados das Personas.";
        }
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
                    item.textContent = `${persona.name} (Lvl ${persona.baseLevel})`;
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

    function handleCalculation() {
        const persona1 = selectedPersonas.persona1;
        const persona2 = selectedPersonas.persona2;

        if (!persona1 || !persona2) {
            resultText.textContent = "Por favor, selecione duas Personas válidas.";
            return;
        }
        if (persona1.name === persona2.name) {
            resultText.textContent = "Você não pode fundir uma Persona com ela mesma.";
            return;
        }

        const result = calculateFusion(persona1, persona2);

        if (result) {
            resultText.textContent = `${result.name} (Arcana: ${result.arcana}, Nível: ${result.baseLevel})`;
        } else {
            resultText.textContent = "Combinação inválida ou sem resultado possível.";
        }
    }

    function calculateFusion(p1, p2) {
        // 1. VERIFICA RECEITAS ESPECÍFICAS
        const parentNames = [p1.name, p2.name].sort();
        const specificRecipe = specificFusions.find(recipe => {
            if (recipe.parents.length !== 2) return false;
            return recipe.parents[0] === parentNames[0] && recipe.parents[1] === parentNames[1];
        });

        if (specificRecipe) {
            return personas.find(p => p.name === specificRecipe.result);
        }

        const isP1Treasure = p1.hasOwnProperty('treasureDemonModifier');
        const isP2Treasure = p2.hasOwnProperty('treasureDemonModifier');
        
        // 2. VERIFICA UPGRADES ESPECIAIS DE DLC
        if (isP1Treasure || isP2Treasure) {
            const basePersona = isP1Treasure ? p2 : p1;
            const upgradedName = specialDlcUpgrades[basePersona.name];
            if (upgradedName) {
                return personas.find(p => p.name === upgradedName);
            }
        }

        // 3. VERIFICA FUSÃO NORMAL COM DEMÔNIO DO TESOURO
        if (isP1Treasure || isP2Treasure) {
            if (isP1Treasure && isP2Treasure) return null;

            const treasureDemon = isP1Treasure ? p1 : p2;
            const basePersona = isP1Treasure ? p2 : p1;
            const resultArcana = basePersona.arcana;
            
            const arcanaRoster = personas
                .filter(p => p.arcana === resultArcana && !p.special)
                .sort((a, b) => a.baseLevel - b.baseLevel);

            const basePersonaIndex = arcanaRoster.findIndex(p => p.name === basePersona.name);
            if (basePersonaIndex === -1) return null;

            const newIndex = basePersonaIndex + treasureDemon.treasureDemonModifier;
            if (newIndex >= 0 && newIndex < arcanaRoster.length) {
                return arcanaRoster[newIndex];
            } else {
                return null;
            }
        }

         // 4. EXECUTA A FUSÃO NORMAL PADRÃO
        const resultArcana = getResultArcana(p1.arcana, p2.arcana);
        if (!resultArcana) return null;

        const sortedPersonas = [...personas].sort((a, b) => a.baseLevel - b.baseLevel);
        const avgLevel = Math.floor((p1.baseLevel + p2.baseLevel) / 2) + 1;
        const availablePersonas = sortedPersonas.filter(p => !p.special);

        if (p1.arcana === p2.arcana) {
            const candidates = availablePersonas.filter(p => p.arcana === resultArcana && p.baseLevel < avgLevel && p.name !== p1.name && p.name !== p2.name);
            return candidates.length > 0 ? candidates[candidates.length - 1] : null;
        } else {
            const candidates = availablePersonas.filter(p => p.arcana === resultArcana && p.baseLevel >= avgLevel);
            return candidates.length > 0 ? candidates[0] : null;
        }
    }
    
    // MODIFICADO: A função agora ordena pelo número da Arcana
    function getResultArcana(arcana1, arcana2) {
        const sortedArcanas = [arcana1, arcana2].sort((a, b) => arcanaOrder[a] - arcanaOrder[b]);
        const key = sortedArcanas.join('+');
        return fusionChart[key] || null;
    }

    // --- EVENT LISTENERS ---
    calculateBtn.addEventListener('click', handleCalculation);

    window.addEventListener('click', (e) => {
        if (!e.target.matches('.search-input')) {
            resultsContainer1.style.display = 'none';
            resultsContainer2.style.display = 'none';
        }
    });

    // --- INICIALIZAÇÃO ---
    loadPersonas();
});