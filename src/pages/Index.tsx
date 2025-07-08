
import StudentApplicationForm from "@/components/StudentApplicationForm";
import "@/styles/custom.css";

const Index = () => {
  return (
    <div className="min-vh-100" style={{ background: 'white' }}>
      <div className="container">
        <div className="text-center mb-3" style={{ padding: '10px 0' }}>
          <h1 className="display-4 fw-bold mb-2" style={{ color: '#000059' }}>Student Application Form</h1>
          <p className="lead" style={{ color: '#6b7280' }}>Complete your application with all required details</p>
        </div>
        <StudentApplicationForm />
      </div>
    </div>
  );
};

export default Index;
