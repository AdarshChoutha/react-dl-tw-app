import { useState } from 'react';

import './TWApp.css';

var time = { min: 0, sec: 0 };
var totalInputWords = 0;

function TWApp({ tw_data }) {

    const [WPM, setWPM] = useState(0);
    const [ErrorCount, setErrorCount] = useState(0);
    const [TimerCount, setTimerCount] = useState('0000');

    const words = tw_data.split(' ');

    function startTimer() {
        if (document.getElementById('input-text').classList.contains('firstTime')) {
            document.getElementById('input-text').classList.remove('firstTime');
            let timerInterval = setInterval(() => {
                setData();
                if ((time.sec + 1) >= 60) {
                    time.min++;
                    time.sec = 0;
                } else { time.sec++ }
                setTimerCount(
                    `${time.min.toLocaleString('en-US', { minimumIntegerDigits: 2 })}${time.sec.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`
                );
                if (time.min === 1 && time.sec === 0) {
                    console.log("Time's Up");
                    clearInterval(timerInterval);
                    document.getElementById('input-text').disabled = true;
                }
            }, 1000)
        }
    };

    function setData() {
        // Starting Timer
        startTimer();
        // Taking Input Text Value
        let inputValue = document.getElementById('input-text').value;
        // Taking Words of Input Text
        let inputWords = inputValue.split(' ');
        // Counting no of Words Typed
        let numberOfTypedWords = inputWords.length;
        totalInputWords += numberOfTypedWords;
        let wpm = (totalInputWords / 5) / (time.min + time.sec / 60);
        setWPM(isNaN(wpm) ? 0 : wpm);
        inputWords.forEach(inputWord => {
            if (words.includes(inputWord)) numberOfTypedWords--;
        })
        setErrorCount(numberOfTypedWords);
    }

    return (
        <div className="tw_app">
            <h1 className="heading">Typewritter App</h1>
            <div className="text-container">
                <h3>Text Paragraph</h3>
                <p onCopy={() => { return false }} onCut={() => { return false }} onPaste={() => { return false }}>{tw_data}</p>
            </div>
            <div className="feedback-container">
                <div className="score-container"><p>Words / Minute: {isNaN(parseInt(WPM)) ? 0 : parseInt(WPM)}</p></div>
                <div className="error-count-container"><p>Errors: {ErrorCount}</p></div>
                <div className="timer-container"><p>
                    Time: {TimerCount[0]}{TimerCount[1]}&nbsp;:&nbsp;{TimerCount[2]}{TimerCount[3]}
                </p></div>
            </div>
            <div className="input-text-container">
                <textarea id="input-text" className="firstTime" type="text" disabled={false} onChange={setData}
                    onCopy={() => { return false }} onCut={() => { return false }} onPaste={() => { return false }} />
            </div>
        </div >
    );
}

export default TWApp;
