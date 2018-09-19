import React, {Component} from 'react';
import List from './list';
import 'materialize-css/dist/css/materialize.min.css';
import AddItem from './add_item';
import dummyListData from '../dummy_data/list_data';


class App extends Component{
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
    addItem = item => {
        item._id = new Date().getTime();
        this.setState({
            list: [item, ...this.state.list]
        })
    }
    render(){
        const {list} = this.state;
        return (
            <div className="container">
                <h1 className="center">To Do List</h1>
                <AddItem add={this.addItem}/>
                <List data={list}/>
            </div>
        );
    }
}

export default App;