# Chainalysis Crypto App - UI
This project is a coding challenge from Chainalysis which shows prices of Bitcoin and Etheruem from 2 different exchanges (Bitfinex and Coinbase Exchange) and recommends the better option for buying or selling the coins.

## Prerequisites
Inorder to run the application successfully, you will need to start the server by following the instructions from [here](https://github.com/pdsuthar10/chainalysis-backend).

## How to run

Clone the repository by running the following command in your terminal:
```
git clone git@github.com:pdsuthar10/chainalysis-frontend.git
```

Go to `chainalysis-frontend` directory that you cloned:
```
cd chainalysis-frontend
```

Install the necessary modules:
```
npm install
```

Start the application by running:
```
npm start
```

## About the application

This application is connected with its backend through a socket which is used to get real-time updates regarding the coin's data.

You can visit the app on: https://chainalysis-frontend.herokuapp.com/
