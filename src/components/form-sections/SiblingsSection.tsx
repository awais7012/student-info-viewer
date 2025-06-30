
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      // Add new empty siblings
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
      // Remove excess siblings
      setFormData(prev => ({
        ...prev,
        siblings: currentSiblings.slice(0, total)
      }));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Family Information - Siblings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="totalSiblings" className="text-lg font-semibold">Total Number of Siblings *</Label>
              <Select value={formData.totalSiblings.toString()} onValueChange={handleTotalSiblingsChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of siblings" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(11)].map((_, i) => (
                    <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {formData.totalSiblings > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Sibling Details</h3>
            <Button
              onClick={addSibling}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Sibling
            </Button>
          </div>

          {formData.siblings.map((sibling, index) => (
            <Card key={index} className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Sibling {index + 1}</CardTitle>
                <Button
                  onClick={() => removeSibling(index)}
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`siblingName${index}`} className="text-lg font-semibold">Name *</Label>
                    <Input
                      id={`siblingName${index}`}
                      value={sibling.name}
                      onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                      placeholder="Enter sibling's name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`siblingAge${index}`} className="text-lg font-semibold">Age *</Label>
                    <Input
                      id={`siblingAge${index}`}
                      type="number"
                      value={sibling.age}
                      onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                      placeholder="Enter age"
                      min="1"
                      max="50"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`siblingInstitution${index}`} className="text-lg font-semibold">School/University *</Label>
                    <Input
                      id={`siblingInstitution${index}`}
                      value={sibling.institution}
                      onChange={(e) => handleSiblingChange(index, 'institution', e.target.value)}
                      placeholder="Enter school/university name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`siblingFee${index}`} className="text-lg font-semibold">Monthly Fee *</Label>
                    <Input
                      id={`siblingFee${index}`}
                      type="number"
                      value={sibling.monthlyFee}
                      onChange={(e) => handleSiblingChange(index, 'monthlyFee', e.target.value)}
                      placeholder="Enter monthly fee"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="text-blue-800">
            <h4 className="font-semibold mb-2">Important Notes:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Include all siblings who are currently studying</li>
              <li>Provide accurate fee information as this affects scholarship calculations</li>
              <li>If any sibling is not studying, you can enter "Not Applicable" in the institution field</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiblingsSection;
