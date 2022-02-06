import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import socketClient  from "socket.io-client";
import ChatBox from './Components/ChatBox';

import './index.scss';

const BACKEND_PORT = '8080';


export const App = () => {
  // const [response, setResponse] = useState("");

  // useEffect(() => {
    
  //   const socket = socketClient(`http://localhost:${BACKEND_PORT}`);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });

  //   return () => socket.disconnect();
  // }, []);

  return (
    <ChatBox />
  )
};

ReactDOM.render(<App />, document.getElementById('root'));