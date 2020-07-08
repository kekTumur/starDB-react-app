
export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';
  
     getResource = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);
      if (!res.ok) {
        throw new Error('could not fetch' + url);
      }
      const body = await res.json();
      return body;
    }
  
     getAllPeople = async () => {
      const res = await this.getResource('/people/');
      return res.results.map(this._transformPlanet);
    }
  
     getAllPlanets = async () => {
      const res = await this.getResource('/planets/');
      return res.results.map(this._transformPlanet);
    }
  
     getAllStarships = async () => {
      const res = await this.getResource('/starships/');
      return res.results.map(this._transformStarship);
    }
  
     getPerson = async (id) => {
      const person = await this.getResource(`/people/${id}`);
      return this._transformPerson(person);
    }
  
     getPlanet = async (id) => {
      const planet = await this.getResource(`/planets/${id}`);
      return this._transformPlanet(planet);
    }
  
    getStarship = async (id) => {
      const starship = await this.getResource(`/starships/${id}`);
      return this._transformStarship(starship);
    }

    _extractId = (item) => {
      const idRexExp = /\/([0-9]*)\/$/;
      return item.url.match(idRexExp)[1];
    }

    getPersonImage = ({id}) => {
      return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
    };

    getPlanetImage = ({id}) => {
      return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`
    };

    getStarshipImage = ({id}) => {
      return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
    };

    _transformPlanet = (planet) => {
      return {
        id: this._extractId(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter
      }
    }

    _transformStarship = (starship) => {
      return {
        id: this._extractId(starship),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        constInCredits: starship.const_inCredits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargo_capacity
      }
    }

    _transformPerson = (person) => {
      return {
        id: this._extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color
      }
    }
  
  }
  
  
  
  