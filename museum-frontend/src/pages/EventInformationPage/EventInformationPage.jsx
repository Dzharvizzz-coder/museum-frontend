import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/MainImages/logo.svg';
import './EventInformationPage.scss';
import MenuButton from "../../components/MenuButton/MenuButton.jsx";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import SendMail from '../../assets/images/MainImages/sendMail.png';
import VkImage from '../../assets/images/MainImages/vkImage.png';
import TelegramImage from '../../assets/images/MainImages/telegramImage.png';
import { useNavigate, useParams } from "react-router-dom";
import TicketPopUp from "../../components/TicketPopUp/TicketPopUp.jsx";

function EventInformationPage() {
    const { eventId } = useParams();
    const [eventData, setEventData] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://музеум.рф/api/api/v1/event/${eventId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEventData(data);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, [eventId]);

    const handleCloseTickets = () => {
        setShowPopUp(false);
    };

    const handleOpenTickets = () => {
        setShowPopUp(true);
    };

    const fields = [
        { label: 'Главная', currentPage: false, onClick: () => navigate('*') },
        { label: 'Мероприятия', currentPage: true, onClick: () => navigate('/events') },
        { label: 'Навигация', currentPage: false, onClick: () => navigate('/navigation') },
        { label: 'О музее', currentPage: false, onClick: () => navigate('/about') },
    ];

    if (!eventData) {
        return <div>Loading...</div>;
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
            <div className={'content_container'}>
                <div className={'photo_and_information_cont'}>
                    <img src={eventData.file[0].s3_path} className={"photo_and_information_cont__photo"} alt="Event" />
                    <div className={'photo_and_information_cont__information'}>
                        <p className={"name_of_event"}>{eventData.name}</p>
                        <p className={"place_of_event"}>{eventData.event_location[0]?.area?.name || ""}</p>
                        {/*<p className={"name_of_event_people"}>Экскурсовод - {eventData.guide}</p>*/}
                        <p className={"name_of_event_information"}>{eventData.description}</p>
                    </div>
                </div>

                <div className={"large_information_cont"}></div>

                <div className={"ticket_buy_container"}>
                    <p className={'dates'}>Расписание</p>
                    {eventData.ticket_date.map((date, index) => (
                        <div className={"ticket_buy_container__date"} key={index}>
                            <div className={'date_event_cont'}>
                                <p className={"ticket_buy_container__date__day"}>{new Date(date.date).getDate()}</p>
                                <div className={'date_event_cont__first'}>
                                    <p>{new Date(date.date).toLocaleDateString('default', { weekday: 'long' })}</p>
                                    <p>{new Date(date.date).toLocaleDateString('default', { month: 'long' })}</p>
                                </div>
                            </div>
                            <button onClick={handleOpenTickets} className={"ticket_buy_container__date__button"}>
                                от {eventData.ticket_price.find(price => price.price_type === "Взрослый билет").price} Р
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {showPopUp && (
                <TicketPopUp
                    name={eventData.name}
                    place={eventData.event_location[0]?.area?.name || ""}
                    onClick={handleCloseTickets}
                    ticketPrices={eventData.ticket_price}
                />
            )}

            <footer>

                <svg fill="#fff" height="106px" width="106px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 508.025 508.025" xml:space="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M502.513,187.025l-81.4-62.4v-39.4c0-7.8-6.3-14.1-14.1-14.1h-55.6l-88.8-68.2c-5.1-3.9-12.1-3.9-17.2,0l-88.8,68.2h-55.6 c-7.8,0-14.1,6.3-14.1,14.1v39.4l-81.4,62.4c-3.5,2.7-5.5,6.8-5.5,11.2c0,0.2,0,295.7,0,295.7c0,7.8,6.3,14.1,14.1,14.1h479.8 c7.8,0,14.1-6.3,14.1-14.1c0,0,0-295.2,0-295.7C508.013,193.825,506.013,189.725,502.513,187.025z M421.113,160.225l49.6,38.1 l-49.6,38.1V160.225z M254.012,31.925l51.1,39.2h-102.2L254.012,31.925z M115.112,99.325h277.8v158.7l-138.9,106.6l-138.9-106.6 V99.325z M86.913,160.225v76.1l-49.6-38.1L86.913,160.225z M28.213,226.925l155.3,119.2l-155.3,119.2V226.925z M55.713,479.825 l151-115.9l38.8,29.8c5.1,3.9,12.1,3.9,17.2,0l38.8-29.8l151,115.9H55.713z M479.813,465.325l-155.3-119.2l155.3-119.2V465.325z"></path> </g> </g> <g> <g> <path d="M336.513,207.925h-164.9c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h164.9c7.7,0,14.1-6.3,14.1-14.1 S344.313,207.925,336.513,207.925z"></path> </g> </g> <g> <g> <path d="M336.513,141.725h-164.9c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h164.9c7.8,0,14.1-6.3,14.1-14.1 S344.313,141.725,336.513,141.725z"></path> </g> </g> <g> <g> <path d="M297.913,274.125h-87.7c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1h87.7c7.7,0,14.1-6.3,14.1-14.1 S305.713,274.125,297.913,274.125z"></path> </g> </g> </g></svg>

                <div className={"text_footer_cont"}>
                    <p className={"footer_h1"}>Подписка на новости</p>
                    <div className={"input_container"}>
                        <input className={"footer_input"} placeholder={"Ваш E-mail"}/>
                        <button className={"button_footer"}>Подписаться</button>
                    </div>
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

export default EventInformationPage;
