import React from 'react';

import Login from './components/Login'
import SignUp from './components/SignUp'
import Welcome from './components/Welcome'
import {Router} from '@reach/router'

function App() {
  return (
    <div>
     <Router>
     <Login path="/" />
     <SignUp path="signup" />
     <Welcome path="welcome" />
     </Router>
    </div>
  );
}

export default App;
