const createModel = (e) => {
  const info = e

  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  const guid = () => {
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }

  return {
    song: info,
    title: info.title,
    id: guid()
  }
}

export { createModel }
