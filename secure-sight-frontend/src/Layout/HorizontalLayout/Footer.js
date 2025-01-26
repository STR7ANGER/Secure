import React from "react";

const footerStyles = {
  footer: {
    backgroundColor: "#0E0F1B",
    padding: "20px 0",
    width: "100%",
    marginLeft: "7rem",
    borderTop: "1px solid rgba(56, 189, 248, 0.1)",
    marginTop: "auto"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#94a3b8"
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#38bdf8",
    marginBottom: "8px"
  },
  copyright: {
    fontSize: "14px"
  },
  linksContainer: {
    display: "flex",
    gap: "48px"
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  sectionTitle: {
    color: "#f1f5f9",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: "12px"
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px"
  }
};

const Footer = () => {
  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div>
          <div style={footerStyles.logo}>
            SecureSight
          </div>
          <div style={footerStyles.copyright}>
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>

        <div style={footerStyles.linksContainer}>
          <div style={footerStyles.section}>
            <h5 style={footerStyles.sectionTitle}>
              Company
            </h5>
            <div style={footerStyles.section}>
              <a href="#" style={footerStyles.link}>About</a>
              <a href="#" style={footerStyles.link}>Services</a>
              <a href="#" style={footerStyles.link}>Contact</a>
            </div>
          </div>

          <div style={footerStyles.section}>
            <h5 style={footerStyles.sectionTitle}>
              Support
            </h5>
            <div style={footerStyles.section}>
              <a href="#" style={footerStyles.link}>Help Center</a>
              <a href="#" style={footerStyles.link}>Documentation</a>
              <a href="#" style={footerStyles.link}>Status</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;