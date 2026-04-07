import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function EditProfileModal({ open, onOpenChange }) {
const {user,login} = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    avatar: user?.avatar || "", // 🔥 ADD THIS
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
        avatar: preview, // 🔥 IMPORTANT
      });
    }
  };
  const handleSubmit = () => {
    login({
      ...user,
      ...formData,
    });
    onOpenChange(false);
  };



useEffect(() => {
  if (user && open) {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      avatar: user.avatar || "",
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
            />
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
