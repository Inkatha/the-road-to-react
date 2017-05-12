import React from 'react';
import PropTypes from 'prop-types';

const largeColumn = {
  width: '40%'
}
const midColumn = {
  width: '30%'
}
const smallColumn = {
  width: '10%'
}

const Table = ({ list, onDismiss}) =>
  <div className="table">
    { list.map(item => 
      <div key={item.objectID} className="table-row">

        <span style={{largeColumn}}>
          <a href={item.url}>{item.title}</a>
        </span>

        <span style={{midColumn}}>
          {item.author}
        </span>

        <span style={{smallColumn}}>
          {item.num_comments}
        </span>

        <span style={{smallColumn}}>
          {item.points}
        </span>

        <span style={{smallColumn}}>
          <button onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </button>
        </span>
      </div>
    )}
  </div>

Table.PropTypes = {
  list: PropTypes.node,
  onDismiss: PropTypes.func
}

export default Table;