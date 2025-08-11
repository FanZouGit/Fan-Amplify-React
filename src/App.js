import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';
import Upload from './Upload';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

function App({ user, signOut }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user.username}</h2>
      <button onClick={signOut}>Sign Out</button>
      <hr />
      <Upload />
    </div>
  );
}

export default App;
