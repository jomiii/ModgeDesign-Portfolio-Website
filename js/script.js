// Modge Design Portfolio - script.js

// ============================================
// PROJECT DATA - Easy to edit, copy & paste
// ============================================
const projects = [
  {
    id: 1,
    title: 'Modge Design: Graphic Design Portfolio',
    category: 'Branding, Social Media Post & Logo Design',
    desc: 'Complete visual identity including logo, color palette, typography, and comprehensive brand guidelines.',
    longDesc: 'This portfolio showcases a collection of graphic design projects, featuring logo and brand identity designs, social media creatives, promotional materials, product advertisements, digital illustrations, and poster designs. Each project explores different visual styles, creative concepts, and design approaches, demonstrating how visuals can communicate ideas, establish brand identities, and capture attention across different platforms and purposes.',
    tools: ['Illustrator', 'Photoshop', 'Canva'],
    // Custom buttons - each project can have different buttons
    buttons: [
      { label: 'View Details', url: '#', type: 'primary', modal: true },
      { label: 'View Behance Portfolio', url: 'https://www.behance.net/jomroberto/projects', type: 'secondary', target: '_blank' },
      { label: 'View Canva Portfolio', url: 'https://modgedesign.my.canva.site/md', type: 'secondary', target: '_blank' }
    ],
    images: ['assets/images/projects/project1.png'],
    thumbnail: 'assets/images/projects/project1.png'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    category: 'Expertise and IT Expirience',
    desc: '',
    longDesc: 'This website showcases my skills, experience, and projects in Information Technology and Graphic Design. It highlights my work in System Analysis, Quality Assurance, Business Analysis, UI Prototyping, and visual design, reflecting my passion for technology, creativity, and continuous learning.',
    tools: ['VS Code', 'CSS', 'JavaScript', 'HTML'],
    buttons: [
      { label: 'View Details', url: '#', type: 'primary', modal: true },
      { label: 'View Website', url: '#', type: 'secondary', target: '_blank' }
    ],
    images: ['assets/images/projects/project2.png'],
    thumbnail: 'assets/images/projects/project2.png'
  },
  /*{
    id: 3,
    title: 'Promotional Graphics',
    category: 'Promotional Graphics',
    desc: 'Eye-catching promotional materials for events, product launches, and marketing campaigns.',
    longDesc: 'Created promotional posters, banners, email headers, and digital ads for a product launch campaign. Optimized for both print and digital distribution.',
    tools: ['Illustrator', 'Photoshop', 'InDesign'],
    buttons: [
      { label: 'View Details', url: '#', type: 'primary', modal: true },
      { label: 'Download PDF', url: 'assets/files/promo.pdf', type: 'secondary', target: '_blank' },
      { label: 'Behance', url: 'https://behance.net', type: 'secondary', target: '_blank' }
    ],
    images: ['assets/images/projects/project3.jpg'],
    thumbnail: 'assets/images/projects/project3-thumb.jpg'
  },
  {
    id: 4,
    title: 'UI/UX Mobile App',
    category: 'UI/UX Design',
    desc: 'User-centered mobile app interface with interactive prototypes and design system.',
    longDesc: 'End-to-end UI/UX design for a productivity mobile app. Includes user research, wireframes, high-fidelity mockups, interactive prototype, and design handoff documentation.',
    tools: ['Figma', 'FigJam', 'Maze'],
    buttons: [
      { label: 'View Case Study', url: '#', type: 'primary', modal: true },
      { label: 'Figma Prototype', url: 'https://figma.com', type: 'secondary', target: '_blank' },
      { label: 'Behance', url: 'https://behance.net', type: 'secondary', target: '_blank' }
    ],
    images: ['assets/images/projects/project4.jpg'],
    thumbnail: 'assets/images/projects/project4-thumb.jpg'
  }*/
];

// ============================================
// Helper: Generate unique IDs if not provided
// ============================================
projects.forEach((p, i) => { if (!p.id) p.id = i + 1; });

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');
if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));

// Smooth scroll + close mobile menu
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior:'smooth' });
      navMenu.classList.remove('open');
    }
  });
});

// Active nav indicator on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
  // back to top
  backToTop.classList.toggle('show', window.scrollY > 400);
});

// Accordion (only one open)
document.querySelectorAll('.acc-header').forEach(h => {
  h.addEventListener('click', () => {
    const item = h.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ============================================
// Render projects
// ============================================
const projGrid = document.getElementById('project-grid');
function renderProjects() {
  projGrid.innerHTML = projects.map(p => {
    const thumb = p.thumbnail || p.images[0] || '';
    const thumbHTML = thumb
      ? `<img src="${thumb}" alt="${p.title}" loading="lazy">`
      : `<div class="placeholder">${p.title}</div>`;
    
    const buttonsHTML = (p.buttons || []).map((btn, i) => {
      const cls = `btn ${btn.type || 'secondary'}`;
      const modalAttr = btn.modal ? `data-modal="${p.id}"` : '';
      const target = btn.target ? `target="${btn.target}"` : '';
      const href = btn.url || '#';
      const tag = btn.modal ? 'button' : 'a';
      return `<${tag} class="${cls}" href="${href}" ${target} ${modalAttr}>${btn.label}</${tag}>`;
    }).join('');
    
    return `
      <div class="project-card">
        <div class="project-thumb">${thumbHTML}</div>
        <div class="project-info">
          <h3>${p.title}</h3>
          <div class="cat">${p.category}</div>
          <div class="project-actions">${buttonsHTML}</div>
        </div>
      </div>
    `;
  }).join('');
}
renderProjects();

// Modal
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
projGrid.addEventListener('click', e => {
  const btn = e.target.closest('[data-modal]');
  if (!btn) return;
  const p = projects.find(x => x.id === +btn.dataset.modal);
  const thumb = p.thumbnail || p.images[0] || '';
  const thumbHTML = thumb
    ? `<img src="${thumb}" alt="${p.title}">`
    : `<div class="placeholder">${p.title}</div>`;
  modalBody.innerHTML = `
    <h3>${p.title}</h3>
    <div class="cat">${p.category}</div>
    <div class="project-thumb" style="height:260px;margin-bottom:16px">${thumbHTML}</div>
    <p><strong>Overview:</strong> ${p.longDesc || p.desc}</p>
    <p><strong>Tools Used:</strong></p>
    <div class="tools">${p.tools.map(t=>`<span class="tool">${t}</span>`).join('')}</div>
  `;
  modal.classList.add('open');
});
document.querySelector('.modal-close').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

// Contact form validation + submit
const form = document.getElementById('contact-form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();
  const feedback = document.getElementById('form-msg');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !msg) { feedback.textContent='Please fill in all fields.'; feedback.className='form-msg error'; return; }
  if (!emailRe.test(email)) { feedback.textContent='Please enter a valid email.'; feedback.className='form-msg error'; return; }
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  try {
    const res = await fetch(form.action, { method:'POST', body:new FormData(form), headers:{'Accept':'application/json'} });
    if (res.ok) {
      feedback.textContent='Message sent successfully!'; feedback.className='form-msg success';
      form.reset();
    } else {
      feedback.textContent='Failed to send. Please try again.'; feedback.className='form-msg error';
    }
  } catch {
    feedback.textContent='Network error. Please try again.'; feedback.className='form-msg error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// Back to top
const backToTop = document.getElementById('back-to-top');
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
