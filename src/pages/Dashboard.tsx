import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, SearchIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import LinkCard from '../components/LinkCard';
import AddLinkModal from '../components/AddLinkModal';
import TagFilter from '../components/TagFilter';
import { Link as LinkType } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';

const Dashboard: React.FC = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<LinkType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    // Extract all unique tags from links
    if (links.length > 0) {
      const tags = links.flatMap(link => link.tags);
      setAllTags([...new Set(tags)]);
    }
  }, [links]);

  useEffect(() => {
    // Filter links based on search query and selected tags
    let filtered = links;
    
    if (searchQuery) {
      filtered = filtered.filter(link => 
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(link => 
        selectedTags.every(tag => link.tags.includes(tag))
      );
    }
    
    setFilteredLinks(filtered);
  }, [links, searchQuery, selectedTags]);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api}/links`, { withCredentials: true });
      setLinks(response.data);
      setFilteredLinks(response.data);
    } catch (error) {
      toast.error('Failed to fetch links');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLink = (newLink: LinkType) => {
    setLinks(prevLinks => [newLink, ...prevLinks]);
    toast.success('Link added successfully!');
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await axios.delete(`${api}/links/${id}`, { withCredentials: true });
      setLinks(prevLinks => prevLinks.filter(link => link._id !== id));
      toast.success('Link deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Links</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Link</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search links or tags..."
              className="pl-10 w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            />
          </div>
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>

        {selectedTags.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filtered by:</span>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full flex items-center"
                >
                  {tag}
                  <button 
                    onClick={() => handleTagSelect(tag)}
                    className="ml-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <button 
                onClick={clearFilters}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : filteredLinks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map(link => (
            <LinkCard
              key={link._id}
              link={link}
              onDelete={handleDeleteLink}
            />
          ))}
        </div>
      ) : links.length > 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">No links match your search.</p>
          <button 
            onClick={clearFilters}
            className="mt-2 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't saved any links yet.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Add your first link
          </button>
        </div>
      )}

      <AddLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLink={handleAddLink}
      />
    </div>
  );
};

export default Dashboard;