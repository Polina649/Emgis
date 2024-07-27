import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
import account_balance from './img/icons_header/account_balance.png';
import add_location from './img/icons_header/add_location.png';
import architecture from './img/icons_header/architecture.png';
import assistant_navigation from './img/icons_header/assistant_navigation.png';
import compost from './img/icons_header/compost.png';
import shield from './img/icons_header/shield.png';
import images_atlas_ecos from './img/maps/image_1.png';
import './css/Atlas.css'; // Подключаем файл стилей
// import Slaider_ecos from '../Components/Eco_main';
import ScrollToTopButton from '../Components/ScrollToTopButton'; // Импортируем компонент кнопки прокрутки наверх
import exit from '../Pages/img/icons8-enter-50.png';
import co_2 from '../Pages/img/icon_eco_atlas/air_pollution_pmad0emvwiuf.svg';
import water from '../Pages/img/icon_eco_atlas/water_drop_q5tesl01uvqi.svg';
import sound from '../Pages/img/icon_eco_atlas/frequency_odxh8z11ma6h.svg';
import radon from '../Pages/img/icon_eco_atlas/radon_kpdpmsc06kid.svg';
import radiation from '../Pages/img/icon_eco_atlas/radiation_9d4389t57j3m.svg';
import soil from '../Pages/img/icon_eco_atlas/soil_mt128v3xo8mn.svg';
import noise from '../Pages/img/icon_eco_atlas/sound_naeh8wpoxjc2.svg';
import elktromagnetic from '../Pages/img/icon_eco_atlas/magnet_wnqp9p23cjch.svg';
import rtution from '../Pages/img/icon_eco_atlas/mercury_jc5b9j2voo86.svg';
import plastisk from '../Pages/img/icon_eco_atlas/plastic_bottle_seelo9u9mx46.svg';
import batarey from '../Pages/img/icon_eco_atlas/battery_1p3bs9fbuhir.svg';
import plamy from '../Pages/img/icon_eco_atlas/flask_un3epy4h8593.svg';
import labor from '../Pages/img/icon_eco_atlas/prisoner_transport_vehicle_bwj3unj8ggzg.svg';
import container from '../Pages/img/icon_eco_atlas/recycling_bin_6yxrv8ql3v6l.svg';
import maleks from '../Pages/img/icon_eco_atlas/icons.svg';
import axios from 'axios';
import $ from 'jquery';

const IconButton = ({ text, iconSrc, link }) => (
  <a href={link} className="button_slois_2">
    <div className="icon-wrapper">
      <img src={iconSrc} alt="icon" className="icon" />
    </div>
    <div className="text">{text}</div>
  </a>
);

const items = [
  { text: "Загрязнение воздуха", iconSrc: co_2, link: "/eco_card" },
  { text: "Контейнеры для пластиковых бутылок", iconSrc: plastisk, link: "/eco_card" },
  { text: "Передвижная экологическая лаборатория", iconSrc: labor, link: "/eco_card" },
  { text: "Радоновое излучение", iconSrc: radon, link: "/eco_card" },
  { text: "Оценка радиац. загрязнения", iconSrc: radiation, link: "/eco_card" },
  { text: "Исследовательские образцы почвы", iconSrc: soil, link: "/eco_card" },
  { text: "Площадки для размещения контейнеров ТКО", iconSrc: container, link: "/eco_card" },
  { text: "Электромагнитное излучение", iconSrc: elktromagnetic, link: "/eco_card" },
  { text: "Полихлорированные бифенилы", iconSrc: maleks, link: "/eco_card" },
  { text: "Пункты приема ртутосодерж. отходов", iconSrc: rtution, link: "/eco_card" },
  { text: "Загрязнение воды", iconSrc: water, link: "/eco_card" },
  { text: "Пункты приёма использованных батареек", iconSrc: batarey, link: "/eco_card" },
  { text: "Объекты негативного воздействия", iconSrc: plamy, link: "/eco_card" },
  { text: "Инфразвуковые волны", iconSrc: sound, link: "/eco_card" },
  { text: "Акустический уровень шума", iconSrc: noise, link: "/eco_card" },
];

