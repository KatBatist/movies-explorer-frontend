import React from 'react';
import List from '../List/List';
import Account from '../Account/Account';

function Navigation({ loggedIn, onOpenMenu }) {

  const navigationList = [
    {
      key: "1",
      text: "Фильмы",
      link: "/movies",
      classNameLink: "navigation__link navigation__link_bold",
    },
    {
      key: "2",
      text: "Сохранённые фильмы",
      link: "/saved-movies",
      classNameLink: "navigation__link",
    },
  ];

  const navigationAuthList = [
    {
      key: "1",
      text: "Регистрация",
      link: "/signup",
      classNameLink: "navigation__link navigation__link_auth",

    },
    {
      key: "2",
      text: "Войти",
      link: "/signin",
      classNameLink: "navigation__link navigation__link_auth-color",
    }
  ];

  return (
    <>
      {loggedIn
        ? (<>
            <div className="navigation">
              <List
                dataList={navigationList}
                nameList="navigation__list"
                typeList="link"
              />
            <Account />
            </div>
            <button className="navigation__open-btn" type="button" onClick={onOpenMenu}></button>
          </>)
        : (<List
            dataList={navigationAuthList}
            nameList="navigation__list navigation__list_auth"
            typeList="link"
          />)
      }
    </>
  )
}

export default Navigation;

