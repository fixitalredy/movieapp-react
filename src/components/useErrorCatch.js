import { useState } from 'react';

export default function useErrorCatch() {
  const [error, setError] = useState(false);

  const errorHandler = (err) => {
    setError(err);
  };
  return { error, errorHandler };
}
