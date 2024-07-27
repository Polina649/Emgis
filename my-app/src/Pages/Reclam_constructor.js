import React, { useState, useRef, useEffect } from 'react';
import '../Pages/css/Saidbar.css';
import { Link } from 'react-router-dom';
import logo from '../Pages/img/logo.png';
import slaider from '../Pages/img/icons8-слои-32.png';
import icons_filter from '../Pages/img/filters.png';
import download from '../Pages/img/icons8-скачать-48.png';
import lastic from '../Pages/img/icons8-ластик-32 (1).png';
import nasad from '../Pages/img/icons8-стрелка-назад-24.png';
import { loadModules } from 'esri-loader';
import { useYMaps } from '@pbe/react-yandex-maps';
import ReactTooltip from 'react-tooltip';

const RightSidebar = ({ totalPoints }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    const input = event.target.value.trim().toLowerCase();
    setSearchInput(input);
  };

  return (
    <div className='home_styles'>
      <div className={`sidebar_2 ${isOpen ? 'open' : ''}`} style={{ marginLeft: "calc(100% - 352px)", borderRadius: "14px 0 0 14px", height: "15%", marginTop: "22%", width: "310px", border: "1px solid #002fa8", position: "absolute" }}>
        <div style={{ display: "flex" }}>
          {/* <button className="toggle-btn" onClick={toggleSidebar} style={{ padding: "0", margin: "0", transform: "translate(-50px, -14px)" }}>
            {isOpen ? '⮎' : '⮌'}
          </button> */}
          <div className="content_saidbar_main">
            <div className='text_div' style={{ color: "#002fa8", textAlign: "center", fontSize: "24px" }}>Количество объектов: <br/> <br/> {totalPoints}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckboxItem_2 = ({ text, isChecked, onChange, className }) => {

  const handleCheckboxChange = () => {
    onChange(text);
  };

  const handleLabelClick = (event) => {
    event.preventDefault();
    handleCheckboxChange();
  };

  return (
    <div className="checkbox-item" style={{ justifyContent: "center", width: "100%", display: "flex", cursor: "pointer", color: "#002fa8", alignItems: "center" }}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <label className={`check_box_should_2 ${className}`} onClick={handleLabelClick}>
        <div className='text_checkbox' style={{ width: "160px" }}>{text}</div>
      </label>
    </div>
  );
};

const CheckboxItem = ({ text, isChecked, onChange, tooltipText }) => {
  const handleCheckboxChange = () => {
    onChange(!isChecked);
  };

  return (
    <div className="checkbox-item" style={{ justifyContent: "center", width: "100%", display: "flex", cursor: "pointer", color: "#002fa8", alignItems: "center" }}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <label className="check_box_should" onClick={handleCheckboxChange} title={tooltipText}>
        <div className='text_checkbox' style={{ maxWidth: "150px" }} title={tooltipText}>{text}</div>
      </label>
    </div>
  );
};

const LeafletMap = ({ showPointsLayer, setShowPointsLayer }) => {
  const [searchObjectId, setSearchObjectId] = useState('');
  const [pointsLayer, setPointsLayer] = useState(null);
  const [pointsLayer_2, setPointsLayer_2] = useState(null);
  const [pointsLayer_3, setPointsLayer_3] = useState(null);
  const mapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const addressListRef = useRef(null);
  const [isIllegalChecked, setIsIllegalChecked] = useState(false);
  const [searchConstructionInput, setSearchConstructionInput] = useState('');
  const [searchOwnershipInput, setSearchOwnershipInput] = useState('');
  const [selectedOwnershipTypes, setSelectedOwnershipTypes] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false); // Новое состояние
  const inputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchObjectId(value);

    if (!value) {
      if (mapRef.current) {
        mapRef.current.graphics.removeAll();
        pointsLayer_3.visible = false;
      }
    }
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (mapRef.current) {
        mapRef.current.graphics.removeAll();
        pointsLayer_3.visible = false;
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
    let isAddressSearch = isNaN(searchObjectId);

    if (isAddressSearch) {
      pointsLayer_3.visible = false;
      pointsLayer.visible = true;
      query = pointsLayer_3.createQuery();
      query.where = `Address LIKE '%${searchObjectId}%'`;
    } else {
      pointsLayer_3.visible = false;
      query = pointsLayer.createQuery();
      query.where = `ObjectID = ${searchObjectId}`;
    }

    const result = await (isAddressSearch ? pointsLayer_3 : pointsLayer).queryFeatures(query);
    if (result.features.length > 0) {
      const features = result.features;
      const feature = features[0];
      mapRef.current.graphics.removeAll();
      const { geometry } = feature;

      mapRef.current.goTo({
        target: geometry,
        zoom: 16
      });

      const symbol = isAddressSearch
        ? {
            type: 'simple-marker',
            style: 'diamond',
            color: 'white',
            size: '20px',
            outline: {
              color: 'red',
              width: 2
            },
            width: '10px',
            height: '20px'
          }
        : {
            type: 'simple-marker',
            style: 'circle',
            color: 'white',
            size: '15px',
            outline: {
              color: 'red',
              width: 2
            }
          };

      const graphic = new Graphic({
        geometry,
        symbol
      });

      mapRef.current.graphics.add(graphic);

      if (!isAddressSearch) {
        mapRef.current.popup.open({
          features: [feature],
          location: geometry
        });
        setPopupOpen(true);

        mapRef.current.popup.on("close", () => {
          mapRef.current.graphics.removeAll();
        });
      }
    } else {
      alert("Объект не найден");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchObjectId]);

  const Saidbar = ({ pointsLayer, pointsLayer_2, setSearchObjectId }) => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
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
    const [content, setContent] = useState('filter');
    const [buttonText, setButtonText] = useState('Фильтрация');
    const [showAllConstructionCheckboxes, setShowAllConstructionCheckboxes] = useState(false);
    const [showAllOwnershipCheckboxes, setShowAllOwnershipCheckboxes] = useState(false);
    const [searchConstructionInput, setSearchConstructionInput] = useState('');
    const [searchOwnershipInput, setSearchOwnershipInput] = useState('');
    const [searchAddressInput, setSearchAddressInput] = useState('');
    const [showConstructionCheckboxes, setShowConstructionCheckboxes] = useState(false);
    const [showOwnershipCheckboxes, setShowOwnershipCheckboxes] = useState(false);
    const [ownerCheckboxItems, setOwnerCheckboxItems] = useState([]);
    const addressListRef = useRef(null);
    const [searchOwnerInput, setSearchOwnerInput] = useState('');
    const [uniqueVids, setUniqueVids] = useState([]);
    const [showAllOwnerCheckboxes, setShowAllOwnerCheckboxes] = useState(false);
    // const [isApprovedChecked, setIsApprovedChecked] = useState(true);
    const [isIllegalChecked, setIsIllegalChecked] = useState(false);
    const [isApprovedChecked, setIsApprovedChecked] = useState(true);

    const [isOpen, setIsOpen] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const [totalPoints, setTotalPoints] = useState(0);
    const [selectedOwnershipType, setSelectedOwnershipType] = useState([]);
    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const ownershipCheckboxItems = [
      "Государственная", "Муниципальная", "Частная", "Самарская область", "Министерство транспорта и автомобильных дорог Самарской области",
    ];
    const ownershipTypes = [
      { label: 'Государственная', value: 'Государственная' },
      { label: 'Муниципальная', value: 'Муниципальная' },
      { label: 'Частная', value: 'Частная' },
      { label: 'Самарская область', value: 'Самарская область' },
      { label: 'Министерство транспорта и автомобильных дорог Самарской области', value: 'Министерство транспорта и автомобильных дорог Самарской области' },
    ];
    const [selectedOwnershipTypes, setSelectedOwnershipTypes] = useState([]);

    
  
    useEffect(() => {
      if (!pointsLayer) return;
      let definitionExpression = "1=1"; 
    
      if (selectedOwnershipTypes.length > 0) {
        const expressions = selectedOwnershipTypes.map(type => {
          switch (type) {
            case 'Государственная':
              return "Owner LIKE '%Государственный%' OR Owner LIKE '%Сведения%'";
            case 'Муниципальная':
              return "Owner LIKE '%Муниципальное%'";
            case 'Самарская область':
              return "Owner LIKE '%Самарская%'";
            case 'Министерство транспорта и автомобильных дорог Самарской области':
              return "Owner LIKE '%Министерство%'";
            case 'Частная':
              return "NOT (Owner LIKE '%Самарская%' OR Owner LIKE '%Министерство%' OR Owner LIKE '%Государственный%' OR Owner LIKE '%Сведения%' OR Owner LIKE '%Муниципальное%')";
            default:
              return "";
          }
        });
  
        definitionExpression = expressions.join(" OR ");
  
      }

      pointsLayer.definitionExpression = definitionExpression;
    
      pointsLayer.queryFeatureCount().then((count) => {
        setTotalPoints(count);
      });
    }, [pointsLayer, selectedOwnershipTypes]);
  
  
  
    const handleOwnershipTypeChange = (type) => {
      setSelectedOwnershipTypes((prevSelectedOwnershipTypes) => {
        if (prevSelectedOwnershipTypes.includes(type)) {
          return prevSelectedOwnershipTypes.filter((selectedType) => selectedType !== type);
        } else {
          return [...prevSelectedOwnershipTypes, type];
        }
      });
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

    
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    useEffect(() => {
      const fetchUniqueVids = async () => {
        if (!pointsLayer) {
          return;
        }
  
        const query = pointsLayer.createQuery();
        query.returnDistinctValues = true;
        query.outFields = ['VID'];
        try {
          const { features } = await pointsLayer.queryFeatures(query);
          const uniqueVIDs = [...new Set(features.map(feature => feature.attributes.VID))];
          setUniqueVids(uniqueVIDs);
        } catch (error) {
          console.error('Error fetching unique VID values:', error);
        }
      };
  
      fetchUniqueVids();
    }, [pointsLayer]);
  
    useEffect(() => {
      updateTotalPoints();
    }, [selectedCheckboxes]);
  
    const handleTabClick = (tabContent, tabText) => {
      setContent(tabContent);
      setButtonText(tabText);
      setIsApprovedChecked(true);
    };
  
      const updateTotalPoints = async () => {
      if (!pointsLayer) {
        return;
      }
  
      const query = pointsLayer.createQuery();
      query.where = Object.keys(selectedCheckboxes).length
        ? Object.keys(selectedCheckboxes)
          .filter(key => selectedCheckboxes[key])
          .map(key => `VID = '${key}'`)
          .join(' OR ')
        : '1=1';
  
      try {
        const result = await pointsLayer.queryFeatureCount(query);
        setTotalPoints(result);
      } catch (error) {
        console.error('Error updating total points:', error);
      }
    };
  
    const toggleShowAllCheckboxes = (e, type) => {
      e.preventDefault();
      if (type === 'Vid') {
        setShowAllConstructionCheckboxes(!showAllConstructionCheckboxes);
      } else if (type === 'Ownership') {
        setShowAllOwnershipCheckboxes(!showAllOwnershipCheckboxes);
      }
    };
    
  
    const handleCheckboxChange = (text) => {
      setSelectedCheckboxes(prevSelectedCheckboxes => {
        const updatedSelectedCheckboxes = { ...prevSelectedCheckboxes };
        if (updatedSelectedCheckboxes[text]) {
          delete updatedSelectedCheckboxes[text];
        } else {
          updatedSelectedCheckboxes[text] = true;
        }
        return updatedSelectedCheckboxes;
      });
    };
    
    const handlePropertyTypeClick = () => {
      setShowConstructionCheckboxes(!showConstructionCheckboxes);
    };
  
    const handleOwnershipTypeClick = () => {
      setShowOwnershipCheckboxes(!showOwnershipCheckboxes);
    };
  
    const handleSearchConstructionInputChange = (e) => {
      setSearchConstructionInput(e.target.value);
    };
  
    const handleSearchOwnershipInputChange = (e) => {
      setSearchOwnershipInput(e.target.value);
    };
  
    const toggleContent = () => {
      setContent(content === 'filter' ? 'layers' : 'filter');
      setIsApprovedChecked(true);
      setIsIllegalChecked(false)
    };
  
    const handleResetCheckboxes = () => {
      setSelectedCheckboxes({});
    };
  
    const filteredVIDs = uniqueVids.filter(vid =>
      vid.toLowerCase().includes(searchConstructionInput.toLowerCase())
    );
  
    const ownershipItemList = ownershipCheckboxItems.map((item, index) => (
      <CheckboxItem
        key={index}
        text={item}
        isChecked={selectedOwnershipType.includes(item)}
        onChange={() =>
          setSelectedOwnershipType(prevState =>
            prevState.includes(item)
              ? prevState.filter(type => type !== item)
              : [...prevState, item]
          )
        }
      />
      
    ));

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (addressListRef.current && !addressListRef.current.contains(event.target)) {
          setShowAddressList(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
  
  
    useEffect(() => {
      const fetchUniqueVids = async () => {
        if (!pointsLayer) {
          return;
        }
  
        const query = pointsLayer.createQuery();
        query.returnDistinctValues = true;
        query.outFields = ['VID'];
        try {
          const { features } = await pointsLayer.queryFeatures(query);
          const uniqueVIDs = [...new Set(features.map(feature => feature.attributes.VID))];
          setUniqueVids(uniqueVIDs);
        } catch (error) {
          console.error('Error fetching unique VID values:', error);
        }
      };
  
      fetchUniqueVids();
    }, [pointsLayer]);

    useEffect(() => {
      const totalSelectedPoints = Object.keys(selectedCheckboxes).reduce((count, address) => {
        return selectedCheckboxes[address] ? count + 1 : count;
      }, 0);
      setTotalPoints(totalSelectedPoints);
    }, [selectedCheckboxes]);
  
  
    const toggleCheckbox = (type, checkboxIndex, isChecked) => {
      const newCheckboxes = {
        ...selectedCheckboxes[type],
        [checkboxIndex]: !isChecked,
      };
      setSelectedCheckboxes({
        ...selectedCheckboxes,
        [type]: newCheckboxes,
      });
    };
  
    useEffect(() => {
      const totalSelectedPoints = Object.keys(selectedCheckboxes).reduce((count, address) => {
        return selectedCheckboxes[address] ? count + 1 : count;
      }, 0);
      setTotalPoints(totalSelectedPoints);
    }, [selectedCheckboxes]);
  
    // useEffect(() => {
    //   const isVisible = isApprovedChecked || isIllegalChecked;
    //   if (pointsLayer) pointsLayer.visible = isVisible && isApprovedChecked;
    //   if (pointsLayer_2) pointsLayer_2.visible = isVisible && isIllegalChecked;
    // }, [isApprovedChecked, isIllegalChecked, pointsLayer, pointsLayer_2]);

    useEffect(() => {
      if (pointsLayer) {
        pointsLayer.definitionExpression = Object.keys(selectedCheckboxes).length
          ? `Vid IN (${Object.keys(selectedCheckboxes).filter(key => selectedCheckboxes[key]).map(key => `'${key}'`).join(", ")})`
          : "1=1";
      }
    }, [selectedCheckboxes, pointsLayer]);
  
    useEffect(() => {
      // Fetch unique Vid values from pointsLayer
      if (pointsLayer) {
        pointsLayer.queryFeatures({
          where: "1=1",
          outFields: ["Vid"],
          returnDistinctValues: true,
          returnGeometry: false
        }).then((result) => {
          const vids = result.features.map(feature => feature.attributes.Vid);
          const uniqueVids = [...new Set(vids)];
          setUniqueVids(uniqueVids);
        }).catch((error) => {
          console.error('Error fetching unique Vid values:', error);
        });
      }
    }, [pointsLayer]);
  
    const toggleShowAllConstructionCheckboxes = (event) => {
      event.preventDefault();
      setShowAllConstructionCheckboxes(!showAllConstructionCheckboxes);
    };
  
    const toggleShowAllOwnershipCheckboxes = (event) => {
      event.preventDefault();
      setShowAllOwnershipCheckboxes(!showAllOwnershipCheckboxes);
    };
  
    const handleSearchAddressInputChange = (event) => {
      setSearchAddressInput(event.target.value);
      setShowAddressList(true);
    };
    const handleOwnershipCheckboxChange = (type) => {
      setSelectedOwnershipTypes((prevSelectedOwnershipTypes) => {
        if (prevSelectedOwnershipTypes.includes(type)) {
          return prevSelectedOwnershipTypes.filter((selectedType) => selectedType !== type);
        } else {
          return [...prevSelectedOwnershipTypes, type];
        }
      });
    };

    const filteredConstructionItems = uniqueVids.filter(item => item.toLowerCase().includes(searchConstructionInput.toLowerCase()));
    const filteredOwnershipItems = ownershipCheckboxItems.filter(item => item.toLowerCase().includes(searchOwnershipInput.toLowerCase()));
    const filteredOwnerItems = ownerCheckboxItems.filter(item =>
      item.toLowerCase().includes(searchOwnerInput.toLowerCase())
    );

    const constructionItemList = filteredConstructionItems.length === 0
    ? <div style={{ margin: "0px 0px 0px 30px", color: '#002fa8' }}>Ничего не нашлось</div>
    : filteredConstructionItems.slice(0, showAllConstructionCheckboxes ? filteredConstructionItems.length : 4).map((item, index) => (
      <CheckboxItem_2
        key={index}
        text={item}
        isChecked={!!selectedCheckboxes[item]}
        onChange={handleCheckboxChange}
        className={index < 4 ? 'initial-visible' : 'additional-hidden'}
      />
    ));
  
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (addressListRef.current && !addressListRef.current.contains(event.target)) {
          setShowAddressList(false);
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
  
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [addressListRef]);
  
    useEffect(() => {
      const handleCheckboxChange = (type, index, isChecked) => {
        toggleCheckbox(type, index, isChecked);
      };
  
      setOwnerCheckboxItems(ownershipCheckboxItems);
    }, []);
  
    const handlePropertyTypeChange = (type) => {
      setSelectedPropertyTypeItem(type);
    };
  
    const handleSearchAddressChange = (event) => {
      const input = event.target.value.trim().toLowerCase();
      setSearchAddressInput(input);
     
      if (input.length >= 1) {
        setShowAddressList(true);
      } else {
        setFilteredAddresses([]);
        setShowAddressList(false);
      }
    };


    useEffect(() => {
      if (pointsLayer) {
        pointsLayer.definitionExpression = Object.keys(selectedCheckboxes).length
          ? `Vid IN (${Object.keys(selectedCheckboxes).filter(key => selectedCheckboxes[key]).map(key => `'${key}'`).join(", ")})`
          : "1=1";
      }
    }, [selectedCheckboxes, pointsLayer]);
  
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

    

    const handleAddressSelect = (address) => {
      setSelectedAddress(address);
      setSearchInput(address);
      setFilteredAddresses([]);
    };

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [searchObjectId]);
  
    return (
      <div className='home_styles'>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div className='menu_tops'>
              <div className="container_searsh">
              <input
              placeholder='Поиск номер/адрес'
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
            {content === 'filter' ? (
                  <div>
                        <div className='flex_list'>
                            {filteredAddresses.length > 0 && (
                              <ul style={{ marginBottom: "30px", opacity: "0.5" }}>
                                {filteredAddresses.map((address, index) => (
                                  <li key={index} onClick={() => setSearchInput(address)}>{address}</li>
                                ))}
                              </ul>
                            )}
                            <CheckboxItem
                              text="Законные"
                              isChecked={isApprovedChecked}
                              onChange={setIsApprovedChecked}
                              tooltipText="Включенные в Схему рекламных конструкций"
                            />
                            <br />
                            <br />
                            <CheckboxItem
                              text="Незаконные"
                              isChecked={isIllegalChecked}
                              onChange={setIsIllegalChecked}
                              tooltipText="Выявленные специалистами управления потребительского рынка"
                            />
                      </div>
                  </div>
                ) : (
                  <div>
                <div
                style={{ color: "#002fa8", marginLeft: "33px", fontWeight: "700" , cursor: "pointer" }}
                onClick={handlePropertyTypeClick}
              >
                <span style={{ marginRight: '5px' }}>
                  {showConstructionCheckboxes ? '▲' : '▼'}
                </span>
                Тип конструкции
              </div>
              {showConstructionCheckboxes && (
                <>
                  <br />
                  {showAllConstructionCheckboxes && (
                    <input
                      type="text"
                      placeholder="Найти..."
                      value={searchConstructionInput}
                      onChange={handleSearchConstructionInputChange}
                      className="search-input"
                      style={{ width: "125px", height: "30px", margin: "0px 0px 0px 30px", fontSize: "14px", padding: "0px", paddingLeft: "10px" }}
                    />
                  )}
                  <div className="checkbox-list" style={{ marginTop: "20px" }}>
                    {constructionItemList}
                  </div>
                  <br />
                  <br />
                  {filteredConstructionItems.length > 4 && (
                    <a href="#" onClick={(e) => toggleShowAllCheckboxes(e, 'Vid')} style={{ color: "rgb(127 151 211)", marginLeft: "33px", cursor: "pointer" }}>
                      {showAllConstructionCheckboxes ? 'Свернуть ▲' : 'Показать все ▼'}
                      <span style={{ marginLeft: "5px" }}>{showAllConstructionCheckboxes ? '' : ''}</span>
                    </a>
                  )}
                </>
              )}

<br/>
              <div
                style={{ color: "#002fa8", marginLeft: "33px", fontWeight: "700", marginTop: "20px", cursor: "pointer" }}
                onClick={handleOwnershipTypeClick}
              >
                  <span style={{ marginRight: '5px' }}>
                    {showOwnershipCheckboxes ? '▲' : '▼'}
                  </span>
                    Вид собственности
                </div>
                {showOwnershipCheckboxes && (
                  <>
                    <br />
                    {showAllOwnershipCheckboxes && (
                      <input
                        type="text"
                        placeholder="Найти..."
                        value={searchOwnershipInput}
                        onChange={handleSearchOwnershipInputChange}
                        className="search-input"
                        style={{ width: "125px", height: "30px", margin: "0px 0px 0px 30px", fontSize: "14px", padding: "0px", paddingLeft: "10px" }}
                      />
                    )}
                    <div className="checkbox-list" style={{ marginTop: "20px" }}>
                {ownershipTypes.map((item, index) => (
                  <CheckboxItem_2
                    key={index}
                    text={item.label}
                    isChecked={selectedOwnershipTypes.includes(item.value)}
                    onChange={() => handleOwnershipTypeChange(item.value)}
                  />
                ))}
              </div>
                  </>
                )}
              </div>
              )}
          </div>
          <br/>
          <br/>
              <div className="flex_bootom_panel_saidbar">
                <ButtonItem title={buttonText} onClick={toggleContent} style={{ width: "90px", alignItems: "center"}}/>
                <button title="Очистить" type='button' onClick={handleResetCheckboxes}  style={{ width: "90px", alignItems: "center"}}><img src={lastic}  style={{ width: "32px", height: "32px"}}/></button>
              </div>
        </div>
        <RightSidebar totalPoints={totalPoints} />
      </div>
    );
  };

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
      'esri/symbols/SimpleMarkerSymbol'
    ], {
      url: 'https://js.arcgis.com/4.23/'
    }).then(([Map, MapView, TileLayer, MapImageLayer, FeatureLayer, PopupTemplate, Popup, SimpleRenderer, SimpleMarkerSymbol]) => {

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

      if (!pointsLayer) {
        const pointsLayer = new FeatureLayer({
          url: 'http://tech109.mfc63.ru/arcgis/rest/services/Portal/Reklama_clusters_2/MapServer/0',
          title: 'Реклама',
          visible: true,
          outFields: ['*'],
          popupTemplate: popupTemplate
        });

        map.add(pointsLayer);
        setPointsLayer(pointsLayer);
      }

      const renderer = new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          style: "diamond",  // Форма маркера (может быть "circle", "square" и т.д.)
          color: "#fff",     // Цвет маркера
          size: "15px",
          outline: {
            color: '#4ce600',
            width: 2
          },
        })
      });

      if (!pointsLayer_3) {
        const pointsLayer_3 = new FeatureLayer({
          url: 'http://tech109.mfc63.ru/arcgis/rest/services/DGH/AddressPoints/MapServer/0',
          title: 'Реклама',
          visible: false,
          outFields: ['*'],
          renderer: renderer
        });

        map.add(pointsLayer_3);
        setPointsLayer_3(pointsLayer_3);
      }

          // Второй слой с незаконными

      if (!pointsLayer_2) {
         const pointsLayer_2 = new FeatureLayer({
            url: 'http://tech109.mfc63.ru/arcgis/rest/services/NTO/ReklamaTest/MapServer/0',
            title: 'Реклама',
            visible: false,
            outFields: ['*'],
            popupTemplate: popupTemplate
          });

          map.add(pointsLayer_2);
         setPointsLayer_2(pointsLayer_2);
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
        if (event.graphic && event.graphic.layer === pointsLayer) {
          popup.open({
            features: [event.graphic],
            location: event.mapPoint
          });
        }
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
};

function Home() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const hideHeader = () => {
    setIsHeaderVisible(false);
  };

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


  const [showPointsLayer, setShowPointsLayer] = useState(false);
  return (
    <div className='resident'>
      <div className="main_styles">
        <div className='resident_styles'> 
        <div className="header">
      <div className="logo">
        <div>
          <Link to="/">
            <img src={logo} alt="EMGIS Logo" />
          </Link>
          <Link to="/">
            <span className="logo_text">ЕМГИС</span>
          </Link>
        </div>
        <a href="http://emgis.ru/gis_portal/СХЕМА_НТО_2024 июнь.xlsx" download="СХЕМА_НТО_2024 июнь.xlsx">
          <p style={{ display: "flex", alignItems: "center" }}>
            Рекламные конструкции .xlsx
            <img src={download} alt="Icon 2" style={{ width: "30px", height: "30px", cursor: "pointer" }} />
          </p>
        </a>
      </div>
    </div>
             
              <LeafletMap showPointsLayer={showPointsLayer} setShowPointsLayer={setShowPointsLayer} />
            </div>
          <div>
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