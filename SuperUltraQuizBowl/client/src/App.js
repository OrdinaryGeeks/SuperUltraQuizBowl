import React from 'react';
import Chat from './Chat';
import {Timer} from './QuestionTimer'
import { PlayerWindow } from './PlayerWindow';
import GameWindow from './GameWindow';
import  players from './SignUpOrLogin';
import SignUpOrLogin from './SignUpOrLogin';
//import players from './SignUpOrLogin';
import {PlayerContext} from './PlayerContext'


class App extends React.Component{

  
  


render(){

  
  return (
    <div style={{ margin: '0 30%' }}>
   

   
<PlayerContext.Provider value={[]}>
      hello
        
        
  

        
        
        <SignUpOrLogin/>
       

  </PlayerContext.Provider>
     
    </div>
  
  );
};
}

export  default App;