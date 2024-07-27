import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
import account_balance from './img/icons_header/account_balance.png';
import add_location from './img/icons_header/add_location.png';
import architecture from './img/icons_header/architecture.png';
import assistant_navigation from './img/icons_header/assistant_navigation.png';
import compost from './img/icons_header/compost.png';
import shield from './img/icons_header/shield.png';
import images_atlas from './img/maps/image_3.png';
import ScrollToTopButton from '../Components/ScrollToTopButton'; // Импортируем компонент кнопки прокрутки наверх


const IconButton = ({ text, link }) => (
    <a href={link} className="button_slois_2">
      <div className="text">{text}</div>
    </a>
  );
  
  const items = [
        { text: "Центры участковых комиссий", link: "/territory"},
        { text: "Границы избирательных участков", link: "/territory"},
        { text: "Дома на избирательных участков", link: "/territory"},
        { text: "Округа на выборах депутатов Думы городского округа", link: "/territory"},
        { text: "Центры территориальных комиссий", link: "/territory"},
        { text: "Округа на выборах депутатов Самарской Губернской Думы", link: "/territory"},
  ];


  class Slaider_atlas extends React.Component {
    render() {
      const columnStyle = {
        display: 'inline-block',
        width: '30%', // Adjust as needed
        verticalAlign: 'top',
        textAlign: 'center',
      };
      return (
        <div className="slider-container">
          <div className="row">
            {items.map((item, index) => (
              <div className="column" key={index}>
                <IconButton text={item.text} link={item.link} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }


const Atlas = () => {
  return (
    <div className="atlas_styles">
       <div className="header">
      <div className="logo">
          <div>
          <Link to="/"><img src={logo} alt="EMGIS Logo" /></Link>
          <Link to="/"><span className='logo_text'>ЕМГИС</span></Link>
          </div>
          <Link to="/"><p>Единая муниципальная геоинформационная <br/> система городского округа Тольятти</p></Link>
        </div>
   </div> 
    <div class="flex_atlas_img">
    <img src={images_atlas} alt="Экологическая карта" class="atlas"/>
    </div> 
<br/>
<Slaider_atlas/>
<br/>
<br/>
<br/>
<br/>
<div class="flex_main_content">
    <div class="button-container_main_2">
<button class="button_slois_24"><Link to="/voting_map">Перейти на карту</Link></button>
</div>
</div>
<br/>
    <div class="text_osnov">Избирательные территории</div>
    <br/>
    <div class="flex_text_vtor">
    <div class="decor_text_vtor">В соответствии с федеральным законодательством на территории города для обеспечения процесса голосования и подсчёта голосов избирателей на избирательных участках на постоянной основе созданы участковые избирательные комиссии (УИК). В городе – 246 участковых комиссий.</div>
</div>
<br/>
    <div class="text_osnov">Уровни территориальных избирательных<br/> комиссий</div>
    <br/>
    <div class="flex_text_vtor">
        <div class="decor_text_vtor"><a href="">ТИК Автозаводского района города Тольятти</a></div>
    </div>
        <br/>
    <div class="flex_text_vtor">
        <div class="decor_text_vtor"><a href="">ТИК Центрального района города Тольятти</a></div>
    </div>
        <br/>
    <div class="flex_text_vtor">
        <div class="decor_text_vtor"><a href="">ТИК Комсомольского района города Тольятти</a></div>
    </div>
    <div class="flex_text_vtor">
        <div class="decor_text_vtor">На территориальную избирательную комиссию Автозаводского района возложены функции избирательной комиссии городского округа Тольятти.Территория города разбита на избирательные округа: непосредственно от округа избирается депутат в представительный орган власти. Жители Тольятти выбирают депутатов в три представительные органа: Государственную Думу Российской Федерации (на территории города – 2 округа), Самарскую Губернскую Думу (6 округов) и Думу городского округа Тольятти (17 избирательных округов).</div>
    </div>
    <div>
    </div>
<br/>
<br/>
<br/>
<ScrollToTopButton /> {/* Вставляем компонент кнопки прокрутки наверх */}
</div>
  );
}
export default Atlas;