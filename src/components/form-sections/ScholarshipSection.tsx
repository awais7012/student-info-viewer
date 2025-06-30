
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ScholarshipSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Previous Scholarship Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 p-4 bg-purple-50 rounded-lg">
            <Checkbox
              id="previousScholarship"
              checked={formData.previousScholarship}
              onCheckedChange={(checked) => handleChange('previousScholarship', checked)}
            />
            <Label htmlFor="previousScholarship" className="text-lg font-semibold">
              Have you received any scholarship before?
            </Label>
          </div>

          {formData.previousScholarship && (
            <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scholarshipAmount" className="text-lg font-semibold">Scholarship Amount *</Label>
                  <Input
                    id="scholarshipAmount"
                    type="number"
                    value={formData.scholarshipAmount}
                    onChange={(e) => handleChange('scholarshipAmount', e.target.value)}
                    placeholder="Enter scholarship amount"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scholarshipDuration" className="text-lg font-semibold">Duration/Details *</Label>
                  <Input
                    id="scholarshipDuration"
                    value={formData.scholarshipDuration}
                    onChange={(e) => handleChange('scholarshipDuration', e.target.value)}
                    placeholder="e.g., 2 years, monthly, etc."
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Application Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="applicationDate" className="text-lg font-semibold">Application Date *</Label>
            <Input
              id="applicationDate"
              type="date"
              value={formData.applicationDate}
              onChange={(e) => handleChange('applicationDate', e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="text-green-800">
            <h4 className="font-semibold mb-2">Application Guidelines:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Ensure all information provided is accurate and verifiable</li>
              <li>Submit all required documents in clear, readable format</li>
              <li>Keep copies of all submitted documents for your records</li>
              <li>Contact administration for any clarifications needed</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScholarshipSection;
