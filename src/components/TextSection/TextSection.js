import React from 'react';

function TextSection({text, section}) {
  return (
    <p className={`text-section text-section_${section}`}>
      {text}
    </p>
  )
}

export default TextSection;