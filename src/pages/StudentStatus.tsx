
import { useState, useEffect } from "react";
import { CheckCircle, Clock, XCircle, ArrowLeft, FileText, User, Phone, MapPin, GraduationCap, Calendar, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Application {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  studentData: any;
  adminComments?: string;
}

const StudentStatus = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    // Get current application from localStorage
    const currentApp = localStorage.getItem('currentApplication');
    if (currentApp) {
      const parsedApp = JSON.parse(currentApp);
      
      // Check if status has been updated in the applications list
      const allApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
      const updatedApp = allApplications.find((app: Application) => app.id === parsedApp.id);
      
      if (updatedApp) {
        setApplication(updatedApp);
        localStorage.setItem('currentApplication', JSON.stringify(updatedApp));
      } else {
        setApplication(parsedApp);
      }
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'pending': return 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
      case 'approved': return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'rejected': return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      default: return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={32} className="text-white" />;
      case 'approved': return <CheckCircle size={32} className="text-white" />;
      case 'rejected': return <XCircle size={32} className="text-white" />;
      default: return <FileText size={32} className="text-white" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending': return 'Your application is under review. We will notify you once a decision is made.';
      case 'approved': return 'Congratulations! Your scholarship application has been approved.';
      case 'rejected': return 'We regret to inform you that your application was not approved at this time.';
      default: return 'Application status unknown.';
    }
  };

  if (!application) {
    return (
      <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <button 
                onClick={() => navigate('/')}
                className="btn btn-primary mb-4 px-4 py-2"
                style={{ borderRadius: '25px' }}
              >
                <ArrowLeft className="me-2" size={16} />
                Submit Application
              </button>
              <div className="card border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <div className="text-muted mb-4">
                    <FileText size={64} />
                  </div>
                  <h3 className="text-muted mb-3">No Application Found</h3>
                  <p className="text-muted">Please submit your application first to view the status.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h2 mb-1 text-dark fw-bold">Application Status</h1>
                <p className="text-muted mb-0">Track your scholarship application progress</p>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="btn btn-outline-primary px-4 py-2"
                style={{ borderRadius: '25px' }}
              >
                <ArrowLeft className="me-2" size={16} />
                Back to Home
              </button>
            </div>

            {/* Status Card */}
            <div className="card border-0 shadow-lg mb-4" style={{ borderRadius: '15px' }}>
              <div 
                className="card-body text-center py-5"
                style={{ background: getStatusBgColor(application.status), borderRadius: '15px' }}
              >
                <div className="mb-3">
                  {getStatusIcon(application.status)}
                </div>
                <h2 className="text-white mb-3 fw-bold">
                  Application {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </h2>
                <p className="text-white mb-0 fs-5">{getStatusMessage(application.status)}</p>
              </div>
            </div>

            {/* Admin Comments */}
            {application.adminComments && (
              <div className="card border-0 shadow mb-4" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <MessageSquare className="text-primary me-2" size={20} />
                    <h6 className="mb-0 fw-bold text-primary">Admin Comments</h6>
                  </div>
                  <p className="mb-0 text-dark">{application.adminComments}</p>
                </div>
              </div>
            )}

            {/* Application Details */}
            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="card-header bg-white border-0 p-4" style={{ borderRadius: '15px 15px 0 0' }}>
                <h5 className="mb-0 fw-bold text-dark">Application Details</h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded-3 mb-3">
                      <User className="text-primary me-3" size={24} />
                      <div>
                        <div className="fw-bold text-dark">{application.studentData.name}</div>
                        <small className="text-muted">Student Name</small>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center p-3 bg-light rounded-3 mb-3">
                      <FileText className="text-primary me-3" size={24} />
                      <div>
                        <div className="fw-bold text-dark">{application.studentData.registration}</div>
                        <small className="text-muted">Registration Number</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center p-3 bg-light rounded-3 mb-3">
                      <GraduationCap className="text-primary me-3" size={24} />
                      <div>
                        <div className="fw-bold text-dark">{application.studentData.department}</div>
                        <small className="text-muted">{application.studentData.class}</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-center p-3 bg-light rounded-3 mb-3">
                      <Phone className="text-primary me-3" size={24} />
                      <div>
                        <div className="fw-bold text-dark">{application.studentData.studentContact}</div>
                        <small className="text-muted">Contact Number</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-start p-3 bg-light rounded-3 mb-3">
                      <MapPin className="text-primary me-3 mt-1" size={24} />
                      <div>
                        <div className="fw-bold text-dark">{application.studentData.address}</div>
                        <small className="text-muted">Address</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center p-3 bg-light rounded-3 mb-3">
                      <Calendar className="text-primary me-3" size={24} />
                      <div>
                        <div className="fw-bold text-dark">{new Date(application.submittedAt).toLocaleDateString()}</div>
                        <small className="text-muted">Submitted On</small>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-12">
                    <h6 className="text-primary mb-3 fw-bold">Additional Information</h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-3">
                          <strong className="text-dark">Father's Name:</strong>
                          <div className="text-muted">{application.studentData.fatherName}</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-3">
                          <strong className="text-dark">Session:</strong>
                          <div className="text-muted">{application.studentData.session}</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="p-3 bg-light rounded-3">
                          <strong className="text-dark">Application ID:</strong>
                          <div className="text-muted">{application.id}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatus;
