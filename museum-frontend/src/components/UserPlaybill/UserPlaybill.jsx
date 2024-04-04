import React, {useState} from 'react';
import './UserPlaybill.scss';

export default function UserPlaybill() {
    const [showFilters, setShowFilters] = useState(false)
    const handleButtonClick = (index) => {
        setShowFilters(true)
    };


    return (
        !showFilters ?

            <div className={"playbill_body"}>
                <p>В этом разделе вы можете создать вашу личную афишу.</p>
                <p>Выберите все подходящие для вас интересы и мы подберем для вас подходящие мероприятия!</p>
                <button onClick={() => handleButtonClick()}>Создать свою афишу</button>
            </div> :

            <div>
                <p>Интересы</p>
                <div className={'filters_container'}>
                    <button>Портрет</button>
                    <button>Пейзаж</button>
                    <button>Абстракция</button>
                    <button>Натюрморт</button>
                    <button>Историческая картина</button>
                    <button>Скульптура</button>
                    <button>Графика</button>
                    <button>Фотография</button>
                    <button>Иллюстрация</button>
                    <button>Мозаика</button>
                </div>
                <p>Тип мероприятия</p>
                <div className={'filters_container'}>
                    <button>Экскурсия</button>
                    <button>Мастер-класс</button>
                    <button>Лекция</button>
                    <button>Выставка</button>
                    <button>Концерт</button>
                    <button>Встреча с художником</button>
                    <button>Театрализованное представление</button>
                    <button>Мультимедийная презентация</button>
                    <button>Детский урок</button>
                    <button>Фестиваль</button>
                </div>

                <button className={'accept_button'}>Применить</button>
            </div>



    );
}
