import React from 'react';
import HeaderSection from '../HeaderSection/HeaderSection';
import TitleSection from '../TitleSection/TitleSection';
import TextSection from '../TextSection/TextSection';
import List from '../List/List';

function Techs() {

  const techsList = [
    {
      key: "1",
      text: "HTML",
      classNameItem: "techs__text",
    },
    {
      key: "2",
      text: "CSS",
      classNameItem: "techs__text",
    },
    {
      key: "3",
      text: "JS",
      classNameItem: "techs__text",
    },
    {
      key: "4",
      text: "React",
      classNameItem: "techs__text",
    },
    {
      key: "5",
      text: "Git",
      classNameItem: "techs__text",
    },
    {
      key: "6",
      text: "Express.js",
      classNameItem: "techs__text",
    },
    {
      key: "7",
      text: "mongoDB",
      classNameItem: "techs__text",
    },
  ];
  return (
    <div id="techs" className="techs">
      <HeaderSection
        text="Технологии"
      />
      <div className="techs__container">
        <TitleSection
          text="7 технологий"
          section="techs"
        />
        <TextSection
          text="На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте."
          section="techs"
        />
        <List
          dataList={techsList}
          nameList="techs__list"
          typeList="li"
        />
      </div>
    </div>

  )
}

export default Techs;

