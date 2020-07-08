import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button/error-button';

export default class ItemDetails extends Component {

  swapi = new SwapiService();

  state = {
    item: null,
    loading: false,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    this.setState({ loading: true });

    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId).then(item => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl(item)
        });
      });
  }

  render() {
    const { loading, item } = this.state;
    const spinner = loading && item ? <Spinner></Spinner> : null,
          content = !loading && item ? <PersonDetailsCard person={item} state={this.state}></PersonDetailsCard> : null,
          error = !item ? <span>Select person from list</span> : null;
    

    return (
      <div className="person-details card">
        { error }
        { spinner }
        { content }
      </div>
    );
  }
}

const PersonDetailsCard = ({ person, state }) => {
  const { id, name, gender, birthYear, eyeColor} = person;
  const { image } = state;

  return (
    <React.Fragment>
      <img className="person-image"
          src={image} />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton/>
        </div>
    </React.Fragment>
  );
};

