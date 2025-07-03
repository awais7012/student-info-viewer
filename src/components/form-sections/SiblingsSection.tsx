
import { Plus, Trash2 } from "lucide-react";

const SiblingsSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...formData.siblings];
    updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };
    setFormData(prev => ({ ...prev, siblings: updatedSiblings }));
  };

  const addSibling = () => {
    const newSibling = {
      name: '',
      age: '',
      institution: '',
      monthlyFee: ''
    };
    setFormData(prev => ({
      ...prev,
      siblings: [...prev.siblings, newSibling]
    }));
  };

  const removeSibling = (index) => {
    const updatedSiblings = formData.siblings.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      siblings: updatedSiblings,
      totalSiblings: updatedSiblings.length
    }));
  };

  const handleTotalSiblingsChange = (value) => {
    const total = parseInt(value) || 0;
    handleChange('totalSiblings', total);
    
    const currentSiblings = [...formData.siblings];
    if (total > currentSiblings.length) {
      const newSiblings = Array(total - currentSiblings.length).fill(null).map(() => ({
        name: '',
        age: '',
        institution: '',
        monthlyFee: ''
      }));
      setFormData(prev => ({
        ...prev,
        siblings: [...currentSiblings, ...newSiblings]
      }));
    } else if (total < currentSiblings.length) {
      setFormData(prev => ({
        ...prev,
        siblings: currentSiblings.slice(0, total)
      }));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-12">
          <div className="custom-card">
            <div className="custom-card-header bg-primary">
              <h5 className="card-title">Family Information - Siblings</h5>
            </div>
            <div className="custom-card-body">
              <div className="mb-3">
                <label htmlFor="totalSiblings" className="form-label">Total Number of Siblings *</label>
                <select
                  id="totalSiblings"
                  className="form-select"
                  value={formData.totalSiblings.toString()}
                  onChange={(e) => handleTotalSiblingsChange(e.target.value)}
                >
                  <option value="">Select number of siblings</option>
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i.toString()}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {formData.totalSiblings > 0 && (
          <>
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fs-4 fw-bold">Sibling Details</h3>
                <button
                  onClick={addSibling}
                  className="btn btn-outline-primary d-flex align-items-center"
                  type="button"
                >
                  <Plus className="me-2" size={16} />
                  Add Sibling
                </button>
              </div>
            </div>

            {formData.siblings.map((sibling, index) => (
              <div key={index} className="col-12">
                <div className="custom-card border-start border-success">
                  <div className="custom-card-header bg-success d-flex justify-content-between align-items-center">
                    <h5 className="card-title">Sibling {index + 1}</h5>
                    <button
                      onClick={() => removeSibling(index)}
                      className="btn btn-danger btn-sm d-flex align-items-center"
                      type="button"
                    >
                      <Trash2 className="me-1" size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="custom-card-body">
                    <div className="row g-4">
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label htmlFor={`siblingName${index}`} className="form-label">Name *</label>
                          <input
                            id={`siblingName${index}`}
                            type="text"
                            className="form-control"
                            value={sibling.name}
                            onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                            placeholder="Enter sibling's name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label htmlFor={`siblingAge${index}`} className="form-label">Age *</label>
                          <input
                            id={`siblingAge${index}`}
                            type="number"
                            className="form-control"
                            value={sibling.age}
                            onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                            placeholder="Enter age"
                            min="1"
                            max="50"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label htmlFor={`siblingInstitution${index}`} className="form-label">School/University *</label>
                          <input
                            id={`siblingInstitution${index}`}
                            type="text"
                            className="form-control"
                            value={sibling.institution}
                            onChange={(e) => handleSiblingChange(index, 'institution', e.target.value)}
                            placeholder="Enter school/university name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="col-12 col-md-6">
                        <div className="mb-3">
                          <label htmlFor={`siblingFee${index}`} className="form-label">Monthly Fee *</label>
                          <input
                            id={`siblingFee${index}`}
                            type="number"
                            className="form-control"
                            value={sibling.monthlyFee}
                            onChange={(e) => handleSiblingChange(index, 'monthlyFee', e.target.value)}
                            placeholder="Enter monthly fee"
                            min="0"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="col-12">
          <div className="alert alert-info">
            <div className="text-info">
              <h6 className="fw-bold mb-2">Important Notes:</h6>
              <ul className="mb-0" style={{ fontSize: '0.875rem' }}>
                <li>Include all siblings who are currently studying</li>
                <li>Provide accurate fee information as this affects scholarship calculations</li>
                <li>If any sibling is not studying, you can enter "Not Applicable" in the institution field</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiblingsSection;
