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
import Loader from "../../components/Loader/Loader.tsx";
import UserPlaybillPlaceholder from "../../components/UserPlaybillPlaceholder/UserPlaybillPlaceholder.jsx";


function EventPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        genre: '',
        location: '',
        visitor_category: '',
        disabilities: '',
        offset: 0,
    });

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubscribe = async () => {
        if (!email) {
            setEmailError('Введите E-mail');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Введите корректный E-mail');
            return;
        }

        try {
            const response = await fetch('http://музеум.рф/api/api/v1/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Подписка успешно оформлена');
            setEmail('');
        } catch (error) {
            setEmailError('Ошибка при оформлении подписки');
        }
    };

    const buildQuery = (filters) => {
        const query = new URLSearchParams({ limit: 100 });
        for (const key in filters) {
            if (filters[key]) {
                query.append(key, filters[key]);
            }
        }
        return query.toString();
    };

    const fetchEvents = async (filters) => {
        setLoading(true);
        try {
            const query = buildQuery(filters);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/event/all?${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data.items);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(filters);
    }, []); // Only run once on mount

    useEffect(() => {
        fetchEvents(filters);
    }, [filters]); // Run whenever filters change

    const handleFilterChange = (filterName, filterValue) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: filterValue,
            offset: 0,
        }));
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
        1: "Экскурсия",
        2: "Мастер-класс",
        3: "Спектакль",
        4: "Выставка",
        5: "Интерактивное занятие",
        6: "Концерт",
        7: "Мероприятие по генеалогии",
        8: "Лекция",
        9: "Творческая встреча",
        10: "Фестиваль",
        11: "Артист-ток",
        12: "Кинопоказ"
    };

    const location = {
       3: "Дом Качки",
        2: "Дом Метенкова",
        4: "Креативный кластер \"Л52\"",
        1: "Водонапорная башня на плотинке",
        5: "Дом Маклецкого",
        6: "Мемориальный комплекс"
    };

    const visitorCategory = {
        3: "Взрослые",
        2: "Подростки",
        1: "Дети"
    };

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
                <Filters name={"Площадка"} items={location} onFilterChange={value => handleFilterChange('location', value)} />
                <Filters name={"Возраст"} items={visitorCategory} onFilterChange={value => handleFilterChange('visitor_category', value)} />
                <Filters name={"Инклюзивность"} items={{ "yes": "Да", "no": "Нет"}} onFilterChange={value => handleFilterChange('disabilities', value)} />
            </div>
            <div className={'event_card_container'}>
                {loading ? (
                    <Loader />
                ) : events.length > 0 ? (
                    events.map((event, i) => (
                        <EventCard
                        key={i}
                        eventId={event.id}
                        disabilities={event.disabilities}
                        price={event.min_price ? event.min_price : 'Бесплатно'}
                        name={event.name}
                        date={new Date(event.nearest_date).toLocaleDateString()}
                        time={new Date(event.nearest_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        place={event.location.name}
                        cardImage={event.image_url && event.image_url.length > 0 ? event.image_url : ''}
                        needPrice={event.min_price && event.min_price.length > 0}
                        fixedPrice={event.min_price && event.min_price.length > 0 && event.min_price === 'fixed'}
                        />
                    ))
                ) : (
                    <UserPlaybillPlaceholder main={false} mb={"13%"}/>
                )}
            </div>

            {loading ? (
                <></>
            ) : (
                <footer>

                    <svg fill="#fff" height="106px" width="106px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508.025 508.025" xml:space="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M502.513,187.025l-81.4-62.4v-39.4c0-7.8-6.3-14.1-14.1-14.1h-55.6l-88.8-68.2c-5.1-3.9-12.1-3.9-17.2,0l-88.8,68.2h-55.6 c-7.8,0-14.1,6.3-14.1,14.1v39.4l-81.4,62.4c-3.5,2.7-5.5,6.8-5.5,11.2c0,0.2,0,295.7,0,295.7c0,7.8,6.3,14.1,14.1,14.1h479.8 c7.8,0,14.1-6.3,14.1-14.1c0,0,0-295.2,0-295.7C508.013,193.825,506.013,189.725,502.513,187.025z M421.113,160.225l49.6,38.1 l-49.6,38.1V160.225z M254.012,31.925l51.1,39.2h-102.2L254.012,31.925z M115.112,99.325h277.8v158.7l-138.9,106.6l-138.9-106.6 V99.325z M86.913,160.225v76.1l-49.6-38.1L86.913,160.225z M28.213,226.925l155.3,119.2l-155.3,119.2V226.925z M55.713,479.825 l151-115.9l38.8,29.8c5.1,3.9,12.1,3.9,17.2,0l38.8-29.8l151,115.9H55.713z M479.813,465.325l-155.3-119.2l155.3-119.2V465.325z"></path> </g> </g> <g> <g> <path d="M336.513,207.925h-164.9c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h164.9c7.7,0,14.1-6.3,14.1-14.1 S344.313,207.925,336.513,207.925z"></path> </g> </g> <g> <g> <path d="M336.513,141.725h-164.9c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h164.9c7.8,0,14.1-6.3,14.1-14.1 S344.313,141.725,336.513,141.725z"></path> </g> </g> <g> <g> <path d="M297.913,274.125h-87.7c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1h87.7c7.7,0,14.1-6.3,14.1-14.1 S305.713,274.125,297.913,274.125z"></path> </g> </g> </g></svg>

                    <div className={"text_footer_cont"}>
                        <p className={"footer_h1"}>Подписка на новости</p>
                        <div className={"input_container"}>
                            <input
                                className={"footer_input"}
                                placeholder={"Ваш E-mail"}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                            />
                            <button className={"button_footer"} onClick={handleSubscribe}>Подписаться</button>
                        </div>
                        {emailError && <div className={"email_error"}>{emailError}</div>}
                        <div className={"email_info_container"}>
                            Отправляя заявку, подтверждаю согласие на обработку персональных данных в соответствии с <a href={'https://m-i-e.ru/privacy'} className={'link_for_personality'}>политикой конфиденциальности</a>.
                        </div>
                    </div>

                    <a className={'telegram_link'}>
                        <img alt={'telegram channel'} src={TelegramImage} style={{ width: '4.5vh' }} />
                    </a>

                    <a className={'vk_link'}>
                        <img alt={'vk group'} src={VkImage} style={{ width: '4.5vh' }} />
                    </a>
                </footer>

            )}
        </div>
    );
}

export default EventPage;