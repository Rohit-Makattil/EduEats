// script.js (updated with no images in menu, prices in INR)
document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('role');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logoutBtn = document.getElementById('logout');
    const dashboardLink = document.getElementById('dashboard-link');

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('role');
            window.location.href = 'login.html';
        });
    }

    // Set dashboard link based on role
    if (dashboardLink) {
        if (role === 'teacher') {
            dashboardLink.innerHTML = '<a href="teacher-dashboard.html">Dashboard</a>';
        } else if (role === 'staff') {
            dashboardLink.innerHTML = '<a href="staff-dashboard.html">Dashboard</a>';
        } else if (role === 'admin') {
            dashboardLink.innerHTML = '<a href="admin-dashboard.html">Dashboard</a>';
        }
    }

    // Redirect if not logged in on protected pages
    const protectedPages = ['home.html', 'menu.html', 'order-status.html', 'teacher-dashboard.html', 'staff-dashboard.html', 'admin-dashboard.html'];
    if (protectedPages.some(page => window.location.href.includes(page)) && !role) {
        window.location.href = 'login.html';
    }

    // Login handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const selectedRole = document.getElementById('role').value;
            if (username === 'user' && password === '123') {
                localStorage.setItem('role', selectedRole);
                let dashboard;
                if (selectedRole === 'teacher') {
                    dashboard = 'teacher-dashboard.html';
                } else if (selectedRole === 'staff') {
                    dashboard = 'staff-dashboard.html';
                } else if (selectedRole === 'admin') {
                    dashboard = 'admin-dashboard.html';
                }
                window.location.href = dashboard;
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Menu data with no images, prices in INR
    const menuData = [
        {
            category: 'Snacks',
            items: [
                { name: 'Chinese Samosa', price: 25 },
                { name: 'Chips', price: 10 },
                { name: 'Vada Pav', price: 15 },
                { name: 'Pav Bhaji', price: 30 }
            ]
        },
        {
            category: 'Beverages',
            items: [
                { name: 'Cold Drink', price: 20 },
                { name: 'Tea', price: 10 },
                { name: 'Coffee', price: 15 },
                { name: 'Lassi', price: 25 }
            ]
        },
        {
            category: 'Meals',
            items: [
                { name: 'Triple Rice', price: 60 },
                { name: 'Fried Rice', price: 50 },
                { name: 'Chole Bhature', price: 70 },
                { name: 'Puri Bhaji', price: 50 },
                { name: 'Biryani', price: 80 },
                { name: 'Dal Rice', price: 45 }
            ]
        }
    ];

    // Populate menu with search functionality
    const menuContainer = document.getElementById('menu-container');
    const searchBar = document.getElementById('search-bar');
    if (menuContainer && searchBar) {
        function renderMenu(filter = '') {
            menuContainer.innerHTML = '<h1>Menu</h1><input type="text" id="search-bar" placeholder="Search by name or category..." class="search-bar">';
            menuData.forEach(cat => {
                const filteredItems = cat.items.filter(item =>
                    item.name.toLowerCase().includes(filter.toLowerCase()) ||
                    cat.category.toLowerCase().includes(filter.toLowerCase())
                );
                if (filteredItems.length > 0) {
                    const catDiv = document.createElement('div');
                    catDiv.classList.add('category');
                    catDiv.innerHTML = `<h2>${cat.category}</h2>`;
                    const itemsDiv = document.createElement('div');
                    itemsDiv.classList.add('items');
                    filteredItems.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('item');
                        itemDiv.innerHTML = `
                            <h3>${item.name}</h3>
                            <p>₹${item.price}</p>
                            <input type="text" placeholder="Custom notes (e.g., extra spice)">
                            <button class="add-to-cart btn" data-name="${item.name}" data-price="${item.price}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                        `;
                        if (role === 'teacher') {
                            const favBtn = document.createElement('button');
                            favBtn.classList.add('btn');
                            favBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
                            favBtn.addEventListener('click', () => addFavorite(item.name));
                            itemDiv.appendChild(favBtn);
                        }
                        itemsDiv.appendChild(itemDiv);
                    });
                    catDiv.appendChild(itemsDiv);
                    menuContainer.appendChild(catDiv);
                }
            });
        }

        searchBar.addEventListener('input', (e) => {
            renderMenu(e.target.value);
        });

        renderMenu();
    }

    // Cart functionality with loading
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const placeOrderBtn = document.getElementById('place-order');
    const loadingOverlay = document.getElementById('loading');

    function showLoading() {
        if (loadingOverlay) loadingOverlay.style.display = 'flex';
    }

    function hideLoading() {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }

    function updateCart() {
        if (cartItems) {
            cartItems.innerHTML = '';
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ₹${item.price} - Notes: ${item.notes}`;
                cartItems.appendChild(li);
            });
        }
    }

    if (menuContainer) {
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (role !== 'teacher') {
                    alert('Only teachers can add to cart');
                    return;
                }
                const name = e.target.dataset.name;
                const price = e.target.dataset.price;
                const notes = e.target.previousElementSibling.value;
                cart.push({ name, price, notes });
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });
    }

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            if (role !== 'teacher' || cart.length === 0) return;
            showLoading();
            setTimeout(() => {
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                const orderId = orders.length + 1;
                orders.push({ id: orderId, items: cart, status: 'Pending', user: 'teacher' });
                localStorage.setItem('orders', JSON.stringify(orders));
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
                hideLoading();
                alert('Order placed! COD.');
            }, 2000); // Simulate delay for loading animation
        });
    }

    updateCart();

    // Favorites
    function addFavorite(name) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(name)) {
            favorites.push(name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    const favoritesList = document.getElementById('favorites-list');
    if (favoritesList) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            favoritesList.appendChild(li);
        });
    }

    // Order status for teacher with loading
    const orderList = document.getElementById('order-list');
    if (orderList && role === 'teacher') {
        showLoading();
        setTimeout(() => {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders = orders.filter(order => order.user === 'teacher');
            orders.forEach(order => {
                const li = document.createElement('li');
                li.innerHTML = `Order #${order.id} - Status: ${order.status}<br>Items: ${order.items.map(item => `${item.name} (₹${item.price}, ${item.notes})`).join(', ')}`;
                orderList.appendChild(li);
            });
            hideLoading();
        }, 2000); // Simulate delay for loading
    }

    // Teacher order history with loading
    const orderHistory = document.getElementById('order-history');
    if (orderHistory) {
        showLoading();
        setTimeout(() => {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders = orders.filter(order => order.user === 'teacher');
            orders.forEach(order => {
                const li = document.createElement('li');
                li.innerHTML = `Order #${order.id} - Status: ${order.status}<br>Items: ${order.items.map(item => `${item.name} (₹${item.price}, ${item.notes})`).join(', ')}`;
                orderHistory.appendChild(li);
            });
            hideLoading();
        }, 2000); // Simulate delay for loading
    }

    // Staff dashboard with loading
    const staffOrderList = document.getElementById('staff-order-list');
    if (staffOrderList) {
        showLoading();
        setTimeout(() => {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.forEach(order => {
                const li = document.createElement('li');
                li.innerHTML = `Order #${order.id} - Status: ${order.status}<br>Items: ${order.items.map(item => `${item.name} (₹${item.price}, ${item.notes})`).join(', ')}`;
                const statuses = ['Pending', 'Preparing', 'On the way', 'Delivered'];
                statuses.forEach(status => {
                    if (status !== order.status) {
                        const btn = document.createElement('button');
                        btn.classList.add('btn');
                        btn.textContent = `Set to ${status}`;
                        btn.addEventListener('click', () => {
                            order.status = status;
                            localStorage.setItem('orders', JSON.stringify(orders));
                            location.reload();
                        });
                        li.appendChild(btn);
                    }
                });
                staffOrderList.appendChild(li);
            });
            hideLoading();
        }, 2000); // Simulate delay for loading
    }

    // Admin dashboard with loading
    const adminOrderList = document.getElementById('admin-order-list');
    const totalOrders = document.getElementById('total-orders');
    if (adminOrderList) {
        showLoading();
        setTimeout(() => {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.forEach(order => {
                const li = document.createElement('li');
                li.innerHTML = `Order #${order.id} - Status: ${order.status}<br>Items: ${order.items.map(item => `${item.name} (₹${item.price}, ${item.notes})`).join(', ')}`;
                adminOrderList.appendChild(li);
            });
            totalOrders.textContent = `Total Orders: ${orders.length}`;
            hideLoading();
        }, 2000); // Simulate delay for loading
    }
});