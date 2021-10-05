import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import SignUpOrLogin from './SignUpOrLogin';
import { PlayerWindow } from './PlayerWindow';
import Question from './Question';


const Chat = (props) => {
    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);
    const [ players, newPlayer] = useState([]);
    const latestPlayers = useRef(null);
    latestChat.current = chat;
    latestPlayers.current = players;
    const user = props.user;
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('AddNewPlayer', user  => {
                    const updatedPlayers = [...latestPlayers.current];
                    updatedPlayers.push(user);
                        alert(user);
                   newPlayer(updatedPlayers);

                    });
                    
    
                    connection.on('ReceiveMessage', message => {

                       
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                    
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        if (connection.connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }
   
    return (
        <div>

            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat}/>
            {players.map(x  => {(<PlayerWindow/>)})}
            <hr/>
            <PlayerWindow/>
            
        </div>
    );
};

export default Chat;

/*
import React, { useState, useEffect, useRef, useContext} from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import SignUpOrLogin from './SignUpOrLogin';
import { PlayerContext } from './PlayerContext';
import { PlayerWindow } from './PlayerWindow';


class Chat extends React.Component{

    state = {
        connection : null,
        chat : [],
        latestChat : "",
        players : []
    }

static contextType = PlayerContext;
componentWillMount() {
    const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/hubs/chat')
        .withAutomaticReconnect()
        .build();

    this.setState({connection : newConnection});

    if (this.state.connection) {
        this.state.connection.start()
            .then(result => {
                console.log('Connected!');

                this.state.connection.on('AddNewPlayer', user  => {
                const updatedPlayers = [this.state.players];
                this.updatedPlayers.push(user);
                alert(user + 'Lathun Freak it');
               this.setState({players : updatedPlayers});
               this.context = this.state.players;
                });
                

                this.state.connection.on('ReceiveMessage', message => {

                   
                    const updatedChat = [this.state.chat];
                    updatedChat.push(message);
                
                    this.setState({chat :updatedChat});
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }
};



async sendMessage  (user, message)  {
    const chatMessage = {
        user: user,
        message: message
    };

    if (this.state.connection.connectionStarted) {
        try {
            await this.state.connection.send('SendMessage', chatMessage);
        }
        catch(e) {
            console.log(e);
        }
    }
    else {
        alert('No connection to server yet.');
    }
}

render()
{

    <PlayerContext.Consumer>
    {this.context = this.state.players}

    </PlayerContext.Consumer>
    return(
    <div>

        <ChatInput sendMessage={this.sendMessage} />
        <SignUpOrLogin/>


<ul>
       {this.state.players}
        </ul>
        
        <hr />
        <ChatWindow chat={this.state.chat}/>

    </div>
    )
}
};

export default Chat;*/