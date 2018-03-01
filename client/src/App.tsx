import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
import Feed from './containers/Feed/Feed';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Feed/>
      </div>
    );
  }
}

export default App;
