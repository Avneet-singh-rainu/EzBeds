import React from "react";

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerSection}>
          <h2 style={styles.footerTitle}>About Us</h2>
          <p style={styles.footerText}>
            We are dedicated to providing the best healthcare services. Our
            mission is to ensure that every patient receives the highest quality
            care. Learn more about our services and how we can assist you in
            your healthcare journey.
          </p>
        </div>
        <div style={styles.footerSection}>
          <h2 style={styles.footerTitle}>Quick Links</h2>
          <ul style={styles.footerList}>
            <li style={styles.footerListItem}>
              <a href="/" style={styles.footerLink}>
                Home
              </a>
            </li>
            <li style={styles.footerListItem}>
              <a href="/bloodbank" style={styles.footerLink}>
                Blood Bank
              </a>
            </li>
            <li style={styles.footerListItem}>
              <a href="/about" style={styles.footerLink}>
                About Us
              </a>
            </li>
            <li style={styles.footerListItem}>
              <a href="/contact" style={styles.footerLink}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div style={styles.footerSection}>
          <h2 style={styles.footerTitle}>Contact Us</h2>
          <p style={styles.footerText}>
            <strong>Email:</strong> support@example.com
            <br />
            <strong>Phone:</strong> (123) 456-7890
            <br />
            <strong>Address:</strong> 123 Health St, Wellness City, HC 12345
          </p>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p style={styles.footerBottomText}>
          © 2024 HealthCare Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#008080",
    color: "#ffffff",
    padding: "20px",
    marginTop: "20px",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "150px auto",
  },
  footerSection: {
    flex: "1",
    minWidth: "450px",
    margin: "10px",
  },
  footerTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    borderBottom: "2px solid #61dafb",
    paddingBottom: "5px",
  },
  footerText: {
    fontSize: "14px",
    lineHeight: "1.6",
  },
  footerList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    padding: "0",
  },
  footerListItem: {
    margin: "5px 0",
  },
  footerLink: {
    color: "#61dafb",
    textDecoration: "none",
  },
  footerBottom: {
    textAlign: "center",
    marginTop: "20px",
  },
  footerBottomText: {
    fontSize: "12px",
    margin: "0",
  },
};

export default Footer;
