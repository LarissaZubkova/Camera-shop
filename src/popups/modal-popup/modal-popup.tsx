import classNames from 'classnames';
import { useEffect } from 'react';
import { KEY_ESCAPE, ModalType } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/index.tsx';
import { getModalType } from '../../store/product-process/product-process.selectors.ts';
import { setModalType } from '../../store/product-process/product-process.slice.ts';
import AddReviewModal from '../add-review-modal/add-review-modal.tsx';
import CatalogAddModal from '../catalog-add-modal/catalog-add-modal.tsx';
import ReviewSuccessModal from '../review-success-modal/review-success-modal.tsx';

function ModalPopup(): JSX.Element {
  const modalType = useAppSelector(getModalType);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === KEY_ESCAPE) {
        evt.preventDefault();
        dispatch(setModalType(ModalType.Default));
      }
    };

    document.addEventListener('keydown', onKeyDownEsc);
    return () => {
      document.removeEventListener('keydown', onKeyDownEsc);
    };
  }, [dispatch]);

  useEffect(() => {
    if (modalType) {
      document.body.className = 'scroll-lock';
    }
    return () => {
      document.body.className = '';
    };
  }, [modalType]);

  return (
    <div className={classNames('modal is-active',
      {'modal--narrow' : modalType === ModalType.ReviewSuccessModal})}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        {modalType === ModalType.CatalogAddModal && <CatalogAddModal />}
        {modalType === ModalType.AddReviewModal && <AddReviewModal />}
        {modalType === ModalType.ReviewSuccessModal && <ReviewSuccessModal />}
      </div>
    </div>
  );
}

export default ModalPopup;
