import { useState, useEffect } from "react";
import { Check, X, Eye, Clock, Users, FileText, CheckCircle, XCircle, ArrowLeft, Filter, Search } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Application {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  studentData: any;
  adminComments?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load applications from localStorage
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

  const handleApprove = (appId: string, comments?: string) => {
    const updatedApps = applications.map(app => 
      app.id === appId ? { 
        ...app, 
        status: 'approved' as const,
        adminComments: comments || 'Application approved. Congratulations!'
      } : app
    );
    saveApplications(updatedApps);
    toast.success("Application approved successfully!");
    setSelectedApplication(null);
  };

  const handleReject = (appId: string, comments?: string) => {
    const updatedApps = applications.map(app => 
      app.id === appId ? { 
        ...app, 
        status: 'rejected' as const,
        adminComments: comments || 'Application rejected due to insufficient criteria.'
      } : app
    );
    saveApplications(updatedApps);
    toast.success("Application rejected successfully!");
    setSelectedApplication(null);
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = searchTerm === '' || 
      app.studentData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentData.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentData.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
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
      <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <button 
                onClick={() => navigate('/')}
                className="btn btn-primary mb-4 px-4 py-2"
                style={{ borderRadius: '25px' }}
              >
                <ArrowLeft className="me-2" size={16} />
                Back to Home
              </button>
              <div className="card border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <FileText size={64} className="text-muted mb-4" />
                  <h3 className="text-muted mb-3">No Applications Yet</h3>
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
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h2 mb-1 text-dark fw-bold">Admin Dashboard</h1>
                <p className="text-muted mb-0">Manage student scholarship applications</p>
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
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
                  >
                    <Users className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold text-primary">{stats.total}</h3>
                    <small className="text-muted">Total Applications</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                  >
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold" style={{ color: '#f59e0b' }}>{stats.pending}</h3>
                    <small className="text-muted">Pending Review</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                  >
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold" style={{ color: '#10b981' }}>{stats.approved}</h3>
                    <small className="text-muted">Approved</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-4">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
                  >
                    <XCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-0 fw-bold" style={{ color: '#ef4444' }}>{stats.rejected}</h3>
                    <small className="text-muted">Rejected</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        onClick={() => setFilter('all')}
                        className={`btn px-3 py-2 ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                        style={{ borderRadius: '20px' }}
                      >
                        <Filter size={14} className="me-1" />
                        All ({stats.total})
                      </button>
                      <button
                        onClick={() => setFilter('pending')}
                        className={`btn px-3 py-2 ${filter === 'pending' ? 'text-white' : 'btn-outline-warning'}`}
                        style={{ 
                          borderRadius: '20px',
                          backgroundColor: filter === 'pending' ? '#f59e0b' : 'transparent',
                          borderColor: '#f59e0b'
                        }}
                      >
                        Pending ({stats.pending})
                      </button>
                      <button
                        onClick={() => setFilter('approved')}
                        className={`btn px-3 py-2 ${filter === 'approved' ? 'text-white' : 'btn-outline-success'}`}
                        style={{ 
                          borderRadius: '20px',
                          backgroundColor: filter === 'approved' ? '#10b981' : 'transparent',
                          borderColor: '#10b981'
                        }}
                      >
                        Approved ({stats.approved})
                      </button>
                      <button
                        onClick={() => setFilter('rejected')}
                        className={`btn px-3 py-2 ${filter === 'rejected' ? 'text-white' : 'btn-outline-danger'}`}
                        style={{ 
                          borderRadius: '20px',
                          backgroundColor: filter === 'rejected' ? '#ef4444' : 'transparent',
                          borderColor: '#ef4444'
                        }}
                      >
                        Rejected ({stats.rejected})
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="position-relative">
                      <Search className="position-absolute text-muted" size={18} style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        className="form-control ps-5"
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ borderRadius: '20px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
              <div className="card-header bg-white border-0 p-4" style={{ borderRadius: '15px 15px 0 0' }}>
                <h5 className="mb-0 fw-bold text-dark">
                  Applications ({filteredApplications.length})
                </h5>
              </div>
              <div className="card-body p-0">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-5">
                    <FileText size={48} className="text-muted mb-3" />
                    <h5 className="text-muted">No {filter !== 'all' ? filter : ''} applications found</h5>
                    {searchTerm && <p className="text-muted">Try adjusting your search terms</p>}
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: '#f8fafc' }}>
                        <tr>
                          <th className="border-0 p-3 fw-bold text-dark">Student</th>
                          <th className="border-0 p-3 fw-bold text-dark">Registration</th>
                          <th className="border-0 p-3 fw-bold text-dark">Department</th>
                          <th className="border-0 p-3 fw-bold text-dark">Contact</th>
                          <th className="border-0 p-3 fw-bold text-dark">Status</th>
                          <th className="border-0 p-3 fw-bold text-dark">Submitted</th>
                          <th className="border-0 p-3 fw-bold text-dark">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id}>
                            <td className="p-3">
                              <div>
                                <div className="fw-bold text-dark">{app.studentData.name}</div>
                                <small className="text-muted">Father: {app.studentData.fatherName}</small>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="fw-bold text-primary">{app.studentData.registration}</span>
                            </td>
                            <td className="p-3">
                              <div>
                                <div className="text-dark">{app.studentData.department}</div>
                                <small className="text-muted">{app.studentData.class}</small>
                              </div>
                            </td>
                            <td className="p-3 text-dark">{app.studentData.studentContact}</td>
                            <td className="p-3">
                              <span 
                                className="badge d-flex align-items-center gap-1 px-3 py-2"
                                style={{ 
                                  backgroundColor: getStatusColor(app.status),
                                  color: 'white',
                                  borderRadius: '15px',
                                  width: 'fit-content'
                                }}
                              >
                                {getStatusIcon(app.status)}
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </td>
                            <td className="p-3">
                              <small className="text-muted">
                                {new Date(app.submittedAt).toLocaleDateString()}
                              </small>
                            </td>
                            <td className="p-3">
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => setSelectedApplication(app)}
                                  className="btn btn-sm btn-outline-primary"
                                  title="View Details"
                                  style={{ borderRadius: '8px' }}
                                >
                                  <Eye size={14} />
                                </button>
                                {app.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleApprove(app.id)}
                                      className="btn btn-sm text-white"
                                      title="Approve"
                                      style={{ 
                                        backgroundColor: '#10b981',
                                        borderRadius: '8px',
                                        border: 'none'
                                      }}
                                    >
                                      <Check size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleReject(app.id)}
                                      className="btn btn-sm text-white"
                                      title="Reject"
                                      style={{ 
                                        backgroundColor: '#ef4444',
                                        borderRadius: '8px',
                                        border: 'none'
                                      }}
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
              <div className="modal-content border-0" style={{ borderRadius: '15px' }}>
                <div className="modal-header border-0 p-4">
                  <h5 className="modal-title fw-bold">Application Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedApplication(null)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-primary border-bottom pb-2 mb-3 fw-bold">Student Information</h6>
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
                      <h6 className="text-primary border-bottom pb-2 mb-3 fw-bold">Application Status</h6>
                      <div className="mb-3">
                        <span 
                          className="badge d-flex align-items-center gap-2 p-3"
                          style={{ 
                            backgroundColor: getStatusColor(selectedApplication.status),
                            color: 'white',
                            borderRadius: '10px',
                            width: 'fit-content'
                          }}
                        >
                          {getStatusIcon(selectedApplication.status)}
                          {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                        </span>
                      </div>
                      <div className="mb-2"><strong>Submitted:</strong> {new Date(selectedApplication.submittedAt).toLocaleString()}</div>
                      
                      {selectedApplication.studentData.totalIncome && (
                        <div>
                          <h6 className="text-primary border-bottom pb-2 mb-3 mt-4 fw-bold">Financial Information</h6>
                          <div className="mb-2"><strong>Total Income:</strong> {selectedApplication.studentData.totalIncome}</div>
                          <div className="mb-2"><strong>Residency:</strong> {selectedApplication.studentData.residencyType}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 p-4">
                  {selectedApplication.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(selectedApplication.id)}
                        className="btn text-white px-4 py-2"
                        style={{ 
                          backgroundColor: '#10b981',
                          borderRadius: '8px',
                          border: 'none'
                        }}
                      >
                        <Check className="me-2" size={16} />
                        Approve Application
                      </button>
                      <button
                        onClick={() => handleReject(selectedApplication.id)}
                        className="btn text-white px-4 py-2"
                        style={{ 
                          backgroundColor: '#ef4444',
                          borderRadius: '8px',
                          border: 'none'
                        }}
                      >
                        <X className="me-2" size={16} />
                        Reject Application
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="btn btn-secondary px-4 py-2"
                    style={{ borderRadius: '8px' }}
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
