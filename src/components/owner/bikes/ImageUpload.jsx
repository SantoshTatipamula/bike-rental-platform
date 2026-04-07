import { useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  return (
    <section>
      <h2 className="font-semibold mb-4">Upload Images</h2>

      {/* Upload Box */}
      <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-brand transition cursor-pointer">
        <p className="text-textSecondary">
          Click or drag images here
        </p>
      </div>

      {/* Preview */}
      <div className="flex gap-3 mt-4 flex-wrap">
        {images.map((img, i) => (
          <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </section>
  );
};

export default ImageUpload;