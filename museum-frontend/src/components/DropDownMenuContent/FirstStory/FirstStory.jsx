import React, { useState } from 'react';
import './FirstStory.scss';
import FirstStory_1 from '../../../assets/images/MainImages/FirstStory_1.png';
import FirstStory_2 from '../../../assets/images/MainImages/FirstStory_2.png';
import FirstStory_3 from '../../../assets/images/MainImages/FirstStory_3.png';
import FirstStory_4 from '../../../assets/images/MainImages/FirstStory_4.png';

export default function FirstStory() {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            content: (
                <div className="story-content">
                    <img src={FirstStory_1} alt="Image 1" />
                    <p>Сегодня я пойду в Музей истории Екатеринбурга.
                        В нем я узнаю много нового об истории города.
                        В музее я буду соблюдать правила поведения.
                        Я буду вести себя тихо и осторожно, чтобы другим гостям музея тоже было комфортно.
                        Я подойду к музею истории Екатеринбурга на улице Карла Либкнехта 26.
                        С левой стороны здания я увижу большие черные двери.
                    </p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>Я подойду к двери и открою её, потянув ручку на себя, затем войду в здание музея.</p>
                    <img src={FirstStory_2} alt="Image 2" />
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <img src={FirstStory_3} alt="Image 3" />
                    <p>Когда я зайду в музей, я увижу лестницу, которая ведет вниз.
                        Я спущусь по ней вниз.
                        Я буду вести себя осторожно на лестнице, буду спускаться небыстрым шагом.</p>
                </div>
            )
        },
        {
            content: (
                <div className="story-content">
                    <p>Когда я спущусь по лестнице вниз, я увижу две двери с надписью «ВХОД».
                        Я войду в одну из дверей, потянув ручку на себя.</p>
                    <img src={FirstStory_4} alt="Image 4" />
                </div>
            )
        }
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