
import StudentApplicationForm from "@/components/StudentApplicationForm";

const Index = () => {
  return (
    <div className="min-vh-100 bg-gradient-custom py-4">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-white mb-3">Student Application Form</h1>
          <p className="lead text-white">Complete your application with all required details</p>
        </div>
        <StudentApplicationForm />
      </div>
    </div>
  );
};

export default Index;

