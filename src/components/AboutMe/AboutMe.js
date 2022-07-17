import React from 'react';
import photoMe from '../../images/photoMe.jpg';
import HeaderSection from '../HeaderSection/HeaderSection';
import TitleSection from '../TitleSection/TitleSection';
import SubTitleSection from '../SubTitleSection/SubTitleSection';
import TextSection from '../TextSection/TextSection';
import List from '../List/List';

function AboutMe() {

  const aboutMeList = [
    {
      key: "1",
      text: "Facebook",
      link: "https://www.facebook.com/ekaterina.batist/",
      classNameItem: "about-me__item",
      classNameLink: "about-me__link",
    },
    {
      key: "2",
      text: "Github",
      link: "https://github.com/KatBatist",
      classNameItem: "about-me__item",
      classNameLink: "about-me__link",
    }
  ];

  return (
    <div id="about-me" className="about-me">
      <HeaderSection text="Студент"/>
      <div className="about-me__container">
        <div className="about-me__container-text">
          <div >
            <TitleSection
              text="Екатерина"
              section="about-me" />
            <SubTitleSection
              text="Фронтенд-разработчик"
              section="about-me"
            />
            <TextSection
              text="Я родилась в России. Закончила факультет прикладной математики в г. Челябинске и с 1995г.
                работаю программистом.Я люблю слушать музыку, путешествовать, увлекаюсь танцами. Три года назад
                ушла с постоянной работы и занимаюсь фриланс-заказами. Недавно переехала в Израиль и после
                окончания курса по веб-разработке собираюсь найти постоянную работу в Израиле."
              section="about-me"
            />
          </div>
          <List
            dataList={aboutMeList}
            nameList="about-me__container-list"
          />
        </div>
        <img className="about-me__photo" src={photoMe} alt="Автор учебного проекта." />
      </div>

    </div>
  )
}

export default AboutMe;
