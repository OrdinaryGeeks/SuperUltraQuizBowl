import React from 'react';
import './PlayerWindow.css';
import {Timer} from './IndividualTimer'
import Question from './Question'





export const PlayerWindow = (props) =>
{


    const name = props.name;

    return(

    <div>

        <Question/>
        <Timer/>

    
    </div>



    )




}