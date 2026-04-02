// ===== BLOG ARTICLES DATA =====
const articles = [
  {
    title: "Agence de communication : le guide stratégique 2026 pour transformer votre marketing en machine de croissance",
    excerpt: "Pourquoi faire appel à une agence de communication stratégique en 2026 ? Découvrez les erreurs invisibles qui freinent 80% des entreprises et comment structurer une architecture marketing performante.",
    category: "strategie",
    categoryLabel: "Stratégie",
    date: "15 février 2026",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    link: "articles/guide-agence-communication-2026.html",
    slug: "guide-agence-communication-2026"
  },
  {
    title: "Stratégie marketing pour franchise : le guide complet pour structurer un réseau performant et dominant",
    excerpt: "Comment mettre en place une stratégie marketing efficace pour une franchise ou un réseau multi-sites ? Découvrez les erreurs qui freinent l'expansion et les leviers stratégiques indispensables.",
    category: "franchise",
    categoryLabel: "Franchise",
    date: "22 février 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    link: "articles/strategie-marketing-franchise.html",
    slug: "strategie-marketing-franchise"
  },
  {
    title: "Branding et positionnement : pourquoi votre image de marque détermine votre chiffre d'affaires",
    excerpt: "Branding, image de marque, positionnement stratégique : découvrez pourquoi les entreprises qui maîtrisent leur perception dominent leur marché en 2026.",
    category: "branding",
    categoryLabel: "Branding",
    date: "28 février 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    link: "articles/branding-et-positionnement.html",
    slug: "branding-et-positionnement"
  },
  {
    title: "SEO local : comment dominer Google dans votre ville et capter 80% des clients sans dépendre de la publicité",
    excerpt: "SEO local, référencement Google, visibilité géographique : découvrez pourquoi les entreprises locales qui structurent leur stratégie dominent leur marché en 2026.",
    category: "seo",
    categoryLabel: "SEO",
    date: "1 mars 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
    link: "articles/referencement-local-google.html",
    slug: "referencement-local-google"
  },
];

// ===== RENDER ARTICLES =====
const blogGrid = document.getElementById('blog-grid');

function renderArticles(filter = 'all') {
  blogGrid.innerHTML = '';

  const filtered = filter === 'all'
    ? articles
    : articles.filter(a => a.category === filter);

  if (filtered.length === 0) {
    blogGrid.innerHTML = '<p class="text-gray-500 text-center col-span-full py-20 text-lg">Aucun article dans cette catégorie pour le moment.</p>';
    return;
  }

  filtered.forEach((article, index) => {
    const card = document.createElement('article');
    card.className = 'blog-card reveal';
    card.style.animationDelay = `${index * 0.08}s`;

    const imgHTML = article.image
      ? `<img src="${article.image}" alt="${article.title}" class="blog-card-img" loading="lazy" />`
      : `<div class="blog-card-img bg-gradient-to-br ${article.gradient || 'from-purple-600 to-blue-600'}"><span class="text-4xl">${article.emoji || '📝'}</span></div>`;

    card.innerHTML = `
      <a href="${article.link || '#'}" class="block">
        ${imgHTML}
        <div class="blog-card-content">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="blog-category-badge">${article.categoryLabel}</span>
            <span class="text-gray-600 text-xs">${article.date}</span>
            <span class="text-gray-600 text-xs">· ${article.readTime} de lecture</span>
          </div>
          <h3 class="text-lg font-bold mb-2 leading-snug">${article.title}</h3>
          <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">${article.excerpt}</p>
          <div class="mt-4 text-primary text-sm font-semibold flex items-center gap-1">
            Lire l'article
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
        </div>
      </a>
    `;

    blogGrid.appendChild(card);
  });

  // Animate in
  document.querySelectorAll('.blog-card.reveal').forEach(el => {
    el.classList.add('visible');
  });
}

// ===== FILTER BUTTONS =====
const filterBtns = document.querySelectorAll('.blog-filter');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderArticles(btn.dataset.filter);
  });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button[type="submit"]');
    btn.textContent = 'Inscrit ✓';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = 'S\'abonner <svg class="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>';
      btn.style.background = '';
      btn.disabled = false;
      newsletterForm.reset();
    }, 3000);
  });
}

// Initial render
renderArticles();
