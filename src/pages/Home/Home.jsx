import "./Home.css";
import logo from "../../assets/logo.webp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate  = useNavigate();

  return (
    <div className="home_main">
      <div className="home_main_arrange_width">
        <div className="home_main_navbar">
          <div className="home_main_navbar_left">
            <div className="home_main_navbar_left_logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="home_main_navbar_mid"></div>
          <div className="home_main_navbar_right">
            <div className="home_main_navbar_right_sync_btn">
              <button onClick={()=>navigate('/auth')}>
                <p>Let&apos;s Sync Founders</p>
              </button>
            </div>
          </div>
        </div>
        <div className="home_main_section_1">
          <div className="home_main_section_1_wrap_tag_1">
            <div className="home_main_section_1_acknowledgement">
              <div className="home_main_section_1_acknowledgement_line">
                <p>✨ Build Together, Succeed Together</p>
              </div>
            </div>
            <div className="home_main_section_1_tagline">
              <p id="home_main_section_1_tagline_1">A Growth Engine</p>
              <p id="home_main_section_1_tagline_2">For Founders</p>
            </div>
            <div className="home_main_section_1_about">
              <p>
                One platform for founders to get co-founder , and build
                partnerships.
              </p>
              <p>Transform your startup journey forever.</p>
            </div>
            <div className="home_main_section_1_sync_btn_2nd">
              <div className="home_main_section_1_sync_btn_2nd_div">
                <button onClick={()=>navigate('/auth')}>
                  <p>Let&apos;s Sync Founders</p>
                </button>
              </div>
            </div>
          </div>
          <div className="home_main_section_1_wrap_tag_2">
            <div className="home_main_section_1_wrap_tag_2_glow_effect"></div>
            <div className="home_main_section_1_wrap_tag_2_image_box"></div>
            <div className="home_main_section_1_wrap_tag_2_image_box_top"></div>
          </div>
        </div>
        <div className="home_main_section_2"></div>
      </div>
      <div className="home_main_footers">
        <p>Build with ❤️ Vishal Kumar</p>
        
      </div>
    </div>
  );
};

export default Home;
