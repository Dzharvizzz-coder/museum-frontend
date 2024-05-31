import React from 'react';
import './DropDownMenu.scss';
import Plus from '../../assets/images/MainImages/Plus.svg'

export default function DropDownMenu({key, name}) {

    return (
        <div key={key} className={"drop_down_menu"}>
            <p>{name}</p>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect width="30" height="30" rx="15" fill="#F8F8F8" fill-opacity="0.5"/>
                    <path d="M15 24L15 6" stroke="#F8F8F8" stroke-linecap="round"/>
                    <path d="M15 24L15 6" stroke="#000000" stroke-opacity="0.65" stroke-linecap="round"/>
                    <path d="M6 15L24 15" stroke="#F8F8F8" stroke-linecap="round"/>
                    <path d="M6 15L24 15" stroke="#000000" stroke-opacity="0.65" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    );
}
