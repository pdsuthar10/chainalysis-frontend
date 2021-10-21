import constants from '../constants';

const formatPrice = (price) => Number(price).toFixed(constants.NUMBER_OF_DECIMAL);

export default {
  formatPrice,
};
