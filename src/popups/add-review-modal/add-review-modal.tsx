import { useAppDispatch } from '../../hooks';
import { setModalType } from '../../store/product-process/product-process.slice';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { FormReviewData } from '../../types/review';
import { useParams } from 'react-router-dom';
import { fetchReviewsAction, fetchSendReviewAction } from '../../store/api-actions';
import { ModalType, STAR_COUNT } from '../../const';

function AddReviewModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const {register, handleSubmit} = useForm({mode: 'onChange'});

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    if (id) {
      const currentData = {...data, cameraId: Number(id), rating: Number(data.rating)} as FormReviewData;
      dispatch(fetchSendReviewAction(currentData));
      dispatch(fetchReviewsAction(id));
      dispatch(setModalType(ModalType.ReviewSuccessModal));
    }
  };

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
                    <>
                      <input
                        key={star}
                        className="visually-hidden"
                        id={`star-${star}`}
                        type="radio"
                        value={star}
                        {...register('rating',
                          { required: 'Обязательное поле',
                          }
                        )}
                      />
                      <label className="rate__label" htmlFor={`star-${star}`} title="Отлично"></label>
                    </>
                  )
                  )}
                </div>
                <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
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
                    { required: 'Обязательное поле',
                    }
                  )}
                />
              </label>
              <p className="custom-input__error">Нужно указать имя</p>
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
                    { required: 'Обязательное поле',
                    }
                  )}
                />
              </label>
              <p className="custom-input__error">Нужно указать достоинства</p>
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
                  required
                  {...register('disadvantage',
                    { required: 'Обязательное поле',
                    }
                  )}
                />
              </label>
              <p className="custom-input__error">Нужно указать недостатки</p>
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
                    { required: 'Обязательное поле',
                    }
                  )}
                >
                </textarea>
              </label>
              <div className="custom-textarea__error">Нужно добавить комментарий</div>
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
