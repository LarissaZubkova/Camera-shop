import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCheckCouponAction } from '../../store/api-actions';
import { getCoupon, getCouponError, getCouponText } from '../../store/basket-process/basket-process.selectors';
import classNames from 'classnames';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { setCouponText } from '../../store/basket-process/basket-process.slice';

function CouponForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(getCoupon);
  const couponError = useAppSelector(getCouponError);
  const couponText = useAppSelector(getCouponText);
  const [promoInput, setPromoInput] = useState<string>(couponText);

  useEffect(() => {
    dispatch(setCouponText(promoInput));
  }, [dispatch, promoInput]);

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
