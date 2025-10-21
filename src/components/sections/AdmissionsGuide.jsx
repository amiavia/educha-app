import React, { useState } from 'react';
import { HiOutlineXMark, HiOutlineBookOpen, HiOutlineAcademicCap, HiOutlineClipboardDocumentCheck, HiOutlineLightBulb } from 'react-icons/hi2';
import Button from '../ui/Button';
import Card from '../ui/Card';

const AdmissionsGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Info Tile */}
      <Card
        className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200"
        hover={true}
      >
        <div className="flex items-start gap-4">
          <div className="text-5xl">📚</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">The A-Z to Admissions</h3>
            <p className="text-sm text-gray-600 mb-4">All you need to know</p>
            <p className="text-sm text-gray-700 mb-4">
              Everything from entry requirements to UCAS points, interviews, portfolios, and alternative routes to university.
            </p>
            <Button
              size="small"
              variant="primary"
              className="w-full"
              onClick={() => setIsOpen(true)}
            >
              <HiOutlineBookOpen className="mr-2" size={18} />
              Read the Guide →
            </Button>
          </div>
        </div>
      </Card>

      {/* Full Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">📚</span>
                  <div>
                    <h2 className="text-2xl font-bold">The A-Z to Admissions</h2>
                    <p className="text-purple-100 text-sm">Your complete guide to UK university applications</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <HiOutlineXMark size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] prose prose-sm max-w-none">
                {/* Introduction */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-primary-blue mb-0">
                    <strong>✨ Your roadmap to success:</strong> Understanding entry requirements is the first step to getting into your dream university. This guide covers everything you need to know!
                  </p>
                </div>

                {/* What are university entry requirements? */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <HiOutlineClipboardDocumentCheck className="text-primary-blue" size={24} />
                    What are university entry requirements?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    To get a place on any university course, you're going to have to meet the entry requirements. These university entry requirements (sometimes referred to as UCAS entry requirements) are effectively a set of boxes that you need to be able to tick.
                  </p>
                  <p className="text-gray-700 mb-4">
                    If you meet the required level for each item on the list, you're in the running for a place on the course. Each university will set these entry requirements for each of its courses; the general idea being that they are set at a level where the university can then feel confident you'll be able to cope with the demands of the course.
                  </p>
                </section>

                {/* Why are entry requirements important? */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <HiOutlineLightBulb className="text-primary-blue" size={24} />
                    Why are entry requirements important?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The entry requirements should be pretty much the first thing you look at when you're researching university courses. You need to meet these requirements in order to get a place on the course, so there's not much point focusing on courses where the requirements are out of reach.
                  </p>
                  <p className="text-gray-700">
                    With thousands of courses to choose from, you can use entry requirements to quickly prioritise possible UCAS choices to research in more detail.
                  </p>
                </section>

                {/* What could an entry requirement be? */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What could an entry requirement be?</h3>

                  <div className="space-y-6">
                    {/* Qualifications */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">📝 Qualifications</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        What grades have you got? What grades are you expecting? Universities will look at what you've been studying since your GCSEs (or equivalent), as this is going to be the most recent evidence of your academic performance before starting university.
                      </p>
                      <p className="text-sm text-gray-700 mb-3">
                        Grades will be the main thing here - either grades you have already achieved or those that your teachers or tutors have predicted for you. But it's not just grades that matter.
                      </p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Common qualifications include:</strong></p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4">
                        <li>• A-levels</li>
                        <li>• BTECs</li>
                        <li>• T-levels</li>
                        <li>• Scottish Highers and Advanced Highers</li>
                        <li>• Welsh Baccalaureate</li>
                        <li>• International Baccalaureate</li>
                      </ul>
                    </div>

                    {/* UCAS Points */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">🎯 UCAS Points</h4>
                      <p className="text-sm text-gray-700">
                        Some universities measure academic performance in terms of UCAS points rather than grades. These points are a way for university staff to measure scores and grades across qualifications. Every grade for every included qualification is worth a set number of points; higher grades get higher amounts of points.
                      </p>
                    </div>

                    {/* GCSEs */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">📊 GCSEs</h4>
                      <p className="text-sm text-gray-700">
                        It's common for GCSEs in English and maths to be asked for as part of a university's entry requirements. Most universities will look for at least a 4 (sometimes a 5) at GCSE in these subjects. Specific courses may also ask for minimum grades in certain relevant GCSE subjects.
                      </p>
                    </div>

                    {/* Admissions Tests */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">📋 Admissions Tests</h4>
                      <p className="text-sm text-gray-700">
                        For more selective universities and competitive courses, you might be asked to sit a special exam to help admissions staff find the strongest candidates. If you're applying to Oxbridge or want to study a subject like law or medicine, this will likely apply to you.
                      </p>
                    </div>

                    {/* Interviews */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">💬 Interviews</h4>
                      <p className="text-sm text-gray-700">
                        A few universities – including Oxford, Cambridge and Imperial College London – interview most or all of their applicants. Where a course receives a high number of eligible applicants, admissions tutors may ask you for an interview either online or in person.
                      </p>
                    </div>

                    {/* Auditions */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">🎭 Auditions</h4>
                      <p className="text-sm text-gray-700">
                        If you're applying to a performing arts course like drama or music, you'll almost certainly need to audition once the university has considered your application. The university will provide guidance on your audition piece and key things you should demonstrate on the day.
                      </p>
                    </div>

                    {/* Portfolios */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">🎨 Portfolios</h4>
                      <p className="text-sm text-gray-700">
                        If you're applying to a creative arts course, like fine art or photography, you'll probably need to compile a portfolio of your work, either from work you've completed in school or in your free time. The university will tell you whether you need to submit this online, deliver it in person or present it to a tutor.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Alternative Routes */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <HiOutlineAcademicCap className="text-primary-blue" size={24} />
                    Can I apply without A-levels?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    There are alternative routes to university if you don't hold traditional A-levels, for example if you want to return to education after taking time away.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">🎓 Access to Higher Education Diplomas</h4>
                      <p className="text-sm text-gray-700">
                        Often referred to as 'Access courses', these are available for a wide variety of subjects with flexible learning options to juggle around other commitments (e.g., full-time or part-time work, children etc). They're usually offered by local colleges.
                      </p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">📚 Foundation Years</h4>
                      <p className="text-sm text-gray-700">
                        Offered by universities to help students fill in any gaps in their knowledge, so they can progress on to a full degree course. They might be a good option if you're not sure you want to commit to a particular subject for three years.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Pro Tips */}
                <div className="bg-gradient-to-r from-primary-blue to-accent-blue text-white rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-lg mb-3">💡 Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Check entry requirements early - they should be the first thing you look at</li>
                    <li>• Don't only apply to courses with requirements you've already met - aim slightly higher if you feel confident</li>
                    <li>• Universities can be flexible - if you just miss the grades, it's worth getting in touch</li>
                    <li>• Strong personal statements can make a difference for borderline cases</li>
                    <li>• Entry requirements can change, so always double-check on the university's official website</li>
                  </ul>
                </div>

                {/* Citation */}
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <p className="text-xs text-gray-500">
                    <strong>Source:</strong> The Uni Guide - "What are university entry requirements?"<br />
                    <a
                      href="https://www.theuniguide.co.uk/advice/ucas-application/what-are-university-entry-requirements"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-blue hover:underline"
                    >
                      https://www.theuniguide.co.uk/advice/ucas-application/what-are-university-entry-requirements
                    </a>
                    <br />
                    By Nik Taylor (editor, The Uni Guide) | 10 September 2025
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  Got it, thanks! ✓
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmissionsGuide;
