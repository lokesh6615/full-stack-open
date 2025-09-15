const LoginForm = ({
  username,
  password,
  handleUserNameChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          User Name:
          <input type="text" value={username} onChange={handleUserNameChange} />
        </label>
      </div>

      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>

      <br />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
