import react from 'react';

const Login = () => {
    return (

    <form>
        <h1 className="text">Welcome to JAM. Sign in below</h1>

          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required/>
       
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required/>
       
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2023</p>
      </form>
    );
};

export default Login;