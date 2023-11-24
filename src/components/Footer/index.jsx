import "./footer.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faTiktok,
  faYoutube,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div className="hi">
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="cta-text">
                    <h6>Địa chỉ</h6>
                    <span>HÀ NỘI - BẮC GIANG - VĨNH PHÚC</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone"></i>
                  <div className="cta-text">
                    <h6>Số điện thoại</h6>
                    <span>0988542315</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open"></i>
                  <div className="cta-text">
                    <h6>Mail</h6>
                    <span>2003shopshoes2023@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img
                        src="/src/assets/logoMatPhong.png"
                        className="img-fluid"
                        alt="logo"
                        style={{ width: "150px", height: "80px" }}
                      />
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      <i>
                        Với 10 năm kinh nghiệm cùng với chuỗi cơ sở trên toàn
                        quốc, chúng tôi cam đoan đem tới sản phẩm tốt nhất cho
                        khách hàng!
                      </i>
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Theo dõi chúng tôi</span>
                    <a href="https://www.facebook.com/thanh863iu">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        style={{ fontSize: "24px" }}
                      />
                    </a>
                    <a href="https://twitter.com/?lang=vi">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        style={{ fontSize: "24px" }}
                      />
                    </a>
                    <a href="https://www.instagram.com/">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ fontSize: "24px" }}
                      />
                    </a>
                    <a href="https://www.tiktok.com/">
                      <FontAwesomeIcon
                        icon={faTiktok}
                        style={{ fontSize: "24px" }}
                      />
                    </a>
                    <a href="https://www.youtube.com/">
                      <FontAwesomeIcon
                        icon={faYoutube}
                        style={{ fontSize: "24px" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Liên kết hữu ích</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="#">Trang chủ</a>
                    </li>
                    <li>
                      <a href="#">Giới thiệu</a>
                    </li>
                    <li>
                      <a href="#">Sản phẩm</a>
                    </li>
                    <li>
                      <a href="#">Tin tức</a>
                    </li>
                    <li>
                      <a href="#">Liên hệ</a>
                    </li>
                    <li>
                      <a href="#">Giày Adidas</a>
                    </li>
                    <li>
                      <a href="#">Giày Nike</a>
                    </li>
                    <li>
                      <a href="#">Giày MLB</a>
                    </li>
                    <li>
                      <a href="#">Giày Converse</a>
                    </li>
                    <li>
                      <a href="#">Giày Vans</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Đăng ký ngay</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Theo dõi, đăng ký và nhấn nút thông báo để nhận những
                      thông tin mới nhất từ chung tôi
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input
                        type="text"
                        style={{ color: "white" }}
                        placeholder="Email Address"
                      />
                      <button>
                        <FontAwesomeIcon
                          icon={faTelegram}
                          style={{ fontSize: "24px", color: "white" }}
                        />
                        ;
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-lg-left">
                <div className="copyright-text">
                  <p>
                    Copyright &copy; 2023, All Right Reserved{" "}
                    <a href="https://www.facebook.com/thanh863iu">Thành HiHi</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
