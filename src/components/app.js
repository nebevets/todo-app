import React, {Component} from 'react';
import axios from 'axios';
import List from './list';
import 'materialize-css/dist/css/materialize.min.css';
import AddItem from './add_item';
//import dummyListData from '../dummy_data/list_data';
import {Route} from 'react-router-dom';

const BASE_URL = 'http://api.reactprototypes.com';
const API_KEY = '?key=c718_nebevets';

class App extends Component{
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
            const response = await axios.get(`${BASE_URL}/todos${API_KEY}`);
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
    addItem = async item => {    
        try{
            const response = await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
            if(!response.data.success){
                throw new Error('something went horribly wrong');
            }
            this.getListData();
        }catch(error){
            console.error(error);
            this.setState({
                error: error.message
            });
        }
        /* this is using .then() promise, async/await not necessary
        axios.post(`${BASE_URL}/todos${API_KEY}`, item).then(
            response => {
                //console.log('add item response: ', response);
                this.getListData();
            }
        ).catch(
            error => {
                console.log('add item error', error);
                this.setState({
                    error: 'Error Adding Item. You must have forgotten something.'
                });
            }
        );
        */
    }
    deleteItem = async id => {
        try{
            const response = await axios.delete(`${BASE_URL}/todos/${id + API_KEY}`);
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
    // 41:42 pt6 video
    render(){
        const {list, error} = this.state;
        return (
            <div className="container">
                <Route path="/" exact render={ routingInfo => {
                    return <List {...routingInfo} error={error} data={list} delete={this.deleteItem}/>
                }}/>
                <Route path="/add-item" render={ routingInfo => {
                    return <AddItem {...routingInfo} add={this.addItem}/>
                }}/>
            </div>
        );
    }
}

export default App;