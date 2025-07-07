
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ApplicationStatus {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  comments?: string;
  studentData: {
    registration: string;
    name: string;
    department: string;
    class: string;
  };
}

const StudentStatus = () => {
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, this would come from backend based on student ID
    setTimeout(() => {
      const mockStatus: ApplicationStatus = {
        id: "APP001",
        status: "approved", // Change this to test different states: 'pending', 'approved', 'rejected'
        submittedAt: "2024-01-15T10:30:00Z",
        reviewedAt: "2024-01-16T14:20:00Z",
        comments: "Application meets all requirements. Scholarship approved.",
        studentData: {
          registration: "STU001",
          name: "John Doe",
          department: "Computer Science",
          class: "BSc CS"
        }
      };
      setApplicationStatus(mockStatus);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 bg-gradient-custom d-flex align-items-center justify-content-center">
        <div className="text-center text-white">
          <div className="spinner-border text-light mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Checking your application status...</p>
        </div>
      </div>
    );
  }

  if (!applicationStatus) {
    return (
      <div className="min-vh-100 bg-gradient-custom py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="custom-card">
                <div className="custom-card-body text-center p-5">
                  <AlertCircle size={64} className="text-warning mb-4" />
                  <h3 className="text-dark mb-3">No Application Found</h3>
                  <p className="text-muted mb-4">
                    You haven't submitted any application yet. Click below to start your application process.
                  </p>
                  <Link to="/" className="btn btn-custom-primary">
                    Start New Application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock size={48} />,
          color: 'text-warning',
          bgColor: 'bg-warning-light',
          title: 'Application Under Review',
          message: 'Your application is currently being reviewed by our admissions team. We will notify you once a decision has been made.',
          actionColor: 'warning'
        };
      case 'approved':
        return {
          icon: <CheckCircle size={48} />,
          color: 'text-success',
          bgColor: 'bg-success-light',
          title: 'Application Approved!',
          message: 'Congratulations! Your scholarship application has been approved. Please check your email for further instructions.',
          actionColor: 'success'
        };
      case 'rejected':
        return {
          icon: <XCircle size={48} />,
          color: 'text-danger',
          bgColor: 'bg-danger-light',
          title: 'Application Not Approved',
          message: 'Unfortunately, your application was not approved at this time. You may reapply in the next cycle.',
          actionColor: 'danger'
        };
      default:
        return {
          icon: <FileText size={48} />,
          color: 'text-secondary',
          bgColor: 'bg-secondary-light',
          title: 'Application Status',
          message: 'Your application status is being processed.',
          actionColor: 'secondary'
        };
    }
  };

  const statusConfig = getStatusConfig(applicationStatus.status);

  return (
    <div className="min-vh-100 bg-gradient-custom py-4">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-white mb-3">Application Status</h1>
          <p className="lead text-white">Track your scholarship application progress</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Main Status Card */}
            <div className="custom-card mb-4">
              <div className="custom-card-body text-center p-5">
                <div className={`${statusConfig.bgColor} rounded-circle d-inline-flex align-items-center justify-content-center mb-4`}
                     style={{ width: '100px', height: '100px' }}>
                  <div className={statusConfig.color}>
                    {statusConfig.icon}
                  </div>
                </div>
                
                <h2 className="text-dark mb-3">{statusConfig.title}</h2>
                <p className="text-muted mb-4 fs-5">{statusConfig.message}</p>
                
                <div className={`alert alert-${statusConfig.actionColor} d-flex align-items-center`}>
                  <div className={statusConfig.color + ' me-3'}>
                    {statusConfig.icon}
                  </div>
                  <div className="text-start">
                    <strong>Current Status:</strong> {applicationStatus.status.charAt(0).toUpperCase() + applicationStatus.status.slice(1)}
                    <br />
                    <small>Application ID: {applicationStatus.id}</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="custom-card mb-4">
              <div className="custom-card-header bg-primary">
                <h4 className="mb-0">Application Details</h4>
              </div>
              <div className="custom-card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-primary mb-3">Student Information</h6>
                    <div className="mb-2">
                      <strong>Name:</strong> {applicationStatus.studentData.name}
                    </div>
                    <div className="mb-2">
                      <strong>Registration:</strong> {applicationStatus.studentData.registration}
                    </div>
                    <div className="mb-2">
                      <strong>Department:</strong> {applicationStatus.studentData.department}
                    </div>
                    <div className="mb-2">
                      <strong>Class:</strong> {applicationStatus.studentData.class}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-primary mb-3">Timeline</h6>
                    <div className="mb-2">
                      <strong>Submitted:</strong> {new Date(applicationStatus.submittedAt).toLocaleString()}
                    </div>
                    {applicationStatus.reviewedAt && (
                      <div className="mb-2">
                        <strong>Reviewed:</strong> {new Date(applicationStatus.reviewedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                
                {applicationStatus.comments && (
                  <div className="mt-4">
                    <h6 className="text-primary mb-3">Comments</h6>
                    <div className="bg-light p-3 rounded">
                      <p className="mb-0">{applicationStatus.comments}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              {applicationStatus.status === 'rejected' && (
                <Link to="/" className="btn btn-custom-primary me-3">
                  Apply Again
                </Link>
              )}
              <Link to="/" className="btn btn-outline-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatus;
