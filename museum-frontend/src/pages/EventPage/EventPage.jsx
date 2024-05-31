import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/MainImages/logo.svg';
import './EventPage.scss';
import MenuButton from "../../components/MenuButton/MenuButton.jsx";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import SendMail from '../../assets/images/MainImages/sendMail.png';
import VkImage from '../../assets/images/MainImages/vkImage.png';
import TelegramImage from '../../assets/images/MainImages/telegramImage.png';
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard.jsx";
import Filters from "../../components/Filters/Filters.jsx";

function EventPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        genre: '',
        area: '',
        age: '',
        disabilities: ''
    });
    const eventsPerPage = 12;

    const buildQuery = (filters) => {
        const query = new URLSearchParams({ page: 1, limit: 10 });
        for (const key in filters) {
            if (filters[key]) {
                query.append(key, filters[key]);
            }
        }
        return query.toString();
    };

    useEffect(() => {
        const fetchEvents = async (page = 1, allEvents = []) => {
            try {
                const query = buildQuery(filters);
                const response = await fetch(`http://музеум.рф/api/v1/event/search/?${query}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const updatedEvents = [...allEvents, ...data.content];
                if (data.pages_total > page) {
                    return fetchEvents(page + 1, updatedEvents);
                } else {
                    setEvents(updatedEvents);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, [filters]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (filterName, filterValue) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: filterValue
        }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const fields = [
        {
            label: 'Главная',
            currentPage: false,
            onClick: () => navigate('/')
        },
        {
            label: 'Мероприятия',
            currentPage: true,
            onClick: () => navigate('/events')
        },
        {
            label: 'Навигация',
            currentPage: false,
            onClick: () => navigate('/navigation')
        },
        {
            label: 'О музее',
            currentPage: false,
            onClick: () => navigate('/about')
        },
    ];

    const genres = {
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
    };

    const places = {
        "cachka_house": "Дом Качки",
        "metenkov_house": "Дом Метенкова",
        "l52": "Креативный кластер \"Л52\"",
        "water_tower": "Водонапорная башня на плотинке",
        "makletsky_house": "Дом Маклецкого",
        "memorial_complex": "Мемориальный комплекс"
    };

    const ages = {
        "adults": "Взрослые",
        "teenagers": "Подростки",
        "kids": "Дети"
    };

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const pageNumbers = Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => i + 1);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className={"header"}>
                <img src={Logo} className={"logo"} alt={"Логотип"} />
                <div className={"header_menu"}>
                    <p className={'text'}>Музей Истории Екатеринбурга</p>
                    <div className={'line'} />
                    <div className={'button_container'}>
                        {fields.map((field, i) => (
                            <MenuButton label={field.label} key={i} currentPage={field.currentPage} onClick={field.onClick} />
                        ))}
                    </div>
                </div>
            </div>
            <p className={"filters-p"}>Фильтры</p>
            <div className={'filters-cont'}>
                <Filters name={"Жанр"} items={genres} onFilterChange={value => handleFilterChange('genre', value)} />
                <Filters name={"Площадка"} items={places} onFilterChange={value => handleFilterChange('area', value)} />
                <Filters name={"Возраст"} items={ages} onFilterChange={value => handleFilterChange('age', value)} />
                <Filters name={"Инклюзивность"} items={{ "yes": "Да", "no": "Нет"}} onFilterChange={value => handleFilterChange('disabilities', value)} />
            </div>
            <div className={'event_card_container'}>
                {currentEvents.map((event, i) => (
                    <EventCard
                        key={i}
                        eventId={event.event_id}
                        disabilities={event.disabilities}
                        price={event.ticket_price && event.ticket_price.length > 0 ? event.ticket_price[0].price : 'Бесплатно'}
                        name={event.name}
                        date={event.ticket_date && event.ticket_date.length > 0 ? new Date(event.ticket_date[0].date).toLocaleDateString() : 'Не указано'}
                        time={event.ticket_date && event.ticket_date.length > 0 ? new Date(event.ticket_date[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Не указано'}
                        place={event.event_location && event.event_location.length > 0 ? event.event_location[0].area.name : 'Не указано'}
                        cardImage={event.file && event.file.length > 0 ? event.file[0].s3_path : ''}
                        needPrice={event.ticket_price && event.ticket_price.length > 0}
                        fixedPrice={event.ticket_price && event.ticket_price.length > 0 && event.ticket_price[0].price_type === 'fixed'}
                    />
                ))}
            </div>

            <div className={'pagination'}>
                {pageNumbers.map(number => (
                    <span key={number}
                          className={currentPage === number ? 'active' : ''}
                          onClick={() => handlePageChange(number)}>{number}</span>
                ))}
            </div>

            <footer>
                <SearchInput image={SendMail} width={"13vw"} placeholder={"Ваш E-mail"}/>
                <div className={"email_info_container"}>
                    Отправляя заявку, подтверждаю согласие на обработку персональных данных в соответствии с <a href={'https://m-i-e.ru/privacy'} className={'link_for_personality'}>политикой конфиденциальности</a>.
                </div>

                <a className={'telegram_link'}>
                    <img src={TelegramImage} alt={"Telegram"} />
                </a>
                <a className={'vk_link'}>
                    <img src={VkImage} alt={"VK"} />
                </a>
            </footer>
        </div>
    );
}

export default EventPage;