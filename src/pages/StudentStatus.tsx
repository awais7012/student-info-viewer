
import { useState, useEffect } from "react";
import { CheckCircle, Clock, XCircle, ArrowLeft, FileText, User, Phone, MapPin, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Application {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  studentData: any;
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
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={24} />;
      case 'approved': return <CheckCircle size={24} />;
      case 'rejected': return <XCircle size={24} />;
      default: return <FileText size={24} />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending': return 'Your application is under review. We will notify you once a decision is made.';
      case 'approved': return 'Congratulations! Your application has been approved.';
      case 'rejected': return 'Unfortunately, your application was not approved at this time.';
      default: return 'Application status unknown.';
    }
  };

  if (!application) {
    return (
      <div className="min-vh-100 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <button 
                onClick={() => navigate('/')}
                className="btn btn-outline-primary mb-4"
              >
                <ArrowLeft className="me-2" size={16} />
                Submit Application
              </button>
              <div className="card shadow">
                <div className="card-body p-5">
                  <FileText size={64} className="text-muted mb-4" />
                  <h3 className="text-muted">No Application Found</h3>
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
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="h3 mb-0">Application Status</h1>
                <p className="text-muted">Track your scholarship application progress</p>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="btn btn-outline-primary"
              >
                <ArrowLeft className="me-2" size={16} />
                Back to Home
              </button>
            </div>

            {/* Status Card */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body text-center p-4">
                <div className={`text-${getStatusColor(application.status)} mb-3`}>
                  {getStatusIcon(application.status)}
                </div>
                <h3 className={`text-${getStatusColor(application.status)} mb-3`}>
                  Application {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </h3>
                <p className="text-muted mb-0">{getStatusMessage(application.status)}</p>
              </div>
            </div>

            {/* Application Details */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom">
                <h5 className="mb-0">Application Details</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <User className="text-primary me-2" size={20} />
                      <div>
                        <div className="fw-bold">{application.studentData.name}</div>
                        <small className="text-muted">Student Name</small>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <FileText className="text-primary me-2" size={20} />
                      <div>
                        <div className="fw-bold">{application.studentData.registration}</div>
                        <small className="text-muted">Registration Number</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <GraduationCap className="text-primary me-2" size={20} />
                      <div>
                        <div className="fw-bold">{application.studentData.department}</div>
                        <small className="text-muted">{application.studentData.class}</small>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <Phone className="text-primary me-2" size={20} />
                      <div>
                        <div className="fw-bold">{application.studentData.studentContact}</div>
                        <small className="text-muted">Contact Number</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                      <MapPin className="text-primary me-2 mt-1" size={20} />
                      <div>
                        <div className="fw-bold">{application.studentData.address}</div>
                        <small className="text-muted">Address</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <Clock className="text-primary me-2" size={20} />
                      <div>
                        <div className="fw-bold">{new Date(application.submittedAt).toLocaleDateString()}</div>
                        <small className="text-muted">Submitted On</small>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-12">
                    <h6 className="text-primary mb-3">Additional Information</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Father's Name:</strong> {application.studentData.fatherName}</p>
                        <p><strong>Father's Contact:</strong> {application.studentData.fatherContact}</p>
                        <p><strong>Session:</strong> {application.studentData.session}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Application ID:</strong> {application.id}</p>
                        <p><strong>Current Status:</strong> 
                          <span className={`badge bg-${getStatusColor(application.status)} ms-2`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </p>
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
