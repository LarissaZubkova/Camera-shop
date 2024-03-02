import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilterType, FilterType, LevelFilterType } from '../../const';

function CatalogFilterForm(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputClick = (evt: ChangeEvent<HTMLInputElement>) => {
    const type = evt.target.id;
    const name = evt.target.name;
    const category = searchParams.get('category') || '';
    const cameraType = searchParams.get('type') || '';
    const level = searchParams.get('level') || '';
    const params = {category, type: cameraType, level};
    if (type === 'category') {
      params[type] = name;
    } else {
      params[type] = params[type] ? `${params[type]},${name}` : name;
    }
    setSearchParams(params);
  };

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="price"
                placeholder="от"
                id="coast"
              />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="priceUp"
                placeholder="до"
                id="coast"
              />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="photocamera"
              id="category"
              checked={searchParams.get('category') === CategoryFilterType.Photocamera}
              onChange={handleInputClick}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Фотокамера</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="videocamera"
              id="category"
              checked={searchParams.get('category') === CategoryFilterType.Videocamera}
              onChange={handleInputClick}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Видеокамера</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="digital"
              id="type"
              checked = {Boolean(searchParams.get('type')?.split(',').find((type) => type === FilterType.Digital))}
              onChange={handleInputClick}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Цифровая</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="film"
              onChange={handleInputClick}
              disabled={searchParams.get('category') === CategoryFilterType.Videocamera}
              checked = {Boolean(searchParams.get('type')?.split(',').find((type) => type === FilterType.Film))}
              id="type"
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Плёночная</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="snapshot"
              id="type"
              onChange={handleInputClick}
              disabled={searchParams.get('category') === CategoryFilterType.Videocamera}
              checked = {Boolean(searchParams.get('type')?.split(',').find((type) => type === FilterType.Snapshot))}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Моментальная</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="collection"
              id="type"
              onChange={handleInputClick}
              checked = {Boolean(searchParams.get('type')?.split(',').find((type) => type === FilterType.Collection))}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Коллекционная</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="zero"
              id="level"
              onChange={handleInputClick}
              checked = {Boolean(searchParams.get('level')?.split(',').find((type) => type === LevelFilterType.Zero))}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Нулевой</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="non-professional"
              id="level"
              onChange={handleInputClick}
              checked = {Boolean(searchParams.get('level')?.split(',').find((type) => type === LevelFilterType.NonProfessional))}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Любительский</span>
          </label>
        </div>
        <div className="custom-checkbox catalog-filter__item">
          <label>
            <input
              type="checkbox"
              name="professional"
              id="level"
              onChange={handleInputClick}
              checked = {Boolean(searchParams.get('level')?.split(',').find((type) => type === LevelFilterType.Professional))}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">Профессиональный</span>
          </label>
        </div>
      </fieldset>
      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
      </button>
    </form>
  );
}

export default CatalogFilterForm;
