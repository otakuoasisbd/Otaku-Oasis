// ====== Product Data ======
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

// ====== Render Products ======
const grid = document.getElementById('shop');
function renderProducts(list){
  grid.innerHTML='';
  if(!list.length){ document.getElementById('noResults').style.display='block'; return; }
  document.getElementById('noResults').style.display='none';
  list.forEach(p=>{
    const card = document.createElement('div'); card.className='product-card';
    card.innerHTML = `<img src="${p.imgs[0]}" alt="${p.name}">
                      <h4>${p.name}</h4>
                      <p>${p.desc}</p>`;
    card.addEventListener('click', ()=> openModal(p));
    grid.appendChild(card);
  });
}
renderProducts(products);

// ====== Search & Filter ======
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');

function filterRender(){
  let list = products.filter(p=>{
    const q = searchInput.value.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    const matchCat = !categoryFilter.value || p.category === categoryFilter.value;
    return matchSearch && matchCat;
  });
  if(sortBy.value==='name-asc') list.sort((a,b)=>a.name.localeCompare(b.name));
  if(sortBy.value==='price-asc') list.sort((a,b)=>0); // placeholder, add price if you want
  renderProducts(list);
}
searchInput.addEventListener('input', filterRender);
categoryFilter.addEventListener('change', filterRender);
sortBy.addEventListener('change', filterRender);

// ====== Modal ======
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');
const prevImg = document.getElementById('prevImg');
const nextImg = document.getElementById('nextImg');

let currentProd=null;
let currentIndex=0;

function openModal(prod){
  currentProd=prod;
  currentIndex=0;
  modal.classList.add('open');
  updateModal();
}
function updateModal(){
  modalImg.src = currentProd.imgs[currentIndex];
  modalTitle.textContent = currentProd.name;
  modalDesc.textContent = currentProd.desc;
}
modalClose.addEventListener('click', ()=> modal.classList.remove('open'));
modal.addEventListener('click', e=> { if(e.target===modal) modal.classList.remove('open'); });
prevImg.addEventListener('click', e=> { e.stopPropagation(); currentIndex=(currentIndex-1+currentProd.imgs.length)%currentProd.imgs.length; updateModal(); });
nextImg.addEventListener('click', e=> { e.stopPropagation(); currentIndex=(currentIndex+1)%currentProd.imgs.length; updateModal(); });

// ====== Dynamic Waterfall Background ======
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
let width=canvas.width=window.innerWidth;
let height=canvas.height=window.innerHeight;
window.addEventListener('resize', ()=>{ width=canvas.width=window.innerWidth; height=canvas.height=window.innerHeight; initDrops(); });

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
let drops=[];
const fontSize = 16;
const columns = Math.floor(width/fontSize);
function initDrops(){ drops=[]; for(let x=0;x<columns;x++) drops[x]=Math.random()*height; }
initDrops();

function draw(){
  ctx.fillStyle='rgba(0,0,0,0.05)';
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle='rgba(95,255,255,0.8)';
  ctx.font=fontSize+'px monospace';
  for(let i=0;i<drops.length;i++){
    const text=letters.charAt(Math.floor(Math.random()*letters.length));
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    drops[i]+=1;
    if(drops[i]*fontSize>height && Math.random()>0.975) drops[i]=0;
  }
  requestAnimationFrame(draw);
}
draw();

document.getElementById('year').textContent=new Date().getFullYear();
