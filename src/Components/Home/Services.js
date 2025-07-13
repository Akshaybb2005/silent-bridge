import React from "react";
import { Link } from "react-router-dom";
 import imgConvert from "../../Assets/convert.png"; // Make sure these paths are correct
 import imgLearnSign from "../../Assets/learn-sign.jpg";
 import imgVideos from "../../Assets/videos.png";

// Placeholder images, ensure these are accessible.  Using inline base64 for demo.


function Services() {
  return (
    <section id="services" style={{ backgroundColor: "#3f3aaa", color: "white", padding: "50px 0" }}>
      <div className="container">
        <div className="row mt-5 text-center">
          <div className="col-md-12 d-flex flex-column align-items-center">
            <h2 className="section-heading fw-bold text-white">Our Services</h2>
            <div className="divider my-3" style={{ width: "80px", height: "4px", backgroundColor: "white", borderRadius: "2px" }} />
            <p className="lead" style={{ maxWidth: "800px" }}>
              A comprehensive and aesthetic Indian Sign Language toolkit. A minimalist yet informative interface.
              Dive into our diverse services and let us know about your experience!
            </p>
          </div>
        </div>

        <div className="row mt-4">
          {/* Convert Card */}
          <ServiceCard
            image={imgConvert}
            title="Convert"
            text="Convert audio or text into Indian Sign Language. Speak into your mic or type the text, and watch the magic happen!"
            link="/sign-kit/convert"
          />

          {/* Learn Sign Card */}
          <ServiceCard
            image={imgLearnSign}
            title="Learn Sign"
            text="Curious about Indian Sign Language? Select a sign, watch it, and learn at your own pace."
            link="/sign-kit/learn-sign"
          />

          {/* Videos Card */}
          <ServiceCard
            image={imgVideos}
            title="Videos"
            text="Real-time communication using a Python model which converts sign language to Indian languages."
            link="/sign-kit/all-videos"
          />
        </div>
      </div>
        <style jsx global>{`
        .service-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
        }

        .service-card-img {
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            height: 250px; /* Increased height */
            object-fit: cover;  /* Ensure image covers the area */
        }

        .service-card-body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .service-card-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .service-card-text {
            color: #ffffff;
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 20px;
            opacity: 0.9;
        }

        .service-card-footer {
            background-color: transparent;
            border: none;
            padding-top: 0;
        }

        .explore-button {
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: white;
            padding: 12px 25px;
            border-radius: 10px;
            font-weight: bold;
            transition: all 0.3s ease;
            width: 100%;
            display: block;
            text-align: center;
            text-decoration: none;
            font-size: 1.1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: none;
        }

        .explore-button:hover {
            background: linear-gradient(to right, #4a0895, #1e56b8);
            transform: translateY(-3px);
            box-shadow: 0 5px 7px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 992px) {
            .service-card-img {
                height: 200px;
            }
            .service-card-title{
                font-size: 1.2rem;
            }
            .service-card-text{
                font-size: 1rem;
            }
        }

        @media (max-width: 768px) {
            .col-lg-4 {
                margin-bottom: 30px;
            }
            .service-card-img {
                height: 250px;
            }
             .service-card-title{
                font-size: 1.5rem;
            }
            .service-card-text{
                font-size: 1.1rem;
            }
        }
        `}</style>
    </section>
  );
}

// Reusable Card Component
function ServiceCard({ image, title, text, link }) {
  return (
    <div className="col-lg-4 d-flex align-items-stretch">
      <div className="service-card w-100">
        <img src={image} alt={`${title} Clipart`} className="service-card-img" />
        <div className="service-card-body">
          <h5 className="service-card-title">{title}</h5>
          <p className="service-card-text">{text}</p>
        </div>
        <div className="service-card-footer">
          <Link to={link} className="explore-button">
            EXPLORE NOW!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
