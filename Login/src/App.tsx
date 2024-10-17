import React from 'react';

interface Props {
}

export const Component: React.FC<Props> = (props) => {
  return (
    <div>
      sou login
    </div>
  )
};

export const loader = async () => {
};

export default { Component, loader };