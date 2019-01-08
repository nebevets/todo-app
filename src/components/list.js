import React from 'react';
import Item from './item';
import {Link} from 'react-router-dom';

const List = props => {
    const listElements = props.data.map(
        (item, index) => {
            return <Item key={item._id} item={item} delete={()=>{props.delete(item._id)}}/>;
        }
    );
    return (
        <div>
            <h1 className="center">To Do List</h1>
            <div className="row">
                <div className="col s12 right-align">
                    <Link to="/add-item" className="btn purple lighten-2">Add Item</Link>
                </div>
            </div>
            <ul className="collection">{listElements}</ul>
        </div>
    );
}

export default List;