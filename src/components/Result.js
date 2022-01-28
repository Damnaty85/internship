import React, { Component } from 'react';
import UserList from './UserList';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    render() {
        if(!this.props.data.items) {
            return false
        }
        return (
            <div className="result">
                {
                    this.props.data.items.map((item) => (
                        <UserList key={item.id} {...item}/>
                    ))
                }
            </div>
        );
    }
}

export default Result;
