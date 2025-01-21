import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/MainImages/logo.svg';
import './PaymentSuccess.scss';
import MenuButton from "../../components/MenuButton/MenuButton.jsx";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import SendMail from '../../assets/images/MainImages/sendMail.png';
import VkImage from '../../assets/images/MainImages/vkImage.png';
import TelegramImage from '../../assets/images/MainImages/telegramImage.png';
import { useNavigate } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Loader from "../../components/Loader/Loader.tsx";
import UserPlaybillPlaceholder from "../../components/UserPlaybillPlaceholder/UserPlaybillPlaceholder.jsx";


function PaymentSuccess() { 
    const [timeLeft, setTimeLeft] = useState(10); // Таймер на 10 секунд

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const getMessage = () => {
        if (timeLeft > 5) return "Спасибо за покупку! Возвращаем вас в приложение.";
        if (timeLeft > 0) return "Подготовка завершена. Сейчас вы вернётесь.";
        return "Время вышло! Пожалуйста, вернитесь в приложение самостоятельно.";
    };

    return (
        <div className="timer-page">
            <h1 className="timer">{getMessage()}</h1>
            {timeLeft > 0 && <p className="timer-countdown">Осталось времени: {timeLeft} сек</p>}
        </div>
    );
}

export default PaymentSuccess;