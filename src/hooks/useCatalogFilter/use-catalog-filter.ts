import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilterType, Filter, FilterType, PriceFilter } from '../../const';
import { useAppSelector } from '..';
import { CameraCard } from '../../types/product';
import { getProductsAfterFilter } from '../../store/product-process/product-process.selectors';
import { getAllSearchParams } from '../../utils/utils';

type Params = {
  category: string;
  type: string;
  level: string;
  _start: string;
  _end: string;
  [key: string]: string;
}

const useCatalogFilter = () => {
  const products = useAppSelector(getProductsAfterFilter);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get(Filter.Category) || '');
  const [cameraType, setCameraType] = useState(searchParams.get(Filter.Type)?.split(',') || []);
  const [level, setLevel] = useState(searchParams.get(Filter.Level)?.split(',') || []);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    if (products.length) {
      const prices = products.map((product: CameraCard) => product.price);
      setMinPrice(String(prices.reduce((a, b) => Math.min(a,b))));
      setMaxPrice(String(prices.reduce((a, b) => Math.max(a,b))));
    }
  }, [products]);

  const params = useMemo(() => {
    const updatedParams: Params = {category, type: cameraType.join(','), level: level.join(','), _start: minPrice, _end: maxPrice};
    return Object.fromEntries(
      Object.entries(updatedParams).filter(([, value]) => value)
    );
  }, [category, cameraType, level, maxPrice, minPrice]);

  useEffect(() => {
    setSearchParams({...params, ...getAllSearchParams(searchParams)});
  }, [category, cameraType, level, params, setSearchParams, searchParams]);

  const resetFilters = () => {
    setSearchParams((prev) => {
      const newSearchPararm = new URLSearchParams(prev);

      newSearchPararm.delete(Filter.Category);
      newSearchPararm.delete(Filter.Type);
      newSearchPararm.delete(Filter.Level);
      newSearchPararm.delete('_start');
      newSearchPararm.delete('_end');

      return newSearchPararm;
    });

    setCategory('');
    setCameraType([]);
    setLevel([]);
    setMinPrice('');
    setMaxPrice('');
  };

  useEffect(() => {
    resetFilters();
  }, []);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>, type: PriceFilter) => {
    const value = evt.target.value;
    if (type === PriceFilter.Price) {
      if (value < maxPrice) {
        setMinPrice(value);
      } else {
        setMinPrice(maxPrice);
      }
    } else {
      if (value > minPrice) {
        setMaxPrice(value);
      } else {
        setMaxPrice(minPrice);
      }
    }
  };

  const handleInputClick = (evt: ChangeEvent<HTMLInputElement>, type: string) => {
    const name = evt.target.name;

    switch(type) {
      case Filter.Category:
        setCategory((prev) => prev === name ? '' : name);
        if (name === CategoryFilterType.Videocamera) {
          setCameraType((prev) => prev.filter((camera) => camera !== FilterType.Film && camera !== FilterType.Snapshot));
        }
        break;
      case Filter.Type:
        setCameraType((prev) => prev.includes(name) ? prev.filter((camera) => camera !== name) : [...prev, name]);
        break;
      case Filter.Level:
        setLevel((prev) => prev.includes(name) ? prev.filter((camera) => camera !== name) : [...prev, name]);
        break;
    }
  };

  return {
    category,
    cameraType,
    level,
    minPrice,
    maxPrice,
    handleInputClick,
    resetFilters,
    handleInputChange
  };
};

export default useCatalogFilter;
