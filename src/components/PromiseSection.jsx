import nutmegLogo from "../assets/nutmeg-logo.png";

const PromiseSection = () => {
  return (
    <div className="promise-section" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ marginBottom: "30px", fontSize: "20px" }}>The Zoya Promise</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "60px",
          flexWrap: "wrap",
        }}
      >
        {/* Item 1 */}
        <div style={{ textAlign: "left",  width: "150px" }}>
          <img src="/icons/ethics.svg" alt="Ethically Sourced" style={{ width: "40px", marginBottom: "10px" }} />
          <p>Ethically Sourced</p>
        </div>

        {/* Item 2 */}
        <div style={{ textAlign: "center", width: "150px" }}>
          <img src="/icons/seal.svg" alt="Sealed Assurance" style={{ width: "40px", marginBottom: "10px" }} />
          <p>Sealed Assurance</p>
        </div>

        {/* Item 3 */}
        <div style={{ textAlign: "center", width: "150px" }}>
          <img src="/icons/upgrade.svg" alt="Upgrade Your Jewellery" style={{ width: "40px", marginBottom: "10px" }} />
          <p>Upgrade Your Jewellery</p>
        </div>

        {/* Item 4 – your Nutmeg logo */}
        <div style={{ textAlign: "center", width: "150px" }}>
          <img src={nutmegLogo} alt="Nutmeg Leaf Product" style={{ width: "50px", marginBottom: "10px" }} />
          <p>Nutmeg Leaf Product</p>
        </div>
      </div>
    </div>
  );
};

export default PromiseSection;
