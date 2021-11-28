import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Routes from './routes';
import { fecthUserAsync } from './features/user/userSlice';
import GuestHeader from './components/GuestHeader';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthUserAsync());
  }, [dispatch]);

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
