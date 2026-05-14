import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Card, Stack, Spinner } from 'react-bootstrap';

type AcademicRecord = {
  _id: string;
  studentId: string;
  fullName: string;
  course: string;
  yearLevel: string;
  status: string;
};

const RegistryDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [collection, setCollection] = useState<AcademicRecord[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Updated based on your Railway dashboard in image_94cf57.png
  const endpoint = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/students' 
    : 'https://student-information-system-production-712a.up.railway.app/api/students';

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setCollection(data);
      }
    } catch (err) {
      console.error("Data sync failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [endpoint]);

  const removeEntry = async (id: string) => {
    if (window.confirm("Remove this student from the registry?")) {
      try {
        const response = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
        if (response.ok) setCollection(collection.filter(item => item._id !== id));
      } catch (err) { 
        console.error("Delete operation failed:", err); 
      }
    }
  };

  const filteredData = collection.filter(item =>
    item.fullName.toLowerCase().includes(query.toLowerCase()) ||
    item.studentId.includes(query) ||
    item.course.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container className="py-5">
      <Stack direction="horizontal" className="mb-5 justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-dark mb-0">Student Information System</h2>
          <small className="text-secondary fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
            Active Database Registry
          </small>
        </div>
        <Button 
          variant="primary" 
          className="rounded-3 px-4 py-2 fw-bold shadow-sm" 
          onClick={() => navigate('/create')}
        >
          Enroll New Student
        </Button>
      </Stack>

      <div className="mb-4">
        <Form.Control 
          size="lg"
          className="border-0 shadow-sm p-3 bg-white"
          placeholder="Filter by name, ID, or course..."
          style={{ fontSize: '0.95rem', borderRadius: '12px' }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Connecting to Railway database...</p>
        </div>
      ) : (
        <Row className="g-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Col lg={4} md={6} key={item._id}>
                <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                  <div className={`p-1 ${item.status === 'enrolled' ? 'bg-success' : 'bg-secondary'}`} />
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="text-muted small fw-bold">{item.studentId}</span>
                      <span className={`badge ${item.status === 'enrolled' ? 'text-success bg-success-subtle' : 'text-secondary bg-secondary-subtle'} border-0`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <h5 className="fw-bold text-dark mb-1">{item.fullName}</h5>
                    <p className="text-secondary small mb-4">{item.course} — {item.yearLevel}</p>
                    
                    <div className="d-flex gap-2 mt-auto">
                      <Button 
                        variant="light" 
                        className="flex-grow-1 fw-semibold small rounded-3"
                        onClick={() => navigate(`/details/${item._id}`)}
                      >
                        Profile
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        className="border-0 rounded-3"
                        onClick={() => removeEntry(item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <p className="text-muted">No student records found in the current registry.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default RegistryDashboard;