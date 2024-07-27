import React, { useState, useRef, useEffect } from 'react';
import '../Pages/css/Saidbar.css';
import { Link } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
// import MapComponent from './MapComponent';
import 'react-datepicker/dist/react-datepicker.css';
import co_2 from '../Pages/img/icon_eco_atlas/air_pollution_pmad0emvwiuf.svg';
import water from '../Pages/img/icon_eco_atlas/water_drop_q5tesl01uvqi.svg';
import sound from '../Pages/img/icon_eco_atlas/frequency_odxh8z11ma6h.svg';
import radon from '../Pages/img/icon_eco_atlas/radon_kpdpmsc06kid.svg';
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
// import RightSidebar from './RightSidebar';
import lastic from '../Pages/img/icons8-ластик-32 (1).png';
import nasad from '../Pages/img/icons8-стрелка-назад-24.png';
import { loadModules } from 'esri-loader';


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
    <MapWithModal /> 
  </div>;
  
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
  function ButtonItem({ title, onClick }) {
    return (
      <button className="button-item" onClick={onClick}>
        {title}
      </button>
    );
  }
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
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };
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
  return (
    <div>
    <div className='home_styles'>
    <div className='municipal_road_saidbar'>
{isModalOpen && (
  <div className="modal-overlay" onClick={toggleModal} style={{position: "fixed", inset: "0px", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "10000"}}>
    <div className="modal" ref={modalRef} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgb(255, 255, 255)", padding: "20px", borderRadius: "8px", boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px", maxWidth: "80%", overflowY: "auto", height: "750px"}}>
      <div className="modal-content" style={{height: "700px"}}>
      <div className='text_maodal' style={{textAlign: "center", fontSize: "25px", color: "#002fa8"}}>{modalTitle}</div>
      <br/>
        <div className='text_maodal' style={{fontSize: "20px", color: "#002fa8", textIndent: "80px"}}>{modalContent}</div>
      </div>
    </div>
  </div>
)}

