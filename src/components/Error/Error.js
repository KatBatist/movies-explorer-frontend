import React from 'react';

function Error({ classNameError, textError }) {

  return (
    <span className={`error ${classNameError}`}>
      {textError}
    </span>
  )
}

export default Error;
