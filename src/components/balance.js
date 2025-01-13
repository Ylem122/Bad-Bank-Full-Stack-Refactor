import React from 'react';
import Card from './context.js';

const Balance = () => {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance" 
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(text);
            props.setShow(false);
            setBalance(text.balance);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  function handlePost(){
    fetch("/account/postfindone", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    })
      .then((json) => json.json())
      .then((result) => {
        console.log(result[0].balance)
        try {
            props.setStatus("Current Balance is "+result[0].balance);
            props.setShow(false);
            setBalance(result[0].balance);
            console.log('JSON:', result);
        } catch(err) {
            props.setStatus(err)
            console.log('err:', err);
        }
    })  
  }


  return (
  <>
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handlePost}>
        Check Balance
    </button>
  </>);
}

export default Balance;