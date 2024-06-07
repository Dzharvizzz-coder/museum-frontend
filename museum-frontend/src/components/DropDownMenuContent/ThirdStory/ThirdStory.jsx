import React, { useState } from 'react';
import './ThirdStory.scss';
import ThirdStory_1 from '../../../assets/images/MainImages/ThirdStory_1.png';
import ThirdStory_2_1 from '../../../assets/images/MainImages/ThirdStory_2_1.png';
import ThirdStory_2_2 from '../../../assets/images/MainImages/ThirdStory_2_2.png';
import ThirdStory_3 from '../../../assets/images/MainImages/ThirdStory_3.png';
import ThirdStory_4 from '../../../assets/images/MainImages/ThirdStory_4.png';
import ThirdStory_5 from '../../../assets/images/MainImages/ThirdStory_5.png';
import ThirdStory_6 from '../../../assets/images/MainImages/ThirdStory_6.png';
import ThirdStory_7 from '../../../assets/images/MainImages/ThirdStory_7.png';
import ThirdStory_8 from '../../../assets/images/MainImages/ThirdStory_8.png';

export default function ThirdStory() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            content: (
                <div className="story-content">
                    <img src={ThirdStory_1} alt="Image 1" />
                    <p>Когда я поднимусь на 1 этаж, я увижу цветной план залов музея.
                        План первого этажа отмечен серой цифрой 1 внутри белого прямоугольника.
                        На плане я смогу определить, где находится туалет.
                        На плане он отмечен слева от места, где я нахожусь.
                        Я также смогу сфотографировать план или попросить моего сопровождающего сфотографировать его.
                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content-diff">
                    <p>Туалет находится в левой части холла первого этажа.
                        Перед входом в туалет висит табличка «Туалет».

                    </p>
                    <div>
                        <img src={ThirdStory_2_1} alt="Image 2_1" />
                        <img src={ThirdStory_2_2} alt="Image 2_2" />
                    </div>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>В холле первого этажа я увижу большой экран с панорамой города.
                        Напротив панорамы стоит специальный экран, к которому нужно прикоснуться.
                        Картинку можно двигать, для этого нужно провести по экрану.
                    </p>
                    <img src={ThirdStory_3} alt="Image 3" />
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <img src={ThirdStory_4} alt="Image 4" />
                    <p>В холле я увижу бюст Георга Вильгельма де Генина,
                        Я не буду трогать его руками, а буду внимательно смотреть.
                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>Когда я зайду в первый зал музея, у меня попросят показать входной билет.
                        Я покажу билет, когда меня попросят.
                    </p>
                    <img src={ThirdStory_5} alt="Image 5" />
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <img src={ThirdStory_6} alt="Image 6" />
                    <p>При входе в зал я увижу большой экран.
                        На экране нарисованы минералы (камни).
                        Я могу потрогать экран и узнать много нового о минералах Урала

                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>В зале музея есть кинозал.
                        Наблюдающий зала может пригласить нас посмотреть фильм про историю Екатеринбурга.
                        Вокруг сидений кинозала установлены специальные шторы.
                        Перед началом фильма шторы начнут сдвигаться, чтобы экран было хорошо видно.
                        Я буду готов, когда шторы закроются и мне будет спокойно.

                    </p>
                    <img src={ThirdStory_7} alt="Image 7" />
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <img src={ThirdStory_8} alt="Image 8" />
                    <p>В зале музея есть много экспонатов, которые можно потрогать.
                        Один из таких экспонатов – это интерактивная книга.
                        Если книга закрыта, я осторожно открою её.
                        Я буду аккуратно перелистывать страницы за правый нижний уголок.
                        Я не буду подносить руки к экрану над книгой.

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