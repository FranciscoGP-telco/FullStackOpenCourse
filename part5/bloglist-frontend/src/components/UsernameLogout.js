const UsernameLogout = ({ user, handleLogout }) => {
  return (
    <p className='logged'>{user.name} is logged in <form onSubmit={handleLogout}><button type="submit">Logout</button></form></p>
  )
}

export default UsernameLogout