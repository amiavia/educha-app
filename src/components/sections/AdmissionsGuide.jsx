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
              Complete UK university admissions guide: entry requirements, UCAS points, changing choices, BTECs, references, gap years, contextual admissions & more.
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

                {/* Changing Your Choices */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <HiOutlineAcademicCap className="text-primary-blue" size={24} />
                    Can I change my university choices?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Choosing the right university course is a big decision. UCAS and universities understand this, and they can be flexible if you change your mind at some point. But it's important to act quickly – and you'll need to be clear with what you want to do instead.
                  </p>

                  <div className="space-y-4">
                    {/* Changing UCAS Choices */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">🔄 Can I change my UCAS choices?</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        Once you've made your five university choices, you'll receive confirmation from UCAS. If any of the details are incorrect, you'll need to contact UCAS straight away.
                      </p>
                      <ul className="text-sm text-gray-700 space-y-2 ml-4">
                        <li>• <strong>To change courses within a university:</strong> Speak to the university directly. If they agree, they'll let UCAS know and your UCAS Hub will be updated.</li>
                        <li>• <strong>To change a university:</strong> You must act within 14 days of getting your UCAS confirmation email. After this, you can only change under exceptional circumstances (like a family issue).</li>
                      </ul>
                    </div>

                    {/* Swapping Firm and Insurance */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">🔀 Can I swap my firm and insurance choices?</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        It's possible to swap your firm and insurance choices after responding to your offers - but this depends on timing.
                      </p>
                      <ul className="text-sm text-gray-700 space-y-2 ml-4">
                        <li>• <strong>Within 14 days:</strong> Contact a UCAS adviser to make this change.</li>
                        <li>• <strong>After two weeks:</strong> Contact both universities about swapping, then call UCAS to confirm. No guarantees!</li>
                        <li>• <strong>Deadline:</strong> Late July (check UCAS website for exact date)</li>
                      </ul>
                    </div>

                    {/* Declining Firm Choice */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">❌ Can I decline my firm choice?</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        This depends on whether your firm choice is conditional or unconditional:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-2 ml-4">
                        <li>• <strong>Firm conditional:</strong> Call UCAS to see if it's possible to change.</li>
                        <li>• <strong>Firm unconditional:</strong> You can release yourself into Clearing from 5 July using the 'decline your place' button. <span className="text-red-600 font-semibold">Warning: You will lose your current place!</span></li>
                      </ul>
                    </div>

                    {/* Canceling Application */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">🚫 Can I cancel my UCAS application?</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Yes, you can completely withdraw your application:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-2 ml-4">
                        <li>• <strong>Before accepting offers:</strong> Sign in to your UCAS Hub and withdraw online.</li>
                        <li>• <strong>Get a refund:</strong> Cancel within 14 days of submitting to get your UCAS fee refunded.</li>
                        <li>• <strong>After accepting offers:</strong> Phone UCAS or the universities to withdraw.</li>
                      </ul>
                    </div>

                    {/* Changing Courses Once at Uni */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">🏫 Can I change courses once at university?</h4>
                      <p className="text-sm text-gray-700">
                        It's not always easy to change courses once you've started – this depends on the course and university. But it can be done! Speak to your course tutor or student services if you're considering this.
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

                {/* Additional Topics - Concise Format */}
                <section className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">More Essential Topics</h3>

                  <div className="space-y-3">
                    {/* Universities seeing other choices */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">🔍 Can universities see where else you've applied?</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>No, they can't</strong> - admissions tutors cannot see your other four choices. Universities only know where else you applied once you've chosen your firm/insurance.</p>
                      <p className="text-sm text-gray-700"><strong>Oxbridge:</strong> Even if you apply by the October deadline (often Oxbridge applicants), universities don't assume or know for certain - and it doesn't affect decisions.</p>
                    </details>

                    {/* BTECs */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">🎓 Can you get into university with BTECs?</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>Yes!</strong> Most UK universities accept BTECs, including Russell Group universities. Over 100,000 BTEC students apply each year.</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Tip:</strong> Check specific course requirements - some courses may need additional A-levels or specific modules. BTEC students often transition well to university due to portfolio-based coursework experience.</p>
                    </details>

                    {/* UCAS Reference */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">📝 Getting a great UCAS reference</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>What it includes:</strong> Academic ability, predicted grades, extenuating circumstances, and personal qualities.</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>How to help your referee:</strong> Discuss your course early, mention personal circumstances you want included, highlight extracurricular achievements, and say thank you!</p>
                    </details>

                    {/* Gap Years */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">✈️ How universities view gap years</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>Generally positive!</strong> Universities welcome the maturity and experience gap year students bring.</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Options:</strong> Apply for deferred entry, apply during gap year with achieved grades, or request deferment after receiving offers.</p>
                      <p className="text-sm text-gray-700"><strong>Make it count:</strong> Gain relevant experience, earn money, travel, learn new skills, or resit exams. Show in your personal statement how it enhanced you as an individual.</p>
                    </details>

                    {/* Contextual Admissions */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">🌍 Contextual admissions policies</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>What it is:</strong> Universities consider your background to identify students with highest potential beyond just exam results.</p>
                      <p className="text-sm text-gray-700"><strong>Factors considered:</strong> School performance history, your postcode/area, care status, moves from abroad, participation in outreach programmes. Can affect offers, interviews, borderline decisions, and Clearing.</p>
                    </details>

                    {/* Post-UCAS steps */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">✅ Post-UCAS deadline: what's next?</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>5 key steps:</strong></p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4">
                        <li>1. Prepare to respond to offers (understand offer types)</li>
                        <li>2. Prepare for interviews if invited</li>
                        <li>3. Visit universities again to be sure</li>
                        <li>4. Apply for student finance (don't wait for offers!)</li>
                        <li>5. Research student accommodation options</li>
                      </ul>
                    </details>

                    {/* Multiple courses same uni */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">🎯 Applying for multiple courses at one university</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>Considerations:</strong> Can your personal statement work for both? Is it a wasted choice if they're similar variants?</p>
                      <p className="text-sm text-gray-700"><strong>Advice:</strong> Check with the university directly. For medicine/dentistry/vet med, using your 5th choice for a related course (like biomedical sciences) is often recommended.</p>
                    </details>

                    {/* 6 application steps */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">📋 6 steps to apply to university</summary>
                      <p className="text-sm text-gray-700 mt-2">
                        <strong>1.</strong> Choose course & university • <strong>2.</strong> Know deadlines (Jan 29 for most, Oct 15 for Oxbridge/medicine) • <strong>3.</strong> Check entry requirements • <strong>4.</strong> Register with UCAS • <strong>5.</strong> Write personal statement • <strong>6.</strong> Wait for offers!
                      </p>
                    </details>

                    {/* UCAS Tariff */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">🔢 UCAS Tariff points explained</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>What it is:</strong> A points system to compare qualifications. A-levels: A*=56, A=48, B=40, C=32, D=24, E=16.</p>
                      <p className="text-sm text-gray-700"><strong>Why universities use it:</strong> Creates flexibility - multiple ways to reach the same points total. Not all universities use tariff; some specify exact grades instead.</p>
                    </details>

                    {/* Unconditional offers */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">✨ Unconditional offers: should you accept?</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>What it is:</strong> Guaranteed place with no further requirements. Often given to gap year students with achieved grades, or based on strong predicted grades/interviews.</p>
                      <p className="text-sm text-gray-700"><strong>Advice:</strong> Don't rush your decision - wait to hear from all universities. Can make it your insurance choice for a stress-free backup. Don't let it reduce your exam effort!</p>
                    </details>

                    {/* Conditional offers */}
                    <details className="bg-gray-50 rounded-lg p-4">
                      <summary className="font-bold text-gray-900 cursor-pointer">📊 Understanding conditional offers</summary>
                      <p className="text-sm text-gray-700 mt-2 mb-2"><strong>Given with grades:</strong> e.g., AAB - achieve these in your exams. <strong>Given with points:</strong> e.g., 128 UCAS points from minimum 2 A-levels.</p>
                      <p className="text-sm text-gray-700"><strong>Other conditions:</strong> May include DBS checks, specific subject grades, or GCSE requirements. If you just miss your offer, universities may still accept you.</p>
                    </details>
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
                  <p className="text-xs text-gray-500 mb-3">
                    <strong>Sources:</strong> The Uni Guide (part of The Student Room Group) - By Nik Taylor (editor, The Uni Guide) | 10 September 2025
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/what-are-university-entry-requirements" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">University entry requirements</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/can-i-change-my-choices-when-applying-to-university" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Changing choices</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/can-universities-see-where-else-youve-applied-to" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Universities seeing other choices</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/can-you-get-into-university-if-youre-studying-btecs" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">BTECs at university</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/getting-a-teacher-to-write-your-ucas-reference" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">UCAS references</a> & <a href="https://www.theuniguide.co.uk/advice/ucas-application/how-to-get-the-ucas-reference-you-want" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Getting the reference you want</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/how-do-universities-view-gap-years" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Gap years</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/how-will-contextual-admissions-policies-affect-my-application" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Contextual admissions</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/post-ucas-deadline-five-things-to-do-next" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Post-UCAS steps</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/should-you-apply-for-more-than-one-course-at-the-same-university" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Multiple courses same uni</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/six-steps-you-need-to-take-to-apply-to-university" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Six application steps</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/ucas-tariff-what-you-need-to-know-about-ucas-points" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">UCAS tariff</a></p>
                    <p>• <a href="https://www.theuniguide.co.uk/advice/ucas-application/unconditional-offers-should-you-always-accept" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underlink">Unconditional offers</a> & <a href="https://www.theuniguide.co.uk/advice/ucas-application/understanding-conditional-offers" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Conditional offers</a></p>
                  </div>
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
