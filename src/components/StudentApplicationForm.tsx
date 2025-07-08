
import { useState } from "react";
import { ChevronRight, ChevronLeft, Upload, FileText, CheckCircle, X } from "lucide-react";
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Enhanced sample data with complete information
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
    ],
    
    // Documents
    documents: [
      { name: "CNIC Copy", type: "pdf", size: "1.2 MB", uploaded: true },
      { name: "Income Certificate", type: "pdf", size: "800 KB", uploaded: true },
      { name: "Academic Transcript", type: "pdf", size: "2.1 MB", uploaded: true },
      { name: "Utility Bill", type: "pdf", size: "600 KB", uploaded: true }
    ]
  });

  const sections = [
    { title: "Personal Information", component: PersonalInfoSection },
    { title: "Guardian Information", component: GuardianInfoSection },
    { title: "Financial Information", component: FinancialInfoSection },
    { title: "Educational Background", component: EducationSection },
    { title: "Scholarship History", component: ScholarshipSection },
    { title: "Family Information", component: SiblingsSection },
    { title: "Document Upload", component: DocumentUploadSection },
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

  const handleSubmitClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const application = {
        id: `APP${Date.now()}`,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        studentData: formData,
        adminComments: 'Application submitted successfully. Under review by the scholarship committee.'
      };
      
      const existingApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
      const updatedApplications = [...existingApplications, application];
      localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
      localStorage.setItem('currentApplication', JSON.stringify(application));
      
      toast.success("Application submitted successfully!");
      
      setTimeout(() => {
        navigate('/status');
      }, 1000);
      
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Add comprehensive sample applications
  const addSampleApplications = () => {
    const sampleApps = [
      {
        id: 'APP001',
        status: 'pending',
        submittedAt: '2024-01-15T10:30:00Z',
        adminComments: 'Application under review by the committee.',
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
          totalIncome: '35000',
          fatherAlive: true,
          guardianName: 'Ahmed Ali',
          relationship: 'Father',
          matricMarks: '900',
          matricYear: '2021',
          interMarks: '800',
          interYear: '2023',
          totalSiblings: 1,
          siblings: [{ name: 'Ali Ahmed', age: '12', education: 'Primary', occupation: 'Student' }],
          documents: [
            { name: 'CNIC Copy', type: 'pdf', size: '1.1 MB', uploaded: true },
            { name: 'Income Certificate', type: 'pdf', size: '750 KB', uploaded: true }
          ]
        }
      },
      {
        id: 'APP002', 
        status: 'approved',
        submittedAt: '2024-01-10T14:20:00Z',
        adminComments: 'Excellent academic record. Approved for full scholarship of Rs. 50,000.',
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
          totalIncome: '28000',
          fatherAlive: false,
          guardianName: 'Khan Mohammad',
          relationship: 'Uncle',
          matricMarks: '980',
          matricYear: '2020',
          interMarks: '950',
          interYear: '2022',
          totalSiblings: 3,
          siblings: [
            { name: 'Fatima Usman', age: '18', education: 'Intermediate', occupation: 'Student' },
            { name: 'Hassan Usman', age: '15', education: 'Matric', occupation: 'Student' },
            { name: 'Aisha Usman', age: '10', education: 'Primary', occupation: 'Student' }
          ],
          documents: [
            { name: 'CNIC Copy', type: 'pdf', size: '1.3 MB', uploaded: true },
            { name: 'Death Certificate', type: 'pdf', size: '900 KB', uploaded: true },
            { name: 'Income Certificate', type: 'pdf', size: '850 KB', uploaded: true },
            { name: 'Academic Records', type: 'pdf', size: '2.5 MB', uploaded: true }
          ]
        }
      }
    ];
    
    localStorage.setItem('studentApplications', JSON.stringify(sampleApps));
  };

  useState(() => {
    const existing = localStorage.getItem('studentApplications');
    if (!existing || JSON.parse(existing).length === 0) {
      addSampleApplications();
    }
  });

  const CurrentSection = sections[currentStep].component;

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-card">
          <div className="form-header">
            <h2 className="form-title">{sections[currentStep].title}</h2>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="progress-text">
                Step {currentStep + 1} of {sections.length}
              </p>
            </div>
          </div>
          
          <div className="form-content">
            <CurrentSection 
              formData={formData} 
              setFormData={setFormData}
            />
          </div>
        </div>
        
        {/* Fixed Navigation */}
        <div className="form-navigation">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0 || isSubmitting}
            className="nav-btn nav-btn-secondary"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          {currentStep === sections.length - 1 ? (
            <button
              onClick={handleSubmitClick}
              disabled={isSubmitting}
              className="nav-btn nav-btn-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
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
              className="nav-btn nav-btn-primary"
            >
              Next
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Application Submission</h3>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="modal-close"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="confirmation-text">
                Please verify your uploaded documents before submitting:
              </p>
              
              <div className="documents-list">
                {formData.documents?.map((doc, index) => (
                  <div key={index} className="document-item">
                    <CheckCircle className="doc-icon" size={16} />
                    <span className="doc-name">{doc.name}</span>
                    <span className="doc-size">({doc.size})</span>
                  </div>
                ))}
              </div>
              
              <p className="warning-text">
                Once submitted, you cannot modify your application. Are you sure you want to proceed?
              </p>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="modal-btn modal-btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmSubmit}
                className="modal-btn modal-btn-primary"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Document Upload Section Component
const DocumentUploadSection = ({ formData, setFormData }) => {
  const handleFileUpload = (docType) => {
    toast.success(`${docType} uploaded successfully!`);
  };

  const requiredDocs = [
    'CNIC Copy',
    'Income Certificate', 
    'Academic Transcript',
    'Utility Bill',
    'Birth Certificate'
  ];

  return (
    <div className="document-section">
      <div className="alert-info">
        <FileText size={20} />
        Please upload the following required documents (PDF format only, max 5MB each)
      </div>
      
      <div className="documents-grid">
        {requiredDocs.map((doc, index) => {
          const isUploaded = formData.documents?.some(d => d.name === doc);
          return (
            <div key={index} className={`document-card ${isUploaded ? 'uploaded' : 'pending'}`}>
              <div className="document-card-body">
                <Upload className={`upload-icon ${isUploaded ? 'success' : 'warning'}`} size={32} />
                <h6 className="document-title">{doc}</h6>
                {isUploaded ? (
                  <div className="upload-status">
                    <span className="status-badge success">✓ Uploaded</span>
                    <p className="file-size">
                      {formData.documents?.find(d => d.name === doc)?.size}
                    </p>
                  </div>
                ) : (
                  <button 
                    className="upload-btn"
                    onClick={() => handleFileUpload(doc)}
                  >
                    <Upload size={16} />
                    Upload File
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="upload-summary">
        <h6 className="summary-title">Upload Summary</h6>
        <p className="summary-text">
          <strong>{formData.documents?.length || 0}</strong> of {requiredDocs.length} documents uploaded
        </p>
      </div>
    </div>
  );
};

export default StudentApplicationForm;
