import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  resetDeposit,
  makeDeposit,
  depositCoins,
} from '../features/user/userSlice';

function Account() {
  const { deposit, returnedMoney } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const coins = [100, 50, 20, 10, 5];

  const handleDeposit = (coin) => {
    dispatch(depositCoins(coin));
    dispatch(makeDeposit({ amount: coin }));
  };

  const handleReset = () => {
    dispatch(resetDeposit());
  };

  const formatChange = Object.entries(returnedMoney).map(([key, value]) => (
    <div key={key}>
      <span>
        <b>{key} </b>:
      </span>
      <span> {value}</span>
    </div>
  ));

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
          <span>{deposit}</span>
        </Amount>
        <Change>
          <h4>Change returned</h4>
          {formatChange}
        </Change>
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
const Change = styled.div`
  margin: 30px 0;
`;
export default Account;
