'use client';

import { FaqCategory, faqData } from '@/shared/data/faq';
import { Minus, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = ['all', ...Object.keys(faqData)];

  const toggleQuestion = ({
    category,
    index,
  }: {
    category: string;
    index: number;
  }) => {
    const key = `${category}-${index}`;
    const newExpanded = new Set(expandedItems);
    if (expandedItems.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered: FaqCategory = {};

    Object.entries(faqData).forEach(([category, questions]) => {
      if (selectedCategory === 'all' || selectedCategory === category) {
        const filteredQuestions = questions.filter(
          ({ question, answer, keywords }) =>
            question.toLowerCase().includes(query) ||
            answer.toLowerCase().includes(query) ||
            keywords.some((k) => k.toLowerCase().includes(query))
        );

        if (filteredQuestions.length > 0) {
          filtered[category] = filteredQuestions;
        }
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray bg-background text-foreground outline-none focus:border-indigo"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 border ${
              selectedCategory === category
                ? 'border-dark-blue bg-dark-blue text-background'
                : 'border-gray text-foreground hover:border-dark-blue'
            } transition-colors`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div className="space-y-8">
        {Object.entries(filteredFAQs).map(([category, questions]) => (
          <div key={category}>
            <h4 className="text-xl font-medium mb-4">{category}</h4>
            <div className="space-y-2">
              {questions.map((faq, index) => {
                const key = `${category}-${index}`;
                const isExpanded = expandedItems.has(key);

                return (
                  <div key={key} className="border border-gray">
                    <button
                      onClick={() => toggleQuestion({ category, index })}
                      className="w-full px-4 py-3 flex justify-between items-center hover:bg-light-gray hover:bg-opacity">
                      <span className="text-left">{faq.question}</span>
                      {isExpanded ? (
                        <Minus className="w-5 h-5 flex-shrink-0 text-indigo" />
                      ) : (
                        <Plus className="w-5 h-5 flex-shrink-0 text-indigo" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        isExpanded ? 'max-h-48' : 'max-h-0'
                      }`}>
                      <div className="p-4 bg-light-blue/20 border-t border-gray">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {Object.keys(filteredFAQs).length === 0 && (
        <div className="text-center py-8 text-gray">
          No FAQs found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default FAQ;
