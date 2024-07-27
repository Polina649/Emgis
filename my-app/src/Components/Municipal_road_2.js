import React, { useState, useRef, useEffect } from 'react';
import '../Pages/css/Saidbar.css';
import { Link } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
import MapComponent from './MapComponent';
import 'react-datepicker/dist/react-datepicker.css';
import reestr from '../Pages/img/logo_rosreestr.png';
import mfc from '../Pages/img/logo_mfc.png';
import portal from '../Pages/img/logo_portalSamaraObl.png';
import grafics from '../Pages/img/grafic.jpg';
import { NavLink } from 'react-router-dom';
import slaider from '../Pages/img/icons8-слои-32.png';
import spravka from '../Pages/img/icons8-информация-в-поп-апе-32.png';
import nasad from '../Pages/img/icons8-стрелка-назад-24.png';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); 
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};


useEffect(() => {
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  if (isModalOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
  }
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isModalOpen]);

   const [pageLoaded, setPageLoaded] = useState(false);
   useEffect(() => {
     setPageLoaded(true);
   }, []);

 return (
    <div className='home_styles'>
      <div className='municipal_road_saidbar'>
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal} style={{position: "fixed", inset: "0px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "10000"}}>
          <div className="modal" ref={modalRef} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgb(255, 255, 255)", padding: "20px", borderRadius: "8px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px", maxWidth: "80%", overflowY: "auto", height: "800px"}}>
            <div className="modal-content" style={{height: "750px", display: "flex", flexDirection: "column", alignItems: "center"}}>
              <p style={{ color: "rgb(0, 47, 168)", textAlign: "center", fontSize: "20px"}}>Как изменить вид разрешенного использования земельного участка?</p>
              <img alt="fsdfsdfsdfsfd" src={grafics} style={{height: "600px", width: "550px"}}/>
            </div>
          </div>
        </div>
      )}
    <div className={`sidebar_shoilds ${isOpen ? 'open' : ''}`}>
      <div className='menu_tops'>
        <div className="container_searsh">
          <div style={{ fontSize: "30px", textAlign: "center", color: "#002fa8", paddingLeft: "65px", paddingTop: "20px"}}>Информация</div>
        </div>
        <button className="toggle-btn" onClick={toggleSidebar} style={{transform: "translate(35px, -12px)"}}>
          {isOpen ? '⮌' : '⮎'}
        </button>
      </div>
      <div className="content_saidbar_main_shoilda">
      <div className="text_modal" style={{ color: "#002fa8", textAlign: "center", fontSize: "16px", position: "relative", textDecoration: "underline" }} onClick={toggleModal}>
        Как изменить вид разрешенного использования земельного участка?
      </div>
      <div className='Link' style={{background: "#000", width: "100px", background: "rgb(0 47 168)", width: "97%", height: "2px", marginTop: "30px", marginBottom: "30px"}}></div>
      <div style={{color: "#002fa8", textAlign: "center"}}>Заказать выписку из ЕГРН</div>
        <div className='flex_block_gpg' style={{display: "flex", marginTop: "40px", justifyContent: "space-around"}}>
        <div className='block_infors' style={{width: "113px", height: "38px", border: "1px solid #002fa8", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center"}}><Link to="https://rosreestr.ru/wps/portal/p/cc_present/EGRN_1"><img src={reestr} alt="fdhfghfgh" style={{width: "100px"}}/></Link></div>
        <div className='block_infors' style={{width: "113px", height: "38px", border: "1px solid #002fa8", borderRadius: "6px",display: "flex", justifyContent: "center", alignItems: "center"}}><Link to="http://mfc63.samregion.ru/service_info/?i=358&c=040000"><img src={mfc} alt="fdhfghfghpp[" style={{width: "100px"}}/></Link></div>
      </div>
      <div className='Link' style={{background: "#000", width: "100px", background: "rgb(0 47 168)", width: "97%", height: "2px", marginTop: "30px", marginBottom: "30px"}}></div>
            <div style={{color: "#002fa8", textAlign: "center"}}>Получить сведения из реестра муниципальной собственности</div>
            <div style={{color: "#002fa8", textAlign: "center"}}>Заказать выписку из ЕГРН</div>
            <div className='flex_block_gpg' style={{display: "flex", marginTop: "40px", justifyContent: "space-around"}}>
            <div className='block_infors' style={{width: "113px", height: "38px", border: "1px solid #002fa8", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center"}}><Link to="https://pgu.samregion.ru/rpguWeb/metro/newServicePassport.jsp?servicePassportId=6300100010000234933&indexPage=stateStructureTree&popularPage=1&limit=50&recipientCategoryType=physical#preventBack"><img src={portal} alt="fdhfghfgh" style={{width: "100px"}}/></Link></div>
            <div className='block_infors' style={{width: "113px", height: "38px", border: "1px solid #002fa8", borderRadius: "6px",display: "flex", justifyContent: "center", alignItems: "center"}}><Link to="http://mfc63.samregion.ru/service_info/?i=358&c=040000"><img src={mfc} alt="fdhfghfghpp[" style={{width: "100px"}}/></Link></div>
      </div>
      </div>
      <div className="flex_bootom_panel_saidbar" style={{justifyContent: "center", display: "flex",  marginBottom: "20px", marginTop: "20px"}}>
            <Link title="На главную" to="/" className='a'><button className="button button-left"><img src={nasad} style={{height: "28px"}}/></button></Link>
      </div>
    </div>
  </div>
  </div>
);
}

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='burger-menu-municipal'>
      <div className='logo-menu'>
        {/* Разместите здесь ваш логотип */}
      </div>
      <button onClick={toggleMenu} className={`burger-menu-municipal ${isOpen ? 'active' : ''}`}>
        <div className="burger-icon"></div>
        <div className="burger-icon"></div>
        <div className="burger-icon"></div>
      </button>
      <div className={`menu-items ${isOpen ? 'show' : ''}`}>
      <NavLink to="/eco_atlas">
          <img src={slaider} alt="Icon 2" style={{width: "30px", height: "30px"}}/>
          <span><Link to="/municipal_road">Слои</Link></span>
        </NavLink>
        <NavLink>
          <img src={spravka} alt="Icon 2" style={{width: "30px", height: "30px"}}/>
          <span><Link to="/municipal_road_two">Справка</Link></span>
        </NavLink>
      </div>
    </div>
  );
};

function Home() {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleMapClick = () => {
    setIsModalOpen(false); // Закрываем модальное окно при клике на карту
  };
  return (
    <div className='resident'>
    <div className="main_styles">
    
    <div className='resident_styles'>
       <div className="header" style={{justifyContent: "center"}}>
        <div className="logo">
          <div>
          <Link to="/"><img src={logo} alt="EMGIS Logo" /></Link>
          <Link to="/"><span className='logo_text'>ЕМГИС</span></Link>
          </div>
          <Link to="/"><p>Муниципальная автоматизированная<br/>информационная система "Земельные участки Тольятти"</p></Link>
        </div>
        <BurgerMenu/>
      </div>
      <MapComponent onClick={handleMapClick} /> 
       <Sidebar/> 
        </div>
    </div>
    </div>
  );
}
export default Home;