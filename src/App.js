import Progress from './Progress'
import Game from './Game'
import Won from './Won'
import { DataProvider } from './context/DataContext'

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Progress/> 
        <Won/>
        <Game/>
      </DataProvider>
    </div>
  );
}

export default App;
