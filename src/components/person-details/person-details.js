import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class PersonDetails extends Component {

  swapi = new SwapiService();

  state = {
    person: null,
    loading: false
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    this.setState({ loading: true });

    const { personId } = this.props;

    if (!personId) {
      return;
    }

    this.swapi
      .getPerson(personId)
      .then(person => {
        this.setState({
          person,
          loading: false
        });
      });
  }

  render() {
    const { loading, person } = this.state;
    const spinner = loading && person ? <Spinner></Spinner> : null,
          content = !loading && person ? <PersonDetailsCard person={person}></PersonDetailsCard> : null,
          error = !person ? <span>Select person from list</span> : null;
    

    return (
      <div className="person-details card">
        { error }
        { spinner }
        { content }
      </div>
    );
  }
}

const PersonDetailsCard = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor} = person;

  return (
    <React.Fragment>
      <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
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
        </div>
    </React.Fragment>
  );
};