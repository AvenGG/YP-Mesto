const page = document.querySelector('.page');
const audioDelete = document.querySelector("#mySoundDelete");
const audioLike = document.querySelector("#mySoundLike");
const clock = document.querySelector('.header__clock');

// --- Popup Edit
const editButton = document.querySelector('.info__edit-button');
const infoName = document.querySelector('.info__name');
const infoAbout = document.querySelector('.info__description');

const popupEdit = document.querySelector('.popup_edit');
const saveForm = popupEdit.querySelector('.popup__form');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const popupName = popupEdit.querySelector('.popup_name');
const popupAbout = popupEdit.querySelector('.popup_about');
const popupEditOverlay = popupEdit.querySelector('.popup__overlay');

// --- Popup Add
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const saveAddForm = popupAdd.querySelector('.popup__form');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddOverlay = popupAdd.querySelector('.popup__overlay');

const popupAddInput = {
    cardTitle: popupAdd.querySelector('.popup_add_place-name'),
    cardLink: popupAdd.querySelector('.popup_add_place-link')
};

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#elements__element-template').content;

const initialCards = [
    { 
        cardTitle:"Пидан",
        cardLink: "images/pidan.webp",
        cardLinkFullSize: "images/full/pidan.webp" },
    { 
        cardTitle:"Зарубино",
        cardLink: "images/zarubino.webp",
        cardLinkFullSize: "images/full/zarubino.webp" },
    { 
        cardTitle:"Комета",
        cardLink: "images/cometa.webp",
        cardLinkFullSize: "images/full/cometa.webp"},
    { 
        cardTitle:"Триозёрье",
        cardLink: "images/lakes.webp",
        cardLinkFullSize: "images/full/lakes.webp" },
    { 
        cardTitle:"Ливадия",
        cardLink: "images/livadia.webp",
        cardLinkFullSize: "images/full/livadia.webp" },
    { 
        cardTitle:"Вторая речка",
        cardLink: "images/home.webp",
        cardLinkFullSize: "images/full/home.webp"
    }
];

// --- Image

class Popup_image {
    constructor() {
      this.main = document.querySelector('.popup_image');
      this.overlay = this.main.querySelector('.popup__overlay');
      this.image = this.main.querySelector('.popup-image__image');
      this.subscription = this.main.querySelector('.popup-image__subscription');
      this.closeButton = this.main.querySelector('.popup__close');
      this.eventListeners();
    }
  
    eventListeners() {
        this.overlay.addEventListener('click', () => this.toggle());
        this.closeButton.addEventListener('click', () => this.toggle());
    }
    open(src,subscription){
        this.image.src = src;
        this.subscription.textContent = subscription;
        this.toggle();
    }
    toggle(){
        popupToggle(this.main);
    }
}
const popupImage = new Popup_image();

const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarButton = document.querySelector('.profile__image-container');

function popupEditSave(evt){
    evt.preventDefault();
    infoName.textContent = popupName.value;
    infoAbout.textContent = popupAbout.value;
    popupToggle(popupEdit);
}

//------------Добавление карточек
function createCard(content, template, block){
    const newElement = template.cloneNode(true);
    newElement.querySelector('.element__title').textContent = content.cardTitle;
    newElement.querySelector('.element__image').src = content.cardLink;
    newElement.querySelector('.element__image').dataset.src = content.cardLinkFullSize;
    newElement.like = newElement.querySelector('.element__like');
    newElement.like.addEventListener('click', function(){
        newElement.like.classList.toggle('element__like-clicked');
    });
    newElement.like.addEventListener('click', function(){
        audioLike.play();
    });
    newElement.deleteElement = newElement.querySelector('.element__delete-button');
    newElement.deleteElement.addEventListener('click', function(){
        newElement.deleteElement.parentElement.remove();
        audioDelete.play();
    });
    block.prepend(newElement);
}

//Добавление карточек при загрузке
initialCards.forEach(item => {
    createCard(item, elementTemplate, elements);
});

function addCard(){
    if (!(popupAddInput.cardTitle.value === '' || popupAddInput.cardLink.value === '')){
        let card = {
            cardTitle: popupAddInput.cardTitle.value,
            cardLink: popupAddInput.cardLink.value
        };
        createCard(card, elementTemplate, elements);
        popupToggle(popupAdd);
    }else{
        popupToggle(popupAdd);
    }
}

function popupAddSave(evt){
    evt.preventDefault();
    addCard();
}

function popupToggle(element){
    element.classList.toggle('popup_active')
    if (element.classList.contains('popup_active')){
        page.style.overflow = 'hidden';

    }else{
        page.style.overflow = 'visible';

    }
}

/// --- Обработчики
editButton.addEventListener('click', () => {
    popupName.value = infoName.textContent;
    popupAbout.value = infoAbout.textContent;
    popupToggle(popupEdit);
});

popupEditCloseButton.addEventListener('click', ()=> popupToggle(popupEdit));
saveForm.addEventListener('submit', popupEditSave);

addButton.addEventListener('click', () => {
    popupAddInput.cardTitle.value = '';
    popupAddInput.cardLink.value = '';
    popupAddInput.cardTitle.placeholder = 'Название';
    popupAddInput.cardLink.placeholder = 'Ссылка';
    popupToggle(popupAdd);
});
popupAddCloseButton.addEventListener('click', () => popupToggle(popupAdd));
saveAddForm.addEventListener('submit', popupAddSave);


profileAvatarButton.addEventListener('click', () =>{
    popupImage.open(profileAvatar.src, infoName.textContent + ": " +infoAbout.textContent);
});

popupEditOverlay.addEventListener('click', () => popupToggle(popupEdit));
popupAddOverlay.addEventListener('click', () => popupToggle(popupAdd));

function setTime(){
    time = new Date();
    let h = time.getHours().toString();
    let m = time.getMinutes().toString();
    let s = time.getSeconds().toString();

    if (h.length < 2){
        h = '0' + h;
    };

    if (m.length < 2){
        m = '0' + m;
    };

    if (s.length < 2){
        s = '0' + s;
    };

    let timeStr = `${h}:${m}:${s}`;
    clock.textContent = timeStr;
};

setTime();
setInterval( setTime, 1000 );
(() => {
    'use strict';
    // Page is loaded
    const objects = document.querySelectorAll('.asyncImage');
    Array.from(objects).map((item) => {
      // Start loading image
      const img = new Image();
      img.src = item.dataset.src;
      // Once image is loaded replace the src of the HTML element
      img.onload = () => {
        item.classList.remove('asyncImage');
        return item.nodeName === 'IMG' ? 
          item.src = item.dataset.src :        
          item.style.backgroundImage = `url(${item.dataset.src})`;
      };
    });
    })();

  document.querySelector('.elements').addEventListener('click', (evt)=>{
      if(evt.target.classList.contains('element__image')){
        popupImage.open(evt.target.src, evt.target.parentElement.parentElement.querySelector('.element__title').textContent);
}   
})