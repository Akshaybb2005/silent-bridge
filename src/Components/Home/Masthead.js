import React, { useEffect, useRef } from "react";

function Masthead() {
  const headingRef = useRef(null);

  useEffect(() => {
    const headingElement = headingRef.current;
    if (!headingElement) return;

    // Apply initial styles.  Important for SSR and non-JS scenarios.
    headingElement.style.textShadow = '2px 2px 8px rgba(0,0,0,0.4)';
    headingElement.style.letterSpacing = '0.05em';
    headingElement.style.transform = 'scale(1)';
    headingElement.style.transition = 'all 0.5s ease';

    const applyAnimation = () => {
        // Only apply animation if element is in viewport
        if (isElementInViewport(headingElement)) {
            headingElement.classList.add('pulse-animation');
            headingElement.classList.add('fade-in-animation');
        } else {
            headingElement.classList.remove('pulse-animation');
            headingElement.classList.remove('fade-in-animation');
        }
    };

    const handleScroll = () => {
        applyAnimation();
    };

    const handleResize = () => {
        applyAnimation();
    }

    // Check on mount
    applyAnimation();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (headingElement) {
        headingElement.classList.remove('pulse-animation');
        headingElement.classList.remove('fade-in-animation');
      }
    };
  }, []);

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column"
      style={{
        background: "#3f3aaa",
        fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
        marginTop: "0",
        paddingTop: "80px",
      }}
    >
      {/* Main Content */}
      <div className="container mt-5 flex-grow-1 d-flex justify-content-center align-items-start">
        <div className="row align-items-start" style={{height: '100%'}}>
          <div className="col-lg-6 col-md-8 col-sm-12 text-center text-lg-start">
            <div className=" mt-0 pt-0 d-flex flex-column justify-content-start" style={{height: '100%'}}>
              <h1
                className="fw-bold text-white"
                ref={headingRef}
                style={{
                    fontSize: "4rem",
                    lineHeight: "1.1",
                }}

              >
                Silent Bridge: Connecting Worlds
              </h1>
              <p
                className="text-white opacity-85 mt-4"
                style={{ fontSize: "1.2rem", lineHeight: "1.9" }}
              >
                Bridging the communication gap between the hearing and speech-impaired
                community and the rest of the world.  Silent Bridge is your comprehensive
                toolkit for Indian Sign Language, designed with a minimalist yet
                engaging interface.
              </p>

              <div className="mt-5 d-flex justify-content-center justify-content-lg-start flex-wrap gap-4">
                <span
                  className="text-white opacity-75 px-4 py-2 rounded-pill fw-semibold"
                  style={{
                    fontSize: "1rem",
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.08em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.4)';
                    e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  POWERED BY AI
                </span>

                <a
                  href="#intro"
                  className="btn px-5 py-3"
                  style={{
                    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                    color: "white",
                    fontSize: "1.1rem",
                    borderRadius: "10px",
                    fontWeight: "600",
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #4a0895, #1e56b8)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #6a11cb, #2575fc)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  LEARN MORE
                </a>
              </div>
            </div>
          </div>

          {/* Right-side graphics */}
          <div className="col-lg-6 col-md-4 d-none d-md-block">
            <div className="d-flex justify-content-end position-relative">
              {/* Circle Shapes */}
              <div
                className="position-absolute"
                style={{
                  right: "20px",
                  top: "10px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "#649bff",
                }}
              ></div>
              <div
                className="position-absolute"
                style={{
                  right: "130px",
                  top: "10px",
                  width: "120px",
                  height: "120px",
                  background: "#4c6aff",
                  borderTopLeftRadius: "120px",
                  borderTopRightRadius: "120px",
                }}
              ></div>

              {/* Triangle Shapes */}
              <div
                className="position-absolute"
                style={{
                  right: "240px",
                  top: "140px",
                  width: "0",
                  height: "0",
                  borderLeft: "60px solid transparent",
                  borderRight: "60px solid transparent",
                  borderBottom: "100px solid #81baff",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes pulse {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.06);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to{
            opacity: 1;
          }
        }
        h1 {
            animation: none;
        }
        .pulse-animation{
            animation: pulse 2s infinite alternate;
        }
        .fade-in-animation{
            animation: fadeIn 1s ease-in-out;
        }
        `}</style>
    </div>
  );
}

export default Masthead;
