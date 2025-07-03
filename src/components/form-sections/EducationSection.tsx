
import { Upload } from "lucide-react";

const EducationSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const educationLevels = [
    {
      title: "Matriculation (10th)",
      fields: {
        marks: 'matricMarks',
        year: 'matricYear',
        percentage: 'matricPercentage',
        institute: 'matricInstitute'
      }
    },
    {
      title: "Intermediate (FA/FSc)",
      fields: {
        marks: 'interMarks',
        year: 'interYear',
        percentage: 'interPercentage',
        institute: 'interInstitute'
      }
    },
    {
      title: "Bachelor (BA/BSc)",
      fields: {
        marks: 'bachelorMarks',
        year: 'bachelorYear',
        percentage: 'bachelorPercentage',
        institute: 'bachelorInstitute'
      }
    },
    {
      title: "Last Semester Result",
      fields: {
        marks: 'lastSemesterMarks',
        year: 'lastSemesterYear',
        percentage: 'lastSemesterPercentage',
        institute: 'lastSemesterInstitute'
      }
    }
  ];

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-12">
          <div className="text-center bg-primary-light">
            <h3 className="fs-4 fw-bold text-primary">Educational Background Record</h3>
            <p className="text-primary mt-2">Please fill in your educational history with accurate information</p>
          </div>
        </div>

        {educationLevels.map((level, index) => (
          <div key={index} className="col-12">
            <div className="custom-card border-start border-primary">
              <div className="custom-card-header bg-primary">
                <h5 className="card-title">{level.title}</h5>
              </div>
              <div className="custom-card-body">
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor={level.fields.marks} className="form-label">Total Marks</label>
                      <input
                        id={level.fields.marks}
                        type="number"
                        className="form-control"
                        value={formData[level.fields.marks]}
                        onChange={(e) => handleChange(level.fields.marks, e.target.value)}
                        placeholder="Enter total marks"
                      />
                    </div>
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor={level.fields.year} className="form-label">Year</label>
                      <input
                        id={level.fields.year}
                        type="number"
                        className="form-control"
                        value={formData[level.fields.year]}
                        onChange={(e) => handleChange(level.fields.year, e.target.value)}
                        placeholder="Enter year"
                        min="1990"
                        max="2030"
                      />
                    </div>
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor={level.fields.percentage} className="form-label">Percentage</label>
                      <input
                        id={level.fields.percentage}
                        type="number"
                        className="form-control"
                        value={formData[level.fields.percentage]}
                        onChange={(e) => handleChange(level.fields.percentage, e.target.value)}
                        placeholder="Enter percentage"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor={level.fields.institute} className="form-label">Institute/School</label>
                      <input
                        id={level.fields.institute}
                        type="text"
                        className="form-control"
                        value={formData[level.fields.institute]}
                        onChange={(e) => handleChange(level.fields.institute, e.target.value)}
                        placeholder="Enter institute name"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-light" style={{ borderRadius: '0.375rem' }}>
                  <label className="form-label fw-bold text-muted">Attach Documents (Result Cards/Certificates)</label>
                  <button className="btn btn-outline-secondary d-flex align-items-center" style={{ width: '100%', marginTop: '0.5rem' }} type="button">
                    <Upload className="me-2" size={16} />
                    Upload {level.title} Documents
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="col-12">
          <div className="alert alert-warning">
            <div className="d-flex align-items-center text-warning">
              <span className="fw-bold me-2">Note:</span>
              <span>Please ensure all marks and percentages are accurate. Attach clear copies of all result cards and certificates.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
