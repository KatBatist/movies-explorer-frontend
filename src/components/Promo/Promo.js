import React from 'react';
import TitleSection from '../TitleSection/TitleSection';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <div className="promo">
      <div className="promo__container">
        <TitleSection
          text="Учебный проект студента факультета Веб-разработки."
          section="promo"
        />
        <div className="promo__container-list">
          <NavTab />
        </div>
      </div>
    </div>
  )
}

export default Promo;

