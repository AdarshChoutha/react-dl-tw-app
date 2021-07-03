import './TWApp.css';

function TWApp({ tw_data }) {
    return (
        <div className="tw_app">
            <h1 className="heading">Typewritter App</h1>
            <div className="text-container"></div>
            <div className="score-container"></div>
            <div className="error-count-container"></div>
            <div className="timer-container"></div>
            <div className="imput-text-container"></div>
        </div>
    );
}

export default TWApp;
