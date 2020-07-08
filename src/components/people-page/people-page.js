import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './people-page.css';

export default class PeoplePage extends Component {

    state = {
        selectedPerson: 3,
        hasError: false
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }

    onPersonSelected = id => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorPeople/>
        }
        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onPersonSelected={this.onPersonSelected}></ItemList>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson}></PersonDetails>
                </div>
            </div>
        );
    }
}

const ErrorPeople = () => {
    return (
        <React.Fragment>
            <h1>BOOM!</h1>
            <span className="err">error</span>
        </React.Fragment>
    )
};