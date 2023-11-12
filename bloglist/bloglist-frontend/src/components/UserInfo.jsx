const UserInfo = ({ user, handleLogout }) => {
  return (
    <div>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserInfo;
