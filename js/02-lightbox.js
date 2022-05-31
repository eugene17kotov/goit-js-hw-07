import { galleryItems } from './gallery-items.js';

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
            return `
    <a class="gallery__link" href=${original}>
        <img
            class="gallery__image"
            src=${preview}
            alt=${description}
        />
    </a>`;
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

    lightboxGallery = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
}
