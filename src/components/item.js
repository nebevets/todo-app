import React from 'react';

const Item = props => {
    return (
        <li className="collection-item row">
            <div className="col s8">
                {props.item.title}
            </div>
            <div className="col s4 right-align">
                <button className="btn red lighten-2" onClick={props.delete}>X</button>
            </div>
        </li>
    );
}
export default Item;