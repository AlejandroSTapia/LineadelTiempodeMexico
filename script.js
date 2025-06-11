const previewImg = document.getElementById("preview-img");
const previewTitle = document.getElementById("preview-title");
const previewText = document.getElementById("preview-text");

// Animación adicional de scroll horizontal
const timeline = document.querySelector('.timeline');
const items = document.querySelectorAll('.timeline ol li');


function updatePreview(item) {
  const imgSrc = item.dataset.img;
  const title = item.querySelector("h3");
  const text = item.querySelector("p");

  previewImg.src = imgSrc || "";
  previewTitle.textContent = title?.textContent || "";
  previewText.textContent = text?.textContent || "";
}


function setActiveItem() {
  const centerX = window.innerWidth / 2;
  let closest = null;
  let minDiff = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const diff = Math.abs(centerX - itemCenter);
    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  });

  const atStart = timeline.scrollLeft === 0;
  const atEnd = Math.ceil(timeline.scrollLeft + timeline.offsetWidth) >= timeline.scrollWidth;

  if (atStart) {
    closest = items[0];
  }
  if (atEnd) {
    closest = items[items.length - 1];
  }


  items.forEach(item => item.classList.remove('active'));
   if (closest) {
    closest.classList.add('active');
    updatePreview(closest); // <-- Aquí actualizamos el preview
  }
}

timeline.addEventListener('wheel', e => {
  e.preventDefault();
  timeline.scrollLeft += e.deltaY;
  setActiveItem();
});

document.querySelectorAll('.timeline li').forEach((li) => {
  li.addEventListener('click', () => {
    // Quitar clase activa de todos
    document.querySelectorAll('.timeline li').forEach(el => el.classList.remove('active'));
    
    // Agregar clase activa al clicado
    li.classList.add('active');

    // Actualizar contenido del preview
    const img = li.getAttribute('data-img');
    const title = li.querySelector('h3')?.textContent || '';
    const text = li.querySelector('p')?.textContent || '';

    document.getElementById('preview-img').src = img;
    document.getElementById('preview-title').textContent = title;
    document.getElementById('preview-text').textContent = text;
  });
});


setActiveItem();
