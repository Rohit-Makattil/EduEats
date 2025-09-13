document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('role');
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;
    const logoutBtn = document.getElementById('logout');
    const dashboardLink = document.getElementById('dashboard-link');
    const loadingOverlay = document.getElementById('loading');
    const clearHistoryBtn = document.getElementById('clear-history');

    // Theme toggle
    if (themeCheckbox) {
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark');
            themeCheckbox.checked = true;
        }
        themeCheckbox.addEventListener('change', () => {
            body.classList.toggle('dark', themeCheckbox.checked);
            localStorage.setItem('theme', themeCheckbox.checked ? 'dark' : 'light');
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('role');
            window.location.href = 'login.html';
        });
    }

    // Clear order history
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders = orders.filter(order => order.user !== 'teacher');
            localStorage.setItem('orders', JSON.stringify(orders));
            location.reload();
        });
    }

    // Set dashboard link based on role
    if (dashboardLink) {
        if (role === 'teacher') {
            dashboardLink.innerHTML = '<a href="teacher-dashboard.html"><i class="fas fa-chalkboard-teacher"></i> Dashboard</a>';
        } else if (role === 'staff') {
            dashboardLink.innerHTML = '<a href="staff-dashboard.html"><i class="fas fa-users-cog"></i> Dashboard</a>';
        } else if (role === 'admin') {
            dashboardLink.innerHTML = '<a href="admin-dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a>';
        }
    }

    // Redirect if not logged in
    const protectedPages = ['home.html', 'menu.html', 'order-status.html', 'teacher-dashboard.html', 'staff-dashboard.html', 'admin-dashboard.html'];
    if (protectedPages.some(page => window.location.href.includes(page)) && !role) {
        window.location.href = 'login.html';
    }

    // Login handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const selectedRole = document.getElementById('role').value;
            if (!username || !password || !selectedRole) {
                alert('Please fill in all fields');
                return;
            }
            if (loadingOverlay) {
                loadingOverlay.classList.add('active');
                setTimeout(() => {
                    if (username === 'user' && password === '123') {
                        localStorage.setItem('role', selectedRole);
                        const dashboard = selectedRole === 'teacher' ? 'teacher-dashboard.html' :
                                         selectedRole === 'staff' ? 'staff-dashboard.html' : 'admin-dashboard.html';
                        loadingOverlay.classList.remove('active');
                        window.location.href = dashboard;
                    } else {
                        loadingOverlay.classList.remove('active');
                        alert('Invalid credentials');
                    }
                }, 1000);
            } else {
                if (username === 'user' && password === '123') {
                    localStorage.setItem('role', selectedRole);
                    const dashboard = selectedRole === 'teacher' ? 'teacher-dashboard.html' :
                                     selectedRole === 'staff' ? 'staff-dashboard.html' : 'admin-dashboard.html';
                    window.location.href = dashboard;
                } else {
                    alert('Invalid credentials');
                }
            }
        });
    }

    // Menu data with sample items
    const menuData = [
        {
            category: 'Snacks',
            items: [
                { name: 'Chinese Samosa', description: 'Crispy samosa filled with spicy noodles.', price: 25, type: 'veg', tags: ['spicy', 'fried'] },
                { name: 'Chips', description: 'Classic potato chips, lightly salted.', price: 10, type: 'veg', tags: ['snack', 'crispy'] },
                { name: 'Vada Pav', description: 'Spicy potato fritter in a bun.', price: 15, type: 'veg', tags: ['spicy', 'street food'] },
                { name: 'Pav Bhaji', description: 'Spiced vegetable mash with buttered bread.', price: 30, type: 'veg', tags: ['spicy', 'comfort food'] },
                { name: 'Pani Puri', description: 'Crispy puris filled with spicy water.', price: 20, type: 'veg', tags: ['spicy', 'street food'] },
                { name: 'Spring Roll', description: 'Crispy rolls with vegetable filling.', price: 35, type: 'veg', tags: ['fried', 'asian'] },
                { name: 'Chicken Nuggets', description: 'Breaded chicken bites, served hot.', price: 40, type: 'non-veg', tags: ['fried', 'savory'] }
            ]
        },
        {
            category: 'Beverages',
            items: [
                { name: 'Cold Drink', description: 'Chilled carbonated beverage.', price: 20, type: 'veg', tags: ['refreshing', 'cold'] },
                { name: 'Tea', description: 'Hot masala chai.', price: 10, type: 'veg', tags: ['hot', 'traditional'] },
                { name: 'Coffee', description: 'Rich brewed coffee.', price: 15, type: 'veg', tags: ['hot', 'energizing'] },
                { name: 'Lassi', description: 'Sweet yogurt-based drink.', price: 25, type: 'veg', tags: ['sweet', 'refreshing'] },
                { name: 'Mango Shake', description: 'Creamy mango blended with milk.', price: 30, type: 'veg', tags: ['sweet', 'fruit'] },
                { name: 'Lemonade', description: 'Freshly squeezed lemon juice.', price: 15, type: 'veg', tags: ['refreshing', 'citrus'] },
                { name: 'Iced Tea', description: 'Chilled tea with a hint of lemon.', price: 20, type: 'veg', tags: ['refreshing', 'cold'] }
            ]
        },
        {
            category: 'Meals',
            items: [
                { name: 'Triple Rice', description: 'Rice with Manchurian and gravy.', price: 60, type: 'veg', tags: ['filling', 'asian'] },
                { name: 'Fried Rice', description: 'Stir-fried rice with vegetables.', price: 50, type: 'veg', tags: ['light', 'asian'] },
                { name: 'Chole Bhature', description: 'Spicy chickpeas with fried bread.', price: 70, type: 'veg', tags: ['spicy', 'traditional'] },
                { name: 'Puri Bhaji', description: 'Fried bread with potato curry.', price: 50, type: 'veg', tags: ['comfort food', 'traditional'] },
                { name: 'Biryani', description: 'Fragrant rice with spices and chicken.', price: 80, type: 'non-veg', tags: ['spicy', 'aromatic'] },
                { name: 'Dal Rice', description: 'Lentil curry with steamed rice.', price: 45, type: 'veg', tags: ['light', 'traditional'] },
                { name: 'Paneer Tikka Masala', description: 'Paneer in spicy tomato gravy.', price: 75, type: 'veg', tags: ['spicy', 'rich'] },
                { name: 'Chicken Curry', description: 'Tender chicken in spiced curry.', price: 85, type: 'non-veg', tags: ['spicy', 'savory'] },
                { name: 'Veg Thali', description: 'Assorted vegetables with roti and rice.', price: 65, type: 'veg', tags: ['traditional', 'complete meal'] }
            ]
        }
    ];

    // Menu rendering with filter and search
    const menuContainer = document.getElementById('menu-container');
    const searchBar = document.getElementById('search-bar');
    const itemsGrid = document.querySelector('.items-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const autocompleteList = document.getElementById('autocomplete-list');

    if (menuContainer && searchBar && itemsGrid) {
        function renderMenu(filterText = '', categoryFilter = 'all') {
            itemsGrid.innerHTML = '';

            let filteredData = menuData.flatMap(category => 
                category.items
                    .filter(item => 
                        (item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                         item.description.toLowerCase().includes(filterText.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(filterText.toLowerCase()))) &&
                        (categoryFilter === 'all' || category.category === categoryFilter)
                    )
                    .map(item => ({ ...item, category: category.category }))
            );

            filteredData.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.classList.add('item');
                itemCard.innerHTML = `
                    <h3>${item.name} <span class="item-type ${item.type}">${item.type === 'veg' ? '🌱' : '🍗'}</span></h3>
                    <p class="item-description">${item.description}</p>
                    <p class="price">₹${item.price}</p>
                    <input type="text" placeholder="Custom notes (e.g., extra spice)" class="item-notes">
                    <button class="add-to-cart btn" data-name="${item.name}" data-price="${item.price}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                `;
                itemsGrid.appendChild(itemCard);
            });
        }

        // Filter button handling
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.dataset.category;
                renderMenu(searchBar.value, category);
            });
        });

        // Autocomplete suggestions
        function updateAutocomplete(filterText) {
            autocompleteList.innerHTML = '';
            if (filterText.length < 2) {
                autocompleteList.style.display = 'none';
                return;
            }
            const suggestions = [];
            menuData.forEach(category => {
                suggestions.push(category.category);
                category.items.forEach(item => {
                    suggestions.push(item.name);
                    item.tags.forEach(tag => suggestions.push(tag));
                });
            });
            const filteredSuggestions = [...new Set(suggestions.filter(s => s.toLowerCase().includes(filterText.toLowerCase())))];
            filteredSuggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.textContent = suggestion;
                div.addEventListener('click', () => {
                    searchBar.value = suggestion;
                    autocompleteList.style.display = 'none';
                    renderMenu(suggestion, document.querySelector('.filter-btn.active').dataset.category);
                });
                autocompleteList.appendChild(div);
            });
            autocompleteList.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
        }

        searchBar.addEventListener('input', () => {
            const filterText = searchBar.value;
            updateAutocomplete(filterText);
            renderMenu(filterText, document.querySelector('.filter-btn.active').dataset.category);
        });

        renderMenu();
    }

    // Cart functionality with flying animation
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartPanel = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const placeOrderBtn = document.getElementById('place-order');
    const cartToggle = document.getElementById('cart-toggle');
    const orderPopup = document.getElementById('order-popup');
    const closePopupBtn = document.getElementById('close-popup');

    function showLoading() {
        if (loadingOverlay) loadingOverlay.classList.add('active');
    }

    function hideLoading() {
        if (loadingOverlay) loadingOverlay.classList.remove('active');
    }

    function showPopup() {
        if (orderPopup) orderPopup.style.display = 'flex';
    }

    function hidePopup() {
        if (orderPopup) orderPopup.style.display = 'none';
    }

    function updateCart() {
        if (cartItems) {
            cartItems.innerHTML = '';
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-utensils"></i> ${item.name} - ₹${item.price} - Notes: ${item.notes}`;
                li.classList.add('cart-item');
                cartItems.appendChild(li);
            });
        }
    }

    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            cartPanel.classList.toggle('open');
        });
    }

    if (menuContainer) {
        menuContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                if (role !== 'teacher') {
                    alert('Only teachers can add to cart');
                    return;
                }
                const button = e.target;
                const item = button.closest('.item');
                const name = button.dataset.name;
                const price = button.dataset.price;
                const notes = item.querySelector('input').value;

                // Flying animation
                const cartIcon = document.getElementById('cart-toggle');
                const itemClone = document.createElement('div');
                itemClone.classList.add('flying-item');
                itemClone.innerHTML = `<i class="fas fa-utensils"></i> ${name}`;
                document.body.appendChild(itemClone);

                const buttonRect = button.getBoundingClientRect();
                const cartRect = cartIcon.getBoundingClientRect();

                itemClone.style.position = 'fixed';
                itemClone.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
                itemClone.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
                itemClone.style.transition = 'all 0.6s ease';
                itemClone.style.background = 'var(--accent-color)';
                itemClone.style.color = 'white';
                itemClone.style.padding = '0.5em';
                itemClone.style.borderRadius = '5px';
                itemClone.style.zIndex = '1000';

                setTimeout(() => {
                    itemClone.style.left = `${cartRect.left + cartRect.width / 2}px`;
                    itemClone.style.top = `${cartRect.top + cartRect.height / 2}px`;
                    itemClone.style.transform = 'scale(0.5)';
                    itemClone.style.opacity = '0';
                }, 10);

                setTimeout(() => {
                    document.body.removeChild(itemClone);
                    cart.push({ name, price, notes });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                    cartPanel.classList.add('open');
                }, 600);
            }
        });
    }

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            if (role !== 'teacher' || cart.length === 0) return;
            showLoading();
            setTimeout(() => {
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                const orderId = orders.length + 1;
                const placedTime = new Date();
                const estimatedTime = new Date(placedTime.getTime() + 30 * 60000);
                orders.push({ id: orderId, items: cart, status: 'Pending', user: 'teacher', placedTime: placedTime.toISOString(), estimatedTime: estimatedTime.toISOString() });
                localStorage.setItem('orders', JSON.stringify(orders));
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
                cartPanel.classList.remove('open');
                hideLoading();
                showPopup();
            }, 1000);
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', hidePopup);
    }

    updateCart();

    // Generate LaTeX for PDF bill
    function generateBillLatex(order) {
        const items = order.items.map(item => 
            `${item.name.replace('&', '\\&')} & ₹${item.price} & ${item.notes || 'No notes'} \\\\ \\hline`
        ).join('\n');
        const total = order.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
        return `
\\documentclass[a4paper,12pt]{article}
\\usepackage{geometry}
\\usepackage{array}
\\usepackage{booktabs}
\\geometry{margin=1in}
\\begin{document}
\\begin{center}
{\\LARGE \\textbf{EduEats Order Bill}} \\\\
\\vspace{0.5cm}
{\\large Order \\#${order.id}} \\\\
{\\normalsize Status: ${order.status}} \\\\
\\vspace{0.5cm}
\\begin{tabular}{|l|r|l|}
\\hline
\\textbf{Item} & \\textbf{Price} & \\textbf{Notes} \\\\
\\hline
${items}
\\multicolumn{1}{|r|}{\\textbf{Total}} & \\multicolumn{1}{r|}{₹${total.toFixed(2)}} & \\\\
\\hline
\\end{tabular}
\\vspace{0.5cm}
\\normalsize
VESIT | Hashu Advani Memorial Complex, Chembur, Mumbai, India \\\\
Phone: +91-22-61532532 | Email: vesit@ves.ac.in
\\end{center}
\\end{document}
        `;
    }

    // Download PDF
    function downloadPDF(order) {
        const latexContent = generateBillLatex(order);
        const blob = new Blob([latexContent], { type: 'text/latex' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `order_${order.id}_bill.tex`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Order status page
    const orderList = document.getElementById('order-list');
    if (orderList && window.location.href.includes('order-status.html')) {
        showLoading();
        setTimeout(() => {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders = orders.filter(order => order.user === role);
            orderList.innerHTML = '';
            if (orders.length === 0) {
                orderList.innerHTML = '<p>No orders placed yet.</p>';
            } else {
                orders.forEach(order => {
                    const card = document.createElement('div');
                    card.classList.add('order-card');
                    let statusClass = '';
                    let progress = 0;
                    switch (order.status) {
                        case 'Pending': statusClass = 'pending'; progress = 25; break;
                        case 'Preparing': statusClass = 'preparing'; progress = 50; break;
                        case 'On the way': statusClass = 'on-the-way'; progress = 75; break;
                        case 'Delivered': statusClass = 'delivered'; progress = 100; break;
                        case 'Cancelled': statusClass = 'cancelled'; progress = 0; break;
                    }
                    const placedTime = new Date(order.placedTime);
                    const estimatedTime = new Date(order.estimatedTime);
                    const itemsList = order.items.map(item => `
                        <div class="order-item">
                            <span class="item-name"><i class="fas fa-utensils"></i> ${item.name}</span>
                            <span class="item-price">₹${item.price}</span>
                        </div>
                        <p class="item-notes">Notes: ${item.notes || 'No notes'}</p>
                    `).join('');
                    const cancelButton = order.status === 'Pending' ? `<button class="btn cancel-order" data-order-id="${order.id}"><i class="fas fa-times"></i> Cancel Order</button>` : '';
                    card.innerHTML = `
                        <h3><i class="fas fa-receipt"></i> Order #${order.id}</h3>
                        <span class="badge ${statusClass}">${order.status}</span>
                        <p><strong><i class="fas fa-clock"></i> Placed:</strong> ${placedTime.toLocaleString()}</p>
                        <p><strong><i class="fas fa-hourglass-end"></i> Estimated Delivery:</strong> ${estimatedTime.toLocaleString()}</p>
                        <div class="tracking-steps">
                            <div class="step ${progress >= 25 ? 'active' : ''}"><i class="fas fa-shopping-cart"></i> Ordered</div>
                            <div class="step ${progress >= 50 ? 'active' : ''}"><i class="fas fa-spinner"></i> Preparing</div>
                            <div class="step ${progress >= 75 ? 'active' : ''}"><i class="fas fa-truck"></i> Out for Delivery</div>
                            <div class="step ${progress >= 100 ? 'active' : ''}"><i class="fas fa-check-circle"></i> Delivered</div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${progress}%"></div>
                        </div>
                        <div class="order-items">${itemsList}</div>
                        <button class="btn download-pdf" data-order-id="${order.id}"><i class="fas fa-file-pdf"></i> Download PDF</button>
                        ${cancelButton}
                    `;
                    orderList.appendChild(card);
                });
                document.querySelectorAll('.download-pdf').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const orderId = parseInt(btn.dataset.orderId);
                        const order = orders.find(o => o.id === orderId);
                        if (order) downloadPDF(order);
                    });
                });
                document.querySelectorAll('.cancel-order').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const orderId = parseInt(btn.dataset.orderId);
                        const order = orders.find(o => o.id === orderId);
                        if (order && order.status === 'Pending') {
                            if (confirm('Are you sure you want to cancel this order?')) {
                                order.status = 'Cancelled';
                                localStorage.setItem('orders', JSON.stringify(orders));
                                location.reload();
                            }
                        }
                    });
                });
            }
            hideLoading();
        }, 1000);
    }

    // Teacher dashboard - Order history
    const orderHistory = document.getElementById('order-history');
    if (orderHistory) {
        showLoading();
        setTimeout(() => {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders = orders.filter(order => order.user === 'teacher');
            orderHistory.innerHTML = '';
            if (orders.length === 0) {
                orderHistory.innerHTML = '<p>No orders placed yet.</p>';
            } else {
                orders.forEach(order => {
                    const card = document.createElement('div');
                    card.classList.add('order-card');
                    let statusIcon = '';
                    switch (order.status) {
                        case 'Pending': statusIcon = '<i class="fas fa-hourglass-start status-icon pending"></i>'; break;
                        case 'Preparing': statusIcon = '<i class="fas fa-spinner status-icon preparing"></i>'; break;
                        case 'On the way': statusIcon = '<i class="fas fa-truck status-icon on-the-way"></i>'; break;
                        case 'Delivered': statusIcon = '<i class="fas fa-check-circle status-icon delivered"></i>'; break;
                        case 'Cancelled': statusIcon = '<i class="fas fa-times-circle status-icon cancelled"></i>'; break;
                    }
                    const itemsList = order.items.map(item => `
                        <div class="order-item">
                            <span class="item-name"><i class="fas fa-utensils"></i> ${item.name}</span>
                            <span class="item-price">₹${item.price}</span>
                        </div>
                        <p class="item-notes">Notes: ${item.notes || 'No notes'}</p>
                    `).join('');
                    card.innerHTML = `
                        ${statusIcon}
                        <h3><i class="fas fa-receipt"></i> Order #${order.id}</h3>
                        <p><strong>Status:</strong> ${order.status}</p>
                        <div class="order-items">${itemsList}</div>
                        <button class="btn download-pdf" data-order-id="${order.id}"><i class="fas fa-file-pdf"></i> Download PDF</button>
                    `;
                    orderHistory.appendChild(card);
                });
                document.querySelectorAll('.download-pdf').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const orderId = parseInt(btn.dataset.orderId);
                        const order = orders.find(o => o.id === orderId);
                        if (order) downloadPDF(order);
                    });
                });
            }
            hideLoading();
        }, 1000);
    }

    // Teacher dashboard - Favorites
    const favoritesList = document.getElementById('favorites-list');
    if (favoritesList) {
        showLoading();
        setTimeout(() => {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favoritesList.innerHTML = '';
            if (favorites.length === 0) {
                favoritesList.innerHTML = '<p>No favorites added yet.</p>';
            } else {
                favorites.forEach(name => {
                    const card = document.createElement('div');
                    card.classList.add('favorite-card');
                    card.innerHTML = `
                        <i class="fas fa-heart favorite-icon"></i>
                        <h3>${name}</h3>
                        <button class="btn" onclick="location.href='menu.html'"><i class="fas fa-utensils"></i> Order Now</button>
                    `;
                    favoritesList.appendChild(card);
                });
            }
            hideLoading();
        }, 1000);
    }

    // Staff dashboard
    const staffOrderList = document.getElementById('staff-order-list');
    if (staffOrderList) {
        showLoading();
        setTimeout(() => {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            staffOrderList.innerHTML = '';
            if (orders.length === 0) {
                staffOrderList.innerHTML = '<p>No orders available.</p>';
            } else {
                orders.forEach(order => {
                    const li = document.createElement('li');
                    const itemsList = order.items.map(item => `<i class="fas fa-utensils"></i> ${item.name} (₹${item.price}, ${item.notes || 'No notes'})`).join(', ');
                    li.innerHTML = `<i class="fas fa-receipt"></i> Order #${order.id} - Status: ${order.status}<br>Items: ${itemsList}`;
                    const select = document.createElement('select');
                    select.classList.add('status-select');
                    select.dataset.orderId = order.id;
                    const statuses = ['Pending', 'Preparing', 'On the way', 'Delivered', 'Cancelled'];
                    statuses.forEach(status => {
                        const option = document.createElement('option');
                        option.value = status;
                        option.textContent = status;
                        if (status === order.status) option.selected = true;
                        select.appendChild(option);
                    });
                    li.appendChild(select);
                    staffOrderList.appendChild(li);
                });

                document.querySelectorAll('.status-select').forEach(select => {
                    select.addEventListener('change', (e) => {
                        const orderId = parseInt(e.target.dataset.orderId);
                        let orders = JSON.parse(localStorage.getItem('orders')) || [];
                        const order = orders.find(o => o.id === orderId);
                        if (order) {
                            order.status = e.target.value;
                            localStorage.setItem('orders', JSON.stringify(orders));
                            location.reload();
                        }
                    });
                });
            }
            hideLoading();
        }, 1000);
    }

    // Admin dashboard
    const adminOrderList = document.getElementById('admin-order-list');
    const orderSearch = document.getElementById('order-search');
    const orderSort = document.getElementById('order-sort');
    const totalOrders = document.getElementById('total-orders');
    const pendingOrders = document.getElementById('pending-orders');
    const totalRevenue = document.getElementById('total-revenue');
    const popularItem = document.getElementById('popular-item');

    if (adminOrderList) {
        function renderAdminOrders(filterText = '', sortOption = 'id-asc') {
            showLoading();
            setTimeout(() => {
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                
                // Filter orders
                if (filterText) {
                    orders = orders.filter(order => 
                        order.id.toString().includes(filterText) ||
                        order.status.toLowerCase().includes(filterText.toLowerCase())
                    );
                }

                // Sort orders
                orders.sort((a, b) => {
                    if (sortOption === 'id-asc') return a.id - b.id;
                    if (sortOption === 'id-desc') return b.id - a.id;
                    if (sortOption === 'status') return a.status.localeCompare(b.status);
                    if (sortOption === 'time-asc') return new Date(a.placedTime) - new Date(b.placedTime);
                    if (sortOption === 'time-desc') return new Date(b.placedTime) - new Date(a.placedTime);
                    return 0;
                });

                adminOrderList.innerHTML = '';
                if (orders.length === 0) {
                    adminOrderList.innerHTML = '<tr><td colspan="6">No orders found.</td></tr>';
                } else {
                    orders.forEach(order => {
                        const row = document.createElement('tr');
                        const itemsList = order.items.map(item => `<i class="fas fa-utensils"></i> ${item.name} (₹${item.price})`).join(', ');
                        const placedTime = new Date(order.placedTime).toLocaleString();
                        const estimatedTime = new Date(order.estimatedTime).toLocaleString();
                        let statusIcon = '';
                        switch (order.status) {
                            case 'Pending': statusIcon = '<i class="fas fa-hourglass-start status-icon-table pending"></i>'; break;
                            case 'Preparing': statusIcon = '<i class="fas fa-spinner status-icon-table preparing"></i>'; break;
                            case 'On the way': statusIcon = '<i class="fas fa-truck status-icon-table on-the-way"></i>'; break;
                            case 'Delivered': statusIcon = '<i class="fas fa-check-circle status-icon-table delivered"></i>'; break;
                            case 'Cancelled': statusIcon = '<i class="fas fa-times-circle status-icon-table cancelled"></i>'; break;
                        }
                        const select = document.createElement('select');
                        select.classList.add('status-select');
                        select.dataset.orderId = order.id;
                        const statuses = ['Pending', 'Preparing', 'On the way', 'Delivered', 'Cancelled'];
                        statuses.forEach(status => {
                            const option = document.createElement('option');
                            option.value = status;
                            option.textContent = status;
                            if (status === order.status) option.selected = true;
                            select.appendChild(option);
                        });
                        row.innerHTML = `
                            <td>${order.id}</td>
                            <td>${statusIcon} ${order.status}</td>
                            <td>${itemsList}</td>
                            <td>${placedTime}</td>
                            <td>${estimatedTime}</td>
                            <td>
                                <button class="action-btn edit-btn" data-order-id="${order.id}" title="Edit Status"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete-btn" data-order-id="${order.id}" title="Delete Order"><i class="fas fa-trash"></i></button>
                            </td>
                        `;
                        const actionCell = row.querySelector('td:last-child');
                        actionCell.insertBefore(select, actionCell.firstChild);
                        adminOrderList.appendChild(row);
                    });

                    // Update status
                    document.querySelectorAll('.status-select').forEach(select => {
                        select.addEventListener('change', (e) => {
                            const orderId = parseInt(e.target.dataset.orderId);
                            let orders = JSON.parse(localStorage.getItem('orders')) || [];
                            const order = orders.find(o => o.id === orderId);
                            if (order) {
                                order.status = e.target.value;
                                localStorage.setItem('orders', JSON.stringify(orders));
                                renderAdminOrders(orderSearch ? orderSearch.value : '', orderSort ? orderSort.value : 'id-asc');
                            }
                        });
                    });

                    // Delete order
                    document.querySelectorAll('.delete-btn').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const orderId = parseInt(btn.dataset.orderId);
                            if (confirm(`Are you sure you want to delete Order #${orderId}?`)) {
                                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                                orders = orders.filter(o => o.id !== orderId);
                                localStorage.setItem('orders', JSON.stringify(orders));
                                renderAdminOrders(orderSearch ? orderSearch.value : '', orderSort ? orderSort.value : 'id-asc');
                            }
                        });
                    });
                }

                // Update analytics
                if (totalOrders) totalOrders.textContent = orders.length;
                if (pendingOrders) pendingOrders.textContent = orders.filter(o => o.status === 'Pending').length;
                if (totalRevenue) {
                    const revenue = orders.reduce((sum, order) => 
                        sum + order.items.reduce((itemSum, item) => itemSum + parseFloat(item.price), 0), 0);
                    totalRevenue.textContent = `₹${revenue.toFixed(2)}`;
                }
                if (popularItem) {
                    const itemCounts = {};
                    orders.forEach(order => {
                        order.items.forEach(item => {
                            itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
                        });
                    });
                    const popular = Object.entries(itemCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['None', 0]);
                    popularItem.textContent = popular[0];
                }

                hideLoading();
            }, 1000);
        }

        if (orderSearch) {
            orderSearch.addEventListener('input', () => {
                renderAdminOrders(orderSearch.value, orderSort ? orderSort.value : 'id-asc');
            });
        }

        if (orderSort) {
            orderSort.addEventListener('change', () => {
                renderAdminOrders(orderSearch ? orderSearch.value : '', orderSort.value);
            });
        }

        renderAdminOrders();
    }
});