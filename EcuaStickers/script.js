document.addEventListener('DOMContentLoaded', () => {
    console.log('EcuStickers Mobile Prototype Loaded');

    // Mock Data
    const stickers = [
        { id: 1, name: 'Tortuga Galápagos', category: 'animal', price: 2.50, region: 'galapagos', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Galapagos_giant_tortoise_Geochelone_elephantopus.jpg/640px-Galapagos_giant_tortoise_Geochelone_elephantopus.jpg' },
        { id: 2, name: 'Volcán Cotopaxi', category: 'paisaje', price: 3.00, region: 'sierra', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Volc%C3%A1n_Cotopaxi_%282015%29.jpg/640px-Volc%C3%A1n_Cotopaxi_%282015%29.jpg' },
        { id: 3, name: 'Máscara Diablo Huma', category: 'cultura', price: 3.50, region: 'sierra', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/El_Diablo_Huma.jpg/480px-El_Diablo_Huma.jpg' },
        { id: 4, name: 'Iguana Marina', category: 'animal', price: 2.50, region: 'galapagos', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Marine_Iguana_-_Galapagos_%2832940568808%29.jpg/640px-Marine_Iguana_-_Galapagos_%2832940568808%29.jpg' },
        { id: 5, name: 'Sombrero de Paja Toquilla', category: 'cultura', price: 2.00, region: 'costa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/SombrerosCuenca.jpg/640px-SombrerosCuenca.jpg' },
        { id: 6, name: 'Orquídea Amazónica', category: 'flora', price: 2.75, region: 'amazonia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Orqu%C3%ADdea_Amaz%C3%B3nica.jpg/480px-Orqu%C3%ADdea_Amaz%C3%B3nica.jpg' },
    ];

    const stickerGrid = document.getElementById('stickerGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Render Stickers
    function renderStickers(filter = 'all') {
        stickerGrid.innerHTML = '';

        const filteredStickers = filter === 'all'
            ? stickers
            : stickers.filter(s => s.category === filter || s.region === filter);

        filteredStickers.forEach(sticker => {
            const card = document.createElement('div');
            card.className = 'sticker-card';
            card.innerHTML = `
                <img src="${sticker.image}" alt="${sticker.name}" class="sticker-img">
                <div class="sticker-info">
                    <span class="sticker-category">${sticker.category}</span>
                    <h3>${sticker.name}</h3>
                    <div class="sticker-price">$${sticker.price.toFixed(2)}</div>
                </div>
            `;
            stickerGrid.appendChild(card);
        });
    }

    // Filter Click Events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            renderStickers(filterValue);
        });
    });

    // Initial Render
    renderStickers();

    // Creator Tool Logic
    const previewCanvas = document.querySelector('.preview-canvas');
    const toolBtns = document.querySelectorAll('.tool-btn');
    const creatorInput = document.getElementById('creatorText');
    const colorBtns = document.querySelectorAll('.color-btn');

    let currentBase = 'Llama';
    let currentAccessory = null;
    let currentText = '';
    let currentColor = '#1A1A1A';

    const assets = {
        'Llama': '🦙',
        'Cóndor': '🦅',
        'Cuy': '🐹',
        'Sombrero': '👒',
        'Poncho': '👕',
        'Gafas': '🕶️'
    };

    function updatePreview() {
        const baseEmoji = assets[currentBase] || '';
        const accEmoji = assets[currentAccessory] || '';

        previewCanvas.innerHTML = `
            <div class="preview-base">${baseEmoji}</div>
            ${currentAccessory ? `<div class="preview-accessory">${accEmoji}</div>` : ''}
            ${currentText ? `<div class="preview-text" style="color: ${currentColor}">${currentText}</div>` : ''}
        `;
    }

    toolBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = e.target.closest('.tool-group');
            const type = parent.querySelector('label').textContent;

            if (type === 'Personalizar') return; // Skip if it's the custom group (handled separately if needed)

            // UI Update
            parent.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // State Update
            if (type === 'Base') {
                currentBase = e.target.textContent;
            } else if (type === 'Accesorio') {
                currentAccessory = e.target.textContent;
            }
            updatePreview();
        });
    });

    creatorInput.addEventListener('input', (e) => {
        currentText = e.target.value;
        updatePreview();
    });

    colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            colorBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentColor = e.target.getAttribute('data-color');
            updatePreview();
        });
    });

    // Initial Preview
    updatePreview();

    // Cart Logic
    let cartCount = 0;
    const badge = document.querySelector('.badge');
    const addToCartCreatorBtn = document.getElementById('addToCartCreator');

    function addToCart() {
        cartCount++;
        badge.textContent = cartCount;

        // Simple visual feedback
        badge.style.transform = 'scale(1.5)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);

        alert('¡Producto añadido al carrito!');
    }

    addToCartCreatorBtn.addEventListener('click', addToCart);

    // Modal Logic
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="" alt="" class="modal-img">
            <div class="modal-info">
                <h2></h2>
                <span class="region"></span>
                <p class="modal-desc">Este sticker representa la riqueza cultural y natural del Ecuador. Perfecto para personalizar tu laptop o termo.</p>
                <button class="btn btn-primary full-width" id="modalAddToCart">Añadir al Carrito - <span class="price"></span></button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('h2');
    const modalRegion = modal.querySelector('.region');
    const modalPrice = modal.querySelector('.price');
    const closeBtn = modal.querySelector('.modal-close');
    const modalAddToCartBtn = modal.querySelector('#modalAddToCart');

    modalAddToCartBtn.addEventListener('click', () => {
        addToCart();
        modal.classList.remove('active');
    });

    function openModal(sticker) {
        modalImg.src = sticker.image;
        modalTitle.textContent = sticker.name;
        modalRegion.textContent = `Región: ${sticker.region.charAt(0).toUpperCase() + sticker.region.slice(1)}`;
        modalPrice.textContent = `$${sticker.price.toFixed(2)}`;
        modal.classList.add('active');
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Attach click to grid items (delegation)
    stickerGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.sticker-card');
        if (card) {
            const name = card.querySelector('h3').textContent;
            const sticker = stickers.find(s => s.name === name);
            if (sticker) openModal(sticker);
        }
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Language Toggle (Simple Demo)
    const langToggle = document.querySelector('.lang-toggle');
    let currentLang = 'ES';

    const translations = {
        'ES': {
            heroTitle: 'Lleva a Ecuador<br><span class="highlight">en cada sticker</span>',
            heroDesc: 'Descubre nuestra colección inspirada en la fauna, flora y cultura de nuestro país.',
            catalogTitle: 'Explora la Colección',
            creatorTitle: 'Creador de Stickers',
            creatorDesc: 'Fusiona elementos, añade texto y crea algo único.'
        },
        'EN': {
            heroTitle: 'Carry Ecuador<br><span class="highlight">in every sticker</span>',
            heroDesc: 'Discover our collection inspired by the fauna, flora, and culture of our country.',
            catalogTitle: 'Explore the Collection',
            creatorTitle: 'Sticker Creator',
            creatorDesc: 'Merge elements, add text, and create something unique.'
        }
    };

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ES' ? 'EN' : 'ES';
        langToggle.textContent = currentLang;

        // Update Text
        const t = translations[currentLang];
        document.querySelector('.hero h1').innerHTML = t.heroTitle;
        document.querySelector('.hero p').textContent = t.heroDesc;
        document.querySelector('#catalog h2').textContent = t.catalogTitle;
        document.querySelector('.creator-info h2').textContent = t.creatorTitle;
        document.querySelector('.creator-info p').textContent = t.creatorDesc;
    });
});
