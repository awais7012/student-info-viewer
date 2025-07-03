const FinancialInfoSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {/* Total Income */}
        <div className="col-12">
          <div className="custom-card">
            <div className="custom-card-header bg-primary">
              <h5 className="card-title">Total Family Income</h5>
            </div>
            <div className="custom-card-body">
              <div className="mb-3">
                <label htmlFor="totalIncome" className="form-label">Total Income from All Sources (Monthly) *</label>
                <input
                  id="totalIncome"
                  type="number"
                  className="form-control"
                  value={formData.totalIncome}
                  onChange={(e) => handleChange('totalIncome', e.target.value)}
                  placeholder="Enter total monthly income"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Residency Details */}
        <div className="col-12">
          <div className="custom-card">
            <div className="custom-card-header bg-info">
              <h5 className="card-title">Residency Details</h5>
            </div>
            <div className="custom-card-body">
              <div className="mb-4">
                <label className="form-label">Type of Residence *</label>
                <div className="mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="residencyType"
                      id="owned"
                      value="owned"
                      checked={formData.residencyType === 'owned'}
                      onChange={(e) => handleChange('residencyType', e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="owned">Owned</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="residencyType"
                      id="rented"
                      value="rented"
                      checked={formData.residencyType === 'rented'}
                      onChange={(e) => handleChange('residencyType', e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="rented">Rented</label>
                  </div>
                </div>
              </div>

              {formData.residencyType === 'owned' && (
                <div className="mb-3">
                  <label htmlFor="propertySize" className="form-label">Property Size (sq ft) *</label>
                  <input
                    id="propertySize"
                    type="text"
                    className="form-control"
                    value={formData.propertySize}
                    onChange={(e) => handleChange('propertySize', e.target.value)}
                    placeholder="Enter property size"
                    required
                  />
                </div>
              )}

              {formData.residencyType === 'rented' && (
                <div className="mb-3">
                  <label htmlFor="rentAmount" className="form-label">Monthly Rent Amount *</label>
                  <input
                    id="rentAmount"
                    type="number"
                    className="form-control"
                    value={formData.rentAmount}
                    onChange={(e) => handleChange('rentAmount', e.target.value)}
                    placeholder="Enter monthly rent"
                    required
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Other Properties */}
        <div className="col-12">
          <div className="custom-card">
            <div className="custom-card-header bg-secondary">
              <h5 className="card-title">Other Property Details (Optional)</h5>
            </div>
            <div className="custom-card-body">
              <div className="row g-3">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="landDetails" className="form-label">Land Details</label>
                    <textarea
                      id="landDetails"
                      className="form-control"
                      value={formData.landDetails}
                      onChange={(e) => handleChange('landDetails', e.target.value)}
                      placeholder="Describe any land owned (area, location, type)"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="cattleDetails" className="form-label">Cattle/Livestock Details</label>
                    <textarea
                      id="cattleDetails"
                      className="form-control"
                      value={formData.cattleDetails}
                      onChange={(e) => handleChange('cattleDetails', e.target.value)}
                      placeholder="Describe cattle/livestock owned"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="vehicleDetails" className="form-label">Vehicle Details</label>
                    <textarea
                      id="vehicleDetails"
                      className="form-control"
                      value={formData.vehicleDetails}
                      onChange={(e) => handleChange('vehicleDetails', e.target.value)}
                      placeholder="List vehicles owned (car, motorcycle, etc.)"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mother/Other Earnings */}
        <div className="col-12">
          <div className="custom-card">
            <div className="custom-card-header bg-success">
              <h5 className="card-title">Additional Family Earnings</h5>
            </div>
            <div className="custom-card-body">
              <div className="custom-checkbox-container">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="motherEarning"
                    checked={formData.motherEarning}
                    onChange={(e) => handleChange('motherEarning', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="motherEarning">
                    Does your mother or any other family member earn?
                  </label>
                </div>
              </div>

              {formData.motherEarning && (
                <div className="bg-success-light">
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="motherName" className="form-label">Name *</label>
                        <input
                          id="motherName"
                          type="text"
                          className="form-control"
                          value={formData.motherName}
                          onChange={(e) => handleChange('motherName', e.target.value)}
                          placeholder="Enter name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="motherDesignation" className="form-label">Designation *</label>
                        <input
                          id="motherDesignation"
                          type="text"
                          className="form-control"
                          value={formData.motherDesignation}
                          onChange={(e) => handleChange('motherDesignation', e.target.value)}
                          placeholder="Enter job designation"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="motherPhone" className="form-label">Phone Number *</label>
                        <input
                          id="motherPhone"
                          type="text"
                          className="form-control"
                          value={formData.motherPhone}
                          onChange={(e) => handleChange('motherPhone', e.target.value)}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label htmlFor="motherIncome" className="form-label">Monthly Income *</label>
                        <input
                          id="motherIncome"
                          type="number"
                          className="form-control"
                          value={formData.motherIncome}
                          onChange={(e) => handleChange('motherIncome', e.target.value)}
                          placeholder="Enter monthly income"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="motherAddress" className="form-label">Work Address *</label>
                        <textarea
                          id="motherAddress"
                          className="form-control"
                          value={formData.motherAddress}
                          onChange={(e) => handleChange('motherAddress', e.target.value)}
                          placeholder="Enter work address"
                          rows={2}
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
      </div>
    </div>
  );
};

export default FinancialInfoSection;
