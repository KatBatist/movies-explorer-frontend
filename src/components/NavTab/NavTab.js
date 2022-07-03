import React from 'react';
import List from '../List/List';

function NavTab() {

  const navList = [
    {
      key: "1",
      text: "О проекте",
      link: "#about-project",
      classNameItem: "nav__item",
      classNameLink: "nav__link",
    },
    {
      key: "2",
      text: 'Технологии',
      link: '#techs',
      classNameItem: "nav__item",
      classNameLink: "nav__link",
    },
    {
      key: "3",
      text: 'Студент',
      link: '#about-me',
      classNameItem: "nav__item",
      classNameLink: "nav__link",
    },
  ];

  return (
    <nav>
      <List
        dataList={navList}
        nameList="nav__list"
        typeList="#"
      />
    </nav>
  )
}

export default NavTab;
