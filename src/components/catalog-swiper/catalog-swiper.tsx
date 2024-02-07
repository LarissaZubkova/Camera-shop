import 'swiper/css';
import 'swiper/css/pagination';
import './catalog-swiper.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/product-process/product-process.selectors';
import Banner from '../banner/banner';

function CatalogSwiper(): JSX.Element {
  const promoCards = useAppSelector(getPromo);

  return (
    <Swiper modules={[Pagination, Autoplay]}
      data-testid="swiper-container"
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {promoCards.map((promo) => <SwiperSlide key={promo.id} data-testid="swiper-slider"><Banner card={promo} /></SwiperSlide>)}
    </Swiper>
  );
}

export default CatalogSwiper;
