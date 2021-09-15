import { logoutUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './Menu';
import { useEffect } from 'react';
import { fecthProductsAsync } from '../features/product/productSlice';
import Cart from '../features/cart/Cart';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fecthProductsAsync());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <Box>
      <h1>Home page</h1>
      {user.role === 'seller' && <Button>My Store</Button>}
      <Button onClick={handleLogout}>Logout</Button>
      <Menu />
      <Cart />
    </Box>
  );
}

const Box = styled.div``;
const Button = styled.button`
  cursor: pointer;
`;

export default Home;
