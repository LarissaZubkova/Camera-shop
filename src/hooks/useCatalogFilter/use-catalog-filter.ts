import { ChangeEvent, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilterType, Filter, FilterType, PriceFilter } from '../../const';
import { useAppDispatch, useAppSelector } from '..';
import { getFilters } from '../../store/filter-process/filter-process.selectors';
import { getAllSearchParams } from '../../utils/utils';
import { fetchProductsAction } from '../../store/api-actions';
import { setFilters } from '../../store/filter-process/filter-process.slice';

type Params = {
  category: string;
  type: string;
  level: string;
  _start: string;
  _end: string;
  [key: string]: string;
}

const useCatalogFilter = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useAppSelector(getFilters);
  const {category, type, level, minPrice, maxPrice} = filters;

  const params = useMemo(() => {
    const updatedParams: Params = {
      category,
      type: type ? type.join(',') : '',
      level: level ? level.join(',') : '',
      _start: minPrice,
      _end: maxPrice,
    };
    return Object.fromEntries(
      Object.entries(updatedParams).filter(([, value]) => value)
    );
  }, [category, type, level, maxPrice, minPrice]);
  const resetFilters = () => {
    setSearchParams(new URLSearchParams());

    dispatch(setFilters({
      category: '',
      type: [],
      level: [],
      minPrice: '',
      maxPrice: '',
    }));

    dispatch(fetchProductsAction());
  };

  useEffect(() => {
    setSearchParams({...getAllSearchParams(searchParams), ...params});
  }, [params, searchParams, setSearchParams]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>, filter: PriceFilter) => {
    const value = evt.target.value;
    if (filter === PriceFilter.Price) {
      if (Number(value) < Number(maxPrice)) {
        dispatch(setFilters({
          ...filters,
          minPrice: value,
        }));
      } else {
        dispatch(setFilters({
          ...filters,
          minPrice: maxPrice,
        }));
      }
    } else {
      if (Number(value) > Number(minPrice)) {
        dispatch(setFilters({
          ...filters,
          maxPrice: value,
        }));
      } else {
        dispatch(setFilters({
          ...filters,
          maxPrice: minPrice,
        }));
      }
    }

  };

  const handleInputClick = (evt: ChangeEvent<HTMLInputElement>, filter: string) => {
    const name = evt.target.name;

    switch(filter) {
      case Filter.Category:
        if (name === CategoryFilterType.Videocamera) {
          dispatch(setFilters({
            ...filters,
            category: category === name ? '' : name,
            type: type.filter((camera) => camera !== FilterType.Film && camera !== FilterType.Snapshot),
          }));
        } else {
          dispatch(setFilters({
            ...filters,
            category: category === name ? '' : name,
          }));
        }
        break;
      case Filter.Type:
        dispatch(setFilters({
          ...filters,
          type: type.includes(name) ? type.filter((camera) => camera !== name) : [...type, name]
        }));
        break;
      case Filter.Level:
        dispatch(setFilters({
          ...filters,
          level: level.includes(name) ? level.filter((camera) => camera !== name) : [...level, name]
        }));
        break;
    }

    dispatch(fetchProductsAction());
  };

  return {
    category,
    type,
    level,
    minPrice,
    maxPrice,
    handleInputClick,
    resetFilters,
    handleInputChange
  };
};

export default useCatalogFilter;
