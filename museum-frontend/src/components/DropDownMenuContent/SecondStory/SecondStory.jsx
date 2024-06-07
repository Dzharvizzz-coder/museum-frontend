import React, { useState } from 'react';
import './SecondStory.scss';
import SecondStory_1 from '../../../assets/images/MainImages/SecondStory_1.png';
import SecondStory_2 from '../../../assets/images/MainImages/SecondStory_2.png';
import SecondStory_3 from '../../../assets/images/MainImages/SecondStory_3.png';
import SecondStory_5_1 from '../../../assets/images/MainImages/SecondStory_5_1.png';
import SecondStory_5_2 from '../../../assets/images/MainImages/SecondStory_5_2.png';
import SecondStory_6_1 from '../../../assets/images/MainImages/SecondStory_6_1.png';
import SecondStory_6_2 from '../../../assets/images/MainImages/SecondStory_6_2.png';
import SecondStory_7 from '../../../assets/images/MainImages/SecondStory_7.png';
import SecondStory_8 from '../../../assets/images/MainImages/SecondStory_8.png';

export default function SecondStory() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            content: (
                <div className="story-content">
                    <img src={SecondStory_1} alt="Image 1" />
                    <p>Когда я зайду внутрь и окажусь в холле музея.
                        Холл находится на 0 этаже.
                        Я увижу кассу.
                        Там меня встретит человек, у которого я куплю билеты в музей.
                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>Я возьму билет.
                        Если у меня возникнут вопросы, я задам их человеку на кассе.
                    </p>
                    <img src={SecondStory_2} alt="Image 2" />
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <img src={SecondStory_3} alt="Image 3" />
                    <p>Я внимательно ознакомлюсь с планом музея, в нем написано, что есть в музее.
                        Я сфотографирую план музея на свой телефон или камеру.
                        Если у меня не будет своего телефона или камеры, я попрошу моего сопровождающего сфотографировать план музея, так я ничего не забуду и не потеряюсь.
                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content-diff">
                    <p>В музее есть гардероб. Он находится в холле музея. В гардеробе я могу оставить свою верхнюю одежду. Я также могу оставить в гардеробе свою сумку или рюкзак. В гардеробе мне дадут специальную бирку, которую я сохраню до конца моей экскурсии.
                    </p>
                    <div>
                        <img src={SecondStory_5_1} alt="Image 5_1" />
                        <img src={SecondStory_5_2} alt="Image 5_2" />
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="story-content-diff">
                    <p>Напротив гардероба расположена библиотека.
                        На стене я увижу текст, посвященный Василию Никитичу Татищеву.
                        В библиотеке я смогу посмотреть интересующие меня книги.
                        После того, как я изучу книги, я поставлю их на место.

                    </p>
                    <div>
                        <img src={SecondStory_6_1} alt="Image 6_1" />
                        <img src={SecondStory_6_2} alt="Image 6_2" />
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>Чтобы посмотреть основную выставку музея, нужно отсканировать билет с помощью специального устройства.
                        Я подойду к турникету, который находится напротив кассы или напротив библиотеки.
                        Считывающее устройство оранжевого цвета.
                        Я поднесу билет с кодом к специальному окошку на оранжевом устройстве.
                    </p>
                    <img src={SecondStory_7} alt="Image 7" />
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <img src={SecondStory_8} alt="Image 8" />
                    <p>Когда устройство отсканирует мой билет, я смогу пройти через турникет.
                        Я поднимусь по лестнице на первый этаж музея.
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