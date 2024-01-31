import classNames from 'classnames';
import { ModalType } from '../../const.ts';
import { useAppSelector } from '../../hooks/index.tsx';
import { getModalType } from '../../store/product-process/product-process.selectors.ts';
import AddReviewModal from '../add-review-modal/add-review-modal.tsx';
import CatalogAddModal from '../catalog-add-modal/catalog-add-modal.tsx';
import ReviewSuccessModal from '../review-success-modal/review-success-modal.tsx';

function ModalPopup(): JSX.Element {
  const modalType = useAppSelector(getModalType);

  return (
    <div className={classNames('modal is-active', {'modal--narrow' : modalType === ModalType.ReviewSuccessModal})}>
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
