import React from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, onOpenMenu }) {

  return (
    <header className="header">
      <Logo />
      <Navigation
        loggedIn={loggedIn}
        onOpenMenu={onOpenMenu}
      />
    </header>
  )
}

export default Header;
