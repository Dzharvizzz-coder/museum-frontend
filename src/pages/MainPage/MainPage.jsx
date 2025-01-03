import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import Loader from "../../components/Loader/Loader.tsx";
import UserPlaybillPlaceholder from '../../components/UserPlaybillPlaceholder/UserPlaybillPlaceholder.jsx';

function MainPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRecomendations, setShowRecomendations] = useState(true);
    const [showMyPlaybill, setShowMyPlaybill] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const navigate = useNavigate();
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    useEffect(() => {
        if (location.state && location.state.fromNavigationPage) {
            setTimeout(() => {
                const element = document.getElementById(location.hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        }
    }, [location]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://музеум.рф/api/api/v1/event/upcoming/?quantity=5');
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
        setShowMyPlaybill(index === 1);
        setShowFilters(false);
    };

    const handleApplyFilters = async ({ interests, eventTypes }) => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams();
            interests.forEach(interest => queryParams.append('tags', interest));
            eventTypes.forEach(eventType => queryParams.append('genre', eventType));

            const url = `http://музеум.рф/api/api/v1/event/make_individual/?${queryParams.toString()}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredEvents(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

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

    const helpQuestions = [
        { name: "Как добраться?", storyComponent: "FirstStory" },
        { name: "Что делать при входе?", storyComponent: "SecondStory" },
        { name: "Как вести себя на первом этаже?", storyComponent: "ThirdStory" },
        { name: "Как вести себя на втором этаже?", storyComponent: "FourStory" },
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
                    <button style={{ cursor: 'pointer' }} onClick={() => navigate('/events')}>Билеты</button>
                </div>
            </div>

            <div className={'second_button_container'}>
                {second_fields.map((field, i) => (
                    <MenuButton label={field.label} key={i} currentPage={field.currentPage} width_of_line={'7.5vw'} onClick={() => handleSecondButtonClick(i)} />
                ))}
            </div>

            <div className={'event_card_container'}>
                {loading ? (
                    <Loader />
                ) : showRecomendations ? (
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
                    showMyPlaybill ? (
                        <UserPlaybill onCloseMyPlaybill={() => setShowMyPlaybill(false)} onApplyFilters={handleApplyFilters} />
                    ) : (
                        filteredEvents.length > 0 ? (
                            filteredEvents.map((event, i) => (
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
                            ))
                        ) : (
                            <UserPlaybillPlaceholder main={true} onClick={() => setShowMyPlaybill(true)} />
                        )
                    )
                )}

                {showFilters && (
                    <UserPlaybill onApplyFilters={handleApplyFilters} onCloseMyPlaybill={() => setShowFilters(false)} />
                )}
            </div>

            <div className={"drop_down_menu_container"} id="preparation-section">
                <p>Как подготовиться к походу в музей</p>
                {helpQuestions.map((field, i) => (
                    <DropDownMenu
                        key={i}
                        name={field.name}
                        storyComponentName={field.storyComponent}
                        isOpen={openMenuIndex === i}
                        toggleMenu={() => toggleMenu(i)}
                        isNextHidden={openMenuIndex === i - 1}
                        isLastItem={i === helpQuestions.length - 1}
                    />
                ))}
            </div>

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
        </div>
    );
}

export default MainPage;