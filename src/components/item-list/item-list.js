import React, { Component } from 'react';

import './item-list.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class ItemList extends Component {

  swapi = new SwapiService();

  state = {
    peoplelist: null
  };

  componentDidMount() {
    this.swapi
      .getAllPeople()
      .then(peoplelist => {
        this.setState({ peoplelist });
      });
  }

  
  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li
          key={id} 
          className='list-group-item'
          onClick={() => this.props.onPersonSelected(id)}
          >
          {name}</li>
      );
    });
  }

  render() {
    const  { peoplelist } = this.state;

    if (!peoplelist) {
      return <Spinner></Spinner>
    }

    const items = this.renderItems(peoplelist)
    return (
      <ul className="item-list list-group">
        { items }
      </ul>
    );
  }
}