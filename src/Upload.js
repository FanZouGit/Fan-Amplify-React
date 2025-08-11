import React, { useState } from 'react';
import { 
  signIn, 
  signOut, 
  getCurrentUser, 
  fetchAuthSession 
} from 'aws-amplify/auth';

export default function Upload() {
	  const [file, setFile] = useState(null);

	  const handleUpload = async () => {
		      const token = (await Auth.currentSession()).getIdToken().getJwtToken();

		      const res = await fetch('<API_URL>/generate-presigned-url', {
			            headers: { Authorization: token }
			          });
		      const { uploadUrl } = await res.json();

		      await fetch(uploadUrl, {
			            method: 'PUT',
			            headers: { 'Content-Type': 'application/xml' },
			            body: file
			          });

		      alert('Upload successful!');
		    };

	  return (
		      <div>
		        <input type="file" accept=".xml" onChange={e => setFile(e.target.files[0])} />
		        <button onClick={handleUpload} disabled={!file}>Upload XML</button>
		      </div>
		    );
}
