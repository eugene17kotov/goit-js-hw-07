import { galleryItems } from './gallery-items.js';

// DONE 1) Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// DONE 2) Реализация делегирования на div.gallery и получение url большого изображения.
// DONE 3) Подключение скрипта и стилей библиотеки модального окна basicLightbox с помощью CDN сервис jsdelivr (.min)
// DONE 4) Открытие модального окна по клику на элементе галереи.
// DONE 5) Замена значения атрибута src элемента < img > в модальном окне перед открытием. Использовать готовую разметку библиотеки basicLightbox
// DONE 6) Добавь закрытие модального окна по нажатию клавиши Escape

const galleryRef = document.querySelector('.gallery');

galleryRef.addEventListener('click', onGalleryImageClick);

let lightboxGallery;

function createGallery(array) {
    const galleryItemsMarkup = getGalleryItemsMarkup(array);
    getGalleryItemsToHtml(galleryItemsMarkup);
}

createGallery(galleryItems);

function getGalleryItemsMarkup(array) {
    return array
        .map(({ preview, original, description }) => {
            return `<div class="gallery__item">
    <a class="gallery__link" href=${original}>
        <img
            class="gallery__image"
            src='${preview}'
            data-source="${original}"
            alt='${description}'
        />
    </a>
</div>`;
        })
        .join('');
}

function getGalleryItemsToHtml(markup) {
    galleryRef.innerHTML = markup;
}

function onGalleryImageClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'IMG') {
        return;
    }

    const imgSrc = e.target.dataset.source;
    const lightboxImg = getLightbox(imgSrc);

    lightboxGallery = basicLightbox.create(lightboxImg, {
        onShow: () => {
            document.addEventListener('keydown', onEscPress);
        },
        onClose: () => {
            document.removeEventListener('keydown', onEscPress);
        },
    });
    lightboxGallery.show();
}

function getLightbox(img) {
    return `<img src="${img}" width="800" height="600">`;
}

function onEscPress(e) {
    if (e.code !== 'Escape') {
        return;
    }
    lightboxGallery.close();
}
