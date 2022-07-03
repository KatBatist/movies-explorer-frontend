import React from 'react';

function SubTitleSection({text, section}) {
  return (
    <h3 className={`subtitle-section subtitle-section_${section}`}>
      {text}
    </h3>
  )
}

export default SubTitleSection;