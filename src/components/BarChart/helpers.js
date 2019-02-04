export const getYears = data => {
  return data.reduce((acc, item) => {
    if (acc.indexOf(item.year) === -1) {
      acc.push(item.year)
    }
    return acc
  }, [])
}

export const validateYear = (year, minYear) => {
  const yearParam = parseInt(year, 10) // using radix parameter to specify which numeral system to be used 
  return yearParam && yearParam >= minYear ? yearParam : minYear
}
