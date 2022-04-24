export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('auth')
    return JSON.parse(serializedState)
  } catch (err) {
    return null
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('auth', serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}
