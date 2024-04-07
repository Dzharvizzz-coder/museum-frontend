import React from 'react';
import './SearchInput.scss';

export default function SearchInput({placeholder, width, image}) {

    return (
        <div className={"body_of_input"}>
            <input placeholder={placeholder} style={{width: width}}/>
            <button>
                <img src={image} alt={'Отправить свой e-mail'}/>
            </button>
        </div>
    );
}
