import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditProfileModal({ open, onOpenChange }) {
  const { user, updateUserContext } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    location: user?.location || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const preview = URL.createObjectURL(file);

      setFormData({
        ...formData,
        avatar: preview,
      });
    }
  };
  const handleSubmit = async () => {
    try {
      if (!user?.uid) return;

      // 🔥 Update Firestore
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        avatar: formData.avatar,
        location: formData.location,
      });

      // 🔥 Update UI instantly
      updateUserContext({
        ...user,
        ...formData,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (user && open) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        avatar: user.avatar || "",
        location: user.location || "",
      });
    }
  }, [user, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Profile
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Profile Image */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src={formData.avatar || "/default-avatar.png"}
                className="w-16 h-16 rounded-full object-cover"
              />

              <label className="cursor-pointer text-sm bg-gray-100 px-3 py-1 rounded-md">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <Label>Phone</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              pattern="[0-9]{10}"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <Label>Location</Label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-3 rounded-md w-full"
            >
              <option value="">Select Location</option>
              <option value="Housing Board">Housing Board</option>
              <option value="Kothirampur">Kothirampur</option>
              <option value="Mankammathota">Mankammathota</option>
              <option value="Jagtial Road">Jagtial Road</option>
              <option value="Alkapuri">Alkapuri</option>
            </select>
          </div>

          {/* Email (readonly) */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input value={formData.email} disabled />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
