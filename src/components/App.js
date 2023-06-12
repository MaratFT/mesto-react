document.body.classList.add('page');

import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false, link: '', name: '' });
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, link: card.link, name: card.name });
  }

  return (
    <div>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name={'profile'}
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen}
        buttonTitle={'Сохранить'}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          placeholder="Имя"
          className="popup__field"
          id="user-name-input"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error popup__error_visible" id="user-name-input-error"></span>
        <input
          type="text"
          name="about"
          placeholder="О себе"
          className="popup__field"
          id="about-me-input"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error popup__error_visible" id="about-me-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        isOpen={isEditAvatarPopupOpen}
        buttonTitle={'Сохранить'}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          className="popup__field"
          id="avatar-image-input"
          required
        />
        <span className="popup__error popup__error_visible" id="avatar-image-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name={'add'}
        title={'Новое место'}
        isOpen={isAddPlacePopupOpen}
        buttonTitle={'Создать'}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          placeholder="Название"
          className="popup__field"
          id="image-name-input"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__error popup__error_visible" id="image-name-input-error"></span>
        <input
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__field"
          id="image-input"
          required
        />
        <span className="popup__error popup__error_visible" id="image-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name={'confirmation'}
        title={'Вы уверены?'}
        isOpen={''}
        buttonTitle={'Да'}
        onClose={closeAllPopups}
      />

      <template id="place-template">
        <article className="place">
          <img className="place__image" src="#" alt="" />
          <button type="button" aria-label="Удалить" className="place__remove"></button>
          <div className="place__title-like">
            <h2 className="place__title"></h2>
            <div className="place__container-like">
              <button type="button" aria-label="Нравится" className="place__like"></button>
              <p className="place__like-number">0</p>
            </div>
          </div>
        </article>
      </template>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <div className="popup popup_image-scale">
        <div className="popup__image">
          <img className="popup__image-view" src="#" alt="" />
          <p className="popup__image-title"></p>
          <button
            type="button"
            aria-label="Закрыть"
            className="popup__close popup__close-image"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default App;
