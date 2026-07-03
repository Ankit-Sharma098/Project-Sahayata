function Hero() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "120px 30px",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
        }}
      >
        AI Powered
        <br />
        Pollution Monitoring
      </h1>

      <p
        style={{
          marginTop: "20px",
          color: "#94a3b8",
        }}
      >
        Report pollution with AI powered analysis and help build
        cleaner cities.
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button>Report Now</button>

        <button>View Dashboard</button>
      </div>
    </section>
  );
}

export default Hero;