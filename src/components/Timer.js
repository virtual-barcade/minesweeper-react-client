import React from 'react';

const Timer = ({ time, mines }) => {
  return (
    <div>
      {mines} || {time}
    </div>
  );
};

export default Timer;
