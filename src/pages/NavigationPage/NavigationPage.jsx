import React, { useState } from 'react';
import Logo from '../../assets/images/MainImages/logo.svg';
import BackgroundImage from '../../assets/images/MainImages/MainImage.png';
import './NavigationPage.scss';
import MenuButton from "../../components/MenuButton/MenuButton.jsx";
import EventCard from "../../components/EventCard/EventCard.jsx";
import UserPlaybill from "../../components/UserPlaybill/UserPlaybill.jsx";
import LastEventCard from "../../components/EventCard/LastEventCard.jsx";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu.jsx";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import SendMail from '../../assets/images/MainImages/sendMail.png';
import VkImage from '../../assets/images/MainImages/vkImage.png';
import TelegramImage from '../../assets/images/MainImages/telegramImage.png';
import FirstFloor from '../../assets/images/MainImages/firstFloor.png';
import SecondFloor from '../../assets/images/MainImages/secondFloor.png';
import ThirdFloor from '../../assets/images/MainImages/thirdFloor.png';
import { useNavigate } from "react-router-dom";
import PlaceButtonCard from "../../components/PlaceButtonCard/PlaceButtonCard.jsx";
import SecondStory from "../../components/DropDownMenuContent/SecondStory/SecondStory.jsx";

function NavigationPage() {
    const [currentFloor, setCurrentFloor] = useState(0);
    let navigate = useNavigate();
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

    const fields = [
        {
            label: 'Главная',
            currentPage: false,
            onClick: () => navigate('*')
        },
        {
            label: 'Мероприятия',
            currentPage: false,
            onClick: () => navigate('/events')
        },
        {
            label: 'Навигация',
            currentPage: true,
            onClick: () => navigate('/navigation')
        },
        {
            label: 'О музее',
            currentPage: false,
            onClick: () => navigate('/about')
        },
    ];

    const floors = [
        {
            image: FirstFloor,
            description: `1. Вход <br/>
                          2. Охрана <br/>
                          3. Касса <br/>
                          4. Сувениры <br/>
                          5. Гардероб <br/>
                          6. Татищевская библиотека <br/>
                          7. Служебное помещение <br/>
                          8. Антикафе <br/>
                          9. Туалет <br/>
                          10. Инсталляция «Дом Качки»`
        },
        {
            image: SecondFloor,
            description: `1. Интерактивная фотопанорама <br/>
                          2. Туалет <br/>
                          3. Вход на 2 этаж <br/>
                          4. Служебное помещение <br/>
                          5. Экспозиция «Археология» <br/>
                          6. Кинозал <br/>
                          7. Экспозиция «Екатеринбург XVIII век» <br/>
                          8. Главный зал «Площадь городских часов» <br/>
                          9. Зал очетных граждан <br/>
                          10. Экспозиция «Библиотека С. А. Тихоцкой»`
        },
        {
            image: ThirdFloor,
            description: `1. Администрация <br/>
                          2. Экспозиция «Екатеринбург XIX век» <br/>
                          3. Детский центр <br/>
                          4. Зал временных выставок`
        }
    ];

    const changeFloor = (direction) => {
        setCurrentFloor(prev => {
            const newFloor = prev + direction;
            if (newFloor < 0 || newFloor >= floors.length) {
                return prev;
            }
            return newFloor;
        });
    };

    const [openRedirectMenu, setOpenRedirectMenu] = useState(false);

    return (
        <div>
            <div className="header">
                <img src={Logo} className="logo" alt="Логотип" />
                <div className="header_menu">
                    <p className="text">Музей Истории Екатеринбурга</p>
                    <div className="line" />
                    <div className="button_container">
                        {fields.map((field, i) => (
                            <MenuButton label={field.label} key={i} currentPage={field.currentPage} onClick={field.onClick} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="navigation_buttons_cont">
                <div className="floor_change_button">
                    <p>Этаж {currentFloor}</p>
                    <div>

                        <svg  onClick={() => changeFloor(1)} xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
                            <path d="M15.0703 8.07129L7.99924 1.00022" stroke="#1C387E" stroke-linecap="round"/>
                            <path d="M8.07031 1L0.999245 8.07107" stroke="#1C387E" stroke-linecap="round"/>
                        </svg>

                        <svg onClick={() => changeFloor(-1)} xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
                            <path d="M1 1L8.07107 8.07107" stroke="#1C387E" stroke-linecap="round"/>
                            <path d="M8 8.07129L15.0711 1.00022" stroke="#1C387E" stroke-linecap="round"/>
                        </svg>

                    </div>
                </div>
                <button onClick={() => setOpenRedirectMenu(!openRedirectMenu)}>?</button>

                {openRedirectMenu && (
                    <div className={'question_container'}>
                        <p>
                            Ответы на вопросы, касающиеся навигации вы сможете найти в разделе “Как подготовиться к походу в музей”
                        </p>

                        <div className={'redirect_button'} onClick={() => navigate('/#preparation-section', { state: { fromNavigationPage: true } })}>
                            <p>Перейти к разделу</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
                                <path d="M1 1L6.5 6.5L1 12" stroke="#40B93C" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                )}

            </div>

            <div className="content_container">
                <div className="floor_image_cont">
                    <img src={floors[currentFloor].image} alt={`Этаж ${currentFloor}`} />
                    <p dangerouslySetInnerHTML={{ __html: floors[currentFloor].description }} />
                </div>
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

export default NavigationPage;