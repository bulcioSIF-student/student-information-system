import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Card, Stack, ListGroup } from 'react-bootstrap';

const StudentProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState<any>(null);

  const path = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/students' 
    : 'https://student-information-system-production-712a.up.railway.app/api/students';

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const response = await fetch(`${path}/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch student record: ${response.status}`);
        }

        const data = await response.json();
        setRecord(data);
      } catch (error) {
        console.error("Fetch failure:", error);
      }
    };
    loadStudentData();
  }, [id, path]);

  return (
    <Container className="py-5" style={{ maxWidth: '900px' }}>
      <nav className="mb-4">
        <Button 
          variant="link" 
          className="p-0 text-decoration-none text-muted small fw-bold text-uppercase"
          onClick={() => navigate('/list')}
        >
          ← Return to Registry
        </Button>
      </nav>

      {record ? (
        <Card className="border-0 shadow-sm overflow-hidden rounded-4">
          <div className="bg-dark py-2"></div>
          
          <Card.Body className="p-4 p-md-5">
            <Stack gap={4}>
              <section>
                <h1 className="display-5 fw-bold text-dark mb-1">{record.fullName}</h1>
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill text-uppercase">
                  {record.status}
                </span>
              </section>

              <hr className="my-2 opacity-50" />

              <div className="row g-5">
                <div className="col-md-7">
                  <h5 className="text-uppercase small fw-bold text-secondary mb-3" style={{ letterSpacing: '1px' }}>
                    Academic Background
                  </h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="px-0 bg-transparent py-3">
                      <div className="text-muted small">Assigned Student ID</div>
                      <div className="fw-semibold fs-5">{record.studentId}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 bg-transparent py-3">
                      <div className="text-muted small">Degree Program</div>
                      <div className="fw-semibold fs-5">{record.course}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 bg-transparent py-3">
                      <div className="text-muted small">Current Year Level</div>
                      <div className="fw-semibold fs-5">{record.yearLevel}</div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>

                <div className="col-md-5 d-flex flex-column justify-content-end">
                  <div className="bg-light p-4 rounded-4 border border-light-subtle">
                    <h6 className="fw-bold mb-2">Contact Details</h6>
                    <p className="text-muted mb-0 small">{record.email}</p>
                  </div>
                  
                  <div className="mt-4 d-grid gap-2">
                    <Button 
                      variant="dark" 
                      className="py-3 fw-bold rounded-3" 
                      onClick={() => navigate(`/edit/${record._id}`)}
                    >
                      Modify Record
                    </Button>
                  </div>
                </div>
              </div>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">Loading student profile...</p>
        </div>
      )}
    </Container>
  );
};

export default StudentProfile;