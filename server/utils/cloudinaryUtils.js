const { cloudinary } = require("../config/cloudinary");
const { Readable } = require("stream");

const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const segments = imageUrl.split("/");
    const publicId = segments
      .slice(-2)
      .join("/")
      .replace(/\.[^/.]+$/, "");

    console.log("Public ID:", publicId);
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return { success: true, message: "Image deleted successfully" };
    } else {
      return {
        success: false,
        message: "Failed to delete image from Cloudinary",
      };
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, message: error.message };
  }
};

// Function to upload an image to Cloudinary
const uploadImageToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = Readable.from(fileBuffer);
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject({ success: false, message: error.message });
        } else {
          resolve({ success: true, secure_url: result.secure_url });
        }
      }
    );
    stream.pipe(uploadStream);
  });
};

module.exports = {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
};
