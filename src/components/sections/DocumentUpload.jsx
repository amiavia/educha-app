import React, { useState } from 'react';
import { HiOutlineCloudArrowUp, HiOutlineDocumentText, HiOutlineCheckCircle, HiOutlineSparkles, HiOutlineXMark } from 'react-icons/hi2';
import Button from '../ui/Button';
import StudentCard from './StudentCard';

const DocumentUpload = ({ onUploadComplete }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    setUploadedFiles([...uploadedFiles, ...fileArray]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleProcess = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(false);
      setUploadedFiles([]);
      if (onUploadComplete) {
        onUploadComplete();
      }
    }, 3000);
  };

  return (
    <>
      {/* Split Layout: Upload Section + Student Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 lg:items-stretch">
        {/* Left: Upload Section */}
        <div className="bg-gradient-to-r from-primary-gold via-yellow-400 to-primary-gold rounded-2xl p-1 shadow-lg h-full flex flex-col">
          <div className="bg-white rounded-xl p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary-gold to-yellow-500 text-white rounded-full p-3">
                <HiOutlineSparkles size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Upload Your Documents</h2>
                <p className="text-sm text-primary-gold font-semibold">Create Your Unique Student Card Instantly</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-3">
              Upload your academic transcripts, certificates, CV, or any documents – we'll automatically extract the information and create your complete student profile.
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-blue-50 text-primary-blue px-2 py-1 rounded-full font-medium">
                ✓ Transcripts
              </span>
              <span className="text-xs bg-blue-50 text-primary-blue px-2 py-1 rounded-full font-medium">
                ✓ Certificates
              </span>
              <span className="text-xs bg-blue-50 text-primary-blue px-2 py-1 rounded-full font-medium">
                ✓ CV/Resume
              </span>
              <span className="text-xs bg-blue-50 text-primary-blue px-2 py-1 rounded-full font-medium">
                ✓ Test Scores
              </span>
            </div>

            <p className="text-xs text-gray-600 italic mb-4">
              💡 You can always review, edit, and update any information after upload
            </p>

            <div className="mt-auto">
              <Button
                size="medium"
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-primary-gold to-yellow-500 hover:from-yellow-500 hover:to-primary-gold text-white shadow-lg transform hover:scale-105 transition-all"
              >
                <HiOutlineCloudArrowUp className="mr-2" size={20} />
                Upload Documents
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Student Card Preview */}
        <div className="flex items-center justify-center">
          <StudentCard />
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => !isProcessing && setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-primary-gold to-yellow-500 text-white px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <HiOutlineSparkles size={32} />
                  <div>
                    <h2 className="text-2xl font-bold">Create Your Student Card</h2>
                    <p className="text-yellow-100 text-sm">Upload documents to auto-fill your profile</p>
                  </div>
                </div>
                {!isProcessing && (
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <HiOutlineXMark size={24} />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                {!isProcessing ? (
                  <>
                    {/* Upload Area */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        isDragging
                          ? 'border-primary-gold bg-yellow-50'
                          : 'border-gray-300 bg-gray-50 hover:border-primary-gold hover:bg-yellow-50'
                      }`}
                    >
                      <HiOutlineCloudArrowUp className="mx-auto text-primary-gold mb-4" size={64} />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Drag & drop your documents here
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">or click to browse</p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button
                          as="span"
                          variant="secondary"
                          className="cursor-pointer"
                        >
                          Browse Files
                        </Button>
                      </label>
                      <p className="text-xs text-gray-500 mt-3">
                        Supports: PDF, Word, Images (JPEG, PNG)
                      </p>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <HiOutlineDocumentText size={20} />
                          Uploaded Documents ({uploadedFiles.length})
                        </h4>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                            >
                              <div className="flex items-center gap-3">
                                <HiOutlineDocumentText className="text-primary-blue" size={20} />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <HiOutlineXMark size={20} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Instructions */}
                    <div className="bg-blue-50 rounded-lg p-4 mt-6">
                      <h4 className="font-bold text-primary-blue mb-2">📋 What happens next?</h4>
                      <ol className="text-sm text-gray-700 space-y-2 ml-4">
                        <li>1. We'll scan your documents and extract key information</li>
                        <li>2. Your profile sections will be automatically populated</li>
                        <li>3. Review and edit any information as needed</li>
                        <li>4. Your Unique Student Card is ready for applications!</li>
                      </ol>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 mt-4">
                      <p className="text-sm text-yellow-800">
                        <strong>🔒 Your data is safe:</strong> All documents are processed securely and you have full control to review, edit, or delete any information at any time.
                      </p>
                    </div>
                  </>
                ) : (
                  /* Processing State */
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-gold border-t-transparent mb-4"></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Processing Your Documents...
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We're extracting information and creating your student profile
                    </p>
                    <div className="max-w-md mx-auto space-y-2">
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <HiOutlineCheckCircle className="text-green-500" size={20} />
                        <span>Documents uploaded successfully</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-gold border-t-transparent"></div>
                        <span>Extracting information from documents...</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="w-5 h-5"></div>
                        <span>Populating your profile sections...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {!isProcessing && (
                <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={handleProcess}
                    disabled={uploadedFiles.length === 0}
                    className="bg-gradient-to-r from-primary-gold to-yellow-500"
                  >
                    <HiOutlineSparkles className="mr-2" size={20} />
                    Create My Student Card ({uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'})
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentUpload;
