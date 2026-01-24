document.addEventListener('DOMContentLoaded', () => {


    // --- LÓGICA DO LOADER ---
    const loader = document.getElementById('loader-overlay');
    
    // Simula um tempo de carregamento ou espera o loadPersonas terminar
    // Vamos dar 2.5 segundos para a animação brilhar
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2500);


    // --- 1. DEFINIÇÃO DE DADOS E CONSTANTES ---
    const searchInput1 = document.getElementById('search-input-1');
    const resultsContainer1 = document.getElementById('results-container-1');
    const searchInput2 = document.getElementById('search-input-2');
    const resultsContainer2 = document.getElementById('results-container-2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultText = document.getElementById('result-text');

    // Elementos da Calculadora Reversa
    const searchInputTarget = document.getElementById('search-input-target');
    const resultsContainerTarget = document.getElementById('results-container-target');
    const calculateReverseBtn = document.getElementById('calculateReverseBtn');
    const reverseRecipesList = document.getElementById('reverse-recipes-list');

    // Elementos do Modal
    const modal = document.getElementById('persona-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    let selectedPersonas = { persona1: null, persona2: null, target: null };
    let personas = [];

    // Ordem das Arcanas em P3R (Incluindo AEON)
    const arcanaOrder = {
        'Fool': 0, 'Magician': 1, 'Priestess': 2, 'Empress': 3, 'Emperor': 4, 'Hierophant': 5,
        'Lovers': 6, 'Chariot': 7, 'Justice': 8, 'Hermit': 9, 'Fortune': 10, 'Strength': 11,
        'Hanged': 12, 'Death': 13, 'Temperance': 14, 'Devil': 15, 'Tower': 16, 'Star': 17,
        'Moon': 18, 'Sun': 19, 'Judgement': 20, 'Aeon': 21
    };


    const fusionChart = {
        // --- Mesma Arcana ---
        'Fool+Fool': 'Fool', 'Magician+Magician': 'Magician', 'Priestess+Priestess': 'Priestess', 
        'Empress+Empress': 'Empress', 'Emperor+Emperor': 'Emperor', 'Hierophant+Hierophant': 'Hierophant',
        'Lovers+Lovers': 'Lovers', 'Chariot+Chariot': 'Chariot', 'Justice+Justice': 'Justice', 
        'Hermit+Hermit': 'Hermit', 'Fortune+Fortune': 'Fortune', 'Strength+Strength': 'Strength', 
        'Hanged+Hanged': 'Hanged', 'Death+Death': 'Death', 'Temperance+Temperance': 'Temperance', 
        'Devil+Devil': 'Devil', 'Tower+Tower': 'Tower', 'Star+Star': 'Star', 'Moon+Moon': 'Moon', 
        'Sun+Sun': 'Sun', 'Judgement+Judgement': 'Judgement', 'Aeon+Aeon': 'Aeon',

        // --- Fool (0) + ... ---
        'Fool+Magician': 'Hierophant',
        'Fool+Priestess': 'Magician', 
        'Fool+Empress': 'Star', 
        'Fool+Emperor': 'Temperance', 
        'Fool+Hierophant': 'Hanged', 
        'Fool+Lovers': 'Justice', 
        'Fool+Chariot': 'Emperor', 
        'Fool+Justice': 'Lovers', 
        'Fool+Hermit': 'Priestess', 
        'Fool+Fortune': 'Strength', 
        'Fool+Strength': 'Death', 
        'Fool+Hanged': 'Devil', 
        'Fool+Death': 'Fortune', 
        'Fool+Temperance': 'Chariot', 
        'Fool+Devil': 'Hermit', 
        'Fool+Tower': 'Moon', 
        'Fool+Star': 'Devil', 
        'Fool+Moon': 'Empress', 
        'Fool+Sun': 'Judgement', 
        'Fool+Judgement': 'Aeon', 
        'Fool+Aeon': 'Death', 

        // --- Magician (1) + ... ---
        'Magician+Priestess': 'Justice', 
        'Magician+Empress': 'Hanged', 
        'Magician+Emperor': 'Lovers', 
        'Magician+Hierophant': 'Hermit', 
        'Magician+Lovers': 'Chariot', 
        'Magician+Chariot': 'Devil', 
        'Magician+Justice': 'Hierophant', 
        'Magician+Hermit': 'Moon', 
        'Magician+Fortune': 'Lovers', 
        'Magician+Strength': 'Emperor', 
        'Magician+Hanged': 'Fool', 
        'Magician+Death': 'Priestess', 
        'Magician+Temperance': 'Justice', 
        'Magician+Devil': 'Temperance', 
        'Magician+Tower': 'Chariot', 
        'Magician+Star': 'Strength', 
        'Magician+Moon': 'Strength', 
        'Magician+Sun': 'Empress', 
        'Magician+Judgement': 'Star', 
        'Magician+Aeon': 'Sun', 

        // --- Priestess (2) + ... ---
        'Priestess+Empress': 'Temperance', 
        'Priestess+Emperor': 'Justice', 
        'Priestess+Hierophant': 'Lovers', 
        'Priestess+Lovers': 'Magician', 
        'Priestess+Chariot': 'Fool', 
        'Priestess+Justice': 'Lovers', 
        'Priestess+Hermit': 'Strength', 
        'Priestess+Fortune': 'Hanged', 
        'Priestess+Strength': 'Moon', 
        'Priestess+Hanged': 'Hierophant', 
        'Priestess+Death': 'Justice', 
        'Priestess+Temperance': 'Fortune', 
        'Priestess+Devil': 'Emperor', 
        'Priestess+Tower': 'Empress', 
        'Priestess+Star': 'Emperor', 
        'Priestess+Moon': 'Star', 
        'Priestess+Sun': 'Hierophant', 
        'Priestess+Judgement': 'Hanged', 
        'Priestess+Aeon': 'Empress', 

        // --- Empress (3) + ... ---
        'Empress+Emperor': 'Chariot', 
        'Empress+Hierophant': 'Tower', 
        'Empress+Lovers': 'Moon', 
        'Empress+Chariot': 'Hermit', 
        'Empress+Justice': 'Emperor', 
        'Empress+Hermit': 'Sun', 
        'Empress+Fortune': 'Strength', 
        'Empress+Strength': 'Fool', 
        'Empress+Hanged': 'Star', 
        'Empress+Death': 'Lovers', 
        'Empress+Temperance': 'Hierophant', 
        'Empress+Devil': 'Tower', 
        'Empress+Tower': 'Devil', 
        'Empress+Star': 'Priestess', 
        'Empress+Moon': 'Aeon', 
        'Empress+Sun': 'Emperor', 
        'Empress+Judgement': 'Lovers', 
        'Empress+Aeon': 'Priestess', 

        // --- Emperor (4) + ... ---
        'Emperor+Hierophant': 'Strength', 
        'Emperor+Lovers': 'Chariot', 
        'Emperor+Chariot': 'Devil', 
        'Emperor+Justice': 'Hanged', 
        'Emperor+Hermit': 'Hierophant', 
        'Emperor+Fortune': 'Star', 
        'Emperor+Strength': 'Magician', 
        'Emperor+Hanged': 'Death', 
        'Emperor+Death': 'Hermit', 
        'Emperor+Temperance': 'Star', 
        'Emperor+Devil': 'Moon', 
        'Emperor+Tower': 'Strength', 
        'Emperor+Star': 'Hierophant', 
        'Emperor+Moon': 'Lovers', 
        'Emperor+Sun': 'Temperance', 
        'Emperor+Judgement': 'Sun', 
        'Emperor+Aeon': 'Fortune', 

        // --- Hierophant (5) + ... ---
        'Hierophant+Lovers': 'Magician', 
        'Hierophant+Chariot': 'Justice', 
        'Hierophant+Justice': 'Fool', 
        'Hierophant+Hermit': 'Chariot', 
        'Hierophant+Fortune': 'Moon', 
        'Hierophant+Strength': 'Fortune', 
        'Hierophant+Hanged': 'Strength', 
        'Hierophant+Death': 'Fortune', 
        'Hierophant+Temperance': 'Hermit', 
        'Hierophant+Devil': 'Priestess', 
        'Hierophant+Tower': 'Temperance',  
        'Hierophant+Star': 'Moon', 
        'Hierophant+Moon': 'Magician', 
        'Hierophant+Sun': 'Tower', 
        'Hierophant+Judgement': 'Emperor', 
        'Hierophant+Aeon': 'Sun', 

        // --- Lovers (6) + ... ---
        'Lovers+Chariot': 'Priestess', 
        'Lovers+Justice': 'Empress', 
        'Lovers+Hermit': 'Fool', 
        'Lovers+Fortune': 'Temperance', 
        'Lovers+Strength': 'Hermit', 
        'Lovers+Hanged': 'Justice', 
        'Lovers+Death': 'Hanged', 
        'Lovers+Temperance': 'Death', 
        'Lovers+Devil': 'Star',
        'Lovers+Tower': 'Sun', 
        'Lovers+Star': 'Death',
        'Lovers+Moon': 'Empress', 
        'Lovers+Sun': 'Devil', 
        'Lovers+Judgement': 'Moon', 
        'Lovers+Aeon': 'Tower', 

        // --- Chariot (7) + ... ---
        'Chariot+Justice': 'Magician', 
        'Chariot+Hermit': 'Lovers', 
        'Chariot+Fortune': 'Priestess', 
        'Chariot+Strength': 'Temperance', 
        'Chariot+Hanged': 'Strength', 
        'Chariot+Death': 'Hierophant', 
        'Chariot+Temperance': 'Hermit', 
        'Chariot+Devil': 'Hanged', 
        'Chariot+Tower': 'Star', 
        'Chariot+Star': 'Fortune', 
        'Chariot+Moon': 'Temperance', 
        'Chariot+Sun': 'Strength', 
        'Chariot+Judgement': 'Empress', 
        'Chariot+Aeon': 'Hermit', 

        // --- Justice (8) + ... ---
        'Justice+Hermit': 'Magician', 
        'Justice+Fortune': 'Hanged', 
        'Justice+Strength': 'Star', 
        'Justice+Hanged': 'Priestess', 
        'Justice+Death': 'Hermit', 
        'Justice+Temperance': 'Moon', 
        'Justice+Devil': 'Temperance', 
        'Justice+Tower': 'Sun', 
        'Justice+Star': 'Hermit', 
        'Justice+Moon': 'Temperance', 
        'Justice+Sun': 'Magician', 
        'Justice+Judgement': 'Fool',  
        'Justice+Aeon': 'Judgement', 

        // --- Hermit (9) + ... ---
        'Hermit+Fortune': 'Justice', 
        'Hermit+Strength': 'Empress', 
        'Hermit+Hanged': 'Temperance', 
        'Hermit+Death': 'Chariot', 
        'Hermit+Temperance': 'Magician', 
        'Hermit+Devil': 'Strength', 
        'Hermit+Tower': 'Empress', 
        'Hermit+Star': 'Fool', 
        'Hermit+Moon': 'Hierophant', 
        'Hermit+Sun': 'Star', 
        'Hermit+Judgement': 'Temperance', 
        'Hermit+Aeon': 'Devil', 

        // --- Fortune (10) + ... ---
        'Fortune+Strength': 'Sun', 
        'Fortune+Hanged': 'Magician', 
        'Fortune+Death': 'Star', 
        'Fortune+Temperance': 'Tower', 
        'Fortune+Devil': 'Empress', 
        'Fortune+Tower': 'Aeon', 
        'Fortune+Star': 'Magician', 
        'Fortune+Moon': 'Death', 
        'Fortune+Sun': 'Judgement', 
        'Fortune+Judgement': 'Sun', 
        'Fortune+Aeon': 'Moon', 

        // --- Strength (11) + ... ---
        'Strength+Hanged': 'Chariot', 
        'Strength+Death': 'Empress', 
        'Strength+Temperance': 'Moon', 
        'Strength+Devil': 'Lovers', 
        'Strength+Tower': 'Hanged', 
        'Strength+Star': 'Priestess', 
        'Strength+Moon': 'Devil', 
        'Strength+Sun': 'Lovers', 
        'Strength+Judgement': 'Devil', 
        'Strength+Aeon': 'Fool', 

        // --- Hanged (12) + ... ---
        'Hanged+Death': 'Strength', 
        'Hanged+Temperance': 'Hierophant', 
        'Hanged+Devil': 'Priestess', 
        'Hanged+Tower': 'Death', 
        'Hanged+Star': 'Empress', 
        'Hanged+Moon': 'Chariot', 
        'Hanged+Sun': 'Aeon', 
        'Hanged+Judgement': 'Tower', 
        'Hanged+Aeon': 'Death', 

        // --- Death (13) + ... ---
        'Death+Temperance': 'Devil', 
        'Death+Devil': 'Tower', 
        'Death+Tower': 'Aeon', 
        'Death+Star': 'Sun', 
        'Death+Moon': 'Hanged', 
        'Death+Sun': 'Justice', 
        'Death+Judgement': 'Devil', 
        // 'Death+Aeon' não da nenhum resultado na planilha. Ignorado.

        // --- Temperance (14) + ... ---
        'Temperance+Devil': 'Fool', 
        'Temperance+Tower': 'Devil', 
        'Temperance+Star': 'Fortune', 
        'Temperance+Moon': 'Priestess',
        'Temperance+Sun': 'Chariot', 
        'Temperance+Judgement': 'Empress', 
        'Temperance+Aeon': 'Justice', 

        // --- Devil (15) + ... ---
        'Devil+Tower': 'Judgement', 
        'Devil+Star': 'Justice', 
        'Devil+Moon': 'Fool', 
        'Devil+Sun': 'Death', 
        'Devil+Judgement': 'Death', 
        'Devil+Aeon': 'Star', 

        // --- Tower (16) + ... ---
        'Tower+Star': 'Judgement', 
        'Tower+Moon': 'Fortune', 
        'Tower+Sun': 'Hierophant', 
        'Tower+Judgement': 'Aeon', 
        'Tower+Aeon': 'Sun', 

        // --- Star (17) + ... ---
        'Star+Moon': 'Sun',  
        'Star+Sun': 'Justice',  
        'Star+Judgement': 'Tower', 
        'Star+Aeon': 'Judgement', 

        // --- Moon (18) + ... ---
        'Moon+Sun': 'Tower', 
        'Moon+Judgement': 'Fortune', 
        'Moon+Aeon': 'Judgement',

        // --- Sun (19) + ... ---
        'Sun+Judgement': 'Aeon', 
        'Sun+Aeon': 'Empress', 

        // --- Judgement (20) + ... ---
        'Judgement+Aeon': 'Fool' 
    };

    // Receitas Especiais (Exemplos P3R)
    const specificFusions = [
        { result: 'Messiah', parents: ['Orpheus', 'Thanatos'] }
    ];

    // --- FUNÇÕES DE CARREGAMENTO ---
    async function loadPersonas() {
        try {
            const response = await fetch('data.json'); // Carrega o JSON específico do P3R
            personas = await response.json();
            setupAutocomplete(searchInput1, resultsContainer1, 'persona1');
            setupAutocomplete(searchInput2, resultsContainer2, 'persona2');
            setupAutocomplete(searchInputTarget, resultsContainerTarget, 'target');
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    }

    // --- LÓGICA DE AUTOCOMPLETE (Igual ao P5) ---
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
                    item.textContent = `${persona.name} (Lvl ${persona.baseLevel} - ${persona.arcana})`;
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

    // --- LÓGICA DE CÁLCULO DE FUSÃO (P3R) ---
    function handleCalculation() {
        const p1 = selectedPersonas.persona1;
        const p2 = selectedPersonas.persona2;

        if (!p1 || !p2) {
            resultText.textContent = "Selecione duas Personas válidas.";
            return;
        }
        if (p1.name === p2.name) {
            resultText.textContent = "Não pode fundir a mesma Persona.";
            return;
        }

        const result = calculateFusion(p1, p2);

        if (result) {
            resultText.innerHTML = '';
            const span = document.createElement('span');
            span.textContent = result.name;
            span.style.cursor = 'pointer';
            span.style.textDecoration = 'underline';
            span.style.fontWeight = 'bold';
            span.addEventListener('click', () => {
                populateModal(result);
                modal.classList.add('open');
            });
            
            resultText.appendChild(span);
            resultText.appendChild(document.createTextNode(` (Arcana: ${result.arcana}, Lvl: ${result.baseLevel})`));
        } else {
            resultText.textContent = "Resultado impossível.";
        }
    }

    function calculateFusion(p1, p2) {
        // 1. Checa Receitas Especiais (2 pais)
        const parentNames = [p1.name, p2.name].sort();
        const specific = specificFusions.find(r => 
            r.parents.length === 2 && r.parents[0] === parentNames[0] && r.parents[1] === parentNames[1]
        );
        if (specific) return personas.find(p => p.name === specific.result);

        // 2. Fusão Normal
        const resultArcana = getResultArcana(p1.arcana, p2.arcana);
        if (!resultArcana) return null;

        // Fórmula P3R: Média dos níveis base + 1
        // Nota: P3R usa nível ATUAL no jogo, mas para calculadora base, usamos baseLevel.
        const avgLevel = Math.floor((p1.baseLevel + p2.baseLevel) / 2) + 1;
        
        // Filtra personas válidas (exclui especiais e DLCs se necessário)
        // No P3R, fusão normal não cria personas especiais.
        const candidates = personas
            .filter(p => p.arcana === resultArcana && !p.special)
            .sort((a, b) => a.baseLevel - b.baseLevel);

        if (p1.arcana === p2.arcana) {
            // Mesma Arcana: Busca a menor persona MAIOR que o nível médio? 
            // NÃO, em P3R mesma arcana geralmente resulta em DOWNGRADE (menor que a média).
            // Regra P3R Mesma Arcana: Próxima persona ABAIXO da média.
            // Exceção: Se média for menor que a persona mais fraca, não funde (ou vira slime/etc).
            const validCandidates = candidates.filter(p => p.baseLevel < avgLevel && p.name !== p1.name && p.name !== p2.name);
            return validCandidates.length > 0 ? validCandidates[validCandidates.length - 1] : null;
        } else {
            // Arcanas Diferentes: Busca a próxima persona ACIMA da média.
            const validCandidates = candidates.filter(p => p.baseLevel >= avgLevel);
            return validCandidates.length > 0 ? validCandidates[0] : candidates[candidates.length - 1]; // Fallback para a mais forte se estourar o nível
        }
    }

    function getResultArcana(a1, a2) {
        if (!arcanaOrder[a1] && arcanaOrder[a1] !== 0) return null; // Validação
        if (!arcanaOrder[a2] && arcanaOrder[a2] !== 0) return null;

        const sorted = [a1, a2].sort((x, y) => arcanaOrder[x] - arcanaOrder[y]);
        const key = sorted.join('+');
        return fusionChart[key] || null;
    }

    // --- CÁLCULO REVERSO ---
    function handleReverseCalculation() {
        const target = selectedPersonas.target;
        if (!target) return;

        reverseRecipesList.innerHTML = 'Calculando...';
        
        // Se for especial, mostra receita fixa
        if (target.special) {
            const recipe = specificFusions.find(r => r.result === target.name);
            reverseRecipesList.innerHTML = '';
            if (recipe) {
                const li = document.createElement('li');
                li.textContent = `Fusão Especial: ${recipe.parents.join(' + ')}`;
                reverseRecipesList.appendChild(li);
            } else {
                reverseRecipesList.textContent = "Receita especial não cadastrada.";
            }
            return;
        }

        // Fusão Normal Reversa
        const recipes = [];
        // Itera sobre todas as combinações possíveis de Arcanas que resultam na Arcana do alvo
        // Para simplificar (força bruta otimizada):
        // 1. Achar pares de Arcanas que resultam na Arcana alvo.
        // 2. Para cada par, testar personas.
        
        // (Implementação simplificada de força bruta para demonstração)
        for (let i = 0; i < personas.length; i++) {
            for (let j = i; j < personas.length; j++) {
                const p1 = personas[i];
                const p2 = personas[j];
                
                // Otimização: Ignora se alguma for especial (não podem ser pais normais na maioria)
                if (p1.special || p2.special) continue; 

                const res = calculateFusion(p1, p2);
                if (res && res.name === target.name) {
                    recipes.push(`${p1.name} (Lvl ${p1.baseLevel}) + ${p2.name} (Lvl ${p2.baseLevel})`);
                    if (recipes.length >= 20) break; // Limite para não travar
                }
            }
            if (recipes.length >= 20) break;
        }

        reverseRecipesList.innerHTML = '';
        if (recipes.length === 0) {
            reverseRecipesList.textContent = "Nenhuma combinação simples encontrada.";
        } else {
            recipes.forEach(r => {
                const li = document.createElement('li');
                li.textContent = r;
                reverseRecipesList.appendChild(li);
            });
        }
    }

    // --- MODAL ---
    function populateModal(persona) {
        document.getElementById('modal-persona-name').textContent = persona.name;
        // Stats
        const statsList = document.querySelector('#modal-stats ul');
        statsList.innerHTML = '';
        if (persona.stats) {
            for (const [key, val] of Object.entries(persona.stats)) {
                statsList.innerHTML += `<li>${key.toUpperCase()}: <span>${val}</span></li>`;
            }
        }
        // Elements
        const elemList = document.querySelector('#modal-elements ul');
        elemList.innerHTML = '';
        if (persona.elements) {
            for (const [key, val] of Object.entries(persona.elements)) {
                let color = '#fff';
                if (val === 'wk') color = '#ff5555'; // Weak = Red
                if (val === 'rs' || val === 'nu' || val === 'rp' || val === 'dr') color = '#55ff55'; // Resists = Green
                elemList.innerHTML += `<li>${key}: <span style="color:${color}">${val.toUpperCase()}</span></li>`;
            }
        }
    }

    closeModalBtn.addEventListener('click', () => modal.classList.remove('open'));
    window.addEventListener('click', (e) => { if(e.target == modal) modal.classList.remove('open') });

    // Listeners
    calculateBtn.addEventListener('click', handleCalculation);
    calculateReverseBtn.addEventListener('click', handleReverseCalculation);
    
    // Menu Mobile
    document.getElementById('hamburger-menu').addEventListener('click', () => {
        document.getElementById('nav-list').classList.toggle('open');
    });

    window.addEventListener('click', (e) => {
        if (!e.target.matches('.search-input')) {
            resultsContainer1.style.display = 'none';
            resultsContainer2.style.display = 'none';
            resultsContainerTarget.style.display = 'none';
        }
    });

    loadPersonas();
});