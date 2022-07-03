import React from 'react';
import { Link } from 'react-router-dom';

function Account({onClose, type}) {

  return (
    <Link
      className={`account account_${type}`}
      to="/profile"
      onClick={onClose}
    >
      Аккаунт
    </Link>
  )
}

export default Account;