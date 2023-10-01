const UsernameLogout = ({ user, handleLogout }) => {
  return (
    <div>
      <a className='logged'>{user.name} is logged in</a>
      <form onSubmit={handleLogout}><button type="submit">Logout</button></form>
    </div>
  )
}

export default UsernameLogout