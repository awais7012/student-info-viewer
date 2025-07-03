
const PersonalInfoSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="registration" className="custom-form-label">Registration Number</label>
            <input
              id="registration"
              type="text"
              className="form-control custom-form-control bg-light"
              value={formData.registration || ""}
              readOnly
            />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="custom-form-label">Name</label>
            <input
              id="name"
              type="text"
              className="form-control custom-form-control bg-light"
              value={formData.name || ""}
              readOnly
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="fatherName" className="custom-form-label">Father Name</label>
            <input
              id="fatherName"
              type="text"
              className="form-control custom-form-control bg-light"
              value={formData.fatherName || ""}
              readOnly
            />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="fatherContact" className="custom-form-label">Father Contact</label>
            <input
              id="fatherContact"
              type="text"
              className="form-control custom-form-control bg-light"
              value={formData.fatherContact || ""}
              readOnly
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="session" className="custom-form-label">Session</label>
            <input
              id="session"
              type="text"
              className="form-control custom-form-control bg-light"
              value={formData.session || ""}
              readOnly
            />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="department" className="custom-form-label">Department</label>
            <input
              id="department"
              type="text"
              className="form-control custom-form-control bg-light"
              value={formData.department || ""}
              readOnly
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="class" className="custom-form-label">Class</label>
            <input
              id="class"
              type="text"
              className="form-control custom-form-control bg-light"
              value={formData.class || ""}
              readOnly
            />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="studentContact" className="custom-form-label">Student Contact</label>
            <input
              id="studentContact"
              type="text"
              className="form-control custom-form-control bg-light"
              value={formData.studentContact || ""}
              readOnly
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="address" className="custom-form-label">Permanent Address</label>
            <textarea
              id="address"
              className="form-control custom-form-control bg-light"
              value={formData.address || ""}
              readOnly
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
