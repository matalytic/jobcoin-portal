import React from 'react';

const Navbar = ({returnToLogin}) => {
  return (
    <div id="navbar">
      <div className="logo">
        <span className="banner">Jobcoin Sender</span>
      </div>
      <span id="sign-out" onClick={() => returnToLogin()}>Sign Out</span>
    </div>
  );
};

export default Navbar;