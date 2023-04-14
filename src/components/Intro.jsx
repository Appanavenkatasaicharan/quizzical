
// A component that displays the initial page of the web app

export default function Intro(props){
    return (
        <div className="intro">
        <h1>Quizzical</h1>
        <p>Test your cinema knowledge with a quick trivia</p>
        <button className="intro--button" onClick={props.onClick} >Start quiz</button>
        </div>
    )
}