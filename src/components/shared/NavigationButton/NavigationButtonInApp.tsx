'use client'

import React from 'react';

interface NavigationButtonInAppProps {
  scrollTo: string; // ID de la sección a la que se moverá la vista
  buttonText: string; // Texto del botón
}

const NavigationButtonInApp: React.FC<NavigationButtonInAppProps> = ({ scrollTo, buttonText }) => {
  const handleClick = () => {
    const element = document.getElementById(scrollTo);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Obtener la posición del elemento
      const offsetPosition = elementPosition - 60; // Restar 60 píxeles para contemplar el navbar
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-black py-2 px-4 font-semibold cursor-pointer rounded"
    >
      {buttonText}
    </button>
  );
};

export default NavigationButtonInApp; 