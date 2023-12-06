import React from 'react';
import avatar from '../images/Jak-Iv-Kusto.jpg';
import Api from '../utils/Api';
import Card from './Card';
import { currentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  // const [userName, setUserName] = React.useState();
  // const [userDescription, setUserDescription] = React.useState();
  // const [userAvatar, setUserAvatar] = React.useState();
  // const [cards, setCards] = React.useState([]);
  const current = React.useContext(currentUserContext);

  // React.useEffect(() => {
  //   Api.getInitialCards()
  //     .then(cards => {
  //       props.setCards(cards);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" src={current.avatar} alt="Фото пользователя" />
          <button
            className="profile__avatar-button"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{current.name}</h1>
          <button
            type="button"
            aria-label="Редактировать"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle">{current.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places">
        {props.cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            setCards={props.setCards}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
