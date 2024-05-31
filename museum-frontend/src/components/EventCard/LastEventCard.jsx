import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.scss';
import MuseumImage from '../../assets/images/TempImages/MuseumImage.png'

export default function LastEventCard() {
    return (
        <div className={'card_body'}>
            <Link to="/events" className={'link_to_events'}>
                <div className={'image_container_2'}>
                    <div className={'opacity_effect'}/>
                    <img src={MuseumImage} alt={'фото мероприятий'} className={'card_image_2'}/>
                </div>
                <p className={"more_text"}>Посмотреть все мероприятия ›</p>
            </Link>
        </div>
    );
}
