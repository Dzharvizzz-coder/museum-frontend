import React, { useState } from 'react';
import './FourStory.scss';
import FourStory_1 from '../../../assets/images/MainImages/FourStory_1.png';
import FourStory_2 from '../../../assets/images/MainImages/FourStory_2.png';
import FourStory_3_1 from '../../../assets/images/MainImages/FourStory_3_1.png';
import FourStory_3_2 from '../../../assets/images/MainImages/FourStory_3_2.png';
import FourStory_4_1 from '../../../assets/images/MainImages/FourStory_4_1.png';
import FourStory_4_2 from '../../../assets/images/MainImages/FourStory_4_2.png';
import FourStory_5 from '../../../assets/images/MainImages/FourStory_5.png'
import FourStory_6 from '../../../assets/images/MainImages/FourStory_6.png';
import FourStory_7 from '../../../assets/images/MainImages/FourStory_7.png';
import FourStory_8 from '../../../assets/images/MainImages/FourStory_8.png';
export default function FourStory() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            content: (
                <div className="story-content">
                    <img src={FourStory_1} alt="Image 1" />
                    <p>Когда я закончу обзор первого этажа, я смогу подняться на второй этаж музея.
                        Я поднимусь по лестнице, которая находится за стеклянной дверью возле цветного указателя в холле первого этажа.
                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>На втором этаже очень интересно.
                        Здесь нас ждут экспонаты, которые можно трогать руками.
                        На втором этаже я увижу витрину со старинными монетами.
                        Каждую монету можно рассмотреть поближе с помощью лупы.
                        Перекладину с лупой можно двигать к себе и от себя, а саму лупу в лево и вправо.
                    </p>
                    <img src={FourStory_2} alt="Image 2" />
                </div>
            )
        },
        {
            content: (
                <div className="story-content-diff">
                    <p>
                        После изучения монет я посмотрю второй этаж музея дальше.
                        Я пройду прямо и увижу макет с маленькими белыми домиками – это макет зданий, стоящих на Плотинке.
                        Если я занесу ладонь над макетом здания, на экране будет написано про это здание.

                    </p>
                    <div>
                        <img src={FourStory_3_1} alt="Image 3_1" />
                        <img src={FourStory_3_2} alt="Image 3_2" />
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="story-content-diff">
                    <p>Вдоль стены я увижу ячейки с экспонатами.
                        Некоторые ячейки нужно выдвинуть самостоятельно. Специальные ячейки выглядят как вертикальные ручки, которые нужно потянуть на себя.
                    </p>
                    <div>
                        <img src={FourStory_4_1} alt="Image 4_1" />
                        <img src={FourStory_4_2} alt="Image 4_2" />
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <img src={FourStory_5} alt="Image 5" />
                    <p>В зале музея очень много стеклянных стеллажей.
                        Я буду внимательно изучать экспонаты.
                        Если мне что-то интересно или непонятно, я спрошу об этом у сопровождающего.

                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>В конце зала я увижу вход в другую экспозицию.
                        В этом зале находится временная экспозиция, она тоже очень интересная.
                    </p>
                    <img src={FourStory_6} alt="Image 6" />
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <img src={FourStory_7} alt="Image 7" />
                    <p>Когда я закончу осмотр основной экспозиции на втором этаже, я перейду в детский музейный центр.
                        Вход в детский музейный центр находится посередине зала, к нему можно пройти от стеллажа со старинными монетами.
                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>Около детского музейного центра расположены удобные кресла.
                        В кресле я могу посидеть и отдохнуть.
                    </p>
                    <img src={FourStory_8} alt="Image 8" />
                </div>
            )
        },

        {
            content: (
                <div className="story-content-diff-last">
                    <p>В музее мне будет очень интересно.
                        Я узнаю много нового.
                        После экскурсии я обязательно расскажу о своем опыте друзьям и родителям.
                    </p>
                </div>
            )
        },
    ];

    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + pages.length) % pages.length);
    };

    return (
        <div className="multi-page-div">
            <div className="navigation navigation-left">
                {currentPage > 0 &&

                    <svg onClick={handlePrev} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.2">
                            <circle cx="25" cy="25" r="25" fill="black" fill-opacity="0.5"/>
                            <path d="M31.1426 39.5L17.0004 25.3579" stroke="white" stroke-width="3" stroke-linecap="round"/>
                            <path d="M31.1426 10.5L17.0004 24.6421" stroke="white" stroke-width="3" stroke-linecap="round"/>
                        </g>
                    </svg>

                }
            </div>
            <div className="content">
                {pages[currentPage].content}
            </div>
            <div className="navigation navigation-right">
                {currentPage < pages.length - 1 &&

                    <svg onClick={handleNext} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.2">
                            <circle cx="25" cy="25" r="25" fill="black" fill-opacity="0.5"/>
                            <path d="M19 10.5L33.1421 24.6421" stroke="white" stroke-width="3" stroke-linecap="round"/>
                            <path d="M19 39.5L33.1421 25.3579" stroke="white" stroke-width="3" stroke-linecap="round"/>
                        </g>
                    </svg>

                }
            </div>
            <div className="indicators">
                {pages.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentPage ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}