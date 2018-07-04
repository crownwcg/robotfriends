import React, { Component } from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField } from '../actions'

const mapStateToProps = state => ({
    searchfield: state.searchfield
})

const mapDispatchToProps = dispatch => ({
    onSearchChange: (e) => dispatch(setSearchField(e.target.value))
})

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots:[],
        }
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {this.setState({robots: users})});
    }

    render() {
        const { robots } = this.state;
        const { searchfield, onSearchChange } = this.props 
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ?
            <h1 className='tc'>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RobotFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);