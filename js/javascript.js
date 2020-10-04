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
        cardLink: "http://s4.fotokto.ru/photo/full/345/3458246.jpg" },
    { 
        cardTitle:"Зарубино",
        cardLink: "https://www.primorsky.ru/upload/iblock/85a/85a5b468ad515fac00bb14470cea5ec9.jpg" },
    { 
        cardTitle:"Комета",
        cardLink: "https://ski2.ru/statics/upload/curort/576/5870f57389e8d.jpg"},
    { 
        cardTitle:"Триозёрье",
        cardLink: "images/lakes.webp" },
    { 
        cardTitle:"Ливадия",
        cardLink: "images/livadia.webp" },
    { 
        cardTitle:"Вторая речка",
        cardLink: "images/home.webp"
    }
];

// --- Image
const popupImage = document.querySelector('.popup_image');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupImageOverlay = popupImage.querySelector('.popup__overlay');

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
    });
    newElement.deleteElement.addEventListener('click', function(){
        audioDelete.play();
    });
    newElement.imageButton = newElement.querySelector('.element__image-button');
    newElement.imageButton.addEventListener('click', function(){
        popupImage.querySelector('.popup-image__image').src = content.cardLink;
        popupImage.querySelector('.popup-image__subscription').textContent = content.cardTitle;
        popupToggle(popupImage);
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

popupImageCloseButton.addEventListener('click', () => popupToggle(popupImage));

profileAvatarButton.addEventListener('click', () =>{
    popupImage.querySelector('.popup-image__image').src = profileAvatar.src;
    popupImage.querySelector('.popup-image__subscription').textContent =  infoName.textContent + ": " +infoAbout.textContent;
    popupToggle(popupImage);
});

popupEditOverlay.addEventListener('click', () => popupToggle(popupEdit));
popupAddOverlay.addEventListener('click', () => popupToggle(popupAdd));
popupImageOverlay.addEventListener('click', () => popupToggle(popupImage));

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