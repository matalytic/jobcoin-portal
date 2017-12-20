import React from 'react';

const Balance = ({balance}) => {
  return (
    <div id="balance">
      <h3>Jobcoin Balance</h3>
      <h3>{balance}</h3>
    </div>
  );
};

export default Balance;