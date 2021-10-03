import React from 'react';
import Chat from './Chat';
import {Timer} from './QuestionTimer'
import { PlayerWindow } from './PlayerWindow';

function App() {
  return (
    <div style={{ margin: '0 30%' }}>
      <PlayerWindow />
      <Chat/>
      <Timer/>
    </div>
  
  );
};

export default App;