import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../item-details';
import './people-page.css';
import ErrorBoundry from '../error-boundry/error-boundry';
import ErrorAlert from '../error-alert/error-alert';
import Row from '../row/row';


export default class PeoplePage extends Component {

    state = {
        selectedPerson: 3
    };

    onPersonSelected = id => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {

        const itemlist = (
            <ItemList
            renderItems={item => item.name}
            getData={this.props.getData} 
            onPersonSelected={this.onPersonSelected}
            ></ItemList>
        );

        const personDetails = (
            <PersonDetails personId={this.state.selectedPerson}></PersonDetails>
        );
          
        if (this.state.hasError) {
            return <ErrorAlert/>
        }
        return (
            <ErrorBoundry>
                <Row left={ itemlist } right={ personDetails }/>
            </ErrorBoundry>
        );
    }
}


