import React from 'react';
import './EventCard.scss';
import MuseumImage from '../../assets/images/TempImages/MuseumImage.jpg'

export default function LastEventCard() {

    return (
        <div className={'card_body'}>

            <div className={'image_container_2'}>
                <div className={'opacity_effect'}/>
                <img src={MuseumImage} alt={'фото мероприятий'} className={'card_image_2'}/>
            </div>

            <p className={"more_text"}>Посмотреть все мероприятия ›</p>

        </div>
    );
}
