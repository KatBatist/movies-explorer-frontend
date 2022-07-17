import React from 'react';

const getWidth = () => {
  return document.documentElement.clientWidth;
};

function useCurrentSize() {
  const [size, setSize] = React.useState({
    width: getWidth(),
  });

  React.useEffect(() => {

    let timeout = null;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSize({
          width: getWidth(),
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return size;
}

export default useCurrentSize;
