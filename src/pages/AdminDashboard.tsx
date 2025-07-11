
import { useState, useEffect } from "react";
import { Check, X, Eye, Clock, Users, FileText, CheckCircle, XCircle, ArrowLeft, Filter, Search, User, GraduationCap, Phone, MapPin, Calendar, MessageSquare, Download } from "lucide-react";
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
      case 'pending': return 'hsl(43, 96%, 56%)';
      case 'approved': return 'hsl(142, 76%, 36%)';
      case 'rejected': return 'hsl(0, 84%, 60%)';
      default: return 'hsl(215, 16%, 47%)';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </button>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-12 backdrop-blur-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Applications Yet</h3>
              <p className="text-gray-600 text-lg">Applications will appear here once students submit their forms.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
                  <Users className="mr-3 text-blue-600" size={32} />
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Manage student scholarship applications</p>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1">
              <div className="text-center">
                <Users size={28} className="mx-auto mb-3" />
                <h3 className="text-3xl font-bold">{stats.total}</h3>
                <p className="text-blue-100 text-sm">Total Applications</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1">
              <div className="text-center">
                <Clock size={28} className="mx-auto mb-3" />
                <h3 className="text-3xl font-bold">{stats.pending}</h3>
                <p className="text-amber-100 text-sm">Pending Review</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1">
              <div className="text-center">
                <CheckCircle size={28} className="mx-auto mb-3" />
                <h3 className="text-3xl font-bold">{stats.approved}</h3>
                <p className="text-emerald-100 text-sm">Approved</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1">
              <div className="text-center">
                <XCircle size={28} className="mx-auto mb-3" />
                <h3 className="text-3xl font-bold">{stats.rejected}</h3>
                <p className="text-red-100 text-sm">Rejected</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${
                    filter === 'all' 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${
                    filter === 'pending' 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending ({stats.pending})
                </button>
                <button
                  onClick={() => setFilter('approved')}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${
                    filter === 'approved' 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Approved ({stats.approved})
                </button>
                <button
                  onClick={() => setFilter('rejected')}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${
                    filter === 'rejected' 
                      ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rejected ({stats.rejected})
                </button>
              </div>
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <h5 className="font-bold text-gray-800 flex items-center text-lg">
                <FileText className="mr-3 text-blue-600" size={24} />
                Applications ({filteredApplications.length})
              </h5>
            </div>
            
            {filteredApplications.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={40} className="text-gray-400" />
                </div>
                <h5 className="text-gray-500 text-xl mb-2">No {filter !== 'all' ? filter : ''} applications found</h5>
                {searchTerm && <p className="text-gray-400">Try adjusting your search terms</p>}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Student Details</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Academic Info</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Contact</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Financial</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app, index) => (
                      <tr key={app.id} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-4">
                              <User size={20} className="text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{app.studentData.name}</div>
                              <div className="text-sm text-gray-600">{app.studentData.registration}</div>
                              <div className="text-xs text-gray-500">Father: {app.studentData.fatherName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-800">{app.studentData.department}</div>
                          <div className="text-sm text-gray-600">{app.studentData.class}</div>
                          <div className="text-xs text-gray-500">Session: {app.studentData.session}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-800">{app.studentData.studentContact}</div>
                          <div className="text-xs text-gray-600">{app.studentData.fatherContact}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-800">Rs. {app.studentData.totalIncome}</div>
                          <div className="text-xs text-gray-600">Monthly Income</div>
                          {app.studentData.totalSiblings && (
                            <div className="text-xs text-gray-500">{app.studentData.totalSiblings} Siblings</div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span 
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg"
                            style={{ backgroundColor: getStatusColor(app.status) }}
                          >
                            {getStatusIcon(app.status)}
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedApplication(app)}
                              className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 rounded-xl hover:from-blue-200 hover:to-indigo-200 transition-all transform hover:scale-110"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            {app.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApprove(app.id)}
                                  className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 rounded-xl hover:from-green-200 hover:to-emerald-200 transition-all transform hover:scale-110"
                                  title="Approve"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() => handleReject(app.id)}
                                  className="p-3 bg-gradient-to-br from-red-100 to-rose-100 text-red-700 rounded-xl hover:from-red-200 hover:to-rose-200 transition-all transform hover:scale-110"
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
            )}
          </div>
        </div>

        {/* Enhanced Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-auto">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl my-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 flex justify-between items-center">
                <h5 className="font-bold flex items-center text-xl">
                  <User className="mr-3" size={24} />
                  {selectedApplication.studentData.name} - Application Details
                </h5>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="max-h-[75vh] overflow-y-auto">
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Personal Information */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <h6 className="font-bold text-blue-700 mb-4 flex items-center text-lg">
                        <User className="mr-2" size={20} />
                        Personal Information
                      </h6>
                      <div className="space-y-3 text-sm">
                        <div><strong className="text-gray-700">Name:</strong> <span className="text-gray-900">{selectedApplication.studentData.name}</span></div>
                        <div><strong className="text-gray-700">Registration:</strong> <span className="text-gray-900">{selectedApplication.studentData.registration}</span></div>
                        <div><strong className="text-gray-700">Father's Name:</strong> <span className="text-gray-900">{selectedApplication.studentData.fatherName}</span></div>
                        <div><strong className="text-gray-700">Student Contact:</strong> <span className="text-gray-900">{selectedApplication.studentData.studentContact}</span></div>
                        <div><strong className="text-gray-700">Father Contact:</strong> <span className="text-gray-900">{selectedApplication.studentData.fatherContact}</span></div>
                        <div><strong className="text-gray-700">Address:</strong> <span className="text-gray-900">{selectedApplication.studentData.address}</span></div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                      <h6 className="font-bold text-green-700 mb-4 flex items-center text-lg">
                        <GraduationCap className="mr-2" size={20} />
                        Academic Information
                      </h6>
                      <div className="space-y-3 text-sm">
                        <div><strong className="text-gray-700">Department:</strong> <span className="text-gray-900">{selectedApplication.studentData.department}</span></div>
                        <div><strong className="text-gray-700">Class:</strong> <span className="text-gray-900">{selectedApplication.studentData.class}</span></div>
                        <div><strong className="text-gray-700">Session:</strong> <span className="text-gray-900">{selectedApplication.studentData.session}</span></div>
                        {selectedApplication.studentData.matricMarks && (
                          <>
                            <div><strong className="text-gray-700">Matric Marks:</strong> <span className="text-gray-900">{selectedApplication.studentData.matricMarks} ({selectedApplication.studentData.matricYear})</span></div>
                            <div><strong className="text-gray-700">Inter Marks:</strong> <span className="text-gray-900">{selectedApplication.studentData.interMarks} ({selectedApplication.studentData.interYear})</span></div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Guardian Information */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                      <h6 className="font-bold text-amber-700 mb-4 flex items-center text-lg">
                        <Users className="mr-2" size={20} />
                        Guardian Information
                      </h6>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong className="text-gray-700">Father Status:</strong> 
                          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${selectedApplication.studentData.fatherAlive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedApplication.studentData.fatherAlive ? 'Alive' : 'Deceased'}
                          </span>
                        </div>
                        {!selectedApplication.studentData.fatherAlive && (
                          <>
                            <div><strong className="text-gray-700">Guardian:</strong> <span className="text-gray-900">{selectedApplication.studentData.guardianName}</span></div>
                            <div><strong className="text-gray-700">Relationship:</strong> <span className="text-gray-900">{selectedApplication.studentData.relationship}</span></div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                      <h6 className="font-bold text-purple-700 mb-4 flex items-center text-lg">
                        <MessageSquare className="mr-2" size={20} />
                        Financial Information
                      </h6>
                      <div className="space-y-3 text-sm">
                        <div><strong className="text-gray-700">Total Income:</strong> <span className="text-gray-900">Rs. {selectedApplication.studentData.totalIncome}</span></div>
                        <div><strong className="text-gray-700">Siblings:</strong> <span className="text-gray-900">{selectedApplication.studentData.totalSiblings || 0}</span></div>
                        {selectedApplication.studentData.siblings && selectedApplication.studentData.siblings.length > 0 && (
                          <div>
                            <strong className="text-gray-700">Siblings Details:</strong>
                            <ul className="mt-2 ml-4 list-disc space-y-1">
                              {selectedApplication.studentData.siblings.map((sibling, index) => (
                                <li key={index} className="text-xs text-gray-600">
                                  {sibling.name} ({sibling.age} years) - {sibling.education}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 mb-8 border border-gray-100">
                    <h6 className="font-bold text-gray-700 mb-4 flex items-center text-lg">
                      <FileText className="mr-2" size={20} />
                      Uploaded Documents ({selectedApplication.studentData.documents?.length || 0})
                    </h6>
                    {selectedApplication.studentData.documents?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedApplication.studentData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
                            <FileText className="text-blue-600 mr-3 flex-shrink-0" size={20} />
                            <div className="flex-grow min-w-0">
                              <div className="text-sm font-medium truncate text-gray-800">{doc.name}</div>
                              <div className="text-xs text-gray-500">{doc.size}</div>
                            </div>
                            <button className="ml-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Download size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No documents uploaded</p>
                    )}
                  </div>

                  {/* Application Status */}
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-100">
                    <h6 className="font-bold text-slate-700 mb-4 flex items-center text-lg">
                      <MessageSquare className="mr-2" size={20} />
                      Application Status
                    </h6>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <strong className="text-gray-700">Status:</strong>
                        <span 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-medium shadow-lg"
                          style={{ backgroundColor: getStatusColor(selectedApplication.status) }}
                        >
                          {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                        </span>
                      </div>
                      <div><strong className="text-gray-700">Submitted:</strong> <span className="text-gray-900">{new Date(selectedApplication.submittedAt).toLocaleString()}</span></div>
                      {selectedApplication.adminComments && (
                        <div>
                          <strong className="text-gray-700">Admin Comments:</strong>
                          <div className="mt-2 p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-gray-800">
                            {selectedApplication.adminComments}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-8 py-6 flex gap-4 justify-end bg-gradient-to-r from-gray-50 to-slate-50">
                {selectedApplication.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedApplication.id)}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Check size={18} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedApplication.id)}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <X size={18} />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
