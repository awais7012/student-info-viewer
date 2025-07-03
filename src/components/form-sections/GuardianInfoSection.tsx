
const GuardianInfoSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="custom-checkbox-container">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="fatherAlive"
                checked={formData.fatherAlive}
                onChange={(e) => handleChange('fatherAlive', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="fatherAlive">
                Is your father alive?
              </label>
            </div>
          </div>

          {!formData.fatherAlive && (
            <div className="bg-warning-light">
              <h3 className="fs-4 fw-bold text-dark mb-4">Guardian Information</h3>
              
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="guardianName" className="form-label">Guardian Name *</label>
                    <input
                      id="guardianName"
                      type="text"
                      className="form-control"
                      value={formData.guardianName}
                      onChange={(e) => handleChange('guardianName', e.target.value)}
                      placeholder="Enter guardian's full name"
                      required
                    />
                  </div>
                </div>
                
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="relationship" className="form-label">Relationship *</label>
                    <select
                      id="relationship"
                      className="form-select"
                      value={formData.relationship}
                      onChange={(e) => handleChange('relationship', e.target.value)}
                      required
                    >
                      <option value="">Select relationship</option>
                      <option value="mother">Mother</option>
                      <option value="uncle">Uncle</option>
                      <option value="aunt">Aunt</option>
                      <option value="grandfather">Grandfather</option>
                      <option value="grandmother">Grandmother</option>
                      <option value="brother">Brother</option>
                      <option value="sister">Sister</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="guardianEmail" className="form-label">Guardian Email</label>
                    <input
                      id="guardianEmail"
                      type="email"
                      className="form-control"
                      value={formData.guardianEmail}
                      onChange={(e) => handleChange('guardianEmail', e.target.value)}
                      placeholder="guardian@example.com"
                    />
                  </div>
                </div>
                
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="guardianPhone" className="form-label">Guardian Phone *</label>
                    <input
                      id="guardianPhone"
                      type="text"
                      className="form-control"
                      value={formData.guardianPhone}
                      onChange={(e) => handleChange('guardianPhone', e.target.value)}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="guardianAddress" className="form-label">Guardian Address *</label>
                    <textarea
                      id="guardianAddress"
                      className="form-control"
                      value={formData.guardianAddress}
                      onChange={(e) => handleChange('guardianAddress', e.target.value)}
                      placeholder="Enter complete address"
                      rows={3}
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
  );
};

export default GuardianInfoSection;
