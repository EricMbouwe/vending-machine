import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GuestHeader from './components/GuestHeader';

function App() {
  return (
    <div className="">
      <GuestHeader />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
