import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function Cart() {
  //   const dispatch = useDispatch();
  const { cartList, total } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(0);

  const handleBuy = (productId, quantity) => {
    console.log('Buy');
    // dispatch(buy(productId, quantity));
  };

  console.log('QUANTITY', quantity);

  return (
    <Box>
      <h1>Cart</h1>
      <span>Number of items: {total}</span>
      {total > 0 && (
        <Product>
          <span>{cartList[0].productName} </span>
          <span>{cartList[0].cost} </span>

          <QuantityInput
            value={quantity}
            type="number"
            min="0"
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Button type="submit">Buy</Button>
        </Product>
      )}
    </Box>
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

export default Cart;
