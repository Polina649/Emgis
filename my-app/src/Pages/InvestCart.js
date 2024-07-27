import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollToTopButton from '../Components/ScrollToTopButton';
// import Search from '../Components/SearchBar';
import logo from './img/logo.png';
import mean from './img/icons_invest/manager.svg';
import i from './img/icons_invest/icons8-информация-64.png';
// import earth from './img/earth-1303628_1280.webp';
import markersing from './img/icons_invest/icons8-маркер-на-карте-100.svg';
import Earch from '../Components/EarthModel';
import exit from '../Pages/img/icons8-enter-50.png';

const Earth = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Рисуем основание шара
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'yellow';
      ctx.fill();
      ctx.closePath();
      // Рисуем тень для придания объемности
      ctx.beginPath();
      ctx.ellipse(centerX + 20, centerY + 20, radius, radius / 2, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();
      ctx.closePath();
    }
    draw();
  }, []);

  return <canvas ref={canvasRef} width={200} height={200} />;
};


const FancyLink = ({ href, children }) => {
  return (
    <a href={href} className="fancy-link">
      {children}
    </a>
  );
};


const IconWithHoverEffect = ({ src, alt }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => {
    const flippedState = localStorage.getItem('iconFlipped_' + alt);
    setIsFlipped(flippedState === 'true');
  }, [alt]);

  const handleMouseEnter = () => {
    setIsFlipped(true);
    localStorage.setItem('iconFlipped_' + alt, 'true');
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    localStorage.setItem('iconFlipped_' + alt, 'false');
  };

  return (
    <div
      className={`icon-container ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <img src={src} alt={alt} />
    </div>
  );
};


const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateLinks, setAnimateLinks] = useState(false);
  const modalRef = useRef(null);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

   useEffect(() => {
    const iconFlipped = localStorage.getItem('iconFlipped_pageReload');
    if (iconFlipped !== 'true') {
     setTimeout(() => {
        localStorage.setItem('iconFlipped_pageReload', 'true');
       // setIsModalOpen(true);
     }, 1000);
    }
    setTimeout(() => {
    setAnimateLinks(true);
    }, 300);
  }, []);

  function CheckboxItem({ title, id, onClick }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      const savedChecked = localStorage.getItem(id);
      if (savedChecked !== null) {
        setChecked(savedChecked === 'true');
      }
    }, [id]);

    const handleToggle = () => {
      const newChecked = !checked;
      setChecked(newChecked);
      localStorage.setItem(id, newChecked);
      onClick(); // Вызываем функцию обратного вызова при изменении состояния чекбокса
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
      {isModalOpen && (
        <div className="modal-background">
          <div className="modal" ref={modalRef} style={{width: "400px"}}>
            <div className="modal-content">
              {/* Здесь можете разместить содержимое вашего модального окна */}
              <div className='text_modal'>Единая муниципальная геоинформационная система <br/>городского округа Тольятти</div>
              <div className="title_text_maodal">Департамент городского хозяйства</div>
              <div className="flex_modal">
                <form method='' action='' className='form_modal'> 
                  <div className="flex_maodal_login">
                    <label className='label_avtorization'>Логин</label>
                    <input className='input_avtorization_first' type='text'/>
                  </div>
                  <div className="flex_maodal_login">
                    <label className='label_avtorization'>Пароль</label>
                    <input className='input_avtorization' type='password'/>
                  </div>
                  <div className="form-group form-check">
                    <CheckboxItem title="Запомнить меня" id="remember" onClick={() => {}} />
                  </div>
                </form>
              </div>
              <div className='flex_button_searsh'>
                <button className="button_model">Войти</button>
              </div>
            </div>
          </div>
        </div>
        
      )}
      <div className="header">
        <div className='header_menuserf'>
        <div className="logo">
          <div>
          <Link to="/"><img src={logo} alt="EMGIS Logo" /></Link>
          <Link to="/"><span className='logo_text'>ЕМГИС</span></Link>
          </div>
          <Link to="/"><p>Единая муниципальная геоинформационная <br/> система городского округа Тольятти</p></Link>
        </div>
        <div className="nav_menu" style={{marginRight: "0px", width: "35px", height: "30px", display: "flex", flexDirection: "row-reverse"}}>
            <img src={exit} alt='Войти' onClick={toggleModal} className="exit" style={{marginRight: "0px", width: "35px", height: "30px", cursor: "pointer"}}/>
            <div className="exit" style={{color: "#002fa8", cursor: "pointer"}}>Войти</div>
        </div>
       </div>
      </div>
      
      <div className="invest_styles">
      <div className="flex_main_content_invests">
        <div className="left_main_content_tema"></div>
        <div className="center_main_content_tema">
          <div className="title_main">Инвестиционная карта г.о. Тольятти</div>
          <div className='flex'>
            <div className='flex_links'>
              <div className={`flex_icons_link ${animateLinks ? 'animate-links' : ''}`}>
                <div className='icons'><IconWithHoverEffect src={mean} alt="резиденты"/></div>
                <FancyLink href="/gis_portal/#/invest_zone_map" index={0}>Действующие <br/> резиденты ТОР</FancyLink>
              </div>
              <div className={`flex_icons_link ${animateLinks ? 'animate-links' : ''}`}>
                <div className='icons'><IconWithHoverEffect src={i} alt="резиденты"/></div>
                <FancyLink href="/gis_portal/#/invest_zone_map" index={1}>Инвестиционные <br/> площадки</FancyLink>
              </div>
              <div className={`flex_icons_link ${animateLinks ? 'animate-links' : ''}`}>
                <div className='icons'><IconWithHoverEffect src={markersing} alt="резиденты"/></div>
                <FancyLink href="/gis_portal/#/invest_zone_map" index={2}>Объекты недвижимости <br/>для реализации<br/> инвестиционных проектов</FancyLink>
              </div>
            </div>
            <div className='glob_flex'>
              <Earch/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Main;