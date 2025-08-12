import React, { useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const { tokens } = await fetchAuthSession();
      const token = tokens?.idToken?.toString();

      // TODO: Replace <API_URL> with your real endpoint
      const res = await fetch('<API_URL>/generate-presigned-url', {
        headers: { Authorization: token }
      });
      if (!res.ok) throw new Error('Failed to get presigned URL');
      const { uploadUrl } = await res.json();

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/xml' },
        body: file
      });
      if (!uploadRes.ok) throw new Error('Upload failed');

      alert('Upload successful!');
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    }
  };

  return (
    <div>
      <input type="file" accept=".xml" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!file}>Upload XML</button>
    </div>
  );
}
