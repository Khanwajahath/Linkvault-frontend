import React from 'react';
import { TagIcon } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTags, onTagSelect }) => {
  if (!tags.length) return null;
  
  return (
    <div className="relative">
      <div className="relative">
        <button 
          type="button"
          className="flex items-center gap-2 w-full md:w-auto px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          data-dropdown-toggle="tag-filter-dropdown"
        >
          <TagIcon className="h-5 w-5 text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Filter by tag</span>
          {selectedTags.length > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold text-white bg-indigo-600 rounded-full">
              {selectedTags.length}
            </span>
          )}
          <svg 
            className="w-4 h-4 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
      
      <div 
        id="tag-filter-dropdown"
        className="absolute right-0 z-10 w-56 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="py-2 max-h-60 overflow-y-auto">
          {tags.map(tag => (
            <div 
              key={tag}
              className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              onClick={() => onTagSelect(tag)}
            >
              <span className="text-gray-700 dark:text-gray-300">{tag}</span>
              {selectedTags.includes(tag) && (
                <svg 
                  className="w-4 h-4 text-indigo-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagFilter;