
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
      <div className="min-h-screen bg-gray-50" style={{ background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 mb-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            >
              <ArrowLeft className="mr-2" size={16} />
              Submit Application
            </button>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="text-gray-400 mb-6">
                <FileText size={64} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Application Found</h3>
              <p className="text-gray-600">Please submit your application first to view the status.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div className="container mx-auto py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Application Status</h1>
              <p className="text-gray-600 mb-0">Track your scholarship application progress</p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors border border-gray-300 shadow-sm"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </button>
          </div>

          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div 
                className="text-center py-8 px-6"
                style={{ background: getStatusBgColor(application.status) }}
              >
                <div className="mb-4">
                  {getStatusIcon(application.status)}
                </div>
                <h2 className="text-white mb-4 text-2xl font-bold">
                  Application {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </h2>
                <p className="text-white mb-0 text-lg">{getStatusMessage(application.status)}</p>
              </div>
            </div>

            {/* Admin Comments */}
            {application.adminComments && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="text-blue-600 mr-3" size={24} />
                  <h6 className="mb-0 font-bold text-blue-600 text-lg">Admin Comments</h6>
                </div>
                <p className="mb-0 text-gray-700 leading-relaxed">{application.adminComments}</p>
              </div>
            )}

            {/* Application Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h5 className="mb-0 font-bold text-gray-800 text-lg">Application Details</h5>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <User className="text-blue-600 mr-4 flex-shrink-0" size={24} />
                      <div>
                        <div className="font-semibold text-gray-800">{application.studentData.name}</div>
                        <small className="text-gray-500">Student Name</small>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <FileText className="text-blue-600 mr-4 flex-shrink-0" size={24} />
                      <div>
                        <div className="font-semibold text-gray-800">{application.studentData.registration}</div>
                        <small className="text-gray-500">Registration Number</small>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <GraduationCap className="text-blue-600 mr-4 flex-shrink-0" size={24} />
                      <div>
                        <div className="font-semibold text-gray-800">{application.studentData.department}</div>
                        <small className="text-gray-500">{application.studentData.class}</small>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <Phone className="text-blue-600 mr-4 flex-shrink-0" size={24} />
                      <div>
                        <div className="font-semibold text-gray-800">{application.studentData.studentContact}</div>
                        <small className="text-gray-500">Contact Number</small>
                      </div>
                    </div>

                    <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <MapPin className="text-blue-600 mr-4 mt-1 flex-shrink-0" size={24} />
                      <div>
                        <div className="font-semibold text-gray-800">{application.studentData.address}</div>
                        <small className="text-gray-500">Address</small>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <Calendar className="text-blue-600 mr-4 flex-shrink-0" size={24} />
                      <div>
                        <div className="font-semibold text-gray-800">{new Date(application.submittedAt).toLocaleDateString()}</div>
                        <small className="text-gray-500">Submitted On</small>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div>
                  <h6 className="text-blue-600 mb-4 font-bold text-lg">Additional Information</h6>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <strong className="text-gray-800 block mb-2">Father's Name:</strong>
                      <div className="text-gray-600">{application.studentData.fatherName}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <strong className="text-gray-800 block mb-2">Session:</strong>
                      <div className="text-gray-600">{application.studentData.session}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <strong className="text-gray-800 block mb-2">Application ID:</strong>
                      <div className="text-gray-600">{application.id}</div>
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
