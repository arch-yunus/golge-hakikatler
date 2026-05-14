document.addEventListener('DOMContentLoaded', async () => {
    const nav = document.getElementById('category-nav');
    const container = document.getElementById('card-container');
    let data = null;

    try {
        const response = await fetch('data/quotes.json');
        data = await response.json();
        initApp(data);
    } catch (err) {
        console.error("Veri yüklenemedi:", err);
        container.innerHTML = '<p style="color:red; text-align:center;">Külliyat yüklenirken bir hata oluştu.</p>';
    }

    function initApp(data) {
        // Tüm kategoriler butonu
        const btnAll = document.createElement('button');
        btnAll.className = 'cat-btn active';
        btnAll.innerText = 'Tümü';
        btnAll.onclick = () => filterCards('Tümü', btnAll);
        nav.appendChild(btnAll);

        // Kategori butonları oluştur
        data.modules.forEach(mod => {
            const btn = document.createElement('button');
            btn.className = 'cat-btn';
            btn.innerText = mod.name;
            btn.onclick = () => filterCards(mod.id, btn);
            nav.appendChild(btn);
        });

        // Tüm kartları render et
        renderCards('Tümü');
    }

    function filterCards(filterId, activeBtn) {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
        renderCards(filterId);
    }

    function renderCards(filterId) {
        container.innerHTML = '';
        
        data.modules.forEach(mod => {
            if (filterId === 'Tümü' || mod.id === filterId) {
                mod.quotes.forEach(item => {
                    const card = createCard(item);
                    container.appendChild(card);
                });
            }
        });
    }

    function createCard(item) {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'flip-card';
        
        cardWrapper.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <p class="quote-text">"${item.quote}"</p>
                    <p class="quote-source">— ${item.source}</p>
                </div>
                <div class="flip-card-back">
                    <p class="label">Gölge Hakikat</p>
                    <p class="desc-text">${item.shadowTruth}</p>
                </div>
            </div>
        `;

        cardWrapper.addEventListener('click', () => {
            cardWrapper.classList.toggle('flipped');
        });

        return cardWrapper;
    }
});
