import React from 'react';

export default function Score({ score }) {
  const fixedScore = score.toFixed(1);
  return (
    <div
      style={{
        minWidth: '50px',
        minHeight: '50px',
        fontSize: '25px',
        border:
          fixedScore >= 0 && fixedScore <= 3
            ? '4px solid #E90000'
            : fixedScore >= 3 && fixedScore <= 5
            ? '4px solid #E97E00'
            : fixedScore >= 5 && fixedScore <= 7
            ? '4px solid #E9D100'
            : '4px solid #66E900',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '600',
        justifyContent: 'center',
      }}
    >
      {fixedScore}
    </div>
  );
}
