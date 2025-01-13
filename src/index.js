
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/home';
import { store } from './state/store';
import NavBar from './components/navbar';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Balance from './components/balance';
import AllData from './components/alldata';
// import Transactions from './components/transactions';

import "bootstrap/dist/css/bootstrap.min.css";

const Spa = () => {
  return (
    <HashRouter>
      <div>
        <NavBar/>   
        <div className="container" style={{padding: "20px"}}>
          <Routes>
            <Route path="/" exact element={<Home /> } />
            <Route path="/CreateAccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            {/* <Route path="/transactions/" element={Transactions} /> */}
            <Route path="/balance/" element={<Balance />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
          </div>     
      </div>
    </HashRouter>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(

  <Provider store={store}>
    <Spa/>
  </Provider>
);


