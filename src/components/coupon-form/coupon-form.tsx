import { COUPONS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCheckCouponAction } from '../../store/api-actions';
import { getCoupon, getCouponError } from '../../store/basket-process/basket-process.selectors';
import classNames from 'classnames';
import { ChangeEvent, FormEvent, useState } from 'react';

function CouponForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(getCoupon);
  const couponError = useAppSelector(getCouponError);
  const [promoInput, setPromoInput] = useState<string>(coupon ? COUPONS[coupon] : '');

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setPromoInput(value.replace(/\s/g, ''));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(fetchCheckCouponAction({coupon: promoInput}));
  };

  return (
    <form
      action="#"
      onSubmit={handleFormSubmit}
    >
      <div className={classNames('custom-input', {'is-invalid': couponError, 'is-valid': coupon})}>
        <label><span className="custom-input__label">Промокод</span>
          <input
            type="text"
            placeholder="Введите промокод"
            name="coupon"
            value={promoInput}
            onChange={handleInputChange}
          />
        </label>
        <p className="custom-input__error">Промокод неверный</p>
        <p className="custom-input__success">Промокод принят!</p>
      </div>
      <button className="btn" type="submit">Применить
      </button>
    </form>
  );
}

export default CouponForm;
