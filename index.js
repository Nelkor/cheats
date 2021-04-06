const cheats = Object.create(null)

let currentInput = ''

addEventListener('keydown', ({ code }) => {
  if (!code.startsWith('Key')) {
    return;
  }

  currentInput += code.slice(3).toLowerCase()

  const keys = Object.keys(cheats)

  while (keys.every(cheat => cheat.indexOf(currentInput) == -1)) {
    currentInput = currentInput.slice(1)
  }

  if (cheats[currentInput]) {
    cheats[currentInput]()

    currentInput = ''
  }
})

export const removeCheat = code => {
  if (cheats[code]) {
    delete cheats[code]
  }
}

export const addCheat = (code, fn) => {
  const intersection = Object.keys(cheats)
    .find(key => key.indexOf(code) != -1 || code.indexOf(key) != -1)

  if (intersection) {
    throw `Intersection with an existing cheat '${intersection}'`
  }

  cheats[code] = fn
}
