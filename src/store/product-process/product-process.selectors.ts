import { NameSpace } from '../../const';
import { CameraCard, Promo } from '../../types/product';
import { State } from '../../types/state';

export const getProducts = (state: Pick<State, NameSpace.Product>): CameraCard[] => state[NameSpace.Product].products;
export const getProductCard = (state: Pick<State, NameSpace.Product>): CameraCard | null => state[NameSpace.Product].product;
export const getSimilar = (state: Pick<State, NameSpace.Product>): CameraCard[] => state[NameSpace.Product].similar;
export const getProductLoadingStatus = (state: Pick<State, NameSpace.Product>): boolean => state[NameSpace.Product].isProductLoading;
export const getPromo = (state: Pick<State, NameSpace.Product>): Promo[] => state[NameSpace.Product].promo;
export const getModalActiveStatus = (state: Pick<State, NameSpace.Product>): boolean => state[NameSpace.Product].modalIsActive;
