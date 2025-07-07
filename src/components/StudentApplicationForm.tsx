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
  
  const [formData, setFormData] = useState({
    // Personal Info
    registration: "STU001",
    name: "John Doe",
    fatherName: "Robert Doe",
    fatherContact: "9876543210",
    session: "2024-25",
    department: "Computer Science",
    class: "BSc CS",
    studentContact: "9876543211",
    address: "123 Main Street, City",
    
    // Guardian Info
    fatherAlive: true,
    guardianName: "",
    relationship: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianAddress: "",
    
    // Financial Info
    totalIncome: "",
    residencyType: "owned",
    propertySize: "",
    rentAmount: "",
    landDetails: "",
    cattleDetails: "",
    vehicleDetails: "",
    motherEarning: false,
    motherName: "",
    motherDesignation: "",
    motherPhone: "",
    motherAddress: "",
    motherIncome: "",
    
    // Education
    matricMarks: "",
    matricYear: "",
    matricPercentage: "",
    matricInstitute: "",
    interMarks: "",
    interYear: "",
    interPercentage: "",
    interInstitute: "",
    bachelorMarks: "",
    bachelorYear: "",
    bachelorPercentage: "",
    bachelorInstitute: "",
    lastSemesterMarks: "",
    lastSemesterYear: "",
    lastSemesterPercentage: "",
    lastSemesterInstitute: "",
    
    // Scholarship
    previousScholarship: false,
    scholarshipAmount: "",
    scholarshipDuration: "",
    applicationDate: "",
    
    // Siblings
    totalSiblings: 0,
    siblings: []
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
      
      // Create application object
      const application = {
        id: `APP${Date.now()}`,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        studentData: formData
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

  const CurrentSection = sections[currentStep].component;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-lg form-section">
            <div className="card-header">
              <h2 className="card-title mb-3">
                {sections[currentStep].title}
              </h2>
              <div className="mb-3">
                <div className="custom-progress">
                  <div 
                    className="custom-progress-bar" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-light">
                  Step {currentStep + 1} of {sections.length}
                </p>
              </div>
            </div>
            
            <div className="card-body p-4 p-md-5">
              <CurrentSection 
                formData={formData} 
                setFormData={setFormData}
              />
              
              <div className="d-flex justify-content-between mt-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0 || isSubmitting}
                  className="btn btn-outline-secondary d-flex align-items-center"
                >
                  <ChevronLeft className="me-2" size={16} />
                  Previous
                </button>
                
                {currentStep === sections.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn btn-success d-flex align-items-center"
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
                    className="btn btn-custom-primary d-flex align-items-center"
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
  );
};

export default StudentApplicationForm;
