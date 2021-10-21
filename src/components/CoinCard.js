import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Image } from 'semantic-ui-react';
import CoinTable from './CoinTable';
import CardRecommendation from './CoinRecommendation';

import '../styles/coin-card.css';

const CoinCard = ({ coinName, exchangeList }) => (
  <Container>
    <Card className="coin-card-wrapper">
      <Card.Header className="coin-name">
        <div className="coin-name-heading">
          <Image
            size="mini"
            src={`Images/${coinName}.png`}
          />
          &emsp;
          <h3>{coinName}</h3>
        </div>
      </Card.Header>
      <Card.Content>
        <CoinTable exchangeList={exchangeList || []} />
        <br />
        <CardRecommendation
          exchangeA={exchangeList[0]}
          exchangeB={exchangeList[1]}
        />
      </Card.Content>
    </Card>
  </Container>
);

CoinCard.propTypes = {
  coinName: PropTypes.string.isRequired,
  exchangeList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    buy: PropTypes.number.isRequired,
    sell: PropTypes.number.isRequired,
  })).isRequired,
};

export default CoinCard;
