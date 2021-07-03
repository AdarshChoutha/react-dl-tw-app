import { useState } from 'react';

import './TWApp.css';

var time = { min: 0, sec: 0 };
var totalInputWords = 0;

function TWApp({ tw_data }) {

    const [WPM, setWPM] = useState(0);
    const [ErrorCount, setErrorCount] = useState(0);
    const [TimerCount, setTimerCount] = useState('00 : 00');

    const words = tw_data.split(' ');

    function startTimer() {
        if (document.getElementById('input-text').classList.contains('firstTime')) {
            document.getElementById('input-text').classList.remove('firstTime');
            setInterval(() => {
                if ((time.sec + 1) >= 60) {
                    time.min++;
                    time.sec = 0;
                } else { time.sec++ }
                if (time.min < 10) {
                    if (time.sec < 10) setTimerCount(`0${time.min} : 0${time.sec}`);
                    else setTimerCount(`0${time.min} : ${time.sec}`);
                } else {
                    if (time.sec < 10) setTimerCount(`0${time.min} : 0${time.sec}`);
                    else setTimerCount(`0${time.min} : ${time.sec}`);
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
        console.log(time);
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
                <div className="score-container"><p>Words per Minute: {parseInt(WPM)}</p></div>
                <div className="error-count-container"><p>Number of Errors: {ErrorCount}</p></div>
                <div className="timer-container"><p>Time: {TimerCount}</p></div>
            </div>
            <div className="input-text-container">
                <textarea id="input-text" className="firstTime" type="text" onChange={setData}
                    onCopy={() => { return false }} onCut={() => { return false }} onPaste={() => { return false }} />
            </div>
        </div >
    );
}

export default TWApp;
