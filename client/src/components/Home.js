import { logoutUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <Box>
      <h1>Home page</h1>
      <button onClick={handleLogout}>Logout</button>
    </Box>
  );
}

const Box = styled.div``;

export default Home;
