import React, { useEffect, useState } from 'react';
import { Container, Grid, Loader } from 'semantic-ui-react';
import SocketIOClient from 'socket.io-client';
import CoinCard from './components/CoinCard';
import constants from './constants';

import './App.css';

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const socket = SocketIOClient(constants.API_BACKEND);
    socket.on('FromAPI', (data) => {
      if (!(data.bitcoin && data.bitcoin.length)) {
        if (response.bitcoin && response.bitcoin.length) {
          data.bitcoin = response.bitcoin;
        }
      }
      setResponse(data);
    });

    return () => socket.disconnect();
  }, [response]);

  const getExchangeList = (coin) => (response[coin] || []).map((exchange) => ({
    ...exchange,
    buy: exchange.buy && Number(exchange.buy),
    sell: exchange.sell && Number(exchange.sell),
  }));

  const getUIComponents = () => {
    if (!response) {
      return <Loader active className="custom-spinner" size="large">Loading</Loader>;
    }

    return (
      <Grid container columns={2} stackable className="coin-grid">
        <Grid.Row>
          <Grid.Column>
            <CoinCard coinName="Bitcoin" exchangeList={getExchangeList('bitcoin')} />
          </Grid.Column>
          <Grid.Column>
            <CoinCard coinName="Ethereum" exchangeList={getExchangeList('ethereum')} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  return (
    <div className="App">
      <div className="navbar">
        <h2>Crypto Dashboard</h2>
      </div>
      <Container>
        {getUIComponents()}
      </Container>
    </div>
  );
}

export default App;
