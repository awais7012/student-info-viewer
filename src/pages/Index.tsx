
import StudentApplicationForm from "@/components/StudentApplicationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Application Form</h1>
          <p className="text-lg text-gray-600">Complete your application with all required details</p>
        </div>
        <StudentApplicationForm />
      </div>
    </div>
  );
};

export default Index;
