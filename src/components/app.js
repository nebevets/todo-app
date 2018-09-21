import React, {Component} from 'react';
import axios from 'axios';
import List from './list';
import 'materialize-css/dist/css/materialize.min.css';
import AddItem from './add_item';
import dummyListData from '../dummy_data/list_data';

const BASE_URL = 'http://api.reactprototypes.com';
const API_KEY = '?key=c718_nebevets';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            error: '' // this is for setting error message state
        }
    }
    componentDidMount(){
        this.getListData();
    }
    async getListData(){
        /* this is using .then() promise
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
       try{
            const response = await axios.get(`${BASE_URL}/todos${API_KEY}`);
            if(!response.data.success){
                throw new Error('Something went wrong');
            }
            this.setState({
                list: response.data.todos
            });
       }catch(error){
            console.log(error);
            this.setState({
                error: error.message
            });
       }
    }
    addItem = async item => {
        /* this is using .then() promise
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

        const response = await axios.post(`${BASE_URL}/todos${API_KEY}`, item);
        this.getListData();
    }
    deleteItem = async id => {
        /* dummy data deleteItem code
        const {list} = this.state;
        const listCopy = list.slice();
        listCopy.splice(index, 1);
        this.setState({
            list: listCopy
        });
        */
        //console.log('deleting item: ', id);
        await axios.delete(`${BASE_URL}/todos/${id + API_KEY}`);
        this.getListData();
    }
    render(){
        const {list, error} = this.state;
        return (
            <div className="container">
                <h1 className="center">To Do List</h1>
                <AddItem add={this.addItem}/>
                <p className="red-text">{error}</p>
                <List data={list} delete={this.deleteItem}/>
            </div>
        );
    }
}

export default App;