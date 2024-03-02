import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilterType, Filter, FilterType } from '../../const';

type Params = {
  category: string;
  type: string;
  level: string;
  [key: string] : string;
}

const useCatalogFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get(Filter.Category) || '');
  const [cameraType, setCameraType] = useState(searchParams.get(Filter.Type)?.split(',') || []);
  const [level, setLevel] = useState(searchParams.get(Filter.Level)?.split(',') || []);

  const params = useMemo(() => {
    const updatedParams: Params = {category, type: cameraType.join(','), level: level.join(',')};
    return Object.fromEntries(
      Object.entries(updatedParams).filter(([, value]) => value)
    );
  }, [category, cameraType, level]);

  useEffect(() => {
    setSearchParams(params);
  }, [category, cameraType, level, params, setSearchParams]);

  useEffect(() => {
    setCategory('');
    setCameraType([]);
    setLevel([]);
  }, []);

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
    handleInputClick,
  };
};

export default useCatalogFilter;
