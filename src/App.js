
import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

import Register from './Components/Register/Register'; 
import SignIn from './Components/SignIn/SignIn';

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


const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false , 
      user: {
          id:'',
          name: '',
          email: '',
          entries: 0 ,
          joined: ''
      }
}
class App extends Component{

  constructor(){
    super();
      this.state = initialState;
  }

  onloadUser = (data) => {

    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries ,
      joined: data.joined
    }});

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
    fetch("https://salty-taiga-04637.herokuapp.com/imageUrl" , {
      method: "post",
      mode: "cors",
      headers: {"Content-Type":"application/json"} ,
      body: JSON.stringify({
        input: this.state.input})
    }).then(response => response.json())
    .then(response =>  {
      if(response){
        console.log(response);
        fetch('https://salty-taiga-04637.herokuapp.com/image' , {
      method: "put",
      mode: 'cors',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })

    }).then(response => response.json())
      .then(count => {
          this.setState(Object.assign(this.state.user , {entries: count}))
      })
      .catch(console.log);
    this.displayfaceBox(this.calculateFaceLocation(response));
    }
  }).catch(error => {console.log("the image have no  faces " + error);});
}

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
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
            <Rank entries={this.state.user.entries} user={this.state.user.name}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
        : (route === 'signin' || route === 'signout' ?<SignIn onRouteChange={this.onRouteChange} onloadUser={this.onloadUser}/> : <Register onRouteChange={this.onRouteChange}  />) 
        }
      </div>
    );
  }
}

export default App;
