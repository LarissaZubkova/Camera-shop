import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: Pick<State, NameSpace.Review>): Review[] => state[NameSpace.Review].reviews;
