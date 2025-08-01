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
  const [verificationChecks, setVerificationChecks] = useState({
    documentsVerified: false,
    informationAccurate: false,
    termsAccepted: false
  });
  
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
    // Reset verification checks
    setVerificationChecks({
      documentsVerified: false,
      informationAccurate: false,
      termsAccepted: false
    });
  };

  const handleVerificationChange = (field) => {
    setVerificationChecks(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const canSubmit = Object.values(verificationChecks).every(check => check === true);

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

  const handleFileUpload = (docName) => {
    const updatedDocuments = [...(formData.documents || [])];
    const existingDocIndex = updatedDocuments.findIndex(doc => doc.name === docName);
    
    if (existingDocIndex >= 0) {
      updatedDocuments[existingDocIndex] = {
        name: docName,
        type: "pdf",
        size: "1.2 MB",
        uploaded: true
      };
    } else {
      updatedDocuments.push({
        name: docName,
        type: "pdf", 
        size: "1.2 MB",
        uploaded: true
      });
    }
    
    setFormData({ ...formData, documents: updatedDocuments });
    toast.success(`${docName} uploaded successfully!`);
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
    <div className="form-wrapper">
      <div className="form-card">
        {/* Application Header - Outside blue background */}
        <div className="app-header">
          <h1 className="app-title">Student Scholarship Application Form</h1>
        </div>

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
          
          {/* Document Upload Section for each step */}
          <DocumentUploadSection 
            sectionName={sections[currentStep].title}
            formData={formData}
            onFileUpload={handleFileUpload}
          />
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

      {/* Enhanced Confirmation Dialog */}
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
                Please review your uploaded documents and complete the verification checklist below:
              </p>
              
              <div className="documents-list">
                <h4 style={{ margin: '0 0 20px 0', color: '#000059', fontSize: '1.1rem', fontWeight: '600' }}>
                  Uploaded Documents
                </h4>
                {formData.documents?.map((doc, index) => (
                  <div key={index} className="document-item">
                    <CheckCircle className="doc-icon" size={24} />
                    <div className="doc-details">
                      <div className="doc-name">{doc.name}</div>
                      <div className="doc-size">{doc.size}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* User Verification Checkboxes */}
              <div className="verification-checklist">
                <h4 style={{ margin: '0 0 20px 0', color: '#000059', fontSize: '1.1rem', fontWeight: '600' }}>
                  Verification Checklist
                </h4>
                
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={verificationChecks.documentsVerified}
                    onChange={() => handleVerificationChange('documentsVerified')}
                  />
                  <span className="checkbox-label">
                    I have verified that all required documents are uploaded and are accurate
                  </span>
                </label>
                
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={verificationChecks.informationAccurate}
                    onChange={() => handleVerificationChange('informationAccurate')}
                  />
                  <span className="checkbox-label">
                    I confirm that all the information provided in this application is complete, accurate and truthful
                  </span>
                </label>
                
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={verificationChecks.termsAccepted}
                    onChange={() => handleVerificationChange('termsAccepted')}
                  />
                  <span className="checkbox-label">
                    I accept the terms and conditions and understand that providing false information may result in application rejection or scholarship cancellation
                  </span>
                </label>
              </div>
              
              <p className="warning-text">
                ⚠️ Important: Once submitted, you cannot modify your application. Please ensure all information and documents are correct before proceeding.
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
                disabled={!canSubmit}
                className="modal-btn modal-btn-primary"
              >
                Confirm & Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Document Upload Section Component
const DocumentUploadSection = ({ sectionName, formData, onFileUpload }) => {
  const getRequiredDocsForSection = (section) => {
    switch (section) {
      case "Personal Information":
        return ["CNIC Copy", "Birth Certificate"];
      case "Guardian Information":
        return ["Guardian CNIC", "Relationship Certificate"];
      case "Financial Information":
        return ["Income Certificate", "Utility Bill"];
      case "Educational Background":
        return ["Academic Transcript", "Degree Certificate"];
      case "Scholarship History":
        return ["Previous Scholarship Certificate"];
      case "Family Information":
        return ["Family Registration Certificate"];
      default:
        return [];
    }
  };

  const requiredDocs = getRequiredDocsForSection(sectionName);

  if (requiredDocs.length === 0) return null;

  return (
    <div className="document-section">
      <h4>Required Documents for {sectionName}</h4>
      <div className="document-upload-grid">
        {requiredDocs.map((doc, index) => {
          const isUploaded = formData.documents?.some(d => d.name === doc);
          return (
            <div 
              key={index} 
              className={`document-upload-item ${isUploaded ? 'uploaded' : ''}`}
              onClick={() => !isUploaded && onFileUpload(doc)}
            >
              <Upload className={`upload-icon ${isUploaded ? 'success' : ''}`} size={24} />
              <p className="upload-text">{doc}</p>
              <p className="upload-subtext">
                {isUploaded ? '✓ Uploaded' : 'Click to upload'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentApplicationForm;
