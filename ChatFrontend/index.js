import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import useLocalStorage from './hooks/useLocalStorage';
import { ContactsProvider } from './contexts/ContactsProvider';
import './index.scss';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';


export const App = () => {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )


  return (
    <>
      {id ? dashboard : <Login onIdSubmit={setId}/>}
      
    </>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));