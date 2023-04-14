import { useEffect, useState } from "react";
import { decode } from 'html-entities';
import Question from "./Question";

export default function Quiz(props){


    // Holds our question.
    const [questions,setQuestions] = useState([]);
    // Holds the string value of the selected answer of each question
    const [selectedAnswers,setSelectedAnswers] = useState(['','','','','']);
    // To determine when the end game screen should be displayed
    const [gameover,setGameover] = useState(false);
    // Score obtained during the game
    const [score,setScore] = useState(0);
    
    // This effect iniatially makes the api call to fetch the questions. It will only run once the component is rendered.
    useEffect(
        () => {
                  fetch("https://opentdb.com/api.php?amount=5&category=11&type=multiple")
                  .then(response => response.json())
                  .then(data => {setQuestions(data.results)})
        },[]
    )

    // Event handler that resets the app.
    function newQuiz(){
        fetch("https://opentdb.com/api.php?amount=5&category=11&type=multiple")
        .then(response => response.json())
        .then(data => {setQuestions(data.results)})
        setSelectedAnswers(['','','','',''])
        setGameover(false)
        setScore(0)
    }

    function selectAnswer(questionId,answer){
        console.log(selectedAnswers)
        setSelectedAnswers(
            (prevSelectedAnswers) => prevSelectedAnswers.map(
                (selectedAnswer,index) => index === questionId ? answer : selectedAnswer  
            ) 
        )
    }

    function checkAnswers(){
        let t = 0;
        for(let i=0;i<questions.length;i++){
            if(selectedAnswers[i] === questions[i].correct_answer){
                t++;
            }
        }
        setScore(t);
        setGameover(true)
    }
    

    const questionElements = questions.map(
        (question,index) => <Question id = {index}
                                question = {decode(question.question)}
                                correctAnswer = {decode(question.correct_answer)}
                                incorrectAnswers = {question.incorrect_answers.map((answer) => decode(answer))}
                                onClick = {selectAnswer}
                                selectedAnswer = {selectedAnswers[index]}
                                isGameover = {gameover}
                                />
      )

    return (
        <div className="quiz">
        {questionElements}
        {gameover ? <span><p className="result-text">You have scored {score}/{questions.length}</p><button className="newgame-button" onClick={newQuiz}>New quiz</button></span> :<center><button className="check-button" onClick={checkAnswers}>Check answers</button></center>}
        </div>
    )


}