import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import { mockProducts } from '../../mock/mock-products';
import Banner from '../banner/banner';

function CatalogSwiper(): JSX.Element {
  const mockPromo = mockProducts.slice(0,3);

  return (
    <Swiper modules={[Pagination, Autoplay]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {mockPromo.map((promo) => <SwiperSlide key={promo.id}><Banner card={promo} /></SwiperSlide>)}
    </Swiper>
  );
}

export default CatalogSwiper;
