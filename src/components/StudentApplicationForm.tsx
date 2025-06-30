
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PersonalInfoSection from "./form-sections/PersonalInfoSection";
import GuardianInfoSection from "./form-sections/GuardianInfoSection";
import FinancialInfoSection from "./form-sections/FinancialInfoSection";
import EducationSection from "./form-sections/EducationSection";
import ScholarshipSection from "./form-sections/ScholarshipSection";
import SiblingsSection from "./form-sections/SiblingsSection";
import { toast } from "sonner";

const StudentApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleSubmit = () => {
    toast.success("Application submitted successfully!");
    console.log("Form Data:", formData);
  };

  const CurrentSection = sections[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl text-center">
            {sections[currentStep].title}
          </CardTitle>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-center mt-2 text-blue-100">
              Step {currentStep + 1} of {sections.length}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <CurrentSection 
            formData={formData} 
            setFormData={setFormData}
          />
          
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            {currentStep === sections.length - 1 ? (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                Submit Application
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentApplicationForm;
