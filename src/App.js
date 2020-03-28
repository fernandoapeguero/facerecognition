
import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai' ;
import Register from './Components/Register/Register'; 
import SignIn from './Components/SignIn/SignIn';



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

class App extends Component{

  constructor(){
    super();
      this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
      
        return {
          leftCol: clarifaiFace.left_col * width ,
          topRow: clarifaiFace.top_row * height ,
          rigthCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
  }


  displayfaceBox = (box) => {
        this.setState({box})
  }


  onInputChange = (event) => {

    this.setState({input: event.target.value});

  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input});
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response =>  {
          this.displayfaceBox(this.calculateFaceLocation(response));} 
          ).catch(error => {console.log("the image have no  faces " + error);}) 
}

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }

      this.setState({route: route})
  
  }

  render() {

    const {isSignedIn , imageUrl , box , route} = this.state;

    return (
      <div className="App">

        <Particles className='particles'
            params={particlesOptions}
            />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/> 
        { route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
        : (route === 'signin' || route === 'signout' ?<SignIn onRouteChange={this.onRouteChange} /> : <Register onRouteChange={this.onRouteChange} />) 
        }
      </div>
    );
  }
}

export default App;
