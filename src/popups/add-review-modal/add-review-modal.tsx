import classNames from 'classnames';
import './add-review-modal.css';
import { Fragment, useRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ModalType, STAR_COUNT } from '../../const';
import { useAppDispatch } from '../../hooks';
import { useOverlayListener } from '../../hooks/use-overlay-listener';
import { fetchSendReviewAction } from '../../store/api-actions';
import { setModalType } from '../../store/product-process/product-process.slice';
import { FormReviewData, InputTypes } from '../../types/review';
import { validateName, validateReview } from '../../utils/utils';

function AddReviewModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const {id} = useParams();
  const {register, handleSubmit, watch, formState: {errors, isSubmitting}} = useForm<InputTypes>({mode: 'onChange'});
  const ratingValue = watch('rating');

  useOverlayListener(modalRef);

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    if (id) {
      const currentData = {...data, cameraId: Number(id), rating: Number(data.rating)} as FormReviewData;
      dispatch(fetchSendReviewAction(currentData));
    }
  };

  return (
    <div className="modal__content" ref={modalRef} >
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
              <div className="rate__bar" data-testid='rate-bar'>
                <div className="rate__group">
                  {Array.from({length: STAR_COUNT}, (_, i) => STAR_COUNT - i).map((star) => (
                    <Fragment key={star}>
                      <input
                        className="visually-hidden"
                        id={`star-${star}`}
                        type="radio"
                        value={star}
                        disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  data-testid="name"
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
                  data-testid="advantage"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  data-testid="disadvantage"
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
                  disabled={isSubmitting}
                  data-testid="comment"
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
        disabled={isSubmitting}
        onClick={() => dispatch(setModalType(ModalType.Default))}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default AddReviewModal;
