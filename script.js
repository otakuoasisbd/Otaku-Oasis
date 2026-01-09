/* ====== PRODUCTS DATA ====== */
const products = [
  {id:'akaza1', name:'Akaza', price:700, priceText:'700tk', imgs:['assets/akaza1.JPEG','assets/akaza2.JPEG','assets/akaza3.JPEG'], desc:'Akaza figure Size:28cm from Demon Slayer.', category:'Demon Slayer'},
  {id:'marin', name:'Marin Kitagawa', price:800, priceText:'800tk', imgs:['assets/marin1.JPEG','assets/marin2.JPEG','assets/marin3.JPEG'], desc:'Limited edition Marin figure from My Dressup Darling with box.', category:'Other'},
  {id:'tanjiro', name:'Tanjiro', price:800, priceText:'800tk', imgs:['assets/tanjiro1.JPG','assets/tanjiro2.JPG','assets/tanjiro3.JPG'], desc:'Tanjiro Kamado Size:28cm from Demon Slayer.', category:'Demon Slayer'},
  {id:'makima', name:'Bunny Makima', price:2000, priceText:'2000tk', imgs:['assets/makima1.jpeg','assets/makima2.jpeg','assets/makima3.jpeg'], desc:'Original Furyu Makima figure Size:28cm from Chainsawman with box.', category:'Chainsawman'},
  {id:'rem', name:'Rem', price:600, priceText:'600tk', imgs:['assets/rem1.jpg','assets/rem2.JPEG','assets/rem3.jpg'], desc:'Rem figure Size:28cm from Re:Zero.', category:'Other'},
  {id:'tohka', name:'Tohka Yatogami', price:800, priceText:'800tk', imgs:['assets/tohka1.jpg','assets/tohka2.jpg','assets/tohka3.jpg'], desc:'Tohka Yatogami figure Size:28cm from Date a Live Girl.', category:'Other'},
  {id:'chibi1', name:'Chibi Zenitsu', price:500, priceText:'500tk', imgs:['assets/zenitsu.small.jpg'], desc:'Chibi cute Zenitsu figure Size:8cm from Demon Slayer.', category:'Demon Slayer'},
  {id:'chibi2', name:'Chibi Nezuko', price:500, priceText:'500tk', imgs:['assets/nezuko.small.jpg'], desc:'Chibi cute Nezuko figure Size:8cm from Demon Slayer.', category:'Demon Slayer'},
  {id:'zoro1', name:'Zoro Three Swords', price:900, priceText:'900tk', imgs:['assets/zoro1.jpeg','assets/zoro2.jpeg','assets/zoro3.jpeg'], desc:'Zoro Three Sword Figure Size:23.5cm from One Piece.', category:'One Piece'},
  {id:'pw1', name:'Pocket Watch OP', price:900, priceText:'900tk', imgs:['assets/opw1.JPEG','assets/opw2.JPEG','assets/opw3.JPEG'], desc:'One Piece Pocket Watch from One Piece.', category:'One Piece'},
  {id:'mini1', name:'Mini Naruto Set', price:300, priceText:'300tk', imgs:['assets/n1.jpeg','assets/n2.jpeg','assets/n3.JPEG'], desc:'Cute mini figures (each) Size:8cm from Naruto.', category:'Naruto'},
  {id:'mini2', name:'Mini Naruto Set', price:300, priceText:'300tk', imgs:['assets/n4.JPG'], desc:'Cute mini figures(each) Size:6.5cm from Naruto.', category:'Naruto'},
  {id:'mini3', name:'Mini Naruto Set', price:350, priceText:'350tk', imgs:['assets/n5.JPG'], desc:'Cute mini figures(each) Size:10cm from Naruto.', category:'Naruto'},
  {id:'gojol', name:'Labubu Gojo', price:800, priceText:'800tk', imgs:['assets/lgojo1.JPG'], desc:'Cute Labubu Gojo from Jujutsu Kaisen.', category:'Jujutsu Kaisen'}
];

/* ====== SELECTORS ====== */
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortBy');
const modalWrap = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalThumbs = document.getElementById('modalThumbs');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalCloseBtn = document.getElementById('modalCloseBtn');

/* ====== RENDER PRODUCTS ====== */
function renderProducts(list = products) {
  productsGrid.innerHTML = '';
  if (!list.length) {
    productsGrid.innerHTML = '<p style="text-align:center;color:#aaa;">No results found.</p>';
    return;
  }

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="thumb"><img src="${p.imgs[0]}" alt="${p.name}"></div>
      <div class="p-title">${p.name}</div>
      <div class="p-desc">${p.desc}</div>
      <div class="p-price">${p.priceText}</div>
    `;
    card.addEventListener('click', () => openModal(p));
    productsGrid.appendChild(card);
  });
}

/* ====== SEARCH & FILTER ====== */
function filterAndRender() {
  let q = (searchInput.value||'').toLowerCase().trim();
  let cat = categorySelect.value;
  let list = products.filter(p => {
    const matchQ = q ? p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) : true;
    const matchCat = cat ? p.category === cat : true;
    return matchQ && matchCat;
  });

  const sort = sortSelect.value;
  if(sort==='price-asc') list.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc') list.sort((a,b)=>b.price-a.price);
  if(sort==='name-asc') list.sort((a,b)=>a.name.localeCompare(b.name));

  renderProducts(list);
}

searchInput.addEventListener('input', () => filterAndRender());
categorySelect.addEventListener('change', () => filterAndRender());
sortSelect.addEventListener('change', () => filterAndRender());

/* ====== MODAL ====== */
let currentProduct = null;
function openModal(prod){
  currentProduct = prod;
  modalTitle.textContent = prod.name;
  modalDesc.textContent = prod.desc;
  modalPrice.textContent = prod.priceText;
  modalImage.src = prod.imgs[0];
  modalThumbs.innerHTML = '';

  prod.imgs.forEach((src,i)=>{
    const t = document.createElement('img');
    t.src = src;
    if(i===0) t.classList.add('active');
    t.addEventListener('click', ()=>{
      modalImage.src = src;
      modalThumbs.querySelectorAll('img').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
    });
    modalThumbs.appendChild(t);
  });

  modalWrap.classList.add('open');
  modalWrap.setAttribute('aria-hidden','false');
}
modalCloseBtn.addEventListener('click', ()=>{ modalWrap.classList.remove('open'); modalWrap.setAttribute('aria-hidden','true'); });
modalWrap.addEventListener('click', (e)=>{ if(e.target === modalWrap) modalWrap.classList.remove('open'); modalWrap.setAttribute('aria-hidden','true'); });

/* ====== INITIAL RENDER ====== */
renderProducts();
