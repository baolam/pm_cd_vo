import React from 'react'

const seconds = [];
for (let i = 0; i < 60; i++)
  seconds.push(i);

export default function Seconds() {
  return (
    <>
      {seconds.map((sec) => (
        <option key={sec} value={sec}>{sec}</option>
      ))}
    </>
  )
}
