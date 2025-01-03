import React from 'react';
import './UserPlaybillPlaceholder.scss';

export default function UserPlaybillPlaceholder({ main, onClick, mb }) {

    return (
        <div className={"body_of_placeholder"} style={{ marginBottom: mb }}>
            <div className={"content_body"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="174" height="189" viewBox="0 0 174 189" fill="none">
                    <path d="M50.2318 169H28C14.1929 169 3 157.807 3 144V44C3 30.1929 14.1929 19 28 19H128C141.807 19 153 30.1929 153 44V95.3251" stroke="#1C387E" stroke-width="5" stroke-linecap="round"/>
                    <line x1="3" y1="46.5" x2="153" y2="46.5" stroke="#1C387E" stroke-width="5"/>
                    <path d="M112.005 79.25C114.892 74.25 122.108 74.25 124.995 79.25L170.462 158C173.348 163 169.74 169.25 163.966 169.25H73.0337C67.2602 169.25 63.6517 163 66.5385 158L112.005 79.25Z" stroke="#1C387E" stroke-width="5"/>
                    <path d="M46.5 4C46.5 2.067 44.933 0.5 43 0.5C41.067 0.5 39.5 2.067 39.5 4L46.5 4ZM39.5 4L39.5 19L46.5 19L46.5 4L39.5 4Z" fill="#1C387E"/>
                    <path d="M119 99L119 139" stroke="#1C387E" stroke-width="7" stroke-linecap="round"/>
                    <path d="M119 152L119 153" stroke="#1C387E" stroke-width="7" stroke-linecap="round"/>
                    <path d="M116.5 4C116.5 2.067 114.933 0.5 113 0.5C111.067 0.5 109.5 2.067 109.5 4L116.5 4ZM109.5 4L109.5 19L116.5 19L116.5 4L109.5 4Z" fill="#1C387E"/>
                </svg>
                <div className={"content_p"}>
                    <p className={"first"}>
                        Подходящих событий не найдено
                    </p>
                    <p className={"second"}>
                        Попробуйте выбрать другие фильтры
                    </p>
                </div>
            </div>

            {main &&
                <div className={"return_cont"}>
                    <p>
                        Чтобы сформировать афишу снова, нажмите
                    </p>
                    <button onClick={onClick}>сюда</button>
                </div>
            }
        </div>
    );
}