<div className='eco_saidbar'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{padding: "0px 20px 20px 0"}}>
        <div className='menu_tops'>
           <button className="toggle-btn" onClick={toggleSidebar} style={{ margin: "0px", transform: "translate(270px, 10px)"}}>
            {isOpen ? '⮌' : '⮎'}
          </button> 
        </div>
        <div className="content_saidbar_main" style={{transform: "translate(4px, -30px)"}}>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Загрязнение воздуха', 'Атмосферный воздух является жизненно важным компонентом окружающей среды, неотъемлемой частью среды обитания человека.Загрязнение атмосферы может быть естественным (природным) и антропогенным (техногенным).К природным источникам загрязнения относятся: пыльные бури, лесные и степные пожары, пыль космического происхождения, продукты растительного, животного и микробиологического происхождения.Антропогенные источники загрязнения обусловлены хозяйственной деятельностью человека: такими источниками загрязнения городской атмосферы являются любые объекты производственной и бытовой деятельности людей, приносящие загрязнения в атмосферный воздух города. Основными источниками загрязнения атмосферы городского округа Тольятти являются: предприятия автомобилестроения, нефтехимии, оргсинтеза, производства химических удобрений и стройматериалов, машиностроения и металлообработки, теплоэнергетического комплекса, автомобильный, железнодорожный и речной транспорт.Наблюдения за состоянием городской атмосферы осуществляются Тольяттинской СГМО ФГБУ «Приволжское УГМС» на 8-ми стационарных постах ПНЗ, расположенных в селитебной зоне, в соответствии с ГОСТ 17.2.3.01-86 ”Охрана природы. Атмосфера. Правила контроля качества воздуха населенных пунктов” и РД 52.04.186-89 “Руководство по контролю загрязнения атмосферы”.На ПНЗ осуществляются наблюдения за содержанием в воздухе основных (пыль, диоксид азота, оксид азота, оксид углерода, диоксид серы) примесей и специфических (аммиак, формальдегид, фтористый водород, суммарные углеводороды, бензол, толуол, этилбензол и ксилол), характерных как для промышленных, так и для автомобильных выбросов.Уровень загрязнения воздушного бассейна, также, зависит от погодных условий. Неблагоприятные метеорологические условия (НМУ) представляют собой краткосрочное особое сочетание метеорологических факторов, способствующих накоплению вредных примесей в приземном слое атмосферы, в связи с чем, возможно ухудшение качества воздуха в районах города.С улучшением условий рассеивания вредных примесей уровень загрязнения атмосферы быстро снижается и экологическая ситуация нормализуется.Предупреждение населения о прогнозируемых периодах НМУ (при поступлении данных от Тольяттинской СГМО) осуществляется в разделе «Новости департаментов» или на страничке «Департамент городского хозяйства/Экология/Экологическая обстановка» официального портала администрации городского округа Тольятти.')}>
          <img alt='fsdfsfddf' src={co_2} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk1" name="chk" value="vebinary"/>
          <label for="chk1">Загрязнение воздуха</label>
          </div>
          </div>


          <div className='chackbox'>
          <div className='icons'  onClick={() => openModal('Загрязнение воды')}>
          <img alt='fsdfsfddf' src={water} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk2" name="chk"value="treningy"/>
          <label for="chk2">Загрязнение воды</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Инфразвук', 'Инфразвуковое поле вызывается источниками звуковых колебаний в неслышимом диапазоне (от 1 до 20 Гц). Характерное свойство инфразвуковых колебаний – их распространение на значительные расстояния с незначительным затуханием.Наиболее интенсивные источники инфразвука (дБ): механизмы, транспорт, медленно работающие машины, производственое и технологическое оборудование, системы вентиляции и кондиционирования воздуха. А также: потоки поездов на железной дороге, трансформаторные подстанции, низкооборотные компрессорные установки, спортивные и игровые площадки.Предельно допустимые уровни инфразвука на территории жилой застройки (согласно СН) –    90 дБ Лин (по шкале шумомера «линейная»).')}>
          <img alt='fsdfsfddf' src={sound} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk3" name="chk" value="shop"/>
          <label for="chk3">Инфразвук</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Уровень шума', 'Шум – это беспорядочные звуковые колебания разной физической природы, характеризующиеся случайным изменением амплитуды и частоты. Единица измерения уровня шума - децибел акустический, дБА. Источники шума в окружающей человека среде могут быть разбиты на две большие группы: внешние и внутренние.В жилых помещениях источниками значительного шума являются звуковоспроизводящая аппаратура и бытовая техника, количество которых резко возрастает с каждым годом, лифты, насосы, вентиляторы и другое механическое оборудование зданий.Наиболее распространенным источником городского внешнего шума является транспорт - автотранспорт, троллейбусы и трамваи, внешние шумы железнодорожного транспорта, шум от промпредприятий, трансформаторных подстанций, шум от производства различных видов строительных работ.В жилой зоне, кроме улично-транспортного шума, возникает свой собственный, так называемый внутриквартальный шум. Основными источниками этого шума являются игры детей на детских площадках, игры детей и подростков на спортивных площадках, бытовые процедуры: выбивание мягкой мебели, ковров, одежды, мойка автомобилей и т.п. Большой шум связан с автотранспортом, доставляющим товары и продукты в магазины, он возникает у мест разгрузки. Внутри дворов неприятный импульсный шум связан с включением защитной сигнализации личного легкового транспорта.Требования к нормированию шума в жилой зоне устанавливают санитарные нормы и правила (норма в дневное время – 60 дБА).')}>
          <img alt='fsdfsfddf' src={noise} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk4" name="chk" value="shop_1"/>
          <label for="chk4">Уровень шума</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Пробы почвы', 'Текст: Обследование загрязнения почв городского округа Тольятти.Оценка уровня загрязнения почвы выражается через концентрацию примеси путём сравнения её с гигиеническими нормативами. Критериями оценки опасности загрязнения почвы различными веществами служат предельно допустимые концентрации (ПДК) и ориентировочно допустимые концентрации (ОДК). Загрязнение почв - это вид антропогенной деградации почв, при которой содержание химических веществ в почвах, подверженных антропогенному воздействию, превышает природный региональный фоновый уровень их содержания в почвах. В исследуемых почвах определялось содержание токсикантов промышленного происхождения: тяжёлых металлов (меди, свинца, кадмия,цинка, никеля, марганца, алюминия),нефтепродуктов, нитратов, а также концентрации сульфат-иона (в пересчёте на серу), фтора, фенола, полихлорбифенилов (ПХБ) и уровень рН.Тяжёлые металлы-металлы с удельным весом свыше 4,5 г/куб. см. К ним относятся более 40 химических элементом. Существуют металлы жизненно необходимые для живых организмов (цинк, железо, марганец, медь) и токсичные(кадмий, ртуть, свинец, мышьяк, никель, хром). Источники поступления тяжёлых металлов в почву могут быть естественными (горные породы, термальные воды, рассолы, космическая и метеоритная пыль, вулканические газы) и техногенными (автотранспорт, промышленные предприятия по выплавке и переработке цветных металлов, теплоэлектростанции, полигоны промышленных отходов и др.), также они могут попадать в почву в составе ядохимикатов, биоцидов, стимуляторов роста растений, структурообразователей.Нефть и нефтепродукты.Нефть – жидкое горючее полезное ископаемое, смесь более чем 450 различных веществ, преимущественно углеводородов с различными молекулярными массами, причем твердые и газообразные из них растворены в жидких, и все они практически нерастворимы в воде.Нефтепродукты – это товарная сырая нефть, прошедшая первичную подготовку на промысле, и продукты ее переработки. Ни один другой загрязнитель не может сравниться с нефтяными углеводородами по широте распростране­ния, количеству источников загрязнения. Углеводороды рассеиваются в окружающей природной среде повсеместно. Они могут транспортироваться с воздушными и водными потоками.Негативное влияние на окружающую среду возможно на всех этапах производства, транспортировки и переработки сырья. Главные потенциальные источники загрязнения почв нефтью и нефтепродуктами – это нефтепромыслы, нефтепроводы, нефтеперерабатывающие предприятия, нефтехранилища, транспорт, перевозящий нефтепродукты. Особенно значительны по масштабам отрицательного воздействия на природу аварийные ситуации, нередкие в различных звеньях технологической цепи рассматриваеых видов производства.Нитраты – легкорастворимые соли, повышающие плодородие почвы. Источники их поступления в почву также могут быть природными и антропогенными. Основной источник в ненарушенных агроландшафтах – органическое вещество почвы, минерализация которой обеспечивает постоянное образование нитратов. Скорость минерализации органического вещества зависит от его состава, совокупности экологи­ческих факторов, степени и характера землепользова­ния. Антропогенные источники делятся на аграрные (минеральные и органические удобрения, животноводческое производство), индустриальные (промышленные отходы, сточные воды), коммунально-бытовые.')}>
          <img alt='fsdfsfddf' src={soil} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk5" name="chk" value="shop_3"/>
          <label for="chk5">Пробы почвы</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Электромагн излучение', 'В Тольятти находится ряд интенсивных источников электромагнитных полей (ампер на метр А/м, вольт на метр В/м).  Так, Волжская ГЭС имеет разветвленную сеть линий электропередач высокого напряжения, уходящих в жилую зону города. Кроме того, работа крупных промышленных предприятий связана с потреблением большого количества электроэнергии. Можно отметить и такие источники, как телепередающие антенны, антенны радиостанций, узлы сотовой телефонной связи, троллейбусный транспорт, персональные компьютеры с электронно-лучевыми трубками, домашние электросети, бытовые электроприборы и др.Уровень излучения электромагнитных полей не является стабильным во времени и зависит, в первую очередь, от нагрузки электроэнергетических сетей, что обуславливает сезонные и даже суточные колебания.Норма напряженности переменного электрического поля промышленной частоты для жилой зоны – 1 кВ/м.Норма напряженности переменного магнитного поля промышленной частоты для жилой зоны – 1 А/м.')}>
          <img alt='fsdfsfddf' src={elktromagnetic} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk6" name="chk" value="shop_4"/>
          <label for="chk6">Электромагн излучение</label>
          </div>
          </div>
      
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Радон. излучение', 'Радон - бесцветный инертный газ; радиоактивен. При комнатной температуре является одним из самых тяжелых газов.Концентрация радона в воздухе зависит, в первую очередь, от геологической обстановки (лежащие под верхним слоем земли пласты глин богаты радоном), а также от погоды (во время дождя микротрещины, по которым радон поступает из почвы, заполняются водой; снежный покров также препятствует доступу радона в воздух).Основные составляющие радиационного фона помещений в значительной степени зависят от деятельности человека. Это вызвано, прежде всего, такими факторами, как выбор строительных материалов, конструктивных решений зданий и применяемых в них систем вентиляции. Измерения не всегда подтверждают сложившийся вывод о том, что в подвальных помещениях и на нижних этажах зданий радон скапливается в больших концентрациях, чем на верхних.Среднегодовая эквивалентная равновесная объемная активность радона для помещений вводимых в эксплуатацию зданий и сооружений не должна превышать 100 Бк/м3, для эксплуатирующихся -200 Бк/м3.')}>
          <img alt='fsdfsfddf' src={radon} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk7" name="chk" value="shop_4"/>
          <label for="chk7">Радон. излучение</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('ПХБ', 'Полихлорированные бифенилы (ПХБ) – класс синтетических хлорированных ароматических углеводородов, относятся  к группе стойких   органических  загрязнителей  (СОЗ),  мониторинг  которых  является   обязательным  в  развитых  индустриальных  странах  вследствие  их   высокой опасности для окружающей среды и здоровья населения. ПХБ мало растворимы в воде,  при этом растворимость в воде уменьшается с   увеличением   степени хлорирования. Летучесть ПХБ также уменьшается с увеличением степени хлорирования. Способность к разложению в  значительной  степени   зависит от структурной характеристики расположения атомов хлора на бифенильных кольцах молекулы ПХБ.Загрязнение почв ПХБ формируется вследствие поступления загрязнителя с атмосферными выпадениями, сточными водами, отходами и др.')}>
          <img alt='fsdfsfddf' src={maleks} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk8" name="chk" value="shop_4"/>
          <label for="chk8">ПХБ</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Приём ртутосод. отходов', 'С более подробной информацией можно ознакомиться на странице "Ртутьсодержащие отходы" http://www.tgl.ru/structure/department/othod_rtut подраздела "Отходы" департамента городского хозяйства http://www.tgl.ru/structure/department/othody/К ртутьсодержащим отходам относятся: потерявшие потребительские свойства термометры,тонометры с ртутным заполнением, люминесцентные (энергосберегающие лампы)Ртуть – чрезвычайно опасное химическое вещество первого класса опасности. Испаряясь и поступая в воздух уже при обычных температурах, ртуть частично сменяет агрегатное состояние и переходит в бесцветный не обладающий запахом пар. Главную роль в загрязнении помещений ртутью играет неосторожное обращение с ртутьсодержащими приборами и изделиями (термометрами, энергосберегающими лампами). Большинство этих приборов абсолютно безопасно пока не нарушена их герметичность. При нарушении герметичности ртуть начинает испаряться, заполняя помещение высокотоксичным паром, который не имеет ни цвета, ни запаха и может быть обнаружен только с помощью специальных приборов.')}>
          <img alt='fsdfsfddf' src={rtution} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk9" name="chk" value="shop_4"/>
          <label for="chk9">Приём ртутосод. отходов</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Объекты негативного воздействия')}>
          <img alt='fsdfsfddf' src={rtution} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk11" name="chk" value="shop_4"/>
          <label for="chk11">Объекты негативного воздействия</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Контейнеры для бутылок',)}>
          <img alt='fsdfsfddf' src={plastisk} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk12" name="chk" value="shop_4"/>
          <label for="chk12">Контейнеры для бутылок</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Приём использованных батареек')}>
          <img alt='fsdfsfddf' src={batarey} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk13" name="chk" value="shop_4"/>
          <label for="chk13">Приём использованных батареек</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons' onClick={() => openModal('Объекты негативного воздействия')}>
          <img alt='fsdfsfddf' src={plamy} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk14" name="chk" value="shop_4"/>
          <label for="chk14">Объекты негативного воздействия</label>
          </div>
          </div>
          <div className='chackbox'>
          <div className='icons'  onClick={() => openModal('Передвижная экологическая лаборатория')}>
          <img alt='fsdfsfddf' src={labor} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk15" name="chk" value="shop_4"/>
          <label for="chk15">Передвижная экологическая лаборатория</label>
          </div>
          </div>

          <div className='chackbox'>
          <div className='icons'  onClick={() => openModal('Площадки для размещения контейнеров ТКО')}>
          <img alt='fsdfsfddf' src={container} style={{width: "40px", cursor: "pointer"}}/>
          </div>
          <div className="checkbox-items">
          <input type="checkbox" id="chk16" name="chk" value="shop_4"/>
          <label for="chk16">Площадки для размещения контейнеров ТКО</label>
          </div>
          </div>
          </div>
          <div className="flex_bootom_panel_saidbar">
                <button type='button' onClick={handleResetCheckboxes}  style={{ width: "160px", alignItems: "center"}}><img src={lastic} style={{ width: "32px", height: "32px"}}/>Очистить всё</button>
            </div>
        </div>
      </div>
    </div>
    </div>
    </div>
      );
}
function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleMapClick = () => {
    setIsModalOpen(false); // Закрываем модальное окно при клике на карту
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className='resident'>
    <div className="main_styles">
    <div className='eco_card'>
    <div className='resident_styles'>
    <div className='flex_saidbar_right'>
     <div className="header">
        <div className="logo">
          <div>
            <img src={logo} alt="EMGIS Logo" />
            <Link to="/"><span className='logo_text'>ЕМГИС</span></Link>
          </div>
          <p>Экологический атлас<br/> городского округа Тольятти</p>
        </div>
      </div>
         <MapComponent onClick={handleMapClick} />
        </div>
       <MapWithModal/> 
        </div>
    </div>
    </div>
    {/* <RightSidebar style={{ top: "440px" }}/> */}
    </div>
  );
}
export default Home;