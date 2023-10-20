import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}

gallery.insertAdjacentHTML("afterbegin", createMarkup(galleryItems));
gallery.addEventListener("click", handlerClick);

const instance = basicLightbox.create(
  `<img class="gallery__image" width ="1140" height ="auto" src=""/>`,
  {
    onShow: (instance) => window.addEventListener("keydown", onEscKeyPress),
    onClose: (instance) => window.removeEventListener("keydown", onEscKeyPress),
  }
);

function handlerClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const photo = event.target.dataset.source;
  instance.element().querySelector("img").src = photo;
  instance.show();
}

function onEscKeyPress(event) {
  if (event.code !== "Escape") return;
  instance.close();
}
