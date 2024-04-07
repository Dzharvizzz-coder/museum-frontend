import React from 'react';
import './DropDownMenu.scss';
import Plus from '../../assets/images/MainImages/Plus.svg'

export default function DropDownMenu({key, name}) {

    return (
        <div key={key} className={"drop_down_menu"}>
            <p>{name}</p>
            <button>
                <img className={'button_image'} src={Plus} alt={'развернуть меню'}/>
            </button>
        </div>
    );
}
