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
      <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary-blue to-accent-blue text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <span className="text-3xl sm:text-4xl shrink-0">{section.icon}</span>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold truncate">{section.title}</h2>
                <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">Fill in your details below</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 active:bg-white/30 rounded-full p-2 transition-colors shrink-0"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <HiOutlineXMark size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-180px)]">
            {FormComponent && (
              <FormComponent
                data={formData}
                onChange={setFormData}
                completed={section.completed}
              />
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 border-t border-gray-200">
            <button
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-900 active:text-gray-700 font-medium text-sm sm:text-base order-2 sm:order-1 py-2"
              style={{ minHeight: '44px' }}
            >
              Skip for now
            </button>
            <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1 sm:flex-none text-sm sm:text-base py-2.5"
                style={{ minHeight: '44px' }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 sm:flex-none text-sm sm:text-base py-2.5"
                style={{ minHeight: '44px' }}
              >
                <HiOutlineCheckCircle className="mr-2" size={18} className="sm:w-5 sm:h-5" />
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
