import React, { useState } from 'react';
import './Filters.scss';

const Filters = ({ name, items, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        onFilterChange(item === 'all' ? '' : item);
    };

    return (
        <div className='dropdown-container-main'>
            <p>{name}</p>
            <div className="dropdown-container">
                <button className="dropdown-button" onClick={toggleMenu}>
                    {selectedItem ? <span className="selected-item">{items[selectedItem]}</span> : 'Выберите'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
                        <path d="M1 1L8.5 9L16 1" stroke="black" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item-no-filers" onClick={() => handleItemClick('all')}>Нет фильтрации</div>
                        {Object.entries(items).map(([key, value]) => (
                            <div className="dropdown-item" key={key} onClick={() => handleItemClick(key)}>
                                {value}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;