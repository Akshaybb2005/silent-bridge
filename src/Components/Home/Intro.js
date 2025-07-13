import React from "react";

function Intro() {
  return (
    <section
      id="intro"
      style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <h2
              className="section-heading"
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#343a40",
                marginBottom: "20px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              We've what you need!
            </h2>
            <div
              className="divider my-3"
              style={{
                width: "100px",
                height: "4px",
                backgroundColor: "#007bff",
                borderRadius: "5px",
                margin: "20px auto",
              }}
            />
            <p
              className="normal-text"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#555",
                opacity: "0.9",
                marginBottom: "30px",
              }}
            >
              A comprehensive and aesthetic Indian Sign Language toolkit. A
              minimalist yet informative interface. Wide range of features
              containing different functionalities that are necessary to work
              with ISL. What else do you need anyway! We have everything wrapped
              up here! <br /> Dive into our diverse services and let us know
              about your experience!
            </p>
            <a
              href="#services"
              className="btn explore-services-button"
              style={{
                backgroundColor: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "white",
                padding: "12px 30px",
                borderRadius: "10px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "1.1rem",
                border: "none",
                display: "inline-block",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right, #4a0895, #1e56b8)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 5px 7px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage =
                  "linear-gradient(to right, #6a11cb, #2575fc)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .section-heading {
          font-size: 2.5rem;
          font-weight: bold;
          color: #343a40;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        .normal-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
          opacity: 0.9;
          margin-bottom: 30px;
        }

        .divider {
          width: 100px;
          height: 4px;
          background-color: #007bff;
          border-radius: 5px;
          margin: 20px auto;
        }
        .explore-services-button {
          background: linear-gradient(to right, #6a11cb, #2575fc);
          color: white;
          padding: 12px 30px;
          border-radius: 10px;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          font-size: 1.1rem;
          border: none;
          display: inline-block;
          text-decoration: none;
        }

        .explore-services-button:hover {
          background: linear-gradient(to right, #4a0895, #1e56b8);
          transform: translateY(-3px);
          box-shadow: 0 5px 7px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .section-heading {
            font-size: 2rem;
          }
          .normal-text {
            font-size: 1rem;
            text-align: center;
          }
        }
        @media (max-width: 576px) {
          .section-heading {
            font-size: 1.75rem;
          }
          .normal-text {
            font-size: 0.9rem;
          }
          .explore-services-button {
            font-size: 1rem;
            padding: 10px 20px;
          }
        }
      `}</style>
    </section>
  );
}

export default Intro;
