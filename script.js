var user = {};

function go(to) {
  var views = document.querySelectorAll('.view');
  views.forEach(function(v) {
    v.classList.remove('active');
  });
  var next = document.getElementById('view-' + to);
  next.style.transform = 'translateY(20px)';
  setTimeout(function() {
    next.classList.add('active');
  }, 20);
}

function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() {
    t.classList.remove('show');
  }, 3000);
}

function setLoading(id, on) {
  var btn = document.getElementById(id);
  if (on) {
    btn.classList.add('loading');
  } else {
    btn.classList.remove('loading');
  }
}

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
  user = { name: name, email: email };

  setTimeout(function() {
    setLoading('su-btn', false);
    goHome();
  }, 1300);
}

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
  user = { name: email.split('@')[0], email: email };

  setTimeout(function() {
    setLoading('li-btn', false);
    goHome();
  }, 1300);
}

function goHome() {
  var raw  = user.name || 'Friend';
  var name = raw.charAt(0).toUpperCase() + raw.slice(1);

  document.getElementById('uname').textContent  = name;
  document.getElementById('nav-av').textContent = name.charAt(0).toUpperCase();

  var views = document.querySelectorAll('.view');
  views.forEach(function(v) {
    v.classList.remove('active');
  });

  var home = document.getElementById('view-home');
  home.style.transform = 'translateY(20px)';
  setTimeout(function() {
    home.classList.add('active');
  }, 20);

  setTimeout(function() {
    showToast('Welcome to Cianc, ' + name + '!');
  }, 600);
}

// Allow Enter key to submit
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  var signup = document.getElementById('view-signup');
  var login  = document.getElementById('view-login');
  if (signup.classList.contains('active')) doSignup();
  else if (login.classList.contains('active')) doLogin();
});
