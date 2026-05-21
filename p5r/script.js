document.addEventListener('DOMContentLoaded', () => {

            // =========================================================
            // LOADER COM BARRA DINÂMICA
            // =========================================================
            const loader = document.getElementById('p5-loader');
            const loaderText = document.querySelector('.loader-text');
            const loaderBar = document.getElementById('loader-bar');
            const loaderPercent = document.getElementById('loader-percent');

            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 95) progress = 95; // Trava no 95% enquanto a API não responde
                if (loaderBar) loaderBar.style.width = `${progress}%`;
                if (loaderPercent) loaderPercent.textContent = `${Math.floor(progress)}%`;
            }, 200);

            function hideLoader() {
                if (loader) {
                    clearInterval(progressInterval);
                    if (loaderBar) loaderBar.style.width = '100%';
                    if (loaderPercent) loaderPercent.textContent = '100%';
                    
                    setTimeout(() => {
                        loader.classList.add('slide-out');
                        setTimeout(() => { loader.style.display = 'none'; }, 600);
                    }, 400);
                }
            }

            function setLoaderMessage(msg, isError = false) {
                if (loaderText) {
                    loaderText.textContent = msg;
                    loaderText.style.color = isError ? '#ff4444' : 'var(--p5-white)';
                }
            }

        // =========================================================
        // ELEMENTOS DOM
        // =========================================================
        const searchInput1          = document.getElementById('search-input-1');
        const resultsContainer1     = document.getElementById('results-container-1');
        const searchInput2          = document.getElementById('search-input-2');
        const resultsContainer2     = document.getElementById('results-container-2');
        const calculateBtn          = document.getElementById('calculateBtn');
        const resultText            = document.getElementById('result-text');

        const reverseSearchInput        = document.getElementById('reverse-search-input');
        const reverseResultsContainer   = document.getElementById('reverse-results-container');
        const reverseCalculateBtn       = document.getElementById('reverse-calculate-btn');
        const reverseRecipeList         = document.getElementById('reverse-recipes-list');
        const reverseNoResults          = document.getElementById('reverse-no-results');

    // Modal de detalhe de persona (O único modal que sobrou)
    const modal         = document.getElementById('persona-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    let selectedPersonas = { persona1: null, persona2: null, target: null };
    let personas = [];

    // =========================================================
    // TABELA DE ARCANAS E FUSÃO — P5 Royal
    // =========================================================
    const arcanaOrder = {
        'Fool': 0, 'Magician': 1, 'Priestess': 2, 'Empress': 3, 'Emperor': 4,
        'Hierophant': 5, 'Lovers': 6, 'Chariot': 7, 'Justice': 8, 'Hermit': 9,
        'Fortune': 10, 'Strength': 11, 'Hanged': 12, 'Death': 13, 'Temperance': 14,
        'Devil': 15, 'Tower': 16, 'Star': 17, 'Moon': 18, 'Sun': 19,
        'Judgement': 20, 'Faith': 21, 'Councillor': 22, 'World': 23
    };

    const fusionChart = {
        // Mesma Arcana
        'Fool+Fool': 'Fool', 'Magician+Magician': 'Magician', 'Priestess+Priestess': 'Priestess',
        'Empress+Empress': 'Empress', 'Emperor+Emperor': 'Emperor', 'Hierophant+Hierophant': 'Hierophant',
        'Lovers+Lovers': 'Lovers', 'Chariot+Chariot': 'Chariot', 'Justice+Justice': 'Justice',
        'Hermit+Hermit': 'Hermit', 'Fortune+Fortune': 'Fortune', 'Strength+Strength': 'Strength',
        'Hanged+Hanged': 'Hanged', 'Death+Death': 'Death', 'Temperance+Temperance': 'Temperance',
        'Devil+Devil': 'Devil', 'Tower+Tower': 'Tower', 'Star+Star': 'Star', 'Moon+Moon': 'Moon',
        'Sun+Sun': 'Sun', 'Judgement+Judgement': 'Judgement', 'Faith+Faith': 'Faith',
        'Councillor+Councillor': 'Councillor',
        // Fool (0)
        'Fool+Magician': 'Death', 'Fool+Priestess': 'Moon', 'Fool+Empress': 'Hanged',
        'Fool+Emperor': 'Temperance', 'Fool+Hierophant': 'Hermit', 'Fool+Lovers': 'Chariot',
        'Fool+Chariot': 'Moon', 'Fool+Justice': 'Star', 'Fool+Hermit': 'Priestess',
        'Fool+Fortune': 'Justice', 'Fool+Strength': 'Death', 'Fool+Hanged': 'Tower',
        'Fool+Death': 'Strength', 'Fool+Temperance': 'Hierophant', 'Fool+Devil': 'Strength',
        'Fool+Tower': 'Empress', 'Fool+Star': 'Magician', 'Fool+Moon': 'Justice',
        'Fool+Sun': 'Judgement', 'Fool+Judgement': 'Sun', 'Fool+Faith': 'Priestess',
        'Fool+Councillor': 'Hierophant',
        // Magician (1)
        'Magician+Priestess': 'Justice', 'Magician+Empress': 'Death', 'Magician+Emperor': 'Faith',
        'Magician+Hierophant': 'Death', 'Magician+Lovers': 'Devil', 'Magician+Chariot': 'Priestess',
        'Magician+Justice': 'Emperor', 'Magician+Hermit': 'Lovers', 'Magician+Fortune': 'Faith',
        'Magician+Strength': 'Devil', 'Magician+Hanged': 'Empress', 'Magician+Death': 'Hermit',
        'Magician+Temperance': 'Chariot', 'Magician+Devil': 'Hierophant', 'Magician+Tower': 'Temperance',
        'Magician+Star': 'Priestess', 'Magician+Moon': 'Lovers', 'Magician+Sun': 'Hierophant',
        'Magician+Judgement': 'Strength', 'Magician+Faith': 'Tower', 'Magician+Councillor': 'Priestess',
        // Priestess (2)
        'Priestess+Empress': 'Emperor', 'Priestess+Emperor': 'Empress', 'Priestess+Hierophant': 'Fortune',
        'Priestess+Lovers': 'Star', 'Priestess+Chariot': 'Hierophant', 'Priestess+Justice': 'Star',
        'Priestess+Hermit': 'Temperance', 'Priestess+Fortune': 'Lovers', 'Priestess+Strength': 'Chariot',
        'Priestess+Hanged': 'Death', 'Priestess+Death': 'Magician', 'Priestess+Temperance': 'Moon',
        'Priestess+Devil': 'Faith', 'Priestess+Tower': 'Hanged', 'Priestess+Star': 'Moon',
        'Priestess+Moon': 'Hierophant', 'Priestess+Sun': 'Hermit', 'Priestess+Judgement': 'Justice',
        'Priestess+Faith': 'Hanged',
        // Empress (3)
        'Empress+Emperor': 'Justice', 'Empress+Hierophant': 'Fortune', 'Empress+Lovers': 'Judgement',
        'Empress+Chariot': 'Star', 'Empress+Justice': 'Star', 'Empress+Hermit': 'Strength',
        'Empress+Fortune': 'Hermit', 'Empress+Strength': 'Hanged', 'Empress+Hanged': 'Priestess',
        'Empress+Death': 'Fool', 'Empress+Temperance': 'Faith', 'Empress+Devil': 'Hierophant',
        'Empress+Tower': 'Faith', 'Empress+Star': 'Justice', 'Empress+Moon': 'Sun',
        'Empress+Sun': 'Moon', 'Empress+Judgement': 'Priestess', 'Empress+Faith': 'Magician',
        // Emperor (4)
        'Emperor+Hierophant': 'Fortune', 'Emperor+Lovers': 'Faith', 'Emperor+Chariot': 'Faith',
        'Emperor+Justice': 'Chariot', 'Emperor+Hermit': 'Hierophant', 'Emperor+Fortune': 'Sun',
        'Emperor+Strength': 'Sun', 'Emperor+Hanged': 'Devil', 'Emperor+Death': 'Hermit',
        'Emperor+Temperance': 'Devil', 'Emperor+Devil': 'Justice', 'Emperor+Tower': 'Star',
        'Emperor+Star': 'Lovers', 'Emperor+Moon': 'Tower', 'Emperor+Sun': 'Judgement',
        'Emperor+Judgement': 'Magician', 'Emperor+Faith': 'Chariot', 'Emperor+Councillor': 'Lovers',
        // Hierophant (5)
        'Hierophant+Lovers': 'Strength', 'Hierophant+Chariot': 'Star', 'Hierophant+Justice': 'Hanged',
        'Hierophant+Hermit': 'Councillor', 'Hierophant+Fortune': 'Justice', 'Hierophant+Strength': 'Fool',
        'Hierophant+Hanged': 'Sun', 'Hierophant+Death': 'Councillor', 'Hierophant+Temperance': 'Strength',
        'Hierophant+Devil': 'Moon', 'Hierophant+Tower': 'Judgement', 'Hierophant+Star': 'Tower',
        'Hierophant+Moon': 'Death', 'Hierophant+Sun': 'Lovers', 'Hierophant+Faith': 'Justice',
        'Hierophant+Councillor': 'Chariot',
        // Lovers (6)
        'Lovers+Chariot': 'Temperance', 'Lovers+Justice': 'Judgement', 'Lovers+Hermit': 'Chariot',
        'Lovers+Fortune': 'Priestess', 'Lovers+Strength': 'Temperance', 'Lovers+Hanged': 'Death',
        'Lovers+Death': 'Councillor', 'Lovers+Temperance': 'Strength', 'Lovers+Devil': 'Moon',
        'Lovers+Tower': 'Fool', 'Lovers+Star': 'Faith', 'Lovers+Moon': 'Devil',
        'Lovers+Sun': 'Strength', 'Lovers+Faith': 'Judgement', 'Lovers+Councillor': 'Emperor',
        // Chariot (7)
        'Chariot+Justice': 'Moon', 'Chariot+Hermit': 'Councillor', 'Chariot+Fortune': 'Moon',
        'Chariot+Strength': 'Devil', 'Chariot+Hanged': 'Fool', 'Chariot+Death': 'Devil',
        'Chariot+Temperance': 'Strength', 'Chariot+Devil': 'Tower', 'Chariot+Tower': 'Faith',
        'Chariot+Star': 'Moon', 'Chariot+Moon': 'Fortune', 'Chariot+Sun': 'Lovers',
        'Chariot+Judgement': 'Lovers', 'Chariot+Faith': 'Devil',
        // Justice (8)
        'Justice+Hermit': 'Magician', 'Justice+Fortune': 'Sun', 'Justice+Strength': 'Councillor',
        'Justice+Hanged': 'Lovers', 'Justice+Death': 'Fool', 'Justice+Temperance': 'Priestess',
        'Justice+Devil': 'Fool', 'Justice+Tower': 'Sun', 'Justice+Star': 'Emperor',
        'Justice+Moon': 'Devil', 'Justice+Sun': 'Hanged', 'Justice+Judgement': 'Hanged',
        'Justice+Faith': 'Star', 'Justice+Councillor': 'Star',
        // Hermit (9)
        'Hermit+Fortune': 'Star', 'Hermit+Strength': 'Faith', 'Hermit+Hanged': 'Star',
        'Hermit+Death': 'Star', 'Hermit+Temperance': 'Strength', 'Hermit+Devil': 'Priestess',
        'Hermit+Tower': 'Judgement', 'Hermit+Star': 'Priestess', 'Hermit+Moon': 'Devil',
        'Hermit+Sun': 'Devil', 'Hermit+Judgement': 'Emperor', 'Hermit+Faith': 'Councillor',
        // Fortune (10)
        'Fortune+Strength': 'Faith', 'Fortune+Hanged': 'Priestess', 'Fortune+Death': 'Emperor',
        'Fortune+Temperance': 'Star', 'Fortune+Devil': 'Hanged', 'Fortune+Tower': 'Sun',
        'Fortune+Star': 'Sun', 'Fortune+Moon': 'Judgement', 'Fortune+Sun': 'Star',
        'Fortune+Judgement': 'Tower', 'Fortune+Faith': 'Sun', 'Fortune+Councillor': 'Star',
        // Strength (11)
        'Strength+Hanged': 'Temperance', 'Strength+Death': 'Hierophant', 'Strength+Temperance': 'Chariot',
        'Strength+Devil': 'Faith', 'Strength+Tower': 'Hanged', 'Strength+Star': 'Moon',
        'Strength+Moon': 'Magician', 'Strength+Sun': 'Star', 'Strength+Judgement': 'Fool',
        'Strength+Faith': 'Chariot', 'Strength+Councillor': 'Faith',
        // Hanged (12)
        'Hanged+Death': 'Moon', 'Hanged+Temperance': 'Death', 'Hanged+Devil': 'Hermit',
        'Hanged+Tower': 'Sun', 'Hanged+Star': 'Councillor', 'Hanged+Moon': 'Hierophant',
        'Hanged+Sun': 'Star', 'Hanged+Judgement': 'Star', 'Hanged+Faith': 'Councillor',
        // Death (13)
        'Death+Temperance': 'Hanged', 'Death+Devil': 'Moon', 'Death+Tower': 'Sun',
        'Death+Star': 'Councillor', 'Death+Moon': 'Hermit', 'Death+Sun': 'Fool',
        'Death+Judgement': 'Hanged', 'Death+Faith': 'Strength', 'Death+Councillor': 'Hermit',
        // Temperance (14)
        'Temperance+Devil': 'Fool', 'Temperance+Tower': 'Fool', 'Temperance+Star': 'Sun',
        'Temperance+Moon': 'Councillor', 'Temperance+Sun': 'Magician', 'Temperance+Judgement': 'Fortune',
        'Temperance+Faith': 'Moon', 'Temperance+Councillor': 'Chariot',
        // Devil (15)
        'Devil+Tower': 'Magician', 'Devil+Star': 'Hermit', 'Devil+Moon': 'Chariot',
        'Devil+Sun': 'Hermit', 'Devil+Judgement': 'Death', 'Devil+Faith': 'Fortune',
        'Devil+Councillor': 'Death',
        // Tower (16)
        'Tower+Star': 'Councillor', 'Tower+Moon': 'Hermit', 'Tower+Sun': 'Emperor',
        'Tower+Judgement': 'Sun', 'Tower+Faith': 'Hanged',
        // Star (17)
        'Star+Moon': 'Temperance', 'Star+Sun': 'Judgement', 'Star+Judgement': 'Fortune',
        'Star+Faith': 'Moon', 'Star+Councillor': 'Fortune',
        // Moon (18)
        'Moon+Sun': 'Empress', 'Moon+Judgement': 'Fool', 'Moon+Faith': 'Sun', 'Moon+Councillor': 'Sun',
        // Sun (19)
        'Sun+Judgement': 'Fortune', 'Sun+Faith': 'Death', 'Sun+Councillor': 'Fortune',
        // Judgement (20)
        'Judgement+Faith': 'Fortune', 'Judgement+Councillor': 'Devil',
        // Faith (21)
        'Faith+Councillor': 'Priestess'
    };

    const specialFusionNames = [
        'Alice', 'Ardha', 'Asura', 'Black Frost', 'Bugs', 'Chi You', 'Flauros',
        'Kohryu', 'Lucifer', 'Metatron', 'Michael', 'Neko Shogun', 'Ongyo-Ki',
        'Satanael', 'Seth', 'Shiva', 'Sraosha', 'Trumpeter', 'Yoshitsune'
    ];

    const specificFusions = [
        { result: 'Alice',       parents: ['Nebiros', 'Belial'] },
        { result: 'Ardha',       parents: ['Parvati', 'Shiva'] },
        { result: 'Asura',       parents: ['Zouchouten', 'Jikokuten', 'Koumokuten', 'Bishamonten'] },
        { result: 'Black Frost', parents: ["Jack-o'-Lantern", 'Jack Frost', 'King Frost'] },
        { result: 'Bugs',        parents: ['Pixie', 'Pisaca', 'Hariti'] },
        { result: 'Chi You',     parents: ['Hecatoncheires', 'White Rider', 'Thor', 'Yoshitsune', 'Cu Chulainn'] },
        { result: 'Flauros',     parents: ['Berith', 'Andras', 'Eligor'] },
        { result: 'Kohryu',      parents: ['Genbu', 'Seiryu', 'Suzaku', 'Byakko'] },
        { result: 'Lucifer',     parents: ['Anubis', 'Ananta', 'Trumpeter', 'Michael', 'Metatron', 'Satan'] },
        { result: 'Metatron',    parents: ['Principality', 'Power', 'Dominion', 'Melchizedek', 'Sandalphon', 'Michael'] },
        { result: 'Michael',     parents: ['Uriel', 'Raphael', 'Gabriel'] },
        { result: 'Neko Shogun', parents: ['Kodama', 'Sudama', 'Anzu'] },
        { result: 'Ongyo-Ki',    parents: ['Kin-Ki', 'Sui-Ki', 'Fuu-Ki'] },
        { result: 'Satanael',    parents: ['Arsene', 'Anzu', 'Ishtar', 'Satan', 'Lucifer', 'Michael'] },
        { result: 'Seth',        parents: ['Isis', 'Thoth', 'Anubis', 'Horus'] },
        { result: 'Shiva',       parents: ['Barong', 'Rangda'] },
        { result: 'Sraosha',     parents: ['Mithra', 'Mithras', 'Melchizedek', 'Lilith', 'Gabriel'] },
        { result: 'Trumpeter',   parents: ['White Rider', 'Red Rider', 'Black Rider', 'Pale Rider'] },
        { result: 'Yoshitsune',  parents: ['Shiki-Ouji', 'Arahabaki', 'Okuninushi', 'Yatagarasu', 'Futsunushi'] }
    ];

        const specialDlcUpgrades = {
        'Izanagi': 'Izanagi Picaro', 'Izanagi-no-Okami': 'Izanagi-no-Okami Picaro', 
        'Orpheus': 'Orpheus Picaro', 'Ariadne': 'Ariadne Picaro', 'Asterius': 'Asterius Picaro', 
        'Thanatos': 'Thanatos Picaro', 'Kaguya': 'Kaguya Picaro', 'Magatsu-Izanagi': 'Magatsu-Izanagi Picaro', 
        'Tsukiyomi': 'Tsukiyomi Picaro', 'Messiah': 'Messiah Picaro'
    };

    // --- FUNÇÕES DE CONTROLE DO MODAL ---
    function openModal() { document.getElementById('persona-modal').classList.add('open'); }
    function closeModal() { document.getElementById('persona-modal').classList.remove('open'); }
    function openReverseModal() { document.getElementById('reverse-modal').classList.add('open'); }
    function closeReverseModal() { document.getElementById('reverse-modal').classList.remove('open'); }

    // =========================================================
    // SISTEMA DE API COM WARM-UP, RETRY E CACHE
    // — Acesso directo à API (sem proxy, a API já tem CORS aberto)
    // — Fallback para proxy corsproxy.io se o directo falhar
    // =========================================================
    const API_BASE   = 'https://mpppersona5-api.onrender.com';
    const API_URL    = `${API_BASE}/personas/`;
    const PROXY_URL  = `https://corsproxy.io/?${encodeURIComponent(API_URL)}`;

    const CACHE_KEY           = 'p5r_compendium_data';
    const CACHE_TIMESTAMP_KEY = 'p5r_compendium_timestamp';
    const CACHE_MAX_AGE_MS    = 24 * 60 * 60 * 1000; // 24h

    const warmupMessages = [
        'CONECTANDO À VELVET ROOM...',
        'ACORDANDO O SERVIDOR...',
        'ISSO PODE LEVAR ALGUNS SEGUNDOS...',
        'IGOR ESTÁ PREPARANDO TUDO...',
        'COMPILANDO O COMPÊNDIO...',
    ];

    let warmupMsgIndex    = 0;
    let warmupMsgInterval = null;

    function startWarmupMessages() {
        setLoaderMessage(warmupMessages[0]);
        warmupMsgInterval = setInterval(() => {
            warmupMsgIndex = (warmupMsgIndex + 1) % warmupMessages.length;
            setLoaderMessage(warmupMessages[warmupMsgIndex]);
        }, 4000);
    }

    function stopWarmupMessages() {
        if (warmupMsgInterval) { clearInterval(warmupMsgInterval); warmupMsgInterval = null; }
    }

    async function fetchWithTimeout(url, timeoutMs = 25000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            return res;
        } catch (err) {
            clearTimeout(id);
            throw err;
        }
    }

    function processApiData(raw) {
        return raw.map(p => ({
            ...p,
            special: specialFusionNames.includes(p.name) || specificFusions.some(sf => sf.result === p.name)
        }));
    }

    /**
     * Tenta a URL directa primeiro; se falhar por CORS ou rede, cai para o proxy.
     * Após acordar o servidor com o ping, faz até maxRetries tentativas com backoff.
     */
    async function fetchWithWarmupAndRetry(maxRetries = 4, baseDelayMs = 4000) {
        // Ping de warm-up (directo, sem proxy — só queremos acordar o Render)
        setLoaderMessage('ENVIANDO SINAL PARA A VELVET ROOM...');
        fetch(API_BASE + '/').catch(() => {}); // fire-and-forget

        // Fontes a tentar, por ordem de preferência
        const sources = [API_URL, PROXY_URL];
        let lastError = null;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            setLoaderMessage(attempt === 1
                ? 'CARREGANDO DADOS DO COMPÊNDIO...'
                : `TENTATIVA ${attempt}/${maxRetries} — SERVIDOR ACORDANDO...`
            );

            for (const url of sources) {
                try {
                    const response = await fetchWithTimeout(url, 28000);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    const raw = await response.json();
                    return processApiData(raw);
                } catch (err) {
                    console.warn(`[API] Falhou (${url === API_URL ? 'directo' : 'proxy'}):`, err.message);
                    lastError = err;
                }
            }

            if (attempt < maxRetries) {
                const delay = baseDelayMs * Math.pow(2, attempt - 1); // 4s → 8s → 16s
                setLoaderMessage(`SERVIDOR DORMINDO... PRÓXIMA TENTATIVA EM ${Math.round(delay / 1000)}s`);
                await new Promise(r => setTimeout(r, delay));
            }
        }

        throw lastError || new Error('Todas as tentativas falharam.');
    }

    function isCacheValid() {
        const ts = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        return ts ? (Date.now() - parseInt(ts, 10)) < CACHE_MAX_AGE_MS : false;
    }

    async function loadPersonas() {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached && isCacheValid()) {
            try {
                personas = JSON.parse(cached);
                setupAllAutocomplete();
                hideLoader();
                revalidateCacheInBackground();
                return;
            } catch {
                localStorage.removeItem(CACHE_KEY);
                localStorage.removeItem(CACHE_TIMESTAMP_KEY);
            }
        }

        startWarmupMessages();
        try {
            personas = await fetchWithWarmupAndRetry();
            localStorage.setItem(CACHE_KEY, JSON.stringify(personas));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
            setupAllAutocomplete();
            setLoaderMessage('COMPÊNDIO CARREGADO!');
            setTimeout(hideLoader, 900);
        } catch (err) {
            console.error('[loadPersonas] Erro fatal:', err);
            stopWarmupMessages();

            // Último recurso: cache expirado mas existente
            if (cached) {
                try {
                    personas = JSON.parse(cached);
                    setupAllAutocomplete();
                    setLoaderMessage('USANDO CACHE ANTIGO — DADOS PODEM ESTAR DESACTUALIZADOS', true);
                    setTimeout(hideLoader, 2500);
                    return;
                } catch { /* cache corrompido */ }
            }

            setLoaderMessage('ERRO AO CARREGAR — RECARREGUE A PÁGINA', true);
            alert(
                'Não foi possível conectar com a API do Persona 5 Royal.\n\n' +
                'Dica: Abra https://mpppersona5-api.onrender.com numa aba para acordar o servidor, depois recarregue esta página.'
            );
        } finally {
            stopWarmupMessages();
        }
    }

    async function revalidateCacheInBackground() {
        for (const url of [API_URL, PROXY_URL]) {
            try {
                const res = await fetchWithTimeout(url, 25000);
                if (!res.ok) continue;
                const raw  = await res.json();
                const data = processApiData(raw);
                localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
                console.log('[Cache] Revalidado em background.');
                return;
            } catch { /* tenta a próxima fonte */ }
        }
        console.warn('[Cache] Revalidação em background falhou (não crítico).');
    }

    // =========================================================
    // AUTOCOMPLETE
    // =========================================================
    function setupAllAutocomplete() {
        setupAutocomplete(searchInput1, resultsContainer1, 'persona1');
        setupAutocomplete(searchInput2, resultsContainer2, 'persona2');
        setupAutocomplete(reverseSearchInput, reverseResultsContainer, 'target');
    }

    function setupAutocomplete(inputElement, resultsElement, personaKey) {
        inputElement.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
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
                    item.textContent = `${persona.name} (Lvl ${persona.level})`;
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

    // --- LÓGICA DE FUSÃO NORMAL ---
    function handleCalculation() {
        const persona1 = selectedPersonas.persona1;
        const persona2 = selectedPersonas.persona2;
    
        if (!persona1 || !persona2) {
            resultText.textContent = "Por favor, selecione dois prisioneiros válidos para a guilhotina.";
            return;
        }
        if (persona1.name === persona2.name) {
            resultText.textContent = "Você não pode executar um prisioneiro consigo mesmo.";
            return;
        }
    
        const result = calculateFusion(persona1, persona2);
    
        if (result) {                
            resultText.innerHTML = '';
            const personaNameSpan = document.createElement('span');
            personaNameSpan.textContent = result.name;
            
            // Efeitos Hover forçados por JS para garantir interatividade visual
            personaNameSpan.style.cursor = 'pointer';
            personaNameSpan.style.textDecoration = 'underline';
            personaNameSpan.style.fontWeight = 'bold';
            personaNameSpan.style.color = '#fff';
            personaNameSpan.style.backgroundColor = '#d60012';
            personaNameSpan.style.padding = '4px 8px';
            personaNameSpan.style.borderRadius = '4px';
            personaNameSpan.style.transition = '0.2s';
            personaNameSpan.onmouseover = () => personaNameSpan.style.backgroundColor = '#9e0013';
            personaNameSpan.onmouseout = () => personaNameSpan.style.backgroundColor = '#d60012';

            personaNameSpan.addEventListener('click', () => {
                populateModal(result);
                document.getElementById('persona-modal').classList.add('open');
            });
            
            const detailsText = document.createTextNode(` (Arcana: ${result.arcana}, Nível: ${result.level})`);

            resultText.appendChild(personaNameSpan);
            resultText.appendChild(detailsText);
        } else {
            resultText.textContent = "Combinação inválida ou execução falhou na Velvet Room.";
        }
    }

    function calculateFusion(p1, p2) {
        // 1. VERIFICA RECEITAS ESPECÍFICAS
        const parentNames = [p1.name, p2.name].sort();
        const specificRecipe = specificFusions.find(recipe => {
            if (recipe.parents.length !== 2) return false;
            const sortedRecipe = [...recipe.parents].sort();
            return sortedRecipe[0] === parentNames[0] && sortedRecipe[1] === parentNames[1];
        });

        if (specificRecipe) {
            return personas.find(p => p.name === specificRecipe.result);
        }

        const isP1Treasure = p1.hasOwnProperty('treasureDemonModifier') || p1.treasure;
        const isP2Treasure = p2.hasOwnProperty('treasureDemonModifier') || p2.treasure;
        
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
                .filter(p => p.arcana === resultArcana && !p.special && !p.treasure && !p.hasOwnProperty('treasureDemonModifier'))
                .sort((a, b) => a.level - b.level); 

            const basePersonaIndex = arcanaRoster.findIndex(p => p.name === basePersona.name);
            if (basePersonaIndex === -1) return null;

            const modifier = treasureDemon.treasureDemonModifier || 0;
            const newIndex = basePersonaIndex + modifier;
            if (newIndex >= 0 && newIndex < arcanaRoster.length) {
                return arcanaRoster[newIndex];
            } else {
                return null;
            }
        }

        // 4. EXECUTA A FUSÃO NORMAL PADRÃO
        const resultArcana = getResultArcana(p1.arcana, p2.arcana);
        if (!resultArcana) return null;

        const sortedPersonas = [...personas].sort((a, b) => a.level - b.level);
        const avgLevel = Math.floor((p1.level + p2.level) / 2) + 1;
        
        // BUG CORRIGIDO: Demônios do Tesouro também não podem nascer de fusões!
        const availablePersonas = sortedPersonas.filter(p => !p.special && !p.treasure && !p.hasOwnProperty('treasureDemonModifier'));

        if (p1.arcana === p2.arcana) {
            const candidates = availablePersonas.filter(p => p.arcana === resultArcana && p.level < avgLevel && p.name !== p1.name && p.name !== p2.name);
            return candidates.length > 0 ? candidates[candidates.length - 1] : null;
        } else {
            const candidates = availablePersonas.filter(p => p.arcana === resultArcana && p.level >= avgLevel);
            return candidates.length > 0 ? candidates[0] : null;
        }
    }
    
    function getResultArcana(arcana1, arcana2) {
        if (arcanaOrder[arcana1] === undefined || arcanaOrder[arcana2] === undefined) return null;
        const sortedArcanas = [arcana1, arcana2].sort((a, b) => arcanaOrder[a] - arcanaOrder[b]);
        const key = sortedArcanas.join('+');
        return fusionChart[key] || null;
    }

    // --- LÓGICA DA CALCULADORA REVERSA ---
    function handleReverseCalculation() {
        const targetPersona = selectedPersonas.target;
        if (!targetPersona) {
            alert("Por favor, selecione um prisioneiro alvo válido da lista.");
            return;
        }
        
        const reverseRecipeList = document.getElementById('reverse-recipes-list');
        const reverseNoResults = document.getElementById('reverse-no-results');

        reverseRecipeList.innerHTML = '';
        reverseNoResults.style.display = 'none';

        // Demônios do tesouro não podem ser criados
        const isTargetTreasure = targetPersona.hasOwnProperty('treasureDemonModifier') || targetPersona.treasure;
        if (isTargetTreasure) {
            reverseNoResults.textContent = "Demônios do Tesouro só podem ser capturados em Mementos ou Palácios. A guilhotina não os produz.";
            reverseNoResults.style.display = 'block';
            return;
        }

        let recipes = [];

        // 1. Receita Específica
        const specialRecipe = specificFusions.find(recipe => recipe.result === targetPersona.name);
        if (specialRecipe) {
            const parent1 = personas.find(p => p.name === specialRecipe.parents[0]);
            const parent2 = personas.find(p => p.name === specialRecipe.parents[1]);
            if (parent1 && parent2) {
                recipes.push({ parent1, parent2 });
            }
        }

        // 2. É uma Persona Picaro de DLC
        const baseDlcName = Object.keys(specialDlcUpgrades).find(key => specialDlcUpgrades[key] === targetPersona.name);
        if (baseDlcName) {
            const parent1 = personas.find(p => p.name === baseDlcName);
            const parent2 = { name: "Qualquer Demônio do Tesouro", arcana: "Treasure", level: "N/A" };
            if (parent1) recipes.push({ parent1, parent2 });
        }

        // 3. Força Bruta para normais
        if (recipes.length === 0 && !targetPersona.special) {
            const fusablePersonas = personas; 
            for (let i = 0; i < fusablePersonas.length; i++) {
                for (let j = i + 1; j < fusablePersonas.length; j++) {
                    const p1 = fusablePersonas[i];
                    const p2 = fusablePersonas[j];

                    // Evita combinar 2 demônios do tesouro
                    const isP1Treasure = p1.hasOwnProperty('treasureDemonModifier') || p1.treasure;
                    const isP2Treasure = p2.hasOwnProperty('treasureDemonModifier') || p2.treasure;
                    if (isP1Treasure && isP2Treasure) continue;

                    const result = calculateFusion(p1, p2);
                    if (result && result.name === targetPersona.name) {
                        recipes.push({ parent1: p1, parent2: p2 });
                    }
                }
            }
        }
        
        displayReverseResults(recipes);
    }
        
    function displayReverseResults(recipes) {
        const reverseRecipeList = document.getElementById('reverse-recipes-list');
        const reverseNoResults = document.getElementById('reverse-no-results');

        if (recipes.length > 0) {
            reverseNoResults.style.display = 'none';
            recipes.forEach(recipe => {
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.justifyContent = 'center';
                li.style.alignItems = 'center';
                li.style.gap = '15px';
                li.style.padding = '10px 0';
                li.style.borderBottom = '1px solid #444';
                li.innerHTML = `
                    <div style="flex: 1; text-align: right;">
                        <div class="recipe-persona" data-name="${recipe.parent1.name}" 
                             style="cursor: pointer; font-weight: bold; text-decoration: underline; color: #fff; transition: 0.2s;"
                             onmouseover="this.style.color='#d60012'" onmouseout="this.style.color='#fff'">
                             ${recipe.parent1.name}
                        </div>
                        <div class="recipe-arcana" style="font-size: 0.85em; color: #888;">${recipe.parent1.arcana} (Lvl ${recipe.parent1.level || 'N/A'})</div>
                    </div>
                    <span class="recipe-plus" style="font-weight: bold; color: #d60012; font-size: 1.5em;">+</span>
                    <div style="flex: 1; text-align: left;">
                        <div class="recipe-persona" data-name="${recipe.parent2.name}" 
                             style="cursor: pointer; font-weight: bold; text-decoration: underline; color: #fff; transition: 0.2s;"
                             onmouseover="this.style.color='#d60012'" onmouseout="this.style.color='#fff'">
                             ${recipe.parent2.name}
                        </div>
                        <div class="recipe-arcana" style="font-size: 0.85em; color: #888;">${recipe.parent2.arcana} (Lvl ${recipe.parent2.level || 'N/A'})</div>
                    </div>
                `;
                reverseRecipeList.appendChild(li);
            });

            // Adiciona evento para abrir o modal de status
            reverseRecipeList.querySelectorAll('.recipe-persona').forEach(el => {
                el.addEventListener('click', e => {
                    const name = e.target.getAttribute('data-name');
                    const persona = personas.find(p => p.name === name);
                    if (persona) { 
                        populateModal(persona); 
                        document.getElementById('persona-modal').classList.add('open'); 
                    }
                });
            });

        } else {
            reverseNoResults.textContent = "Este prisioneiro não pode ser gerado através de uma execução normal de guilhotina.";
            reverseNoResults.style.display = 'block';
        }
    }

    // --- POPULA O MODAL STATUS DA PERSONA ---
    function populateModal(persona) {
        document.getElementById('modal-persona-name').textContent = persona.name;
        
        const levelBadge = document.getElementById('modal-persona-level');
        if (levelBadge) levelBadge.textContent = `Lvl ${persona.level}`;

        const traitEl = document.getElementById('modal-persona-trait');
        if (traitEl) traitEl.innerHTML = persona.trait ? `TRAIT: <span>${persona.trait}</span>` : 'TRAIT: —';

        const statsList = document.querySelector('#modal-stats ul');
        if (statsList) {
            statsList.innerHTML = `
                <li>STRENGTH:  <span>${persona.strength  ?? 0}</span></li>
                <li>MAGIC:     <span>${persona.magic     ?? 0}</span></li>
                <li>ENDURANCE: <span>${persona.endurance ?? 0}</span></li>
                <li>AGILITY:   <span>${persona.agility   ?? 0}</span></li>
                <li>LUCK:      <span>${persona.luck      ?? 0}</span></li>
            `;
        }

        const elemList = document.querySelector('#modal-elements ul');
        if (elemList) {
            elemList.innerHTML = '';
            const affinities = [
                { key: 'weak',      label: 'Weak',   color: '#ff5555' },
                { key: 'resists',   label: 'Resist', color: '#aaaaaa' },
                { key: 'nullifies', label: 'Null',   color: '#55ff55' },
                { key: 'reflects',  label: 'Repel',  color: '#55ffff' },
                { key: 'absorbs',   label: 'Drain',  color: '#ff55ff' },
            ];
            let found = false;
            affinities.forEach(aff => {
                if (persona[aff.key]?.length) {
                    found = true;
                    elemList.innerHTML += `<li>${aff.label}: <span style="color:${aff.color}; font-weight:bold;">${persona[aff.key].join(', ')}</span></li>`;
                }
            });
            if (!found) elemList.innerHTML = '<li>Nenhuma fraqueza ou resistência.</li>';
        }
    }

    // --- EVENT LISTENERS FINAIS ---
    calculateBtn.addEventListener('click', handleCalculation);
    reverseCalculateBtn.addEventListener('click', handleReverseCalculation);

    document.getElementById('close-modal-btn').addEventListener('click', () => modal.classList.remove('open'));
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });

    document.getElementById('hamburger-menu')?.addEventListener('click', () => {
        document.getElementById('nav-list')?.classList.toggle('open');
    });

    window.addEventListener('click', (e) => {
        if (!e.target.matches('.search-input')) {
            resultsContainer1.style.display = 'none';
            resultsContainer2.style.display = 'none';
            document.getElementById('reverse-results-container').style.display = 'none';
        }
    });

    // INICIALIZA A APLICAÇÃO E O FETCH DA API
    loadPersonas();
});