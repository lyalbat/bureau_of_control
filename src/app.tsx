import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ledON, setledON] = useState(false);

  useEffect(() => {
    const sendData = async () => {
      try {
        await fetch('/api/updateClickedState', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ledON }),
        });
      } catch (error) {
        console.log('Error sending data:', error);
      }
    };

    sendData(); 
    
    return () => {
      setledON(false);
      sendData(); 
    };
  }, [ledON]);

  return (
    <div className="App">
      <div className="container">
        <div className={`box ${ledON ? 'off' : 'on'}`}>
          LED Ligado?: {ledON ? 'OFF' : 'ON'}
        </div>
      </div>
    </div>
  );
}

export default App;
