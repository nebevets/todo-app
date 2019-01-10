import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
    return (
        <div className="row">
            <div className="col s12 right-align">
                <Link className={`btn ${props.color}`} to={props.to || '/'}>{props.text}</Link>
            </div>
        </div>
    )
}