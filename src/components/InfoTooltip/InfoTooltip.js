import React from 'react';
import Popup from '../Popup/Popup';

function  InfoTooltip ({ isOpen, onClose, text, isError}) {

  return (
    <Popup
      name="message"
      isOpen={isOpen}
      onClose={onClose}
    >
      <h3 className={isError ? `popup__message popup__message-error` : `popup__message`}>
        {text}
      </h3>
    </Popup>
  )
}

export default InfoTooltip;