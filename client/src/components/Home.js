import React from 'react';
import { logoutUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import Menu from './Menu';
import { useEffect } from 'react';
import {
  fecthProductsAsync,
  fecthProductsBySeller,
} from '../features/product/productSlice';
import Cart from '../features/cart/Cart';
import SellerStore from './SellerStore';
import Account from './Account';

function Home() {
  const dispatch = useDispatch();

  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fecthProductsAsync());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h1>Home page</h1>
      <h2>{user.username.toUpperCase()}</h2>
      {user.role === 'seller' && (
        <button onClick={() => dispatch(fecthProductsBySeller(user.id))}>
          My Store
        </button>
      )}
      <button onClick={handleLogout}>Logout</button>
      <hr />
      {user.role === 'buyer' && <Account />}
      <hr />
      <Menu />
      <hr />
      {user.role === 'buyer' && <Cart />}
      <hr />
      {user.role === 'seller' && <SellerStore />}
    </div>
  );
}

export default Home;
