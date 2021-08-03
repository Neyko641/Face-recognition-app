import React from 'react';
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SignInEmail: '',
      SignInPassWord: ''
    }
  }

  onEmailChange = (event) => {
   this.setState({SignInEmail: event.target.value});   
  }
  onPassWordChange = (event) => {
    this.setState({SignInPassWord: event.target.value});   
   }
   onSubmitSignIn = () => {
     fetch('http://localhost:3001/SignIn', {
       method:'post',
       headers: {'Content-type': 'application/json'},
       body: JSON.stringify({
         email: this.state.SignInEmail,
         password: this.state.SignInPassWord
       })
     }).then(response => response.json)
       .then(data => {
         if(data === 'success') {
          this.props.onRouteChange('home');
         }
       });
     
   }
  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
  <main className="pa4 black-80">
      <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                      <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                      <input onChange={this.onEmailChange} 
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="email" 
                      name="email-address"  
                      id="email-address"/>
                      </div>
                          <div className="mv3">
      <label className="db fw6 lh-copy f6" for="password">Password</label>
      <input 
      onChange={this.onPassWordChange} 
      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
      type="password" 
      name="password"  
      id="password"/>
    </div>
    <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me </label>
  </fieldset>
  <div className="">
    <input 
    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
    type="submit" 
    value="Sign in"
    onClick={this.onSubmitSignIn}/>
  </div>
  <div className="lh-copy mt3">
    <p onClick={() => onRouteChange('Register')} className="f6 link dim black db pointer">Register</p>
    <p href="#0" className="f6 link dim black db">Forgot your password?</p>
  </div>
</div>
</main>
</article>
      );
    }
  }   
export default SignIn;