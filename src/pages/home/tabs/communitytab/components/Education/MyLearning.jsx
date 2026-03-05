import React from 'react';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Award,
  Briefcase,
  Users,
  Building,
  Monitor,
  Globe,
  GraduationCap,
  Settings,
  ShoppingBag,
  BookOpen
} from 'lucide-react';
import './Education.css';

const iconMap = {
  Award: Award,
  Briefcase: Briefcase,
  Users: Users,
  Building: Building,
  Monitor: Monitor,
  Globe: Globe,
  GraduationCap: GraduationCap,
  Settings: Settings,
  ShoppingBag: ShoppingBag,
  BookOpen: BookOpen
};

export const MyLearning = ({
  enrolledCourses,
  courseProgress,
  courseLessons,
  lessonProgress,
  currentLesson,
  educationalPlatforms,
  onStartLesson,
  onCompleteLesson,
  onTakeQuiz
}) => {
  const enrolledPlatforms = educationalPlatforms.filter(p => enrolledCourses.includes(p.id));

  return (
    <div className="my-learning">
      <h5>My Learning</h5>
      <div className="enrolled-courses">
        {enrolledPlatforms.map(platform => {
          const Icon = iconMap[platform.icon] || Award;
          const progress = courseProgress[platform.id] || 0;
          const lessons = courseLessons[platform.id] || [];

          return (
            <div key={platform.id} className="enrolled-course">
              <div className="course-header">
                <Icon size={20} />
                <h6>{platform.name}</h6>
                <span className="progress">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div style={{ width: `${progress}%` }}></div>
              </div>

              {lessons.length > 0 && (
                <div className="course-lessons">
                  {lessons.map(lesson => {
                    const isCompleted = lessonProgress[`${platform.id}-${lesson.id}`] === 'completed';
                    const isCurrent = currentLesson?.platformId === platform.id && 
                                     currentLesson?.lesson.id === lesson.id;

                    return (
                      <div key={lesson.id} className={`lesson-item ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}>
                        <span className="lesson-title">
                          {lesson.video && <Play size={12} />}
                          {lesson.title}
                        </span>
                        <span className="lesson-duration">
                          <Clock size={10} />
                          {lesson.duration}
                        </span>
                        {isCompleted ? (
                          <CheckCircle size={16} className="completed" />
                        ) : (
                          <button onClick={() => onStartLesson(platform.id, lesson)}>
                            Start
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {courseLessons[platform.id] && (
                <button className="take-quiz-btn" onClick={() => onTakeQuiz(platform.id)}>
                  Take Quiz
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};