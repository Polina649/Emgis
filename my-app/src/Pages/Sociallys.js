import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
import account_balance from './img/icons_header/account_balance.png';
import add_location from './img/icons_header/add_location.png';
import architecture from './img/icons_header/architecture.png';
import assistant_navigation from './img/icons_header/assistant_navigation.png';
import compost from './img/icons_header/compost.png';
import shield from './img/icons_header/shield.png';
import images_atlas_soc from './img/maps/image_2.png';
// import Slaider from '../Components/Slader_socially'
import ScrollToTopButton from '../Components/ScrollToTopButton'; // Импортируем компонент кнопки прокрутки наверх

import works from '../Pages/img/icons_header/free-icon-administration-6887054.png';
import fountain from '../Pages/img/icons_socialys/fountain_a5knvdmi82l1.svg';
import park from '../Pages/img/icons_socialys/park_19rpeytrc6gj.svg';
import square from '../Pages/img/icons_socialys/square_se2iz2zfwhaw.svg';
import sports from '../Pages/img/icons_socialys/sports_3ygbgln2hnq1.svg';
import family from '../Pages/img/icons_socialys/family_bca0aur0piah.svg';
import parks from '../Pages/img/icons_socialys/park_zf897miyvs8x.svg';
import manument from '../Pages/img/icons_socialys/icons8-памятник-80.png';
import markersing from '../Pages/img/icons_invest/icons8-маркер-на-карте-100.svg';
import alley from '../Pages/img/icons_socialys/alley.png';
import moxayka from '../Pages/img/icons_socialys/icons8-современное-искусство-64.png';
import memoryal from '../Pages/img/icons_socialys/memorial_0vl8n49vqjx8.svg';
import cemetry from '../Pages/img/icons_socialys/cemetery_oc5zfbuvw39e.svg';


const IconButton = ({ text, iconSrc, link }) => (
  <a href={link} className="button_slois_2">
    <div className="icon-wrapper">
      <img src={iconSrc} alt="icon" className="icon" />
    </div>
    <div className="text">{text}</div>
  </a>
);


const items = [
  { text: "Фонтаны", iconSrc: fountain},
  { text: "Парки", iconSrc: park},
  { text: "Площадь", iconSrc: square},
  { text: "Спортивные объекты", iconSrc: sports},
  { text: "Площадки семейного отдыха", iconSrc: family},
  { text: "Скверы", iconSrc: parks },
  { text: "Памятники", iconSrc: manument}, 
  { text: "Памятные знаки", iconSrc: cemetry},
  { text: "Мемориалы", iconSrc: memoryal},
  { text: "Аллеи", iconSrc: alley},
  { text: "Мозаика", iconSrc: moxayka },
  { text: "Иные объекты", iconSrc: markersing },
]

class Slaider extends React.Component {
  render() {
    const columnStyle = {
      display: 'inline-block',
      width: '30%', // Adjust as needed
      verticalAlign: 'top',
      textAlign: 'center',
    };
    const rowStyle = {
      width: '50%',
      textAlign: 'center',
    };
    return (
      <div className="slider-container">
        <div className="row">
          {items.map((item, index) => (
            <div className="column" key={index}>
              <IconButton text={item.text} iconSrc={item.iconSrc} link={item.link} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const Socially = () => {
  return (
    <div className="atlas_eco_styles">
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
      <img src={images_atlas_soc} alt="Экогическая карта" class="atlas"/>
    </div>
    <br/>
<Slaider/>
    <div class="flex_main_content">
        <div class="button-container_main_2">
    
    <button class="button_slois_24"><Link to='/szo_map'>Перейти на карту</Link></button>
    </div>
    </div>
    <br/>
    <div class="text_osnov">Знаковые и социально значимые объекты</div>
    <br/>
    <div class="flex_text_vtor">
        <div class="decor_text_vtor">Знаковыми и социально значимыми местами городского округа Тольятти являются расположенные на территории городского округа Тольятти территории общего пользования городского округа, объекты физической культуры и спорта, мемориальные комплексы, памятные знаки, обладающие исторической и культурной значимостью, иными памятными и отличительными признаками, имеющие особое значение для муниципального образования, а именно:</div>
    </div>
    <div class="flex_text_vtor">

    <ul class="push">
      <li>Территории общего пользования - территории, которыми беспрепятственно пользуется неограниченный круг лиц (в том числе площади, улицы, парки, лесопарки, набережные, пляжи, скверы, сады, бульвары, территории мемориальных комплексов)</li>
      <li>Объекты физической культуры и спорта - объекты недвижимого имущества или комплексы недвижимого имущества, специально предназначенные для проведения физкультурных мероприятий и спортивных мероприятий</li>
      <li>Мемориальные комплексы - архитектурные сооружения, воздвигнутые для увековечения памяти о каком-либо лице или событии</li>
      <li>Памятные знаки - стелы, скульптурные композиции и другие художественно-архитектурные формы, установленные на площадях, улицах, в парках, скверах, других открытых территориях городского округа, имеющие историческую и культурную значимость для муниципального образования</li>
    </ul>
    </div>
    <ScrollToTopButton /> {/* Вставляем компонент кнопки прокрутки наверх */}
    <br/>
    <br/>
    <br/>
</div>
  );
}

export default Socially;