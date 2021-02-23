import React, { useState } from 'react';
import './App.css';
import {useSpring, animated} from 'react-spring';


function App() {

  const [registrationFormStatus, setRegistrationFormStatus] = useState(false);
  const loginProps = useSpring ({
    left: registrationFormStatus ? -500 : 0
  })
  const registerProps = useSpring ({
    left: registrationFormStatus ? 0 : 500
  })

  const loginBtnProps = useSpring({borderBottom: registrationFormStatus ? 'solid 0px transparent' : 'solid 2px gray'})
  const registerBtnProps = useSpring({borderBottom: registrationFormStatus ? 'solid 2px gray' : 'solid 0px transparent'})


  function registerClicked() {  setRegistrationFormStatus(true)}
  function loginClicked() { setRegistrationFormStatus(false)}

  

  let record = [];
 
    const addData = (ev) => {
      ev.preventDefault();
      let data = {
        id: (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        name: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        rpassword: document.getElementById('rpassword').value
      }
      record.push(data);
      //document.querySelector('form').reset();

      console.log('added', {record});
      let pre = document.querySelector('#msg pre');
      if (pre){
        pre.textContent = '\n' + JSON.stringify(record, '\t', 2);
      }
      localStorage.setItem('DataList', JSON.stringify(record));
    }

    


  document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', addData);
  });
  
  

  return (
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button onClick={loginClicked} id="loginBtn" style={loginBtnProps}>Login</animated.button>
        <animated.button onClick={registerClicked} id="registerBtn" style={registerBtnProps}>Register</animated.button>
      </div>
      <div className="form-group">
        <animated.form action='' id='loginform' style={loginProps}><LoginForm/></animated.form> 
        <animated.form action='' id='registerform' style={registerProps}><RegisterForm/></animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}><a href="www.google.com" >Forgot password?</a></animated.div>
      
    </div>
  );
}

function LoginForm() {
  return (
    <React.Fragment>
      <label htmlFor='username'>USERNAME</label>
      <input type='text' id='username'/>
      <label htmlFor='password'>PASSWORD</label>
      <input type='password' id='lpassword'/>
      <input type='submit' value='submit' className='submit' />
    </React.Fragment>
  )}

function RegisterForm() {
  return (
    <React.Fragment>
      <div id='form'>
        <label htmlFor='fullname'>FULLNAME</label>
        <input type='text' id='fullname'/>
        <label htmlFor='email'>EMAIL</label>
        <input type='text' id='email' />
        <label htmlFor='address'>ADDRESS</label>
        <input type='text' id='address' />
        <label htmlFor='phone'>PHONE</label>
        <input type='text' id='phone'/>
        <label htmlFor='password'>PASSWORD</label>
        <input type='password' id='rpassword'/>
        <input type='submit' value='submit' className='submit' id='btn' />
      </div>
      
    </React.Fragment>
  ) }
export default App;
