
import { useState, useEffect } from "react";
import { Check, X, Eye, Clock, Users, FileText, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Application {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  studentData: any;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  // Load real applications from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem('studentApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Save applications to localStorage
  const saveApplications = (updatedApplications: Application[]) => {
    localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
    setApplications(updatedApplications);
  };

  const handleApprove = (appId: string) => {
    const updatedApps = applications.map(app => 
      app.id === appId ? { ...app, status: 'approved' as const } : app
    );
    saveApplications(updatedApps);
    toast.success("Application approved successfully!");
    setSelectedApplication(null);
  };

  const handleReject = (appId: string) => {
    const updatedApps = applications.map(app => 
      app.id === appId ? { ...app, status: 'rejected' as const } : app
    );
    saveApplications(updatedApps);
    toast.success("Application rejected successfully!");
    setSelectedApplication(null);
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-dark';
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

  if (applications.length === 0) {
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
                Back to Home
              </button>
              <div className="card shadow">
                <div className="card-body p-5">
                  <FileText size={64} className="text-muted mb-4" />
                  <h3 className="text-muted">No Applications Yet</h3>
                  <p className="text-muted">Applications will appear here once students submit their forms.</p>
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
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h3 mb-0 text-dark">Admin Dashboard</h1>
                <p className="text-muted">Manage student applications</p>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="btn btn-outline-primary"
              >
                <ArrowLeft className="me-2" size={16} />
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <Users className="text-primary me-2" size={24} />
                  <h5 className="mb-0">Total</h5>
                </div>
                <h2 className="text-primary mb-0">{stats.total}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <Clock className="text-warning me-2" size={24} />
                  <h5 className="mb-0">Pending</h5>
                </div>
                <h2 className="text-warning mb-0">{stats.pending}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <CheckCircle className="text-success me-2" size={24} />
                  <h5 className="mb-0">Approved</h5>
                </div>
                <h2 className="text-success mb-0">{stats.approved}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <XCircle className="text-danger me-2" size={24} />
                  <h5 className="mb-0">Rejected</h5>
                </div>
                <h2 className="text-danger mb-0">{stats.rejected}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  >
                    All ({stats.total})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('pending')}
                    className={`btn ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                  >
                    Pending ({stats.pending})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('approved')}
                    className={`btn ${filter === 'approved' ? 'btn-success' : 'btn-outline-success'}`}
                  >
                    Approved ({stats.approved})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('rejected')}
                    className={`btn ${filter === 'rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
                  >
                    Rejected ({stats.rejected})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom">
                <h5 className="mb-0">Applications ({filteredApplications.length})</h5>
              </div>
              <div className="card-body p-0">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-5">
                    <FileText size={48} className="text-muted mb-3" />
                    <h5 className="text-muted">No {filter} applications found</h5>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="border-0">Student</th>
                          <th className="border-0">Registration</th>
                          <th className="border-0">Department</th>
                          <th className="border-0">Contact</th>
                          <th className="border-0">Status</th>
                          <th className="border-0">Submitted</th>
                          <th className="border-0">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id}>
                            <td>
                              <div>
                                <div className="fw-bold">{app.studentData.name}</div>
                                <small className="text-muted">Father: {app.studentData.fatherName}</small>
                              </div>
                            </td>
                            <td className="fw-bold text-primary">{app.studentData.registration}</td>
                            <td>
                              <div>
                                <div>{app.studentData.department}</div>
                                <small className="text-muted">{app.studentData.class}</small>
                              </div>
                            </td>
                            <td>{app.studentData.studentContact}</td>
                            <td>
                              <span className={`badge ${getStatusColor(app.status)} d-flex align-items-center gap-1 w-fit`}>
                                {getStatusIcon(app.status)}
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </td>
                            <td>
                              <small>{new Date(app.submittedAt).toLocaleDateString()}</small>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <button
                                  onClick={() => setSelectedApplication(app)}
                                  className="btn btn-sm btn-outline-primary"
                                  title="View Details"
                                >
                                  <Eye size={14} />
                                </button>
                                {app.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleApprove(app.id)}
                                      className="btn btn-sm btn-success"
                                      title="Approve"
                                    >
                                      <Check size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleReject(app.id)}
                                      className="btn btn-sm btn-danger"
                                      title="Reject"
                                    >
                                      <X size={14} />
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
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Application Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedApplication(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-primary border-bottom pb-2 mb-3">Student Information</h6>
                      <div className="mb-2"><strong>Name:</strong> {selectedApplication.studentData.name}</div>
                      <div className="mb-2"><strong>Father's Name:</strong> {selectedApplication.studentData.fatherName}</div>
                      <div className="mb-2"><strong>Registration:</strong> {selectedApplication.studentData.registration}</div>
                      <div className="mb-2"><strong>Department:</strong> {selectedApplication.studentData.department}</div>
                      <div className="mb-2"><strong>Class:</strong> {selectedApplication.studentData.class}</div>
                      <div className="mb-2"><strong>Student Contact:</strong> {selectedApplication.studentData.studentContact}</div>
                      <div className="mb-2"><strong>Father Contact:</strong> {selectedApplication.studentData.fatherContact}</div>
                      <div className="mb-2"><strong>Address:</strong> {selectedApplication.studentData.address}</div>
                      <div className="mb-2"><strong>Session:</strong> {selectedApplication.studentData.session}</div>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-primary border-bottom pb-2 mb-3">Application Status</h6>
                      <div className="mb-3">
                        <span className={`badge ${getStatusColor(selectedApplication.status)} d-flex align-items-center gap-1 w-fit p-2`}>
                          {getStatusIcon(selectedApplication.status)}
                          {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                        </span>
                      </div>
                      <div className="mb-2"><strong>Submitted:</strong> {new Date(selectedApplication.submittedAt).toLocaleString()}</div>
                      
                      {selectedApplication.studentData.totalIncome && (
                        <div>
                          <h6 className="text-primary border-bottom pb-2 mb-3 mt-4">Financial Information</h6>
                          <div className="mb-2"><strong>Total Income:</strong> {selectedApplication.studentData.totalIncome}</div>
                          <div className="mb-2"><strong>Residency:</strong> {selectedApplication.studentData.residencyType}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {selectedApplication.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(selectedApplication.id)}
                        className="btn btn-success"
                      >
                        <Check className="me-2" size={16} />
                        Approve Application
                      </button>
                      <button
                        onClick={() => handleReject(selectedApplication.id)}
                        className="btn btn-danger"
                      >
                        <X className="me-2" size={16} />
                        Reject Application
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
