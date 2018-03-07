import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
// import Feed from './containers/Feed/Feed';
import Settings from './containers/Settings/Settings';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <Feed/> */}
        <Settings/>
      </div>
    );
  }
}

export default App;
