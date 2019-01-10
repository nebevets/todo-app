import React, {Component} from 'react';
import NavBtn from './nav_btn';
import axios from 'axios';
import config from '../config';


class AddItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            details: '',
            error: ''
        };
    }
    handleAddItem = async event => {
        event.preventDefault();
        try{
            await axios.post(`${config.API_URL}/todos${config.API_KEY}`, this.state);
            this.props.history.push('/');
        }catch(error){
            console.error(error);
            this.setState({
                error: error.message
            });
        }
    }
    render(){
        const {title, details, error} = this.state;
        return (
            <div>
                <h1 className="center">Add To Do Item</h1>
                <NavBtn to="/" text="Back to List" color="purple lighten-2" />
                <p className="red-text">{error}</p>
                <form onSubmit={this.handleAddItem}>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <label>title</label>
                        <input
                            value={title}
                            onChange={
                                event => this.setState({title: event.target.value})
                            }
                        />
                        <label>details</label>
                        <input
                            value={details}
                            onChange={
                                event => this.setState({details: event.target.value})
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s8 offset-s2 right-align">
                        <button className="btn purple lighten-2">Add Item</button>
                    </div>
                </div>
                </form>
            </div>
        );
    }
}

export default AddItem;