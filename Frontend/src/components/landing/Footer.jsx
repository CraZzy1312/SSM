import logo from "../../assets/logo_ADI_SM.png";
import "../../css/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Logo ADI San Marcos" className="footer-logo" />

        <p className="footer-text">
          Conectando a la comunidad de San Marcos a través de espacios que inspiran.
        </p>

        <div className="footer-info">
          <div className="footer-item">
            <span className="footer-label">Ubicación:</span>
            <span>San Marcos, Tarrazú</span>
          </div>

          <div className="footer-item">
            <span className="footer-label">Email:</span>
            <a href="mailto:adisanmarcostarrazu@gmail.com" className="footer-mail">
              adisanmarcostarrazu@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
