
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PersonalInfoSection = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="registration" className="text-lg font-semibold">Registration Number</Label>
          <Input
            id="registration"
            value={formData.registration}
            readOnly
            className="bg-gray-50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg font-semibold">Name</Label>
          <Input
            id="name"
            value={formData.name}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fatherName" className="text-lg font-semibold">Father Name</Label>
          <Input
            id="fatherName"
            value={formData.fatherName}
            readOnly
            className="bg-gray-50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fatherContact" className="text-lg font-semibold">Father Contact</Label>
          <Input
            id="fatherContact"
            value={formData.fatherContact}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="session" className="text-lg font-semibold">Session</Label>
          <Input
            id="session"
            value={formData.session}
            readOnly
            className="bg-gray-50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department" className="text-lg font-semibold">Department</Label>
          <Input
            id="department"
            value={formData.department}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="class" className="text-lg font-semibold">Class</Label>
          <Input
            id="class"
            value={formData.class}
            readOnly
            className="bg-gray-50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="studentContact" className="text-lg font-semibold">Student Contact</Label>
          <Input
            id="studentContact"
            value={formData.studentContact}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-lg font-semibold">Permanent Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          readOnly
          className="bg-gray-50"
          rows={3}
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
