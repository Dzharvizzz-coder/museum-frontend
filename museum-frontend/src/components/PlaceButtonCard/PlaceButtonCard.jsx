import React from 'react';
import './PlaceButtonCard.scss';

export default function PlaceButtonCard({key}) {

    return (
        <div key={key} className={'place_button_cont'}>
            <button className={'place_button'}></button>
        </div>
    );
}
