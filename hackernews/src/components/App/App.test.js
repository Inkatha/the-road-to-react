import React from 'react';
import ReactDOM from 'react-dom';
import Renderer from 'react-test-renderer';
import App from './App';

describe('App', () =>  {
  
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

