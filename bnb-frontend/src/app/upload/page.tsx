'use client'
import React, { useState, useRef } from "react";
import { Upload, X, ImagePlus, Loader2 } from "lucide-react";
import { uploadImage } from "@/api";

const MultipleImageUpload = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    addNewFiles(files);
  };

  const addNewFiles = (files: FileList) => {
    const newImageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newImageUrls]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addNewFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (previewImages.length === 0) return;
    
    setUploading(true);
  
    // Create FormData
    const formData = new FormData();
    const input = fileInputRef.current;
    const files = input?.files;
  
    if (!files) return;
  
    // Add files to FormData
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });
  
    // Debug FormData properly
    console.log("Files being uploaded:", formData.getAll("images").length);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const res = await uploadImage(formData);
      console.log("Upload response:", res);
      
      // Clear images after successful upload
      setPreviewImages([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    
      <form 
        onSubmit={handleUpload}
        className="w-full"
        onDragEnter={handleDrag}
      >
        <div 
          className={`border-2 border-dashed rounded-lg p-6 transition-all ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <ImagePlus size={48} className="text-gray-400" />
            <div className="text-center">
              <p className="text-lg font-medium">Drag & drop images here</p>
              <p className="text-sm text-gray-500 mt-1">Or click to browse files</p>
            </div>
            <button
              type="button"
              onClick={triggerFileInput}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium flex items-center space-x-2"
            >
              <Upload size={16} />
              <span>Select Files</span>
            </button>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleSelectImages}
          className="hidden"
        />
        
        {previewImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Selected Images ({previewImages.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewImages.map((src, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden aspect-square">
                  <img 
                    src={src} 
                    alt={`preview-${idx}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1 rounded-full transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {previewImages.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={uploading}
              className={`px-6 py-2 rounded-md font-medium flex items-center space-x-2 ${
                uploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              } text-white transition-colors`}
            >
              {uploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Upload {previewImages.length} Image{previewImages.length > 1 ? 's' : ''}</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>
  
  );
};

export default MultipleImageUpload;