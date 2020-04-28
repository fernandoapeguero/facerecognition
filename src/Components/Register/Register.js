import React , {Component} from 'react';


class Register extends Component{

  constructor(props){
    super(props)
    this.state = {
        name: '',
        email: '' ,
        password: ''
    }
  
  }



  onNameEnter = (event) => {

    this.setState({name: event.target.value})

  }

  onEmailEnter = (event) => {

    this.setState({email: event.target.value})
  }


  onPasswordEnter = (event) => {
    this.setState({password: event.target.value})
  }

  onRegisterSubmit = () => {
      const {name , email , password} = this.state;

      fetch('http://localhost:3000/register' , {
        method: 'post',
        mode: 'cors',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name:name , email:email , password:password })
      }).then(res => res.json())
        .then(data => {
            if(typeof data === 'object'){
              this.props.onRouteChange('signin');
            }

        })



  }


  render() {


    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
        <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register </legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input onChange={this.onNameEnter} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailEnter} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input onChange={this.onPasswordEnter} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
            </div>
            
          </fieldset>
          <div className="">
            <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="button" 
                    value="Register"
                    onClick={this.onRegisterSubmit}
                    />
          </div>
        </form>
      </main>
    </article>
    )
    }
  }


export default Register