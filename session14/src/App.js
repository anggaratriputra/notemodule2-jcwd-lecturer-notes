import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import { handleGetToken, onMessageListener } from './firebase';

function App() {
  const [openTab, setOpenTab] = React.useState(3);
  const [isTokenFound, setTokenFound] = React.useState(false);
  handleGetToken(setTokenFound);

  console.log(isTokenFound);

  onMessageListener()
    .then((payload) => {
      console.log(payload);
      alert(payload.notification.title);
    })
    .catch((err) => alert('failed: ', err));

  return (
    <div className="App">
      {isTokenFound && 'Notification permission enabled 👍🏻'}
      {!isTokenFound && 'Need notification permission ❗️ '}
      <div>
        {openTab !== 3 && (
          <>
            <button onClick={() => setOpenTab(1)}>Register</button>
            <button onClick={() => setOpenTab(2)}>Login</button>
          </>
        )}
      </div>
      {openTab === 1 && <Register setOpenTab={setOpenTab} />}
      {openTab === 2 && <Login setOpenTab={setOpenTab} />}
      {openTab === 3 && <Dashboard setOpenTab={setOpenTab} />}
    </div>
  );
}

export default App;
