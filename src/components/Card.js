function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="place">
      <img
        className="place__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button type="button" aria-label="Удалить" className="place__remove"></button>
      <div className="place__title-like">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__container-like">
          <button type="button" aria-label="Нравится" className="place__like"></button>
          <p className="place__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
