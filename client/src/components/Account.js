import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      <h2>My Account</h2>
      <div>
        <span>Balance: </span>
        <span>${deposit}</span>
      </div>

      <div>
        <p>Click on coins to deposit</p>
        <ul>
          {coins.map((coin) => (
            <li key={coin}>
              <button onClick={() => handleDeposit(coin)}>{coin}</button>
            </li>
          ))}
        </ul>
        <div>
          <span>Total: </span>
          <span>{totalEntered}</span>
        </div>
        <div>
          <h4>Change returned on reset</h4>
          {returnedMoney && formatChange(returnedMoney)}
        </div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Account;
