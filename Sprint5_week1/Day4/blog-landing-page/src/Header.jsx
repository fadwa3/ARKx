function Header({ name, links, TrackLogin, backgroundColor }) {
  const headerStyle = {
    backgroundColor: backgroundColor,
  };
  return (
    <div className="Header" style={headerStyle}>
      <h1>{name}</h1>
      <ul> 
        {links.map((nav, index) => (
          <li key={index}>
            <a href={nav.link}>{nav.name}</a>
          </li>
        ))}
        <li>
          <button>{TrackLogin ? "Logout" : "Login"}</button>
        </li>
      </ul>
    </div>
  );
}

export default Header;
