import myGallery from './gallery-items.js';

const refs = {
    galleryContainer: document.querySelector('.js-gallery'),
    
    modal: document.querySelector('.js-lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    modalContent: document.querySelector('.lightbox__content'),
    modalImage: document.querySelector('.lightbox__image'),
    buttonClose: document.querySelector('[data-action="close-lightbox"]'),
};


refs.galleryContainer.insertAdjacentHTML("beforeend", createGalleryCardMarkup(myGallery));
refs.galleryContainer.addEventListener('click', onGalleryContainerClick);
refs.buttonClose.addEventListener('click', closeModal);

function createGalleryCardMarkup(images) {
    return images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
                    <a class="gallery__link"
                     href='${original}'>
                         <img class="gallery__image"
                          src='${preview}'
                          data-source='${original}'
                          alt='${description}' />
                    </a>
                    </li>`
    }).join("");
};

function onGalleryContainerClick(event) {
     event.preventDefault();
    if (event.target.nodeName!=='IMG') {
        return
    }
    refs.modalImage.src = event.target.dataset.source;
    refs.modalImage.alt = event.target.alt;
    refs.modal.classList.add('is-open');
    
    refs.overlay.addEventListener('click', modalCloseOverlayClick);
    window.addEventListener('keydown', modalCloseEscClick);
    refs.buttonClose.addEventListener('click', closeModal);
    // window.addEventListener('keydown', scrolling);
     
};


function closeModal(event) {
   
    refs.modal.classList.remove('is-open');
    refs.overlay.removeEventListener('click', modalCloseOverlayClick);
    window.removeEventListener('keydown', modalCloseEscClick);
    refs.buttonClose.removeEventListener('click', closeModal);
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
}

function modalCloseEscClick(event) {
    if (event.code === "Escape") {
        closeModal(event)        
    }
};

function modalCloseOverlayClick(event) {
    if (event.currentTarget === event.target) {
        closeModal(event)      
    }
};
  