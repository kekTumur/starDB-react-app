import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import ItemDetails from '../item-details';

import './app.css';
import PeoplePage from '../people-page/people-page';
import SwapiService from '../../services/swapi-service';
import Row from '../row/row';

export default class App extends Component {

  swapi = new SwapiService();

  state = {
    selectedPerson: null
  };

  onPersonSelected = id => {
    this.setState({ selectedPerson: id });
  };

  render() {

    const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapi;

    const personDetails = (
      <ItemDetails
      getImageUrl={getPersonImage} 
      getData={getPerson}
      itemId={11}/>
    );

    const starshipDetails = (
      <ItemDetails
        getImageUrl={getStarshipImage} 
        getData={getStarship} 
        itemId={5}/>
    );

    return (
      <div>
        <Header />
        <RandomPlanet />
  
        <Row left={ personDetails }
             right={ starshipDetails }/>

      </div>
    );
  }
}
