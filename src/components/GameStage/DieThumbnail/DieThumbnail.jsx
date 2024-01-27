import style from './die-thumb-styles.module.scss';

const DieThumbnail = ({ color, face }) => {

  return (
    <span className={style['container']}>
      <img src={`/images/die-image-${face}-${color}.jpg`} />
    </span>
  )
}

export default DieThumbnail;
