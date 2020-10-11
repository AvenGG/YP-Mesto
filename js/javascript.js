const page = document.querySelector('.page');
const audioDelete = document.querySelector("#mySoundDelete");
const audioLike = document.querySelector("#mySoundLike");
const clock = document.querySelector('.header__clock');

const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarButton = document.querySelector('.profile__image-container');
// --- Popup Edit
const editButton = document.querySelector('.info__edit-button');
const infoName = document.querySelector('.info__name');
const infoAbout = document.querySelector('.info__description');

// --- Popup Add
const addButton = document.querySelector('.profile__add-button');

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
class Popup {
    constructor(popup) {
        this.main = document.querySelector(popup);
        this.overlay = this.main.querySelector('.popup__overlay');
        this.closeButton = this.main.querySelector('.popup__close');
        this.body = document.querySelector('body');
        this.scrollWidth = this.getScrollWidth();
        this.addEventListeners();
    }
    getScrollWidth(){
        let div = document.createElement('div');
        div.style.overflowY = 'scroll';
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    addEventListeners() {
          this.overlay.addEventListener('click', () => this.toggle());
          this.closeButton.addEventListener('click', () => this.toggle());
    }
      
    toggle(){
        this.main.classList.toggle('popup_active');
        if (this.main.classList.contains('popup_active')){
            this.body.style.overflow = 'hidden';
            this.body.style.paddingRight = `${this.scrollWidth}px`;
        }
        else{
            this.body.style.overflow = 'visible';
            this.body.style.paddingRight = '0px';
        }
    }
}

class Popup_image extends Popup{
    constructor(popup){
        super(popup);
        this.image = this.main.querySelector('.popup-image__image');
        this.subscription = this.main.querySelector('.popup-image__subscription');
    }
    open(src,subscription){
        this.image.src = src;
        this.subscription.textContent = subscription;
        this.toggle();
    }
}

class Popup_edit extends Popup{
    constructor(popup){
        super(popup);
        this.saveForm = this.main.querySelector('.popup__form');
        this.popupName = this.main.querySelector('.popup_name');
        this.popupAbout = this.main.querySelector('.popup_about');
        this.infoName = document.querySelector('.info__name');
        this.infoAbout = document.querySelector('.info__description');
        this.saveForm.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this.save();
        });
    }

    open(){
        this.popupName.value = this.infoName.textContent;
        this.popupAbout.value = this.infoAbout.textContent;
        this.toggle();
    }

    save(){
        this.infoName.textContent = this.popupName.value;
        this.infoAbout.textContent = this.popupAbout.value;
        this.toggle();
    }
}

class Popup_add extends Popup{
    constructor(popup){
        super(popup);
        this.saveAddForm = this.main.querySelector('.popup__form');
        this.popupAddInput = {
            cardTitle: this.main.querySelector('.popup_add_place-name'),
            cardLink: this.main.querySelector('.popup_add_place-link')
        };
        this.saveAddForm.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this.addCard();
        });
    }
    open(){
        this.popupAddInput.cardTitle.value = '';
        this.popupAddInput.cardLink.value = '';
        this.popupAddInput.cardTitle.placeholder = 'Название';
        this.popupAddInput.cardLink.placeholder = 'Ссылка';
        this.toggle();
    }
    addCard(){
        if (!(this.popupAddInput.cardTitle.value === '' || this.popupAddInput.cardLink.value === '')){
            let card = {
                cardTitle: this.popupAddInput.cardTitle.value,
                cardLink: this.popupAddInput.cardLink.value
            };
            createCard(card);
            this.toggle();
        }else{
            this.toggle();
        }
    }
}



//------------Добавление карточек
function createCard(content){
    const newElement = elementTemplate.cloneNode(true);
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
    elements.prepend(newElement);
}

//Добавление карточек при загрузке
initialCards.forEach(item => {
    createCard(item);
});

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

function lettersAnimation(){
    const letters = document.querySelectorAll('.footer__letter');
    function letterUp(){
        this.classList.add('footer__letter-up-one');
        if(this.previousElementSibling != null)
            this.previousElementSibling.classList.add('footer__letter-up-two');
        if(this.nextElementSibling!= null)
            this.nextElementSibling.classList.add('footer__letter-up-two');
    }
    function letterDown(){
        setTimeout(()=>this.classList.remove('footer__letter-up-one'),100);
        if(this.previousElementSibling != null)
            setTimeout(()=>this.previousElementSibling.classList.remove('footer__letter-up-two'),100);
        if(this.nextElementSibling!= null)
            setTimeout(()=>this.nextElementSibling.classList.remove('footer__letter-up-two'),100); 
    }
    Array.from(letters).forEach((item)=>{
        item.addEventListener('mouseover', letterUp);
        item.addEventListener('mouseout', letterDown);
    });
};

//Creating event listeners after page load
window.onload = function(){
    const popupImage = new Popup_image('.popup_image');
    const popupEdit = new Popup_edit('.popup_edit');
    const popupAdd = new Popup_add('.popup_add');

    addButton.addEventListener('click', () => {
        popupAdd.open();
    })

    profileAvatarButton.addEventListener('click', () =>{
        popupImage.open(profileAvatar.src, infoName.textContent + ": " +infoAbout.textContent);
    });
    
    editButton.addEventListener('click', ()=>{
        popupEdit.open();
    });

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
    });
    lettersAnimation();
}
