import './App.css';
import Navigation  from './components/Navigation/Navigation';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import Logo  from './components/Logo/Logo';
import Rank  from './components/Rank/Rank';
import Particles from 'react-particles-js';


const paramsOptions = {
  particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800 
        }
      }
    }
}

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Logo/>
      <ImageLinkForm />
      <Rank/>
      <Particles params={paramsOptions} className='particles'/>
      {/*<FaceRecognition/>*/}
    </div>
  );
}

export default App;
