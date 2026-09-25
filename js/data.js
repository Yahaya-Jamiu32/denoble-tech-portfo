// ═════════════════════════════════════════════════════════════════════
// ALL SITE CONTENT LIVES HERE. Edit this file to update your info —
// nothing else needs to change. app.js reads everything from this file.
// ═════════════════════════════════════════════════════════════════════

const profile = {
  name: 'Yahaya Jamiu',
  brand: 'DeNoble Tech',
  role: 'Full-Stack Developer',
  location: 'Nigeria',
  tagline: 'Turning Ideas Into Powerful Digital Experiences.',
  positioning:
    'I build modern, responsive and functional web applications that turn ideas and real-world problems into practical digital solutions.',
  approach:
    'I focus on understanding the problem first, designing a clear solution, building with maintainable technologies, testing the functionality, and continuously improving the final product.',
  bio: `I'm Yahaya Jamiu, a Full-Stack Developer and Computer Science student at
Confluence University of Science and Technology, Osara, Kogi State. I began
my technology journey after gaining admission to university in 2023, and
since then I've built my skills through university coursework, online
learning platforms, YouTube tutorials, and most of all building real
projects. Right now I'm expanding my knowledge of backend technologies as
I work toward becoming a master-level Full-Stack Developer.`,

  email: 'yahayajamiu32@gmail.com',
  phone: '08151538323',
  whatsapp: '07036779507',

  // Drop your real photo at images/profile.jpg and set the path below.
  // Leave as '' to show a placeholder instead.
  photo: 'images/profile.jpg',

  // Drop your real CV at cv/resume.pdf and set the path below.
  // Leave as '' to keep the "Download CV" button disabled.
  cvUrl: 'cv/resume.pdf',

  social: {
    github: 'https://github.com/Yahaya-Jamiu32',
    facebook: 'https://www.facebook.com/de.noble.939135',
    youtube: 'https://youtube.com/@webtips-l1d',
  },
};

const skillGroups = [
  { category: 'Frontend', items: [
    { name: 'HTML5' }, { name: 'CSS3' }, { name: 'JavaScript' }, { name: 'TypeScript' },
  ] },
  { category: 'Backend', items: [
    { name: 'Node.js', note: 'Learning' }, { name: 'Express.js', note: 'Learning' }, { name: 'REST APIs', note: 'Learning' },
  ] },
  { category: 'Database', items: [
    { name: 'MySQL', note: 'Learning' }, { name: 'Postgre', note: 'Learning' },
  ] },
  { category: 'Tools', items: [
    { name: 'Git' }, { name: 'GitHub' }, { name: 'npm' }, { name: 'Node.js' }, { name: 'Visual Studio Code' }, { name: 'Browser DevTools' },
  ] },
];

const services = [
  { title: 'Website Development', description: 'Building modern, responsive websites for individuals, businesses and organizations.', icon: 'globe' },
  { title: 'Frontend Development', description: 'Creating responsive, interactive user interfaces using modern frontend technologies.', icon: 'layout' },
];

// ── PROJECTS ────────────────────────────────────────────────────────
// HOW TO ADD A PROJECT: find the first slot with title: '', fill it in.
// Leave liveUrl/githubUrl/image as '' if you don't have them yet — the
// site will never show a broken link or broken image for an empty field.
const projects = [
  { id: 1, title: '', category: '', description: '', longDescription: '', image: '', technologies: [], features: [], challenges: '', liveUrl: '', githubUrl: '', featured: false },
  { id: 2, title: '', category: '', description: '', longDescription: '', image: '', technologies: [], features: [], challenges: '', liveUrl: '', githubUrl: '', featured: false },
  { id: 3, title: '', category: '', description: '', longDescription: '', image: '', technologies: [], features: [], challenges: '', liveUrl: '', githubUrl: '', featured: false },
  { id: 4, title: '', category: '', description: '', longDescription: '', image: '', technologies: [], features: [], challenges: '', liveUrl: '', githubUrl: '', featured: false },
  { id: 5, title: '', category: '', description: '', longDescription: '', image: '', technologies: [], features: [], challenges: '', liveUrl: '', githubUrl: '', featured: false },
  { id: 6, title: '', category: '', description: '', longDescription: '', image: '', technologies: [], features: [], challenges: '', liveUrl: '', githubUrl: '', featured: false },
];

const journey = [
  { year: '2023', title: 'Started the journey', description: 'Gained admission to Confluence University of Science and Technology and began learning to code alongside coursework.' },
  { year: '2023 – 2024', title: 'Building the fundamentals', description: 'Learned HTML, CSS and JavaScript through university classes, online courses and YouTube tutorials, and started building small practical projects.' },
  { year: '2024 – 2025', title: 'Going deeper with JavaScript & TypeScript', description: 'Focused on advanced JavaScript and TypeScript, structuring larger projects and building interfaces that are actually usable, not just functional.' },
  { year: 'Now', title: 'Learning the backend', description: 'Currently expanding into Node.js, Express and databases (MySQL, MongoDB) to become a well-rounded Full-Stack Developer.' },
  { year: 'Next', title: 'Master-level full-stack', description: 'Working toward shipping complete, production-quality full-stack applications, frontend, backend, database and deployment.' },
];

const education = [
  { institution: 'Confluence University of Science and Technology', credential: 'B.Sc. Computer Science (in progress)', period: 'Expected completion: 2027', location: 'Osara, Kogi State, Nigeria' },
  { institution: 'Local Government Secondary School, Ohiana', credential: 'Senior Secondary School Certificate (SSCE)', period: '', location: 'Nigeria' },
  { institution: 'First Leaving School Certificate', credential: 'Primary education certificate', period: '', location: 'Nigeria' },
];

// No certifications yet — add real ones here when you have them.
const certifications = [];

// No articles yet — the Blog section shows "Articles Coming Soon" while
// this stays empty. Add an object here when you publish your first post.
const blogPosts = [];

// No real testimonials yet — never invent names/quotes here. The section
// stays hidden while this array is empty.
const testimonials = [];
