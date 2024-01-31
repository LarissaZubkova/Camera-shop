import CatalogAddModal from '../catalog-add-modal/catalog-add-modal.tsx';
import AddReviewModal from '../add-review-modal/add-review-modal.tsx';
import { useAppSelector } from '../../hooks/index.tsx';
import { getModalType } from '../../store/product-process/product-process.selectors.ts';
import { ModalType } from '../../const.ts';

function ModalPopup(): JSX.Element {
  const modalType = useAppSelector(getModalType);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        {modalType === ModalType.CatalogAddModal && <CatalogAddModal />}
        {modalType === ModalType.AddReviewModal && <AddReviewModal />}
      </div>
    </div>
  );
}

export default ModalPopup;
