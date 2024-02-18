import { ModalType, NameSpace } from '../../const';
import { CameraCard, Promo } from '../../types/product';
import { State } from '../../types/state';

export const getProducts = (state: Pick<State, NameSpace.Product>): CameraCard[] => state[NameSpace.Product].products;
export const getProductCard = (state: Pick<State, NameSpace.Product>): CameraCard | null => state[NameSpace.Product].product;
export const getSimilar = (state: Pick<State, NameSpace.Product>): CameraCard[] => state[NameSpace.Product].similar;
export const getProductLoadingStatus = (state: Pick<State, NameSpace.Product>): boolean => state[NameSpace.Product].isProductLoading;
export const getProductErrorStatus = (state: Pick<State, NameSpace.Product>): boolean => state[NameSpace.Product].isProductError;
export const getPromo = (state: Pick<State, NameSpace.Product>): Promo[] => state[NameSpace.Product].promo;
export const getModalActiveProduct = (state: Pick<State, NameSpace.Product>): CameraCard | null | undefined => state[NameSpace.Product].modalActiveProduct;
export const getModalType = (state: Pick<State, NameSpace.Product>): ModalType => state[NameSpace.Product].modalType;
