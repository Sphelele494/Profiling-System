import React from 'react';
import { GraduationCap, Search, Filter } from 'lucide-react';
import { LearningPaths } from './LearningPaths';
import { MyLearning } from './MyLearning';
import { AvailablePlatforms } from './AvailablePlatforms';
import { Certificates } from './Certificates';
import { CourseModal } from './CourseModal';
import { QuizModal } from './QuizModal';
import './Education.css';

export const EducationSection = ({
  educationSearchTerm,
  onSearchChange,
  educationCategory,
  onCategoryChange,
  enrolledCourses,
  courseProgress,
  bookmarkedCourses,
  certificateEarned,
  learningPath,
  showLearningPath,
  currentLesson,
  lessonProgress,
  showQuiz,
  quizAnswers,
  quizScore,
  selectedCourse,
  showCourseModal,
  educationalPlatforms,
  educationCategories,
  courseLessons,
  courseQuizzes,
  learningPaths,
  onEnroll,
  onBookmark,
  onStartLesson,
  onCompleteLesson,
  onTakeQuiz,
  onQuizAnswer,
  onSubmitQuiz,
  onFollowPath,
  onCloseCourseModal,
  onCloseQuiz
}) => {
  return (
    <div className="education-section">
      <div className="section-header">
        <h4>
          <GraduationCap size={20} />
          Education & Skills Development
        </h4>
        <div className="education-controls">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search courses, providers..."
              value={educationSearchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <select
            value={educationCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="category-select"
          >
            {educationCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Learning Paths */}
      {learningPaths.length > 0 && (
        <LearningPaths
          learningPaths={learningPaths}
          onFollowPath={onFollowPath}
        />
      )}

      {/* My Learning */}
      {enrolledCourses.length > 0 && (
        <MyLearning
          enrolledCourses={enrolledCourses}
          courseProgress={courseProgress}
          courseLessons={courseLessons}
          lessonProgress={lessonProgress}
          currentLesson={currentLesson}
          educationalPlatforms={educationalPlatforms}
          onStartLesson={onStartLesson}
          onCompleteLesson={onCompleteLesson}
          onTakeQuiz={onTakeQuiz}
        />
      )}

      {/* Available Platforms */}
      <AvailablePlatforms
        platforms={educationalPlatforms}
        searchTerm={educationSearchTerm}
        category={educationCategory}
        enrolledCourses={enrolledCourses}
        bookmarkedCourses={bookmarkedCourses}
        onEnroll={onEnroll}
        onBookmark={onBookmark}
      />

      {/* Certificates Earned */}
      {certificateEarned.length > 0 && (
        <Certificates
          certificates={certificateEarned}
          platforms={educationalPlatforms}
        />
      )}

      {/* Modals */}
      {showCourseModal && selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={onCloseCourseModal}
          onEnroll={onEnroll}
        />
      )}

      {showQuiz && selectedCourse && (
        <QuizModal
          courseId={selectedCourse}
          quiz={courseQuizzes[selectedCourse]}
          answers={quizAnswers}
          score={quizScore}
          onAnswer={onQuizAnswer}
          onSubmit={onSubmitQuiz}
          onClose={onCloseQuiz}
        />
      )}
    </div>
  );
};