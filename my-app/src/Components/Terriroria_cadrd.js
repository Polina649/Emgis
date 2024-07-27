import React, { useState, useRef, useEffect } from 'react';
import '../Pages/css/Saidbar.css';
import { Link } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
// import Menus from '../Components/BurgerMenu';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
// import Saidbar from './Territoria_saidbar';
// import MapComponent from './MapComponent';
import Slider from 'react-slick';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import imagex_1 from '../Pages/img/Screenshot_1.png';
import imagex_2 from '../Pages/img/Screenshot_2.png';
import { NavLink } from 'react-router-dom';
import spravka from '../Pages/img/icons8-информация-в-поп-апе-32.png';
import share from '../Pages/img/icons8-поиск-50.png';
import lastic from '../Pages/img/icons8-ластик-32 (1).png';
import slaider from '../Pages/img/icons8-слои-32.png';
import icons_filter from '../Pages/img/filters.png';
import download from '../Pages/img/icons8-скачать-48.png';
import { loadModules } from 'esri-loader';


function CheckboxItem({ text, isChecked, onChange }) {
  const handleCheckboxChange = () => {
    if (text !== '20' && text !== '35') { // Check if the checkbox is not width or length
      onChange(!isChecked);
    }
  };

  return (
    <div className="checkbox-item" style={{justifyContent: "center", width: "100%", display: "flex", cursor: "pointer", color: "#002fa8", alignItems: "center"}}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <label className="check_box_should" onClick={handleCheckboxChange}><div className='text_checkbox' style={{maxWidth: "150px"}}>{text}</div></label>
    </div>
  );
}

