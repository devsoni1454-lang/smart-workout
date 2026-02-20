const API_BASE_URL = '/api';

// Helper to get Auth Headers
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// Redirect if not logged in (for protected pages)
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = '/index.html'; // Redirect to home/login
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/index.html';
}

// Update UI based on Auth State (Call this on page load)
function updateAuthUI() {
    // Try to find the auth container (supports multiple class names used across pages)
    const authBar = document.querySelector('.auth-bar') || document.querySelector('.actions') || document.querySelector('.topnav .actions');

    if (!authBar) return;

    if (isLoggedIn()) {
        const user = JSON.parse(localStorage.getItem('user'));
        const userName = user && user.name ? user.name : 'User';

        // Replace Login/Register with Welcome + Logout
        authBar.innerHTML = `
            <span style="margin-right:15px; font-weight:600; color:#28a06d;">Hi, ${userName}</span>
            <button onclick="logout()" style="background:#e34747; color:white; padding: 7px 15px; border-radius: 8px; border:none; cursor:pointer;">Logout</button>
        `;

        // Hide "Get Started" buttons
        document.querySelectorAll('.cta-btn').forEach(btn => {
            if (btn.innerText.includes('Get Started')) {
                btn.style.display = 'none';
            }
        });
    }
}

// --- AUTH MODAL LOGIC & INJECTION ---

const modalStyles = `
/* Modal styles injected by main.js */
.modal-bg {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(30, 33, 45, 0.63); z-index: 1500;
  display: flex; align-items: center; justify-content: center;
}
.modal {
  background: #fff; border-radius: 16px;
  box-shadow: 0 3px 18px rgba(0, 0, 0, 0.18);
  padding: 33px 36px; min-width: 330px; max-width: 95vw;
  position: relative; min-height: 240px;
  animation: popup .31s cubic-bezier(.45, 2, .45, .9);
}
@keyframes popup {
  from { transform: scale(.8) translateY(30px); opacity: .2; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}
.modal h2 { color: #28a06d; text-align: center; margin-top: 0; }
.modal form label { display: block; margin-top: 10px; font-weight: 600; color: #444; }
.modal form input {
  width: 100%; padding: 9px; border-radius: 6px;
  border: 1px solid #ccc; margin-bottom: 13px; font-size: 1em;
  background: #f8f8fa;
}
.modal form button[type="submit"], .modal form button[type="button"] {
  background: #28a06d; color: #fff; padding: 8px 22px;
  border: none; border-radius: 8px; font-weight: 600; font-size: 1.07em;
  margin-top: 7px; margin-right: 10px; cursor: pointer;
  transition: background .23s;
}
.modal form button[type="button"]:hover, .modal form button[type="submit"]:hover { background: #222; }
.modal .switch-link {
  display: block; text-align: center; margin-top: 13px;
  color: #28a06d; font-weight: 600; cursor: pointer;
  background: none; border: none; font-size: .99em; text-decoration: underline;
}
.modal .close-modal {
  position: absolute; top: 9px; right: 17px; background: none;
  border: none; font-size: 1.4em; color: #bbb; cursor: pointer;
}
@media(max-width:600px) { .modal { padding: 12px 3vw; } }
`;

