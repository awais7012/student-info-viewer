
import { useState, useEffect } from "react";
import { CheckCircle, Clock, XCircle, ArrowLeft, FileText, User, Phone, MapPin, GraduationCap, Calendar, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 mb-6 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="mr-2" size={16} />
              Submit Application
            </button>
            <div className="bg-card rounded-xl shadow-xl border p-8">
              <div className="text-muted-foreground mb-6">
                <FileText size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">No Application Found</h3>
              <p className="text-muted-foreground">Please submit your application first to view the status.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-card shadow-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">Application Status</h1>
              <p className="text-muted-foreground text-sm">Track your scholarship application progress</p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="mr-2" size={14} />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="container mx-auto py-6 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Status Card */}
              <div className="bg-card rounded-xl shadow-xl border overflow-hidden transform hover:scale-[1.01] transition-all">
                <div 
                  className="text-center py-8 px-6"
                  style={{ background: getStatusBgGradient(application.status) }}
                >
                  <div className="mb-4">
                    {getStatusIcon(application.status)}
                  </div>
                  <h2 className="text-white mb-4 text-2xl font-bold">
                    Application {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </h2>
                  <p className="text-white text-base opacity-95 max-w-md mx-auto leading-relaxed">
                    {getStatusMessage(application.status)}
                  </p>
                </div>
              </div>

              {/* Admin Comments */}
              {application.adminComments && (
                <div className="bg-card rounded-xl shadow-lg border p-6 transform hover:scale-[1.01] transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <MessageSquare className="text-blue-600" size={20} />
                    </div>
                    <h6 className="font-bold text-blue-600 text-lg">Admin Comments</h6>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-foreground leading-relaxed">{application.adminComments}</p>
                  </div>
                </div>
              )}

              {/* Application Details */}
              <div className="bg-card rounded-xl shadow-lg border overflow-hidden transform hover:scale-[1.01] transition-all">
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 border-b px-6 py-4">
                  <h5 className="font-bold text-foreground text-lg flex items-center">
                    <FileText className="mr-2 text-primary" size={20} />
                    Application Details
                  </h5>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-lg">{application.studentData.name}</div>
                          <small className="text-muted-foreground">Student Name</small>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mr-4">
                          <FileText className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-lg">{application.studentData.registration}</div>
                          <small className="text-muted-foreground">Registration Number</small>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                          <GraduationCap className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-lg">{application.studentData.department}</div>
                          <small className="text-muted-foreground">{application.studentData.class}</small>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mr-4">
                          <Phone className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-lg">{application.studentData.studentContact}</div>
                          <small className="text-muted-foreground">Contact Number</small>
                        </div>
                      </div>

                      <div className="flex items-start p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mr-4 mt-1">
                          <MapPin className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground leading-relaxed">{application.studentData.address}</div>
                          <small className="text-muted-foreground">Address</small>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg border border-teal-200 hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center mr-4">
                          <Calendar className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-lg">{new Date(application.submittedAt).toLocaleDateString()}</div>
                          <small className="text-muted-foreground">Submitted On</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-6 border-border" />

                  <div>
                    <h6 className="text-primary mb-4 font-bold text-lg">Additional Information</h6>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg border hover:bg-muted/70 transition-colors">
                        <strong className="text-foreground block mb-2 text-sm">Father's Name:</strong>
                        <div className="text-muted-foreground">{application.studentData.fatherName}</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg border hover:bg-muted/70 transition-colors">
                        <strong className="text-foreground block mb-2 text-sm">Session:</strong>
                        <div className="text-muted-foreground">{application.studentData.session}</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg border hover:bg-muted/70 transition-colors">
                        <strong className="text-foreground block mb-2 text-sm">Application ID:</strong>
                        <div className="text-muted-foreground font-mono text-xs">{application.id}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default StudentStatus;
