import React from 'react';
import  './PlayerWindow.css';
 export class Timer extends React.Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: 5, buzzedIn:false};
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
      
      
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }
  
    startTimer() {
     this.setState({buzzedIn : true});
  
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        buzzedIn : this.state.buzzedIn
      });
      
      // Check if we're at zero.
      if (seconds == 0) { 
        clearInterval(this.timer);
      }
    }
  
    render() {

      this.backGroundClass = "buzzedInRectangle";
     const buzzedIn = this.state.buzzedIn;
      if(buzzedIn==true)
      {
      this.backGroundClass = "rectangle";
    
      }
      else
      this.backGroundClass = "buzzedInRectangle";
      return(
        <div className={this.backGroundClass}>
          
           <button onClick={this.startTimer}>Start</button>
          <p style={{color: "white"}}> {this.state.time.m} s: {this.state.time.s}</p>
  
</div>

      );
    }
  }
