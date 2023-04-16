import react from 'react';
import React, {SyntheticEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState('');
  const [log, setLog] = useState(false);
  // var log = false; 

  const submit = async (e:SyntheticEvent) =>{
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'}, 
            credentials : 'include',
            body: JSON.stringify({ 
                email, 
                password
            })
        });
    const content = await response.json();
    console.log(content);
    // setRedirect(true);

    const r = await fetch('http://localhost:8000/api/user', {
      headers: {'Content-Type' : 'application/json'}, 
      credentials : 'include',
    });
    const c = await r.json();
    setName(c.name);
    console.log(c.name);
      // setRedirect(true);
    if(c.name == undefined){
      setRedirect(false)
      setLog(true);
      console.log(log);
      
    }  
    else {
      setRedirect(true)
      setLog(false);
    } 
    // name ? setRedirect(true) : setRedirect(false)
  }
 
  // function refreshPage() {
  //   window.location.reload(false);
  // }

  if(redirect) {
    return <Navigate to= "/search"/>;
  }
  
  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit = {submit}>
          <h1 className="text">Welcome to JAM. Sign in below</h1>

          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
              onChange = {e=>setEmail(e.target.value)}
            />
        
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
              onChange = {e=>setPassword(e.target.value)}
            />
        
          
          <button className="btn-primary" type="submit">Sign In</button>
          
          {/* <p className="mt-5 mb-3 text-muted">&copy; 2023</p> */}
        </form>
        <div> {log && 
          <div className ="slogan"><div className="errorMessage"><b>Sorry, your email or password was incorrect. Try again.</b></div></div>}
        </div>
        <div className ="space"></div>
      </main>
    );
};

export default Login;