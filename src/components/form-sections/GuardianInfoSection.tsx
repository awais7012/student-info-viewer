
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GuardianInfoSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
        <Checkbox
          id="fatherAlive"
          checked={formData.fatherAlive}
          onCheckedChange={(checked) => handleChange('fatherAlive', checked)}
        />
        <Label htmlFor="fatherAlive" className="text-lg font-semibold">
          Is your father alive?
        </Label>
      </div>

      {!formData.fatherAlive && (
        <div className="space-y-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Guardian Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="guardianName" className="text-lg font-semibold">Guardian Name *</Label>
              <Input
                id="guardianName"
                value={formData.guardianName}
                onChange={(e) => handleChange('guardianName', e.target.value)}
                placeholder="Enter guardian's full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship" className="text-lg font-semibold">Relationship *</Label>
              <Select value={formData.relationship} onValueChange={(value) => handleChange('relationship', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="uncle">Uncle</SelectItem>
                  <SelectItem value="aunt">Aunt</SelectItem>
                  <SelectItem value="grandfather">Grandfather</SelectItem>
                  <SelectItem value="grandmother">Grandmother</SelectItem>
                  <SelectItem value="brother">Brother</SelectItem>
                  <SelectItem value="sister">Sister</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="guardianEmail" className="text-lg font-semibold">Guardian Email</Label>
              <Input
                id="guardianEmail"
                type="email"
                value={formData.guardianEmail}
                onChange={(e) => handleChange('guardianEmail', e.target.value)}
                placeholder="guardian@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="guardianPhone" className="text-lg font-semibold">Guardian Phone *</Label>
              <Input
                id="guardianPhone"
                value={formData.guardianPhone}
                onChange={(e) => handleChange('guardianPhone', e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guardianAddress" className="text-lg font-semibold">Guardian Address *</Label>
            <Textarea
              id="guardianAddress"
              value={formData.guardianAddress}
              onChange={(e) => handleChange('guardianAddress', e.target.value)}
              placeholder="Enter complete address"
              rows={3}
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardianInfoSection;
