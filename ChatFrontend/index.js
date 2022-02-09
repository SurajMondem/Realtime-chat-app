import React from 'react';
import ReactDOM from 'react-dom';
import socketClient  from "socket.io-client";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import useLocalStorage from './hooks/useLocalStorage';
import { ContactsProvider } from './contexts/ContactsProvider';
import './index.scss';
import { ConversationsProvider } from './contexts/ConversationsProvider';

const BACKEND_PORT = '8080';


export const App = () => {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  )


  return (
    <>
      {id ? dashboard : <Login onIdSubmit={setId}/>}
      
    </>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));