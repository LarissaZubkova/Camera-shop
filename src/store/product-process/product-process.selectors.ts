import { NameSpace } from '../../const';
import { CameraProduct, Promo } from '../../types/product';
import { State } from '../../types/state';

export const getProducts = (state: Pick<State, NameSpace.Product>): CameraProduct[] => state[NameSpace.Product].products;
export const getPromo = (state: Pick<State, NameSpace.Product>): Promo[] => state[NameSpace.Product].promo;
export const getModalActiveStatus = (state: Pick<State, NameSpace.Product>): boolean => state[NameSpace.Product].modalIsActive;
