import React, {useState} from 'react';
import Logo from '../../assets/images/MainImages/logo.svg';
import BackgroundImage from '../../assets/images/MainImages/MainImage.png';
import './NavigationPage.scss';
import MenuButton from "../../components/MenuButton/MenuButton.jsx";
import EventCard from "../../components/EventCard/EventCard.jsx";
import UserPlaybill from "../../components/UserPlaybill/UserPlaybill.jsx";
import LastEventCard from "../../components/EventCard/LastEventCard.jsx";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu.jsx";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import SendMail from '../../assets/images/MainImages/sendMail.png'
import VkImage from '../../assets/images/MainImages/vkImage.png'
import TelegramImage from '../../assets/images/MainImages/telegramImage.png'
import FirstFloor from '../../assets/images/MainImages/firstFloor.png'
import {useNavigate} from "react-router-dom";
import PlaceButtonCard from "../../components/PlaceButtonCard/PlaceButtonCard.jsx";

function NavigationPage() {

    const [showRecomendations, setShowRecomendations] = useState(true);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    let navigate = useNavigate()


    const fields = [
        {
            label: 'Главная',
            currentPage: false,
            onClick:() => navigate('*')
        },
        {
            label: 'Мероприятия',
            currentPage: false,
            onClick:() => navigate('/events')
        },
        {
            label: 'Навигация',
            currentPage: true,
            onClick:() => navigate('/navigation')
        },
        {
            label: 'О музее',
            currentPage: false,
            onClick:() => navigate('/about')
        },
    ];


    return (
        <div>
            <div className={"header"}>
                <img src={Logo} className={"logo"} alt={"Логотип"} />
                <div className={"header_menu"}>
                    <p className={'text'}>Музей Истории Екатеринбурга</p>
                    <div className={'line'} />
                    <div className={'button_container'}>
                        {fields.map((field, i) => (
                            <MenuButton label={field.label} key={i} currentPage={field.currentPage} onClick={field.onClick}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className={'content_container'}>
                <div className={'floor_cont'}>
                    <PlaceButtonCard key={0}/>
                    <div className={'floor_image_cont'}>
                        <img src={FirstFloor} className={'floor_style'}/>
                    </div>
                </div>

            </div>

            <footer>
                <SearchInput image={SendMail} width={"13vw"} placeholder={"Ваш E-mail"}/>
                <div className={"email_info_container"}>
                    Отправляя заявку, подтверждаю согласие на обработку персональных данных в соответствии с <a href={'https://m-i-e.ru/privacy'} className={'link_for_personality'}>политикой конфиденциальности</a>.
                </div>

                <a className={'telegram_link'}>
                    <img alt={'telegram channel'} src={TelegramImage} style={{width: '4.5vh'}}/>
                </a>

                <a className={'vk_link'}>
                    <img alt={'vk group'} src={VkImage} style={{width: '4.5vh'}}/>
                </a>
            </footer>
        </div>
    );
}

export default NavigationPage;
