import { RefObject, useEffect } from 'react';
import { useAppDispatch } from '.';
import { ModalType } from '../const';
import { setModalType } from '../store/product-process/product-process.slice';

export const useOverlayListener = (ref: RefObject<HTMLDivElement>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onOverlayClick = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (ref.current && !ref.current.contains(target) && target.tagName !== 'BUTTON') {
        dispatch(setModalType(ModalType.Default));
      }
    };

    document.addEventListener('click', onOverlayClick);
    return () => {
      document.removeEventListener('click', onOverlayClick);
    };
  }, [dispatch, ref]);
};
