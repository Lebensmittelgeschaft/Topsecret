import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
import Post from './components/Post/Post';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />        
        <Post publisher="Shaked" secretText="Hey This Is My Secret!" />
      </div>
    );
  }
}

export default App;
