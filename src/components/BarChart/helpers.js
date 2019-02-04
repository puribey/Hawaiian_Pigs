export const getYears = data => {
  return data.reduce((acc, item) => {
    if (acc.indexOf(item.year) === -1) {
      acc.push(item.year)
    }
    return acc
  }, [])
}


