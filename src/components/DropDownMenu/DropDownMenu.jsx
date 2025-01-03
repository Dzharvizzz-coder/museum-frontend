import React from 'react';
import './DropDownMenu.scss';
import FirstStory from "../DropDownMenuContent/FirstStory/FirstStory.jsx";
import SecondStory from "../DropDownMenuContent/SecondStory/SecondStory.jsx";
import ThirdStory from "../DropDownMenuContent/ThirdStory/ThirdStory.jsx";
import FourStory from "../DropDownMenuContent/FourStory/FourStory.jsx";

const storyComponents = {
    FirstStory,
    SecondStory,
    ThirdStory,
    FourStory
};

export default function DropDownMenu({ name, storyComponentName, isOpen, toggleMenu,  isNextHidden, isLastItem  }) {
    const StoryComponent = storyComponents[storyComponentName];


    return (
        <div className={"body"}>
            <div onClick={toggleMenu} className={`drop_down_menu ${isNextHidden ? 'hidden_top_border' : ''}`}>
                <div className="menu_header">
                    <p>{name}</p>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <rect width="30" height="30" rx="15" fill="#F8F8F8" fillOpacity="0.5" />
                            <path d="M15 24L15 6" stroke="#F8F8F8" strokeLinecap="round" />
                            <path d="M15 24L15 6" stroke="#000000" strokeOpacity="0.65" strokeLinecap="round" />
                            <path d="M6 15L24 15" stroke="#F8F8F8" strokeLinecap="round" />
                            <path d="M6 15L24 15" stroke="#000000" strokeOpacity="0.65" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && StoryComponent && (
                <div className={`menu_content ${isOpen ? 'active' : ''}`}>
                    <StoryComponent />
                </div>
            )}
        </div>
    );
}
