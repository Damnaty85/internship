import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleSearchSubmit: [],
            handleChange: ""
        };
    }

    render() {
        return (
            <>
                <form onSubmit={this.props.handleSearchSubmit}>
                    <h3>Search for users in the GitHub database</h3>
                    <input type="search" placeholder="Start typing user login..." onChange={this.props.handleChange}/>
                </form>
            </>
        );
    }
}

export default Search;
