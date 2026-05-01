import { useContext } from 'react'
import Progress from './Progress'
import Game from './Game'
import Won from './Won'
import { DataProvider } from './context/DataContext'
import DataContext from "./context/DataContext";

function App() {
  const { progress } = useContext(DataContext)
  return (
    <div className="App">
        {/* <Header title='React JS Blog'/> */}
      <DataProvider>

        {/* <Nav/> */}
        <Progress/> 
        <Won/>
        <Game/>
      </DataProvider>

        {/* <Footer /> */}
    </div>
  );
}

export default App;
