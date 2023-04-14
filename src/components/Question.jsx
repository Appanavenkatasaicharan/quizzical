import { useEffect, useState } from "react";

 
export default function Question(props){

    // Local state to render answer components based on the incoming props.

    const [answers,setAnswers] = useState([]);

    // An effect that will shuffle the answers before rendering. Will only run once per a question.
    
    useEffect(
    () => {   
            setAnswers([...props.incorrectAnswers,props.correctAnswer].sort(() => Math.random() - 0.5))
    },[props.correctAnswer]
    ) 
    
    const answerElements = props.isGameover ? 
    answers.map(
        (answer) => {
            let className = 'answer';
            if(answer === props.selectedAnswer && answer === props.correctAnswer){
                className = "correct-answer"
            }
            else if(answer === props.selectedAnswer && answer !== props.correctAnswer){
                className = "wrong-answer";
            }
            else if(answer === props.correctAnswer){
                className = "correct-answer";
            }
           return <div className={className}>{answer}</div>
        }
    )
    :
    answers.map(
        
        (answer) => <div  onClick={ () => {props.onClick(props.id,answer)} } 
                                className= {answer===props.selectedAnswer?"selected-answer": "answer" } >{answer}</div>
    )
    

    return (
        <div className="question">
            <p className="question--text">{props.question}</p>
            <div className="answer-container"> {answerElements} </div>
        </div>
    )

}