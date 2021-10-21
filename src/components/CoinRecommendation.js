import React, { useEffect, useState } from 'react';
import {
  Label,
  Segment,
  Container,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import constants from '../constants';

import '../styles/coin-recommendation.css';

const CoinRecommendation = ({ exchangeA, exchangeB }) => {
  const [buyDifference, setBuyDifference] = useState(0);
  const [sellDifference, setSellDifference] = useState(0);
  const [betterBuyOption, setBetterBuyOption] = useState(null);
  const [betterSellOption, setBetterSellOption] = useState(null);

  // This effect will run on every change
  // of exchanges and calculate the better option
  // for buying/selling both the coins
  useEffect(() => {
    const getBetterBuyOption = () => {
      if (exchangeA.buy > exchangeB.buy) {
        return exchangeB.name;
      }
      if (exchangeA.buy < exchangeB.buy) {
        return exchangeA.name;
      }
      return null;
    };

    const getBetterSellOption = () => {
      if (exchangeA.sell > exchangeB.sell) {
        return exchangeA.name;
      }
      if (exchangeA.sell < exchangeB.sell) {
        return exchangeB.name;
      }
      return null;
    };

    const calculatedBuyDiff = Number(Math.abs(exchangeA.buy - exchangeB.buy)
      .toFixed(constants.NUMBER_OF_DECIMAL));
    const calculatedSellDiff = Number(Math.abs(exchangeA.sell - exchangeB.sell)
      .toFixed(constants.NUMBER_OF_DECIMAL));

    if (exchangeA.buy !== exchangeB.buy) {
      setBuyDifference(calculatedBuyDiff);
    }

    if (exchangeA.sell !== exchangeB.sell) {
      setSellDifference(calculatedSellDiff);
    }

    const calculatedBetterBuy = getBetterBuyOption();
    if (calculatedBetterBuy) {
      setBetterBuyOption(calculatedBetterBuy);
    }

    const calculatedBetterSell = getBetterSellOption();
    if (calculatedBetterSell) {
      setBetterSellOption(calculatedBetterSell);
    }
  }, [exchangeA, exchangeB]);

  // Incase both the exchanges have same price
  const message = 'Both the exchanges have the same price of the coin. You can opt for any.';

  // Returns a formatted string with recommendation and the difference
  const getRecommendation = (betterOption, difference, isBuy) => (
    betterOption ? `${betterOption} (${isBuy ? '-' : '+'}$${difference})` : message
  );

  return (
    <Container className="recommendation-wrapper">
      <Segment>
        <Label as="a" color="green" ribbon>
          Recommendation
        </Label>
        <div className="recommendation-content">
          <div>
            Buy from:
            {' '}
            {getRecommendation(betterBuyOption, buyDifference, true)}
          </div>
          <div>
            Sell on:
            {' '}
            {getRecommendation(betterSellOption, sellDifference, false)}
          </div>
        </div>
      </Segment>
    </Container>
  );
};

const exchangePropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  buy: PropTypes.number.isRequired,
  sell: PropTypes.number.isRequired,
});

CoinRecommendation.propTypes = {
  exchangeA: exchangePropType.isRequired,
  exchangeB: exchangePropType.isRequired,
};

export default CoinRecommendation;
