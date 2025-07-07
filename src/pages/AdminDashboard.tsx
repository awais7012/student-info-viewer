
import { useState, useEffect } from "react";
import { Check, X, Eye, Clock, Users, FileText, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Application {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  studentData: {
    registration: string;
    name: string;
    fatherName: string;
    department: string;
    class: string;
    studentContact: string;
    email?: string;
  };
  formData: any;
}

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Mock data - in real app, this would come from backend
  useEffect(() => {
    const mockApplications: Application[] = [
      {
        id: "APP001",
        status: "pending",
        submittedAt: "2024-01-15T10:30:00Z",
        studentData: {
          registration: "STU001",
          name: "John Doe",
          fatherName: "Robert Doe",
          department: "Computer Science",
          class: "BSc CS",
          studentContact: "9876543210"
        },
        formData: {
          // Full form data would be stored here
        }
      },
      {
        id: "APP002",
        status: "approved",
        submittedAt: "2024-01-14T09:15:00Z",
        studentData: {
          registration: "STU002",
          name: "Jane Smith",
          fatherName: "Michael Smith",
          department: "Business Administration",
          class: "BBA",
          studentContact: "9876543211"
        },
        formData: {}
      },
      {
        id: "APP003",
        status: "rejected",
        submittedAt: "2024-01-13T14:20:00Z",
        studentData: {
          registration: "STU003",
          name: "Ali Hassan",
          fatherName: "Hassan Ali",
          department: "Engineering",
          class: "BSc EE",
          studentContact: "9876543212"
        },
        formData: {}
      }
    ];
    setApplications(mockApplications);
  }, []);

  const handleApprove = (appId: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, status: 'approved' as const } : app
      )
    );
    toast.success("Application approved successfully!");
  };

  const handleReject = (appId: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === appId ? { ...app, status: 'rejected' as const } : app
      )
    );
    toast.success("Application rejected successfully!");
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-white';
      case 'approved': return 'bg-success text-white';
      case 'rejected': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="min-vh-100 bg-gradient-custom py-4">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-white mb-3">Admin Dashboard</h1>
          <p className="lead text-white">Manage student applications efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="custom-card">
              <div className="custom-card-header bg-primary">
                <div className="d-flex align-items-center">
                  <Users className="me-2" size={20} />
                  <span>Total Applications</span>
                </div>
              </div>
              <div className="custom-card-body text-center">
                <h2 className="fs-2 mb-0">{stats.total}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-card">
              <div className="custom-card-header bg-warning">
                <div className="d-flex align-items-center">
                  <Clock className="me-2" size={20} />
                  <span>Pending</span>
                </div>
              </div>
              <div className="custom-card-body text-center">
                <h2 className="fs-2 mb-0">{stats.pending}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-card">
              <div className="custom-card-header bg-success">
                <div className="d-flex align-items-center">
                  <CheckCircle className="me-2" size={20} />
                  <span>Approved</span>
                </div>
              </div>
              <div className="custom-card-body text-center">
                <h2 className="fs-2 mb-0">{stats.approved}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="custom-card">
              <div className="custom-card-header bg-secondary">
                <div className="d-flex align-items-center">
                  <XCircle className="me-2" size={20} />
                  <span>Rejected</span>
                </div>
              </div>
              <div className="custom-card-body text-center">
                <h2 className="fs-2 mb-0">{stats.rejected}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="custom-card">
              <div className="custom-card-body">
                <div className="d-flex gap-3">
                  <button
                    onClick={() => setFilter('all')}
                    className={`btn ${filter === 'all' ? 'btn-custom-primary' : 'btn-outline-secondary'}`}
                  >
                    All Applications
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`btn ${filter === 'pending' ? 'btn-custom-primary' : 'btn-outline-secondary'}`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilter('approved')}
                    className={`btn ${filter === 'approved' ? 'btn-custom-primary' : 'btn-outline-secondary'}`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setFilter('rejected')}
                    className={`btn ${filter === 'rejected' ? 'btn-custom-primary' : 'btn-outline-secondary'}`}
                  >
                    Rejected
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="row">
          <div className="col-12">
            <div className="custom-card">
              <div className="custom-card-header bg-primary">
                <h3 className="mb-0">Applications ({filteredApplications.length})</h3>
              </div>
              <div className="custom-card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Registration</th>
                        <th>Department</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((app) => (
                        <tr key={app.id}>
                          <td className="fw-bold">{app.id}</td>
                          <td>{app.studentData.name}</td>
                          <td>{app.studentData.registration}</td>
                          <td>{app.studentData.department}</td>
                          <td>{app.studentData.studentContact}</td>
                          <td>
                            <span className={`badge ${getStatusColor(app.status)} d-flex align-items-center gap-1`}>
                              {getStatusIcon(app.status)}
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </td>
                          <td>{new Date(app.submittedAt).toLocaleDateString()}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => setSelectedApplication(app)}
                                className="btn btn-sm btn-outline-primary"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              {app.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleApprove(app.id)}
                                    className="btn btn-sm btn-success"
                                    title="Approve"
                                  >
                                    <Check size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleReject(app.id)}
                                    className="btn btn-sm btn-danger"
                                    title="Reject"
                                  >
                                    <X size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Application Details - {selectedApplication.id}</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setSelectedApplication(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-primary">Student Information</h6>
                      <p><strong>Name:</strong> {selectedApplication.studentData.name}</p>
                      <p><strong>Father's Name:</strong> {selectedApplication.studentData.fatherName}</p>
                      <p><strong>Registration:</strong> {selectedApplication.studentData.registration}</p>
                      <p><strong>Department:</strong> {selectedApplication.studentData.department}</p>
                      <p><strong>Class:</strong> {selectedApplication.studentData.class}</p>
                      <p><strong>Contact:</strong> {selectedApplication.studentData.studentContact}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-primary">Application Status</h6>
                      <p>
                        <span className={`badge ${getStatusColor(selectedApplication.status)} d-flex align-items-center gap-1 w-fit`}>
                          {getStatusIcon(selectedApplication.status)}
                          {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                        </span>
                      </p>
                      <p><strong>Submitted:</strong> {new Date(selectedApplication.submittedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {selectedApplication.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleApprove(selectedApplication.id);
                          setSelectedApplication(null);
                        }}
                        className="btn btn-success"
                      >
                        <Check className="me-2" size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedApplication.id);
                          setSelectedApplication(null);
                        }}
                        className="btn btn-danger"
                      >
                        <X className="me-2" size={16} />
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
