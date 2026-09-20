import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Star, Clock, Layers, Award, PlayCircle, BookOpen, CheckCircle } from 'lucide-react';
import { Course } from '../types';

interface LearnViewProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  courses,
  onSelectCourse,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Robotics',
    'Arduino',
    'IoT',
    'Artificial Intelligence',
    'Machine Learning',
    'Programming',
    'Electronics',
    'STEM',
    'Embedded Systems',
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
          Curriculum & Masterclasses
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
          Robotics & AI Learning Hub
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          Structured, hardware-grounded programs designed to take students from breadboard circuits to intelligent autonomous robotics.
        </p>
      </div>

      {/* Search and Category Filter Strip */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="flex items-center rounded-2xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 focus-within:border-cyan-400">
          <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Arduino, ESP32, Computer Vision, STEM..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Scrollable Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono-code">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-800/60 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
          >
            {/* Thumbnail */}
            <div
              onClick={() => onSelectCourse(course)}
              className="relative h-48 w-full bg-slate-950 cursor-pointer overflow-hidden"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 text-[10px] font-mono-code font-bold text-cyan-400 border border-slate-700/80 backdrop-blur-sm">
                {course.category}
              </div>

              <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-slate-950/80 text-[10px] font-mono-code text-amber-400 border border-slate-700/80 backdrop-blur-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{course.rating}</span>
              </div>

              {/* Progress bar if ongoing */}
              {course.progress !== undefined && course.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono-code mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {course.level}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {course.duration}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectCourse(course)}
                  className="font-display font-bold text-base text-white hover:text-cyan-400 cursor-pointer transition-colors line-clamp-2"
                >
                  {course.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Badges: Lessons, Projects, Certificate */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-800/80 text-[11px] font-mono-code text-slate-300">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-cyan-400" />
                    {course.curriculum?.length || course.lessonsCount || 3} Modules
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-amber-400" />
                    {course.projects.length} Projects
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Award className="w-3 h-3" />
                    Certificate
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-3 flex items-center justify-between">
                <div className="text-xs text-slate-400 font-mono-code">
                  By {course.instructor}
                </div>
                <button
                  onClick={() => onSelectCourse(course)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{course.progress ? 'Resume' : 'View Course'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h4 className="text-base font-bold text-white">No matching courses found</h4>
          <p className="text-xs text-slate-400 mt-1">Try searching with different keywords or switch categories.</p>
        </div>
      )}
    </div>
  );
};
