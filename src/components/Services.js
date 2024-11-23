import React, { useState } from "react";

const Services = React.forwardRef((props, ref) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAnalyzeClick = () => {
    if (image) {
      // Handle image analysis logic here (e.g., sending the image to the backend)
      alert("Analyzing image...");
    } else {
      alert("Please upload an image first.");
    }
  };

  return (
    <section ref={ref} id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
          Upload Medical Image
        </h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg" data-aos="fade-up">
          <div className="file-drop-zone border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="imageUpload" className="cursor-pointer block">
              <i className="bi bi-cloud-upload text-5xl text-green-600 mb-4"></i>
              <p className="text-gray-600">Drag and drop your medical image here</p>
              <p className="text-sm text-gray-500 mt-2">or click to browse</p>
            </label>
          </div>

          {/* Display image name if uploaded */}
          {image && <p className="mt-4 text-center text-gray-600">Uploaded: {image.name}</p>}

          {/* "Analyze Image" Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleAnalyzeClick}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Analyze Image
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Services;
