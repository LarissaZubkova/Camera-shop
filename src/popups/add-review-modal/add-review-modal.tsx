import './add-review-modal.css';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { setModalType } from '../../store/product-process/product-process.slice';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { FormReviewData } from '../../types/review';
import { useParams } from 'react-router-dom';
import { fetchSendReviewAction } from '../../store/api-actions';
import { ModalType, STAR_COUNT } from '../../const';
import { validateName, validateReview } from '../../utils';
import { Fragment, useEffect } from 'react';
import { InputTypes } from '../../types/review';

function AddReviewModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const {register, handleSubmit, watch, formState: {errors, isSubmitSuccessful}} = useForm<InputTypes>({mode: 'onChange'});
  const ratingValue = watch('rating');

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    if (id) {
      const currentData = {...data, cameraId: Number(id), rating: Number(data.rating)} as FormReviewData;
      dispatch(fetchSendReviewAction(currentData));
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      dispatch(setModalType(ModalType.ReviewSuccessModal));
    }
  }, [isSubmitSuccessful, dispatch]);


  return (
    <div className="modal__content">
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          method="post"
          onSubmit={(evt) => {
            handleSubmit(handleFormSubmit)(evt);
          }}
        >
          <div className="form-review__rate">
            <fieldset className="rate form-review__item">
              <legend className="rate__caption">Рейтинг
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {Array.from({length: STAR_COUNT}, (_, i) => STAR_COUNT - i).map((star) => (
                    <Fragment key={star}>
                      <input
                        className="visually-hidden"
                        id={`star-${star}`}
                        type="radio"
                        value={star}
                        {...register('rating',
                          {required: 'Нужно оценить товар'}
                        )}
                      />
                      <label className="rate__label" htmlFor={`star-${star}`} title="Отлично"></label>
                    </Fragment>
                  )
                  )}
                </div>
                <div className="rate__progress"><span className="rate__stars">{ratingValue}</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className={classNames('rate__message', {'custom-textarea__error-active' : errors.rating})}>{errors.rating?.message}</p>
            </fieldset>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  {...register('userName',
                    {
                      required: 'Нужно указать имя',
                      validate: validateName,
                    }
                  )}
                />
              </label>
              <p className={classNames('custom-input__error', {'custom-textarea__error-active' : errors.userName})}>{errors.userName?.message}</p>
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  {...register('advantage',
                    {
                      required: 'Нужно указать достоинства',
                      validate: validateReview,
                    }
                  )}
                />
              </label>
              <p className={classNames('custom-input__error', {'custom-textarea__error-active' : errors.advantage})}>{errors.advantage?.message}</p>
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  {...register('disadvantage',
                    {
                      required: 'Нужно указать недостатки',
                      validate: validateReview,
                    }
                  )}
                />
              </label>
              <p className={classNames('custom-input__error', {'custom-textarea__error-active' : errors.disadvantage})}>{errors.disadvantage?.message}</p>
            </div>
            <div className="custom-textarea form-review__item">
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  minLength={5}
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('review',
                    {
                      required: 'Нужно добавить комментарий',
                      validate: validateReview,
                    }
                  )}
                >
                </textarea>
              </label>
              <div className={classNames('custom-textarea__error', {'custom-textarea__error-active' : errors.review})}>{errors.review?.message}</div>
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
        </form>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => dispatch(setModalType(''))}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default AddReviewModal;
