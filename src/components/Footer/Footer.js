import React from 'react';
import SubTitleSection from '../SubTitleSection/SubTitleSection';
import List from '../List/List';

function Footer() {

  const footerList = [
    {
      key: "1",
      text: 'Яндекс.Практикум',
      link: 'https://praktikum.yandex.ru/',
      classNameItem: "footer__item",
      classNameLink: "footer__link",
    },
    {
      key: "2",
      text: 'Github',
      link: 'https://github.com/KatBatist',
      classNameItem: "footer__item",
      classNameLink: "footer__link",
    },
    {
      key: "3",
      text: 'Facebook',
      link: 'https://www.facebook.com/ekaterina.batist/',
      classNameItem: "footer__item",
      classNameLink: "footer__link",
    },
  ];

  return (
    <footer className='footer'>
      <SubTitleSection
        text="Учебный проект Яндекс.Практикум х BeatFilm."
        section="footer"
      />
      <div className='footer__container'>
        <p className='footer__copyright'>© 2022</p>
        <List
          dataList={footerList}
          nameList="footer__list"
        />
      </div>
    </footer>
  )
}

export default Footer;
