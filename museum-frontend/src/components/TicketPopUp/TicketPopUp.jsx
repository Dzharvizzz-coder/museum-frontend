import React from 'react';
import './TicketPopUp.scss';

export default function TicketPopUp({ name, place, onClick, ticketPrices }) {
    // Функция для проверки наличия определенного типа билета в массиве цен
    const hasTicketType = (type) => ticketPrices && ticketPrices.some(price => price.price_type === type);

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
                                <p>{ticketPrices.find(price => price.price_type === "Детский билет").price} Р</p>
                                <div className={'choise_ticket_cont__price__counter'}>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                                        <path d="M0.5 1H10.5" stroke="white" strokeLinecap="round"/>
                                    </svg></button>
                                    <p>0</p>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <path d="M0.5 6H10.5" stroke="white" strokeLinecap="round"/>
                                        <path d="M5.5 11L5.5 1" stroke="white" strokeLinecap="round"/>
                                    </svg></button>
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
                                <p>{ticketPrices.find(price => price.price_type === "Льготный билет").price} Р</p>
                                <div className={'choise_ticket_cont__price__counter'}>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                                        <path d="M0.5 1H10.5" stroke="white" strokeLinecap="round"/>
                                    </svg></button>
                                    <p>0</p>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <path d="M0.5 6H10.5" stroke="white" strokeLinecap="round"/>
                                        <path d="M5.5 11L5.5 1" stroke="white" strokeLinecap="round"/>
                                    </svg></button>
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
                                <p>{ticketPrices.find(price => price.price_type === "Взрослый билет").price} Р</p>
                                <div className={'choise_ticket_cont__price__counter'}>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="11" height="2" viewBox="0 0 11 2" fill="none">
                                        <path d="M0.5 1H10.5" stroke="white" strokeLinecap="round"/>
                                    </svg></button>
                                    <p>0</p>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <path d="M0.5 6H10.5" stroke="white" strokeLinecap="round"/>
                                        <path d="M5.5 11L5.5 1" stroke="white" strokeLinecap="round"/>
                                    </svg></button>
                                </div>
                            </div>
                        </div>
                    )}

                    <button className={"confirm"}>Купить</button>
                </div>
            </div>
        </div>
    );
}
