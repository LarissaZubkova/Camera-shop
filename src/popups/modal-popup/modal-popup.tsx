import CatalogAddItem from '../catalog-add-item/catalog-add-item';

function ModalPopup(): JSX.Element {
  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <CatalogAddItem />
      </div>
    </div>
  );
}

export default ModalPopup;
