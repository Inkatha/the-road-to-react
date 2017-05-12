import React, { Component } from 'react';
import './index.css';

import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../../Constants';

import {
  SubmitButton
} from '../Button';

import {
  SearchTextBox
} from '../Search';

import {
  Table
} from '../Table';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }
 
  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey] 
      ? results[searchKey].hits
      : [];
    
    const updatedHits = [
      ...oldHits,
      ...hits
    ]

    this.setState({ 
      results: { 
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false 
    });
  }

  fetchSearchTopStories(searchTerm, page) {
    this.setState({ isLoading: true });
    
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id
    const updatedHits = hits.filter(isNotId); 

    this.setState({
      results: {
         ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  render() {

    const Loading = () => {
      <div>Loading</div>
    }

    const withLoading = (Component) => ({ isLoading, ...rest }) => {
      isLoading ? <Loading /> : <Component { ...rest } />
    }

    const ButtonWithLoading = withLoading(SubmitButton);

    const {
      searchTerm, 
      results,
      searchKey,
      isLoading
    } = this.state;

    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page
    ) || 0;
    
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <SearchTextBox 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </SearchTextBox>
        </div>
          <Table 
            list={list}
            onDismiss={this.onDismiss}
          /> 
          <div className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
              More
            </ButtonWithLoading>
          </div>
      </div>
    );
  }
}

export default App;

export {
  SubmitButton,
  SearchTextBox,
  Table
}


