
const ScholarshipSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Previous Scholarship Information</h5>
            </div>
            <div className="card-body">
              <div className="form-check p-4 bg-primary bg-opacity-10 rounded mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="previousScholarship"
                  checked={formData.previousScholarship}
                  onChange={(e) => handleChange('previousScholarship', e.target.checked)}
                />
                <label className="form-check-label fs-5 fw-bold" htmlFor="previousScholarship">
                  Have you received any scholarship before?
                </label>
              </div>

              {formData.previousScholarship && (
                <div className="p-4 bg-primary bg-opacity-10 rounded">
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="scholarshipAmount" className="form-label fs-5 fw-bold">Scholarship Amount *</label>
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
                        <label htmlFor="scholarshipDuration" className="form-label fs-5 fw-bold">Duration/Details *</label>
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
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-info text-white">
              <h5 className="card-title mb-0">Application Details</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="applicationDate" className="form-label fs-5 fw-bold">Application Date *</label>
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
          <div className="card bg-success bg-opacity-10 border-success">
            <div className="card-body">
              <div className="text-success-emphasis">
                <h6 className="fw-bold mb-2">Application Guidelines:</h6>
                <ul className="mb-0 small">
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
    </div>
  );
};

export default ScholarshipSection;
