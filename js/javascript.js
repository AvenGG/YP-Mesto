// --- Popup Edit
const editButton = document.querySelector('.info__edit-button');

const popup = document.querySelector('.popup');
const saveForm = document.querySelector('.popup__form');
const popupEditCloseButton = document.querySelector('.popup__close');

const infoName = document.querySelector('.info__name');
const infoAbout = document.querySelector('.info__description');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');

// --- Popup Add
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const saveAddForm = document.querySelector('.popup-add__form');
const popupAddCloseButton = document.querySelector('.popup-add__close');

const popupAddInput = {
    cardTitle: document.querySelector('.popup-add__place-name'),
    cardLink: document.querySelector('.popup-add__place-link')
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
        cardLink: "/images/lakes.jpg" },
    { 
        cardTitle:"Ливадия",
        cardLink: "/images/livadia.jpg" },
    { 
        cardTitle:"Вторая речка",
        cardLink: "/images/home.jpg"
    }
];

// --- Image
const popupImage = document.querySelector('.popup-image');
const popupImageCloseButton = document.querySelector('.popup-image__close');

const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarButton = document.querySelector('.profile__image-container');

const audioDelete = document.querySelector("#mySoundDelete");
const audioLike = document.querySelector("#mySoundLike");

const clock = document.querySelector('.header__clock');

function popupEditOpen(){
    popupName.value = infoName.textContent;
    popupAbout.value = infoAbout.textContent;
    popup.classList.add('popup_visible');
}

function popupEditClose(){
    popup.classList.remove('popup_visible');
}

function popupEditSave(evt){
    evt.preventDefault();
    infoName.textContent = popupName.value;
    infoAbout.textContent = popupAbout.value;
    popupEditClose();
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
        popupImageOpen();
    });
    block.prepend(newElement);
}

function popupImageOpen(){
    popupImage.classList.add('popup-image_opened');
}

//Добавление карточек при загрузке
initialCards.forEach(item => {
    createCard(item, elementTemplate, elements);
});

function popupAddOpen(){
    popupAddInput.cardTitle.value = '';
    popupAddInput.cardLink.value = '';
    popupAddInput.cardTitle.placeholder = 'Название';
    popupAddInput.cardLink.placeholder = 'Ссылка';
    popupAdd.classList.add('popup-add_visible');
}

function popupAddClose(){
    popupAdd.classList.remove('popup-add_visible');
}

function addCard(){
    if (!(popupAddInput.cardTitle.value === '' || popupAddInput.cardLink.value === '')){
        let card = {
            cardTitle:popupAddInput.cardTitle.value,
            cardLink: popupAddInput.cardLink.value
        };
        createCard(card, elementTemplate, elements);
        popupAddClose();
    }else{
        popupAddClose();
    }
}

function popupAddSave(evt){
    evt.preventDefault();
    addCard();
}

function popupImageClose(){
    popupImage.classList.remove('popup-image_opened');
}

/// --- Обработчики
editButton.addEventListener('click', popupEditOpen);
popupEditCloseButton.addEventListener('click', popupEditClose);
saveForm.addEventListener('submit', popupEditSave);

addButton.addEventListener('click', popupAddOpen);
popupAddCloseButton.addEventListener('click', popupAddClose);
saveAddForm.addEventListener('submit', popupAddSave);

popupImageCloseButton.addEventListener('click', popupImageClose);

profileAvatarButton.addEventListener('click', function(){
    popupImage.querySelector('.popup-image__image').src = profileAvatar.src;
    popupImage.querySelector('.popup-image__subscription').textContent =  infoName.textContent + ": " +infoAbout.textContent;
    popupImageOpen();
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