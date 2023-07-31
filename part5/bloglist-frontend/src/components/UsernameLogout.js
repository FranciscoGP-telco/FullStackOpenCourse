const UsernameLogout = ({user, handleLogout}) => {
  return (
    <p>{user.name} is logged in <form onSubmit={handleLogout}><button type="submit">Logout</button></form></p>
  )
}

export default UsernameLogout