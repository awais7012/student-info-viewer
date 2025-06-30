import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialInfoSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Total Income */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Total Family Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="totalIncome" className="text-lg font-semibold">Total Income from All Sources (Monthly) *</Label>
            <Input
              id="totalIncome"
              type="number"
              value={formData.totalIncome}
              onChange={(e) => handleChange('totalIncome', e.target.value)}
              placeholder="Enter total monthly income"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Residency Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Residency Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Type of Residence *</Label>
            <RadioGroup 
              value={formData.residencyType} 
              onValueChange={(value) => handleChange('residencyType', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="owned" id="owned" />
                <Label htmlFor="owned">Owned</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rented" id="rented" />
                <Label htmlFor="rented">Rented</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.residencyType === 'owned' && (
            <div className="space-y-2">
              <Label htmlFor="propertySize" className="text-lg font-semibold">Property Size (sq ft) *</Label>
              <Input
                id="propertySize"
                value={formData.propertySize}
                onChange={(e) => handleChange('propertySize', e.target.value)}
                placeholder="Enter property size"
                required
              />
            </div>
          )}

          {formData.residencyType === 'rented' && (
            <div className="space-y-2">
              <Label htmlFor="rentAmount" className="text-lg font-semibold">Monthly Rent Amount *</Label>
              <Input
                id="rentAmount"
                type="number"
                value={formData.rentAmount}
                onChange={(e) => handleChange('rentAmount', e.target.value)}
                placeholder="Enter monthly rent"
                required
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Other Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Other Property Details (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="landDetails" className="text-lg font-semibold">Land Details</Label>
            <Textarea
              id="landDetails"
              value={formData.landDetails}
              onChange={(e) => handleChange('landDetails', e.target.value)}
              placeholder="Describe any land owned (area, location, type)"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cattleDetails" className="text-lg font-semibold">Cattle/Livestock Details</Label>
            <Textarea
              id="cattleDetails"
              value={formData.cattleDetails}
              onChange={(e) => handleChange('cattleDetails', e.target.value)}
              placeholder="Describe cattle/livestock owned"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleDetails" className="text-lg font-semibold">Vehicle Details</Label>
            <Textarea
              id="vehicleDetails"
              value={formData.vehicleDetails}
              onChange={(e) => handleChange('vehicleDetails', e.target.value)}
              placeholder="List vehicles owned (car, motorcycle, etc.)"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Mother/Other Earnings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Family Earnings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 p-4 bg-green-50 rounded-lg">
            <Checkbox
              id="motherEarning"
              checked={formData.motherEarning}
              onCheckedChange={(checked) => handleChange('motherEarning', checked)}
            />
            <Label htmlFor="motherEarning" className="text-lg font-semibold">
              Does your mother or any other family member earn?
            </Label>
          </div>

          {formData.motherEarning && (
            <div className="space-y-4 p-4 bg-green-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="motherName" className="text-lg font-semibold">Name *</Label>
                  <Input
                    id="motherName"
                    value={formData.motherName}
                    onChange={(e) => handleChange('motherName', e.target.value)}
                    placeholder="Enter name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="motherDesignation" className="text-lg font-semibold">Designation *</Label>
                  <Input
                    id="motherDesignation"
                    value={formData.motherDesignation}
                    onChange={(e) => handleChange('motherDesignation', e.target.value)}
                    placeholder="Enter job designation"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="motherPhone" className="text-lg font-semibold">Phone Number *</Label>
                  <Input
                    id="motherPhone"
                    value={formData.motherPhone}
                    onChange={(e) => handleChange('motherPhone', e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="motherIncome" className="text-lg font-semibold">Monthly Income *</Label>
                  <Input
                    id="motherIncome"
                    type="number"
                    value={formData.motherIncome}
                    onChange={(e) => handleChange('motherIncome', e.target.value)}
                    placeholder="Enter monthly income"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherAddress" className="text-lg font-semibold">Work Address *</Label>
                <Textarea
                  id="motherAddress"
                  value={formData.motherAddress}
                  onChange={(e) => handleChange('motherAddress', e.target.value)}
                  placeholder="Enter work address"
                  rows={2}
                  required
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialInfoSection;
