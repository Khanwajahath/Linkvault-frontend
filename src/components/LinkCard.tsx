import React, { useState } from 'react';
import { ExternalLinkIcon, TrashIcon } from 'lucide-react';
import { Link as LinkType } from '../types';

interface LinkCardProps {
  link: LinkType;
  onDelete: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleVisit = () => {
    // Ensure the URL has http or https prefix
    let url = link.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  
  const handleDelete = () => {
    onDelete(link._id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{link.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={handleVisit}
              className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              title="Visit Link"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </button>
            <button
              onClick={confirmDelete}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              title="Delete Link"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {link.description || 'No description provided'}
        </p>
        
        <div className="mb-2">
          <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
            {link.url}
          </p>
        </div>
        
        {link.tags && link.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {link.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 flex flex-col items-center justify-center p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-4 text-center">
            Are you sure you want to delete this link?
          </p>
          <div className="flex gap-3">
            <button
              onClick={cancelDelete}
              className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkCard;