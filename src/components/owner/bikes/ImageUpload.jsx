import { useState, useRef } from "react";

const ImageUpload = ({ setForm }) => {
  const [images, setImages] = useState([]);
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // ✅ enforce exactly 3 images
    if (files.length !== 3) {
      alert("Please upload exactly 3 images (Front + Left + Right)");
      return;
    }

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImages(previewUrls);

    // ✅ FIXED (images, not image)
    setForm((prev) => ({
      ...prev,
      images: previewUrls,
    }));
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