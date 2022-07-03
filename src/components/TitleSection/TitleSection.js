import React from 'react';

function TitleSection({text, section}) {
  return (
    <h2 className={`title-section title-section_${section}`}>
      {text}
    </h2>
  )
}

export default TitleSection;