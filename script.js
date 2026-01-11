// ===== Sakura Background =====
const sakuraContainer = document.getElementById('sakura-container');
for (let i = 0; i < 35; i++) {
  const s = document.createElement('span');
  s.className = 'sakura';
  s.style.left = Math.random() * 100 + 'vw';
  s.style.animationDuration = 8 + Math.random() * 6 + 's';
  s.style.animationDelay = Math.random() * 5 + 's';
  sakuraContainer.appendChild(s);
}

// ===== Product Data (UNCHANGED) =====
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


// ===== Render Products =====
const grid = document.getElementById('shop');
function renderProducts(list){
  grid.innerHTML='';
  if(!list.length){
    document.getElementById('noResults').style.display='block';
    return;
  }
  document.getElementById('noResults').style.display='none';

  list.forEach(p=>{
    const card = document.createElement('div');
    card.className='product-card';
    card.innerHTML = `
      <img src="${p.imgs[0]}" alt="${p.name}">
      <h4>${p.name}</h4>
      <span class="price">${p.priceText}</span>
      <p>${p.desc}</p>
    `;
    card.onclick = ()=> openModal(p);
    grid.appendChild(card);
  });
}
renderProducts(products);

// ===== Modal =====
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');

let currentProd=null, currentIndex=0;

function openModal(p){
  currentProd=p;
  currentIndex=0;
  modal.classList.add('open');
  updateModal();
}
function updateModal(){
  modalImg.src=currentProd.imgs[currentIndex];
  modalTitle.textContent=currentProd.name;
  modalDesc.textContent=currentProd.desc;
  modalPrice.textContent=currentProd.priceText;
}

document.getElementById('modalClose').onclick=()=>modal.classList.remove('open');
document.getElementById('prevImg').onclick=e=>{
  e.stopPropagation();
  currentIndex=(currentIndex-1+currentProd.imgs.length)%currentProd.imgs.length;
  updateModal();
};
document.getElementById('nextImg').onclick=e=>{
  e.stopPropagation();
  currentIndex=(currentIndex+1)%currentProd.imgs.length;
  updateModal();
};

document.getElementById('year').textContent=new Date().getFullYear();


