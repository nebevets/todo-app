import React, {Component} from 'react';
import dummyListData from '../dummy_data/list_data';

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount(){
        this.getListData();
    }
    getListData(){
        //call server to get data
        this.setState({
            list: dummyListData
        });
    }
    render(){
        const listElements = this.state.list.map(
            (item, index) => {
                return <li key={item._id} className="collection-item">{item.title}</li>;
            }
        );
        return (
            <ul className="collection">{listElements}</ul>
        );
    }
}

export default List;