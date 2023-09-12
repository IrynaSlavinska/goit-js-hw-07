import { galleryItems } from "./gallery-items.js";
// Change code below this line

// * 1. Створення і рендер розмітки на підставі масиву даних galleryItems і
// * наданого шаблону елемента галереї.

// * 2. Реалізація делегування на ul.gallery і отримання url великого зображення.

// * 3. Підключення скрипту і стилів бібліотеки модального вікна
// * basicLightbox.Використовуй CDN сервіс jsdelivr і додай у проект
// * посилання на мініфіковані(.min) файли бібліотеки.

// *4. Відкриття модального вікна по кліку на елементі галереї.
// * Для цього ознайомся з документацією і прикладами.

// * 5. Заміна значення атрибута src елемента <img> в модальному вікні
// * перед відкриттям.Використовуй готову розмітку модального вікна із
// * зображенням з прикладів бібліотеки basicLightbox.

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

function createGalleryMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `
    )
    .join("");
}

gallery.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));
gallery.addEventListener("click", openLargeImgOnClick);

function openLargeImgOnClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  console.log(event.target);
  const imgDataset = event.target.dataset.source;
  const imgDescription = event.target.alt;

  const instance = basicLightbox.create(
    `
           <img src="${imgDataset}"
           alt="${imgDescription}"/>
        `,
    {
      onClose: () => {
        document.removeEventListener("keydown", onEscClick);
      },
    }
  );

  instance.show();

  document.addEventListener("keydown", onEscClick);

  function onEscClick(event) {
    if (event.code === "Escape") {
      instance.close();
    }
    console.log(event.code);
  }
}
