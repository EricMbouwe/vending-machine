import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  resetDeposit,
  makeDeposit,
  depositCoins,
} from '../features/user/userSlice';

function Account() {
  const {
    data: user,
    deposit,
    returnedMoney,
    totalSpent,
    productsList,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const coins = [100, 50, 20, 10, 5];
  const [amount, setAmount] = useState(0);

  const handleDeposit = (coin) => {
    dispatch(depositCoins(coin));
    dispatch(makeDeposit({ amount: coin }));
    setAmount((prev) => prev + coin);
  };

  const handleReset = () => {
    dispatch(resetDeposit());
    setAmount(0);
  };

  return (
    <Box>
      <h2>My Account</h2>
      <Box>
        <span>Balance: </span>
        <span>${deposit}</span>
      </Box>

      <DepositPad>
        <p>Click on coins to deposit</p>
        {coins.map((coin) => (
          <Button key={coin} onClick={() => handleDeposit(coin)}>
            {coin}
          </Button>
        ))}
        <Amount>
          <span>Total: </span>
          <span>{amount}</span>
        </Amount>
        <Button onClick={handleReset}>Reset</Button>
      </DepositPad>
    </Box>
  );
}

const Box = styled.div``;
const Button = styled.button`
  cursor: pointer;
`;
const DepositPad = styled.div`
  margin: 30px 0;
`;
const Amount = styled.div`
  margin: 30px 0;
`;

export default Account;
