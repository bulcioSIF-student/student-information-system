import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Form, Stack } from 'react-bootstrap';

const UpdateRecord: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [draft, setDraft] = useState({
    studentId: '', 
    fullName: '', 
    course: '', 
    yearLevel: '', 
    email: '', 
    status: 'enrolled'
  });

  const [isSaving, setIsSaving] = useState(false);

  const serverUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/students' 
    : 'https://student-information-system-production-712a.up.railway.app/api/students';

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const response = await fetch(`${serverUrl}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const existingData = await response.json();
        setDraft(existingData);
      } catch (err) {
        console.error("Initialization error:", err);
        // Alerting the user if the backend is unreachable during load
        alert("Could not load student data. Please check your connection.");
      }
    };
    fetchCurrentData();
  }, [id, serverUrl]);
  
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setDraft(prev => ({ ...prev, [name]: value }));
  };

  const onSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`${serverUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });

      if (response.ok) {
        navigate(`/details/${id}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Update failed"}`);
      }
    } catch (error) {
      alert("Submission failed. Check your network connection.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '650px' }}>
      <div className="mb-5">
        <h2 className="fw-bold tracking-tight text-dark text-center">Student Information Editor</h2>
        <p className="text-muted small text-center">Modify the profile details and commit changes to the database.</p>
      </div>

      <Form onSubmit={onSaveChanges}>
        <Stack gap={4} className="bg-white p-4 border rounded-3 shadow-sm">
          
          <Form.Group>
            <Form.Label className="small fw-bold text-secondary text-uppercase">Reference ID</Form.Label>
            <Form.Control 
              name="studentId"
              value={draft.studentId} 
              onChange={handleChange} 
              className="border-0 bg-light p-3"
              style={{ fontSize: '0.95rem' }}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="small fw-bold text-secondary text-uppercase">Legal Full Name</Form.Label>
            <Form.Control 
              name="fullName"
              value={draft.fullName} 
              onChange={handleChange} 
              className="border-0 bg-light p-3"
              style={{ fontSize: '0.95rem' }}
              required
            />
          </Form.Group>

          <div className="d-flex gap-3">
            <Form.Group className="flex-grow-1">
              <Form.Label className="small fw-bold text-secondary text-uppercase">Academic Program</Form.Label>
              <Form.Control 
                name="course"
                value={draft.course} 
                onChange={handleChange} 
                className="border-0 bg-light p-3"
                style={{ fontSize: '0.95rem' }}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="small fw-bold text-secondary text-uppercase">Year Level</Form.Label>
              <Form.Select 
                name="yearLevel"
                value={draft.yearLevel} 
                onChange={handleChange} 
                className="border-0 bg-light p-3"
                style={{ fontSize: '0.95rem' }}
                required
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </Form.Select>
            </Form.Group>
          </div>

          <Form.Group>
            <Form.Label className="small fw-bold text-secondary text-uppercase">Enrollment Status</Form.Label>
            <Form.Select 
              name="status"
              value={draft.status} 
              onChange={handleChange} 
              className="border-0 bg-light p-3"
              style={{ fontSize: '0.95rem' }}
            >
              <option value="enrolled">Enrolled</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          <div className="pt-4 border-top d-flex align-items-center justify-content-between">
            <Button 
              type="submit" 
              variant="dark" 
              className="px-5 py-2 fw-bold text-uppercase"
              style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              variant="link" 
              className="text-decoration-none text-muted fw-semibold small" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </Stack>
      </Form>
    </Container>
  );
};

export default UpdateRecord;