/* -PMP- Main website script */

/* -PMP- Hash section switching */
function showSection(hash) {
  var sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  var target = (hash || '').replace(/^#/, '').trim();
  var found  = null;

  sections.forEach(function (s) {
    if (s.id === target) found = s;
  });
  if (!found) found = sections[0]; /* -PMP- Use the first section as fallback */

  sections.forEach(function (s) {
    s.style.display = (s === found) ? '' : 'none';
  });

  window.scrollTo(0, 0);
}

/* -PMP- Show the selected page section on load */
document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  sections.forEach(function (s) { s.style.display = 'none'; });
  showSection(window.location.hash);

  /* -PMP- Handle same-page section links */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      /* -PMP- Only handle valid page sections */
      var targetEl = document.querySelector('section' + hash);
      if (!targetEl) return;
      e.preventDefault();
      history.pushState(null, '', hash);
      showSection(hash);
      closeAll();
    });
  });
});

/* -PMP- Support browser back and forward */
window.addEventListener('hashchange', function () {
  showSection(window.location.hash);
});


/* -PMP- Dropdown menu */
function dd(a) {
  var li   = a.parentElement;
  var open = li.classList.contains('open');
  closeAll();
  if (!open) li.classList.add('open');
}

function sub(a) {
  var li   = a.parentElement;
  var open = li.classList.contains('open');
  li.parentElement.querySelectorAll('li.open').forEach(function (e) {
    e.classList.remove('open');
  });
  if (!open) li.classList.add('open');
}

function closeAll() {
  document.querySelectorAll('.nav-list li.open').forEach(function (e) {
    e.classList.remove('open');
  });
}

/* -PMP- Close menus after outside click */
document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-list')) closeAll();
});


/* -PMP- Mobile menu */
document.addEventListener('DOMContentLoaded', function () {
  var mBtn = document.getElementById('mBtn');
  if (mBtn) {
    mBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      document.getElementById('mainNav').classList.toggle('open');
    });
  }
});


/* -PMP- Search */
function doSearch() {
  var q = document.getElementById('ns').value.trim();
  if (q) alert('Searching BURS for: ' + q);
}

document.addEventListener('DOMContentLoaded', function () {
  var nsInput = document.getElementById('ns');
  if (nsInput) {
    nsInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSearch();
    });
  }
});


/* -PMP- SPA quick_links page */
function go(id) {
  document.querySelectorAll('.page-section').forEach(function (s) {
    s.classList.remove('active');
  });
  var el = document.getElementById('page-' + id);
  if (el) {
    el.classList.add('active');
    window.scrollTo(0, 0);
  }
  closeAll();
}


/* -PMP- Feedback rating behaviour */
function rate(v) {
  var labels = ['', 'Poor', 'Below Average', 'Average', 'Good', 'Excellent'];
  document.querySelectorAll('#starRow span').forEach(function (s) {
    s.classList.toggle('on', parseInt(s.dataset.v) <= v);
  });
  var lbl = document.getElementById('rateLabel');
  if (lbl) lbl.textContent = 'You rated: ' + labels[v] + ' (' + v + '/5)';
}
