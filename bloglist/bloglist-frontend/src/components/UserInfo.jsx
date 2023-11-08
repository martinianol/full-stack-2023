const UserInfo = ({ user, handleLogout }) => {
  return (
    <div>
      <span>{user.username} logged in</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserInfo;
