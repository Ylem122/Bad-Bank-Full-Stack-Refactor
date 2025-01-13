import React from 'react';
import Card from './context.js';
import Bank from './bank.png';

const Home = () => {
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src={Bank} className="img-fluid" alt="Responsive" />)}
    />
  );  
}

export default Home;