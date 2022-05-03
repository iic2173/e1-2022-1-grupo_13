import React, { useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import config from '../config';
// import { Deserializer } from 'jsonapi-serializer';

function AddPhoto() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/users/${currentUser?.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return null;
        }
        return response.json();
      })
      .then(setUser)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      {user.name}
    </div>
  );
};

export default AddPhoto;