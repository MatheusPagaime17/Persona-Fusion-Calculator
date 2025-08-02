// Aguarda o conteúdo da página carregar completamente antes de executar o script
// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINIÇÃO DE DADOS E CONSTANTES ---

    // Referências aos elementos do HTML que vamos manipular
    const persona1Select = document.getElementById('persona1');
    const persona2Select = document.getElementById('persona2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultText = document.getElementById('result-text');

    // A tabela de fusão de Arcanas. A chave é a combinação das duas arcanas em ordem alfabética.
    const fusionChart = {
    // Mesma Arcana
    'Chariot+Chariot': 'Chariot',
    'Councillor+Councillor': 'Councillor',
    'Death+Death': 'Death',
    'Devil+Devil': 'Devil',
    'Emperor+Emperor': 'Emperor',
    'Empress+Empress': 'Empress',
    'Faith+Faith': 'Faith',
    'Fool+Fool': 'Fool',
    'Fortune+Fortune': 'Fortune',
    'Hanged+Hanged': 'Hanged',
    'Hermit+Hermit': 'Hermit',
    'Hierophant+Hierophant': 'Hierophant',
    'Judgement+Judgement': 'Judgement',
    'Justice+Justice': 'Justice',
    'Lovers+Lovers': 'Lovers',
    'Magician+Magician': 'Magician',
    'Moon+Moon': 'Moon',
    'Priestess+Priestess': 'Priestess',
    'Star+Star': 'Star',
    'Strength+Strength': 'Strength',
    'Sun+Sun': 'Sun',
    'Temperance+Temperance': 'Temperance',
    'Tower+Tower': 'Tower',

    // Combinações de Arcanas Diferentes
    'Chariot+Councillor': 'Hierophant',
    'Chariot+Death': 'Devil',
    'Chariot+Devil': 'Death',
    'Chariot+Emperor': 'Strength',
    'Chariot+Empress': 'Star',
    'Chariot+Faith': 'Devil',
    'Chariot+Fool': 'Tower',
    'Chariot+Fortune': 'Empress',
    'Chariot+Hanged': 'Fool',
    'Chariot+Hermit': 'Devil',
    'Chariot+Hierophant': 'Star',
    'Chariot+Justice': 'Baal',
    'Chariot+Lovers': 'Hierophant',
    'Chariot+Magician': 'Priestess',
    'Chariot+Moon': 'Faith',
    'Chariot+Priestess': 'Hierophant',
    'Chariot+Star': 'Sun',
    'Chariot+Strength': 'Hermit',
    'Chariot+Sun': 'Strength',
    'Chariot+Temperance': 'Strength',
    'Chariot+Tower': 'Faith',
    'Councillor+Death': 'Chariot',
    'Councillor+Devil': 'Hanged',
    'Councillor+Emperor': 'Hierophant',
    'Councillor+Empress': 'Fool',
    'Councillor+Faith': 'Hermit',
    'Councillor+Fool': 'Hierophant',
    'Councillor+Fortune': 'Sun',
    'Councillor+Hanged': 'Empress',
    'Councillor+Hermit': 'Strength',
    'Councillor+Hierophant': 'Justice',
    'Councillor+Justice': 'Star',
    'Councillor+Lovers': 'Tower',
    'Councillor+Magician': 'Faith',
    'Councillor+Moon': 'Priestess',
    'Councillor+Priestess': 'Lovers',
    'Councillor+Star': 'Emperor',
    'Councillor+Strength': 'Faith',
    'Councillor+Sun': 'Death',
    'Councillor+Temperance': 'Magician',
    'Councillor+Tower': 'Sun',
    'Death+Devil': 'Hanged',
    'Death+Emperor': 'Hermit',
    'Death+Empress': 'Fool',
    'Death+Faith': 'Strength',
    'Death+Fool': 'Temperance',
    'Death+Fortune': 'Star',
    'Death+Hanged': 'Moon',
    'Death+Hermit': 'Star',
    'Death+Hierophant': 'Hanged',
    'Death+Justice': 'Moon',
    'Death+Lovers': 'Temperance',
    'Death+Magician': 'Devil',
    'Death+Moon': 'Hierophant',
    'Death+Priestess': 'Magician',
    'Death+Star': 'Sun',
    'Death+Strength': 'Hierophant',
    'Death+Sun': 'Priestess',
    'Death+Temperance': 'Strength',
    'Death+Tower': 'Sun',
    'Devil+Emperor': 'Justice',
    'Devil+Empress': 'Sun',
    'Devil+Faith': 'Chariot',
    'Devil+Fool': 'Empress',
    'Devil+Fortune': 'Hanged',
    'Devil+Hanged': 'Temperance',
    'Devil+Hermit': 'Priestess',
    'Devil+Hierophant': 'Fortune',
    'Devil+Justice': 'Fool',
    'Devil+Lovers': 'Moon',
    'Devil+Magician': 'Chariot',
    'Devil+Moon': 'Chariot',
    'Devil+Priestess': 'Hanged',
    'Devil+Star': 'Empress',
    'Devil+Strength': 'Fool',
    'Devil+Sun': 'Moon',
    'Devil+Temperance': 'Hierophant',
    'Devil+Tower': 'Emperor',
    'Emperor+Empress': 'Justice',
    'Emperor+Faith': 'Hierophant',
    'Emperor+Fool': 'Temperance',
    'Emperor+Fortune': 'Sun',
    'Emperor+Hanged': 'Devil',
    'Emperor+Hermit': 'Chariot',
    'Emperor+Hierophant': 'Fool',
    'Emperor+Justice': 'Chariot',
    'Emperor+Lovers': 'Fool',
    'Emperor+Magician': 'Hanged',
    'Emperor+Moon': 'Tower',
    'Emperor+Priestess': 'Empress',
    'Emperor+Star': 'Lovers',
    'Emperor+Strength': 'Tower',
    'Emperor+Sun': 'Judgement',
    'Emperor+Temperance': 'Priestess',
    'Emperor+Tower': 'Faith',
    'Empress+Faith': 'Fool',
    'Empress+Fool': 'Hanged',
    'Empress+Fortune': 'Hermit',
    'Empress+Hanged': 'Lovers',
    'Empress+Hermit': 'Strength',
    'Empress+Hierophant': 'Fortune',
    'Empress+Justice': 'Lovers',
    'Empress+Lovers': 'Star',
    'Empress+Magician': 'Justice',
    'Empress+Moon': 'Fortune',
    'Empress+Priestess': 'Emperor',
    'Empress+Star': 'Justice',
    'Empress+Strength': 'Hanged',
    'Empress+Sun': 'Moon',
    'Empress+Temperance': 'Magician',
    'Empress+Tower': 'Death',
    'Faith+Fool': 'Councillor',
    'Faith+Fortune': 'Councillor',
    'Faith+Hanged': 'Councillor',
    'Faith+Hermit': 'Priestess',
    'Faith+Hierophant': 'Judgement',
    'Faith+Justice': 'Emperor',
    'Faith+Lovers': 'Empress',
    'Faith+Magician': 'Hierophant',
    'Faith+Moon': 'Empress',
    'Faith+Priestess': 'Lovers',
    'Faith+Star': 'Councillor',
    'Faith+Strength': 'Hanged',
    'Faith+Sun': 'Moon',
    'Faith+Temperance': 'Priestess',
    'Faith+Tower': 'Hermit',
    'Fool+Fortune': 'Empress',
    'Fool+Hanged': 'Strength',
    'Fool+Hermit': 'Lovers',
    'Fool+Hierophant': 'Death',
    'Fool+Justice': 'Star',
    'Fool+Lovers': 'Chariot',
    'Fool+Magician': 'Death',
    'Fool+Moon': 'Priestess',
    'Fool+Priestess': 'Moon',
    'Fool+Star': 'Tower',
    'Fool+Strength': 'Chariot',
    'Fool+Sun': 'Justice',
    'Fool+Temperance': 'Hierophant',
    'Fool+Tower': 'Emperor',
    'Fortune+Hanged': 'Emperor',
    'Fortune+Hermit': 'Star',
    'Fortune+Hierophant': 'Justice',
    'Fortune+Justice': 'Sun',
    'Fortune+Lovers': 'Priestess',
    'Fortune+Magician': 'Emperor',
    'Fortune+Moon': 'Sun',
    'Fortune+Priestess': 'Tower',
    'Fortune+Star': 'Temperance',
    'Fortune+Strength': 'Sun',
    'Fortune+Temperance': 'Lovers',
    'Fortune+Tower': 'Hanged',
    'Hanged+Hermit': 'Sun',
    'Hanged+Hierophant': 'Star',
    'Hanged+Justice': 'Magician',
    'Hanged+Lovers': 'Empress',
    'Hanged+Magician': 'Priestess',
    'Hanged+Moon': 'Strength',
    'Hanged+Priestess': 'Death',
    'Hanged+Star': 'Justice',
    'Hanged+Strength': 'Death',
    'Hanged+Sun': 'Lovers',
    'Hanged+Temperance': 'Emperor',
    'Hanged+Tower': 'Moon',
    'Hermit+Hierophant': 'Lovers',
    'Hermit+Justice': 'Emperor',
    'Hermit+Lovers': 'Chariot',
    'Hermit+Magician': 'Fortune',
    'Hermit+Moon': 'Priestess',
    'Hermit+Priestess': 'Strength',
    'Hermit+Star': 'Magician',
    'Hermit+Strength': 'Hierophant',
    'Hermit+Sun': 'Devil',
    'Hermit+Temperance': 'Death',
    'Hermit+Tower': 'Magician',
    'Hierophant+Justice': 'Hanged',
    'Hierophant+Lovers': 'Strength',
    'Hierophant+Magician': 'Temperance',
    'Hierophant+Moon': 'Death',
    'Hierophant+Priestess': 'Justice',
    'Hierophant+Star': 'Tower',
    'Hierophant+Strength': 'Fool',
    'Hierophant+Sun': 'Lovers',
    'Hierophant+Temperance': 'Death',
    'Hierophant+Tower': 'Devil',
    'Judgement+Sun': 'Justice',
    'Justice+Lovers': 'Emperor',
    'Justice+Magician': 'Empress',
    'Justice+Moon': 'Faith',
    'Justice+Priestess': 'Sun',
    'Justice+Star': 'Fortune',
    'Justice+Strength': 'Hermit',
    'Justice+Sun': 'Tower',
    'Justice+Temperance': 'Moon',
    'Justice+Tower': 'Star',
    'Lovers+Magician': 'Devil',
    'Lovers+Moon': 'Temperance',
    'Lovers+Priestess': 'Emperor',
    'Lovers+Star': 'Faith',
    'Lovers+Strength': 'Devil',
    'Lovers+Sun': 'Hanged',
    'Lovers+Temperance': 'Empress',
    'Lovers+Tower': 'Death',
    'Magician+Moon': 'Lovers',
    'Magician+Priestess': 'Strength',
    'Magician+Star': 'Priestess',
    'Magician+Strength': 'Fortune',
    'Magician+Sun': 'Tower',
    'Magician+Temperance': 'Fool',
    'Magician+Tower': 'Hermit',
    'Moon+Priestess': 'Hierophant',
    'Moon+Star': 'Magician',
    'Moon+Strength': 'Lovers',
    'Moon+Sun': 'Empress',
    'Moon+Temperance': 'Faith',
    'Moon+Tower': 'Death',
    'Priestess+Star': 'Hermit',
    'Priestess+Strength': 'Chariot',
    'Priestess+Sun': 'Temperance',
    'Priestess+Temperance': 'Devil',
    'Priestess+Tower': 'Emperor',
    'Star+Strength': 'Temperance',
    'Star+Sun': 'Judgement',
    'Star+Temperance': 'Hermit',
    'Star+Tower': 'Fool',
    'Strength+Sun': 'Moon',
    'Strength+Temperance': 'Chariot',
    'Strength+Tower': 'Hermit',
    'Sun+Temperance': 'Priestess',
    'Sun+Tower': 'Emperor',
    'Temperance+Tower': 'Priestess'

    };

  // Lista de receitas para fusões de 2 pais que ignoram as regras normais.
    const specificFusions = [
        { result: 'Alice', parents: ['Belial', 'Nebiros'] },
        { result: 'Ardha', parents: ['Parvati', 'Shiva'] },
        { result: 'Shiva', parents: ['Barong', 'Rangda'] }
    ];

   let personas = []; // Array para armazenar os dados das personas carregadas do JSON

    // --- 2. CARREGAMENTO E INICIALIZAÇÃO ---

    // Função para carregar os dados do arquivo personas.json
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

    // Função para popular os menus <select> com os nomes das personas
    function populateSelects() {
        const allPersonas = [...personas]; // Cria uma cópia para não alterar a original
        
        // Ordena por nome para facilitar a busca do usuário no menu
        allPersonas.sort((a, b) => a.name.localeCompare(b.name));

        allPersonas.forEach(persona => {
            const option1 = new Option(`${persona.name} (Lvl ${persona.baseLevel})`, persona.name);
            const option2 = new Option(`${persona.name} (Lvl ${persona.baseLevel})`, persona.name);
            persona1Select.add(option1);
            persona2Select.add(option2);
        });
    }


    // --- 3. LÓGICA DE FUSÃO ---

    // Função principal que é chamada quando o botão é clicado
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

    // A função de cálculo principal
    function calculateFusion(p1, p2) {
        // Bloco de verificação de receitas específicas
        const parentNames = [p1.name, p2.name].sort();
        const specificRecipe = specificFusions.find(recipe => {
            if (recipe.parents.length !== 2) return false;
            return recipe.parents[0] === parentNames[0] && recipe.parents[1] === parentNames[1];
        });

        if (specificRecipe) {
            return personas.find(p => p.name === specificRecipe.result);
        }

        // Se não for uma receita específica, continua com a lógica normal
        const resultArcana = getResultArcana(p1.arcana, p2.arcana);
        if (!resultArcana) return null;

        // Ordena a lista de personas por nível base para os cálculos seguintes
        const sortedPersonas = [...personas].sort((a, b) => a.baseLevel - b.baseLevel);
        const avgLevel = Math.floor((p1.baseLevel + p2.baseLevel) / 2) + 1;
        
        // Filtra para não incluir Personas que são resultados de fusões especiais na lógica normal
        const availablePersonas = sortedPersonas.filter(p => !p.special);

        if (p1.arcana === p2.arcana) {
            // Fusão de mesma Arcana: Encontra a próxima persona *abaixo* do nível médio
            const candidates = availablePersonas.filter(p => p.arcana === resultArcana && p.baseLevel < avgLevel && p.name !== p1.name && p.name !== p2.name);
            return candidates.length > 0 ? candidates[candidates.length - 1] : null;
        } else {
            // Fusão de Arcanas diferentes: Encontra a próxima persona *acima* do nível médio
            const candidates = availablePersonas.filter(p => p.arcana === resultArcana && p.baseLevel >= avgLevel);
            return candidates.length > 0 ? candidates[0] : null;
        }
    }

    // Função para obter a Arcana resultante da tabela de fusão
    function getResultArcana(arcana1, arcana2) {
        const key = [arcana1, arcana2].sort().join('+');
        return fusionChart[key] || null;
    }


    // --- 4. EVENT LISTENERS ---

    calculateBtn.addEventListener('click', handleCalculation);


    // --- 5. INICIALIZAÇÃO DO SCRIPT ---
    loadPersonas();
});