import React from 'react';
import avatar from '../images/Jak-Iv-Kusto.jpg';
import Api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Api.getInfoUser()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch(error => {
        console.error(error);
      });
    Api.getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src={userAvatar} alt="Фото пользователя" />
          <button
            className="profile__avatar-button"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            type="button"
            aria-label="Редактировать"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places">
        {cards.map(card => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
