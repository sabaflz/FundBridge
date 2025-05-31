import { useState } from 'react';

// ===== survey data (inline for simplicity) =====
const questionGroups = [
  [
    { key: 'fullName', label: 'Full Name', type: 'text', required: true },
    { key: 'email', label: 'Email Address', type: 'email', required: true },
    { key: 'country', label: 'Country/Location', type: 'text', required: true },
    { key: 'password', label: 'password', type: 'text', required: true },
  ],
  [
    {
      key: 'currentRole',
      label: 'Current Role',
      type: 'select',
      options: [
        { value: '', label: 'Select a role' },
        { value: 'student', label: 'Student' },
        { value: 'professional', label: 'Professional' },
        { value: 'researcher', label: 'Researcher' },
        { value: 'entrepreneur', label: 'Entrepreneur' },
        { value: 'other', label: 'Other' },
      ],
      required: true,
    },
    {
      key: 'otherRole',
      label: 'Other Role',
      type: 'text',
      showIf: (data) => data.currentRole === 'other',
      placeholder: 'Please specify',
    },
  ],
  [
    {
      key: 'skills',
      label: 'What skills do you bring to a team?',
      type: 'checkboxGroup',
      options: [
        { value: 'coding', label: 'Coding / technical' },
        { value: 'dataAnalysis', label: 'Data analysis / research' },
        { value: 'writing', label: 'Writing / documentation' },
        { value: 'design', label: 'Design / prototyping' },
        { value: 'fundraising', label: 'Fundraising / budgeting' },
        { value: 'projectManagement', label: 'Project management' },
      ],
      extraInput: { key: 'otherSkills', placeholder: 'Other skills' },
    },
  ],
  [
    {
      key: 'hasCollaborated',
      label: 'Have you worked on collaborative projects or research before?',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
    {
      key: 'projectDescription',
      label: 'If yes, briefly describe a past project or role',
      type: 'textarea',
      showIf: (data) => data.hasCollaborated === 'yes',
    },
    {
      key: 'canLead',
      label: 'Are you comfortable leading a team or managing tasks?',
      type: 'select',
      options: [
        { value: '', label: 'Select an option' },
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'maybe', label: 'Maybe' },
      ],
    },
  ],
  [
    {
      key: 'wantsToPropose',
      label: 'Do you want to propose a new project?',
      type: 'radio',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ],
    },
    { key: 'projectTitle', label: 'Project Title', type: 'text', showIf: (data) => data.wantsToPropose === 'yes' },
    { key: 'projectIdea', label: 'Describe your project idea or goal', type: 'textarea', showIf: (data) => data.wantsToPropose === 'yes' },
    {
      key: 'fundingNeeded',
      label: 'How much funding do you think your project needs?',
      type: 'select',
      options: [
        { value: '', label: 'Select an amount' },
        { value: '0-500', label: '$0–$500' },
        { value: '500-5000', label: '$500–$5,000' },
        { value: '5000-25000', label: '$5,000–$25,000' },
        { value: '25000+', label: '$25,000+' },
      ],
      showIf: (data) => data.wantsToPropose === 'yes',
    },
    { key: 'idealTeammates', label: 'What are your ideal teammate qualities or skills?', type: 'textarea', showIf: (data) => data.wantsToPropose === 'yes' },
  ],
  [
    {
      key: 'interests',
      label: 'What are your interest areas? (Select up to 3)',
      type: 'checkboxGroup',
      options: [
        { value: 'health', label: 'Health & wellness' },
        { value: 'ai', label: 'AI / Data Science' },
        { value: 'sustainability', label: 'Sustainability / Environment' },
        { value: 'education', label: 'Education' },
        { value: 'arts', label: 'Arts / Media' },
        { value: 'robotics', label: 'Robotics / Hardware' },
        { value: 'socialImpact', label: 'Social Impact' },
        { value: 'openSource', label: 'Open Source' },
      ],
      extraInput: { key: 'otherInterests', placeholder: 'Other interests' },
      max: 3,
    },
    { key: 'problemStatement', label: 'In your own words, what kind of problem would you like to work on?', type: 'textarea' },
  ],
  [
    {
      key: 'weeklyHours',
      label: 'How many hours can you commit weekly?',
      type: 'select',
      options: [
        { value: '', label: 'Select hours' },
        { value: '<2', label: '<2' },
        { value: '2-5', label: '2–5' },
        { value: '5-10', label: '5–10' },
        { value: '10+', label: '10+' },
      ],
    },
    { key: 'timezone', label: 'What is your time zone?', type: 'text', placeholder: 'e.g., PST, EST, GMT+8' },
    {
      key: 'workingPreferences',
      label: 'Preferred way of working',
      type: 'checkboxGroup',
      options: [
        { value: 'async', label: 'Async / flexible hours' },
        { value: 'scheduled', label: 'Scheduled team meetings' },
        { value: 'casual', label: 'Casual / relaxed pace' },
        { value: 'structured', label: 'Structured / deadline-driven' },
      ],
    },
  ],
  [
    {
      key: 'fundingImportance',
      label: 'How important is funding to your project success?',
      type: 'select',
      options: [
        { value: '', label: 'Select importance' },
        { value: 'notImportant', label: 'Not important' },
        { value: 'helpful', label: 'Helpful but optional' },
        { value: 'essential', label: 'Essential' },
      ],
    },
    { key: 'hasAppliedForGrant', label: 'Have you ever applied for a grant before?', type: 'radio', options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
    ] },
  ],
];

