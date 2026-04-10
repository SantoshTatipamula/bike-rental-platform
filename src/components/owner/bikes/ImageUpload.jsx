import { useState, useRef } from "react";

const CLOUD_NAME = "dd5vh0k4m";
const UPLOAD_PRESET = "bike_rental_unsigned";

const ImageUpload = ({ setForm, setUploading }) => {
  const [images, setImages] = useState([]); // preview
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // ✅ enforce exactly 3 images
    if (files.length !== 3) {
      alert("Please upload exactly 3 images (Front + Left + Right)");
      return;
    }

    // 👉 Preview (temporary UI only)
    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setImages(previewUrls);

    setLoading(true);
    setUploading(true);

    try {
      // ✅ Upload all images to Cloudinary
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        return fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
      });

      const results = await Promise.all(uploadPromises);

      // ✅ Extract permanent URLs
      const cloudinaryUrls = results.map(
        (img) => img.secure_url
      );

      // ✅ Save to form (THIS IS IMPORTANT)
      setForm((prev) => ({
        ...prev,
        images: cloudinaryUrls,
      }));
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <section>
      <h2 className="font-semibold mb-4">Upload Images</h2>

      <input
        type="file"
        ref={inputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <div
        onClick={handleClick}
        className="border-2 border-dashed rounded-xl p-6 text-center hover:border-brand transition cursor-pointer"
      >
        <p className="text-textSecondary">
          Upload exactly 3 images (Front + Left + Right)
        </p>
      </div>

      {loading && (
        <p className="text-sm text-gray-500 mt-2">
          Uploading images...
        </p>
      )}

      <div className="flex gap-3 mt-4 flex-wrap">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="preview"
            className="w-20 h-20 object-cover rounded-lg border"
          />
        ))}
      </div>
    </section>
  );
};

export default ImageUpload;