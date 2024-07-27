import React, { useState, useRef, useEffect } from 'react';
import './css/Saidbar.css'; // Предполагается, что стили импортированы
import { Link } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
// import Menus from '../Components/BurgerMenu';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import Slider from 'react-slick'; // Импорт слайдера
import DatePicker from 'react-datepicker'; // Импортируем компонент DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Подключаем стили DatePicker
import ru from 'date-fns/locale/ru';
import imagex_1 from './img/Screenshot_1.png';
import imagex_2 from './img/Screenshot_2.png';
import { NavLink } from 'react-router-dom';
import slaider from '../Pages/img/icons8-слои-32.png';
import spravka from '../Pages/img/icons8-информация-в-поп-апе-32.png';
import share from '../Pages/img/icons8-поиск-50.png';
import lastic from '../Pages/img/icons8-ластик-32 (1).png';
import { loadModules } from 'esri-loader';
import icons_filter from '../Pages/img/filters.png';

const addressesInTolyatti = [
  'Беларусская 33',
  'Юбилейная 5',
  'Ревалюцинная 52',
  'Советкая 51',
  'Ярославская 9',
  'Южное шоссе',
];

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
    <div className={`expandable-list ${expanded ? 'show' : ''}`}>
      <div className="list-title" onClick={toggleExpanded}>
        <div className="title-content">
          <span>{title}</span>
          {expanded ? <FaAngleDown /> : <FaAngleRight />}
        </div>
      </div>
      {expanded && (
        <div className="list-items">
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
    onClick(); // Вызываем функцию обратного вызова при изменении состояния чекбокса
  };

  return (
    <div className="checkbox-item" onClick={handleToggle}>
      <div className={`custom-checkbox ${checked ? 'checked' : ''}`} />
      <label>{title}</label>
    </div>
  );
}
function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };
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
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
    return (
      <div className="checkbox-item" onClick={handleToggle}>
        <div className={`custom-checkbox ${checked ? 'checked' : ''}`} />
        <label>{title}</label>
      </div>
    );
  }

  const [isOpen, setIsOpen] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const modalRef = useRef(null);
  const sliderRef = useRef(null); // Создаем ссылку на слайдер
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [sidebarOpen, setSidebarOpen] = useState(false); // Изначально sidebar закрыт
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const totalSlides = 3;
  const settings = {
    dots: false, // Устанавливаем значение dots в false
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const MapComponent = () => {
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
      <Saidbar  isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> 
    </div>;
  }

  const Saidbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [content, setContent] = useState('filter');
    const [buttonText, setButtonText] = useState('Фильтрация');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);
    const [activeTab, setActiveTab] = useState('tab1');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [selectedOwnershipType, setSelectedOwnershipType] = useState(null);
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [isCytyDepytats, setIsCytyDepytats]= useState(false);
    const [isSamaraDepytats, setIsSamaraDepytats]= useState(false);
    const [selectedOwnershipTypeItem, setSelectedOwnershipTypeItem] = useState(null); // Состояние выбранного пункта для списка "Отрослевая пренадлежность"
    const [selectedPropertyTypeItem, setSelectedPropertyTypeItem] = useState(null); // Состояние выбранного пункта для списка "Виды собственности"
    const [isApprovedChecked, setIsApprovedChecked] = useState(true);
    const [isIllegalChecked, setIsIllegalChecked] = useState(false);


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
  

    function RangeSlider() {
      const [showInputs, setShowInputs] = useState(true);
      const [value1, setValue1] = useState(0);
      const [value2, setValue2] = useState(0);
    
      const handleRangeSliderClick = () => {
        setShowInputs(!showInputs);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Проверяем, что введенное значение не отрицательное
        if ((name === 'value1' || name === 'value2') && parseInt(value) >= 0) {
          if (name === 'value1') {
            setValue1(value);
          } else if (name === 'value2') {
            setValue2(value);
          }
        }
      };
      
      const handleInputKeyDown = (e) => {
        // Проверяем, была ли нажата клавиша Backspace или Delete
        if (e.key === 'Backspace' || e.key === 'Delete') {
          const { name } = e.target;
          if ((name === 'value1' && value1 === '') || (name === 'value2' && value2 === '')) {
            // Если поле пустое, оставляем значение равным 0
            e.preventDefault();
          }
        }
      };
    
    return (
        <div>
          <div className='flex_Sheps_dec'>
            <label className='Sheps_dec' style={{fontSize: "12px"}}>Площадь <br/> Деклар.</label>
            {showInputs && (
              <div className='flex_Sheps_dec_numbers'>
    
                <div style={{ display: "flex", alignItems: "center" , transform: "translate(-15px, -48px)"}}>
                  <span style={{ color:"#002fa8"}}>от</span>
                  <input
                    type="number"
                    name="value1"
                    value={value1}
                    style={{ width: "60px", border: "1px solid #002fa8", color: '#002fa8', outline: "none", marginLeft: "7px", marginRight: "7px"}}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown} // Добавляем обработчик нажатия клавиши
                  />
                  <span style={{ color:"#002fa8"}}>кв.м</span>
                </div>
    
                <div style={{ display: "flex", alignItems: "center" , transform: "translate(-15px, -46px)"}}>
                  <span  style={{ color:"#002fa8"}}>до</span>
                <input
                  type="number"
                  name="value2"
                  value={value2}
                  style={{ width: "60px", border: "1px solid #002fa8", color: '#002fa8', outline: "none", marginLeft: "7px", marginRight: "7px"}}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown} // Добавляем обработчик нажатия клавиши
                />
                  <span style={{ color:"#002fa8"}}>кв.м</span>
                </div>
    
              </div>
            )}
          </div>
        </div>
      );
    }
    
    
    function ExpandableList({ title, items, subMenu, onReset }) {
      const [expanded, setExpanded] = useState(false);
    
      const toggleExpanded = () => {
        setExpanded(!expanded);
      };
    
      return (
        <div className={`expandable-list ${expanded ? 'show' : ''}`}>
          <div className="list-title" onClick={toggleExpanded}>
            <div className="title-content">
              <span>{title}</span>
              {expanded ? <FaAngleDown /> : <FaAngleRight />}
            </div>
          </div>
          {expanded && (
            <div className="list-items">
              {items.map((item, index) => (
                <CheckboxItem key={index} title={item} id={`${title}-${index}`} onReset={onReset} />
              ))}
              {subMenu &&
                subMenu.map((subMenuItem, index) => (
                  <ExpandableList key={index} title={subMenuItem.title} items={subMenuItem.items} subMenu={subMenuItem.subMenu} onReset={onReset} />
                ))}
            </div>
          )}
        </div>
      );
    }
    
    function CheckboxItem({ title, id, onReset }) {
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
      };
      useEffect(() => {
        if (onReset) {
          onReset();
        }
      }, [onReset]);
    
      return (
        <div className="checkbox-item" onClick={handleToggle}  style={{justifyContent: "center", width: "100%", display: "flex", cursor: "pointer", color: "#002fa8", alignItems: "center"}}>
          <input type="checkbox" checked={checked} readOnly />
          <label><div className='checkbox_text'>{title}</div></label>
        </div>
      );
    }
    
    function CheckboxItemTwo({ text, isChecked, onChange }) {
      const handleCheckboxChange = () => {
        if (text !== '20' && text !== '35') { // Check if the checkbox is not width or length
          onChange(!isChecked);
        }
      };
    
      return (
        <div className="checkbox-item"  style={{justifyContent: "center", width: "100%", display: "flex", cursor: "pointer", color: "#002fa8", alignItems: "center"}}>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <label className="check_box_should" onClick={handleCheckboxChange}><div className='text_checkbox' style={{maxWidth: "150px"}}>{text}</div></label>
        </div>
      );
    }
  
    function CheckboxItem_2({ text }) {
      const [isChecked, setIsChecked] = useState(false);
    
      const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
    
      return (
        <div className="checkbox-item"  style={{justifyContent: "center", width: "100%", display: "flex", cursor: "pointer", color: "#002fa8", alignItems: "center"}}>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <label className="check_box_should" onClick={handleCheckboxChange}>{text}</label>
          {/* {isChecked && <FaCheck />} */}
        </div>
      );
    }
  
    const handleAddressSelect = (address) => {
      setSelectedAddress(address);
      setSearchInput(address);
      setFilteredAddresses([]);
    };
  
  
    const toggleContent = () => {
      setContent(content === 'filter' ? 'layers' : 'filter');
      setIsApprovedChecked(true);
      setIsIllegalChecked(false)
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
  
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
  
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const handleInputChange = (event) => {
      const input = event.target.value.trim().toLowerCase();
      setSearchInput(input);
      
      if (input.length >= 1) {
        const filtered = addressesInTolyatti.filter(address =>
          address.trim().toLowerCase().startsWith(input)
        );
        setFilteredAddresses(filtered);
      } else {
        setFilteredAddresses([]);
      }
    
      // Установка классов в зависимости от наличия текста в поле ввода
      if (input.length >= 1) {
        event.target.classList.remove('transparent-input');
        event.target.classList.add('visible-input');
      } else {
        event.target.classList.remove('visible-input');
        event.target.classList.add('transparent-input');
      }
    };
    const handleAddressClick = (address) => {
      setSearchInput(address);
      setFilteredAddresses([]);
    };
  
    const handleResetCheckboxes = () => {
      localStorage.clear();
      const checkboxes = document.querySelectorAll('.checkbox-item');
      checkboxes.forEach((checkbox) => {
        checkbox.querySelector('input[type="checkbox"]').checked = false;
      });
    };
  
    useEffect(() => {
      // Добавляем обработчик события beforeunload
      const handleBeforeUnload = () => {
        handleResetCheckboxes(); // Вызываем функцию сброса чекбоксов при перезагрузке страницы
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload); // Удаляем обработчик при размонтировании компонента
      };
    }, []);
  
  
    const [isElectrosnabzhenieChecked, setIsElectrosnabzhenieChecked] = useState(false);
    const [isKanalizaciyaChecked, setIsKanalizaciyaChecked] = useState(false);
    const [isVodosnabzhenieChecked, setIsVodosnabzhenieChecked] = useState(false);
    const [isGazosnabzhenieChecked, setIsGazosnabzhenieChecked] = useState(false)
  
  
    useEffect(() => {
      // Добавляем обработчик события beforeunload
      const handleBeforeUnload = () => {
        handleResetCheckboxes(); // Вызываем функцию сброса чекбоксов при перезагрузке страницы
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload); // Удаляем обработчик при размонтировании компонента
      };
    }, []);
  
   
  
    return (
      <div className='home_styles'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div className='menu_tops'>
            <div className="container_searsh">
            <input
              placeholder='Адрес...'
              className={`js-search ${searchInput.length >= 1 ? 'visible-input' : 'transparent-input'}`}
              type="text"
              value={searchInput}
              onChange={handleInputChange}
            />
              <i className="fa fa-search"></i>
            </div>
            <button className="toggle-btn" onClick={toggleSidebar}>
              {isOpen ? '⮌' : '⮎'}
            </button>
          </div>
          <div className="content_saidbar_main">
          {content === 'filter' ? (
            <div className='flex_list'>
              {filteredAddresses.length > 0 && (
                <ul  style={{ marginBottom: "30px"}}>
                  {filteredAddresses.map((address, index) => (
                    <li key={index} onClick={() => handleAddressClick(address)}>{address}</li>
                  ))}
                </ul>
              )}
  
              <CheckboxItemTwo text="Действующие TOP резиденты " isChecked={isElectrosnabzhenieChecked} onChange={setIsElectrosnabzhenieChecked}/>
              <br/>
              <CheckboxItemTwo text="Инвестиционные площадки" isChecked={isKanalizaciyaChecked} onChange={setIsKanalizaciyaChecked}/>
              <br/>
              <CheckboxItemTwo text="Земельные участки в частной собственности под выкуп или аренду" isChecked={isVodosnabzhenieChecked} onChange={setIsVodosnabzhenieChecked}/>
              <br/>
              <CheckboxItemTwo text="Производственно-офисные площадки" isChecked={isGazosnabzhenieChecked} onChange={setIsGazosnabzhenieChecked}/>
  
            <ExpandableList
                title="Информацонные слои"
                items={["Земельные участки", "Границы города"]}
              />
              <ExpandableList
                title="Городское хозяйство"
                items={['Территории общего пользования Тольятти']}
                subMenu={[
                  {
                    title: "Лесные территории",
                    items: ["Лесные территории (кварталы, выделы)", "Посадки лесных культур 2021", "Посадки лесных культур 2020", "Посадки лесных культур 2019", "Посадки лесных культур 2018", "Посадки лесных культур 2017"]
                  }
                ]}
              />
  
              <ExpandableList
                title="Карта(схема) градостроительного зонирования"
                items={['МФЦ', 'Офис МФЦ', 'Центр оказания услуг для бизнеса']}
              />
              <ExpandableList
                title="Зоны с особыми условиями использования территории"
                items={['Дошкольное', 'Школьное', 'Профессиональное', 'Дополнительное', 'Прочие', 'Объекты потребительского рынка', 'Государственное управление',
                'Жилой фонд', 'Социальная защита','Сфера услуг','Кредитно-финансового назначения', 'Культура', 'Физическая культура и спорт', 
              'Здравоохранение (больницы)', 'Здравоохранение (поликлиники)', 'Здравоохранение (прочие)', 'Другое', 'Прочее']}
              />
              <ExpandableList
                title="Крупные предприятия города"
                items={['Антиалкогольные схемы', 'Рекламные конструкции']}
              />
        
        </div>
          ) : (
            <div className='flex_list'>
              {filteredAddresses.length > 0 && (
              <ul>
                {filteredAddresses.map((address, index) => (
                  <li key={index} onClick={() => handleAddressClick(address)}>{address}</li>
                ))}
              </ul>
              )}
              <ExpandableList
                title="Отрослевая пренадлежность"
                items={['Химическая промышленость', 'Тяжелая промышленость', 'Строительство']}
                onSelect={handleAddressSelect}
              />
              <ExpandableList
                title="Виды собственности"
                items={['Частная', 'Муниципальная и государственная']}
                onSelect={handleAddressSelect}
              />
              <br/>
              <CheckboxItem_2 text="Электроснабжение" className="check_box_should"/>
              <br/>
              <CheckboxItem_2 text="Канализация" className="check_box_should"/>
              <br/>
              <CheckboxItem_2 text="Водоснабжение" className="check_box_should"/>
              <br/>
              <CheckboxItem_2 text="Газоснабжение" className="check_box_should" />
              <br/>
              <RangeSlider/>
              <div className="flex_bootom_panel_saidbar" style={{transform: "translate(0px, -35px)"}}>
              <ButtonItem title="Поиск" className="clear_buttons"/>
              </div>
            </div>
          )
        }
         </div>
          <div className="flex_bootom_panel_saidbar" style={{marginTop: "20px"}}>
            <button title="Справочная информация" onClick={toggleModal} type='button'  style={{ width: "70px", alignItems: "center"}}><img src={spravka}  style={{ width: "32px", height: "32px"}}/></button>
            <ButtonItem title={buttonText} onClick={toggleContent} style={{ width: "70px", alignItems: "center"}}/>
            <button title="Очистить" type='button' onClick={handleResetCheckboxes}  style={{ width: "70px", alignItems: "center"}}><img src={lastic}  style={{ width: "32px", height: "32px"}}/></button>
          </div>
        </div>
      </div>
    );
  }

  const tabsContent = {
    tab1:<div className="flex_main_content" style={{flexDirection: "column", alignItems: "center"}}>
    <div className='deco_title' style={{width: "720px", fontSize: "22px"}}>Данный сервис служит для наглядного картографического представления заинтересованным лицам информации об инвестиционных возможностях г.о. Тольятти, его инфраструктуре и других, не менее важных составляющих.Работа с сервисом начинается с главной страницы, на которой пользователю предлагается выбрать один из трёх слоёв, на котором впоследствии будут отражены соответствующие объекты на карте. Слои: «Действующие резиденты ТОР», «Инвестиционные площадки», «Объекты недвижимости для реализации инвестиционных проектов»:</div>
   <br/>
   <br/>
    <img atl="sfdgsdgsd" src={imagex_1} style={{width: "620px", border: "2px solid #002fa8"}}></img>
    <div className='deco_title' style={{width: "720px", fontSize: "22px"}}>Далее интерфейс переносит пользователя на карту, где включен ранее выбранный слой:</div>
    <br/>
    <br/>
    <img atl="sfdgsdgsd" src={imagex_2} style={{width: "620px", border: "2px solid #002fa8"}}></img>
    <br/>
   <br/>
   <div className='deco_title' style={{width: "720px", fontSize: "22px"}}>Слои «Земельные участки в частной собственности под выкуп или аренду» и «Производственно-офисные площадки» содержит информацию об объектах недвижимости, находящихся в частной собственности, собственники которых готовы предоставить их для реализации инвестиционных проектов.Работа с картой осуществляется по единому принципу: пользователь включает интересующий его слой в меню слева, и данная информация отражается непосредственно на самой карте в виде залитых цветом областей (например, "Границы земельных участков"), либо пиктограмм (например, "Крупные предприятия города", "Действующие резиденты ТОР").Переключатель слоёв имеет два положения: «включено» и «выключено», которые меняются также посредством нажатия левой кнопки мыши. Кликнув на определенный земельный участок, либо пиктограмму объекта, можно получить расширенную информацию в виде всплывающего окна. Перемещение карты осуществляется при зажатой левой кнопкой мыши.Меню можно скрыть (и раскрыть), чтобы расширить визуальное пространство карты (кнопка вверху справа у меню).В верхнем правом углу карты имеются три информационные пиктограммы: «Аэропорт» (показывает расстояние от Тольятти до международного аэропорта «Курумоч»), «Ж/д вокзалы» (показывает на карте расположение двух ж/д вокзалов Тольятти) и «Речной порт» (отражает местоположение речного порта Тольятти).В меню представлены слои и группы слоёв, которые для удобства пользователь может сворачивать:</div>

<div class="flex_text_vtor">
<ul class="push">
  <li>Информационные слои1.1. Слой "Земельные участки" содержит границы и характеристики участков, сведения о наличии прав и ограничении прав, содержащиеся в Едином государственном реестре недвижимости, а также о видах разрешенного использования земельного участка и объекта капитального строительства, предусмотренные правилами землепользования и застройки.1.2. "Границы города".</li>
  <li>Группа слоев «Карта (схема) градостроительного зонирования» отображает разделение городского округа Тольятти на территориальные зоны с установлением для каждой из них градостроительного регламента (виды разрешенного использования земельных участков и объектов капитального строительства, предельные (минимальные и (или) максимальные) размеры земельных участков и предельные параметры разрешенного строительства и т.д.)</li>
  <li>Группа слоев «Зоны с особыми условиями использования территории» - отображает территории, в пределах которых характерно введение особого, отличного от обычного режима использования.</li>
  <li>"Крупные предприятия города" – слои этой группы распределены по специализациям предприятий, такие как машиностроение, строительство и т.п.</li>
</ul>
</div>
<div className='deco_title' style={{width: "720px", fontSize: "22px"}}>Работа с поиском:Включение меню фильтрации объектов осуществляется нажатием на кнопку со значком лупы, расположенном в правом нижнем углу основного меню.Фильтрация объектов реализована для трех слоев:Земельные участки в частной собственности под выкуп или арендуПроизводственно-офисные площадкиЗемельные участки, предоставляемые органами местного самоуправленияВ меню поиска есть 8 критериев, по которым можно осуществить фильтрацию:Два выпадающих списка с предложенными вариантами для выбора «отраслевая принадлежность» и «вид собственности»;Четыре тумблера включения - электроснабжение, канализация, водоснабжение, газоснабжение в виде серых квадратов, расположенных напротив описания критерия;Два поля ввода для площади (в квадратных метрах), для её минимального и максимального значений.После выставления входных параметров, можно осуществить поиск подходящих объектов нажатием на кнопку в самой нижней части меню с надписью «Поиск».Результаты поиска загружаются в дополнительную выдвигающуюся боковую панель справа от панели меню поиска. Нажатием на нужный объект в списке результатов поиска можно просмотреть выбранный объект на карте.Вернуться на главную страницу можно, кликнув на соответствующую кнопку внизу меню.
</div></div>,
    tab2: <div className='deco_title_2'> <DatePicker selected={new Date()} onChange={(date) => console.log(date)} locale={ru} dateFormat="d MMMM yyyy"  className='datepicker'/><table style={{borderCollapse: "collapse", width: "100%;", marginTop: "20px", marginBottom: "30px"}}>
    <tr style={{backgroundColor: "#f2f2f2;"}}>
      <th style={{border: "1px solid #002FA8", textAlign: "left", padding: "8px"}}>Слой</th>
      <th style={{border: "1px solid #002FA8", textAlign: "left", padding: "8px"}}>Количество объектов</th>
    </tr>
    <tr>
      <td style={{border: "1px solid #002FA8", textAlign: "left", padding: "8px"}}>Значение 1</td>
      <td style={{border: "1px solid #002FA8", textAlign: "left", padding: "8px"}}>Значение A</td>
    </tr>
    <tr>
      <td style={{border: "1px solid #002FA8", textAlign: "left", padding: "8px"}}>Значение 2</td>
      <td style={{border: "1px solid #002FA8", textAlign: "left", padding: "8px"}}>Значение B</td>
    </tr>
    <tr>
      <td style={{border: "1px solid #002FA8", textAlign: "left", padding: "8px"}}>Значение 3</td>
      <td style={{border: "1px solid #002FA8", textAlign: "left", padding: "8px"}}>Значение C</td>
    </tr>
  </table></div>,
  };

  return (
    <div className='resident'>
    <div className="main_styles" onClick={handleClickOutside}>
    {isModalOpen && (
       <div className="modal-background">
       <div className="modal" ref={modalRef}  style={{height: "800px", width: "1100px"}}>
            <div className="modal-content" style={{height:"740px"}}> 
              <div>
                <div className="title_main" style={{marginTop: "0px"}}>Информационная справка по <br/>инвестиционной карте г.о. Тольятти</div>
                <div className="tabs">
                  <button className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => handleTabClick('tab1')}>Приложение</button>
                  <button className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabClick('tab2')}>Сведения инвестиционной карты</button>
                </div>
                <div className="tab-content">
                  {tabsContent[activeTab]}
                </div>
              </div>
            </div>
       </div>
     </div>
    )}
    <div className='resident_styles'>
    <div className="header" style={{justifyContent: "center"}}>
        <div className="logo">
          <div>
          <Link to="/"><img src={logo} alt="EMGIS Logo" /></Link>
          <Link to="/"><span className='logo_text'>ЕМГИС</span></Link>
          </div>
          <Link to="/"><p>Инвестиционная карта<br/> городского округа Тольятт</p></Link>
        </div>
        {/* <BurgerMenu/> */}
      </div>
      <MapComponent/>
        </div>
    </div>
  </div>
  );
}
export default Home;