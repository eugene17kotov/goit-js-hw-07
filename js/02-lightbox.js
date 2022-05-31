import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

createGallery(galleryItems);

let lightboxGallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

function createGallery(array) {
    const galleryItemsMarkup = getGalleryItemsMarkup(array);
    getGalleryItemsToHtml(galleryItemsMarkup);
}

function getGalleryItemsMarkup(array) {
    return array
        .map(({ preview, original, description }) => {
            return `
    <a class="gallery__item" href=${original}>
        <img
            class="gallery__image"
            src='${preview}'
            alt='${description}'
        />
    </a>`;
        })
        .join('');
}

function getGalleryItemsToHtml(markup) {
    galleryRef.innerHTML = markup;
}
