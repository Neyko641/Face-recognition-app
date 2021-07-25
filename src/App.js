import './App.css';
import Navigation  from './components/Navigation/Navigation';
import ImageLinkForm  from './components/ImageLinkForm/ImageLinkForm';
import Logo  from './components/Logo/Logo';
import FaceRecognition  from './components/FaceRecognition/FaceRecognition';
import Rank  from './components/Rank/Rank';
import Particles from 'react-particles-js';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
const app = new Clarifai.App({
  apiKey: '29ced2b0b77b434e9970592b24af755f'
})
const paramsOptions = {
    "particles": {
      "number": {
        "value": 160,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "star",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 0.3,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ``,
      imageUrl: ``
    }
  }
   onChange = (event) => {
     this.setState({input: event.target.value});
  }
   onBtnSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      });
  }
  render() {
  return (
    <div className="App">
      <Navigation/>
      <Logo/>
      <ImageLinkForm 
      onChange={this.onChange}                
      onBtnSubmit={this.onBtnSubmit} 
      />
      <Rank/>
      <Particles params={paramsOptions} className='particles'/>
      <FaceRecognition imageUrl = {this.state.imageUrl}/>
    </div>
  );
  }
}

export default App;
