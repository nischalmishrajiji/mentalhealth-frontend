import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://' + window.location.hostname + ':3000');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'userCount') {
        document.getElementById('userCount').textContent = `User Count for Today: ${data.count}`;
        console.log('WebSocket msg received', data);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className='container'>
      <h1>Welcome to the Home Page</h1>
      <div id="userCount">User Count for Today: 0</div>
    </div>
  );
};

export default Home;
