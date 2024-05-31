import React, {useState} from 'react';
import Logo from '../../assets/images/MainImages/logo.svg';
import BackgroundImage from '../../assets/images/MainImages/MainImage.png';
import './AboutMuseum.scss';
import MenuButton from "../../components/MenuButton/MenuButton.jsx";
import EventCard from "../../components/EventCard/EventCard.jsx";
import UserPlaybill from "../../components/UserPlaybill/UserPlaybill.jsx";
import LastEventCard from "../../components/EventCard/LastEventCard.jsx";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu.jsx";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import SendMail from '../../assets/images/MainImages/sendMail.png'
import VkImage from '../../assets/images/MainImages/vkImage.png'
import TelegramImage from '../../assets/images/MainImages/telegramImage.png'
import FirstPhoto from '../../assets/images/MainImages/aboutPhoto1.png'
import SecondPhoto from '../../assets/images/MainImages/aboutPhoto2.png'
import ThirdPhoto from '../../assets/images/MainImages/aboutPhoto3.png'
import FourPhoto from '../../assets/images/MainImages/aboutPhoto4.png'
import FivePhoto from '../../assets/images/MainImages/aboutPhoto5.png'
import SixPhoto from '../../assets/images/MainImages/aboutPhoto6.png'
import {useNavigate} from "react-router-dom";

function AboutMuseum() {

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
            currentPage: false,
            onClick:() => navigate('/navigation')
        },
        {
            label: 'О музее',
            currentPage: true,
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
                <div className={'content_container_about'}>
                    <div className={'content_container_about__text'}>
                        <h1>В 1940 году</h1>
                        <p>Открылся Музей истории Екатеринбурга, который был создан на базе музея Якова Свердлова. Первая экспозиция была практически полностью посвящена основным вехам деятельности Свердлова: революционной борьбе, аресту, работе в заключении, восхождению к вершинам власти.</p>
                    </div>
                    <div className={'over-cont'}>
                        <img src={FirstPhoto} alt={'Четвертое фото'} className={'photo-container'}/>
                    </div>
                </div>

                <div className={'content_container_about'}>
                    <div className={'over-cont'}>
                        <img src={SecondPhoto} alt={'Четвертое фото'} className={'photo-container'}/>
                    </div>
                    <div className={'content_container_about__text'}>
                        <h1>В 1993 году</h1>
                        <p>У музея появляется вторая площадка - Фотографический музей "Дом Метенкова" (здание на К.Либкнехта, 36).  Здесь представлены исторические фотографии, созданные Вениамином Метенковым, известным фотографом Екатеринбурга. Музей является арт-пространством, где зритель знакомится с современным искусством.</p>
                    </div>
                </div>

                <div className={'content_container_about'}>
                    <div className={'content_container_about__text'}>
                        <h1>В 1995 году</h1>
                        <p>Музею истории Екатеринбурга была передана Водонапорная башня на Плотинке (здание на Горького, 4в). На втором этаже находится постоянная экспозиция с захватывающей судьбой Башни - от гидротехнического сооружения 19 века и жилья для семей инженеров танкостроительного завода № 37 до музея в 20 веке.</p>
                    </div>
                    <div className={'over-cont'}>
                        <img src={ThirdPhoto} alt={'Четвертое фото'} className={'photo-container'}/>
                    </div>
                </div>

                <div className={'content_container_about'}>
                    <div className={'over-cont'}>
                        <img src={FourPhoto} alt={'Четвертое фото'} className={'photo-container'}/>
                    </div>
                    <div className={'content_container_about__text'}>
                        <h1>В 2016 году</h1>
                        <p>В состав музея вошел Мемориал памяти жертв политических репрессий в СССР 1930-1950-х гг. (находится на 12 километре Московского тракта). Мемориал создан на месте расстрела и массовых захоронений репрессированных.</p>
                    </div>
                </div>

                <div className={'content_container_about'}>
                    <div className={'content_container_about__text'}>
                        <h1>В 2018 году</h1>
                        <p>Музей истории Екатеринбурга получил еще одну площадку - дом Маклецкого (здание на Тургенева, 15). С 2023 года- это музейно-общественное пространство, включающее выставочную и лекционно-просветительскую площадки, фондохранилище музея.</p>
                    </div>
                    <div className={'over-cont'}>
                        <img src={FivePhoto} alt={'Четвертое фото'} className={'photo-container'}/>
                    </div>
                </div>

                <div className={'content_container_about'}>
                    <div className={'over-cont'}>
                        <img src={SixPhoto} alt={'Четвертое фото'} className={'photo-container'}/>
                    </div>
                    <div className={'content_container_about__text'}>
                        <h1>В 2021 году</h1>
                        <p>Музею было передано здание по адресу Ленина, 52 / Бажова, 124а, сегодня там размещается Креативный кластер "Л52". Здание является уникальным памятником конструктивизма, изначально самый крупный дом- коммуна, построенный в 1933 году.</p>
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

export default AboutMuseum;
