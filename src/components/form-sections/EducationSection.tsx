
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-6">
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-800">Educational Background Record</h3>
        <p className="text-blue-600 mt-2">Please fill in your educational history with accurate information</p>
      </div>

      {educationLevels.map((level, index) => (
        <Card key={index} className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-lg text-blue-700">{level.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={level.fields.marks} className="text-lg font-semibold">Total Marks</Label>
                <Input
                  id={level.fields.marks}
                  type="number"
                  value={formData[level.fields.marks]}
                  onChange={(e) => handleChange(level.fields.marks, e.target.value)}
                  placeholder="Enter total marks"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={level.fields.year} className="text-lg font-semibold">Year</Label>
                <Input
                  id={level.fields.year}
                  type="number"
                  value={formData[level.fields.year]}
                  onChange={(e) => handleChange(level.fields.year, e.target.value)}
                  placeholder="Enter year"
                  min="1990"
                  max="2030"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={level.fields.percentage} className="text-lg font-semibold">Percentage</Label>
                <Input
                  id={level.fields.percentage}
                  type="number"
                  value={formData[level.fields.percentage]}
                  onChange={(e) => handleChange(level.fields.percentage, e.target.value)}
                  placeholder="Enter percentage"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={level.fields.institute} className="text-lg font-semibold">Institute/School</Label>
                <Input
                  id={level.fields.institute}
                  value={formData[level.fields.institute]}
                  onChange={(e) => handleChange(level.fields.institute, e.target.value)}
                  placeholder="Enter institute name"
                />
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <Label className="text-sm font-semibold text-gray-700">Attach Documents (Result Cards/Certificates)</Label>
              <Button variant="outline" className="mt-2 w-full" type="button">
                <Upload className="w-4 h-4 mr-2" />
                Upload {level.title} Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <span className="font-semibold">Note:</span>
            <span>Please ensure all marks and percentages are accurate. Attach clear copies of all result cards and certificates.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationSection;
