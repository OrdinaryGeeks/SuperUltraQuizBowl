
import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import parse from "html-react-parser";
import {PlayerContext} from './PlayerContext';
import Chat from './Chat';

class SignUpOrLogin extends React.Component {

     user ="";
     password="";
     loggedIn = false;
     players = [];
     connection = null;
     chat=[];

    state = {

        user : "",
        password: "",
        loggedIn :false,
        players:[],
        connection:null,
        chat:[]


}

    constructor(props){
        super(props);

        

        const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/hubs/chat')
        .withAutomaticReconnect()
        .build();

       this.setState({loggedIn:false})
     
        this.setState({connection : (newConnection)})

    if (newConnection) {
        newConnection.start()
            .then(result => {

                console.log(' suofl Connected!');
                this.setState({connection: (newConnection)});
            }).catch(e => console.log('Connection failed: ', e));
        }  

    }



    componentWillMount(){


    }

    componentDidMount() {
     
    };


   
    
    async onSubmitNew  (e) {
       e.preventDefault();

        const thisPlayer = {
            user: this.state.user,
            password: this.state.password
        };

        alert(this.state.connection);
        if (this.state.connection.connectionStarted) {
            try {
        const isUserProvided = this.state.user && this.state.user !=='' ;
        const isPasswordProvided = this.state.password && this.state.password !=='' ;

        if (isUserProvided && isPasswordProvided) {
            this.setState({loggedIn : true});
            this.state.connection.send("NewPlayer", this.state.user);
      
        } 
        else {
            alert('Please insert a user and a password.');
        }
    }
    catch(e) {
        console.log(e);
    }
}
else {
    alert('No connection to server yet.');
}
}

    
    
/*     const onSubmitReturning = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== ;
        const isPasswordProvided = password && password !== ;

        if (isUserProvided && isPasswordProvided) {
            props.login(user, password);
        } 
        else {
            alert(Please insert a user and a password.);
        }
    }
 */
  onUserUpdate  (User) {this.setState(
      { user : User}
    );

  }
     onPassWordUpdate(Password)  {
       this.setState({password : Password})
   
    }

    render()
   {

  //  let contextType  = PlayersContext;
  
        let formToLogIn="";

     // this.formToLogin="hello";
 


    return ( 
        
        
        this.state.loggedIn==false ? (
         <div>{
            

   
            /* 
<React.Fragment>
<PlayersContext.Consumer>
{


}
</PlayersContext.Consumer>
</React.Fragment> */}
        <form act
    onSubmit={(e) => this.onSubmitNew(e)}>
<label htmlFor="user">User:</label>
<br />
<input
   id="user" 
name="user" 
value={this.state.user}
    onChange={(e) =>this.onUserUpdate(e.target.value)} 
/>
<br/>
<label htmlFor="password">Password:</label>
<br />
<input 
type="text"
id="password"
name="password" 
value={this.state.password}
onChange={ (e) => this.onPassWordUpdate(e.target.value)}
/>
<br/><br/>
<button>Submit</button>

</form>

</div>) :  <Chat user={this.state.user}/>);
};
   

    
};

export default SignUpOrLogin;