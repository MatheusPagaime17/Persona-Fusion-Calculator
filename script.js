// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINIÇÃO DE DADOS E CONSTANTES ---

    // Referências aos elementos do HTML que vamos manipular
    const persona1Select = document.getElementById('persona1');
    const persona2Select = document.getElementById('persona2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultText = document.getElementById('result-text');

    // Tabela de fusão de Arcanas, baseada na tabela do portal The Gamer https://www.thegamer.com/persona-5-royal-p5r-fusion-chart-cheapest-recipes-compendium
    const fusionChart = {
        // Mesma Arcana
        'Fool+Fool': 'Fool',
        'Magician+Magician': 'Magician', 
        'Priestess+Priestess': 'Priestess', 
        'Empress+Empress': 'Empress', 
        'Emperor+Emperor': 'Emperor', 
        'Hierophant+Hierophant': 'Hierophant', 
        'Lovers+Lovers': 'Lovers', 
        'Chariot+Chariot': 'Chariot', 
        'Justice+Justice': 'Justice', 
        'Hermit+Hermit': 'Hermit', 
        'Fortune+Fortune': 'Fortune', 
        'Strength+Strength': 'Strength', 
        'Hanged+Hanged': 'Hanged', 
        'Death+Death': 'Death', 
        'Temperance+Temperance': 'Temperance', 
        'Devil+Devil': 'Devil', 
        'Tower+Tower': 'Tower', 
        'Star+Star': 'Star', 
        'Moon+Moon': 'Moon', 
        'Sun+Sun': 'Sun', 
        'Judgement+Judgement': 
        'Judgement', 'Faith+Faith': 'Faith', 
        'Councillor+Councillor': 'Councillor',
        // Arcanas diferentes
        // Fool Arcana
        'Fool+Magician': 'Death', 
        'Fool+Priestess': 'Moon', 
        'Fool+Empress': 'Hanged', 
        'Fool+Emperor': 'Temperance', 
        'Fool+Hierophant': 'Hermit', 
        'Fool+Lovers': 'Chariot', 
        'Fool+Chariot': 'Moon', 
        'Fool+Justice': 'Star', 
        'Fool+Hermit': 'Priestess', 
        'Fool+Fortune': 'Faith', 
        'Fool+Strength': 'Death', 
        'Fool+Hanged': 'Tower', 
        'Fool+Death': 'Strength', 
        'Fool+Temperance': 'Hierophant', 
        'Fool+Devil': 'Temperance', 
        'Fool+Tower': 'Empress', 
        'Fool+Star': 'Magician', 
        'Fool+Moon': 'Justice', 
        'Fool+Sun': 'Justice', 
        'Fool+Judgement': 'Sun', 
        'Fool+Faith': 'Councillor', 
        'Fool+Councillor': 'Hierophant',
        // Magician Arcana
        'Magician+Priestess': 'Temperance', 
        'Magician+Empress': 'Justice', 
        'Magician+Emperor': 'Faith', 
        'Magician+Hierophant': 'Death', 
        'Magician+Lovers': 'Devil', 
        'Magician+Chariot': 'Priestess', 
        'Magician+Justice': 'Emperor', 
        'Magician+Hermit': 'Lovers', 
        'Magician+Fortune': 'Justice', 
        'Magician+Strength': 'Fool', 
        'Magician+Hanged': 'Empress', 
        'Magician+Death': 'Hermit', 
        'Magician+Temperance': 'Chariot', 
        'Magician+Devil': 'Hierophant', 
        'Magician+Tower': 'Temperance', 
        'Magician+Star': 'Priestess', 
        'Magician+Moon': 'Lovers', 
        'Magician+Sun': 'Hierophant', 
        'Magician+Judgement': 'Strength', 
        'Magician+Faith': 'Strength', 
        'Magician+Councillor': 'Moon',
        // Priestess Arcana
        'Priestess+Empress': 'Emperor', 
        'Priestess+Emperor': 'Empress', 
        'Priestess+Hierophant': 'Magician', 
        'Priestess+Lovers': 'Fortune', 
        'Priestess+Chariot': 'Hierophant', 
        'Priestess+Justice': 'Death', 
        'Priestess+Hermit': 'Temperance', 
        'Priestess+Fortune': 'Magician', 
        'Priestess+Strength': 'Devil', 
        'Priestess+Hanged': 'Death', 
        'Priestess+Death': 'Magician', 
        'Priestess+Temperance': 'Devil', 
        'Priestess+Devil': 'Moon', 
        'Priestess+Tower': 'Hanged', 
        'Priestess+Star': 'Hermit', 
        'Priestess+Moon': 'Hierophant', 
        'Priestess+Sun': 'Chariot', 
        'Priestess+Judgement': 'Justice', 
        'Priestess+Faith': 'Justice',
        'Priestess+Councillor': 'Faith',
        // Empress Arcana
        'Empress+Emperor': 'Justice', 
        'Empress+Hierophant': 'Fool', 
        'Empress+Lovers': 'Judgement', 
        'Empress+Chariot': 'Star', 
        'Empress+Justice': 'Lovers', 
        'Empress+Hermit': 'Strength', 
        'Empress+Fortune': 'Hermit', 
        'Empress+Strength': 'Faith', 
        'Empress+Hanged': 'Priestess', 
        'Empress+Death': 'Fool', 
        'Empress+Temperance': 'Faith', 
        'Empress+Devil': 'Sun', 
        'Empress+Tower': 'Emperor', 
        'Empress+Star': 'Lovers', 
        'Empress+Moon': 'Fortune', 
        'Empress+Sun': 'Tower', 
        'Empress+Judgement': 'Emperor', 
        'Empress+Faith': 'Magician',
        'Empress+Councillor': 'Hanged',
        // Emperor Arcana
        'Emperor+Hierophant': 'Fortune', 
        'Emperor+Lovers': 'Fool', 
        'Emperor+Chariot': 'Faith', 
        'Emperor+Justice': 'Chariot', 
        'Emperor+Hermit': 'Hierophant', 
        'Emperor+Fortune': 'Sun', 
        'Emperor+Strength': 'Tower', 
        'Emperor+Hanged': 'Devil', 
        'Emperor+Death': 'Hermit', 
        'Emperor+Temperance': 'Devil', 
        'Emperor+Devil': 'Justice', 
        'Emperor+Tower': 'Star', 
        'Emperor+Star': 'Lovers', 
        'Emperor+Moon': 'Tower', 
        'Emperor+Sun': 'Judgement', 
        'Emperor+Judgement': 'Priestess',
        'Emperor+Faith': 'Priestess', 
        'Emperor+Councillor': 'Lovers',
        // Hierophant Arcana
        'Hierophant+Lovers': 'Strength', 
        'Hierophant+Chariot': 'Star', 
        'Hierophant+Justice': 'Hanged', 
        'Hierophant+Hermit': 'Councillor', 
        'Hierophant+Fortune': 'Justice', 
        'Hierophant+Strength': 'Fool', 
        'Hierophant+Hanged': 'Sun', 
        'Hierophant+Death': 'Chariot', 
        'Hierophant+Temperance': 'Death', 
        'Hierophant+Devil': 'Hanged', 
        'Hierophant+Tower': 'Judgement', 
        'Hierophant+Star': 'Tower', 
        'Hierophant+Moon': 'Priestess', 
        'Hierophant+Sun': 'Lovers', 
        'Hierophant+Judgement': 'Faith',
        'Hierophant+Faith': 'Empress', 
        'Hierophant+Councillor': 'Justice',
        // Lovers Arcana
        'Lovers+Chariot': 'Temperance', 
        'Lovers+Justice': 'Judgement', 
        'Lovers+Hermit': 'Chariot', 
        'Lovers+Fortune': 'Strength', 
        'Lovers+Strength': 'Death', 
        'Lovers+Hanged': 'Councillor', 
        'Lovers+Death': 'Temperance', 
        'Lovers+Temperance': 'Strength', 
        'Lovers+Devil': 'Moon', 
        'Lovers+Tower': 'Empress', 
        'Lovers+Star': 'Faith', 
        'Lovers+Moon': 'Magician', 
        'Lovers+Sun': 'Empress', 
        'Lovers+Judgement': 'Hanged',
        'Lovers+Faith': 'Tower', 
        'Lovers+Councillor': 'Tower',
        // Chariot Arcana
        'Chariot+Justice': 'Moon', 
        'Chariot+Hermit': 'Devil', 
        'Chariot+Fortune': 'Councillor', 
        'Chariot+Strength': 'Hermit', 
        'Chariot+Hanged': 'Fool', 
        'Chariot+Death': 'Devil', 
        'Chariot+Temperance': 'Strength', 
        'Chariot+Devil': 'Temperance', 
        'Chariot+Tower': 'Fortune', 
        'Chariot+Star': 'Moon', 
        'Chariot+Moon': 'Lovers', 
        'Chariot+Sun': 'Priestess', 
        'Chariot+Faith': 'Lovers', 
        'Chariot+Councillor': 'Sun',
        // Justice Arcana            
        'Justice+Hermit': 'Magician', 
        'Justice+Fortune': 'Emperor', 
        'Justice+Strength': 'Councillor', 
        'Justice+Hanged': 'Lovers', 
        'Justice+Death': 'Fool', 
        'Justice+Temperance': 'Emperor', 
        'Justice+Devil': 'Fool', 
        'Justice+Tower': 'Sun', 
        'Justice+Star': 'Empress', 
        'Justice+Moon': 'Devil', 
        'Justice+Sun': 'Hanged', 
        'Justice+Faith': 'Hanged', 
        'Justice+Councillor': 'Emperor',
        // Hermit Arcana
        'Hermit+Fortune': 'Star', 
        'Hermit+Strength': 'Hierophant', 
        'Hermit+Hanged': 'Star', 
        'Hermit+Death': 'Strength', 
        'Hermit+Temperance': 'Strength', 
        'Hermit+Devil': 'Priestess', 
        'Hermit+Tower': 'Judgement', 
        'Hermit+Star': 'Strength', 
        'Hermit+Moon': 'Chariot', 
        'Hermit+Sun': 'Devil', 
        'Hermit+Judgement': 'Emperor', 
        'Hermit+Faith': 'Judgement',
        'Hermit+Councillor': 'Faith',
        // Fortune Arcana
        'Fortune+Strength': 'Faith', 
        'Fortune+Hanged': 'Emperor', 
        'Fortune+Death': 'Star', 
        'Fortune+Temperance': 'Empress', 
        'Fortune+Devil': 'Hierophant', 
        'Fortune+Tower': 'Hanged', 
        'Fortune+Star': 'Devil', 
        'Fortune+Moon': 'Sun', 
        'Fortune+Sun': 'Star', 
        'Fortune+Judgement': 'Tower',
        'Fortune+Faith': 'Councillor',
        'Fortune+Councillor': 'Judgement',
        // Strenght Arcana
        'Strength+Hanged': 'Temperance', 
        'Strength+Death': 'Hierophant', 
        'Strength+Temperance': 'Chariot', 
        'Strength+Devil': 'Death', 
        'Strength+Tower': 'Faith', 
        'Strength+Star': 'Moon', 
        'Strength+Moon': 'Magician', 
        'Strength+Sun': 'Moon', 
        'Strength+Faith': 'Star',
        'Strength+Councillor': 'Empress',
        // Hanged Arcana
        'Hanged+Death': 'Moon', 
        'Hanged+Temperance': 'Death', 
        'Hanged+Devil': 'Fortune', 
        'Hanged+Tower': 'Hermit', 
        'Hanged+Star': 'Justice', 
        'Hanged+Moon': 'Councillor', 
        'Hanged+Sun': 'Hierophant', 
        'Hanged+Judgement': 'Star',
        'Hanged+Faith': 'Devil',
        'Hanged+Councillor': 'Star',
        // Death Arcana
        'Death+Temperance': 'Hanged', 
        'Death+Devil': 'Chariot', 
        'Death+Tower': 'Sun', 
        'Death+Star': 'Councillor', 
        'Death+Moon': 'Hierophant', 
        'Death+Sun': 'Fortune', 
        'Death+Faith': 'Fool',
        'Death+Councillor': 'Magician',
        // Temperance Arcana
        'Temperance+Devil': 'Fool', 
        'Temperance+Tower': 'Fortune', 
        'Temperance+Star': 'Sun', 
        'Temperance+Moon': 'Councillor', 
        'Temperance+Sun': 'Magician', 
        'Temperance+Judgement': 'Hermit', 
        'Temperance+Faith': 'Hermit',
        'Temperance+Councillor': 'Fool',
        // Devil Arcana
        'Devil+Tower': 'Magician', 
        'Devil+Star': 'Stength', 
        'Devil+Moon': 'Chariot', 
        'Devil+Sun': 'Hermit', 
        'Devil+Judgement': 'Lovers', 
        'Devil+Faith': 'Chariot', 
        'Devil+Councillor': 'Chariot',
        // Tower Arcana
        'Tower+Star': 'Councillor', 
        'Tower+Moon': 'Hermit', 
        'Tower+Sun': 'Emperor', 
        'Tower+Judgement': 'Moon', 
        'Tower+Faith': 'Death',
        'Tower+Councillor': 'Death',
        // Star Arcana
        'Star+Moon': 'Temperance', 
        'Star+Sun': 'Judgement', 
        'Star+Judgement': 'Fortune', 
        'Star+Faith': 'Temperance', 
        'Star+Councillor': 'Sun',
        // Moon Arcana
        'Moon+Sun': 'Empress', 
        'Moon+Judgement': 'Fool', 
        'Moon+Faith': 'Sun', 
        'Moon+Councillor': 'Temperance',
        // Sun Arcana
        'Sun+Judgement': 'Death', 
        'Sun+Faith': 'Emperor', 
        'Sun+Councillor': 'Fortune',
        // Judgement Arcana
        'Judgement+Faith': 'Fortune', 
        'Judgement+Councillor': 'Devil',
        // Faith Arcana
        'Faith+Councillor': 'Priestess'
    };

    // Lista de receitas para fusões de 2 pais que ignoram as regras normais.
    const specificFusions = [
        { result: 'Alice', parents: ['Belial', 'Nebiros'] },
        { result: 'Ardha', parents: ['Parvati', 'Shiva'] },
        { result: 'Shiva', parents: ['Barong', 'Rangda'] }
    ];

    // Lista de upgrades de Personas de DLC para suas versões Picaro
    const specialDlcUpgrades = {
        'Izanagi': 'Izanagi Picaro',
        'Izanagi-no-Okami': 'Izanagi-no-Okami Picaro',
        'Orpheus': 'Orpheus Picaro',
        'Ariadne': 'Ariadne Picaro',
        'Asterius': 'Asterius Picaro',
        'Thanatos': 'Thanatos Picaro',
        'Kaguya': 'Kaguya Picaro',
        'Magatsu-Izanagi': 'Magatsu-Izanagi Picaro',
        'Tsukiyomi': 'Tsukiyomi Picaro',
        'Messiah': 'Messiah Picaro'
    };

    let personas = [];

    async function loadPersonas() {
        try {
            const response = await fetch('personas.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            personas = await response.json();
            populateSelects();
        } catch (error) {
            console.error("Não foi possível carregar o arquivo de personas:", error);
            resultText.textContent = "Erro ao carregar dados das Personas.";
        }
    }

    function populateSelects() {
        const allPersonas = [...personas];
        allPersonas.sort((a, b) => a.name.localeCompare(b.name));

        allPersonas.forEach(persona => {
            const option1 = new Option(`${persona.name} (Lvl ${persona.baseLevel})`, persona.name);
            const option2 = new Option(`${persona.name} (Lvl ${persona.baseLevel})`, persona.name);
            persona1Select.add(option1);
            persona2Select.add(option2);
        });
    }

    function handleCalculation() {
        const name1 = persona1Select.value;
        const name2 = persona2Select.value;

        if (!name1 || !name2) {
            resultText.textContent = "Por favor, selecione duas Personas.";
            return;
        }
        if (name1 === name2) {
            resultText.textContent = "Você não pode fundir uma Persona com ela mesma.";
            return;
        }

        const persona1 = personas.find(p => p.name === name1);
        const persona2 = personas.find(p => p.name === name2);
        const result = calculateFusion(persona1, persona2);

        if (result) {
            resultText.textContent = `${result.name} (Arcana: ${result.arcana}, Nível: ${result.baseLevel})`;
        } else {
            resultText.textContent = "Combinação inválida ou sem resultado possível.";
        }
    }

    function calculateFusion(p1, p2) {
        // 1. VERIFICA RECEITAS ESPECÍFICAS (Ex: Alice)
        const parentNames = [p1.name, p2.name].sort();
        const specificRecipe = specificFusions.find(recipe => {
            if (recipe.parents.length !== 2) return false;
            return recipe.parents[0] === parentNames[0] && recipe.parents[1] === parentNames[1];
        });

        if (specificRecipe) {
            return personas.find(p => p.name === specificRecipe.result);
        }

        // Identifica se temos um Demônio do Tesouro na fusão
        const isP1Treasure = p1.hasOwnProperty('treasureDemonModifier');
        const isP2Treasure = p2.hasOwnProperty('treasureDemonModifier');
        
        // 2. VERIFICA UPGRADES ESPECIAIS DE DLC COM DEMÔNIOS DO TESOURO
        if (isP1Treasure || isP2Treasure) {
            const treasureDemon = isP1Treasure ? p1 : p2;
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

    function getResultArcana(arcana1, arcana2) {
        const key = [arcana1, arcana2].sort().join('+');
        return fusionChart[key] || null;
    }

    calculateBtn.addEventListener('click', handleCalculation);

    loadPersonas();
});