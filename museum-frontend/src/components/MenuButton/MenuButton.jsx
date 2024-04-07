import React from 'react';
import './MenuButton.scss';

export default function MenuButton({ label, key, currentPage,  width_of_line, onClick}) {

    return (
        <div key={key} style={{alignContent: "center", display: "flex", flexDirection: "column", position: "relative", cursor: 'pointer'}} onClick={onClick}>
            <p>{label}</p>
            {currentPage ? <div className={'long_underline'} style={{width: width_of_line}} /> : <div className={'underline'} />}
        </div>
    );
}
