import React, { Component } from 'react';

import './item-list.css';
import Spinner from '../spinner';

export default class ItemList extends Component {

  state = {
    itemlist: null
  };

  componentDidMount() {
    const { getData } = this.props;
      getData()
      .then(itemlist => {
        this.setState({ itemlist });
      });
  }

  
  renderItems(arr) {
    return arr.map(item => {
      const { id } = item;

      const { renderItems } = this.props;

      return (
        <li
          key={id} 
          className='list-group-item'
          onClick={() => this.props.onPersonSelected(id)}
          >
          { renderItems(item) }</li>
      );
    });
  }

  render() {
    
    const  { itemlist } = this.state;

    if (!itemlist) {
      return <Spinner></Spinner>
    }

    const items = this.renderItems(itemlist)
    return (
      <ul className="item-list list-group">
        { items }
      </ul>
    );
  }
}