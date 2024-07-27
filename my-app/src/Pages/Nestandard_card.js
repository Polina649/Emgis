import React, { useState, useRef, useEffect } from 'react';
import '../Pages/css/Saidbar.css';
import { Link, NavLink } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
// import MapComponent from '../Components/Map_Reclam_Construction_2';
// import MapComponent_2 from '../Components/Map_Reclam_Construct';
import Slider from 'react-slick';
import slaider from '../Pages/img/icons8-слои-32.png';
// import icons_filter from '../Pages/img/icons8-filter-50.png';
import download from '../Pages/img/icons8-скачать-48.png';
import { loadModules } from 'esri-loader';
import lastic from '../Pages/img/icons8-ластик-32 (1).png';
import nasad from '../Pages/img/icons8-стрелка-назад-24.png';

const addressesInTolyatti = [
  '1', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51',
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

const Sidebar = ({ pointsLayer, pointsLayer_2, searchObjectId, setSearchObjectId }) => {
  const [isApprovedChecked, setIsApprovedChecked] = useState(false);
  const [isIllegalChecked, setIsIllegalChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [selectedOwnershipType, setSelectedOwnershipType] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [isCytyDepytats, setIsCytyDepytats] = useState(false);
  const [isSamaraDepytats, setIsSamaraDepytats] = useState(false);
  const [isElectrosnabzhenieChecked, setIsElectrosnabzhenieChecked] = useState(false);
  const [isKanalizaciyaChecked, setIsKanalizaciyaChecked] = useState(false);
  const [isVodosnabzhenieChecked, setIsVodosnabzhenieChecked] = useState(false);
  const [isGazosnabzhenieChecked, setIsGazosnabzhenieChecked] = useState(false);
  const [selectedOwnershipTypeItem, setSelectedOwnershipTypeItem] = useState(null);
  const [selectedPropertyTypeItem, setSelectedPropertyTypeItem] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  // useEffect(() => {
  //   const isVisible = isApprovedChecked || isIllegalChecked;
  //   if (pointsLayer) pointsLayer.visible = isVisible && isApprovedChecked;
  //   if (pointsLayer_2) pointsLayer_2.visible = isVisible && isIllegalChecked;
  // }, [isApprovedChecked, isIllegalChecked, pointsLayer, pointsLayer_2]);


  useEffect(() => {
    if (pointsLayer) {
      pointsLayer.visible = isApprovedChecked;
    }
  }, [isApprovedChecked, pointsLayer]);

  useEffect(() => {
    if (pointsLayer_2) {
      pointsLayer_2.visible = isIllegalChecked;
    }
  }, [isIllegalChecked, pointsLayer_2]);



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

    if (input.length >= 1) {
      event.target.classList.remove('transparent-input');
      event.target.classList.add('visible-input');
    } else {
      event.target.classList.remove('visible-input');
      event.target.classList.add('transparent-input');
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setSearchInput(address);
    setFilteredAddresses([]);
  };

  const handleResetCheckboxes = () => {
    setIsApprovedChecked(false);
    setIsIllegalChecked(false);
    setSelectedOwnershipTypeItem(null); // Обнуляем выбранный пункт для "Отрослевая пренадлежность"
    setSelectedPropertyTypeItem(null); // Обнуляем выбранный пункт для "Виды собственности"
  };


  return (
    <div className='home_styles'>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='menu_tops'>
          <div className="container_searsh">
            <input
              placeholder='Поиск...'
              className={`js-search ${searchObjectId.length >= 1 ? 'visible-input' : 'transparent-input'}`}
              type="text"
              value={searchObjectId}
              onChange={(e) => setSearchObjectId(e.target.value)}
              onClick={() => setShowAddressList(true)}
              style={{ position: 'relative', zIndex: 1000 }}
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
              <ul style={{ marginBottom: "30px", opacity: "0.5" }}>
                {filteredAddresses.map((address, index) => (
                  <li key={index} onClick={() => setSearchInput(address)}>{address}</li>
                ))}
              </ul>
            )}
            <CheckboxItem text="Несезоные" isChecked={isApprovedChecked} onChange={setIsApprovedChecked} />
            <br />
            <CheckboxItem text="Сезонные" isChecked={isIllegalChecked} onChange={setIsIllegalChecked} />
            <br />
          </div>
        </div>
        <div className="flex_bootom_panel_saidbar">
              <button type='button' onClick={handleResetCheckboxes} style={{ width: "160px", alignItems: "center"}}><img src={lastic} style={{ width: "32px", height: "32px"}}/>Очистить всё</button>
        </div>
      </div>
    </div>
  );
};

