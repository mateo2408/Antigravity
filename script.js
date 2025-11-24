document.addEventListener('DOMContentLoaded', () => {
    console.log('EcuStickers Mobile Prototype Loaded');

    // Mock Data
    // Mock Data
    const stickers = [
        { id: 1, name: 'Tortuga Galápagos', category: 'animal', price: 2.50, region: 'galapagos', image: 'images/tortuga.png' },
        { id: 2, name: 'Volcán Cotopaxi', category: 'paisaje', price: 3.00, region: 'sierra', image: 'images/cotopaxi.png' },
        { id: 3, name: 'Máscara Diablo Huma', category: 'cultura', price: 3.50, region: 'sierra', image: 'images/diablo_huma.png' },
        { id: 4, name: 'Iguana Marina', category: 'animal', price: 2.50, region: 'galapagos', image: 'images/iguana.png' },
        { id: 5, name: 'Sombrero de Paja Toquilla', category: 'cultura', price: 2.00, region: 'costa', image: 'images/sombrero.png' },
        { id: 6, name: 'Orquídea Amazónica', category: 'flora', price: 2.75, region: 'amazonia', image: 'images/orquidea.png' },
        { id: 7, name: 'Pack Galápagos (Digital)', category: 'digital', price: 4.99, region: 'galapagos', image: 'images/tortuga.png' },
        { id: 8, name: 'Pack Andino', category: 'pack', price: 8.50, region: 'sierra', image: 'images/cotopaxi.png' },
    ];

    const stickerGrid = document.getElementById('stickerGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Render Stickers
    if (stickerGrid) {
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
    }

    // Creator Tool Logic
    const previewCanvas = document.querySelector('.preview-canvas');
    if (previewCanvas) {
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
    }

    // Cart Logic
    let cartItems = [];
    const badge = document.querySelector('.badge');
    const addToCartCreatorBtn = document.getElementById('addToCartCreator');
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCloseBtn = document.querySelector('.cart-close');

    function updateCartUI() {
        badge.textContent = cartItems.length;

        // Badge animation
        badge.style.transform = 'scale(1.5)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }

    function addToCart(item) {
        cartItems.push(item);
        updateCartUI();
        // Optional: Open cart automatically or show toast
        // openCart(); 
        alert('¡Producto añadido al carrito!');
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío</div>';
        } else {
            cartItems.forEach((item, index) => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <button class="cart-item-remove" data-index="${index}">Eliminar</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        cartTotalElement.textContent = `$${total.toFixed(2)}`;

        // Attach remove listeners
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cartItems.splice(index, 1);
                updateCartUI();
                renderCartItems();
            });
        });
    }

    function openCart() {
        renderCartItems();
        cartModal.classList.add('active');
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) cartModal.classList.remove('active');
        });
    }

    // Creator Add to Cart
    if (addToCartCreatorBtn) {
        addToCartCreatorBtn.addEventListener('click', () => {
            // Create canvas image (mock)
            const customItem = {
                name: `Sticker Personalizado (${currentBase})`,
                price: 4.00,
                image: 'images/tortuga.png', // Fallback/Mock for now
                category: 'custom'
            };
            addToCart(customItem);
        });
    }

    // Product Modal Logic
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

    let currentSelectedSticker = null;

    modalAddToCartBtn.addEventListener('click', () => {
        if (currentSelectedSticker) {
            addToCart(currentSelectedSticker);
            modal.classList.remove('active');
        }
    });

    function openModal(sticker) {
        currentSelectedSticker = sticker;
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

    // --- User Logic ---
    const userBtn = document.getElementById('userBtn');
    const userModal = document.getElementById('userModal');
    const userModalClose = document.getElementById('userModalClose');
    const userModalBody = document.getElementById('userModalBody');
    let isLoggedIn = false;

    function renderUserModal() {
        if (!isLoggedIn) {
            userModalBody.innerHTML = `
                <div class="user-profile-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Accede a tu cuenta para ver tus pedidos.</p>
                </div>
                <div class="login-form">
                    <div class="form-group">
                        <label>Correo Electrónico</label>
                        <input type="email" class="form-input" placeholder="ejemplo@email.com">
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" class="form-input" placeholder="********">
                    </div>
                    <button class="btn btn-primary full-width" id="loginSubmitBtn">Ingresar</button>
                    <button class="btn btn-secondary full-width" style="margin-top: 10px;">Registrarse</button>
                </div>
            `;
            document.getElementById('loginSubmitBtn').addEventListener('click', () => {
                isLoggedIn = true;
                renderUserModal();
            });
        } else {
            userModalBody.innerHTML = `
                <div class="user-profile-header">
                    <div class="user-avatar">
                        <i data-lucide="user" style="width: 40px; height: 40px;"></i>
                    </div>
                    <h2>Mateo Cisneros</h2>
                    <p>Miembro desde Nov 2024</p>
                </div>
                <div class="user-stats">
                    <div class="stat-item">
                        <span class="stat-value">12</span>
                        <span class="stat-label">Pedidos</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">5</span>
                        <span class="stat-label">Deseos</span>
                    </div>
                </div>
                <button class="btn btn-secondary full-width" id="logoutBtn">Cerrar Sesión</button>
            `;
            lucide.createIcons();
            document.getElementById('logoutBtn').addEventListener('click', () => {
                isLoggedIn = false;
                renderUserModal();
            });
        }
    }

    if (userBtn) {
        userBtn.addEventListener('click', () => {
            renderUserModal();
            userModal.classList.add('active');
        });
    }

    if (userModalClose) {
        userModalClose.addEventListener('click', () => {
            userModal.classList.remove('active');
        });
    }

    if (userModal) {
        userModal.addEventListener('click', (e) => {
            if (e.target === userModal) userModal.classList.remove('active');
        });
    }

    // --- Checkout Logic ---
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                alert('Tu carrito está vacío. ¡Agrega algunos stickers primero!');
                return;
            }

            const total = cartItems.reduce((sum, item) => sum + item.price, 0);
            const confirmPayment = confirm(`¿Deseas proceder al pago de $${total.toFixed(2)}?`);

            if (confirmPayment) {
                alert('¡Pago realizado con éxito! Gracias por tu compra en EcuStickers.');
                cartItems = [];
                updateCartUI();
                renderCartItems();
                cartModal.classList.remove('active');
            }
        });
    }
});
