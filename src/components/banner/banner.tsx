import { Promo } from '../../types/product';

type BannerProps = {
  card: Promo;
}

function Banner({card}: BannerProps): JSX.Element {
  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x" />
        <img src={card.previewImg} srcSet={card.previewImg2x} width={1280} height={280} alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <a className="btn" href="#">Подробнее</a>
      </p>
    </div>
  );
}

export default Banner;
