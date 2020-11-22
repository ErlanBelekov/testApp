import { useEffect, useState } from 'react';

export default (effect) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      effect && effect();
      setHasMounted(true);
    }
  }, [hasMounted, effect]);
};
