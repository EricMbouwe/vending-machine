import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { makePurchase } from '../user/userSlice';
import { removeFromCart } from './cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { cartList, total } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);

  const { returnedMoney, totalSpent, productsList } = useSelector(
    (state) => state.user,
  );

  const formatChange = (denominationsHash) => {
    return Object.entries(denominationsHash).map(([key, value]) => (
      <div key={key}>
        <span>
          <b>{key} </b>:
        </span>
        <span> {value}</span>
      </div>
    ));
  };

  const handleBuy = () => {
    const productId = cartList[0]?.id;
    if (!productId || productId === undefined) return;
    dispatch(makePurchase({ productId, quantity }));
  };

  const handleChangeQuantity = (e) => {
    const value = parseInt(e.target.value);
    let totalTopay = 0;

    setQuantity(value);

    totalTopay = value * cartList[0]?.cost;
    setAmount(totalTopay);
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(cartList[0].id));
    setAmount(0);
    setQuantity(0);
  };

  return (
    <div>
      <h2>Cart</h2>
      <span>Number of items: {total}</span>
      {total > 0 && (
        <Product>
          <span>{cartList[0].productName} </span>
          <span>{cartList[0].cost} </span>

          <QuantityInput
            value={quantity}
            placeholder="quantity"
            type="number"
            min="0"
            onChange={handleChangeQuantity}
          />

          <Button onClick={handleRemoveItem}>Remove</Button>
          <Button onClick={handleBuy}>Buy</Button>
        </Product>
      )}

      <Box>
        <h3>Total</h3>
        <span>${amount}</span>

        <ReturnedItems>
          <Change>
            <h4>Change returned</h4>
            {returnedMoney && formatChange(returnedMoney)}
          </Change>

          <Box>
            <h4>Product list</h4>
            <ProductList>
              {productsList &&
                productsList.map((product) => (
                  <li key={product.id}>{product.productName}</li>
                ))}
            </ProductList>
          </Box>

          <Box>
            <h4>Total spent</h4>
            <span>${totalSpent}</span>
          </Box>
        </ReturnedItems>
      </Box>
    </div>
  );
}

const Box = styled.div``;
const Product = styled.div`
  margin: 10px 0;
`;
const Button = styled.button`
  cursor: pointer;
  margin-left: 5px;
`;
const QuantityInput = styled.input`
  width: 60px;
`;

const Change = styled.div``;

const ReturnedItems = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: center;
  gap: 25px;
`;

const ProductList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Cart;
