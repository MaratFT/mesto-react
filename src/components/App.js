import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { currentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Api.getInfoUser()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.addLike(card._id, !isLiked).then(newCard => {
      setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    Api.editInfoUser({ name: name, about: about })
      .then(data => {
        setCurrentUser({ ...currentUser, name: data.name, about: data.about });
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleUpdateAvatar(avatar) {
    Api.editAvatarUser({ avatar })
      .then(data => {
        setCurrentUser(data.avatar);
        closeAllPopups();
        setCurrentUser(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    Api.addCard({ name: name, link: link })
      .then(data => {
        setCurrentUser({ ...currentUser, name: data.name, link: data.link });
        closeAllPopups();
        setCards([data, ...cards]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    Api.getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            setCards={setCards}
            cards={cards}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

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
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
