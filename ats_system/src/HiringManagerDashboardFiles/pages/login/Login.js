import React, { useEffect } from 'react';

const Login = () => {

  useEffect(() => {
    document.title = 'Login'; // Change this to your desired title
  }, []);

  return (
    <div>this is the login page</div>
  )
}

export default Login