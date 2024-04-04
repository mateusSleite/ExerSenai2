import style from '../App.module.css';
import { useState } from 'react';

export const Alert = ({ message, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    show && (
      <div className={style.alertBackdrop} onClick={handleClose}>
        <div className={style.alert} onClick={(e) => e.stopPropagation()}>
          <p className={style.alertFont}>{message}</p>
          <button onClick={handleClose}>Fechar</button>
        </div>
      </div>
    )
  );
};
