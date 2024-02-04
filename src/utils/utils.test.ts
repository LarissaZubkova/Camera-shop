import { getPaginationCount, getCurrentProductsList, getMoneyFormat, getDateFormat, sortByDate, getPageCount, validateName, validateReview } from './utils';
import { makeFakeProducts, makeFakeReviews } from './mock';

describe('Utility Functions', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('getPaginationCount should return correct value', () => {
    expect(getPaginationCount(18)).toBe(2);
    expect(getPaginationCount(9)).toBe(1);
  });

  it('getCurrentProductsList should retuen correct list', () => {
    const products = makeFakeProducts();
    const expectedList = products.slice(9, 18);
    expect(getCurrentProductsList(products, 2)).toEqual(expectedList);
  });

  it('getMoneyFormat should fotmat money correctly', () => {
    expect(getMoneyFormat(1000)).toBe('1 000 ₽');
    expect(getMoneyFormat(1500)).toBe('1 500 ₽');
  });

  it('getDateFormat should format date correctly', () => {
    const result = getDateFormat('2022-07-09T13:24:57.980Z');

    expect(result.dateTime).toBe('2022-07-09');
    expect(result.dateTime).toBe('09 июля');
  });

  it('sortByDate should sort reviews correctly', () => {
    const reviews = makeFakeReviews();
    const sortedReviews = sortByDate(reviews);
    expect(sortedReviews).toEqual(sortedReviews);
  });

  it('getPageCount should return correct value', () => {
    expect(getPageCount(10, 5)).toBe(3);
    expect(getPageCount(5, 3)).toBe(2);
  });

  it('validateName should validate name correctly', () => {
    expect(validateName('John')).toBe(true);
    expect(validateName('')).toBe('Не меньше 2 и не больше 15 символов');
    expect(validateName('A')).toBe('Не меньше 2 и не больше 15 символов');
    expect(validateName('TooLongNameForValidation')).toBe('Не меньше 2 и не больше 15 символов');
  });

  it('validateReview should validate review correctly', () => {
    expect(validateReview('This is valid review')).toBe(true);
    expect(validateReview('')).toBe('Больше 10 и меньше 160 символов');
    expect(validateReview('A')).toBe('Больше 10 и меньше 160 символов');
    expect(validateReview('A'.repeat(161))).toBe('Больше 10 и меньше 160 символов');
  });
});
