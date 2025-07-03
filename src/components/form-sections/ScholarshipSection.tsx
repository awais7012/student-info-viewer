
const ScholarshipSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-12">
          <div className="custom-card">
            <div className="custom-card-header bg-primary">
              <h5 className="card-title">Previous Scholarship Information</h5>
            </div>
            <div className="custom-card-body">
              <div className="custom-checkbox-container">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="previousScholarship"
                    checked={formData.previousScholarship}
                    onChange={(e) => handleChange('previousScholarship', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="previousScholarship">
                    Have you received any scholarship before?
                  </label>
                </div>
              </div>

              {formData.previousScholarship && (
                <div className="bg-primary-light">
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="scholarshipAmount" className="form-label">Scholarship Amount *</label>
                        <input
                          id="scholarshipAmount"
                          type="number"
                          className="form-control"
                          value={formData.scholarshipAmount}
                          onChange={(e) => handleChange('scholarshipAmount', e.target.value)}
                          placeholder="Enter scholarship amount"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="scholarshipDuration" className="form-label">Duration/Details *</label>
                        <input
                          id="scholarshipDuration"
                          type="text"
                          className="form-control"
                          value={formData.scholarshipDuration}
                          onChange={(e) => handleChange('scholarshipDuration', e.target.value)}
                          placeholder="e.g., 2 years, monthly, etc."
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="custom-card">
            <div className="custom-card-header bg-info">
              <h5 className="card-title">Application Details</h5>
            </div>
            <div className="custom-card-body">
              <div className="mb-3">
                <label htmlFor="applicationDate" className="form-label">Application Date *</label>
                <input
                  id="applicationDate"
                  type="date"
                  className="form-control"
                  value={formData.applicationDate}
                  onChange={(e) => handleChange('applicationDate', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="alert alert-success">
            <div className="text-success">
              <h6 className="fw-bold mb-2">Application Guidelines:</h6>
              <ul className="mb-0" style={{ fontSize: '0.875rem' }}>
                <li>Ensure all information provided is accurate and verifiable</li>
                <li>Submit all required documents in clear, readable format</li>
                <li>Keep copies of all submitted documents for your records</li>
                <li>Contact administration for any clarifications needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipSection;
