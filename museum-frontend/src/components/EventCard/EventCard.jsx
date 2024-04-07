import React from 'react';
import './EventCard.scss';
import PushkinCard from '../../assets/images/MainImages/puskinCard.png'
import PeopleWithDisabilitiesImage from '../../assets/images/MainImages/peopleWithDisabilities.png'

export default function EventCard({key, price, name, date, time, place, cardImage, needPrice, fixedPrice}) {

    return (
        <div key={key} className={'card_body'}>

            <div className={'image_container'}>
                <div className={'opacity_effect'}/>
                <img src={PushkinCard} alt={'Пушкинская карта'} className={'pushkin_card'}/>
                <img src={cardImage} alt={'мероприятие'} className={'card_image'}/>
            </div>

            <div className={'card_info_container'}>

                <img alt={'мероприятие доступно для инвалидов'} src={PeopleWithDisabilitiesImage} className={'people'}/>

                <div style={{ width: "100%", height: "0.85vw"}}>
                    {needPrice ?
                        (fixedPrice ?
                                <p><b>{price}</b>&ensp;рублей</p>
                                :
                                <p style={{marginLeft: "7.5%", marginTop: "4%"}}>от&ensp;<b style={{marginLeft: '0'}}>{price}</b>&ensp;рублей</p>
                        )
                        :
                        <p style={{marginLeft: "7.5%", marginTop: "4%"}}>Вход свободный</p>
                    }
                </div>

                <div className={'name_of_event'}>
                    <p>{name}</p>
                </div>

                <div className={'date_container'}>
                    <p>{date} {time}, {place}</p>
                </div>

                <button className={'ticket_button'}>Билеты</button>
            </div>
        </div>
    );
}
