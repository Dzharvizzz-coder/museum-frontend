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
                const response = await fetch(`http://музеум.рф/api/v1/event/${eventId}`);
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
                <SearchInput image={SendMail} width={"13vw"} placeholder={"Ваш E-mail"} />
                <div className={"email_info_container"}>
                    Отправляя заявку, подтверждаю согласие на обработку персональных данных в соответствии с <a href={'https://m-i-e.ru/privacy'} className={'link_for_personality'}>политикой конфиденциальности</a>.
                </div>

                <a className={'telegram_link'} href="https://telegram.org">
                    <img alt={'telegram channel'} src={TelegramImage} style={{ width: '4.5vh' }} />
                </a>

                <a className={'vk_link'} href="https://vk.com">
                    <img alt={'vk group'} src={VkImage} style={{ width: '4.5vh' }} />
                </a>
            </footer>
        </div>
    );
}

export default EventInformationPage;
