import './App.css';

import DLApp from './components/DLApp';
import TWApp from './components//TWApp';

const dl_data = require('./assets/data/dl_data.json');
const tw_data = require('./assets/data/tw_data.json');

function App() {
  return (
    <div className="App">
      <DLApp dl_data={dl_data} />
      <TWApp tw_data={tw_data} />
    </div>
  );
}

export default App;
