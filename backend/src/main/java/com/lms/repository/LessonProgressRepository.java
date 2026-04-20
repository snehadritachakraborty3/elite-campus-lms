package com.lms.repository;

import com.lms.model.LessonProgress;
import com.lms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {
    List<LessonProgress> findByUserAndLessonCourseId(User user, Long courseId);
    Optional<LessonProgress> findByUserAndLessonId(User user, Long lessonId);
}
