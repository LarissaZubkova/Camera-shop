import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Страница не найдена - Фотошоп</title>
      </Helmet>
      <Header />
      <div className="banner">
        <picture>
          <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"/>
          <img src="img/content/banner-bg.jpg" srcSet="img/content/banner-bg@2x.jpg 2x" width="1280" height="280" alt="баннер"/>
        </picture>
        <p className="banner__info">
          <span className="title title--h1">404 Not Found</span>
          <span className="banner__text"></span>
          <Link className="btn" to={AppRoute.Catalog}>На главную</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
