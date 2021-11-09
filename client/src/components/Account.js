import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { resetDeposit, makeDeposit } from '../features/user/userSlice';

function Account() {
  const { deposit, returnedMoney } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const coins = [100, 50, 20, 10, 5];
  const [totalEntered, setTotalEntered] = useState(0);

  const handleDeposit = (coin) => {
    dispatch(makeDeposit({ amount: coin }));
    setTotalEntered((prev) => prev + coin);
  };

  const handleReset = () => {
    dispatch(resetDeposit());
    setTotalEntered(0);
  };

  const formatChange = (denominationsHash) => {
    return Object.entries(denominationsHash).map(([key, value]) => (
      <div key={key}>
        <span>
          <b>{key} </b>:
        </span>
        <span> {value}</span>
      </div>
    ));

    // let k, v
    // for ([k, v] in denominationsHash) {
    //   return (
    //     <div key={k}>
    //       <span>
    //         <b>{k} </b>:
    //       </span>
    //       <span> {v}</span>
    //     </div>
    //   );
    // }
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
          <span>{totalEntered}</span>
        </Amount>
        <Change>
          <h4>Change returned on reset</h4>
          {returnedMoney && formatChange(returnedMoney)}
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
