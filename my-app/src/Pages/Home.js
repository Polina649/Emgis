import React, { useState, useEffect , useRef} from 'react';
import './css/Saidbar.css'; // Предполагается, что стили импортированы
import { Link } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
// import MapComponent from '../Components/MapComponent';
import 'react-datepicker/dist/react-datepicker.css'; // Подключаем стили DatePicker
import lastic from '../Pages/img/icons8-ластик-32 (1).png';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import $ from 'jquery';
import ReactDOM from 'react-dom';

const addressesInTolyatti = [
  'Беларусская 33',
  'Юбилейная 5',
  'Ревалюцинная 52',
  'Советкая 51',
  'Ярославская 9',
  'Южное шоссе',
];

function fetchUniqueNames(trolleybus_routes) {
  const query = trolleybus_routes.createQuery();
  query.returnGeometry = false;
  query.outFields = ['NAME'];
  query.where = '1=1'; // Для выбора всех записей

  return trolleybus_routes.queryFeatures(query)
    .then(response => {
      const names = response.features.map(feature => feature.attributes.NAME);
      return [...new Set(names)]; // Уникальные значения
    })
    .catch(error => {
      console.error('Error fetching unique names:', error);
      return [];
    });
}

const MapComponent = () => {
  const [searchObjectId, setSearchObjectId] = useState('');
  const [pointsLayer, setPointsLayer] = useState(null);
  const [pointsLayer_2, setPointsLayer_2] = useState(null);
  const [pointsLayer_3, setPointsLayer_3] = useState(null);
  const [pointsLayer_4, setPointsLayer_4] = useState(null);
  const [pointsLayer_5, setPointsLayer_5] = useState(null);
  const [remont_dorog_1, setRemont_dorog_1] = useState(null);
  const [remont_dorog_2, setRemont_dorog_2] = useState(null);
  const [remont_dorog_3, setRemont_dorog_3] = useState(null);
  const [remont_dorog_4, setRemont_dorog_4] = useState(null);
  const [remont_dorog_5, setRemont_dorog_5] = useState(null);
  const [sfetafor, setSfetafor] = useState(null);
  const [construction_of_road_signs, setСonstruction_of_road_signs] = useState(null);
  const [constru_road_signs, setСonstru_road_signs] = useState(null);
  const [artificial_pavement, setArtificial_pavement] = useState(null);
  const [device_noise , setDevice_noise] = useState(null);
  const [urban_economy, setUrban_economy] = useState(null);
  const [forest_territories, setForest_territories] = useState(null);
  const [forest_territories_1, setForest_territories_1] = useState(null);
  const [forest_territories_2, setForest_territories_2] = useState(null);
  const [forest_territories_3, setForest_territories_3] = useState(null);
  const [forest_territories_4, setForest_territories_4] = useState(null);
  const [forest_territories_5, setForest_territories_5] = useState(null);
  const [mfc_1, setMfc_1] = useState(null);
  const [mfc_2, setMfc_2] = useState(null);
  const [mfc_3, setMfc_3] = useState(null);
  const [contLyrAlc0, setcontLyrAlc0] = useState(null);
  const [contLyrAlc1, setcontLyrAlc1] = useState(null);
  const [contLyrAlc2, setcontLyrAlc2] = useState(null);
  const [contLyrAlc3, setcontLyrAlc3] = useState(null);
  const [accessibility_low_mobility_groups, setAccessibility_low_mobility_groups] = useState(null);
  const [municipal, setMunicipal] = useState(null);
  const [municipal_1, setMunicipal_1] = useState(null);
  const [municipal_2, setMunicipal_2] = useState(null);
  const [municipal_3, setMunicipal_3] = useState(null);
  const [sport_object, setSport_object] = useState(null);
  const [sport_object_kat, setSport_object_kat] = useState(null);
  const [alkogol, setAlcogol] = useState(null);
  const [toggleAlkogolLayers, setToggleAlkogolLayers] = useState(null);
  const [rec, setRec] = useState(null);
  const [contLyrAlcGroup, setContLyrAlcGroup] = useState(null);
  const [reclamas, setReclamas] = useState(null);
  const [posh_slois, setPosh_slois] = useState(null);
  const [posh_slois_1, setPosh_slois_1] = useState(null);
  const [posh_slois_2, setPosh_slois_2] = useState(null);
  const [posh_slois_3, setPosh_slois_3] = useState(null);
  const [posh_slois_4, setPosh_slois_4] = useState(null);
  const [posh_slois_5, setPosh_slois_5] = useState(null);
  const [posh_slois_6, setPosh_slois_6] = useState(null);
  const [posh_slois_7, setPosh_slois_7] = useState(null);
  const [posh_slois_8, setPosh_slois_8] = useState(null);
  const [torgComplecs, setTorgComplecsp] = useState(null);
  const [contLyrAddr, setContLyrAddr] = useState(null);
  const [ostanovka,  setOstanovka] = useState(null);
  const [newTrolleybusRoutes, setTrolleybusRoutes] = useState(null);
  const [bus_routes, setBus_routes] = useState(null);
  // const [trolleybusRoutes, setTrolleybusRoutes] = useState(null);
  const [uniqueNames_2, setUniqueNames_2] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapDiv = useRef(null);
  const [selectedFeature, setSelectedFeature] = useState(null);




  const Saidbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [searchObjectId, setSearchObjectId] = useState('');
  const inputRef = useRef(null);

   const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchObjectId(value);

    if (!value) {
      if (mapRef.current) {
        mapRef.current.graphics.removeAll();
        contLyrAddr.visible = false;
      }
    }
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (mapRef.current) {
        mapRef.current.graphics.removeAll();
        contLyrAddr.visible = false;
      }
      performSearch();
    }
  };
  
  const performSearch = async () => {
    const [FeatureLayer, Graphic] = await loadModules([
      'esri/layers/FeatureLayer',
      'esri/Graphic'
    ]);
  
    let query;
    if (isNaN(searchObjectId)) {
      // Search by address
      query = contLyrAddr.createQuery();
      query.where = `Address LIKE '%${searchObjectId}%'`;
    } 

    const result = await contLyrAddr.queryFeatures(query);
    if (result.features.length > 0) {
      const feature = result.features[0];
      const { geometry } = feature;
  
      // Center the map on the found feature
      mapRef.current.goTo({
        target: geometry,
        zoom: 15
      });
      
  
  
      // Add the found feature to the map as a graphic
      const graphic = new Graphic({
        geometry,
        symbol: {
          type: 'simple-marker',
          color: 'white',
          size: '15px',
          outline: {
            color: 'red',
            width: 2
          }
        }
      });
      mapRef.current.graphics.removeAll();
      mapRef.current.graphics.add(graphic);
      // Add event listener to remove graphic when popup is closed
    }
    else {
      alert("Объект не найден");
    }
  };

  const handleItemClick = (item, isChecked, subMenuTitle) => {
    if (uniqueNames.includes(item) && newTrolleybusRoutes) {
      if (subMenuTitle === "Маршруты троллейбусов") {
        if (isChecked) {
          const filterExpression = `NAME = '${item}'`;
          console.log(`Applying filter: ${item}`);
          newTrolleybusRoutes.definitionExpression = filterExpression;
          newTrolleybusRoutes.visible = true; // Включаем видимость только для отфильтрованных значений
        } else {
          console.log('Removing filter');
          newTrolleybusRoutes.definitionExpression = ""; // Очистка фильтра
          newTrolleybusRoutes.visible = false; // Скрываем слой
      }
    }
  }

  if (uniqueNames_2.includes(item) && bus_routes) {
    if (subMenuTitle === "Маршруты автобусов") {
    if (isChecked) {
        const filterExpression = `NAME = '${item}'`;
        console.log(`Applying filter: ${item}`);
        bus_routes.definitionExpression = filterExpression;
        bus_routes.visible = true;
        // bus_routes.visible = isChecked;
    } else {
        console.log('Removing filter');
        bus_routes.definitionExpression = null;
        bus_routes.definitionExpression = "";
        bus_routes.visible = false;
    }
  }
} 
    // Ремонт дорог
    if (item === "Ремонт дорог 2023" && pointsLayer) {
        pointsLayer.visible = isChecked;
    }
    if (item === "Ремонт дорог 2022" && pointsLayer_2) {
        pointsLayer_2.visible = isChecked;
    }
    if (item === "Ремонт дорог 2021" && pointsLayer_3) {
        pointsLayer_3.visible = isChecked;
    }
    if (item === "Ремонт дорог 2020" && pointsLayer_4) {
        pointsLayer_4.visible = isChecked;
    }
    if (item === "Ремонт дорог 2019" && pointsLayer_5) {
        pointsLayer_5.visible = isChecked;
    }

    // Ремонт междворовых территорий
    if (item === "Ремонт междворовых территорий 2023" && remont_dorog_1) {
        remont_dorog_1.visible = isChecked;
    }
    if (item === "Ремонт междворовых территорий 2021" && remont_dorog_2) {
        remont_dorog_2.visible = isChecked;
    }
    if (item === "Ремонт междворовых территорий 2020" && remont_dorog_3) {
        remont_dorog_3.visible = isChecked;
    }
    if (item === "Ремонт междворовых территорий 2019" && remont_dorog_4) {
        remont_dorog_4.visible = isChecked;
    }
    if (item === "Ремонт междворовых территорий 2018" && remont_dorog_5) {
        remont_dorog_5.visible = isChecked;
    }
    if (item === "Устройство светофорных объектов 2019" && sfetafor) {
        sfetafor.visible = isChecked;
    }

    // Устройство дорожных знаков
    if (item === "Устройство дорожных знаков 2019 год" && construction_of_road_signs) {
        construction_of_road_signs.visible = isChecked;
    }

    // Участки дорог с искусственным нарушением покрытия
    if (item === "Участки дорог с искусственным нарушением покрытия 2019 год" && constru_road_signs) {
        constru_road_signs.visible = isChecked;
    }

    // Устройство съездов для инвалидов и других маломобильных групп населения
    if (item === "Устройство съездов для инвалидов и других маломобильных групп населения 2019 год" && artificial_pavement) {
        artificial_pavement.visible = isChecked;
    }

    // Устройство шумовых полос
    if (item === "Устройство шумовых полос 2019 год" && device_noise) {
        device_noise.visible = isChecked;
    }

    // Участки комплексного содержания территорий общего пользования жилых кварталов городского округа Тольятти
    if (item === "Участки комплексного содержания территорий общего пользования жилых кварталов городского округа Тольятти" && urban_economy) {
        urban_economy.visible = isChecked;
    }

    // Лесные территории
    if (item === "Лесные территории (кварталы, выделы)" && forest_territories) {
        forest_territories.visible = isChecked;
    }
    if (item === "Посадки лесных культур 2021" && forest_territories_1) {
        forest_territories_1.visible = isChecked;
    }
    if (item === "Посадки лесных культур 2020" && forest_territories_2) {
        forest_territories_2.visible = isChecked;
    }
    if (item === "Посадки лесных культур 2019" && forest_territories_3) {
        forest_territories_3.visible = isChecked;
    }
    if (item === "Посадки лесных культур 2018" && forest_territories_4) {
        forest_territories_4.visible = isChecked;
    }
    if (item === "Посадки лесных культур 2017" && forest_territories_5) {
        forest_territories_5.visible = isChecked;
    }

    // Спортивные объекты
    if (item === "Спорт. площадки" && sport_object) {
        sport_object.visible = isChecked;
    }
    if (item === "Катки" && sport_object_kat) {
        sport_object_kat.visible = isChecked;
    }

    // МФЦ
    if (item === "МФЦ") {
        mfcChecked = isChecked;
    } else if (item === "Офис МФЦ") {
        officeMfcChecked = isChecked;
    } else if (item === "Центр оказания услуг для бизнеса") {
        businessServiceCenterChecked = isChecked;
    }
    updateDefinitionExpression();

    // Доступность маломобильных групп
    if (item === "Дошкольное") {
        doschool = isChecked;
    } else if (item === "Школьное") {
        school = isChecked;
    } else if (item === "Профессиональное") {
        professional = isChecked;
    } else if (item === "Дополнительное") {
        dopol = isChecked;
    } else if (item === "Прочие") {
        prochie = isChecked;
    } else if (item === "Объекты потребительского рынка") {
        object = isChecked;
    } else if (item === "Государственное управление") {
        gosudar = isChecked;
    } else if (item === "Жилой фонд") {
        fond = isChecked;
    } else if (item === "Социальная защита") {
        social_weeks = isChecked;
    } else if (item === "Сфера услуг") {
        sfera_sorce = isChecked;
    } else if (item === "Кредитно-финансового назначения") {
        credit_fin = isChecked;
    } else if (item === "Культура") {
        cultura = isChecked;
    } else if (item === "Физическая культура и спорт") {
        fizkultura = isChecked;
    } else if (item === "Здравоохранение (больницы)") {
        zdrabol = isChecked;
    } else if (item === "Здравоохранение (поликлиники)") {
        zdrapol = isChecked;
    } else if (item === "Здравоохранение (прочие)") {
        zdraproch = isChecked;
    } else if (item === "Другое") {
        drugoe = isChecked;
    } else if (item === "Прочее") {
        prochie_2 = isChecked;
    }

    updateDefinitionExpression_1();

    // Муниципалка
    if (item === "Детские сады" && municipal_2) {
        municipal_2.visible = isChecked;
    }
    if (item === "Школы" && municipal_1) {
        municipal_1.visible = isChecked;
    }
    if (item === "Спорт" && municipal_3) {
        municipal_3.visible = isChecked;
    }
    if (item === "Культурно-досуговые учреждения") {
        cuituro_many = isChecked;
    } else if (item === "Муниципальные бюджетные образовательные учреждения культуры") {
        many_many = isChecked;
    } else if (item === "Музеи") {
        muzey_many = isChecked;
    } else if (item === "Библиотеки") {
        biblioteka_many = isChecked;
    } else if (item === "Прочие учреждения") {
        prochie_many = isChecked;
    } 
    updateDefinitionExpression_2();

    // Потребительский рынок
    if (item === "Рекламные конструкции" && reclamas) {
        reclamas.visible = isChecked;
    } 
    if (item === "Антиалкогольные схемы" && contLyrAlcGroup) {
        contLyrAlcGroup.visible = isChecked;
    } 
    // Прочие слои
    if (item === "Границы районов" && posh_slois) {
        posh_slois.visible = isChecked;
    } 
    if (item === "Границы городского округа" && posh_slois_1) {
        posh_slois_1.visible = isChecked;
    } 
    if (item === "Границы садово-огородных массивов" && posh_slois_2) {
        posh_slois_2.visible = isChecked;
    } 
    if (item === "Лагеря и турбазы" && posh_slois_3) {
        posh_slois_3.visible = isChecked;
    } 
    if (item === "Границы общественных советов микрорайонов" && posh_slois_4) {
        posh_slois_4.visible = isChecked;
    } 
    if (item === "Избирательные участки" && posh_slois_5) {
        posh_slois_5.visible = isChecked;
    } 
    if (item === "Здравоохранение" && posh_slois_6) {
        posh_slois_6.visible = isChecked;
    } 
    if (item === "Таксофоны" && posh_slois_7) {
        posh_slois_7.visible = isChecked;
    } 
    if (item === "ТОС" && posh_slois_8) {
        posh_slois_8.visible = isChecked;
    } 
    if (item === "Торговые комплексы" && torgComplecs) {
        torgComplecs.visible = isChecked;
    } 
    if (item === "Остановки" && ostanovka) {
        ostanovka.visible = isChecked;
    } 
};

