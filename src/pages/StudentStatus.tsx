
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
      case 'pending': return 'hsl(43, 96%, 56%)';
      case 'approved': return 'hsl(142, 76%, 36%)';
      case 'rejected': return 'hsl(0, 84%, 60%)';
      default: return 'hsl(215, 16%, 47%)';
    }
  };

  const getStatusBgGradient = (status: string) => {
    switch (status) {
      case 'pending': return 'linear-gradient(135deg, hsl(45, 93%, 58%) 0%, hsl(43, 96%, 56%) 100%)';
      case 'approved': return 'linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(142, 69%, 31%) 100%)';
      case 'rejected': return 'linear-gradient(135deg, hsl(0, 84%, 60%) 0%, hsl(0, 79%, 53%) 100%)';
      default: return 'linear-gradient(135deg, hsl(215, 16%, 47%) 0%, hsl(215, 13%, 40%) 100%)';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ArrowLeft className="mr-2" size={16} />
              Submit Application
            </button>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Application Found</h3>
              <p className="text-gray-600 text-lg">Please submit your application first to view the status.</p>
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
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">Application Status</h1>
                <p className="text-gray-600">Track your scholarship application progress</p>
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

        {/* Content */}
        <div className="container mx-auto py-8 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-[1.02] transition-all">
              <div 
                className="text-center py-12 px-8"
                style={{ background: getStatusBgGradient(application.status) }}
              >
                <div className="mb-6">
                  {getStatusIcon(application.status)}
                </div>
                <h2 className="text-white mb-6 text-3xl font-bold">
                  Application {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </h2>
                <p className="text-white text-lg opacity-95 max-w-2xl mx-auto leading-relaxed">
                  {getStatusMessage(application.status)}
                </p>
              </div>
            </div>

            {/* Admin Comments */}
            {application.adminComments && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform hover:scale-[1.01] transition-all">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-4">
                    <MessageSquare className="text-blue-600" size={24} />
                  </div>
                  <h6 className="font-bold text-blue-600 text-xl">Admin Comments</h6>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <p className="text-gray-800 leading-relaxed text-lg">{application.adminComments}</p>
                </div>
              </div>
            )}

            {/* Application Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all">
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200 px-8 py-6">
                <h5 className="font-bold text-gray-800 text-xl flex items-center">
                  <FileText className="mr-3 text-blue-600" size={24} />
                  Application Details
                </h5>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mr-6">
                        <User className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-xl">{application.studentData.name}</div>
                        <small className="text-gray-600">Student Name</small>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-6">
                        <FileText className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-xl">{application.studentData.registration}</div>
                        <small className="text-gray-600">Registration Number</small>
                      </div>
                    </div>

                    <div className="flex items-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-6">
                        <GraduationCap className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-xl">{application.studentData.department}</div>
                        <small className="text-gray-600">{application.studentData.class}</small>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mr-6">
                        <Phone className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-xl">{application.studentData.studentContact}</div>
                        <small className="text-gray-600">Contact Number</small>
                      </div>
                    </div>

                    <div className="flex items-start p-6 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-100 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mr-6 mt-1">
                        <MapPin className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 leading-relaxed text-lg">{application.studentData.address}</div>
                        <small className="text-gray-600">Address</small>
                      </div>
                    </div>

                    <div className="flex items-center p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 hover:shadow-lg transition-all">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mr-6">
                        <Calendar className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-xl">{new Date(application.submittedAt).toLocaleDateString()}</div>
                        <small className="text-gray-600">Submitted On</small>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-8 border-gray-200" />

                <div>
                  <h6 className="text-blue-600 mb-6 font-bold text-xl">Additional Information</h6>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-100 hover:bg-gradient-to-br hover:from-gray-100 hover:to-slate-100 transition-all">
                      <strong className="text-gray-800 block mb-3 text-lg">Father's Name:</strong>
                      <div className="text-gray-600 text-lg">{application.studentData.fatherName}</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-100 hover:bg-gradient-to-br hover:from-gray-100 hover:to-slate-100 transition-all">
                      <strong className="text-gray-800 block mb-3 text-lg">Session:</strong>
                      <div className="text-gray-600 text-lg">{application.studentData.session}</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-100 hover:bg-gradient-to-br hover:from-gray-100 hover:to-slate-100 transition-all">
                      <strong className="text-gray-800 block mb-3 text-lg">Application ID:</strong>
                      <div className="text-gray-600 font-mono text-sm">{application.id}</div>
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
