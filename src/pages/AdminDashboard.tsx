import { useState, useEffect } from "react";
import { Check, X, Eye, Clock, Users, FileText, CheckCircle, XCircle, ArrowLeft, Filter, Search, User, GraduationCap, Phone, MapPin, Calendar, MessageSquare, Download } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 mb-6 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </button>
            <div className="bg-card rounded-xl shadow-xl border p-8">
              <FileText size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">No Applications Yet</h3>
              <p className="text-muted-foreground">Applications will appear here once students submit their forms.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container-fluid h-screen flex flex-col">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 bg-card border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center">
                  <Users className="mr-3 text-primary" size={28} />
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">Manage student scholarship applications</p>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards - Fixed */}
        <div className="flex-shrink-0 bg-card border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="text-center">
                  <Users size={24} className="mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{stats.total}</h3>
                  <p className="text-xs opacity-90">Total Applications</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="text-center">
                  <Clock size={24} className="mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{stats.pending}</h3>
                  <p className="text-xs opacity-90">Pending Review</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="text-center">
                  <CheckCircle size={24} className="mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{stats.approved}</h3>
                  <p className="text-xs opacity-90">Approved</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="text-center">
                  <XCircle size={24} className="mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{stats.rejected}</h3>
                  <p className="text-xs opacity-90">Rejected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters - Fixed */}
        <div className="flex-shrink-0 bg-card border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === 'all' 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  All ({stats.total})
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === 'pending' 
                      ? 'bg-yellow-500 text-white shadow-md' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Pending ({stats.pending})
                </button>
                <button
                  onClick={() => setFilter('approved')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === 'approved' 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Approved ({stats.approved})
                </button>
                <button
                  onClick={() => setFilter('rejected')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === 'rejected' 
                      ? 'bg-red-500 text-white shadow-md' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Rejected ({stats.rejected})
                </button>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table - Scrollable */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="container mx-auto px-4 py-4">
              <div className="bg-card rounded-xl shadow-lg border overflow-hidden">
                <div className="bg-muted/50 px-6 py-4 border-b">
                  <h5 className="font-bold text-foreground flex items-center">
                    <FileText className="mr-2 text-primary" size={20} />
                    Applications ({filteredApplications.length})
                  </h5>
                </div>
                
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h5 className="text-muted-foreground text-lg">No {filter !== 'all' ? filter : ''} applications found</h5>
                    {searchTerm && <p className="text-muted-foreground">Try adjusting your search terms</p>}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left py-4 px-4 font-semibold text-foreground">Student Details</th>
                          <th className="text-left py-4 px-4 font-semibold text-foreground">Academic Info</th>
                          <th className="text-left py-4 px-4 font-semibold text-foreground">Contact</th>
                          <th className="text-left py-4 px-4 font-semibold text-foreground">Financial</th>
                          <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
                          <th className="text-left py-4 px-4 font-semibold text-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id} className="border-b hover:bg-muted/20 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  <User size={18} className="text-primary" />
                                </div>
                                <div>
                                  <div className="font-semibold text-foreground">{app.studentData.name}</div>
                                  <div className="text-sm text-muted-foreground">{app.studentData.registration}</div>
                                  <div className="text-xs text-muted-foreground">Father: {app.studentData.fatherName}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-medium text-foreground">{app.studentData.department}</div>
                              <div className="text-sm text-muted-foreground">{app.studentData.class}</div>
                              <div className="text-xs text-muted-foreground">Session: {app.studentData.session}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm text-foreground">{app.studentData.studentContact}</div>
                              <div className="text-xs text-muted-foreground">{app.studentData.fatherContact}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-medium text-foreground">Rs. {app.studentData.totalIncome}</div>
                              <div className="text-xs text-muted-foreground">Monthly Income</div>
                              {app.studentData.totalSiblings && (
                                <div className="text-xs text-muted-foreground">{app.studentData.totalSiblings} Siblings</div>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span 
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium"
                                style={{ backgroundColor: getStatusColor(app.status) }}
                              >
                                {getStatusIcon(app.status)}
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setSelectedApplication(app)}
                                  className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                  title="View Details"
                                >
                                  <Eye size={14} />
                                </button>
                                {app.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleApprove(app.id)}
                                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                      title="Approve"
                                    >
                                      <Check size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleReject(app.id)}
                                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
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
          </ScrollArea>
        </div>

        {/* Enhanced Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="bg-primary text-primary-foreground px-6 py-4 flex justify-between items-center">
                <h5 className="font-bold flex items-center">
                  <User className="mr-2" size={20} />
                  {selectedApplication.studentData.name} - Application Details
                </h5>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <ScrollArea className="max-h-[70vh]">
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Personal Information */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h6 className="font-bold text-primary mb-3 flex items-center">
                        <User className="mr-2" size={16} />
                        Personal Information
                      </h6>
                      <div className="space-y-2 text-sm">
                        <div><strong>Name:</strong> {selectedApplication.studentData.name}</div>
                        <div><strong>Registration:</strong> {selectedApplication.studentData.registration}</div>
                        <div><strong>Father's Name:</strong> {selectedApplication.studentData.fatherName}</div>
                        <div><strong>Student Contact:</strong> {selectedApplication.studentData.studentContact}</div>
                        <div><strong>Father Contact:</strong> {selectedApplication.studentData.fatherContact}</div>
                        <div><strong>Address:</strong> {selectedApplication.studentData.address}</div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h6 className="font-bold text-green-600 mb-3 flex items-center">
                        <GraduationCap className="mr-2" size={16} />
                        Academic Information
                      </h6>
                      <div className="space-y-2 text-sm">
                        <div><strong>Department:</strong> {selectedApplication.studentData.department}</div>
                        <div><strong>Class:</strong> {selectedApplication.studentData.class}</div>
                        <div><strong>Session:</strong> {selectedApplication.studentData.session}</div>
                        {selectedApplication.studentData.matricMarks && (
                          <>
                            <div><strong>Matric Marks:</strong> {selectedApplication.studentData.matricMarks} ({selectedApplication.studentData.matricYear})</div>
                            <div><strong>Inter Marks:</strong> {selectedApplication.studentData.interMarks} ({selectedApplication.studentData.interYear})</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Guardian Information */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h6 className="font-bold text-yellow-600 mb-3 flex items-center">
                        <Users className="mr-2" size={16} />
                        Guardian Information
                      </h6>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Father Status:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${selectedApplication.studentData.fatherAlive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedApplication.studentData.fatherAlive ? 'Alive' : 'Deceased'}
                          </span>
                        </div>
                        {!selectedApplication.studentData.fatherAlive && (
                          <>
                            <div><strong>Guardian:</strong> {selectedApplication.studentData.guardianName}</div>
                            <div><strong>Relationship:</strong> {selectedApplication.studentData.relationship}</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Financial Information */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h6 className="font-bold text-blue-600 mb-3 flex items-center">
                        <MessageSquare className="mr-2" size={16} />
                        Financial Information
                      </h6>
                      <div className="space-y-2 text-sm">
                        <div><strong>Total Income:</strong> Rs. {selectedApplication.studentData.totalIncome}</div>
                        <div><strong>Siblings:</strong> {selectedApplication.studentData.totalSiblings || 0}</div>
                        {selectedApplication.studentData.siblings && selectedApplication.studentData.siblings.length > 0 && (
                          <div>
                            <strong>Siblings Details:</strong>
                            <ul className="mt-1 ml-4 list-disc">
                              {selectedApplication.studentData.siblings.map((sibling, index) => (
                                <li key={index} className="text-xs">
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
                  <div className="bg-muted/30 rounded-lg p-4 mb-6">
                    <h6 className="font-bold text-gray-600 mb-3 flex items-center">
                      <FileText className="mr-2" size={16} />
                      Uploaded Documents ({selectedApplication.studentData.documents?.length || 0})
                    </h6>
                    {selectedApplication.studentData.documents?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {selectedApplication.studentData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center p-3 border rounded-lg bg-background">
                            <FileText className="text-primary mr-2 flex-shrink-0" size={16} />
                            <div className="flex-grow min-w-0">
                              <div className="text-sm font-medium truncate">{doc.name}</div>
                              <div className="text-xs text-muted-foreground">{doc.size}</div>
                            </div>
                            <button className="ml-2 p-1 text-primary hover:bg-primary/10 rounded">
                              <Download size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No documents uploaded</p>
                    )}
                  </div>

                  {/* Application Status */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h6 className="font-bold text-blue-600 mb-3 flex items-center">
                      <MessageSquare className="mr-2" size={16} />
                      Application Status
                    </h6>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <strong>Status:</strong>
                        <span 
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-medium"
                          style={{ backgroundColor: getStatusColor(selectedApplication.status) }}
                        >
                          {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                        </span>
                      </div>
                      <div><strong>Submitted:</strong> {new Date(selectedApplication.submittedAt).toLocaleString()}</div>
                      {selectedApplication.adminComments && (
                        <div>
                          <strong>Admin Comments:</strong>
                          <div className="mt-1 p-3 bg-card border-l-4 border-primary rounded">
                            {selectedApplication.adminComments}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="border-t px-6 py-4 flex gap-3 justify-end bg-muted/20">
                {selectedApplication.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedApplication.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedApplication.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
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
