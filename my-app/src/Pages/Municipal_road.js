import React, { useState, useRef, useEffect } from 'react';
import '../Pages/css/Saidbar.css';
import { Link } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
// import Menus from '../Components/BurgerMenu';
// import Saidbar from './Municipal_road_saidbar';
// import MapComponent from './MapComponent';
import Slider from 'react-slick';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import imagex_1 from '../Pages/img/Screenshot_1.png';
import imagex_2 from '../Pages/img/Screenshot_2.png';
import { NavLink } from 'react-router-dom';
import slaider from '../Pages/img/icons8-слои-32.png';
import spravka from '../Pages/img/icons8-информация-в-поп-апе-32.png';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import lastic from '../Pages/img/icons8-ластик-32 (1).png';
import nasad from '../Pages/img/icons8-стрелка-назад-24.png';
// import slaider from '../Pages/img/icons8-слои-32.png';
import icons_filter from '../Pages/img/filters.png';
import reestr from '../Pages/img/logo_rosreestr.png';
import mfc from '../Pages/img/logo_mfc.png';
import portal from '../Pages/img/logo_portalSamaraObl.png';
import grafics from '../Pages/img/grafic.jpg';
import { loadModules } from 'esri-loader';



const addressesInTolyatti = [
  'Беларусская 33',
  'Юбилейная 5',
  'Ревалюцинная 52',
  'Советкая 51',
  'Ярославская 9',
  'Южное шоссе',
  // Добавьте остальные адреса в Тольятти по мере необходимости
];
function ButtonItem({ title, onClick }) {
  return (
    <button className="button-item" onClick={onClick}>
      {title}
    </button>
  );
}
function CheckboxItem({ text, isChecked, onChange }) {
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


const MapComponent = () => {
  const mapDiv = useRef(null);

  const Saidbar = () =>{
    const [buttonText, setButtonText] = useState('Фильтрация');
    const [isOpen, setIsOpen] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [selectedOwnershipType, setSelectedOwnershipType] = useState(null);
    const [selectedPropertyType, setSelectedPropertyType] = useState(null);
    const [isCytyDepytats, setIsCytyDepytats]= useState(false);
    const [isSamaraDepytats, setIsSamaraDepytats]= useState(false);
    const [isElectrosnabzhenieChecked, setIsElectrosnabzhenieChecked] = useState(false);
    const [isKanalizaciyaChecked, setIsKanalizaciyaChecked] = useState(false);
    const [isVodosnabzhenieChecked, setIsVodosnabzhenieChecked] = useState(false);
    const [isGazosnabzhenieChecked, setIsGazosnabzhenieChecked] = useState(false);
    const [selectedOwnershipTypeItem, setSelectedOwnershipTypeItem] = useState(null); // Состояние выбранного пункта для списка "Отрослевая пренадлежность"
    const [selectedPropertyTypeItem, setSelectedPropertyTypeItem] = useState(null); // Состояние выбранного пункта для списка "Виды собственности"
    const [content, setContent] = useState('filter');
    const [isApprovedChecked, setIsApprovedChecked] = useState(true);
    const [isIllegalChecked, setIsIllegalChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null); 
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    const toggleContent = () => {
      setContent(content === 'filter' ? 'layers' : 'filter');
      setIsApprovedChecked(true);
      setIsIllegalChecked(false)
    };
  
    const handleTabClick = (tabContent, tabText) => {
      setContent(tabContent);
      setButtonText(tabText);
      setIsApprovedChecked(true);
      setIsIllegalChecked(false)
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
  
  
    const ButtonItem = ({ title, onClick }) => {
      const handleClick = () => {
        onClick();
      };
    
      return (
        <button className="button-item" onClick={handleClick} title={buttonText} style={{width: "90px"}}>
          {title === 'Фильтрация' && <img src={icons_filter} alt="Фильтр" />}
          {title === 'Слои' && <img src={slaider} alt="Слои" />}
        </button>
      );
    };
  
  
  
    const handleAddressSelect = (address) => {
      setSelectedAddress(address);
      setSearchInput(address);
      setFilteredAddresses([]);
    };
    const handleAddressClick = (address) => {
      setSearchInput(address);
      setFilteredAddresses([]);
    };
    const handleResetCheckboxes = () => {
      setValue1(0);
      setValue2(0);
      setIsElectrosnabzhenieChecked(false);
      setIsKanalizaciyaChecked(false);
      setIsVodosnabzhenieChecked(false);
      setIsGazosnabzhenieChecked(false);
      setIsCytyDepytats(false);
      setIsSamaraDepytats(false);
      setSelectedOwnershipTypeItem(null); // Обнуляем выбранный пункт для "Отрослевая пренадлежность"
      setSelectedPropertyTypeItem(null); // Обнуляем выбранный пункт для "Виды собственности"
    };



    useEffect(() => {
      if (pointsLayer) {
        pointsLayer.visible = isElectrosnabzhenieChecked;
      }
    }, [isElectrosnabzhenieChecked, pointsLayer]);
  
    useEffect(() => {
      if (pointsLayer_2) {
        pointsLayer_2.visible = isKanalizaciyaChecked;
      }
    }, [isKanalizaciyaChecked, pointsLayer_2]);

    useEffect(() => {
      if (pointsLayer_3) {
        pointsLayer_3.visible = isVodosnabzhenieChecked;
      }
    }, [isVodosnabzhenieChecked, pointsLayer_3]);

    useEffect(() => {
      if (pointsLayer_4) {
        pointsLayer_4.visible = isGazosnabzhenieChecked;
      }
    }, [isGazosnabzhenieChecked, pointsLayer_4]);

    useEffect(() => {
      if (pointsLayer_5) {
        pointsLayer_5.visible = isCytyDepytats;
      }
    }, [isCytyDepytats, pointsLayer_5]);

  
  
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
  
    return (
      <div className='home_styles'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {content === 'filter' ? (
          <>
          <div className='menu_tops'>
            <div className="container_searsh">
              <input
                  placeholder='Поиск номер/aдрес'
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
            <div className='flex_list'>
              {filteredAddresses.length > 0 && (
                <ul style={{marginBottom: "30px", opacity: "0.5"}}>
                  {filteredAddresses.map((address, index) => (
                    <li key={index} onClick={() => handleAddressClick(address)}>{address}</li>
                  ))}
                </ul>
              )}
  
              <CheckboxItem text="Карта (схема) градостроительного зонирования" isChecked={isElectrosnabzhenieChecked} onChange={setIsElectrosnabzhenieChecked}/>
              <br/>
              <CheckboxItem text="Земельные участки" isChecked={isKanalizaciyaChecked} onChange={setIsKanalizaciyaChecked}/>
              <br/>
              <CheckboxItem text="Участки в аренде" isChecked={isVodosnabzhenieChecked} onChange={setIsVodosnabzhenieChecked}/>
              <br/>
              <CheckboxItem text="Участки в безвозмездном пользовании" isChecked={isGazosnabzhenieChecked} onChange={setIsGazosnabzhenieChecked}/>
              <br/>
              <CheckboxItem text="Границы города" isChecked={isCytyDepytats} onChange={setIsCytyDepytats}/>
              <br/>
            </div>
          </div>
          </>
        ) : (
  <>
  
  {isModalOpen && (
    <div className="modal-overlay" onClick={toggleModal} style={{inset: "0px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "10000"}}>
      <div className="modal" ref={modalRef} style={{position: "absolute", top: "-15%", left: "150%", backgroundColor: "rgb(255, 255, 255)", borderRadius: "8px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px", maxWidth: "300%", overflowY: "auto", height: "800px"}}>
        <div className="modal-content" style={{height: "750px", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <p style={{ color: "rgb(0, 47, 168)", textAlign: "center", fontSize: "20px"}}>Как изменить вид разрешенного использования земельного участка?</p>
          <img alt="fsdfsdfsdfsfd" src={grafics} style={{height: "600px", width: "550px"}}/>
        </div>
      </div>
    </div>
  )}
          <div className='menu_tops'>
          <div className="container_searsh">
            <div style={{ fontSize: "30px", textAlign: "center", color: "#002fa8", paddingLeft: "35px", paddingTop: "10px"}}>Информация</div>
          </div>
          <button className="toggle-btn" onClick={toggleSidebar} style={{transform: "translate(35px, -12px)"}}>
            {isOpen ? '⮌' : '⮎'}
          </button>
        </div>
        <div className="content_saidbar_main_shoilda">
        <div className="text_modal" style={{ color: "#002fa8", textAlign: "center", fontSize: "14px", position: "relative", textDecoration: "underline" }} onClick={toggleModal}>
          Как изменить вид разрешенного использования земельного участка?
        </div>
        <div className='Link' style={{background: "#000", width: "100px", background: "rgb(0 47 168)", width: "97%", height: "2px", marginTop: "15px", marginBottom: "15px"}}></div>
        <div style={{color: "#002fa8", textAlign: "center"}}>Заказать выписку из ЕГРН</div>
          <div className='flex_block_gpg' style={{display: "flex", marginTop: "20px", justifyContent: "space-around"}}>
          <div className='block_infors' style={{width: "113px", height: "38px", border: "1px solid #002fa8", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center"}}><Link to="https://rosreestr.ru/wps/portal/p/cc_present/EGRN_1"><img src={reestr} alt="fdhfghfgh" style={{width: "100px"}}/></Link></div>
          <div className='block_infors' style={{width: "113px", height: "38px", border: "1px solid #002fa8", borderRadius: "6px",display: "flex", justifyContent: "center", alignItems: "center"}}><Link to="http://mfc63.samregion.ru/service_info/?i=358&c=040000"><img src={mfc} alt="fdhfghfghpp[" style={{width: "100px"}}/></Link></div>
        </div>
        <div className='Link' style={{background: "#000", width: "100px", background: "rgb(0 47 168)", width: "97%", height: "2px", marginTop: "15px", marginBottom: "15px"}}></div>
              <div style={{color: "#002fa8", textAlign: "center"}}>Получить сведения из реестра муниципальной собственности</div>
              <div style={{color: "#002fa8", textAlign: "center"}}>Заказать выписку из ЕГРН</div>
              <div className='flex_block_gpg' style={{display: "flex", marginTop: "20px", justifyContent: "space-around"}}>
              <div className='block_infors' style={{width: "113px", height: "38px", border: "1px solid #002fa8", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center"}}><Link to="https://pgu.samregion.ru/rpguWeb/metro/newServicePassport.jsp?servicePassportId=6300100010000234933&indexPage=stateStructureTree&popularPage=1&limit=50&recipientCategoryType=physical#preventBack"><img src={portal} alt="fdhfghfgh" style={{width: "100px"}}/></Link></div>
              <div className='block_infors' style={{width: "113px", height: "38px", border: "1px solid #002fa8", borderRadius: "6px",display: "flex", justifyContent: "center", alignItems: "center"}}><Link to="http://mfc63.samregion.ru/service_info/?i=358&c=040000"><img src={mfc} alt="fdhfghfghpp[" style={{width: "100px"}}/></Link></div>
        </div>
        </div>
        </>
        )
      }
          <div className="flex_bootom_panel_saidbar" style={{marginTop: "20px"}}>
              <ButtonItem title={buttonText} onClick={toggleContent} style={{ width: "90px", alignItems: "center"}}/>
              <button title="Очистить" type='button' onClick={handleResetCheckboxes}  style={{ width: "90px", alignItems: "center"}}><img src={lastic}  style={{ width: "32px", height: "32px"}}/></button>
          </div>
        </div>
      </div>
    );
  }


  const [searchObjectId, setSearchObjectId] = useState('');
  const [pointsLayer, setPointsLayer] = useState(null);
  const [pointsLayer_2, setPointsLayer_2] = useState(null);
  const [pointsLayer_3, setPointsLayer_3] = useState(null);
  const [pointsLayer_4, setPointsLayer_4] = useState(null);
  const [pointsLayer_5, setPointsLayer_5] = useState(null);
  const mapRef = useRef(null);
  const inputRef = useRef(null);


  useEffect(() => {
    const loadCss = url => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    };
  
    loadCss('https://js.arcgis.com/4.23/esri/themes/light/main.css');
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/TileLayer',
      'esri/layers/MapImageLayer',
      'esri/layers/FeatureLayer',
      'esri/PopupTemplate',
      'esri/widgets/Popup',
      'esri/renderers/SimpleRenderer',
      'esri/symbols/SimpleLineSymbol' // Заменяем SimpleMarkerSymbol на SimpleLineSymbol
    ], {
      url: 'https://js.arcgis.com/4.23/'
    }).then(([Map, MapView, TileLayer, MapImageLayer, FeatureLayer, PopupTemplate, Popup, SimpleRenderer, SimpleLineSymbol]) => {
  
      const popupTemplate = new PopupTemplate({
        title: 'Номер конструкции: {OBJECTID}',
        content: `
          <ul>
            <li><b>Адресс:</b> {Address}</li>
            <li><b>Тип:</b> {Tip}</li>
            <li><b>Вид:</b> {Vid}</li>
            <li><b>Кадастровый номер:</b> {CADNO}</li>
            <li><b>Вид собственности:</b> {Owner}</li>
          </ul>
        `
      });
  
      const contLyr1 = new MapImageLayer({
        url: 'http://tech109.mfc63.ru/arcgis/rest/services/Portal/Reklama_clusters_2/MapServer',
        title: 'Реклама',
        visible: true
      });
  
      const baseLyr1 = new TileLayer({
        url: 'http://tech109.mfc63.ru/arcgis/rest/services/Hosted/Basemap/MapServer',
        listMode: 'hide'
      });
  
      const map = new Map({
        layers: [baseLyr1, contLyr1]
      });
  
      const view1 = new MapView({
        container: 'map',
        map: map,
        spatialReference: {
          wkid: 3857
        },
        center: [11.933464831878339, 3.8076571307169584],
        zoom: 10,
        ui: {
          components: ['attribution']
        },
        constraints: {
          minScale: 150000
        }
      });
  
      setPointsLayer(pointsLayer);
      mapRef.current = view1;
  
      const renderer = new SimpleRenderer({
        symbol: new SimpleLineSymbol({
          style: "solid",
          color: "#e600a9",
          width: 2
        })
      });

      const render_2 = new SimpleRenderer({
        symbol: new SimpleLineSymbol({
          style: "sloid",
          color: "#005ce6",
          width: 1
        })
      })
  
      if (!pointsLayer) {
        const pointsLayer = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/ZemUch/ZU_T2/MapServer/6",
          title: "Карта (схема) градостроительного зонирования",
          visible: false,
          outFields: ['*'],
          popupTemplate: popupTemplate,
          renderer: renderer
        });
  
        map.add(pointsLayer);
        setPointsLayer(pointsLayer);
      }
  
      if (!pointsLayer_2) {
        const pointsLayer_2 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/ZemUch/ZU_T2/MapServer/1",
          title: "Земельные участки",
          visible: false,
          outFields: ['*'],
          render_2
        });
  
        map.add(pointsLayer_2);
        setPointsLayer_2(pointsLayer_2);
      }


      if (!pointsLayer_3) {
        const pointsLayer_3 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/ZemUch/ZU_T2/MapServer/3",
          title: "Участки в аренде",
          visible: false,
          outFields: ['*'],
          render_2
        });
  
        map.add(pointsLayer_3);
        setPointsLayer_3(pointsLayer_3);
      }


      if (!pointsLayer_4) {
        const pointsLayer_4 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/ZemUch/ZU_T2/MapServer/2",
          title: "Участки в безвозмездном пользовании",
          visible: false,
          outFields: ['*'],
          render_2
        });
  
        map.add(pointsLayer_4);
        setPointsLayer_4(pointsLayer_4);
      }


      if (!pointsLayer_5) {
        const pointsLayer_5 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/ZemUch/ZU_T2/MapServer/5",
          title: "Границы города",
          visible: false,
          outFields: ['*'],
          render_2
        });
  
        map.add(pointsLayer_5);
        setPointsLayer_5(pointsLayer_5);
      }
  
      const popup = new Popup({
        view: view1,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false
        }
      });
  
      // Listen for click events on the view
      view1.on('click', function(event) {
        // Restrict popup to pointsLayer
        popup.open({
          features: [event.graphic],
          location: event.mapPoint
        });
      });
  
      // Clean up on unmount
      return () => {
        if (view1) {
          view1.container = null;
        }
      };
    }).catch(err => {
      console.error('Ошибка загрузки модулей ArcGIS:', err);
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100vw', position: "absolute" }}></div>
      <Saidbar
          pointsLayer={pointsLayer}
          pointsLayer_2={pointsLayer_2}
          searchObjectId={searchObjectId}
          setSearchObjectId={setSearchObjectId}
        />
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
    } 

    else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleMapClick = () => {
    setIsModalOpen(false); // Закрываем модальное окно при клике на карту
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
      </div>
        <MapComponent onClick={handleMapClick} /> 
        </div>
    </div>
    </div>
  );
}

const listItemStyle = {
  width: '150px',
  height: 'auto',
  border: '1px solid #002fa8',
  paddingTop: '5px',
  paddingLeft: '10px',
  paddingBottom: '5px',
  marginTop: '5px',
  marginBottom: '3px',
  color: '#002fa8',
  borderRadius: "5px",
};
export default Home;