import React, { useState, useRef, useEffect } from 'react';
import '../Pages/css/Saidbar.css';
import { Link } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
// import Menus from '../Components/BurgerMenu';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
// import Saidbar from './Eco_saidbar';
// import MapComponent from './MapComponent';
import Slider from 'react-slick';
// import MapComponent_2 from './MapComponent_2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
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
import lastic from '../Pages/img/icons8-ластик-32 (1).png';
import nasad from '../Pages/img/icons8-стрелка-назад-24.png';
import grafics from '../Pages/img/grafic.jpg';
import { NavLink } from 'react-router-dom';
// import RightSidebar from './RightSidebar';
import slaider from '../Pages/img/icons8-слои-32.png';
import spravka from '../Pages/img/icons8-информация-в-поп-апе-32.png';
import share from '../Pages/img/icons8-поиск-50.png';
import { loadModules } from 'esri-loader';
import icons_filter from '../Pages/img/filters.png';

function ButtonItem({ title, onClick }) {
  return (
    <button className="button-item" onClick={onClick}>
      {title}
    </button>
  );
}

function ExpandableList({ title, items, subMenu }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={`expandable-list ${expanded ? 'show' : ''}`} style={{position: "relative"}}>
      <div className="list-title" onClick={toggleExpanded}>
        <div className="title-content">
          <span>{title}</span>
          {expanded ? <FaAngleDown /> : <FaAngleRight />}
        </div>
      </div>
      {expanded && (
        <div className="list-items" style={{position: "absolute",
        top: "100%",
        left: "0",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: "100"}}>
          {items.map((item, index) => (
            <CheckboxItem key={index} title={item} id={`${title}-${index}`} onClick={() => console.log(item)} />
          ))}
          {subMenu && subMenu.map((subMenuItem, index) => (
            <ExpandableList key={index} title={subMenuItem.title} items={subMenuItem.items} />
          ))}
        </div>
      )}
    </div>
  );
}

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
    onClick();
  };
  return (
    <div className="checkbox-item" onClick={handleToggle}>
      <div className={`custom-checkbox ${checked ? 'checked' : ''}`} />
      <label>{title}</label>
    </div>
  );
}

const MapWithModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalContent, setModalContent] = useState(''); // Состояние для содержимого модального окна
  const [modalTitle, setModalTitle] = useState(''); // Состояние для заголовка модального окна
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления видимостью модального окна
  const [searchInput, setSearchInput] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const modalRef = useRef(null); 
  const [content, setContent] = useState('filter');
  const [buttonText, setButtonText] = useState('Фильтрация');
  const [isApprovedChecked, setIsApprovedChecked] = useState(true);
  const [isIllegalChecked, setIsIllegalChecked] = useState(false);
  const [searchTermName, setSearchTermName] = useState('');
  const [searchTermAddress, setSearchTermAddress] = useState('');
  const [searchTermCategory, setSearchTermCategory] = useState('');
  const [searchTermOwnerNumber, setSearchTermOwnerNumber] = useState('');
  const [searchTermOwner, setSearchTermOwner] = useState('');
  const [searchTermBalholder, setSearchTermBalholder] = useState('');
  const [searchTermDistrict, setSearchTermDistrict] = useState('');
  const [searchTermQuarter, setSearchTermQuarter] = useState('');
  const [searchTermRegion, setSearchTermRegion] = useState('');
  const [isWordListVisible, setIsWordListVisible] = useState(false);
  const [wordListVisibility, setWordListVisibility] = useState({});
  const sidebarRef = useRef(null);
  
  const ButtonItem = ({ title, onClick }) => {
    const handleClick = () => {
      onClick();
    };
  
    return (
      <button className="button-item" onClick={handleClick} title={buttonText} style={{width: "70px"}}>
        {title === 'Фильтрация' && <img src={icons_filter} alt="Фильтр" />}
        {title === 'Слои' && <img src={slaider} alt="Слои" />}
      </button>
    );
  };

  const toggleContent = () => {
    setContent(content === 'filter' ? 'layers' : 'filter');
    setIsApprovedChecked(true);
    setIsIllegalChecked(false)
  };

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

  // function ButtonItem({ title, onClick }) {
  //   return (
  //     <button className="button-item" onClick={onClick}>
  //       {title}
  //     </button>
  //   );
  // }

  const handleCheckboxToggle = (title) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  const handleResetCheckboxes = () => {
    localStorage.clear();
    const checkboxes = document.querySelectorAll('.checkbox-items');
    checkboxes.forEach((checkbox) => {
      checkbox.querySelector('input[type="checkbox"]').checked = false;
    });
  };


  // Функция для открытия модального окна только при нажатии на иконку
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };
  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Обработчик события для закрытия модального окна при нажатии на пустое пространство вне модального окна
  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };
  // Добавьте этот эффект в useEffect для обработки события клика вне модального окна
 useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('click', handleModalOutsideClick);
    } else {
      document.removeEventListener('click', handleModalOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleModalOutsideClick);
    };
  }, [isModalOpen]);

  const wordsLists = {
    Наименование_места: [
      "Беларусская, 33", "Юбилейная, 5", "Ревалюцинная, 52","Советская, 51", "Ярославская, 9", "Южное шоссе, 30"
    ],
    Адресс_объекта: [
      "3940", "3941", "4890", "5789", "2345", "3565"
    ],
    Категория: [
      'ТИК Центрального района города Тольятти', 'ТИК Комсомольского района города Тольятти', 'ТИК Автозаводского района города Тольятти', 'ТИК городского округа Тольятти Самарской области'
    ],
    Номер_собственника: [
      '3454', '6665', '4001', '4354', '3452', '1347'
    ],
    Собственник: [
      '20', '23', '3', '4', '15','34'
    ],
    Балансодержатель: [
      'Татищевский', 'Центральный', 'Тольяттинский', 'Ставропольский', 'Автозаводский', 'Комсомольский'
    ],
    Район: [
      'Автозаводский', 'Комсомольский', 'Центральный'
    ],
    Квартал: [
      'Татищевский', 'Центральный', 'Тольяттинский', 'Ставропольский', 'Автозаводский', 'Комсомольский'
    ],
    Округ: [
      'Автозаводский', 'Комсомольский', 'Центральный'
    ]
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case 'Наименование_места':
        setSearchTermName(value);
        break;
      case 'Адресс_объекта':
        setSearchTermAddress(value);
        break;
      case 'Категория':
        setSearchTermCategory(value);
        break;
      case 'Номер_собственника':
        setSearchTermOwnerNumber(value);
        break;
      case 'Собственник':
        setSearchTermOwner(value);
        break;
      case 'Балансодержатель':
        setSearchTermBalholder(value);
        break;
      case 'Район':
        setSearchTermDistrict(value);
        break;
      case 'Квартал':
        setSearchTermQuarter(value);
        break;
      case 'Округ':
        setSearchTermRegion(value);
        break;
      default:
        break;
    }
    setWordListVisibility({ ...wordListVisibility, [field]: true });
  };

  const filterWordsByFirstLetter = (field) => {
    const searchTerm = getSearchTerm(field);
    if (searchTerm) {
      return wordsLists[field].filter(word => word.toLowerCase().startsWith(searchTerm.toLowerCase()));
    }
    return [];
  };

  const getSearchTerm = (field) => {
    switch (field) {
      case 'Наименование_места':
        return searchTermName;
      case 'Адресс_объекта':
        return searchTermAddress;
      case 'Категория':
        return searchTermCategory;
      case 'Номер_собственника':
        return searchTermOwnerNumber;
      case 'Собственник':
        return searchTermOwner;
      case 'Балансодержатель':
        return searchTermBalholder;
      case 'Район':
        return searchTermDistrict;
      case 'Квартал':
        return searchTermQuarter;
      case 'Округ':
        return searchTermRegion;
      default:
        return '';
    }

  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleWordClick = (word, field) => {
    // Обновите значение ввода выбранным словом
    switch (field) {
      case 'Наименование_места':
        setSearchTermName(word);
        break;
      case 'Адресс_объекта':
        setSearchTermAddress(word);
        break;
      case 'Категория':
        setSearchTermCategory(word);
        break;
      case 'Номер_собственника':
        setSearchTermOwnerNumber(word);
        break;
      case 'Собственник':
        setSearchTermOwner(word);
        break;
      case 'Балансодержатель':
        setSearchTermBalholder(word);
        break;
      case 'Район':
        setSearchTermDistrict(word);
        break;
      case 'Квартал':
        setSearchTermQuarter(word);
        break;
      case 'Округ':
        setSearchTermRegion(word);
        break;
      default:
        break;
    }
    setWordListVisibility({ ...wordListVisibility, [field]: false });
  };
  

  return (
    <div>
    <div className='home_styles'>
    <div className='municipal_road_saidbar'>
            {isModalOpen && (
              <div className="modal-overlay" onClick={toggleModal} style={{position: "fixed", inset: "0px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "10000"}}>
                <div className="modal" ref={modalRef} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgb(255, 255, 255)", padding: "20px", borderRadius: "8px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px", maxWidth: "80%", overflowY: "auto"}}>
                  <div className="modal-content">
                  <div className='text_maodal' style={{textAlign: "center", fontSize: "25px", color: "#002fa8"}}>{modalTitle}</div>
                  <br/>
                    <div className='text_maodal' style={{fontSize: "20px", color: "#002fa8", textIndent: "80px"}}>{modalContent}</div>
                  </div>
                </div>
              </div>
            )}
        <div className='eco_saidbar'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='menu_tops' style={{display: "flex" , flexDirection: "column"}}>
          <button className="toggle-btn" onClick={toggleSidebar} style={{transform: "translate(254px, -35px)"}}>
            {isOpen ? '⮌' : '⮎'}
          </button>
        </div>

        <div className="content_saidbar_main" style={{transform: "translate(10px, -90px)",  height: "85%"}}>
        {content === 'filter' ? (
          <>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Фонтаны')}>
          <img alt='fsdfsfddf' src={fountain} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk1" name="chk" value="vebinary"/>
          <label for="chk1">Фонтаны</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons'  onClick={() => openModal('Парки')}>
          <img alt='fsdfsfddf' src={park} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk2" name="chk"value="treningy"/>
          <label for="chk2">Парки</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Площадь')}>
          <img alt='fsdfsfddf' src={square} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk3" name="chk" value="shop"/>
          <label for="chk3">Площадь</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Спортивные объекты')}>
          <img alt='fsdfsfddf' src={sports} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk4" name="chk" value="shop_1"/>
          <label for="chk4">Спортивные объекты</label>
          </div>
          </div>


          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Площадки семейного отдыха')}>
          <img alt='fsdfsfddf' src={family} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk5" name="chk" value="shop_3"/>
          <label for="chk5">Площадки семейного отдыха</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Скверы')}>
          <img alt='fsdfsfddf' src={parks} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk6" name="chk" value="shop_4"/>
          <label for="chk6">Скверы</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Памятники')}>
          <img alt='fsdfsfddf' src={manument} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk7" name="chk" value="shop_4"/>
          <label for="chk7">Памятники</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Памятные знаки')}>
          <img alt='fsdfsfddf' src={markersing} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk8" name="chk" value="shop_4"/>
          <label for="chk8">Памятные знаки</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Мемориалы')}>
          <img alt='fsdfsfddf' src={alley} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk9" name="chk" value="shop_4"/>
          <label for="chk9">Мемориалы</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Аллеи')}>
          <img alt='fsdfsfddf' src={moxayka} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk11" name="chk" value="shop_4"/>
          <label for="chk11">Аллеи</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Мозаика',)}>
          <img alt='fsdfsfddf' src={memoryal} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk12" name="chk" value="shop_4"/>
          <label for="chk12">Мозаика</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Иные объекты')}>
          <img alt='fsdfsfddf' src={cemetry} style={{width: "40px"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk13" name="chk" value="shop_4"/>
          <label for="chk13">Иные объекты</label>
          </div>
          </div>

          </>) : (
<>          {Object.keys(wordsLists).map((field, index) => (
            <div key={index} className="text-field text-field_floating-2">
              <input 
                className="text-field__input" 
                type="text" 
                id={field} 
                name={field} 
                onChange={(e) => handleInputChange(e, field)} 
                value={getSearchTerm(field)} 
              />
              <label className="text-field__label" htmlFor={field}>{field}</label>
              {wordListVisibility[field] && filterWordsByFirstLetter(field).length > 0 && (
                <ul>
                  {filterWordsByFirstLetter(field).map((word, index) => (
                    <li key={index} onClick={() => handleWordClick(word, field)}>
                      {word}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          </>
        )}
           </div>
            <div className="flex_bootom_panel_saidbar" style={{transform: "translate(0px, -60px)"}}>
              <button title="Справочная информация" type='button' onClick={toggleModal}  style={{ width: "70px", alignItems: "center"}}><img src={spravka}  style={{ width: "32px", height: "32px"}}/></button>
              <ButtonItem title={buttonText} onClick={toggleContent} style={{ width: "70px", alignItems: "center"}}/>
              <button title="Очистить" type='button' onClick={handleResetCheckboxes}  style={{ width: "70px", alignItems: "center"}}><img src={lastic}  style={{ width: "32px", height: "32px"}}/></button>
            </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

function Home() {
  const [showHelpLinks, setShowHelpLinks] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false); // 2. Состояние для открытого состояния модального окна "Контакты"
  const toggleHelpLinks = () => {
    setShowHelpLinks(!showHelpLinks);
  }
  
  const closeHelpLinks = () => {
    setShowHelpLinks(false);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Функция для открытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };
  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isModalOpenContacts, setIsModalOpenContacts] = useState(false);
  // Функция для открытия модального окна
  const openContactsModal= () => {
    setIsModalOpenContacts(true);
  };
  // Функция для закрытия модального окна
  const closeContactsModal = () => {
    setIsModalOpenContacts(false);
  };

  

  const MapComponent_2  = () => {
    const mapDiv = useRef(null);
    useEffect(() => {
      let view;
      const loadCss = url => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
      };
  
      loadCss('https://js.arcgis.com/4.23/esri/themes/light/main.css');
      // Определите какие модули необходимо загрузить
      loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/TileLayer",
        "esri/layers/MapImageLayer"
      ]).then(([Map, MapView, TileLayer, MapImageLayer]) => {
        const contLyr1 = new MapImageLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Reklama/Reklama_150524/MapServer",
          title: "Реклама",
          visible: false,
        });
  
        const baseLyr1 = new TileLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Hosted/Basemap/MapServer",
          listMode: "hide",
        });
  
        const map = new Map({
          slider: false,
        });
  
        map.add(contLyr1);
        map.add(baseLyr1);
  
        view = new MapView({
          container: mapDiv.current,
          map: map,
          spatialReference: {
            wkid: 3857,
          },
          center: [11.933464831878339, 3.8076571307169584],
          ui: {
            components: ["attribution"],
          },
          constraints: {
            minScale: 150000,
          },
        });
      }).catch(err => console.error(err));
  
      // Очистка при размонтировании компонента
      return () => {
        if (view) {
          view.destroy();
          view = null;
        }
      };
    }, []);
        return <div style={{ height: '100vh', width: '100%' }} ref={mapDiv}>
      <MapWithModal/> 
    </div>;
  }

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
                <Link to="/"><p>Избирательные территории<br/> городского округа Тольятт</p></Link>
              </div>
            </div>
          <MapComponent_2 />
        </div>
      </div>
    </div>
  );
}

export default Home;