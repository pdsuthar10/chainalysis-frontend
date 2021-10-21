import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import utils from '../utils';

const CoinTable = ({ exchangeList }) => {
  const getTableRows = () => (exchangeList || []).map((exchange) => (
    <Table.Row key={shortid()}>
      <Table.Cell>{exchange.name}</Table.Cell>
      <Table.Cell>
        $
        {utils.formatPrice(exchange.buy)}
      </Table.Cell>
      <Table.Cell>
        $
        {utils.formatPrice(exchange.sell)}
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Container>
      <Table unstackable className="coin-table-wrapper">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Exchange</Table.HeaderCell>
            <Table.HeaderCell>Buy Price</Table.HeaderCell>
            <Table.HeaderCell>Sell Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getTableRows()}
        </Table.Body>
      </Table>
    </Container>
  );
};

CoinTable.propTypes = {
  exchangeList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    buy: PropTypes.number.isRequired,
    sell: PropTypes.number.isRequired,
  })).isRequired,
};

export default CoinTable;