let mfcChecked = false;
let officeMfcChecked = false;
let businessServiceCenterChecked = false;


function updateDefinitionExpression() {
  let expressions = [];

  if (mfcChecked) {
    expressions.push("name_1 = 'МФЦ'");
  }
  if (officeMfcChecked) {
    expressions.push("name_1 = 'офис МФЦ'");
  }
  if (businessServiceCenterChecked) {
    expressions.push("name_1 = 'Центр оказания услуг для би'");
  }

  if (expressions.length > 0) {
    mfc_1.definitionExpression = expressions.join(" OR ");
  } else {
    mfc_1.definitionExpression = null;
  }

  mfc_1.visible = expressions.length > 0;
}

let cuituro_many = false;
let many_many = false;
let muzey_many = false;
let biblioteka_many = false;
let prochie_many = false;

function updateDefinitionExpression_2() {
  let expressions = [];

  if (cuituro_many) {
    expressions.push("number = '2.2'");
  }
  if (many_many) {
    expressions.push("number = '2.4'");
  }
  if (muzey_many) {
    expressions.push("number  = '2.1'");
  }
  if (biblioteka_many) {
    expressions.push("number = '2.5'");
  }
  if (prochie_many) {
    expressions.push("number = '2.3'");
  }
  if (expressions.length > 0) {
    municipal.definitionExpression = expressions.join(" OR ");
  } else {
    municipal.definitionExpression = null;
  }
  municipal.visible = expressions.length > 0;
}

