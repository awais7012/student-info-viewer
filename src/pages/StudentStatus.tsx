
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
      case 'pending': return <Clock size={28} className="text-white" />;
      case 'approved': return <CheckCircle size={28} className="text-white" />;
      case 'rejected': return <XCircle size={28} className="text-white" />;
      default: return <FileText size={28} className="text-white" />;
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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="container mx-auto py-6 px-4 flex-1">
          <div className="max-width-4xl mx-auto text-center">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 mb-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="mr-2" size={16} />
              Submit Application
            </button>
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
              <div className="text-gray-400 mb-6">
                <FileText size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">No Application Found</h3>
              <p className="text-gray-600">Please submit your application first to view the status.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <div className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-1">Application Status</h1>
              <p className="text-gray-600 text-sm">Track your scholarship application progress</p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all border border-gray-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="mr-2" size={14} />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-4 px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-[1.01] transition-all">
              <div 
                className="text-center py-6 px-6"
                style={{ background: getStatusBgColor(application.status) }}
              >
                <div className="mb-3">
                  {getStatusIcon(application.status)}
                </div>
                <h2 className="text-white mb-3 text-xl font-bold">
                  Application {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </h2>
                <p className="text-white text-base opacity-95">{getStatusMessage(application.status)}</p>
              </div>
            </div>

            {/* Admin Comments */}
            {application.adminComments && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 transform hover:scale-[1.01] transition-all">
                <div className="flex items-center mb-3">
                  <MessageSquare className="text-blue-600 mr-3" size={20} />
                  <h6 className="mb-0 font-bold text-blue-600">Admin Comments</h6>
                </div>
                <p className="mb-0 text-gray-700 leading-relaxed text-sm">{application.adminComments}</p>
              </div>
            )}

            {/* Application Details */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-[1.01] transition-all">
              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
                <h5 className="mb-0 font-bold text-gray-800">Application Details</h5>
              </div>
              <div className="p-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <User className="text-blue-600 mr-3 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{application.studentData.name}</div>
                        <small className="text-gray-500 text-xs">Student Name</small>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <FileText className="text-blue-600 mr-3 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{application.studentData.registration}</div>
                        <small className="text-gray-500 text-xs">Registration Number</small>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <GraduationCap className="text-blue-600 mr-3 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{application.studentData.department}</div>
                        <small className="text-gray-500 text-xs">{application.studentData.class}</small>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <Phone className="text-blue-600 mr-3 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{application.studentData.studentContact}</div>
                        <small className="text-gray-500 text-xs">Contact Number</small>
                      </div>
                    </div>

                    <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <MapPin className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm leading-relaxed">{application.studentData.address}</div>
                        <small className="text-gray-500 text-xs">Address</small>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <Calendar className="text-blue-600 mr-3 flex-shrink-0" size={18} />
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{new Date(application.submittedAt).toLocaleDateString()}</div>
                        <small className="text-gray-500 text-xs">Submitted On</small>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4 border-gray-200" />

                <div>
                  <h6 className="text-blue-600 mb-3 font-bold">Additional Information</h6>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <strong className="text-gray-800 block mb-1 text-xs">Father's Name:</strong>
                      <div className="text-gray-600 text-sm">{application.studentData.fatherName}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <strong className="text-gray-800 block mb-1 text-xs">Session:</strong>
                      <div className="text-gray-600 text-sm">{application.studentData.session}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                      <strong className="text-gray-800 block mb-1 text-xs">Application ID:</strong>
                      <div className="text-gray-600 text-sm font-mono">{application.id}</div>
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
