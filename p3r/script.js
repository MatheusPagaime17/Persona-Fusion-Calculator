document.addEventListener('DOMContentLoaded', () => {

    // --- LOADER DARK HOUR ---
    const loader = document.getElementById('loader-overlay');
    const loadingText = document.querySelector('.loading-text');
    
    function hideLoader() {
        if (loader) loader.classList.add('hidden');
    }

    function setLoaderMessage(msg, isError = false) {
        if (loadingText) {
            loadingText.textContent = msg;
            loadingText.style.color = isError ? '#ff4444' : '';
        }
    }

    // --- ELEMENTOS DOM ---
    const searchInput1 = document.getElementById('search-input-1');
    const resultsContainer1 = document.getElementById('results-container-1');
    const searchInput2 = document.getElementById('search-input-2');
    const resultsContainer2 = document.getElementById('results-container-2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultText = document.getElementById('result-text');

    const searchInputTarget = document.getElementById('search-input-target');
    const resultsContainerTarget = document.getElementById('results-container-target');
    const calculateReverseBtn = document.getElementById('calculateReverseBtn');
    const reverseRecipesList = document.getElementById('reverse-recipes-list');

    const modal = document.getElementById('persona-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    let selectedPersonas = { persona1: null, persona2: null, target: null };
    let personas = [];

    // --- CONFIGURAÇÕES DE FUSÃO P3R ---
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
        'Fool+Magician': 'Hierophant', 'Fool+Priestess': 'Magician', 'Fool+Empress': 'Star', 'Fool+Emperor': 'Temperance', 
        'Fool+Hierophant': 'Hanged', 'Fool+Lovers': 'Justice', 'Fool+Chariot': 'Emperor', 'Fool+Justice': 'Lovers', 
        'Fool+Hermit': 'Priestess', 'Fool+Fortune': 'Strength', 'Fool+Strength': 'Death', 'Fool+Hanged': 'Devil', 
        'Fool+Death': 'Fortune', 'Fool+Temperance': 'Chariot', 'Fool+Devil': 'Hermit', 'Fool+Tower': 'Moon', 
        'Fool+Star': 'Devil', 'Fool+Moon': 'Empress', 'Fool+Sun': 'Judgement', 'Fool+Judgement': 'Aeon', 'Fool+Aeon': 'Death', 

        // --- Magician (1) + ... ---
        'Magician+Priestess': 'Justice', 'Magician+Empress': 'Hanged', 'Magician+Emperor': 'Lovers', 'Magician+Hierophant': 'Hermit', 
        'Magician+Lovers': 'Chariot', 'Magician+Chariot': 'Devil', 'Magician+Justice': 'Hierophant', 'Magician+Hermit': 'Moon', 
        'Magician+Fortune': 'Lovers', 'Magician+Strength': 'Emperor', 'Magician+Hanged': 'Fool', 'Magician+Death': 'Priestess', 
        'Magician+Temperance': 'Justice', 'Magician+Devil': 'Temperance', 'Magician+Tower': 'Chariot', 'Magician+Star': 'Strength', 
        'Magician+Moon': 'Strength', 'Magician+Sun': 'Empress', 'Magician+Judgement': 'Star', 'Magician+Aeon': 'Sun', 

        // --- Priestess (2) + ... ---
        'Priestess+Empress': 'Temperance', 'Priestess+Emperor': 'Justice', 'Priestess+Hierophant': 'Lovers', 'Priestess+Lovers': 'Magician', 
        'Priestess+Chariot': 'Fool', 'Priestess+Justice': 'Lovers', 'Priestess+Hermit': 'Strength', 'Priestess+Fortune': 'Hanged', 
        'Priestess+Strength': 'Moon', 'Priestess+Hanged': 'Hierophant', 'Priestess+Death': 'Justice', 'Priestess+Temperance': 'Fortune', 
        'Priestess+Devil': 'Emperor', 'Priestess+Tower': 'Empress', 'Priestess+Star': 'Emperor', 'Priestess+Moon': 'Star', 
        'Priestess+Sun': 'Hierophant', 'Priestess+Judgement': 'Hanged', 'Priestess+Aeon': 'Empress', 

        // --- Empress (3) + ... ---
        'Empress+Emperor': 'Chariot', 'Empress+Hierophant': 'Tower', 'Empress+Lovers': 'Moon', 'Empress+Chariot': 'Hermit', 
        'Empress+Justice': 'Emperor', 'Empress+Hermit': 'Sun', 'Empress+Fortune': 'Strength', 'Empress+Strength': 'Fool', 
        'Empress+Hanged': 'Star', 'Empress+Death': 'Lovers', 'Empress+Temperance': 'Hierophant', 'Empress+Devil': 'Tower', 
        'Empress+Tower': 'Devil', 'Empress+Star': 'Priestess', 'Empress+Moon': 'Aeon', 'Empress+Sun': 'Emperor', 
        'Empress+Judgement': 'Lovers', 'Empress+Aeon': 'Priestess', 

        // --- Emperor (4) + ... ---
        'Emperor+Hierophant': 'Strength', 'Emperor+Lovers': 'Chariot', 'Emperor+Chariot': 'Devil', 'Emperor+Justice': 'Hanged', 
        'Emperor+Hermit': 'Hierophant', 'Emperor+Fortune': 'Star', 'Emperor+Strength': 'Magician', 'Emperor+Hanged': 'Death', 
        'Emperor+Death': 'Hermit', 'Emperor+Temperance': 'Star', 'Emperor+Devil': 'Moon', 'Emperor+Tower': 'Strength', 
        'Emperor+Star': 'Hierophant', 'Emperor+Moon': 'Lovers', 'Emperor+Sun': 'Temperance', 'Emperor+Judgement': 'Sun', 'Emperor+Aeon': 'Fortune', 

        // --- Hierophant (5) + ... ---
        'Hierophant+Lovers': 'Magician', 'Hierophant+Chariot': 'Justice', 'Hierophant+Justice': 'Fool', 'Hierophant+Hermit': 'Chariot', 
        'Hierophant+Fortune': 'Moon', 'Hierophant+Strength': 'Fortune', 'Hierophant+Hanged': 'Strength', 'Hierophant+Death': 'Fortune', 
        'Hierophant+Temperance': 'Hermit', 'Hierophant+Devil': 'Priestess', 'Hierophant+Tower': 'Temperance', 'Hierophant+Star': 'Moon', 
        'Hierophant+Moon': 'Magician', 'Hierophant+Sun': 'Tower', 'Hierophant+Judgement': 'Emperor', 'Hierophant+Aeon': 'Sun', 

        // --- Lovers (6) + ... ---
        'Lovers+Chariot': 'Priestess', 'Lovers+Justice': 'Empress', 'Lovers+Hermit': 'Fool', 'Lovers+Fortune': 'Temperance', 
        'Lovers+Strength': 'Hermit', 'Lovers+Hanged': 'Justice', 'Lovers+Death': 'Hanged', 'Lovers+Temperance': 'Death', 
        'Lovers+Devil': 'Star', 'Lovers+Tower': 'Sun', 'Lovers+Star': 'Death', 'Lovers+Moon': 'Empress', 'Lovers+Sun': 'Devil', 
        'Lovers+Judgement': 'Moon', 'Lovers+Aeon': 'Tower', 

        // --- Chariot (7) + ... ---
        'Chariot+Justice': 'Magician', 'Chariot+Hermit': 'Lovers', 'Chariot+Fortune': 'Priestess', 'Chariot+Strength': 'Temperance', 
        'Chariot+Hanged': 'Strength', 'Chariot+Death': 'Hierophant', 'Chariot+Temperance': 'Hermit', 'Chariot+Devil': 'Hanged', 
        'Chariot+Tower': 'Star', 'Chariot+Star': 'Fortune', 'Chariot+Moon': 'Temperance', 'Chariot+Sun': 'Strength', 
        'Chariot+Judgement': 'Empress', 'Chariot+Aeon': 'Hermit', 

        // --- Justice (8) + ... ---
        'Justice+Hermit': 'Magician', 'Justice+Fortune': 'Hanged', 'Justice+Strength': 'Star', 'Justice+Hanged': 'Priestess', 
        'Justice+Death': 'Hermit', 'Justice+Temperance': 'Moon', 'Justice+Devil': 'Temperance', 'Justice+Tower': 'Sun', 
        'Justice+Star': 'Hermit', 'Justice+Moon': 'Temperance', 'Justice+Sun': 'Magician', 'Justice+Judgement': 'Fool', 'Justice+Aeon': 'Judgement', 

        // --- Hermit (9) + ... ---
        'Hermit+Fortune': 'Justice', 'Hermit+Strength': 'Empress', 'Hermit+Hanged': 'Temperance', 'Hermit+Death': 'Chariot', 
        'Hermit+Temperance': 'Magician', 'Hermit+Devil': 'Strength', 'Hermit+Tower': 'Empress', 'Hermit+Star': 'Fool', 
        'Hermit+Moon': 'Hierophant', 'Hermit+Sun': 'Star', 'Hermit+Judgement': 'Temperance', 'Hermit+Aeon': 'Devil', 

        // --- Fortune (10) + ... ---
        'Fortune+Strength': 'Sun', 'Fortune+Hanged': 'Magician', 'Fortune+Death': 'Star', 'Fortune+Temperance': 'Tower', 
        'Fortune+Devil': 'Empress', 'Fortune+Tower': 'Aeon', 'Fortune+Star': 'Magician', 'Fortune+Moon': 'Death', 
        'Fortune+Sun': 'Judgement', 'Fortune+Judgement': 'Sun', 'Fortune+Aeon': 'Moon', 

        // --- Strength (11) + ... ---
        'Strength+Hanged': 'Chariot', 'Strength+Death': 'Empress', 'Strength+Temperance': 'Moon', 'Strength+Devil': 'Lovers', 
        'Strength+Tower': 'Hanged', 'Strength+Star': 'Priestess', 'Strength+Moon': 'Devil', 'Strength+Sun': 'Lovers', 
        'Strength+Judgement': 'Devil', 'Strength+Aeon': 'Fool', 

        // --- Hanged (12) + ... ---
        'Hanged+Death': 'Strength', 'Hanged+Temperance': 'Hierophant', 'Hanged+Devil': 'Priestess', 'Hanged+Tower': 'Death', 
        'Hanged+Star': 'Empress', 'Hanged+Moon': 'Chariot', 'Hanged+Sun': 'Aeon', 'Hanged+Judgement': 'Tower', 'Hanged+Aeon': 'Death', 

        // --- Death (13) + ... ---
        'Death+Temperance': 'Devil', 'Death+Devil': 'Tower', 'Death+Tower': 'Aeon', 'Death+Star': 'Sun', 'Death+Moon': 'Hanged', 
        'Death+Sun': 'Justice', 'Death+Judgement': 'Devil', 

        // --- Temperance (14) + ... ---
        'Temperance+Devil': 'Fool', 'Temperance+Tower': 'Devil', 'Temperance+Star': 'Fortune', 'Temperance+Moon': 'Priestess',
        'Temperance+Sun': 'Chariot', 'Temperance+Judgement': 'Empress', 'Temperance+Aeon': 'Justice', 

        // --- Devil (15) + ... ---
        'Devil+Tower': 'Judgement', 'Devil+Star': 'Justice', 'Devil+Moon': 'Fool', 'Devil+Sun': 'Death', 
        'Devil+Judgement': 'Death', 'Devil+Aeon': 'Star', 

        // --- Tower (16) + ... ---
        'Tower+Star': 'Judgement', 'Tower+Moon': 'Fortune', 'Tower+Sun': 'Hierophant', 'Tower+Judgement': 'Aeon', 'Tower+Aeon': 'Sun', 

        // --- Star (17) + ... ---
        'Star+Moon': 'Sun', 'Star+Sun': 'Justice', 'Star+Judgement': 'Tower', 'Star+Aeon': 'Judgement', 

        // --- Moon (18) + ... ---
        'Moon+Sun': 'Tower', 'Moon+Judgement': 'Fortune', 'Moon+Aeon': 'Judgement',

        // --- Sun (19) + ... ---
        'Sun+Judgement': 'Aeon', 'Sun+Aeon': 'Empress', 

        // --- Judgement (20) + ... ---
        'Judgement+Aeon': 'Fool' 
    };

    const specialFusionNames = [
        'Thanatos', 'Susano-o', 'Messiah', 'Orpheus Telos', 'Alice', 
        'Black Frost', 'Shiva', 'Masakado', 'Beelzebub', 'Kohryu', 'Lucifer', 'Metatron'
    ];

    const specificFusions = [
        { result: 'Thanatos', parents: ['Alice', 'Pale Rider', 'Loa', 'Samael', 'Mot', 'Ghoul'] },
        { result: 'Susano-o', parents: ['Orpheus', 'Legion', 'Ose', 'Black Frost', 'Decarabia', 'Loki'] },
        { result: 'Messiah', parents: ['Orpheus', 'Thanatos'] }
    ];

    // =========================================================
    // --- SISTEMA DE WARM-UP COM RETRY E BACKOFF ---
    // =========================================================

    const API_URL = 'https://persona-compendium.onrender.com/personas/';
    const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent(API_URL)}`;
    const CACHE_KEY = 'p3r_compendium_data';
    const CACHE_TIMESTAMP_KEY = 'p3r_compendium_timestamp';

    // Tempo máximo de cache: 24 horas (em ms)
    const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

    // Mensagens de espera para a Dark Hour — aparecem enquanto o servidor acorda
    const warmupMessages = [
        'INICIANDO A DARK HOUR...',
        'ACORDANDO O SERVIDOR...',
        'O VELVET ROOM ESTÁ CARREGANDO...',
        'AGUARDE, IGOR ESTÁ PREPARANDO TUDO...',
        'COMPILANDO O COMPÊNDIO DE PERSONAS...',
        'QUASE LÁ...',
    ];

    let warmupMsgIndex = 0;
    let warmupMsgInterval = null;

    function startWarmupMessages() {
        setLoaderMessage(warmupMessages[0]);
        warmupMsgInterval = setInterval(() => {
            warmupMsgIndex = (warmupMsgIndex + 1) % warmupMessages.length;
            setLoaderMessage(warmupMessages[warmupMsgIndex]);
        }, 3500);
    }

    function stopWarmupMessages() {
        if (warmupMsgInterval) {
            clearInterval(warmupMsgInterval);
            warmupMsgInterval = null;
        }
    }

    /**
     * Tenta fazer fetch com timeout configurável.
     * Retorna a Response ou lança erro se demorar mais que `timeoutMs`.
     */
    async function fetchWithTimeout(url, timeoutMs = 15000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            return response;
        } catch (err) {
            clearTimeout(timeoutId);
            throw err;
        }
    }

    /**
     * Estratégia principal de warm-up:
     * 1. Faz um ping rápido (HEAD ou GET) para acordar o servidor no Render.
     * 2. Aguarda com mensagens informativas.
     * 3. Faz o fetch real dos dados com retry + backoff exponencial.
     *
     * @param {number} maxRetries - Número máximo de tentativas após o warm-up
     * @param {number} baseDelayMs - Delay inicial entre tentativas (dobra a cada retry)
     */
    async function fetchWithWarmupAndRetry(maxRetries = 4, baseDelayMs = 4000) {
        // Passo 1: Ping de warm-up — não precisamos do resultado, só queremos acordar o servidor
        setLoaderMessage('ENVIANDO SINAL PARA A DARK HOUR...');
        try {
            // Usamos o proxy também no ping para evitar CORS
            await fetchWithTimeout(PROXY_URL, 8000);
        } catch {
            // O ping pode falhar (timeout/CORS no ping) — não é fatal, continuamos
            console.warn('[WarmUp] Ping inicial falhou ou demorou demais, tentando o fetch completo...');
        }

        // Passo 2: Tentativas reais com backoff
        let lastError = null;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                setLoaderMessage(attempt === 1
                    ? 'CARREGANDO DADOS DO COMPÊNDIO...'
                    : `TENTATIVA ${attempt}/${maxRetries} — SERVIDOR AINDA ACORDANDO...`
                );

                const response = await fetchWithTimeout(PROXY_URL, 20000);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const apiData = await response.json();

                const processedData = apiData.map(p => ({
                    ...p,
                    special: specialFusionNames.includes(p.name)
                }));

                // Salva no cache com timestamp
                localStorage.setItem(CACHE_KEY, JSON.stringify(processedData));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

                return processedData;

            } catch (err) {
                lastError = err;
                console.warn(`[WarmUp] Tentativa ${attempt} falhou:`, err.message);

                if (attempt < maxRetries) {
                    // Backoff exponencial: 4s → 8s → 16s → ...
                    const delay = baseDelayMs * Math.pow(2, attempt - 1);
                    setLoaderMessage(`SERVIDOR DORMINDO... PRÓXIMA TENTATIVA EM ${Math.round(delay / 1000)}s`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        throw lastError || new Error('Todas as tentativas falharam.');
    }

    /**
     * Verifica se o cache local ainda é válido (menos de 24h).
     */
    function isCacheValid() {
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        if (!timestamp) return false;
        return (Date.now() - parseInt(timestamp, 10)) < CACHE_MAX_AGE_MS;
    }

    // --- CARREGAMENTO PRINCIPAL ---
    async function loadPersonas() {
        // Usa cache se ainda for válido
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData && isCacheValid()) {
            try {
                personas = JSON.parse(cachedData);
                setupAllAutocomplete();
                hideLoader();

                // Revalida em background sem bloquear o utilizador
                revalidateCacheInBackground();
                return;
            } catch {
                // Cache corrompido — limpa e faz fetch normal
                localStorage.removeItem(CACHE_KEY);
                localStorage.removeItem(CACHE_TIMESTAMP_KEY);
            }
        }

        // Sem cache válido: faz warm-up + fetch com retry
        startWarmupMessages();
        try {
            personas = await fetchWithWarmupAndRetry();
            setupAllAutocomplete();
            setLoaderMessage('COMPÊNDIO CARREGADO!');
            setTimeout(hideLoader, 800);
        } catch (error) {
            console.error('[LoadPersonas] Erro fatal:', error);
            stopWarmupMessages();
            setLoaderMessage('ERRO AO CARREGAR — TENTE RECARREGAR A PÁGINA', true);

            // Último recurso: se tiver cache antigo (mesmo expirado), usa-o
            if (cachedData) {
                try {
                    personas = JSON.parse(cachedData);
                    setupAllAutocomplete();
                    setLoaderMessage('USANDO DADOS DO CACHE (PODEM ESTAR DESATUALIZADOS)', true);
                    setTimeout(hideLoader, 2000);
                    return;
                } catch { /* cache inválido mesmo */ }
            }

            // Sem fallback disponível — mostra alerta
            alert(
                'Não foi possível acordar o servidor após várias tentativas.\n\n' +
                'Dica: Abra a URL abaixo numa aba para acordar a API manualmente e depois recarregue esta página:\n' +
                'https://persona-compendium.onrender.com/personas/'
            );
        } finally {
            stopWarmupMessages();
        }
    }

    /**
     * Revalida o cache silenciosamente em background.
     * Só atualiza o localStorage — não afeta o utilizador.
     */
    async function revalidateCacheInBackground() {
        try {
            const response = await fetchWithTimeout(PROXY_URL, 25000);
            if (!response.ok) return;
            const apiData = await response.json();
            const processedData = apiData.map(p => ({
                ...p,
                special: specialFusionNames.includes(p.name)
            }));
            localStorage.setItem(CACHE_KEY, JSON.stringify(processedData));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
            console.log('[Cache] Revalidado em background com sucesso.');
        } catch (err) {
            console.warn('[Cache] Revalidação em background falhou (não crítico):', err.message);
        }
    }

    // =========================================================

    function setupAllAutocomplete() {
        setupAutocomplete(searchInput1, resultsContainer1, 'persona1');
        setupAutocomplete(searchInput2, resultsContainer2, 'persona2');
        setupAutocomplete(searchInputTarget, resultsContainerTarget, 'target');
    }

    // --- LÓGICA DE AUTOCOMPLETE ---
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

    // --- CÁLCULO DE FUSÃO NORMAL ---
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
            span.addEventListener('click', () => {
                populateModal(result);
                modal.classList.add('open');
            });
            
            resultText.appendChild(span);
            resultText.appendChild(document.createTextNode(` (Arcana: ${result.arcana}, Lvl: ${result.level})`));
        } else {
            resultText.textContent = "Resultado impossível com essas Personas.";
        }
    }

    function calculateFusion(p1, p2) {
        const parentNames = [p1.name, p2.name].sort();
        const specific = specificFusions.find(r => 
            r.parents.length === 2 && r.parents[0] === parentNames[0] && r.parents[1] === parentNames[1]
        );
        if (specific) return personas.find(p => p.name === specific.result);

        const resultArcana = getResultArcana(p1.arcana, p2.arcana);
        if (!resultArcana) return null;

        const avgLevel = Math.floor((p1.level + p2.level) / 2) + 1;
        
        const candidates = personas
            .filter(p => p.arcana === resultArcana && !p.special && p.dlc === 0)
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

    // --- CÁLCULO REVERSO ---
    function handleReverseCalculation() {
        const target = selectedPersonas.target;
        if (!target) return;

        reverseRecipesList.innerHTML = '<li>Calculando a Matrix da Dark Hour...</li>';
        
        if (target.special) {
            const recipe = specificFusions.find(r => r.result === target.name);
            reverseRecipesList.innerHTML = '';
            if (recipe) {
                const li = document.createElement('li');
                li.textContent = `Fusão Especial (Avançada): Requer ${recipe.parents.join(' + ')}`;
                reverseRecipesList.appendChild(li);
            } else {
                reverseRecipesList.innerHTML = '<li>Receita avançada não documentada para esta simulação.</li>';
            }
            return;
        }

        const recipes = [];
        for (let i = 0; i < personas.length; i++) {
            for (let j = i + 1; j < personas.length; j++) {
                const p1 = personas[i];
                const p2 = personas[j];
                
                if (p1.special || p2.special || p1.dlc === 1 || p2.dlc === 1) continue; 

                const res = calculateFusion(p1, p2);
                if (res && res.name === target.name) {
                    recipes.push(`${p1.name} (Lvl ${p1.level}) + ${p2.name} (Lvl ${p2.level})`);
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
                li.textContent = r;
                reverseRecipesList.appendChild(li);
            });
        }
    }

    // --- PREENCHIMENTO DO MODAL COMPENDIUM ---
    function populateModal(persona) {
        document.getElementById('modal-persona-name').textContent = persona.name;
        
        let levelBadge = document.getElementById('modal-persona-level');
        if (levelBadge) levelBadge.textContent = `Lvl ${persona.level}`;
        
        const imgElement = document.getElementById('modal-persona-image');
        if (imgElement) imgElement.style.display = 'none';

        let descElement = document.getElementById('modal-persona-desc');
        if (descElement) descElement.textContent = persona.description || "Nenhuma descrição disponível nos arquivos do Compêndio.";

        const statsList = document.querySelector('#modal-stats ul');
        statsList.innerHTML = `
            <li>STRENGTH: <span>${persona.strength}</span></li>
            <li>MAGIC: <span>${persona.magic}</span></li>
            <li>ENDURANCE: <span>${persona.endurance}</span></li>
            <li>AGILITY: <span>${persona.agility}</span></li>
            <li>LUCK: <span>${persona.luck}</span></li>
        `;

        const elemList = document.querySelector('#modal-elements ul');
        elemList.innerHTML = '';
        
        const affinities = [
            { key: 'weak', label: 'Weak', color: '#ff5555' },
            { key: 'resists', label: 'Resist', color: '#55ff55' },
            { key: 'nullifies', label: 'Null', color: '#aaaaaa' },
            { key: 'reflects', label: 'Repel', color: '#55ffff' },
            { key: 'absorbs', label: 'Drain', color: '#ff55ff' }
        ];

        let hasAffinities = false;
        affinities.forEach(aff => {
            if (persona[aff.key] && persona[aff.key].length > 0) {
                hasAffinities = true;
                elemList.innerHTML += `<li>${aff.label}: <span style="color:${aff.color}; font-weight: bold;">${persona[aff.key].join(', ')}</span></li>`;
            }
        });

        if (!hasAffinities) {
            elemList.innerHTML = '<li>Nenhuma fraqueza ou resistência marcante.</li>';
        }
    }

    // --- EVENTOS ---
    closeModalBtn.addEventListener('click', () => modal.classList.remove('open'));
    window.addEventListener('click', (e) => { if (e.target == modal) modal.classList.remove('open'); });
    calculateBtn.addEventListener('click', handleCalculation);
    calculateReverseBtn.addEventListener('click', handleReverseCalculation);
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