let doschool = false;
let school = false;
let professional = false;
let dopol = false;
let prochie = false;
let object = false;
let gosudar = false;
let fond = false;
let social_weeks = false;
let sfera_sorce = false;
let credit_fin = false;
let cultura = false;
let fizkultura = false;
let zdrabol = false;
let zdrapol = false;
let zdraproch = false;
let drugoe = false;
let prochie_2 = false;

function updateDefinitionExpression_1() {
  let expressions = [];

  if (doschool) {
    expressions.push("OTRASL_NAM = 'образование(дошкольное)'");
  }
  if (school) {
    expressions.push("OTRASL_NAM = 'образование(школьное)'");
  }
  if (professional) {
    expressions.push("OTRASL_NAM = 'образование(профессиональное)'");
  }
  if (dopol) {
    expressions.push("OTRASL_NAM = 'образование(дополнительное)'");
  }
  if (prochie) {
    expressions.push("OTRASL_NAM = 'образование(прочие)'");
  }
  if (object) {
    expressions.push("OTRASL_NAM = 'потребительский рынок'");
  }
  if (gosudar) {
    expressions.push("OTRASL_NAM = 'государственное (муниципальное) управление'");
  }
  if (fond) {
    expressions.push("OTRASL_NAM = 'жилой фонд'");
  }
  if (social_weeks) {
    expressions.push("OTRASL_NAM = 'социальная защита'");
  }
  if (sfera_sorce) {
    expressions.push("OTRASL_NAM = 'сфера услуг'");
  }
  if (credit_fin) {
    expressions.push("OTRASL_NAM = 'кредитно-финансового назначения'");
  }
  if (cultura) {
    expressions.push("OTRASL_NAM = 'культура'");
  }
  if (fizkultura) {
    expressions.push("OTRASL_NAM = 'физическая культура и спорт'");
  }
  if (zdrabol) {
    expressions.push("OTRASL_NAM = 'здравоохранение(больницы)'");
  }
  if (zdrapol) {
    expressions.push("OTRASL_NAM = 'здравоохранение(поликлиники)'");
  }
  if (zdraproch) {
    expressions.push("OTRASL_NAM = 'здравоохранение(прочие)'");
  }
  if (drugoe) {
    expressions.push("OTRASL_NAM = 'другое'");
  }
  if (prochie_2) {
    expressions.push("OTRASL_NAM = 'другое'");
  }
  if (expressions.length > 0) {
    accessibility_low_mobility_groups.definitionExpression = expressions.join(" OR ");
  } else {
    accessibility_low_mobility_groups.definitionExpression = null;
  }

  accessibility_low_mobility_groups.visible = expressions.length > 0;
}
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


  
    return (
      <div className='home_styles'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div className='menu_tops'>

              <div className="container_searsh">
              <input
              placeholder='Адрес...'
              className={`js-search ${searchObjectId.length > 0 ? 'visible-input' : 'transparent-input'}`}
              type="text"
              value={searchObjectId}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
              ref={inputRef}
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
                <ul  style={{opacity: "0.5"}}>
                  {filteredAddresses.map((address, index) => (
                    <li key={index} onClick={() => handleAddressClick(address)}>{address}</li>
                  ))}
                </ul>
              )}
             <ExpandableList
        title="Дорожное хозяйство"
        items={[]}
        subMenu={[
          {
            title: "Ремонт дорог",
            items: ["Ремонт дорог 2023", "Ремонт дорог 2022", "Ремонт дорог 2021", "Ремонт дорог 2020", "Ремонт дорог 2019"]
          },
          {
            title: "Ремонт междворовых территорий",
            items: ["Ремонт междворовых территорий 2023", "Ремонт междворовых территорий 2021", "Ремонт междворовых территорий 2020", "Ремонт междворовых территорий 2019", "Ремонт междворовых территорий 2018"]
          },
          {
            title: "Устройство светофорных объектов",
            items: ["Устройство светофорных объектов 2019"]
          },
          {
            title: "Устройство дорожных знаков",
            items: ["Устройство дорожных знаков 2019 год"]
          },
          {
            title: "Участки дорог с искусственным нарушением покрытия",
            items: ["Участки дорог с искусственным нарушением покрытия 2019 год"]
          },
          {
            title: "Устройство съездов для инвалидов и других маломобильных групп населения",
            items: ["Устройство съездов для инвалидов и других маломобильных групп населения 2019 год"]
          },
          {
            title: "Устройство шумовых полос",
            items: ["Устройство шумовых полос 2019 год"]
          }
        ]}
        onItemClick={handleItemClick}
      />


              <ExpandableList
                title="Городское хозяйство"
                items={['Участки комплексного содержания территорий общего пользования жилых кварталов городского округа Тольятти']}
                subMenu={[
                  {
                    title: "Лесные территории",
                    items: ["Лесные территории (кварталы, выделы)", "Посадки лесных культур 2021", "Посадки лесных культур 2020", "Посадки лесных культур 2019", "Посадки лесных культур 2018", "Посадки лесных культур 2017"]
                  }
                ]}
                onItemClick={handleItemClick}
              />

              <ExpandableList
                title="МФЦ"
                items={['МФЦ', 'Офис МФЦ', 'Центр оказания услуг для бизнеса']}
                onItemClick={handleItemClick}
              />
  
              <ExpandableList
                title="Доступность маломобильных групп"
                items={['Дошкольное', 'Школьное', 'Профессиональное', 'Дополнительное', 'Прочие', 'Объекты потребительского рынка', 'Государственное управление',
                'Жилой фонд', 'Социальная защита','Сфера услуг','Кредитно-финансового назначения', 'Культура', 'Физическая культура и спорт', 
              'Здравоохранение (больницы)', 'Здравоохранение (поликлиники)', 'Здравоохранение (прочие)', 'Другое', 'Прочее']}
              onItemClick={handleItemClick}
              />
  
              <ExpandableList
                title="Потребительский рынок"
                items={['Антиалкогольные схемы', 'Рекламные конструкции']}
                onItemClick={handleItemClick}
              />

                <ExpandableList
                title="Маршруты пассажирского транспорта"
                items={['Остановки']}
                subMenu={[
                  {
                    title: "Маршруты троллейбусов",
                    items: uniqueNames,
                  },
                  {
                    title: "Маршруты автобусов",
                    items: uniqueNames_2,
                  }
                ]}
                onItemClick={handleItemClick}
              /> 

              <ExpandableList
                  title="Муниципальные учреждения"
                  items={['Детские сады', 'Школы', 'Культурно-досуговые учреждения', 'Муниципальные бюджетные образовательные учреждения культуры', 'Музеи',
                  'Библиотеки', 'Спорт', 'Прочие учреждения']}
                  onItemClick={handleItemClick}
              />

                <ExpandableList
                title="Спортивные объекты"
                items={['Катки', 'Спорт. площадки']}
              onItemClick={handleItemClick}
              />

              <ExpandableList
                title="Прочие слои"
                items={['Границы районов', 'Границы городского округа', 'Границы садово-огородных массивов', 'Лагеря и турбазы',
              'Границы общественных советов микрорайонов','Избирательные участки','Торговые комплексы', 'Здравоохранение', 'Таксофоны', 'ТОС']}
              onItemClick={handleItemClick}
              />
        </div>
         </div>
          <div className="flex_bootom_panel_saidbar" style={{marginTop: "20px"}}>
              <button type='button' onClick={handleResetCheckboxes}  style={{ width: "160px", alignItems: "center"}}><img src={lastic} style={{ width: "32px", height: "32px"}}/>Очистить всё</button>
          </div>
        </div>
      </div>
    );
  }

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
      'esri/symbols/SimpleLineSymbol',
      "esri/layers/GroupLayer",
    ], {
      url: 'https://js.arcgis.com/4.23/'
    }).then(([Map, MapView, TileLayer, MapImageLayer, FeatureLayer, PopupTemplate, Popup, SimpleRenderer, SimpleLineSymbol, GroupLayer]) => {  
    
    
      // Фунции для popup
      const openMFC = () => {
        window.open("http://mfc63.samregion.ru/place?flag=1&data=%D0%9C%D0%A4%D0%A6%20%D0%B3.%20%D0%A2%D0%BE%D0%BB%D1%8F%D1%82%D1%82%D0%B8", '_blank');
      };


      const openPasp = ({ depid }) => {
      var DEP_ID = `$depid`; 
    var param; 
    if ((DEP_ID != 'Null') && (DEP_ID != '')) { 
        param = 1; 
    } else { 
        param = 2; 
    } 
    const depadres = DEP_ID; 
    const orgid = DEP_ID; 
    var str = "<div id='tab_block'><ul id='tabs'><li id='tab1' class='tab active' onclick='funcTab(1);'>Паспорт организации</li><li id='tab2' class='tab' onclick='funcTab(2);'>Доступность</li><li id='tab3' class='tab' onclick='funcTab(3); '>Изображения</li><li id='tab4' class='tab' onclick='funcTab(4); '>Документы</li></ul><div id='tabs_content'><div class='tab_content active' id='tab_content1'></div><div class='tab_content' id='tab_content2'></div><div class='tab_content' id='tab_content3'></div><div class='tab_content' id='tab_content4'></div></div></div>" 
    $("#tabsContent").html(str); 
    $("#tabsWindow").css("display", "flex"); 
    $("#tabsBlack").css("display", "block"); 
} 
 

      const openAlco = (raion, path) => {
        const url = `http://emgis.ru/antalc/image/${raion}/${path}`;
        window.open(url, '_blank');
      };


      // Сами popup окна
      const popupTemplate = new PopupTemplate({
        title: 'Номер конструкции: {OBJECTID}',
        content: `
          <ul>
            <li><b>Адресс:</b> {NAME}</li>
            <li><b>Тип:</b> {Tip}</li>
            <li><b>Вид:</b> {Vid}</li>
            <li><b>Кадастровый номер:</b> {CADNO}</li>
            <li><b>Вид собственности:</b> {Owner}</li>
          </ul>
        `
      });
      const popupTemplatepointsLayer = new PopupTemplate({
        title: '<b>Дорожное хозяйство</b>',
        content: (event) => {
          var feature = event.graphic;
          var attributes = feature.attributes;
          var tmplt = "";
      
          if (attributes["DESCRIPTIO"] && attributes["DESCRIPTIO"] !== "Null" && attributes["DESCRIPTIO"] != " ") {
            tmplt += `<span style='color:#0075d3;'><b>${attributes["DESCRIPTIO"]}</b></span><hr/>`;
          }
      
          if (attributes["BEGIN_DATE"] && attributes["BEGIN_DATE"] !== "Null" && attributes["BEGIN_DATE"] !== "0:00:00") {
            tmplt += `<div><p><b>Дата начала:</b> ${attributes["BEGIN_DATE"]}</p><br></div>`;
          }
      
          if (attributes["END_DATE"] && attributes["END_DATE"] !== "Null" && attributes["END_DATE"] !== "0:00:00") {
            tmplt += `<div><p><b>Дата окончания:</b> ${attributes["END_DATE"]}</p><br></div>`;
          }
      
          if (attributes["PRICE"] && attributes["PRICE"] !== "Null" && attributes["PRICE"] !== 0) {
            tmplt += `<div><p><b>Стоимость:</b> ${attributes["PRICE"]}</p><br></div>`;
          }
      
          if (attributes["AREA"] && attributes["AREA"] !== "Null" && attributes["AREA"] != " ") {
            tmplt += `<div><p><b>Площадь:</b> ${attributes["AREA"]}</p><br></div>`;
          }
      
          if (attributes["TYPE"] && attributes["TYPE"] !== "Null" && attributes["TYPE"] != " ") {
            tmplt += `<div><p><b>Тип:</b> ${attributes["TYPE"]}</p><br></div>`;
          }
      
          if (attributes["BUIDER"] && attributes["BUIDER"] !== "Null" && attributes["BUIDER"] != " ") {
            tmplt += `<div><p><b>Ремонтная компания:</b> ${attributes["BUIDER"]}</p><br></div>`;
          }
      
          if (attributes["Address"] && attributes["Address"] !== "Null" && attributes["Address"] != " ") {
            tmplt += `<div><p><b>Адрес:</b> ${attributes["Address"]}</p><br></div>`;
          }
      
          if (attributes["YEAROF"] && attributes["YEAROF"] !== "Null" && attributes["YEAROF"] != " ") {
            tmplt += `<div><p><b>Год:</b> ${attributes["YEAROF"]}</p><br></div>`;
          }
      
          if (attributes["PRICE2"] && attributes["PRICE2"] !== "Null" && attributes["PRICE2"] !== 0) {
            tmplt += `<div><p><b>Стоимость:</b> ${attributes["PRICE2"]}</p><br></div>`;
          }

          return tmplt || "Нет данных для отображения.";
        }
      });
      const popupTemplateremont_dorog = new PopupTemplate({
        title: '<b>Дорожное хозяйство</b>',
    outFields: ["*"],
    content: (feature) => {
        let attributes = feature.graphic.attributes;
        let content = "<ul>";

        // Проверка и добавление поля YEAROF
        if (attributes["YEAROF"] != "Null" && attributes["YEAROF"] != "" && attributes["YEAROF"] != "0:00:00" && attributes["YEAROF"] != null) {
            content += `<li><b>Дата:</b> ${attributes["YEAROF"]}</li>`;
        }

        // Проверка и добавление поля trotuar
        if (attributes["trotuar"] != "" && attributes["trotuar"] != "Null") {
            if (attributes["trotuar"] == 1) {
                content += "<li><b>Тротуар</b></li>";
            } else {
                content += "<li><b>Проезд</b></li>";
            }
        }

        content += "</ul>";
        return content;
    }
      });



      const customContentForest = new PopupTemplate({
        title: '<b>Лесничество</b>',
        content: (feature) => {
            let attributes = feature.graphic.attributes;
            let content = '<ul>';
    
            if (attributes["year"] && attributes["year"] !== "Null") {
                content += `<li><b>Год:</b> ${attributes["year"]}</li>`;
            }
            if (attributes["Shape_STAr"] && attributes["Shape_STAr"] !== "Null") {
                content += `<li><b>Площадь:</b> ${attributes["Shape_STAr"] + " м кв.</p><br></div>"}</li>`;
            }
            // if (attributes["podpis"] && attributes["podpis"] !== "Null") {
            //     content += `<li><b>Номер квартала:</b> ${attributes["podpis"] + "</p><br></div>"}</li>`;
            // }
            if (attributes["podpis"].length<4) {
              content += "<div> <p><b>Номер квартала:</b> " + attributes["podpis"] + "</p><br></div>";
            }
            content += '</ul>';
            return content;
        }
      });

      const customComplecsSoderj = new PopupTemplate({
        title: 'Комплексное содержание',
        content: (feature) => {
            let attributes = feature.graphic.attributes;
            let content = '<ul>';
    
            if (attributes["TYPE2"] && attributes["TYPE2"] !== "Null") {
                content += `<li><b>Тип:</b> ${attributes["TYPE2"]+ " </p><br></div>"}</li>`;
            }
            if (attributes["Namber"] && attributes["Namber"] !== "Null" && attributes["Namber"] !== " ") {
                content += `<li><b>Номер:</b> ${attributes["Namber"] + " м кв.</p><br></div>"}</li>`;
            }
            if (attributes["Raion"] && attributes["Raion"] !== "Null") {
                content += `<li><b>Район:</b> ${attributes["Raion"]  + "</p><br></div>"}</li>`;
            }

            if (attributes["Kvartal"] && attributes["Kvartal"] !== "Null") {
              content += `<li><b>Квартал:</b> ${attributes["Kvartal"] + "</p><br></div>"}</li>`;
            }
            if (attributes["Primechan"] && attributes["Primechan"] !== "Null" && attributes["Primechan"] !== " ") {
                content += `<li><b>Номер:</b> ${attributes["Primechan"] + "</p><br></div>"}</li>`;
            }
            if (attributes["S"] && attributes["S"] !== "Null") {
                content += `<li><b>Площадь:</b> ${attributes["S"] + " м<sup><small>2</small></p><br></div>"}</li>`;
            }
            content += '</ul>';
            return content;
        }
      });

      const popupTemplateMFC = new PopupTemplate({
      title: 'МФЦ',
      content: `
        <ul>
          <li><span style='color:#0075d3;'><b>{name_1}</b></span><hr/></li>
          <li><b>Адрес:</b>{adr}</li>
        </ul>
      `,
      actions: [
        {
          title: 'Перейти на сайт',
          id: 'openMFC',
        },
      ],
      });
      const popupTemplatePasport = new PopupTemplate({
        title: 'Паспортизация',
        outFields: ["*"],
        content: `
        <ul>
          <li><span style='color:#0075d3;'><b>{OTRASL_NAM}</b></span><hr/>
          <li><div><b>{NAME}</b><br></div></li>
          <li><div style='display:none'> <p><b>id:</b>{DEP_ID}</p><br></div></li>
        </ul>
        `,
        actions: [
          {
            title: 'Открыть карточку',
            id: 'openPasp',
          },
        ],
      });
      const customContentAlco = new PopupTemplate({
        title: 'Антиалкогольные схемы',
        outFields: ["*"],
        content: `
          <ul>
            <li><span style='color:#203480;'><p>Источник данных: Архитектура города Тольятти</p></span></li>
            <li><p>Файл: {Path}</p></li>
          </ul>
        `,
        actions: [
          {
            title: 'Открыть файл',
            id: 'openAlco',
          },
        ],
      });
      const customContentReklama = new PopupTemplate({
        title: 'Рекламная конструкция',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "<span style='color:#0075d3;'><b>Рекламная конструкция</b></span><hr/>";
      
                if (attributes["Address"] && attributes["Address"] !== "Null") {
                    content += `<li><b>Адрес:</b> ${attributes["Address"]}</li>`;
                }
                if (attributes["Vid2"] && attributes["Vid2"] !== "Null") {
                    content += `<li></div><b>Вид:</b> ${attributes["Vid2"] + "</div>"}</li>`;
                }
                if (attributes["Tip"] && attributes["Tip"] !== "Null") {
                  content += `<li></div><b>Тип:</b> ${attributes["Tip"] + "</div>"}</li>`;
                }
                if (attributes["Owner"] && attributes["Owner"] !== "Null") {
                  content += `<li></div><b>Владелец:</b> ${attributes["Owner"] + "</div>"}</li>`;
                }

                if (attributes["Size_"] && attributes["Size_"] !== "Null") {
                  content += `<li></div><b>Размер:</b> ${attributes["Size_"] + "</div>"}</li>`;
                }
                if (attributes["N_map"] && attributes["N_map"] !== "Null") {
                  content += `<li></div><b>Номер конструкции (Тольятти) :</b> ${attributes["N_map"] + "</div>"}</li>`;
                }
                if (attributes["N_post"] && attributes["N_post"] !== "Null") {
                  content += `<li></div><b>Номер конструкции (Самара):</b> ${attributes["N_post"] + "</div>"}</li>`;
                }
                content += '</ul>';
                return content;
            }
      });
      const customContentSchools  = new PopupTemplate({
        title: 'Сады и школы',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "<ul>";
      
                if (attributes["NAME"] && attributes["NAME"] !== "Null" && attributes["NAME"] !== " ") {
                    content += `<li><b>Наименование:</b> ${attributes["NAME"]}</li>`;
                }
                if (attributes["STREET"] && attributes["STREET"] !== "Null"  && attributes["STREET"] != ' ') {
                    content += "<li></div><b>Адрес:</b>" + attributes["STREET"] + "," + attributes["NO_HOME"] + "</div>";
                }
                if (attributes["MESTO"] && attributes["MESTO"] !== "Null"  && attributes["MESTO"] != ' ') {
                  content += `<li></div><b>Расположение:</b> ${attributes["MESTO"]} + "</div>""`;
                }
                if (attributes["ISPOLNEN"] && attributes["ISPOLNEN"] !== "Null" && attributes["ISPOLNEN"] !== " ") {
                  content += `<li><hr /><div><b>${attributes["ISPOLNEN"]}</b></div></li>`;
                }
                content += '</ul>';
                return content;
              }
      })
      const customContentMunicipal = new PopupTemplate({
        title: 'Муниципальные учреждения',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "<ul>";
      
                if (attributes["name"] && attributes["name"] !== "Null" && attributes["name"] !== " ") {
                    content += `<li><b>Наименование:</b> ${attributes["name"]}</li>`;
                }
                if (attributes["Address"] && attributes["Address"] !== "Null"  && attributes["Address"] != ' ') {
                  content += `<li></div><b>Адрес:</b> ${attributes["Address"] + "</div>"}"`;
                }
                if (attributes["adres"] && attributes["adres"] !== "Null"  && attributes["adres"] != ' ') {
                  content += `<li></div><b>Адрес:</b> ${attributes["adres"] + "</div>"}"`;
                }
                content += '</ul>';
                return content;
              }
      })
      const customContentSportsGrounds = new PopupTemplate({
        title: 'Спортивная площадка',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "";
                content += '</ul>';
                return content;
              }
      })
      const customContentRinks = new PopupTemplate({
        title: 'Каток',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "";
                return content;
              }
      })
      const customContentSadOgorod = new PopupTemplate({
        title: 'Садово-огородные массивы',
        outFields: ["*"],
            content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "<div><b>Наименование: </b>" + attributes["NAME_FULL"] + "</div>";

                if (attributes["PREDPRIYTI "] != "" && attributes["PREDPRIYTI "] != null && attributes["PREDPRIYTI "] != ' ') {
                  content += "<div><b>Предприятие:</b> " + attributes["PREDPRIYTI"] + "</div>";
                }
                if (attributes["GOD"] != "") {
                  content += "<div><b>Год:</b> " + attributes["GOD"] + "</div>";
                }
                return content;
              }
      })
      const customContentCamps = new PopupTemplate({
        title: 'Лагеря и турбазы',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "<div><b>Наименование:</b> " + attributes["NAME"] + "</div>";
                return content;
              }
      })
      const customContentOSM = new PopupTemplate({
        title: 'ОСМ',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "<div><b>Номер:</b> " + attributes["mikror"] + "</div>";
                return content;
              }
      })
      const customContentVoting = new PopupTemplate({
        title: 'Избирательные участки',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                // var feature = event.graphic;
                var content = "";
                var uch = attributes["N_2013"];
                var uikadress=""

                $.ajax({
                  type: "POST",
                  url: 'server/SelectAdressUIKNew.ashx',
                  dataType: "text",
                  async: false,
                  data: { uch: uch },
                  success: function (data) {
                      uikadress = data;
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                      alert(xhr.status);
                      alert(thrownError);
                  }
              });


                content += "<div><p><b>Избирательный участок  " + uch + "</b></p></div>";
                content += "<div><p><b>Центр УИК находится в:</b> " + uikadress + "</p></div>";
                return content;
              }
      });
      const customContentHealthcare = new PopupTemplate({
        title: 'Здравоохранение',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "";
                content  += "<div><b>Название:</b> " + attributes["Ingeo_Styl"] + "</div>";
                if (attributes["Адресн_опи"] != "" && attributes["Адресн_опи"] != undefined && attributes["Адресн_опи"] != null) {
                  content += "<div><b>Адрес:</b> " + attributes["Адресн_опи"] + "</div>";
                }
                if (attributes["Собств_наз"] != "" && attributes["Собств_наз"] != undefined && attributes["Собств_наз"] != null) {
                  content += "<div><b>Владелец:</b> " + attributes["Собств_наз"] + "</div>";
                }
                return content;
              }
      })
      const customContentPayphones = new PopupTemplate({
        title: 'Таксофоны',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "";

                if (attributes["adr"] != "" && attributes["adr"] != undefined && attributes["adr"] != null) {
                  content += "<div><b>Адрес:</b> " + attributes["adr"] + "</div>";
                }
                if (attributes["Ab_namber"] != "" && attributes["Ab_namber"] != undefined && attributes["Ab_namber"] != null) {
                  content += "<div><b>Номер телефона:</b> " + attributes["Ab_namber"] + "</div>";
                }
                return content;
              }
      })
      const customContentTOS = new PopupTemplate({
        title: 'ТОС',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "";

              if (attributes["Name"] != "" && attributes["Name"] != undefined && attributes["Name"] != null) {
                content += "<div><b>Название:</b> " + attributes["Name"] + "</div>";
              }
              if (attributes["Office"] != "" && attributes["Office"] != undefined && attributes["Office"] != null) {
                content += "<div><b>Адрес:</b> " + attributes["Office"] + "</div>";
              }
              if (attributes["the_chairm"] != "" && attributes["the_chairm"] != undefined && attributes["the_chairm"] != null) {
                content += "<div><b>Руководитель:</b> " + attributes["the_chairm"] + "</div>";
              }
              if (attributes["timetable"] != "" && attributes["timetable"] != undefined && attributes["timetable"] != null) {
                content += "<div><b>Время работы:</b> " + attributes["timetable"] + "</div>";
              }
                return content;
              }
      })
      const customContentShopping = new PopupTemplate({
        title: 'Торговые комплексы',
        outFields: ["*"],
              content: (feature) => {
                let attributes = feature.graphic.attributes;
                let content = "";
                content += "<div><b>Название:</b> " + attributes["TK_Name"] + "</div>";
                if (attributes["TK_Adr"] != "" && attributes["TK_Adr"] != undefined && attributes["TK_Adr"] != null) {
                  content += "<div><b>Адрес:</b> " + attributes["TK_Adr"] + "</div>";
                }


                return content;
              }
      })
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
          style: "short-dot",
          color: "#00e6a9",
          width: 2
        })
      });
      const render_2 = new SimpleRenderer({
        symbol: new SimpleLineSymbol({
          style: "short-dot",
          color: "#005ce6",
          width: 1
        })
      });
  
      const render_3 = new SimpleRenderer({
        symbol: new SimpleLineSymbol({
          style: "solid",
          color: "#38a800",
          width: 2
        })
      });

      // Ремонт дорог
      if (!pointsLayer) {
        const pointsLayer = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/1",
          title: "Ремонт дорог 2023",
          visible: false,
          outFields: ['*'],
          popupTemplate: popupTemplatepointsLayer,
          renderer: renderer
        });
  
        map.add(pointsLayer);
        setPointsLayer(pointsLayer);
      }
  
       if (!pointsLayer_2) {
         const pointsLayer_2 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/0",
           title: "Ремонт дорог 2022",
           visible: false,
           outFields: ['*'],
           popupTemplate: popupTemplatepointsLayer,
           render_2
         });
  
         map.add(pointsLayer_2);
         setPointsLayer_2(pointsLayer_2);
       }

       if (!pointsLayer_3) {
         const pointsLayer_3 = new FeatureLayer({
           url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/4",
           title: "Ремонт дорог 2021",
           visible: false,
           popupTemplate: popupTemplatepointsLayer,
           outFields: ['*'],
          render_2
         });
  
         map.add(pointsLayer_3);
         setPointsLayer_3(pointsLayer_3);
       }

       if (!pointsLayer_4) {
         const pointsLayer_4 = new FeatureLayer({
           url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/3",
           title: "Ремонт дорог 2020",
           visible: false,
           outFields: ['*'],
           popupTemplate: popupTemplatepointsLayer,
           render_2
         });
  
           map.add(pointsLayer_4);
         setPointsLayer_4(pointsLayer_4);
       }


      if (!pointsLayer_5) {
         const pointsLayer_5 = new FeatureLayer({
           url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/2",
           title: "Ремонт дорог 2019",
          visible: false,
           outFields: ['*'],
           popupTemplate: popupTemplatepointsLayer,
           render_2
        });
  
         map.add(pointsLayer_5);
         setPointsLayer_5(pointsLayer_5);
       }

      //  Ремонт междворовых территорий

      if (!remont_dorog_1) {
        const remont_dorog_1 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/14",
          title: "Ремонт внутриквартальных территорий 2023",
        visible: false,
        outFields: ['*'],
        popupTemplate: popupTemplateremont_dorog,
        render_2
       });
 
        map.add(remont_dorog_1);
        setRemont_dorog_1(remont_dorog_1);
      }

      if (!remont_dorog_2) {
        const remont_dorog_2 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/12",
          title: "Ремонт внутриквартальных территорий 2021",
        visible: false,
        outFields: ['*'],
        popupTemplate: popupTemplateremont_dorog,
        render_2
       });
 
        map.add(remont_dorog_2);
        setRemont_dorog_2(remont_dorog_2);
      }

      if (!remont_dorog_3) {
        const remont_dorog_3 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/10",
          title: "Ремонт внутриквартальных территорий 2020",
        visible: false,
        outFields: ['*'],
        popupTemplate: popupTemplateremont_dorog,
        render_2
       });
        map.add(remont_dorog_3);
        setRemont_dorog_3(remont_dorog_3);
      }

      if (!remont_dorog_4) {
        const remont_dorog_4 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/8",
          title: "Ремонт внутриквартальных территорий 2019",
        visible: false,
        outFields: ['*'],
        popupTemplate: popupTemplateremont_dorog,
        render_2
       });
 
        map.add(remont_dorog_4);
        setRemont_dorog_4(remont_dorog_4);
      }

      if (!remont_dorog_5) {
        const remont_dorog_5 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/6",
          title: "Ремонт внутриквартальных территорий 2018",
        visible: false,
        outFields: ['*'], 
        popupTemplate: popupTemplateremont_dorog,
        render_2
       });
        map.add(remont_dorog_5);
        setRemont_dorog_5(remont_dorog_5);
      }

      // Устройство светофорных объектов
      if(!sfetafor){
        const sfetafor = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/0",
          title: "Устройство светофорных объектов 2019 год",
          visible: false,
          outFields: ['*'],
          render_2
       });
        map.add(sfetafor);
        setSfetafor(sfetafor);
      }
  
      // Устройство дорожных знаков
      if(!construction_of_road_signs){
        const construction_of_road_signs = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/9",
          title: "Дорожные знаки",
          visible: false,
          outFields: ['*'],
          render_2
       });
        map.add(construction_of_road_signs);
        setСonstruction_of_road_signs(construction_of_road_signs);
      }

      // Участки дорог с искусственным нарушением покрытия
      if(!constru_road_signs){
        const constru_road_signs = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/7",
          title: "Искусственное нарушение покрытия",
          visible: false,
          outFields: ['*'],
          render_2
       });
        map.add(constru_road_signs);
        setСonstru_road_signs(constru_road_signs);
      }


      // Устройство съездов для инвалидов и других маломобильных групп населения
      if(!artificial_pavement){
        const artificial_pavement = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/3",
          title: "Устройство съездов для инвалидов",
          visible: false,
          outFields: ['*'],
          render_2
       });
        map.add(artificial_pavement);
        setArtificial_pavement(artificial_pavement);
      }

      // Устройство шумовых полос
      if(!device_noise){
        const device_noise = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/5",
          title: "Устройство шумовых полос",
          visible: false,
          outFields: ['*'],
          render_2
       });
        map.add(device_noise);
        setDevice_noise(device_noise);
      }

      // Городское хозяйство

      if(!urban_economy){
        const urban_economy = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/178",
          title: "Участки комплексного содержания территорий общего пользования жилых кварталов городского округа Тольятти 2023 года",
          visible: false,
          outFields: ['*'],
          popupTemplate: customComplecsSoderj,
          render_2
       });
        map.add(urban_economy);
        setUrban_economy(urban_economy);
      }

      // Лесные территории
      if(!forest_territories){
        const forest_territories = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/17",
          title: "Лесные территории (кварталы, выделы)",
          visible: false,
          outFields: ['*'],
          popupTemplate: customContentForest,
          render_2
       });
        map.add(forest_territories);
        setForest_territories(forest_territories);
      }


      if(!forest_territories_1){
        const forest_territories_1 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/20",
          title: "Посадки лесных культур 2021",
          visible: false,
          outFields: ['*'],
          popupTemplate: customContentForest,
          render_2
       });
        map.add(forest_territories_1);
        setForest_territories_1(forest_territories_1);
      }

      if(!forest_territories_2){
        const forest_territories_2 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/23",
          title: "Посадки лесных культур 2020",
          visible: false,
          outFields: ['*'],
          popupTemplate: customContentForest,
          render_2
       });
        map.add(forest_territories_2);
        setForest_territories_2(forest_territories_2);
      }

      if(!forest_territories_3){
        const forest_territories_3 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/26",
          title: "Посадки лесных культур 2019",
          visible: false,
          outFields: ['*'],
          popupTemplate: customContentForest,
          render_2
       });
        map.add(forest_territories_3);
        setForest_territories_3(forest_territories_3);
      }

      if(!forest_territories_4){
        const forest_territories_4 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/29",
        title: "Посадки лесных культур 2018",
          visible: false,
          outFields: ['*'],
          popupTemplate: customContentForest,
          render_2
       });
        map.add(forest_territories_4);
        setForest_territories_4(forest_territories_4);
      }

      if(!forest_territories_5){
        const forest_territories_5 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/32",
          title: "Посадки лесных культур 2017",
          visible: false,
          outFields: ['*'],
          popupTemplate: customContentForest,
          render_2
       });
        map.add(forest_territories_5);
        setForest_territories_5(forest_territories_5);
      }

      // МФЦ

      if(!mfc_1){
        const mfc_1 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/5",
          title: "МФЦ",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: popupTemplateMFC

       });
        map.add(mfc_1);
        setMfc_1(mfc_1);
      }
      view1.popup.on('trigger-action', (event) => {
        if (event.action.id === 'openMFC') {
          openMFC();
        }
      });

      // Доступность маломобильных групп

      if(!accessibility_low_mobility_groups){
        const accessibility_low_mobility_groups = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/3",
          title: "Доступность маломобильных групп",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: popupTemplatePasport
       });
        map.add(accessibility_low_mobility_groups);
        setAccessibility_low_mobility_groups(accessibility_low_mobility_groups);
      }
      view1.popup.on('trigger-action', (event) => {
        if (event.action.id === 'openPasp') {
          const attributes = view1.popup.selectedFeature.attributes;
          const depid = attributes.DEP_ID;
          openPasp(depid);
        }
      });

      // Потребительский рынок

      if(!reclamas){
        const reclamas = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/NTO/NTO_260124/MapServer/4",
          title: "Рекламные конструкции",
          popupTemplate: customContentReklama,
          visible: false,

          // outFields: ['*'],
          render_2,
          // popupTemplate: customContentAlco 
       });
        map.add(reclamas);
        setReclamas(reclamas);
      }


      if (!contLyrAlcGroup) {
        const contLyrAlcGroup = new GroupLayer({
          title: "Антиалкогольные схемы",
          visible: false,
        });
  
        const contLyrAlc0 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/NTO/NTO_260124/MapServer/0",
          title: "Антиалкогольные схемы",
          render_2,
        });
  
        const contLyrAlc1 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/NTO/NTO_260124/MapServer/6",
          title: "Антиалкогольные схемы",
          render_2,
        });
  
        const contLyrAlc2 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/NTO/NTO_260124/MapServer/7",
          title: "Антиалкогольные схемы",
          render_2,
        });
  
        const contLyrAlc3 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/NTO/NTO_260124/MapServer/8",
          title: "Антиалкогольные схемы",
          popupTemplate: customContentAlco,
          render_2,
        });
  
        contLyrAlcGroup.addMany([contLyrAlc0, contLyrAlc1, contLyrAlc2, contLyrAlc3]);
  
        map.add(contLyrAlcGroup);
        setContLyrAlcGroup(contLyrAlcGroup);
      }

      view1.popup.on('trigger-action', (event) => {
        if (event.action.id === 'openAlco') {
          const attributes = view1.popup.selectedFeature.attributes;
          const raion = attributes.Raion;
          const path = attributes.Path;
          openAlco(raion, path);
        }
      });
      // Маршруты пассажирского транспорта

      if(!ostanovka){
        const ostanovka = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/1",
          title: "Остановки",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: popupTemplate
       });
        map.add(ostanovka);
        setOstanovka(ostanovka);
      }

      // if(!trolleybus_routes){
      //   const trolleybus_routes = new FeatureLayer({
      //     url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/4",
      //     title: "Маршруты троллейбусов",
      //     visible: true,
      //     // outFields: ['*'],
      //     render_2,
      //     popupTemplate: popupTemplate
      //  });
      //   map.add(trolleybus_routes);
      //   setTrolleybus_routes(trolleybus_routes);
      // }
      if (!newTrolleybusRoutes) {
        const newTrolleybusRoutes = new FeatureLayer({
            url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/4",
            title: "Маршруты троллейбусов",
            visible: false,
            renderer: render_3,
            popupTemplate: popupTemplate
        });
    
        map.add(newTrolleybusRoutes);
        setTrolleybusRoutes(newTrolleybusRoutes);
    
        // Получаем уникальные имена для чекбоксов
        fetchUniqueNames(newTrolleybusRoutes).then(names => {
            setUniqueNames(names);
        });
      }
      if (!bus_routes) {
        const new_bus_routes = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/8",
          title: "Маршруты автобусов",
          visible: false,
          // renderer: render_2,
          popupTemplate: popupTemplate
        });
        map.add(new_bus_routes);
        setBus_routes(new_bus_routes);
      
        fetchUniqueNames(new_bus_routes).then(names => {
        setUniqueNames_2(names);
        });
      }
      // Муниципальные учреждения
      if(!municipal){
        const municipal = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/4",
          title: "Муниципальные",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentMunicipal
       });
        map.add(municipal);
        setMunicipal(municipal);
      }

      if(!municipal_1){
        const municipal_1 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/9",
          title: "Школы",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentSchools 
       });
        map.add(municipal_1);
        setMunicipal_1(municipal_1);
      }

      if(!municipal_2){
        const municipal_2 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/11",
          title: "Дет. сады",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentSchools 
       });
        map.add(municipal_2);
        setMunicipal_2(municipal_2);
      }

      if(!municipal_3){
        const municipal_3 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/0",
          title: "Спорт",
          visible: false,
          // outFields: ['*'],
          render_2,
       });
        map.add(municipal_3);
        setMunicipal_3(municipal_3);
      }
      // Спортивные объекты
      if(!sport_object){
        const sport_object = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Sports/MapServer/0",
          title: "Спорт. площадки",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentSportsGrounds
       });
        map.add(sport_object);
        setSport_object(sport_object);
      }
      if(!sport_object_kat){
        const sport_object_kat = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Sports/MapServer/1",
          title: "Катки",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentRinks
       });
        map.add(sport_object_kat);
        setSport_object_kat(sport_object_kat);
      }
      // Прочие слои
      if(!posh_slois){
        const posh_slois = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/DGH_2024_2/MapServer/156",
          title: "Границы районов",
          visible: false,
          // outFields: ['*'],
          render_2,
       });
        map.add(posh_slois);
        setPosh_slois(posh_slois);
      }
      if(!posh_slois_1){
        const posh_slois_1 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/ZemUch/ZU_T2/MapServer/5",
          title: "Границы городского округа",
          visible: false,
          // outFields: ['*'],
          render_2,
       });
        map.add(posh_slois_1);
        setPosh_slois_1(posh_slois_1);
      }
      if(!posh_slois_2){
        const posh_slois_2 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/10",
          title: "Границы садово-огородных массивов",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentSadOgorod
       });
        map.add(posh_slois_2);
        setPosh_slois_2(posh_slois_2);
      }
      if(!posh_slois_3){
        const posh_slois_3 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/DDH/DDH/MapServer/11",
          title: "Лагеря и турбазы",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentCamps
       });
        map.add(posh_slois_3);
        setPosh_slois_3(posh_slois_3);
      }
      if(!posh_slois_4){
        const posh_slois_4 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/10",
          title: "Границы ОСМ",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentOSM
       });
        map.add(posh_slois_4);
        setPosh_slois_4(posh_slois_4);
      }
      if(!posh_slois_5){
        const posh_slois_5 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/7",
          title: "Избир. участки",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentVoting
       });
        map.add(posh_slois_5);
        setPosh_slois_5(posh_slois_5);
      }
      if(!posh_slois_6){
        const posh_slois_6 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/6",
          title: "Здравоохранение",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentHealthcare
       });
        map.add(posh_slois_6);
        setPosh_slois_6(posh_slois_6);
      }
      if(!posh_slois_7){
        const posh_slois_7 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/2",
          title: "Таксофоны",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentPayphones
       });
        map.add(posh_slois_7);
        setPosh_slois_7(posh_slois_7);
      }
      if(!posh_slois_8){
        const posh_slois_8 = new FeatureLayer({
          url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/8",
          title: "ТОС",
          visible: false,
          // outFields: ['*'],
          render_2,
          popupTemplate: customContentTOS
       });
        map.add(posh_slois_8);
        setPosh_slois_8(posh_slois_8);
      }
      if (!torgComplecs) {
          const torgComplecs = new FeatureLayer({
            url: "http://tech109.mfc63.ru/arcgis/rest/services/Portal/Portal_map/MapServer/1",
            title: "Торг. центры",
            visible: false,
            // outFields: ['*'],
            render_2,
            popupTemplate: customContentShopping
          });
        // Добавление группы на карту
        map.add(torgComplecs);
        setTorgComplecsp(torgComplecs);
      }
      // Adressads
      if (!contLyrAddr) {
          const contLyrAddr = new FeatureLayer({
            url: "http://tech109.mfc63.ru/arcgis/rest/services/DGH/AddressPoints/MapServer/0",
            title: "Адресные точки",
            visible: false,
            // outFields: ['*'],
            render_2,
          });
          // Добавление группы на карту
          map.add(contLyrAddr);
          setContLyrAddr(contLyrAddr);
        }
        const popup = new Popup({
          view: view1,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false
          }
        });
    
        view1.on('click', function(event) {
          popup.open({
            features: [event.graphic],
            location: event.mapPoint
          });
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
      <div id="map" style={{ height: '100vh', width: '100vw', position: "absolute" }}></div>
      <Saidbar
          pointsLayer={pointsLayer}
          pointsLayer_2={pointsLayer_2}
          searchObjectId={searchObjectId}
          setSearchObjectId={setSearchObjectId}
        />
    </div>
  );
};

