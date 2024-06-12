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

export default AboutMuseum;
