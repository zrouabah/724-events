import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    // Inversement du chevron pour obtenir un ordre décroissant
  );
  const nextCard = () => {
    setTimeout(
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000
        // retrait de 1 pour ne plus dépasser du tableau
    );
  };
useEffect(() => {
    if (byDateDesc) {
        nextCard();
    }
});
return (
  <div className="SlideCardList">
    {byDateDesc?.map((event, idx) => (
      // Changement de place de la key
      <div key={event.title}>
        <div
            key={event.title}
            // Changement de la key
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
          <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((dot, radioIdx) => (
                <input
                  key={`radio-${dot.title}`} // changement de la key pour la rendre unique
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Remplacement de "idx" par "index" car idx est l'index du premier map, ici nous voulons l'index de la slide
                  readOnly // Correction d'une erreur console (un gestionnaire onChange est nécessaire avec la prop checked)
                />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);
};

export default Slider;