import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Card } from 'react-bootstrap';
import { baseURL } from "../Config/config";
import axios from "axios"
function Videos() {
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const retrieveVideos = () => {
    axios
      .get(`${baseURL}/videos/all-videos`)
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(retrieveVideos, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!videoId) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    navigate(`/sign-kit/video/${videoId}`, { replace: false });
  };

  const handleClick = (vId) => {
    navigate(`/sign-kit/video/${vId}`, { replace: false });
  };

  const videoList = videos.map((video, index) => (
    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 video-card-wrapper">
      <Card
        className="h-100 video-card"
        onClick={() => handleClick(video.videoId)}
        style={{ cursor: 'pointer', border: '1px solid #e0e0e0', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}

      >
        <Card.Img
          variant="top"
          src={video.videoThumbnail || `https://via.placeholder.com/150?text=Video+${index + 1}`} // Fallback
          alt={video.title}
          style={{ height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
          className="card-img-top"
        />
        <Card.Body>
          <Card.Title className="text-truncate video-title" style={{ fontSize: '1.1rem', fontWeight: '500', color: '#2c3e50' }}>{video.title}</Card.Title>
          <Card.Text className="text-muted small video-upload-date" style={{ fontSize: '0.9rem' }}>
            Uploaded: {new Date(video.createdAt).toLocaleDateString()}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div className="container-fluid d-flex flex-column align-items-center px-0">
      <div className="container-fluid text-white page-header" style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)' }}>
        <div className="container py-5 header-content">
          <h1 className="display-3 px-2 text-center font-weight-bold header-title" >
            Explore ISL Videos!
          </h1>
          <p className="lead text-center header-description" >
            Welcome to the ISL video section of Silent Bridge. Create your own public
            or private videos, share with your friends and colleagues, or browse
            through the videos created by others and shared with the entire
            community!
          </p>
        </div>
      </div>

      <div className="container py-5">
        <section id="create-video" className="mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="h2 section-heading section-title" >
                Create a new video!
              </h2>
              <div className="col-lg-4 mx-auto my-2 section-divider" ></div>
              <p className="text-muted section-description" >
                Create your own video within a few clicks! Provide your content
                via text, speech, or file and keep the videos private or share
                them with the entire community! Each video generates a video ID
                which can be used to access the video directly.
              </p>
              <Link to='/sign-kit/create-video' className="btn btn-primary mt-4 custom-button" >
                <i className="fas fa-plus-circle"></i> {/* Plus icon, you might need to install fontawesome */}
                Create your own Video!
              </Link>
            </div>
          </div>
        </section>

        <hr className="section-separator" />

        <section id="Open-video" className="mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="h2 section-heading section-title" >
                Open a video
              </h2>
              <div className="col-lg-4 mx-auto my-2 section-divider" ></div>
              <p className="text-muted section-description" >
                Open a video directly by using the associated video ID!
              </p>
            </div>
          </div>
        </section>

        <Row className="justify-content-center mb-5">
          <div  className="col-12 col-md-8 col-lg-6 form-wrapper">
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Form.Group controlId="videoId" className="mb-4">
                <Form.Label  className="form-label-style">Enter the Video ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter the Video ID here..."
                  value={videoId}
                  name="title"
                  onChange={(e) => setVideoId(e.target.value)}
                  className="form-control-lg form-input-style"

                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter a video Id.
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                className="btn-lg w-100 custom-button"

              >
                <i className="fas fa-play-circle"></i>
                Open Video
              </Button>
            </Form>
          </div>
        </Row>

        <hr className="section-separator" />

        <section id="Your-Video-Feed" className="mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="h2 section-heading section-title" >
                Your Video Feed
              </h2>
              <div className="col-lg-4 mx-auto my-2 section-divider" ></div>
              <p className="text-muted section-description" >
                Browse through the ISL videos created by others and shared with
                the entire community!
              </p>
            </div>
          </div>
        </section>

        <Row className="mb-5">
          {videoList}
        </Row>
      </div>
      <style jsx global>{`
        .page-header {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
        }
        .header-content{
            padding-top: 5rem;
            padding-bottom: 5rem;
        }
        .header-title {
          text-shadow: 2px 2px 6px rgba(0,0,0,0.4);
          font-size: 3rem;
          font-weight: bold;
          color: white;
        }
        .header-description {
          line-height: 1.8;
          color: rgba(255,255,255,0.9);
          font-size: 1.1rem;
        }
        .section-title {
          color: #2c3e50;
          font-weight: 700;
          font-size: 2.2rem;
        }
        .section-divider {
          height: 4px;
          background-color: #4CAF50;
          border-radius: 4px;
        }
        .section-description {
          line-height: 1.7;
          font-size: 1rem;
          color: #6c757d;
        }
        .custom-button {
            background-color: #4CAF50;
            border-color: #4CAF50;
            padding: 12px 30px;
            borderRadius: 10px;
            font-size: 1.2rem;
            fontWeight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: none;
        }
        .custom-button:hover {
            background-color: #45a049;
            border-color: #45a049;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.2);
        }
        .form-label-style{
            font-weight: 600;
            font-size: 1.1rem;
            color: #34495e;
        }
        .form-input-style{
            border: 2px solid #bdc3c7;
            borderRadius: 8px;
            padding: 12px 15px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
            backgroundColor: #ffffff;
        }
        .form-input-style:focus {
            border-color: #4CAF50;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            outline: none;
        }
        .form-wrapper{
            opacity: 1;
            transform: scale(1);
            transition: all 0.5s ease;
        }
        .video-card-wrapper {
          transition: transform 0.2s;
        }

        .video-card-wrapper:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .video-card{
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .video-card-img{
            height: 200px;
            object-fit: cover;
            border-radius: 12px 12px 0 0;
        }
        .video-title{
            font-size: 1.1rem;
            font-weight: 500;
            color: #2c3e50;
        }
        .video-upload-date{
            font-size: 0.9rem;
            color: #6c757d;
        }
        .section-separator{
            border-top: 2px solid #e0e0e0;
            margin-top: 4rem;
            margin-bottom: 4rem;
        }
        `}</style>
    </div>
  );
}

export default Videos;
