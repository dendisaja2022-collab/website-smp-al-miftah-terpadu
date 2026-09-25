const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Tutup menu':'Buka menu');menu.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Buka menu');menu.textContent='☰'}));}
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const cleanText=s=>esc(String(s||'').replace(/[#*_>`\[\]]/g,'').replace(/\n+/g,' '));
const img=i=>i?esc(String(i).replace(/^\//,'')):'';
const fmtDate=d=>{if(!d)return'';const x=new Date(d+'T00:00:00');return isNaN(x)?esc(d):x.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})};
const data=window.SCHOOL_CMS_DATA||{};
function renderCMS(){
  const berita=document.querySelector('#cms-berita');
  (data.berita||[]).forEach(x=>berita?.insertAdjacentHTML('afterbegin',`<article>${x.image?`<img src="${img(x.image)}" loading="lazy" alt="${esc(x.title)}">`:''}<span>${esc(x.category||'BERITA')}${x.date?' · '+fmtDate(x.date):''}</span><h3>${esc(x.title)}</h3><p>${cleanText(x.summary||x.body)}</p></article>`));
  const prestasi=document.querySelector('#cms-prestasi');
  (data.prestasi||[]).forEach(x=>prestasi?.insertAdjacentHTML('afterbegin',`<figure>${x.image?`<img src="${img(x.image)}" loading="lazy" alt="${esc(x.title)}">`:''}<figcaption><strong>${esc(x.title)}</strong><span>${esc(x.student||x.level||'')}${x.date?' · '+fmtDate(x.date):''}</span><span>${cleanText(x.body)}</span></figcaption></figure>`));
  const ekstra=document.querySelector('#cms-ekstrakurikuler');
  (data.ekstrakurikuler||[]).forEach(x=>ekstra?.insertAdjacentHTML('beforeend',`<article class="cms-card">${x.image?`<img src="${img(x.image)}" loading="lazy" alt="${esc(x.title)}">`:''}<div class="cms-card-body"><span class="cms-meta">EKSTRAKURIKULER${x.coach?' · Pembina: '+esc(x.coach):''}</span><h3>${esc(x.title)}</h3><p>${cleanText(x.body)}</p></div></article>`));
  const peng=document.querySelector('#cms-pengumuman');
  (data.pengumuman||[]).filter(x=>x.active!==false).forEach(x=>peng?.insertAdjacentHTML('beforeend',`<article class="cms-announcement">${x.image?`<img src="${img(x.image)}" loading="lazy" alt="${esc(x.title)}">`:''}<span class="cms-meta">${fmtDate(x.date)}</span><h3>${esc(x.title)}</h3><p>${cleanText(x.body)}</p></article>`));
  const gal=document.querySelector('#cms-galeri');
  (data.galeri||[]).forEach(x=>{const src=img(x.image),cap=esc(x.caption||x.title),cat=String(x.category||'kegiatan').toLowerCase().replace(/\s+/g,'-');if(src)gal?.insertAdjacentHTML('afterbegin',`<article class="photo-card" data-category="${esc(cat)}"><button class="photo-open" type="button" data-image="${src}" data-caption="${cap}"><img loading="lazy" src="${src}" alt="${cap}"><span class="zoom">Lihat foto ↗</span></button><div class="photo-text"><h3>${esc(x.title)}</h3></div></article>`)});
}
renderCMS();
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});b.classList.add('active');b.setAttribute('aria-pressed','true');document.querySelectorAll('.photo-card').forEach(card=>{card.hidden=b.dataset.filter!=='semua'&&card.dataset.category!==b.dataset.filter})}));
const dialog=document.querySelector('#lightbox'),image=document.querySelector('#lightbox-img'),caption=document.querySelector('#lightbox-caption');
document.addEventListener('click',e=>{const b=e.target.closest('.photo-open');if(!b)return;image.src=b.dataset.image;image.alt=b.dataset.caption||'';caption.textContent=b.dataset.caption||'';if(typeof dialog.showModal==='function')dialog.showModal();else window.open(b.dataset.image,'_blank','noopener')});
document.querySelector('.close-lightbox')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
