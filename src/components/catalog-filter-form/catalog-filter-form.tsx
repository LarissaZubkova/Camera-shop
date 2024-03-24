import useCatalogFilter from '../../hooks/use-catalog-filter';
import { CategoryFilterType, FILTER_NAME, Filter, FilterType, LevelFilterType, PriceFilter } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilters } from '../../store/filter-process/filter-process.slice';
import { getFilters } from '../../store/filter-process/filter-process.selectors';

type CatalogFilterFormProps = {
  prices: {
    minPrice: string;
    maxPrice: string;
  };
}

function CatalogFilterForm({prices}: CatalogFilterFormProps): JSX.Element {
  const {
    category,
    type,
    level,
    minPrice,
    maxPrice,
    handleInputClick,
    resetFilters,
    handleInputChange
  } = useCatalogFilter(prices);
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getFilters);

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
                placeholder={prices.minPrice}
                value={minPrice || ''}
                onChange={(evt) => handleInputChange(evt, PriceFilter.Price)}
                onBlur={() => {
                  if (Number(minPrice) < Number(prices.minPrice)) {
                    dispatch(setFilters({
                      ...filters,
                      minPrice: prices.minPrice,
                    }));
                  }
                }}
                id="coast"
              />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="priceUp"
                placeholder={prices.maxPrice}
                onChange={(evt) => handleInputChange(evt, PriceFilter.PriceUp)}
                value={maxPrice || ''}
                onBlur={() => {
                  if (Number(maxPrice) < Number(minPrice)) {
                    dispatch(setFilters({
                      ...filters,
                      maxPrice: prices.minPrice,
                    }));
                  }
                }}
                id="coast"
              />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>
        {Object.values(CategoryFilterType).map((camera) => (
          <div className="custom-checkbox catalog-filter__item" key={camera}>
            <label >
              <input
                type="checkbox"
                name={camera}
                id={Filter.Category}
                checked={category === camera}
                onChange={(evt) => handleInputClick(evt, Filter.Category)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{FILTER_NAME[camera]}</span>
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
                checked = {type && Boolean(type.find((camera) => camera === filter))}
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
                checked = {level && Boolean(level.find((camera) => camera === filter))}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{FILTER_NAME[filter]}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <button
        className="btn catalog-filter__reset-btn"
        type="reset"
        onClick={resetFilters}
      >Сбросить фильтры
      </button>
    </form>
  );
}

export default CatalogFilterForm;
