import React from 'react';
import { useDispatch } from 'react-redux';

import Card from './context.js';
import { setLogin } from '../state/login/loginSlice';

const Login = () => {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const dispatch = useDispatch();

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} dispatch={dispatch}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  );
}

const LoginMsg = (props) => {
  return (
    <>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Authenticate again
      </button>
    </>
  );
}

const LoginForm = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handle = () => {
    fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          props.dispatch(setLogin(data));
          console.log('JSON:', data);
        } catch(err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>

      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>

      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
    </>
  );
}

export default Login;