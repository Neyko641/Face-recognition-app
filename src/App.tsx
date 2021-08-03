import './App.css';
import Navigation  from './components/Navigation/Navigation';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import Logo  from './components/Logo/Logo';
import FaceRecognition  from './components/FaceRecognition/FaceRecognition';
import Rank  from './components/Rank/Rank';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from "react-tsparticles";
//import background from './background.json';


const app = new Clarifai.App({
  apiKey: '29ced2b0b77b434e9970592b24af755f'
})
//const paramsOptions = {background}
class App extends Component {
  state:Record<string,unknown>
  constructor() {
    super({});
    this.state = {
      input: ``,
      imageUrl: ``,
      box: {},
      route:'SignIn',
      isSignedIn: false,
      user: {
        email: '',
        id: '',
        name: '',
        password: '',
        entries: 0,
        dateJoined: ''

      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        email: data.email,
        id: data.id,
        name: data.name,
        password: data.password,
        entries: data.entries,
        dateJoined: data.dateJoined
    }})
  }
  componentDidMount() {
    fetch('http://localhost:3001/')
    .then(response => response.json())
    .then(console.log);
  }
  calcFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg') as HTMLCanvasElement;
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

   onChange = (event) => {
     this.setState({input: event.target.value});
  }
   onBtnSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calcFaceLocation(response)))
    .catch(err => console.log(err));
  }
    onRouteChange = (route) => {
      switch(route) {
        case 'SignOut': this.setState({isSignedIn: false});
        break;
        case 'home':  this.setState({isSignedIn: true});
        break;
        default: break;} 
      this.setState({route: route});
    }

  render() {
  return (
    <div className="App">
       <Particles url="https://api.jsonbin.io/b/6108ffa7e4542115878816ea" className='particles'/>
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home' 
      ? <div>
      <Logo/>
      <ImageLinkForm 
      onChange={this.onChange}                
      onBtnSubmit={this.onBtnSubmit}/>
      <Rank/>
      <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl}/>
      </div>
      : (this.state.route === 'SignIn') 
      ? <SignIn onRouteChange = {this.onRouteChange} /> 
      : <Register onRouteChange = {this.onRouteChange} />
  }
    </div> 
  );
  }
}

export default App;
