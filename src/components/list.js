import React from 'react';

const List = props => {
    const listElements = props.data.map(
        (item, index) => {
            return <li key={item._id} className="collection-item">{item.title}</li>;
        }
    );
    return (
        <ul className="collection">{listElements}</ul>
    );
}

export default List;