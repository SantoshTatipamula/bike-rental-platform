import { useState, useEffect, useRef } from "react";
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
import { Trash2 } from "lucide-react";

export default function EditProfileModal({ open, onOpenChange }) {
  const CLOUD_NAME = "dd5vh0k4m";
  const UPLOAD_PRESET = "bike_rental_unsigned";

  const { user, updateUserContext } = useAuth();
  const blobUrlRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    location: user?.location || "",
  });

  const [preview, setPreview] = useState(null);
  const [previewError, setPreviewError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const firstLetter = formData.name?.charAt(0)?.toUpperCase() || "?";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    const blobUrl = URL.createObjectURL(file);
    blobUrlRef.current = blobUrl;
    setPreview(blobUrl);
    setPreviewError(false);
    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formDataUpload }
      );
      const data = await res.json();

      setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
      setPreview(data.secure_url);
      URL.revokeObjectURL(blobUrl);
      blobUrlRef.current = null;
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  // Delete photo — clears avatar and reverts to letter avatar
  const handleDeletePhoto = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setPreview(null);
    setPreviewError(false);
    setFormData((prev) => ({ ...prev, avatar: "" }));
  };

  const handleSubmit = async () => {
    try {
      if (!user?.uid) return;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        avatar: formData.avatar,
        location: formData.location,
      });
      updateUserContext({ ...user, ...formData });
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
      setPreview(null);
      setPreviewError(false);
    }
  }, [user, open]);

  const displaySrc = preview || formData.avatar;
  const showImage = displaySrc && !previewError;
  const hasPhoto = !!formData.avatar || !!preview;

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
          {/* Profile Image Preview */}
          <div className="flex items-center gap-4">

            {/* Avatar circle */}
            {showImage ? (
              <img
                src={displaySrc}
                alt="profile preview"
                className="w-16 h-16 rounded-full object-cover"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-bold">{firstLetter}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer text-sm bg-gray-100 px-3 py-1.5 rounded-md text-center">
                {uploading ? "Uploading..." : "Change Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>

              {/* Delete button — only shown when user has a photo */}
              {hasPhoto && !uploading && (
                <button
                  onClick={handleDeletePhoto}
                  className="flex items-center justify-center gap-1.5 text-sm text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition"
                >
                  <Trash2 size={14} />
                  Remove Photo
                </button>
              )}
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
              disabled={uploading}
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