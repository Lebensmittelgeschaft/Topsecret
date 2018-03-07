import * as React from 'react';
import Navbar from './components/Navbar/Navbar';
// import Feed from './containers/Feed/Feed';
// import Settings from './containers/Settings/Settings';
// import Chat from './containers/Chat/Chat';
import ChatConversation from './components/ChatConversation/ChatConversation';
class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <Feed/> */}
        {/* <Settings/> */}
        {/* <Chat/>         */}
        <ChatConversation />
      </div>
    );
  }
}

export default App;
