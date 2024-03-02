import useCatalogFilter from '../../hooks/useCatalogFilter/use-catalog-filter';
import { CategoryFilterType, FILTER_NAME, Filter, FilterType, LevelFilterType } from '../../const';


function CatalogFilterForm(): JSX.Element {
  const {category, cameraType, level, handleInputClick} = useCatalogFilter();

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
        {Object.values(CategoryFilterType).map((type) => (
          <div className="custom-checkbox catalog-filter__item" key={type}>
            <label >
              <input
                type="checkbox"
                name={type}
                id={Filter.Category}
                checked={category === type}
                onChange={(evt) => handleInputClick(evt, Filter.Category)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{FILTER_NAME[type]}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>
        {Object.values(FilterType).map((filter) => (
          <div className="custom-checkbox catalog-filter__item" key={filter}>
            <label>
              <input
                type="checkbox"
                name={filter}
                id={Filter.Type}
                disabled={category === CategoryFilterType.Videocamera && (filter === FilterType.Film || filter === FilterType.Snapshot)}
                checked = {Boolean(cameraType.find((type) => type === filter))}
                onChange={(evt) => handleInputClick(evt, Filter.Type)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{FILTER_NAME[filter]}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>
        {Object.values(LevelFilterType).map((filter) => (
          <div className="custom-checkbox catalog-filter__item" key={filter}>
            <label>
              <input
                type="checkbox"
                name={filter}
                id={Filter.Level}
                onChange={(evt) => handleInputClick(evt, Filter.Level)}
                checked = {Boolean(level.find((type) => type === filter))}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{FILTER_NAME[filter]}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
      </button>
    </form>
  );
}

export default CatalogFilterForm;
