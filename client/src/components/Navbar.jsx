function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 50px",
        background: "#111827",
      }}
    >
      <h2>🌍 Project Sahayata</h2>

      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        <p>Home</p>
        <p>Dashboard</p>
        <p>About</p>
        <p>Login</p>
      </div>
    </nav>
  );
}

export default Navbar;