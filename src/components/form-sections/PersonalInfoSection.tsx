
const PersonalInfoSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="registration" className="form-label fw-bold">Registration Number</label>
            <input
              id="registration"
              type="text"
              className="form-control bg-light"
              value={formData.registration || ""}
              readOnly
            />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Name</label>
            <input
              id="name"
              type="text"
              className="form-control bg-light"
              value={formData.name || ""}
              readOnly
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="fatherName" className="form-label fw-bold">Father Name</label>
            <input
              id="fatherName"
              type="text"
              className="form-control bg-light"
              value={formData.fatherName || ""}
              readOnly
            />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="fatherContact" className="form-label fw-bold">Father Contact</label>
            <input
              id="fatherContact"
              type="text"
              className="form-control bg-light"
              value={formData.fatherContact || ""}
              readOnly
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="session" className="form-label fw-bold">Session</label>
            <input
              id="session"
              type="text"
              className="form-control bg-light"
              value={formData.session || ""}
              readOnly
            />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="department" className="form-label fw-bold">Department</label>
            <input
              id="department"
              type="text"
              className="form-control bg-light"
              value={formData.department || ""}
              readOnly
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="class" className="form-label fw-bold">Class</label>
            <input
              id="class"
              type="text"
              className="form-control bg-light"
              value={formData.class || ""}
              readOnly
            />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="studentContact" className="form-label fw-bold">Student Contact</label>
            <input
              id="studentContact"
              type="text"
              className="form-control bg-light"
              value={formData.studentContact || ""}
              readOnly
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-bold">Permanent Address</label>
            <textarea
              id="address"
              className="form-control bg-light"
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