const LeafletMap = () => {
  const [searchObjectId, setSearchObjectId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [pointsLayer, setPointsLayer] = useState(null);
  const [pointsLayer_2, setPointsLayer_2] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true); // Initially show Sidebar

  const handleLayersClick = () => {
    setShowSidebar(true);
  };

  const handleFiltersClick = () => {
    setShowSidebar(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchObjectId(event.target.value);
  };

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
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/TileLayer',
      'esri/layers/MapImageLayer',
      'esri/layers/FeatureLayer',
      'esri/PopupTemplate',
      'esri/tasks/QueryTask',
      'esri/tasks/support/Query'
    ], {
      url: 'https://js.arcgis.com/4.23/'
    }).then(([Map, MapView, TileLayer, MapImageLayer, FeatureLayer, PopupTemplate, QueryTask, Query]) => {

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

      const pointsLayer = new FeatureLayer({
        url: "http://tech109.mfc63.ru/arcgis/rest/services/NTO/NTO_260124/MapServer/2",
        title: "Несезонные",
        visible: false
      });

      const pointsLayer_2 = new FeatureLayer({
        url: "http://tech109.mfc63.ru/arcgis/rest/services/NTO/NTO_260124/MapServer/3",
        title: "Сезонные",
        visible: false
      });

      map.add(pointsLayer);
      map.add(pointsLayer_2);

      setPointsLayer(pointsLayer);
      setPointsLayer_2(pointsLayer_2);

      const popupTemplate = new PopupTemplate({
        title: '{Type_} НТО',
        content: 
          `<ul>
            <li><b>Номер торгового объекта в схеме:</b>{Address}</li>
            <li><b>Статус:</b>{status}</li>
            <li><b>Тип:</b>{Type_}</li>
            <li><b>Специализация:</b>{specializ}</li>
            <li><b>Срок:</b>{srok}</li>
            <li><b>Собственник:</b>{sobstv}</li>
            <li><b>Вид:</b>{Sezon}</li>
            <li><b>Дата договора:</b><br/>{cadno}</li>
             <li><b>Адрес:</b>{address}</li>
          </ul>`
      });

      pointsLayer.popupTemplate = popupTemplate;
      view1.on('click', async (event) => {
        try {
          const response = await view1.hitTest(event);
          if (response.results.length > 0) {
            const graphic = response.results[0].graphic;
            view1.popup.open({
              features: [graphic],
              location: event.mapPoint
            });
          }
        } catch (error) {
          console.error('Ошибка при открытии попапа:', error);
        }
      });

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
      <div id="map" style={{ height: '100vh', width: '100vw' }}></div>
        <Sidebar
          pointsLayer={pointsLayer}
          pointsLayer_2={pointsLayer_2}
          searchObjectId={searchObjectId}
          setSearchObjectId={setSearchObjectId}
        />
    </div>
  );
};

function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapComponent, setMapComponent] = useState('LeafletMap');
  
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
    tab1: <Slider />,
    tab2: <div />,
  };

  const handleMapClick = () => {
    setIsModalOpen(false);
  };

  const handleLayersClick = () => {
    setMapComponent('LeafletMap');
  };

  const handleFiltersClick = () => {
    setMapComponent('MapComponent_2');
  };

  return (
    <div className='resident'>
      <div className="main_styles">
        {isModalOpen && (
          <div className="modal-background">
            <div className="modal" ref={modalRef}>
              <div className="modal-content">
                <div>
                  <div className='text_modal'>Схема размещения нестационарных <br />торговых объектов городского округа Тольятти</div>
                  <div className="tabs">
                    <button className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}} onClick={() => handleTabClick('tab1')`}>Приложение</button>
                    <button className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}} onClick={() => handleTabClick('tab2')`}>Сведения инвестиционной карты</button>
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
          <div className="header">
            <div className="logo">
              <div>
                <Link to="/"><img src={logo} alt="EMGIS Logo" /></Link>
                <Link to="/"><span className='logo_text'>ЕМГИС</span></Link>
              </div>
              <Link to="/"><p>Схема размещения нестационарных торговых объектов<br />городского округа Тольятти (04.22)</p></Link>
            </div>
            {/* <BurgerMenu onLayersClick={handleLayersClick} onFiltersClick={handleFiltersClick} /> */}
            {/* <RightSidebar /> */}
          </div>

          <LeafletMap/>

          {/* <div className='map-container'>
          <LeafletMap/>
            <div style={{ display: mapComponent === 'LeafletMap' ? 'block' : 'none' }}>
              <LeafletMap/>
            </div>
            <div style={{ display: mapComponent === 'MapComponent_2' ? 'block' : 'none' }}>
              <MapComponent_2 onClick={handleMapClick} />
            </div>
          </div> */}
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