import React, {Component} from 'react';
import Item from './item';
import NavBtn from './nav_btn';
import axios from 'axios';
import config from '../config';


class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            error: '' // this is for setting error message
        }
    }
    componentDidMount(){
        this.getListData();
    }
    async getListData(){
        if(this.state.error !== ''){
            this.setState({
                error: ''
            });
        }
        try{
            const response = await axios.get(`${config.API_URL}/todos${config.API_KEY}`);
            if(!response.data.success){
                throw new Error('sum ting wong');
            }
            this.setState({
                list: response.data.todos
            });
        }catch(error){
            console.error(error);
            this.setState({
                error: error.message
            });
        }
        /* this is using .then() promise, async/await not necessary
        //call server to get data
        const response = axios.get(`${BASE_URL}/todos${API_KEY}`).then(
            response => {
                //console.log('server response: ', response);
                this.setState({
                    list: response.data.todos
                });
            }
        ).catch(
            error => {
                console.log('add item error', error);
                
            }
        );
        //console.log('axio return value: ', response); //this is a way to tell if there is a promise
        */
    }
    deleteItem = async id => {
        try{
            const response = await axios.delete(`${config.API_URL}/todos/${id + config.API_KEY}`);
            if(!response.data.success){
                throw new Error('oh, the humanity');
            }
            this.getListData(); 
        }catch(error){
            console.error(error);
            this.setState({
                error: error.message
            });
        }
        /* dummy data deleteItem code
        const {list} = this.state;
        const listCopy = list.slice();
        listCopy.splice(index, 1);
        this.setState({
            list: listCopy
        });
        */
        //console.log('deleting item: ', id);
    }
    render (){
        const {error, list} = this.state;
        const listElements = list.map((item, index) => {
            return <Item key={item._id} item={item} delete={()=>{this.deleteItem(item._id)}}/>;
        });
        return (
            <div>
                <h1 className="center">To Do List</h1>
                <NavBtn to="/add-item" color="purple lighten-2" text="Add Item" />
                <p className="red-text">{error}</p>
                <ul className="collection">{listElements}</ul>
            </div>
        );
    }
    
}

export default List;