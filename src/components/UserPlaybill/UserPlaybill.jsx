import React, { useState } from 'react';
import './UserPlaybill.scss';

export default function UserPlaybill({ onApplyFilters, onCloseMyPlaybill, showOnlyFilters }) {
    const [showFilters, setShowFilters] = useState(showOnlyFilters || false);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedEventTypes, setSelectedEventTypes] = useState([]);

    const handleButtonClick = () => {
    };

    const handleInterestClick = (interest) => {
        setSelectedInterests(prevInterests => {
            if (prevInterests.includes(interest)) {
                return prevInterests.filter(item => item !== interest);
            } else {
                return [...prevInterests, interest];
            }
        });
    };

    const handleEventTypeClick = (eventType) => {
        setSelectedEventTypes(prevEventTypes => {
            if (prevEventTypes.includes(eventType)) {
                return prevEventTypes.filter(item => item !== eventType);
            } else {
                return [...prevEventTypes, eventType];
            }
        });
    };

    const handleApplyClick = () => {
        onApplyFilters({
            interests: selectedInterests,
            eventTypes: selectedEventTypes
        });
        setShowFilters(false);
        onCloseMyPlaybill();
    };

    return (
        !showFilters ? (
            <div className={"playbill_body"}>
                <p>В этом разделе вы можете создать вашу личную афишу.</p>
                <p>Выберите все подходящие для вас интересы и мы подберем для вас подходящие мероприятия!</p>
                <button onClick={handleButtonClick}>Создать свою афишу</button>
            </div>
        ) : (
            <div>
                <p>Интересы</p>
                <div className={'filters_container'}>
                    {Object.entries({
                        "architecture": "Архитектура",
                        "literature": "Литература",
                        "science": "Наука",
                        "history_of_ussr": "История СССР",
                        "history_of_yekaterinburg": "История Екатеринбурга",
                        "poetry": "Поэзия",
                        "music": "Музыка",
                        "philosophy": "Философия",
                        "flora_and_fauna": "Флора и фауны",
                        "handmade": "Ручная работа",
                        "cinematography": "Кинематограф",
                        "cartoons": "Мультфильмы",
                        "tourism": "Туризм",
                        "genealogy": "Генеалогия",
                        "paleontology": "Палеонтология",
                        "archaeology": "Археология"
                    }).map(([key, value]) => (
                        <button
                            key={key}
                            tabIndex="0"
                            onClick={() => {
                                handleInterestClick(key);
                                document.activeElement.blur();
                                setTimeout(() => document.getElementById(key).focus(), 0);
                            }}
                            id={key}
                            className={selectedInterests.includes(key) ? 'active' : ''}
                        >
                            {value}
                        </button>
                    ))}
                </div>
                <p>Тип мероприятия</p>
                <div className={'filters_container'}>
                    {Object.entries({
                        "excursion": "Экскурсия",
                        "master_class": "Мастер-класс",
                        "spectacle": "Спектакль",
                        "exhibition": "Выставка",
                        "interactive_lesson": "Интерактивное занятие",
                        "concert": "Концерт",
                        "genealogy": "Мероприятие по генеалогии",
                        "lecture": "Лекция",
                        "creative_meeting": "Творческая встреча",
                        "festival": "Фестиваль",
                        "artist_talk": "Артист-ток",
                        "film_screening": "Кинопоказ"
                    }).map(([key, value]) => (
                        <button
                            key={key}
                            tabIndex="0"
                            onClick={() => {
                                handleEventTypeClick(key);
                                document.activeElement.blur();
                                setTimeout(() => document.getElementById(key).focus(), 0);
                            }}
                            id={key}
                            className={selectedEventTypes.includes(key) ? 'active' : ''}
                        >
                            {value}
                        </button>
                    ))}
                </div>
                <button className={'accept_button'} onClick={handleApplyClick}>Применить</button>
            </div>
        )
    );
}
