import React, { useState, useRef, useEffect } from 'react';
import './css/Main.css'; // Подключаем файл стилей
import logo from '../Pages/img/logo.png';
import { Link } from 'react-router-dom';
import ScrollToTopButton from '../Components/ScrollToTopButton';
import account_balance from './img/icons_header/account_balance.png';
import add_location from './img/icons_header/add_location.png';
import architecture from './img/icons_header/architecture.png';
import assistant_navigation from './img/icons_header/assistant_navigation.png';
import compost from './img/icons_header/compost.png';
import shield from './img/icons_header/shield.png';
import works from './img/icons_header/free-icon-administration-6887054.png';
import portals from './img/icons_header/free-icon-database-10210343.png';
import admins from './img/icons_header/free-icon-investment-approach-14597325.png';
// import Search from '../Components/SearchBar';
import burger from '../Pages/img/icons8-меню-50.png';
import exit from '../Pages/img/icons8-enter-50.png';
import reclams from '../Pages/img/icons_header/icons8-реклама-50.png';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const modalRef = useRef(null);
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
    <div className="main_backgroun_style">
    <div className="main_styles" onClick={handleClickOutside}>
      {isModalOpen && (
        <div className="modal-background" style={{background: "rgba(1, 1, 1, 0.2);"}}>
          <div className="modal" ref={modalRef} style={{width: "400px"}}>
            <div className="modal-content">
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
            <div className="exit" onClick={toggleModal} style={{color: "#002fa8", cursor: "pointer", justifyContent: "center"}}>Войти</div>
          </div>
       </div>
      </div>


      <div className="flex_main_content">
        <div className="title_main">ГИС-портал городского округа Тольятти</div>
        <div className="flex_main_content">
            <div className='deco_title'>Объединяет пространственные данные, накопленные различными подразделениями администрации городского округа Тольятти и используемые в следующих информационных ресурсах:</div>
        </div>

        <div className="flex_main_content_slois">
            <Link to="/map" className='a'><button className="button_slois_24">Муниципальные отраслевые слои</button></Link>
          </div>
            <div className="title_main_two">
              Прочие муниципальные ГИС-ресурсы
            </div>

            <div className="flex_main_content">
            <div className="button-container_main_2">
            <Link to="/atlas" className='a'>
              <div className="flex_buttom_img">
                <div className="flex_img">
                  <img src={compost} alt="" className="icon_img"/>
                </div>
                <button className="button_slois_2">Экологический атлас г.о. Тольятти</button>
              </div>
            </Link>
            <Link to="/voting" className='a'>
              <div className="flex_buttom_img">
                <div className="flex_img">
                  <img src={shield} alt="" className="icon_img"/>
                </div>
                <button className="button_slois_2">Избирательные территории г.о. Тольятти</button>
              </div>
            </Link>
            <Link to="/invest_zone" className='a'>
              <div className="flex_buttom_img">
                <div className="flex_img">
                  <img src={add_location} alt="" className="icon_img"/>
                </div>
                <button className="button_slois_2">Инвестиционная карта г.о. Тольятти</button>
              </div>
            </Link>
            <Link to="/szo">
              <div className="flex_buttom_img">
                <div className="flex_img">
                  <img src={account_balance} alt="" className="icon_img"/>
                </div>
                <button className="button_slois_2">Знаковые и социально значемые места г.о. Тольятти</button>
              </div>
            </Link>
            <Link to="/trade_obj">
  <div className="flex_buttom_img">
    <div className="flex_img">
      <img src={assistant_navigation} alt="" className="icon_img"/>
    </div>
    <button className="button_slois_2">Схема НТО г.о. Тольятти</button>
  </div>
</Link>
            <Link to="/rec">
              <div className="flex_buttom_img">
                  <div className="flex_img">
                  <img width="50" height="50" src="https://img.icons8.com/ios/50/commercial--v1.png" alt="commercial--v1"/>
                  </div>
                <button className="button_slois_2">Рекламные конструкции</button>
              </div>
            </Link>
            <Link to="/zem_uch">
              <div className="flex_buttom_img">
                <div className="flex_img">
                  <img src={architecture} alt="" className="icon_img"/>
                </div>
                <button className="button_slois_2">Муниципальная автоматизированная И.С. "Земельные участки"</button>
              </div>
            </Link>
            </div>
          </div>
      </div>

      <div className="title_main_two">
            Переход на другие сервисы:
        </div>


        <div className="flex_main_content_two_23" style={{margin: "10px 0px", background: "rgb(2 2 2 / 35%);"}}>
            <div className="flex_buttom_img" style={{margin: "13px 20px"}}>
              <div className="flex_img">
                <img src={works} alt="" className="icon_img"/>
              </div>
              <button className="button_slois_2"><a href="http://invest.tgl.ru/" style={{cursor: "pointer"}}>Инвестиционный портал г.о. Тольятти</a></button>
            </div>
            <div className="flex_buttom_img" style={{margin: "13px 20px"}}>
              <div className="flex_img">
                <img src={admins} alt="" className="icon_img"/>
              </div>
              <button className="button_slois_2"><a href='https://tgl.ru/'  style={{cursor: "pointer"}}>Администрация городского округа Тольятти</a></button>
            </div>

            <div className="flex_buttom_img" style={{margin: "13px 20px"}}>
              <div className="flex_img">
                <img src={portals} alt="" className="icon_img"/>
              </div>
              <button className="button_slois_2"><a href='https://mfc63.samregion.ru/'  style={{cursor: "pointer"}}>Мои документы</a></button>
            </div>
          </div>

          {/* 
          <div className="pod_footer_text">
            Муниципальное автономное учреждение городского округа Тольятти <br/> «Многофункциональный центр предоставления государственных и муниципальных услуг» (МАУ "МФЦ") <br/>445010, Самарская обл., г. Тольятти, ул. Советская, д. 51а, тел. 52-50-50, email: info@mfc63.ru
          </div> */}

          <div className="flex_main_content" style={{width: "100%", fontSize: "14px"}}>
            <div className='pod_footer_text' style={{fontSize: "16px"}}>Муниципальное автономное учреждение городского округа Тольятти «Многофункциональный центр предоставления государственных и муниципальных услуг» (МАУ "МФЦ") 445010, Самарская обл., г. Тольятти, ул. Советская, д. 51а, тел. 52-50-50, email: info@mfc63.ru</div>
          </div>
          <div className="pod_footer_text_2" style={{cursor: "pointer", fontSize: "14px"}}>
            <a href="https://creativecommons.org/licenses/by/4.0/" style={{cursor: "pointer", fontSize: "16px"}}>публикуется на условиях лицензии Creative Commons С указанием авторства 4.0 Всемирная.</a>
          </div>
      {/* <ScrollToTopButton/> */}
    </div>
  </div>
  );
}

export default Main;
