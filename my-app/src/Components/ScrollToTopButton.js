import React, { useState, useRef, useEffect } from 'react';
import '../Pages/css/ScrollToTopButton.css'; // Подключаем файл со стилями

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Показываем или скрываем кнопку при прокрутке окна и при изменении размеров окна
  const toggleVisibility = () => {
    if (window.pageYOffset > 300 && window.innerWidth >= 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Привязываем обработчик прокрутки и изменения размеров окна к событиям
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  // Прокручиваем страницу наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <>
      {isVisible && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <span>&#129153;</span>
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;