function ExpandableList({ title, items, subMenu, onItemClick }) {
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
            <CheckboxItem 
              key={index} 
              title={item} 
              id={`${title}-${index}`} 
              onToggle={(isChecked) => onItemClick(item, isChecked, title)} // Передаем title субменю вниз
            />
          ))}
          {subMenu && subMenu.map((subMenuItem, index) => (
            <ExpandableList 
              key={index} 
              title={subMenuItem.title} 
              items={subMenuItem.items} 
              onItemClick={onItemClick} 
              subMenu={subMenuItem.subMenu} // Передаем subMenu рекурсивно
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CheckboxItem({ title, id, onToggle }) {
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
    onToggle(newChecked); // Call the onToggle function with the new checked state
  };

  return (
    <div className="checkbox-item" onClick={handleToggle}>
      <input type="checkbox" checked={checked} readOnly />
      <label><div className='checkbox_text'>{title}</div></label>
    </div>
  );
}

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Изначально sidebar закрыт


  useEffect(() => {
    const headerElement = document.querySelector('.header');
    if (!headerElement) return;

    const handleMouseEnter = () => {
      headerElement.style.height = 'auto';
      headerElement.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      headerElement.style.height = '3px';
      // headerElement.style.opacity = '0.6';
    };

    const timer = setTimeout(() => {
      headerElement.style.height = '3px';
      // headerElement.style.opacity = '0.6';
    }, 3000);

    headerElement.addEventListener('mouseenter', handleMouseEnter);
    headerElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      headerElement.removeEventListener('mouseenter', handleMouseEnter);
      headerElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);


  return (
    <div className={`home_styles ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="header">
        <div className="logo">
          <div>
          <Link to="/" style={{cursor: "pointer"}}><img src={logo} alt="EMGIS Logo" /></Link>
          <Link to="/" style={{cursor: "pointer"}}><span className='logo_text'>ЕМГИС</span></Link>
          </div>
          <Link to="/" style={{cursor: "pointer"}}><p>Муниципальные отраслевые слои<br/>геоинформационной системы городского округа Тольятти</p></Link>
        </div>
        {/* <Menus/> */}
      </div>
      <MapComponent/>
      {/* <div className='main_contaoner_map'>
      </div> */}
    </div>
  );
}

export default Home;