function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  const Saidbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [isCytyDepytats, setIsCytyDepytats]= useState(false);
    const [isSamaraDepytats, setIsSamaraDepytats]= useState(false);
    const [isElectrosnabzhenieChecked, setIsElectrosnabzhenieChecked] = useState(false);
    const [isKanalizaciyaChecked, setIsKanalizaciyaChecked] = useState(false);
    const [isVodosnabzhenieChecked, setIsVodosnabzhenieChecked] = useState(false);
    const [isGazosnabzhenieChecked, setIsGazosnabzhenieChecked] = useState(false);
    const [content, setContent] = useState('filter');
    const [buttonText, setButtonText] = useState('Фильтрация');
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const [isApprovedChecked, setIsApprovedChecked] = useState(true);
    const [isIllegalChecked, setIsIllegalChecked] = useState(false);
    const handleResetInput = () => {
      setSearchInput('');
    };
    const [searchInputs, setSearchInputs] = useState({});
    const sidebarRef = useRef(null);
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
    const wordsLists = {
      Адрес: [
        "Беларусская, 33", "Юбилейная, 5", "Ревалюцинная, 52","Советская, 51", "Ярославская, 9", "Южное шоссе, 30"
      ],
      Участковая_комиссия: [
        "3940", "3941", "4890", "5789", "2345", "3565"
      ],
      Территоркомиссия: [
        'ТИК Центрального района города Тольятти', 'ТИК Комсомольского района города Тольятти', 'ТИК Автозаводского района города Тольятти', 'ТИК городского округа Тольятти Самарской области'
      ],
      Избирательный_участок: [
        '3454', '6665', '4001', '4354', '3452', '1347'
      ],
      Выборы_депутатов_Гос_Думы: [
        '20', '23', '3', '4', '15','34'
      ],
      Выборы_депутатов_Сам_Думы: [
        'Автозаводский', 'Центральный', 'Комсомольский'
      ],
    };

    const handleInputChange = (e, field) => {
      const value = e.target.value;
      switch (field) {
        case 'Адрес':
          setSearchTermName(value);
          break;
        case 'Участковая_комиссия':
          setSearchTermAddress(value);
          break;
        case 'Территоркомиссия':
          setSearchTermCategory(value);
          break;
        case 'Избирательный_участок':
          setSearchTermOwnerNumber(value);
          break;
        case 'Выборы_депутатов_Гос_Думы':
          setSearchTermOwner(value);
          break;
        case 'Выборы_депутатов_Губ_Думы':
          setSearchTermBalholder(value);
          break;
        default:
          break;
      }
      // Показать список слов
      setWordListVisibility({ ...wordListVisibility, [field]: true });
    };
  
    
  
    const handleResetCheckboxes = () => {
      // Сбросить значения полей ввода
      setSearchTermName('');
      setSearchTermAddress('');
      setSearchTermCategory('');
      setSearchTermOwnerNumber('');
      setSearchTermOwner('');
      setSearchTermBalholder('');
      // Скрыть список слов для всех полей ввода
      const updatedVisibility = {};
      Object.keys(wordListVisibility).forEach(field => {
        updatedVisibility[field] = false;
      });
      setWordListVisibility(updatedVisibility);
    
      // Очистить список фильтрованных адресов (если необходимо)
      setFilteredAddresses([]);
    
      // Очистить внешний поиск (если необходимо)
      setSearchInputs({});
    
      // Очистить значения полей ввода в DOM
      const inputs = document.querySelectorAll('.text-field__input');
      inputs.forEach(input => {
        input.value = '';
      });
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
        case 'Адрес':
          return searchTermName;
        case 'Участковая_комиссия':
          return searchTermAddress;
        case 'Территоркомиссия':
          return searchTermCategory;
        case 'Избирательный_участок':
          return searchTermOwnerNumber;
        case 'Выборы_депутатов_Гос_Думы':
          return searchTermOwner;
        case 'Выборы_депутатов_Сам_Думы':
          return searchTermBalholder;
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
  
    const handleInputBlur = () => {
      // handle blur if needed
    };
  
  
    const handleWordClick = (word, field) => {
      // Обновите значение ввода выбранным словом
      switch (field) {
        case 'Адрес':
          setSearchTermName(word);
          break;
        case 'Участковая_комиссия':
          setSearchTermAddress(word);
          break;
        case 'Территоркомиссия':
          setSearchTermCategory(word);
          break;
        case 'Избирательный_участок':
          setSearchTermOwnerNumber(word);
          break;
        case 'Выборы_депутатов_Гос_Думы':
          setSearchTermOwner(word);
          break;
        case 'Выборы_депутатов_Сам_Думы':
          setSearchTermBalholder(word);
          break;
        // Добавьте другие варианты, если нужно
        default:
          break;
      }
      // Скрыть список
      setWordListVisibility({ ...wordListVisibility, [field]: false });
    };
  

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
  
    const handleAddressClick = (address) => {
      setSearchInput(address);
      setFilteredAddresses([]);
    };
  
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
  
          {content === 'filter' ? (
          <div className="content_saidbar_main">
            <div className='flex_list'>
              {filteredAddresses.length > 0 && (
                <ul style={{marginBottom: "5px", opacity: "0.5"}}>
                  {filteredAddresses.map((address, index) => (
                    <li key={index} onClick={() => handleAddressClick(address)}>{address}</li>
                  ))}
                </ul>
              )}
              <br/>
              <CheckboxItem text="Центры участковых комиссий" isChecked={isElectrosnabzhenieChecked} onChange={setIsElectrosnabzhenieChecked}/>
              <br/>
              <CheckboxItem text="Центры территориальных комиссий" isChecked={isKanalizaciyaChecked} onChange={setIsKanalizaciyaChecked}/>
              <br/>
              <CheckboxItem text="Границы избирательных участков" isChecked={isVodosnabzhenieChecked} onChange={setIsVodosnabzhenieChecked}/>
              <br/>
              <CheckboxItem text="Дома на изберательных участках" isChecked={isGazosnabzhenieChecked} onChange={setIsGazosnabzhenieChecked}/>
              <br/>
              <CheckboxItem text="Округа на выборах депутатов Думы городского округа" isChecked={isCytyDepytats} onChange={setIsCytyDepytats}/>
              <br/>
              <CheckboxItem text="Округа на выборах депутатов Самарской Губернской Думы" isChecked={isSamaraDepytats} onChange={setIsSamaraDepytats}/>
              <br/>
            </div>
              </div>
            ) : (
              <div className="content_saidbar_main" style={{transform: "translate(0px, -40px)"}}>
            <br/>
  <br/>
              {Object.keys(wordsLists).map((field, index) => (
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
              <br/>
              <div className="flex_bootom_panel_saidbar" style={{ justifyContent: "center", alignItems: "center"}}>
                <button title="Поиск" className="clear_buttons" style={{marginTop: "0px", width: "120px"}}>Найти</button>
              </div>
            </div>
            )}
          <div className="flex_bootom_panel_saidbar">
          <button title="Справочная информация" type='button' onClick={toggleModal}  style={{ width: "70px", alignItems: "center"}}><img src={spravka}  style={{ width: "32px", height: "32px"}}/></button>
          <ButtonItem title={buttonText} onClick={toggleContent} style={{ width: "70px", alignItems: "center"}}/>
          <button title="Очистить" type='button' onClick={handleResetCheckboxes}  style={{ width: "70px", alignItems: "center"}}><img src={lastic}  style={{ width: "32px", height: "32px"}}/></button>
          </div>
        </div>
      </div>
    );
}

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
    <Saidbar/> 
  </div>;
}


return (
    <div className='resident'>
    <div className="main_styles">
    {isModalOpen && (
       <div className="modal-background">
       <div className="modal" ref={modalRef}  style={{height: "800px", width: "1100px"}}>
            <div className="modal-content" style={{height: "740px"}}>
              <div>
                <div className='text_modal' style={{fontSize: "25px"}}>Избирательные территории<br/>городского округа Тольятти</div>
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
          <Link to="/"><p>Избирательные территории<br/> городского округа Тольятт</p></Link>
        </div>
        </div>
        <MapComponent /> 
        </div>
    </div>
    </div>
  );
}
export default Home;