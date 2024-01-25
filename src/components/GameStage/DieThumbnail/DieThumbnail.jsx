import style from './die-thumb-styles.module.scss';

const DieThumbnail = ({ color, face }) => {

  return (
    <div className={style['container']}>
      <img src={`../../src/assets/images/die-image-${face}-${color}.jpg`} alt={`${color}-${face} die`} />
    </div>
  )
}

export default DieThumbnail;
