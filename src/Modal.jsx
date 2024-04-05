import React from 'react';
import { Tilt } from 'react-tilt'
import style from './App.module.css';

const Modal = ({ character, closeModal }) => {

  const defaultOptions = {
    reverse:        false,  // inverter a direção da inclinação
    max:            35,     // máxima rotação de inclinação (graus)
    perspective:    1000,   // perspectiva de transformação, quanto menor, mais extrema a inclinação fica
    scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc.
    speed:          1000,   // velocidade da transição de entrada/saída
    transition:     true,   // definir uma transição na entrada/saída
    axis:           null,   // qual eixo deve ser desativado. Pode ser X ou Y.
    reset:          true,    // se o efeito de inclinação deve ser redefinido na saída
    easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing na entrada/saída.
  }

  return (
    <div className={style.modalBackdrop} onClick={closeModal}>
      <Tilt options={defaultOptions}>
        <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
          <h2>{character.name}</h2>
          <p>Espécie: {character.species}</p>
          <p>Gênero: {character.gender}</p>
          <img src={character.image} alt={character.name} />
          <button onClick={closeModal}>Fechar</button>
        </div>
      </Tilt>
    </div>
  );
};

export default Modal;
