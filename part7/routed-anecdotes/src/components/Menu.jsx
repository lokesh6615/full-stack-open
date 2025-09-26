const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <a href="/" style={padding}>
        anecdotes
      </a>
      <a href="/new" style={padding}>
        create new
      </a>
      <a href="/about" style={padding}>
        about
      </a>
    </div>
  )
}

export default Menu
