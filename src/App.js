import './App.css';

import DLApp from './components/DLApp';
import TWApp from './components//TWApp';

const dl_data = require('./assets/data/dl_data.json');
const tw_data = require('./assets/data/tw_data.json');

function App() {
	document.addEventListener('DOMContentLoaded', () => {
		document.querySelector('.app-break-container').innerHTML = "";
		for (let k = 1; k <= window.innerWidth / 16; k++) {
			document.querySelector('.app-break-container').innerHTML += '<div class="app-break"></div>';
		}
	})
	return (
		<div className="App">
			<DLApp dl_data={dl_data} />
			<div className="app-break-container"></div>
			<TWApp tw_data={tw_data} />
		</div>
	);
}

export default App;
