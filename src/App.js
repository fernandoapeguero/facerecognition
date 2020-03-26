import React , {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'ad4959b234064287b32da7697125d9b7'
 });

const particlesOptions = {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true ,
          value_area: 800
        }
      }
    }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
       input: '',
    }
  }

  onInputChange = (event) => {

         console.log(event.target.value);
  }

  onSubmit = () => {
     console.log('click');
  }

  render () {
      return (
        <div className="App">
          <Particles className='particles'
              params={particlesOptions}
              />
          <Navigation /> 
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange}  
            onButtonSubmit={this.onSubmit} />

         {/* <FaceRecognition /> */}
        </div>
      );
    }
}

export default App;
