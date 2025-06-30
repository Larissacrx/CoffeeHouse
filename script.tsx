import React, { useState, useEffect } from 'react';
import './style.css';


interface AppConfigProps {
  initialNavState?: boolean;
}

const AppConfig: React.FC<AppConfigProps> = ({ initialNavState = false }) => {
  
  const [isNavVisible, setIsNavVisible] = useState<boolean>(initialNavState);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);


  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Toggle navigation with safety check
  const navToggle = (): void => {
    if (isMounted) {
      setIsNavVisible(prev => !prev);
    }
  };

  // Show success message with timeout
  const showFormSuccess = (): void => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Accessibility improvements
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Escape') {
      setIsNavVisible(false);
    }
  };

  return (
    <div className="app-container" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Mobile Navigation */}
      <nav 
        id="mobNav" 
        className={`mobile-nav ${isNavVisible ? 'visible' : 'hidden'}`}
        aria-hidden={!isNavVisible}
      >
        <ul className="nav-list">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
      </nav>

      {/* Success Notification */}
      {showSuccess && (
        <div 
          id="formSuccess"
          className="success-notification"
          role="alert"
          aria-live="assertive"
        >
          <p>Formulário enviado com sucesso!</p>
          <button 
            onClick={() => setShowSuccess(false)}
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
      )}

      <div className="button-group">
        <button 
          onClick={navToggle}
          aria-expanded={isNavVisible}
          aria-controls="mobNav"
          className="menu-toggle"
        >
          {isNavVisible ? 'Fechar Menu' : 'Abrir Menu'}
        </button>
        
        <button 
          onClick={showFormSuccess}
          className="success-button"
          disabled={showSuccess}
        >
          Mostrar Sucesso
        </button>
      </div>
    </div>
  );
};

export default AppConfig;