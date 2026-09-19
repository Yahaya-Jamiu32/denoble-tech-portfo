// ═════════════════════════════════════════════════════════════════════
// Renders every section from data.js and wires up all interactivity.
// No build step, no framework — just runs in the browser.
// ═════════════════════════════════════════════════════════════════════

const strip = (v) => (v || '').replace(/[[\]]/g, '');
const isEmptyProject = (p) => !p.title || p.title.trim() === '';

// ── THEME ───────────────────────────────────────────────────────────
function initTheme() {
  const root = document.documentElement;
  const buttons = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];

  function paintIcon(isDark) {
    buttons.forEach((btn) => {
      if (!btn) return;
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = isDark
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" /></svg>';
    });
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('jtech-theme', theme); } catch (e) { /* ignore */ }
    paintIcon(theme === 'dark');
  }

  paintIcon(root.getAttribute('data-theme') !== 'light');

  buttons.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
    });
  });
}

// ── NAVBAR: scroll shadow + mobile menu ────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 8);
  });

  function closeMenu() {
    mobileMenu.classList.remove('navbar__mobile--open');
    mobileMenu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    mobileMenu.hidden = false;
    requestAnimationFrame(() => mobileMenu.classList.add('navbar__mobile--open'));
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('navbar__mobile--open');
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
}

// ── SCROLL REVEAL ───────────────────────────────────────────────────
function initReveal() {
  const sections = document.querySelectorAll('.section, .hero');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sections.forEach((el) => el.classList.add('reveal'));

  if (prefersReduced) {
    sections.forEach((el) => el.classList.add('reveal--visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  sections.forEach((el) => observer.observe(el));
}

// ── HERO ────────────────────────────────────────────────────────────
function renderHero() {
  if (profile.photo) {
    document.getElementById('portraitFrame').innerHTML =
      `<img src="${profile.photo}" alt="${profile.name}" />`;
  }
  if (profile.cvUrl) {
    const btn = document.getElementById('cvButton');
    const link = document.createElement('a');
    link.href = profile.cvUrl;
    link.className = 'btn btn-ghost';
    link.setAttribute('download', '');
    link.textContent = 'Download CV';
    btn.replaceWith(link);
  }
}

// ── ABOUT ───────────────────────────────────────────────────────────
function renderAbout() {
  document.getElementById('aboutBio').textContent = profile.bio;
  document.getElementById('aboutFacts').innerHTML = `
    <div><dt>Based in</dt><dd>${profile.location}</dd></div>
    <div><dt>Role</dt><dd>${profile.role}</dd></div>
    <div><dt>Approach</dt><dd>${profile.approach}</dd></div>
  `;
}

// ── SKILLS + TECHNOLOGIES ───────────────────────────────────────────
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = skillGroups.map((group) => `
    <div class="skills__group">
      <h3>${group.category}</h3>
      <ul>
        ${group.items.map((item) => `
          <li><span>${item.name}</span>${item.note ? `<span class="skills__note">${item.note}</span>` : ''}</li>
        `).join('')}
      </ul>
    </div>
  `).join('');

  const cloud = document.getElementById('techCloud');
  const all = skillGroups.flatMap((g) => g.items.map((i) => i.name));
  cloud.innerHTML = all.map((tech) => `<span class="tech-cloud__badge">${tech}</span>`).join('');
}

// ── SERVICES ────────────────────────────────────────────────────────
function renderServices() {
  document.getElementById('servicesGrid').innerHTML = services.map((s) => `
    <article class="services__card">
      <div class="services__icon">${serviceIconSVG(s.icon)}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
    </article>
  `).join('');
}

// ── PROJECTS (grid, search, filter, modal) ─────────────────────────
function getCategories() {
  const cats = new Set(['All']);
  projects.forEach((p) => p.category && cats.add(p.category));
  return Array.from(cats);
}

let activeCategory = 'All';
let searchQuery = '';

function projectCardHTML(project, index) {
  if (isEmptyProject(project)) {
    return `
      <div class="project-card project-card--empty">
        <div class="project-card__index">${String(index + 1).padStart(2, '0')}</div>
        <p class="project-card__empty-title">New Project Coming Soon</p>
        <p class="project-card__empty-copy">This slot is reserved for the next build.</p>
      </div>`;
  }
  const media = project.image
    ? `<img src="${project.image}" alt="Screenshot of ${project.title}" loading="lazy" />`
    : `<div class="project-card__placeholder"><span>Project Preview</span></div>`;
  const badge = project.featured ? `<span class="project-card__badge">Featured</span>` : '';
  const tech = project.technologies.length
    ? `<ul class="project-card__tech">${project.technologies.map((t) => `<li>${t}</li>`).join('')}</ul>` : '';
  const liveBtn = project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="link-arrow">Live demo</a>` : '';
  const ghBtn = project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="link-arrow">GitHub</a>` : '';

  return `
    <article class="project-card ${project.featured ? 'project-card--featured' : ''}">
      <button type="button" class="project-card__media" data-project-id="${project.id}" aria-label="View ${project.title} details">
        ${media}${badge}
      </button>
      <div class="project-card__body">
        <div class="project-card__meta">
          <span class="project-card__index">${String(index + 1).padStart(2, '0')}</span>
          ${project.category ? `<span class="project-card__category">${project.category}</span>` : ''}
        </div>
        <h3><button type="button" class="link-like" data-project-id="${project.id}">${project.title}</button></h3>
        ${project.description ? `<p>${project.description}</p>` : ''}
        ${tech}
        <div class="project-card__actions">
          <button type="button" class="link-arrow" data-project-id="${project.id}">View details</button>
          ${liveBtn}${ghBtn}
        </div>
      </div>
    </article>`;
}

function renderProjectFilter() {
  const cats = getCategories();
  const el = document.getElementById('projectFilter');
  if (cats.length <= 2) { el.innerHTML = ''; return; }
  el.innerHTML = cats.map((c) =>
    `<button type="button" class="project-filter__btn ${c === activeCategory ? 'is-active' : ''}" data-category="${c}">${c}</button>`
  ).join('');
  el.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      renderProjects();
    });
  });
}

