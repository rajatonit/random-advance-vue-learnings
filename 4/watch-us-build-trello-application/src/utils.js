export function uuid() {
  return Math.random()
    .toString(16)
    .slice(2)
}

export const saveStatePlugin = store => {
  store.subscribe((_mutation, state) => {
    console.log('sddsds')
    localStorage.setItem('board', JSON.stringify(state.board))
  })
}
