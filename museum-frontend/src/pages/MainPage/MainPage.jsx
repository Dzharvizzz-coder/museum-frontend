import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/images/MainImages/logo.svg';
import BackgroundImage from '../../assets/images/MainImages/MainImage.png';
import './MainPage.scss';
import MenuButton from "../../components/MenuButton/MenuButton.jsx";
import EventCard from "../../components/EventCard/EventCard.jsx";
import UserPlaybill from "../../components/UserPlaybill/UserPlaybill.jsx";
import LastEventCard from "../../components/EventCard/LastEventCard.jsx";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu.jsx";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import SendMail from '../../assets/images/MainImages/sendMail.png';
import VkImage from '../../assets/images/MainImages/vkImage.png';
import TelegramImage from '../../assets/images/MainImages/telegramImage.png';

function MainPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRecomendations, setShowRecomendations] = useState(true);
    const [showMyPlaybill, setShowMyPlaybill] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://158.160.117.146:5000/api/v1/event/upcoming/?quantity=5');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleSecondButtonClick = (index) => {
        setCurrentPageIndex(index);
        setShowRecomendations(index === 0);
    };

    const handleApplyFilters = async ({ interests, eventTypes }) => {
        try {
            const queryParams = new URLSearchParams();
            interests.forEach(interest => queryParams.append('tags', interest));
            eventTypes.forEach(eventType => queryParams.append('genre', eventType));

            const url = `http://158.160.117.146:5000/api/v1/event/search_individual/?page=1&limit=20&${queryParams.toString()}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredEvents(data.content);
        } catch (error) {
            setError(error);
        }
    };

    const helpQuestions = [
        { name: "Как добраться?" },
        { name: "Как вести себя в музее?" },
        { name: "Как получить помощь?" },
        { name: "Как пользоваться приложением?" },
        { name: "Где расположены пандусы?" },
        { name: "Навигация" },
    ];

    const fields = [
        { label: 'Главная', currentPage: true, onClick: () => navigate('*') },
        { label: 'Мероприятия', currentPage: false, onClick: () => navigate('/events') },
        { label: 'Навигация', currentPage: false, onClick: () => navigate('/navigation') },
        { label: 'О музее', currentPage: false, onClick: () => navigate('/about') },
    ];

    const second_fields = [
        { label: 'Мероприятия', currentPage: currentPageIndex === 0 },
        { label: 'Моя афиша', currentPage: currentPageIndex === 1 },
    ];

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

            <div className={'info_container'}>
                <img className={"main_img"} src={BackgroundImage} alt="Главное изображение" />
                <div className={'info'}>
                    <p className={"info__first_text"}>Место, где можно узнать много интересного о городе и его истории.</p>
                    <p className={"info__second_text"}>В музее есть постоянные и временные экспозиции, а также проводятся мероприятия для детей и взрослых: концерты, фестивали, спектакли и мастер-классы</p>
                    <button style={{ cursor: 'pointer' }}>Билеты</button>
                </div>
            </div>

            <div className={'second_button_container'}>
                {second_fields.map((field, i) => (
                    <MenuButton label={field.label} key={i} currentPage={field.currentPage} width_of_line={'7.5vw'} onClick={() => handleSecondButtonClick(i)} />
                ))}
            </div>

            <div className={'event_card_container'}>
                {showRecomendations ? (
                    <>
                        {events.map((event, i) => (
                            <EventCard
                                key={event.event_id}
                                eventId={event.event_id}
                                disabilities={event.disabilities}
                                price={event.ticket_price && event.ticket_price.length > 0 ? event.ticket_price[0].price : 'Бесплатно'}
                                name={event.name}
                                date={new Date(event.nearest_date).toLocaleDateString()}
                                time={new Date(event.nearest_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                place={event.event_location && event.event_location.length > 0 ? event.event_location[0].area.name : 'Не указано'}
                                cardImage={event.file && event.file.length > 0 ? event.file[0].s3_path : ''}
                                needPrice={event.ticket_price && event.ticket_price.length > 0}
                                fixedPrice={event.ticket_price && event.ticket_price.length > 0 && event.ticket_price[0].price_type === 'fixed'}
                            />
                        ))}
                        <LastEventCard />
                    </>
                ) : (

                    (!showMyPlaybill ? (
                            <UserPlaybill onCloseMyPlaybill={() => setShowMyPlaybill(true)} onApplyFilters={handleApplyFilters}/>
                        ) : (
                            <>
                                {filteredEvents.map((event, i) => (
                                    <EventCard
                                        key={event.event_id}
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
                            </>
                        )
                    )
                )}
            </div>

            <div className={"drop_down_menu_container"}>
                <p>Как подготовиться к походу в музей</p>
                {helpQuestions.map((field, i) => (
                    <DropDownMenu key={i} name={field.name} />
                ))}
            </div>

            <footer>
                <SearchInput image={SendMail} width={"13vw"} placeholder={"Ваш E-mail"} />
                <div className={"email_info_container"}>
                    Отправляя заявку, подтверждаю согласие на обработку персональных данных в соответствии с <a href={'https://m-i-e.ru/privacy'} className={'link_for_personality'}>политикой конфиденциальности</a>.
                </div>

                <a className={'telegram_link'}>
                    <img alt={'telegram channel'} src={TelegramImage} style={{ width: '4.5vh' }} />
                </a>

                <a className={'vk_link'}>
                    <img alt={'vk group'} src={VkImage} style={{ width: '4.5vh' }} />
                </a>
            </footer>
        </div>
    );
}

export default MainPage;