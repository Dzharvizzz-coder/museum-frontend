import React, { useState } from 'react';
import './TicketPopUp.scss';

export default function TicketPopUp({ name, place, onClick, ticketPrices }) {
    const [ticketCounts, setTicketCounts] = useState({
        child: 0,
        discounted: 0,
        adult: 0
    });

    const hasTicketType = (type) => ticketPrices && ticketPrices.some(price => price.price_type === type);

    const getTicketPrice = (type) => {
        const ticket = ticketPrices.find(price => price.price_type === type);
        return ticket ? ticket.price : 0;
    };

    const updateTicketCount = (type, delta) => {
        setTicketCounts((prevCounts) => {
            const newCount = Math.max(prevCounts[type] + delta, 0);
            return { ...prevCounts, [type]: newCount };
        });
    };

    const getTotalPrice = () => {
        return (
            ticketCounts.child * getTicketPrice('Детский билет') +
            ticketCounts.discounted * getTicketPrice('Льготный билет') +
            ticketCounts.adult * getTicketPrice('Взрослый билет')
        );
    };

    return (
        <div className={"body_of_popup"}>
            <div className={'popup'}>
                <svg onClick={onClick} className={'exit_button'} xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                    <path d="M10.6069 31.8203L31.8201 10.6071" stroke="black" strokeLinecap="round"/>
                    <path d="M31.8188 31.8203L10.6056 10.6071" stroke="black" strokeLinecap="round"/>
                </svg>

                <div className={'popup_info'}>
                    <div className={'popup_header'}>
                        <p>{name}</p>
                        <p>{place}</p>
                    </div>

                    {hasTicketType("Детский билет") && (
                        <div className={'choise_ticket_cont'}>
                            <div className={'choise_ticket_cont__ganga'}>
                                <p>Детский билет</p>
                                <p>Входной детский (до 14 лет включительно)</p>
                            </div>
                            <div className={'choise_ticket_cont__price'}>
                                <p>{getTicketPrice("Детский билет")} Р</p>
                                <div className={'choise_ticket_cont__price__counter'}>
                                    <button onClick={() => updateTicketCount('child', -1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                                            <path d="M0.5 1H10.5" stroke="white" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                    <p>{ticketCounts.child}</p>
                                    <button onClick={() => updateTicketCount('child', 1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                            <path d="M0.5 6H10.5" stroke="white" strokeLinecap="round"/>
                                            <path d="M5.5 11L5.5 1" stroke="white" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {hasTicketType("Льготный билет") && (
                        <div className={'choise_ticket_cont'}>
                            <div className={'choise_ticket_cont__ganga'}>
                                <p>Льготный билет</p>
                                <p>Входной льготный (пенсионеры, студенты ССУЗов и ВУЗов)</p>
                            </div>
                            <div className={'choise_ticket_cont__price'}>
                                <p>{getTicketPrice("Льготный билет")} Р</p>
                                <div className={'choise_ticket_cont__price__counter'}>
                                    <button onClick={() => updateTicketCount('discounted', -1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                                            <path d="M0.5 1H10.5" stroke="white" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                    <p>{ticketCounts.discounted}</p>
                                    <button onClick={() => updateTicketCount('discounted', 1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                            <path d="M0.5 6H10.5" stroke="white" strokeLinecap="round"/>
                                            <path d="M5.5 11L5.5 1" stroke="white" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {hasTicketType("Взрослый билет") && (
                        <div className={'choise_ticket_cont'}>
                            <div className={'choise_ticket_cont__ganga'}>
                                <p>Взрослый билет</p>
                                <p>Входной взрослый</p>
                            </div>
                            <div className={'choise_ticket_cont__price'}>
                                <p>{getTicketPrice("Взрослый билет")} Р</p>
                                <div className={'choise_ticket_cont__price__counter'}>
                                    <button onClick={() => updateTicketCount('adult', -1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                                            <path d="M0.5 1H10.5" stroke="white" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                    <p>{ticketCounts.adult}</p>
                                    <button onClick={() => updateTicketCount('adult', 1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                            <path d="M0.5 6H10.5" stroke="white" strokeLinecap="round"/>
                                            <path d="M5.5 11L5.5 1" stroke="white" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={"last_container"}>
                        <p className={"total_price"}>Итоговая стоимость: {getTotalPrice()} Рублей</p>
                        <button className={"confirm"}>
                            Купить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