function renderProjects() {
  const hasReal = projects.some((p) => p.title.trim() !== '');
  document.getElementById('projectToolbar').style.display = hasReal ? 'flex' : 'none';
  renderProjectFilter();

  const q = searchQuery.trim().toLowerCase();
  const filtered = projects.filter((p) => {
    if (isEmptyProject(p)) return activeCategory === 'All' && q === '';
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesQuery = q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const grid = document.getElementById('projectGrid');
  grid.innerHTML = filtered.length === 0
    ? `<p class="project-grid__empty">No projects match that search.</p>`
    : filtered.map((p) => projectCardHTML(p, projects.indexOf(p))).join('');

  grid.querySelectorAll('[data-project-id]').forEach((el) => {
    el.addEventListener('click', () => openProjectModal(Number(el.dataset.projectId)));
  });
}

function openProjectModal(id) {
  const project = projects.find((p) => p.id === id);
  if (!project || isEmptyProject(project)) return;

  const media = project.image
    ? `<div class="modal__media"><img src="${project.image}" alt="Screenshot of ${project.title}" /></div>`
    : `<div class="modal__media"><div class="project-card__placeholder project-card__placeholder--large"><span>Project Preview</span></div></div>`;

  const overview = project.longDescription ? `<section><h3>Overview</h3><p>${project.longDescription}</p></section>` : '';
  const features = project.features.length ? `<section><h3>Key Features</h3><ul>${project.features.map((f) => `<li>${f}</li>`).join('')}</ul></section>` : '';
  const challenges = project.challenges ? `<section><h3>Challenges & Decisions</h3><p>${project.challenges}</p></section>` : '';
  const tech = project.technologies.length ? `<section><h3>Technologies</h3><ul class="modal__tech">${project.technologies.map((t) => `<li>${t}</li>`).join('')}</ul></section>` : '';
  const liveBtn = project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Live Demo</a>` : '';
  const ghBtn = project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">View on GitHub</a>` : '';

  showModal(`
    ${project.category ? `<p class="modal__category">${project.category}</p>` : ''}
    <h2>${project.title}</h2>
    ${project.description ? `<p>${project.description}</p>` : ''}
    <div class="modal__links">${liveBtn}${ghBtn}</div>
    ${media}
    <div class="modal__body">${overview}${features}${challenges}${tech}</div>
  `);
}

// ── JOURNEY ─────────────────────────────────────────────────────────
function renderJourney() {
  document.getElementById('journeyTimeline').innerHTML = journey.map((step) => `
    <li>
      <span class="journey__year">${step.year}</span>
      <h3>${step.title}</h3>
      <p>${step.description}</p>
    </li>
  `).join('');
}

// ── EDUCATION + CERTIFICATIONS ──────────────────────────────────────
function renderEducation() {
  document.getElementById('educationGrid').innerHTML = education.map((item) => `
    <div class="education__card">
      <h3>${item.institution}</h3>
      <p class="education__credential">${item.credential}</p>
      <p class="education__meta">${[item.period, item.location].filter(Boolean).join(' · ')}</p>
    </div>
  `).join('');

  if (certifications.length > 0) {
    document.getElementById('certificationsBlock').classList.remove('hidden');
    document.getElementById('certificationsList').innerHTML = certifications.map((c) => `
      <li><strong>${c.title}</strong> — ${c.issuer} (${c.date})${c.credentialUrl ? ` · <a href="${c.credentialUrl}" target="_blank" rel="noopener noreferrer">View</a>` : ''}</li>
    `).join('');
  }
}

// ── BLOG ────────────────────────────────────────────────────────────
function renderBlog() {
  const container = document.getElementById('blogContent');
  if (blogPosts.length === 0) {
    container.innerHTML = `
      <div class="blog__empty">
        <p class="blog__empty-title">Articles Coming Soon</p>
        <p>I'm planning to write about what I'm building and learning as a developer. Check back soon.</p>
      </div>`;
    return;
  }
  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  container.innerHTML = `<div class="blog__grid">${sorted.map((post) => `
    <article class="blog__card">
      <button type="button" class="project-card__media" data-blog-slug="${post.slug}" style="width:100%;">
        ${post.coverImage ? `<img src="${post.coverImage}" alt="${post.title}" loading="lazy" />` : `<div class="project-card__placeholder"><span>Article cover</span></div>`}
      </button>
      <div class="blog__card-body">
        <p class="blog__meta">${new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} · ${post.readingTimeMinutes} min read</p>
        <h3><button type="button" class="link-like" data-blog-slug="${post.slug}">${post.title}</button></h3>
        <p>${post.summary}</p>
        <button type="button" class="link-arrow" data-blog-slug="${post.slug}">Read article</button>
      </div>
    </article>
  `).join('')}</div>`;

  container.querySelectorAll('[data-blog-slug]').forEach((el) => {
    el.addEventListener('click', () => openBlogModal(el.dataset.blogSlug));
  });
}

function openBlogModal(slug) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return;
  const cover = post.coverImage ? `<div class="modal__media"><img src="${post.coverImage}" alt="${post.title}" /></div>` : '';
  const content = post.content.split('\n\n').map((p) => `<p>${p}</p>`).join('');
  const tags = post.tags.length ? `<ul class="modal__tech">${post.tags.map((t) => `<li>#${t}</li>`).join('')}</ul>` : '';
  showModal(`
    <p class="modal__category">${post.category}</p>
    <h2>${post.title}</h2>
    <p>${new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} · ${post.readingTimeMinutes} min read</p>
    ${cover}
    <div class="modal__body">${content}${tags}</div>
  `);
}

// ── TESTIMONIALS (hidden entirely if empty) ─────────────────────────
function renderTestimonials() {
  if (testimonials.length === 0) return;
  const section = document.getElementById('testimonials');
  section.classList.remove('hidden');
  document.getElementById('testimonialsGrid').innerHTML = testimonials.map((t) => `
    <figure class="testimonials__card">
      <blockquote>&ldquo;${t.quote}&rdquo;</blockquote>
      <figcaption>
        ${t.avatar ? `<img src="${t.avatar}" alt="${t.name}" />` : `<div class="testimonials__avatar-placeholder"></div>`}
        <div><strong>${t.name}</strong><span>${t.role}${t.company ? `, ${t.company}` : ''}</span></div>
      </figcaption>
    </figure>
  `).join('');
}

// ── CONTACT ─────────────────────────────────────────────────────────
const EMAILJS_CONFIG = {
  serviceId: 'service_izfn5i4',   // e.g. 'service_xxxxxxx' — see README "Contact form"
  templateId: 'template_yl3vmk8',  // e.g. 'template_xxxxxxx'
  publicKey: 'Nc9eNGSL8DG2YA_uH',   // e.g. 'xxxxxxxxxxxxxxx'
};
const EMAILJS_READY = Boolean(EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey);

function renderContactInfo() {
  const list = document.getElementById('contactInfoList');
  const cleanEmail = strip(profile.email);
  list.innerHTML = `
    <li><span>Email</span><a href="mailto:${cleanEmail}">${profile.email}</a></li>
    <li><span>Phone</span><a href="tel:${profile.phone}">${profile.phone}</a></li>
    <li><span>WhatsApp</span><a href="https://wa.me/234${profile.whatsapp.replace(/^0/, '')}" target="_blank" rel="noopener noreferrer">${profile.whatsapp}</a></li>
    <li><span>GitHub</span><a href="${profile.social.github}" target="_blank" rel="noopener noreferrer">Yahaya-Jamiu32</a></li>
    <li><span>Facebook</span><a href="${profile.social.facebook}" target="_blank" rel="noopener noreferrer">de.noble.939135</a></li>
    <li><span>YouTube</span><a href="${profile.social.youtube}" target="_blank" rel="noopener noreferrer">@webtips-l1d</a></li>
  `;
}

function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Please add a short subject.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';
  else if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

function initContactForm() {
  renderContactInfo();
  if (EMAILJS_READY && window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('successStatus');
  const errorEl = document.getElementById('errorStatus');
  const fields = ['name', 'email', 'subject', 'message'];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(fields.map((f) => [f, form[f].value]));
    const errors = validateContact(values);

    fields.forEach((f) => {
      const errEl = document.getElementById(`${f}Error`);
      const input = form[f];
      if (errors[f]) {
        errEl.textContent = errors[f];
        errEl.classList.remove('hidden');
        input.setAttribute('aria-invalid', 'true');
      } else {
        errEl.classList.add('hidden');
        input.removeAttribute('aria-invalid');
      }
    });
    if (Object.keys(errors).length > 0) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    successEl.classList.add('hidden');
    errorEl.classList.add('hidden');

    try {
      if (EMAILJS_READY && window.emailjs) {
        await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
          from_name: values.name, from_email: values.email,
          subject: values.subject, message: values.message, to_email: profile.email,
        });
        successEl.textContent = "Message sent — I'll get back to you soon.";
        successEl.classList.remove('hidden');
        form.reset();
      } else {
        const subject = encodeURIComponent(values.subject || `Portfolio contact from ${values.name}`);
        const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
        window.location.href = `mailto:${strip(profile.email)}?subject=${subject}&body=${body}`;
        successEl.textContent = 'Opening your email client…';
        successEl.classList.remove('hidden');
      }
    } catch (err) {
      errorEl.textContent = 'Something went wrong sending your message. Please email me directly instead.';
      errorEl.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

// ── FOOTER ──────────────────────────────────────────────────────────
function renderFooter() {
  document.getElementById('footerSocial').innerHTML = `
    <a href="${profile.social.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="${profile.social.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>
    <a href="${profile.social.youtube}" target="_blank" rel="noopener noreferrer">YouTube</a>
  `;
  document.getElementById('footerCopyright').textContent =
    `© ${new Date().getFullYear()} ${profile.name} — ${profile.brand}. All rights reserved.`;
}

// ── MODAL (used for both project details and blog posts) ───────────
function showModal(innerHTML) {
  const root = document.getElementById('modalRoot');
  root.innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal" role="dialog" aria-modal="true">
        <button type="button" class="modal__close" id="modalClose" aria-label="Close">&times;</button>
        ${innerHTML}
      </div>
    </div>`;
  document.body.style.overflow = 'hidden';

  function close() {
    root.innerHTML = '';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') close(); }

  document.getElementById('modalClose').addEventListener('click', close);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') close();
  });
  document.addEventListener('keydown', onKey);
}

// ── SEARCH input wiring (needs projects rendered first) ─────────────
function initProjectSearch() {
  const input = document.getElementById('projectSearch');
  input.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProjects();
  });
}

// ── INIT ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  renderHero();
  renderAbout();
  renderSkills();
  renderServices();
  renderProjects();
  initProjectSearch();
  renderJourney();
  renderEducation();
  renderBlog();
  renderTestimonials();
  initContactForm();
  renderFooter();
  initReveal();
});
