import React, { Component } from 'react';
import Search from '../components/Search';
import Result from '../components/Result';

const BASE_URL = `https://api.github.com`;

class Home extends Component {
    constructor() {
        super();
        this.state = {
            responseData: [],
            query: ""
        }

        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(evt) {
        this.setState({
            query: evt.target.value
        })
    }

    async handleSearchSubmit(evt) {
        evt.preventDefault();
        
        if(!this.state.query) {
            return false;
        }

	    await fetch(`${BASE_URL}/search/users?q=${this.state.query}`, {
            headers: {
                'User-Agent': 'request'
            }})
            .then(response => {
			    if(response.ok) {
				    return response;
			    } throw Error(response.statusText);
		    })
		    .then( response => response.json() )
		    .then( data => {
                this.setState({
                    responseData: data
                })
		    })
		    .catch((error) => {
			    console.error('Error:', error);
		    });
    }

    render() {
        return (
            <>
                <Search handleSearchSubmit={this.handleSearchSubmit} handleChange={this.handleChange}/>
			    <Result data={this.state.responseData} />
            </>
        );
    }
}

export default Home;
