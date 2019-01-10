import React, {Component} from 'react';
import List from './list';
import 'materialize-css/dist/css/materialize.min.css';
import AddItem from './add_item';
import {Route} from 'react-router-dom';

class App extends Component{
    render(){
        return (
            <div className="container">
                <Route path="/" exact component={List}/>
                <Route path="/add-item" component={AddItem}/>
            </div>
        );
    }
}
export default App;