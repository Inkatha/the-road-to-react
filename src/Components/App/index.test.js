import React from 'react';
import ReactDOM from 'react-dom';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import App, { SubmitButton, SearchTextBox, Table } from './index';

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  test('snapshots', () => {
    const component = Renderer.create(
      <App />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('SubmitButton', () => {
  
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubmitButton>Give Me More</SubmitButton>, div);
  });

  test('snapshot', () => {
    const component = Renderer.create(
      <SubmitButton>Give Me More</SubmitButton>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: '1', num_comments: '1', points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: '1', points: 2, objectID: 'z' },
    ]
  }

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
  });

  test('snapshots', () => {
    const component = Renderer.create(
      <Table {...props} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in the list', () => {
    const element = shallow(
      <Table {...props} />
    );

    expect(element.find('.table-row').length).toBe(2);
  });
  
});

