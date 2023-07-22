import React from 'react'
import { SpinnerCircular } from "spinners-react";

function Loader() {
  return (
    <>
      <SpinnerCircular size={50} thickness={110} speed={88} color="rgba(39, 155, 154, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
    </>
  )
}

export default Loader