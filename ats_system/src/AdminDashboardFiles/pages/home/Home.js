import React, { useEffect } from 'react';

const Home = () => {

  useEffect(() => {
    document.title = 'Home - Admin'; // Change this to your desired title
  }, []);

  return <div>Home</div>;
};

export default Home;
