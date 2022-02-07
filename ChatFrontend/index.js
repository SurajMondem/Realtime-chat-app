import React from 'react';
import ReactDOM from 'react-dom';
import socketClient  from "socket.io-client";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import useLocalStorage from './hooks/useLocalStorage';

const BACKEND_PORT = '8080';


export const App = () => {
  const [id, setId] = useLocalStorage('id');

  return (
    <>
      {id ? <Dashboard id={id} />: <Login onIdSubmit={setId}/>}
      
    </>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));