import { useState } from 'react'

export const useField = (type, initialValue = '', required = true) => {
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return [value, { type, value, onChange, required }, reset]
}
