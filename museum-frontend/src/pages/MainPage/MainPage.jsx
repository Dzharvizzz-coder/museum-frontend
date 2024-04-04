import React, {useState} from 'react';
import Logo from '../../assets/images/MainImages/logo.svg';
import BackgroundImage from '../../assets/images/MainImages/MainImage.png';
import './MainPage.scss';
import MenuButton from "../../components/MenuButton/MenuButton.jsx";
import EventCard from "../../components/EventCard/EventCard.jsx";
import CardImageOne from '../../assets/images/TempImages/CardOne.png'
import CardImageTwo from '../../assets/images/TempImages/CardTwo.png'
import CardImageThree from '../../assets/images/TempImages/CardThree.png'
import CardImageFour from '../../assets/images/TempImages/CardFour.png'
import CardImageFive from '../../assets/images/TempImages/CardFive.png'
import UserPlaybill from "../../components/UserPlaybill/UserPlaybill.jsx";
import LastEventCard from "../../components/EventCard/LastEventCard.jsx";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu.jsx";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import SendMail from '../../assets/images/MainImages/sendMail.png'
import VkImage from '../../assets/images/MainImages/vkImage.png'
import TelegramImage from '../../assets/images/MainImages/telegramImage.png'

function MainPage() {

    const [showRecomendations, setShowRecomendations] = useState(true);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const handleSecondButtonClick = (index) => {
        setCurrentPageIndex(index);
        if (index === 0) {
            setShowRecomendations(true);
        } else if (index === 1) {
            setShowRecomendations(false);
        }
    };

    const helpQuestions = [
        {
            name: "Как добраться?"
        },
        {
            name: "Как вести себя в музее?"
        },
        {
            name: "Как получить помощь?"
        },
        {
            name: "Как пользоваться приложением?"
        },
        {
            name: "Где расположены пандусы?"
        },
        {
            name: "Навигация"
        },
    ]

    const fields = [
        {
            label: 'Главная',
            currentPage: true
        },
        {
            label: 'Мероприятия',
            currentPage: false
        },
        {
            label: 'Навигация',
            currentPage: false
        },
        {
            label: 'О музее',
            currentPage: false
        },
    ];

    const second_fields = [
        {
            label: 'Мероприятия',
            currentPage: currentPageIndex === 0
        },
        {
            label: 'Моя афиша',
            currentPage: currentPageIndex === 1
        }
    ];

    const event_fields = [
        {
            cardImage: CardImageOne,
            price: '500',
            name: '«Читать не обязательно» (12+)',
            date: '3 апреля',
            time: '19:30',
            place: 'Л52',
            needPrice: true,
            fixedPrice: true,
        },

        {
            cardImage: CardImageTwo,
            price: '-',
            name: 'Встреча группы анонимных краеведов (14+)',
            date: '4 апреля',
            time: '18:00-20:00',
            place: 'Л52',
            needPrice: false,
            fixedPrice: false,
        },

        {
            cardImage: CardImageThree,
            price: '100',
            name: '«Наука в большом городе. Интеллектуальный ландшафт Свердловска» (12+)',
            date: '4, 6-7 апреля',
            time: '19:00, 14:00',
            place: 'Л52',
            needPrice: true,
            fixedPrice: false,
        },

        {
            cardImage: CardImageFour,
            price: '150',
            name: 'Беседы о французском (14+)',
            date: '5 апреля',
            time: '19:00-21:00',
            place: 'Дом Маклецкого',
            needPrice: true,
            fixedPrice: false,
        },

        {
            cardImage: CardImageFive,
            price: '400',
            name: 'VIII Исторический фест «Урал. Культ туризма»',
            date: '6 апреля',
            time: '13:30',
            place: 'Площадки Музея',
            needPrice: true,
            fixedPrice: false,
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
                            <MenuButton label={field.label} key={i} currentPage={field.currentPage}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className={'info_container'}>
                <img className={"main_img"} src={BackgroundImage} alt="Главное изображение"/>
                <div className={'info'}>
                    <p>Место, где можно узнать много интересного о городе и его истории.</p>
                    <p>В музее есть постоянные и временные экспозиции, а также проводятся  мероприятия для детей и взрослых: концерты, фестивали, спектакли и мастер-классы.</p>
                    <button style={{cursor: 'pointer'}}>Билеты</button>
                </div>
            </div>

            <div className={'second_button_container'}>
                {second_fields.map((field, i) => (
                    <MenuButton label={field.label} key={i} currentPage={field.currentPage} width_of_line={'7.5vw'} onClick={() => handleSecondButtonClick(i)}/>
                ))}
            </div>

            <div className={'event_card_container'}>
                {showRecomendations ? (
                    <>
                        {event_fields.map((field, i) => (
                            <EventCard key={i} fixedPrice={field.fixedPrice} price={field.price} date={field.date} name={field.name} needPrice={field.needPrice} place={field.place} time={field.time} cardImage={field.cardImage}/>
                        ))}
                        <LastEventCard/>
                    </>
                ) : (
                    <UserPlaybill/>
                )}
            </div>

            <div className={"drop_down_menu_container"}>
                <p>Как подготовиться к походу в музей</p>
                {helpQuestions.map((field, i) => (
                    <DropDownMenu name={field.name}/>
                ))}
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

export default MainPage;
