import { NameSpace } from '../../const';
import { CameraProduct } from '../../types/product';
import { State } from '../../types/state';

export const getProducts = (state: Pick<State, NameSpace.Product>): CameraProduct[] => state[NameSpace.Product].products;