const Slaider_ecos = () => {
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



const Eco_Atlas = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await axios.post('/api/auth/login', { username, password });
          if (response.data.Success) {
              // Успешный вход, можно перенаправить пользователя
              window.location.href = '/main'; // Измените путь в зависимости от маршрутизации
          }
      } catch (error) {
          setError('Неправильное имя пользователя или пароль');
      }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const TgglesWarnings = () => {
  }
  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function CheckboxItem({ title, id, onClick }) {
    const [checked, setChecked] = useState(false);
    const handleToggle = () => {
      const newChecked = !checked;
      setChecked(newChecked);
      localStorage.setItem(id, newChecked);
      onClick();
    };
    return (
          <div className="checkbox-item" onClick={handleToggle}>
            <div className={`custom-checkbox ${checked ? 'checked' : ''}`} />
            <label>{title}</label>
          </div>
        );
      }

  return (
    <div className="main_styles" onClick={handleClickOutside}>
    <div className="atlas_eco_styles">
      <div className="atlas_styles">
      {isModalOpen && (
        <div className="modal-background" style={{background: "rgba(1, 1, 1, 0.2);"}}>
          <div className="modal" ref={modalRef} style={{width: "400px"}}>
            <div className="modal-content">
              <div className='text_modal'>Единая муниципальная геоинформационная система <br/>городского округа Тольятти</div>
              <div className="title_text_maodal">Департамент городского хозяйства</div>
              <div className="flex_modal">
                <form method='' action='' className='form_modal' onSubmit={handleSubmit}> 
                  <div className="flex_maodal_login">
                    <label className='label_avtorization'>Логин</label>
                    <input className='input_avtorization_first' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                  <div className="flex_maodal_login">
                    <label className='label_avtorization'>Пароль</label>
                    <input className='input_avtorization' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  {error && <div style={{textAlign: "center", color: "red"}}>{error}</div>}
                  <div className="form-group form-check">
                    <CheckboxItem title="Запомнить меня" id="remember" type="submit"/>
                  </div>
                    <div className='flex_button_searsh'>
                      <button className="button_model">Войти</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

<div className='header'>
                        <div className="logo">
                            <div>
                                <Link to="/"><img src={logo} alt="EMGIS Logo" /></Link>
                                <Link to="/"><span className='logo_text'>ЕМГИС</span></Link>
                            </div>
                            <Link to="/"><p>Единая муниципальная геоинформационная <br /> система городского округа Тольятти</p></Link>
                        </div>
                        <div className="nav_menu" style={{ marginRight: "0px", width: "35px", height: "30px", display: "flex", flexDirection: "row-reverse" }}>
                            <img src={exit} alt='Войти' onClick={toggleModal} className="exit" style={{ marginRight: "0px", width: "35px", height: "30px", cursor: "pointer" }} />
                            <div className="exit" onClick={toggleModal} style={{ color: "#002fa8", cursor: "pointer", justifyContent: "center" }}>Войти</div>
                        </div>
                    </div>


   <div class="flex_atlas_img">
      <img src={images_atlas_ecos} alt="Экогическая карта" class="atlas"/>
    </div>
<br/>
  <Slaider_ecos/>

<div class="flex_main_content">
<div class="button-container_main_2" style={{justifyContent: "center"}}>

<button class="button_slois_24" style={{justifyContent: "center"}}><Link to="/atlas_map">Перейти на карту</Link></button>
</div>
</div>
<br/>
<div class="text_osnov">Экологическая ситуация в городском округе Тольятти</div>
<br/>

<div></div>

<div class="flex_text_vtor">
    <div class="decor_text_vtor">Современная история города Тольятти - это история создания крупнейших промышленных предприятий.Создание мощной энергитической и строительной базы определило дальнейшую перспективу развития города как индустриального центра.Были сооружены крупные химические объекты. ТЭЦ, ВЦМ, ВАЗ, в связи, с чем экологическая ситуация,
        как и во многих других промышленных центрах, весьма напряженная. Одной из особенностей города является наличие лесных массивов, которые располагаются
        между его районами и служат их естесственными границами.Кроме того, рядом с Тольятти есть плодородные почвы, в недрах есть нефть, газ, горючие сланцы, минеральные воды и разнообразные минералы. Все это позволяет считать Тольятти городом с благоприятной экологической обстановкой.Необходимо отметить, что в городском округе Тольятти сохраняется тенденция снижения или стабилизации ряда показателей, характеризующих состояние окружающей среды.В городе, как и во всем Самарском регионе, активизируется деятельность по экологической информации, образованию и повышению уровня экологической культуры населения, повышается активность природоохранной деятельности общественных экологических организаций.</div>
</div>
<br/>
<br/>
<ScrollToTopButton /> {/* Вставляем компонент кнопки прокрутки наверх */}
</div>
</div>
</div>
  );
}

export default Eco_Atlas;