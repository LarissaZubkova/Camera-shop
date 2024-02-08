import { render, waitFor} from '@testing-library/react';
import { useRef } from 'react';
import { useOverlayListener } from './use-overlay-listener';
import { setModalType } from '../store/product-process/product-process.slice';
import { ModalType } from '../const';
import { withStore } from '../utils/mock-components';

describe('Hook: useOverlayListener', () => {
  it('should set modal type to "Default" when clicking outside the ref element', () => {
    const ComponentWithHook = () => {
      const ref = useRef(null);
      useOverlayListener(ref);

      return (
        <div ref={ref}></div>
      );
    };
    const {withStoreComponent} = withStore(<ComponentWithHook />, {});
    const {unmount} = render(withStoreComponent);
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);

    outsideElement.click();
    waitFor(() => {
      expect(setModalType).toHaveBeenCalledWith(ModalType.Default);

    });
    unmount();
    document.body.removeChild(outsideElement);
  });
});
