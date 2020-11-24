import React from 'react';
import NavBar from './nav/navbar.js';

import SideItems from './student-center/shared/side-items.js';

import './page.css';


const Page = (props) => {
    return (
        <div className="page">
            <NavBar active={props.active} />
            <div className={`content`}>
                {(props.sideItems)? <div className="side-items-container"><SideItems /></div> : null}
                <div className={`inner-content ${(props.sideItems) ? "has-side-items" : null}`}>
                    {props.content}
                </div>
            </div>
            
        </div>
    )
}

export default Page;