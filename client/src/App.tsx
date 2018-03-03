import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
// import Feed from './containers/Feed/Feed';
import SettingsControls from './components/SettingsControls/SettingsControls';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <Feed/> */}
        <SettingsControls/>
      </div>
    );
  }
}

export default App;
