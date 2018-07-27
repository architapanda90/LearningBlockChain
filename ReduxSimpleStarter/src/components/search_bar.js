import React,{Component} from 'react';
class SearchBar extends Component //class component of react.
{
    constructor(props)
    {
        super(props);// props is the method defined inside parent class Component, so to call it in child class SearchBar super keyword is used
        this.state={term:''};//state of a component is a javascript object which is only available for class react component and is always defined inside constructor
    }
    render()
    {
        return (
		<div>
		<input 
			value={this.state.term}
			onChange={(event) => this.setState({term:event.target.value})} />
		</div>
		);
    }
}

export default SearchBar; 