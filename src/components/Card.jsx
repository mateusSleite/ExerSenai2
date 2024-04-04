import style from '../App.module.css';

export const Card = ({ name, desc, value, image, status }) => {
  return (
    <div className={style.card}>
      <h1>{name}</h1>
      <h2>{desc}</h2>
      <p>{value}</p>
      <img src={image} alt={name} width={150} height={"auto"} />
      <div className={`${style.indicator} ${status ? style.true : style.false}`}></div>
    </div>
  );
};