const initialFormData = {
  fullName: '', email: '', country: '', password: '', currentRole: '', otherRole: '',
  skills: [], otherSkills: '', hasCollaborated: '', projectDescription: '',
  canLead: '', wantsToPropose: '', projectTitle: '', projectIdea: '',
  fundingNeeded: '', idealTeammates: '', interests: [], otherInterests: '',
  problemStatement: '', weeklyHours: '', timezone: '', workingPreferences: [],
  fundingImportance: '', hasAppliedForGrant: '',
};

// helper to wrap a question in a green header + white card
const wrap = (q, inputField) => (
  <div key={q.key} className="mb-6 rounded-xl shadow border border-gray-200 overflow-hidden">
    <div className="bg-teal-700 px-4 py-2">
      <h3 className="text-white text-lg font-semibold">{q.label}</h3>
    </div>
    <div className="bg-white p-4">{inputField}</div>
  </div>
);

export default function Survey() {
  const [formData, setFormData] = useState(initialFormData);
  const [page, setPage] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalPages = questionGroups.length;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (['skills','interests','workingPreferences'].includes(name)) {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(v => v !== value)
        }));
        return;
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleBack = () => page > 0 && setPage(page-1);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only submit if we're on the last page
    if (page !== totalPages - 1) {
      handleNext();
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('There was an error submitting your survey. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="w-full bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-xl mx-auto px-4 py-4">
            <span className="text-2xl font-bold text-teal-800">FundBridge</span>
          </div>
        </nav>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Thank You!</h2>
            <p className="text-gray-600 mb-8">Your survey has been submitted successfully.</p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  // TODO: Replace with actual navigation to testTeam page
                  console.log('Navigate to Find Team page');
                }}
                className="w-full px-6 py-3 rounded-lg font-semibold shadow bg-teal-700 text-white hover:bg-teal-800 transition-colors"
              >
                Find a Team
              </button>
              <button
                onClick={() => {
                  // TODO: Replace with actual navigation to testGrant page
                  console.log('Navigate to Find Grant page');
                }}
                className="w-full px-6 py-3 rounded-lg font-semibold shadow bg-teal-700 text-white hover:bg-teal-800 transition-colors"
              >
                Find a Grant
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderQuestion = (q) => {
    if (q.showIf && !q.showIf(formData)) return null;
    let inputField;
    switch(q.type) {
      case 'text':
      case 'email': inputField = (
        <input type={q.type} name={q.key} value={formData[q.key]}
          onChange={handleInputChange} required={q.required}
          placeholder={q.placeholder||''}
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-teal-500 bg-gray-50" />
      ); break;
      case 'textarea': inputField = (
        <textarea name={q.key} value={formData[q.key]}
          onChange={handleInputChange} rows={4}
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-teal-500 bg-gray-50" />
      ); break;
      case 'select': inputField = (
        <select name={q.key} value={formData[q.key]}
          onChange={handleInputChange} required={q.required}
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-teal-500 bg-gray-50">
          {q.options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ); break;
      case 'radio': inputField = (
        <div className="flex gap-6">{q.options.map(o=> (
          <label key={o.value} className="inline-flex items-center gap-2">
            <input type="radio" name={q.key} value={o.value}
              checked={formData[q.key]===o.value}
              onChange={handleInputChange}
              className="text-teal-600 focus:ring-teal-500" />
            <span className="text-gray-700">{o.label}</span>
          </label>
        ))}</div>
      ); break;
      case 'checkboxGroup': inputField = (
        <>
          <div className="flex flex-col gap-2">{q.options.map(o=> (
            <label key={o.value} className="inline-flex items-center gap-2">
              <input type="checkbox" name={q.key} value={o.value}
                checked={formData[q.key].includes(o.value)}
                onChange={handleInputChange}
                disabled={q.max && formData[q.key].length>=q.max && !formData[q.key].includes(o.value)}
                className="text-teal-600 rounded-sm focus:ring-teal-500" />
              <span className="text-gray-700">{o.label}</span>
            </label>
          ))}</div>
          {q.extraInput && (
            <input type="text" name={q.extraInput.key}
              value={formData[q.extraInput.key]} onChange={handleInputChange}
              placeholder={q.extraInput.placeholder}
              className="mt-3 w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-teal-500 bg-gray-50" />
          )}
        </>
      ); break;
      default: return null;
    }
    return wrap(q, inputField);
  };

  const isPageValid = () => {
    return questionGroups[page].every(q => {
      if (q.showIf && !q.showIf(formData)) return true;
      if (!q.required) return true;
      if (q.type === 'checkboxGroup') {
        return formData[q.key] && formData[q.key].length > 0;
      }
      return formData[q.key] && formData[q.key].toString().trim() !== '';
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav Bar */}
      <nav className="w-full bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-xl mx-auto px-4 py-4">
          <span className="text-2xl font-bold text-teal-800">FundBridge</span>
        </div>
      </nav>
      {/* Center the form */}
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-xl font-bold mb-6 text-gray-800">Project Survey</h2>
          {questionGroups[page].map(renderQuestion)}
          <div className="flex justify-between items-center mt-8">
            <button type="button" onClick={handleBack}
              disabled={page===0}
              className={`px-4 py-2 rounded font-medium ${page===0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Back
            </button>
            {page < totalPages - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isPageValid()}
                className={`px-6 py-2 rounded-lg font-semibold shadow ${!isPageValid() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-teal-700 text-white hover:bg-teal-800'}`}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit"
                disabled={!isPageValid()}
                className={`px-6 py-2 rounded-lg font-semibold shadow ${!isPageValid() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-teal-700 text-white hover:bg-teal-800'}`}
              >
                Submit Survey
              </button>
            )}
          </div>
          <div className="mt-4 text-center text-gray-500 text-sm">
            Page {page + 1} of {totalPages - 1}
          </div>
        </form>
      </div>
    </div>
  );
}