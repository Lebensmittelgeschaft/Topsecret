import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
// import Feed from './containers/Feed/Feed';
// import Settings from './containers/Settings/Settings';
import Chat from './containers/Chat/Chat';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <Feed/> */}
        {/* <Settings/> */}
        <Chat/>        
      </div>
    );
  }
}

export default App;
