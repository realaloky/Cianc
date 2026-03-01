// ── Helpers ──────────────────────────────────────────
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 3000);
}

function setLoading(id, on) {
  var btn = document.getElementById(id);
  if (!btn) return;
  btn.classList[on ? 'add' : 'remove']('loading');
}

function saveName(name) {
  try { localStorage.setItem('cianc_user', name); } catch (e) {}
}

function loadName() {
  try { return localStorage.getItem('cianc_user') || 'Friend'; } catch (e) { return 'Friend'; }
}

// ── Signup ────────────────────────────────────────────
function doSignup() {
  var name  = document.getElementById('su-name').value.trim();
  var email = document.getElementById('su-email').value.trim();
  var pass  = document.getElementById('su-pass').value;
  var err   = document.getElementById('su-err');

  if (!name || !email || !pass) {
    err.textContent = 'Please fill in all fields.';
    err.classList.add('show');
    return;
  }
  if (!email.includes('@')) {
    err.textContent = 'Please enter a valid email address.';
    err.classList.add('show');
    return;
  }
  if (pass.length < 6) {
    err.textContent = 'Password must be at least 6 characters.';
    err.classList.add('show');
    return;
  }

  err.classList.remove('show');
  setLoading('su-btn', true);
  saveName(name.charAt(0).toUpperCase() + name.slice(1));

  setTimeout(function () {
    window.location.href = 'home.html';
  }, 1300);
}

// ── Login ─────────────────────────────────────────────
function doLogin() {
  var email = document.getElementById('li-email').value.trim();
  var pass  = document.getElementById('li-pass').value;
  var err   = document.getElementById('li-err');

  if (!email || !pass) {
    err.textContent = 'Please enter your email and password.';
    err.classList.add('show');
    return;
  }
  if (!email.includes('@')) {
    err.textContent = 'Please enter a valid email address.';
    err.classList.add('show');
    return;
  }

  err.classList.remove('show');
  setLoading('li-btn', true);

  var name = email.split('@')[0];
  saveName(name.charAt(0).toUpperCase() + name.slice(1));

  setTimeout(function () {
    window.location.href = 'home.html';
  }, 1300);
}

// ── Home page — fill in user name ────────────────────
(function () {
  var uname = document.getElementById('uname');
  var navAv = document.getElementById('nav-av');
  var navUn = document.getElementById('nav-username');

  if (!uname) return; // not home page

  var name = loadName();
  uname.textContent = name;
  if (navAv) navAv.textContent = name.charAt(0).toUpperCase();
  if (navUn) navUn.textContent = name;

  setTimeout(function () { showToast('Welcome to Cianc, ' + name + '!'); }, 400);
})();

// ── Enter key to submit ───────────────────────────────
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter') return;
  if (document.getElementById('su-btn')) doSignup();
  else if (document.getElementById('li-btn')) doLogin();
});
