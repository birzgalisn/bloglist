function totalLikes(list) {
  const reducer = (acc, next) => {
    return acc + next.likes
  }
  return list.length === 1 ? list[0].likes : list.reduce(reducer, 0)
}

function favotireBlog(list) {
  const reducer = (acc, next) => {
    return acc.likes > next.likes ? acc : next
  }
  return list.reduce(reducer, {})
}

module.exports = { totalLikes, favotireBlog }
