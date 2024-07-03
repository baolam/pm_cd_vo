import React from 'react'

const minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Minutes() {
  return (
    <>
      {minutes.map((min) => (
        <option key={min} value={min}>{min}</option>
      ))}
    </>
  )
}

export default Minutes;