function injectAuthModal() {
    // 1. Inject CSS if not present
    if (!document.getElementById('auth-modal-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'auth-modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    // 2. Inject HTML if not present
    if (!document.getElementById('authModalBg')) {
        const modalHTML = `
        <div id="authModalBg" class="modal-bg" style="display:none;">
            <div class="modal" id="modalContent"></div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Modal State
let currentMode = "login";

window.closeModal = function () {
    const bg = document.getElementById('authModalBg');
    if (bg) bg.style.display = 'none';
}

window.showModal = function (mode) {
    injectAuthModal(); // Ensure it exists
    currentMode = mode;
    renderAuthModal();
    const bg = document.getElementById('authModalBg');
    if (bg) bg.style.display = 'flex';
}

window.renderAuthModal = function () {
    const modalContent = document.getElementById('modalContent');
    if (!modalContent) return;

    if (currentMode === "login") {
        modalContent.innerHTML = `
          <button class="close-modal" onclick="closeModal()" title="Close">&times;</button>
          <h2>Login</h2>
          <form id="loginForm">
            <label for="loginEmail">Email:</label>
            <input type="email" id="loginEmail" required autocomplete="email"/>
            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" required autocomplete="current-password"/>
            <button type="submit">Login</button>
            <button type="button" onclick="closeModal()">Cancel</button>
            <div id="loginResult" style="margin-top:10px;color:#28a06d;font-size:1em;"></div>
          </form>
          <button class="switch-link" onclick="currentMode='register';renderAuthModal();">Need an account? Register</button>
        `;
        setTimeout(() => {
            const form = document.getElementById('loginForm');
            if (form) form.onsubmit = handleLoginSubmit;
        }, 50);
    } else {
        modalContent.innerHTML = `
          <button class="close-modal" onclick="closeModal()" title="Close">&times;</button>
          <h2>Register</h2>
          <form id="registerForm">
            <label for="regEmail">Email:</label>
            <input type="email" id="regEmail" required autocomplete="email"/>
            <label for="regPassword">Password:</label>
            <input type="password" id="regPassword" required minlength="6" autocomplete="new-password"/>
            <button type="submit">Register</button>
            <button type="button" onclick="closeModal()">Cancel</button>
            <div id="registerResult" style="margin-top:10px;color:#28a06d;font-size:1em;"></div>
          </form>
          <button class="switch-link" onclick="currentMode='login';renderAuthModal();">Already registered? Login</button>
        `;
        setTimeout(() => {
            const form = document.getElementById('registerForm');
            if (form) form.onsubmit = handleRegisterSubmit;
        }, 50);
    }
}

async function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;
    const resDiv = document.getElementById('loginResult');

    if (!email || !pass) return;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: pass })
        });
        const data = await response.json();
        if (response.ok) {
            resDiv.innerText = "Login successful!";
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            setTimeout(() => {
                closeModal();
                updateAuthUI(); // Update Header UI
                location.reload(); // Refresh to reflect state
            }, 800);
        } else {
            resDiv.innerText = data.message || "Login failed";
        }
    } catch (err) {
        console.error(err);
        resDiv.innerText = "Server connection error";
    }
}

async function handleRegisterSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPassword').value;
    const name = email.split('@')[0]; // simple name derivation
    const resDiv = document.getElementById('registerResult');

    if (!email || pass.length < 6) {
        resDiv.innerText = "Invalid email or password too short.";
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password: pass })
        });
        const data = await response.json();
        if (response.ok) {
            resDiv.innerText = "Registered! Logging in...";
            setTimeout(() => {
                currentMode = 'login'; renderAuthModal();
            }, 1000);
        } else {
            resDiv.innerText = data.message || "Registration failed";
        }
    } catch (err) {
        console.error(err);
        resDiv.innerText = "Server connection error";
    }
}

// Auto-bind buttons on other pages
function bindAuthButtons() {
    // Find Login buttons
    document.querySelectorAll('button').forEach(btn => {
        const txt = btn.innerText.toLowerCase();
        if (txt.includes('login') && !btn.onclick) {
            btn.onclick = () => showModal('login');
        }
        if (txt.includes('register') && !btn.onclick) {
            btn.onclick = () => showModal('register');
        }
        // Also fix alert() ones
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('alert')) {
            if (txt.includes('login')) btn.onclick = () => showModal('login');
            if (txt.includes('register')) btn.onclick = () => showModal('register');
            // override inline attribute
            btn.removeAttribute('onclick');
            btn.addEventListener('click', () => showModal(txt.includes('login') ? 'login' : 'register'));
        }
    });
}

// Global Search Button Logic
function initGlobalSearch() {
    // Matches both 'searchForm' (index.html, etc) and 'siteSearchForm' (about.html, etc)
    const forms = document.querySelectorAll('form[id*="earch"]');
    forms.forEach(form => {
        // Override existing submit handlers if they just alert
        form.onsubmit = function (e) {
            e.preventDefault();
            const input = form.querySelector('input');
            if (input && input.value.trim()) {
                const val = encodeURIComponent(input.value.trim());
                // Redirect to exercises page with query
                window.location.href = `/exercises.html?search=${val}`;
            }
        }
    });
}

// Global Payment/Booking Handlers
window.handleSubscribe = function (plan) {
    if (isLoggedIn()) {
        window.location.href = '/payment.html?plan=' + encodeURIComponent(plan);
    } else {
        alert("Please Login to Subscribe!");
        if (window.showModal) window.showModal('login');
    }
};

window.handleBooking = function (trainerName) {
    if (isLoggedIn()) {
        window.location.href = '/payment.html?booking=' + encodeURIComponent(trainerName);
    } else {
        alert("Please Login to Book a Session!");
        if (window.showModal) window.showModal('login');
    }
};

window.handleContact = function (name) {
    if (isLoggedIn()) {
        // Direct redirect to payment page where number will be shown
        window.location.href = '/payment.html?contact=' + encodeURIComponent(name || 'Team');
    } else {
        alert("Please Login to view Contact Details!");
        if (window.showModal) window.showModal('login');
    }
};


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    injectAuthModal();
    updateAuthUI();
    bindAuthButtons();
    initGlobalSearch();
});
