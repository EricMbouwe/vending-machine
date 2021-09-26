import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';
import Routes from './routes';
import { fecthUserAsync } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthUserAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
