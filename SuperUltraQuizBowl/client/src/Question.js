import React, { useState, useEffect, useRef } from 'react';




const Question=()=>{

   

    const [ question, setQuestion ] = useState('In the cartoon ducktails, who has the red shirt');
    const [ answer, setAnswer ] = useState('Huey');
    const onAnswerUpdate = (Answer) => {
       setAnswer(Answer)}
      

    const onSubmitNew = (e) => {

            e.preventDefault();
            if(answer == 'Huey')
            {
            alert("Congratulations");
            setAnswer("");
            }


    }




   
       
    return (
        <div>

           {question}
           <form   onSubmit={(e) => onSubmitNew(e)}>
           <input
   id="answer" 
name="answer" 
value={answer}
    onChange={(e) =>onAnswerUpdate(e.target.value)} 
/>
           <button >Submit</button>
           </form>
           
            
        </div>
    );

}
export default Question;