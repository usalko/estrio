import React from 'react'

export interface EstrioProps {
  label: string
}

const Estrio = (props: EstrioProps) => {
  return <button>{props.label}</button>
}

export default Estrio
