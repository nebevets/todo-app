import React, {Component} from 'react';

class AddItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            details: ''
        };
    }
    handleAddItem = event => {
        event.preventDefault();
        this.props.add(this.state);
        this.setState({
            title: '',
            details: ''
        });
    }
    render(){
        const {title, details} = this.state;
        return (
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
        );
    }
}

export default AddItem;