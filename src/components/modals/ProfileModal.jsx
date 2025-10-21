import React, { useState } from 'react';
import { HiOutlineXMark, HiOutlineCheckCircle } from 'react-icons/hi2';
import Button from '../ui/Button';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import EducationForm from '../forms/EducationForm';
import InterestsForm from '../forms/InterestsForm';
import AchievementsForm from '../forms/AchievementsForm';
import ExperienceForm from '../forms/ExperienceForm';
import LanguagesForm from '../forms/LanguagesForm';
import StatementForm from '../forms/StatementForm';

const ProfileModal = ({ section, onClose, onSave }) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const formComponents = {
    personal: PersonalInfoForm,
    education: EducationForm,
    interests: InterestsForm,
    achievements: AchievementsForm,
    experience: ExperienceForm,
    languages: LanguagesForm,
    statement: StatementForm,
  };

  const FormComponent = formComponents[section.id];

  const handleSave = () => {
    onSave(section.id, formData);
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary-blue to-accent-blue text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{section.icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <p className="text-blue-100 text-sm">Fill in your details below</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <HiOutlineXMark size={24} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {FormComponent && (
              <FormComponent
                data={formData}
                onChange={setFormData}
                completed={section.completed}
              />
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <button
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Skip for now
            </button>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <HiOutlineCheckCircle className="mr-2" size={20} />
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
