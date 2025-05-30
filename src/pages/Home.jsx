import { Link } from 'react-router-dom';
import { MagnifyingGlassPlusIcon, SparklesIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const Home = () => {
  // Placeholder for user name - you can replace this with state or context later
  const userName = "Alex";

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="text-left mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome, {userName}!</h1>
        <p className="mt-2 text-lg text-gray-600">Connect. Collaborate. Fund Your Future.</p>
      </div>

      <div className="space-y-6">
        {/* Explore Research Grants */}
        <Link
          to="/explore"
          className="card flex items-center space-x-4 p-6 bg-primary-700 text-white hover:bg-primary-800 transition-colors duration-200"
        >
          <div className="flex-shrink-0">
            <MagnifyingGlassPlusIcon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Explore</h3>
            <p className="text-sm opacity-90">Research Grants</p>
          </div>
        </Link>

        {/* AI Suggestions */}
        <div className="card flex items-center space-x-4 p-6">
           <div className="flex-shrink-0">
            <SparklesIcon className="h-8 w-8 text-primary-600" />
           </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
            <p className="text-sm text-gray-600">AI suggests grants that match your profile</p>
          </div>
        </div>

        {/* Suggested Professors */}
         <div className="card flex items-center space-x-4 p-6">
           <div className="flex-shrink-0">
            <AcademicCapIcon className="h-8 w-8 text-primary-600" />
           </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Suggested Professors</h3>
            <p className="text-sm text-gray-600">New mentors in...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 