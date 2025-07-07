
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PersonalInfoSection from "./form-sections/PersonalInfoSection";
import GuardianInfoSection from "./form-sections/GuardianInfoSection";
import FinancialInfoSection from "./form-sections/FinancialInfoSection";
import EducationSection from "./form-sections/EducationSection";
import ScholarshipSection from "./form-sections/ScholarshipSection";
import SiblingsSection from "./form-sections/SiblingsSection";
import { toast } from "sonner";

const StudentApplicationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Hardcoded sample data with more realistic values
  const [formData, setFormData] = useState({
    // Personal Info
    registration: "CS2024001",
    name: "Ahmad Hassan",
    fatherName: "Muhammad Hassan",
    fatherContact: "03001234567",
    session: "2024-25",
    department: "Computer Science",
    class: "BSc Computer Science",
    studentContact: "03127654321",
    address: "House No. 123, Street 5, F-10/1, Islamabad",
    
    // Guardian Info
    fatherAlive: true,
    guardianName: "Muhammad Hassan",
    relationship: "Father",
    guardianEmail: "hassan@email.com",
    guardianPhone: "03001234567",
    guardianAddress: "House No. 123, Street 5, F-10/1, Islamabad",
    
    // Financial Info
    totalIncome: "50000",
    residencyType: "rented",
    propertySize: "5 Marla",
    rentAmount: "25000",
    landDetails: "No agricultural land",
    cattleDetails: "2 buffaloes, 5 goats",
    vehicleDetails: "1 motorcycle (Honda 125)",
    motherEarning: false,
    motherName: "Fatima Hassan",
    motherDesignation: "",
    motherPhone: "03009876543",
    motherAddress: "House No. 123, Street 5, F-10/1, Islamabad",
    motherIncome: "0",
    
    // Education
    matricMarks: "950",
    matricYear: "2020",
    matricPercentage: "95%",
    matricInstitute: "Government High School",
    interMarks: "850",
    interYear: "2022",
    interPercentage: "85%",
    interInstitute: "Government College",
    bachelorMarks: "3.5",
    bachelorYear: "2024",
    bachelorPercentage: "87%",
    bachelorInstitute: "Government College University",
    lastSemesterMarks: "3.8",
    lastSemesterYear: "2024",
    lastSemesterPercentage: "90%",
    lastSemesterInstitute: "Government College University",
    
    // Scholarship
    previousScholarship: true,
    scholarshipAmount: "15000",
    scholarshipDuration: "1 year",
    applicationDate: "2024-01-15",
    
    // Siblings
    totalSiblings: 2,
    siblings: [
      {
        name: "Ali Hassan",
        age: "16",
        education: "Intermediate",
        occupation: "Student"
      },
      {
        name: "Ayesha Hassan",
        age: "14",
        education: "Matric",
        occupation: "Student"  
      }
    ]
  });

  const sections = [
    { title: "Personal Information", component: PersonalInfoSection },
    { title: "Guardian Information", component: GuardianInfoSection },
    { title: "Financial Information", component: FinancialInfoSection },
    { title: "Educational Background", component: EducationSection },
    { title: "Scholarship History", component: ScholarshipSection },
    { title: "Family Information", component: SiblingsSection },
  ];

  const progress = ((currentStep + 1) / sections.length) * 100;

  const handleNext = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
      toast.success("Section completed successfully!");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create application object with random status for demo
      const statuses = ['pending', 'approved', 'rejected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const application = {
        id: `APP${Date.now()}`,
        status: randomStatus,
        submittedAt: new Date().toISOString(),
        studentData: formData,
        adminComments: randomStatus === 'approved' ? 'Application meets all criteria. Congratulations!' : 
                      randomStatus === 'rejected' ? 'Insufficient financial need documentation.' : 
                      'Application under review by committee.'
      };
      
      // Save to localStorage
      const existingApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
      const updatedApplications = [...existingApplications, application];
      localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
      
      // Also save current application for status page
      localStorage.setItem('currentApplication', JSON.stringify(application));
      
      console.log("Form Data:", formData);
      
      toast.success("Application submitted successfully!");
      
      // Redirect to status page after successful submission
      setTimeout(() => {
        navigate('/status');
      }, 1000);
      
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Add some sample applications to localStorage for demo
  const addSampleApplications = () => {
    const sampleApps = [
      {
        id: 'APP001',
        status: 'pending',
        submittedAt: '2024-01-15T10:30:00Z',
        adminComments: 'Application under review.',
        studentData: {
          name: 'Sara Ahmed',
          registration: 'CS2024002',
          department: 'Computer Science',
          class: 'BSc CS',
          studentContact: '03001112233',
          fatherName: 'Ahmed Ali',
          fatherContact: '03009988776',
          address: 'House 45, Block C, DHA Lahore',
          session: '2024-25',
          totalIncome: '35000'
        }
      },
      {
        id: 'APP002', 
        status: 'approved',
        submittedAt: '2024-01-10T14:20:00Z',
        adminComments: 'Excellent academic record. Approved for full scholarship.',
        studentData: {
          name: 'Muhammad Usman',
          registration: 'EE2024001',
          department: 'Electrical Engineering',
          class: 'BSc EE',
          studentContact: '03445566778',
          fatherName: 'Usman Khan',
          fatherContact: '03337788999',
          address: 'Street 12, Satellite Town, Rawalpindi',
          session: '2024-25',
          totalIncome: '28000'
        }
      },
      {
        id: 'APP003',
        status: 'rejected', 
        submittedAt: '2024-01-08T09:15:00Z',
        adminComments: 'Does not meet minimum GPA requirements.',
        studentData: {
          name: 'Fatima Sheikh',
          registration: 'BBA2024001',
          department: 'Business Administration',
          class: 'BBA',
          studentContact: '03221144556',
          fatherName: 'Sheikh Ahmad',
          fatherContact: '03556677889',
          address: 'Model Town, Block B, Faisalabad',
          session: '2024-25',
          totalIncome: '45000'
        }
      }
    ];
    
    localStorage.setItem('studentApplications', JSON.stringify(sampleApps));
  };

  // Add sample data on component mount
  useState(() => {
    const existing = localStorage.getItem('studentApplications');
    if (!existing || JSON.parse(existing).length === 0) {
      addSampleApplications();
    }
  });

  const CurrentSection = sections[currentStep].component;

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div 
                className="card-header text-white text-center py-4"
                style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}
              >
                <h2 className="mb-3 fw-bold">{sections[currentStep].title}</h2>
                <div className="mb-3">
                  <div 
                    className="bg-white bg-opacity-25 rounded-pill"
                    style={{ height: '8px', position: 'relative' }}
                  >
                    <div 
                      className="bg-white rounded-pill h-100 transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="mt-3 mb-0 text-white-50">
                    Step {currentStep + 1} of {sections.length}
                  </p>
                </div>
              </div>
              
              <div className="card-body p-5">
                <CurrentSection 
                  formData={formData} 
                  setFormData={setFormData}
                />
                
                <div className="d-flex justify-content-between mt-5">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0 || isSubmitting}
                    className="btn btn-outline-secondary d-flex align-items-center px-4 py-2"
                    style={{ borderRadius: '25px' }}
                  >
                    <ChevronLeft className="me-2" size={16} />
                    Previous
                  </button>
                  
                  {currentStep === sections.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn text-white d-flex align-items-center px-4 py-2"
                      style={{ 
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                        borderRadius: '25px',
                        border: 'none'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="btn text-white d-flex align-items-center px-4 py-2"
                      style={{ 
                        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                        borderRadius: '25px',
                        border: 'none'
                      }}
                    >
                      Next
                      <ChevronRight className="ms-2" size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationForm;
