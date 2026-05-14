import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Card, Stack } from 'react-bootstrap';

type StudentEntry = {
  studentId: string;
  fullName: string;
  course: string;
  yearLevel: string;
  email: string;
  status: string;
};

const CreateStudent: React.FC = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState<StudentEntry>({
    studentId: '',
    fullName: '',
    course: '',
    yearLevel: '',
    email: '',
    status: 'enrolled'
  });

  const endpoint = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/students' 
    : 'https://student-information-system-production-712a.up.railway.app/api/students';

  const updateField = (field: keyof StudentEntry, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        navigate('/list'); 
      } else {
        const err = await response.json();
        alert(`System Error: ${err.message || "Action Failed"}`);
      }
    } catch (e) {
      alert("Network Error: Backend is unreachable. Check your Railway deployment and CORS settings.");
    }
  };

  return (
    <Container className="my-5">
      <Card className="border-0 bg-transparent">
        <Card.Body className="p-0">
          <Form onSubmit={onFormSubmit}>

            <div className="mb-4">
              <h2 className="display-6 fw-bold text-dark">Enrollment Entry</h2>
              <p className="text-secondary">Fill out the credentials to register a new student record.</p>
            </div>

            <Stack gap={4} className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">

              <div className="d-md-flex gap-4">
                <Form.Group className="w-100 mb-3 mb-md-0">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Identification Number</Form.Label>
                  <Form.Control 
                    size="lg"
                    className="bg-light border-0"
                    style={{ fontSize: '1rem' }}
                    value={form.studentId} 
                    onChange={e => updateField('studentId', e.target.value)} 
                    placeholder="ID-000-000"
                    required 
                  />
                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Full Legal Name</Form.Label>
                  <Form.Control 
                    size="lg"
                    className="bg-light border-0"
                    style={{ fontSize: '1rem' }}
                    value={form.fullName} 
                    onChange={e => updateField('fullName', e.target.value)} 
                    placeholder="Enter Name"
                    required 
                  />
                </Form.Group>
              </div>

              <div className="d-md-flex gap-4">
                <Form.Group className="w-100 mb-3 mb-md-0">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Program/Course</Form.Label>
                  <Form.Control 
                    size="lg"
                    className="bg-light border-0"
                    value={form.course} 
                    onChange={e => updateField('course', e.target.value)} 
                    placeholder="e.g. BSIT"
                    required 
                  />
                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Year Classification</Form.Label>
                  <Form.Select 
                    size="lg"
                    className="bg-light border-0"
                    value={form.yearLevel} 
                    onChange={e => updateField('yearLevel', e.target.value)} 
                    required
                  >
                    <option value="">Choose Level...</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="d-md-flex gap-4">
                <Form.Group className="w-100 mb-3 mb-md-0">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Institutional Email</Form.Label>
                  <Form.Control 
                    type="email"
                    size="lg"
                    className="bg-light border-0"
                    value={form.email} 
                    onChange={e => updateField('email', e.target.value)} 
                    placeholder="name@university.edu"
                    required 
                  />
                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label className="fw-semibold small text-muted text-uppercase">Active Status</Form.Label>
                  <Form.Select 
                    size="lg"
                    className="bg-light border-0"
                    value={form.status} 
                    onChange={e => updateField('status', e.target.value)} 
                  >
                    <option value="enrolled">Enrolled</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="pt-3 d-flex flex-column flex-md-row gap-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="rounded-3 px-5 py-3 fw-bold border-0 shadow"
                >
                  Confirm Registration
                </Button>
                <Button 
                  variant="outline-secondary" 
                  className="rounded-3 px-5 py-3 border-0"
                  onClick={() => navigate('/list')}
                >
                  Discard Changes
                </Button>
              </div>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateStudent;