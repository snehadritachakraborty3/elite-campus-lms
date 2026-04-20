package com.lms.controller;

import com.lms.model.Course;
import com.lms.model.Enrollment;
import com.lms.model.User;
import com.lms.repository.CourseRepository;
import com.lms.repository.EnrollmentRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonProgressRepository lessonProgressRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<?> enrollInCourse(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        Course course = courseRepository.findById(id).orElseThrow();

        if (enrollmentRepository.existsByUserAndCourseId(user, id)) {
            return ResponseEntity.badRequest().body("Already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollmentRepository.save(enrollment);

        return ResponseEntity.ok("Enrolled successfully");
    }

    @GetMapping("/my-courses")
    public List<Course> getMyCourses() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        return enrollmentRepository.findByUser(user).stream()
                .map(Enrollment::getCourse)
                .collect(Collectors.toList());
    }

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private QuizRepository quizRepository;

    @GetMapping("/{id}/units")
    public List<Unit> getCourseUnits(@PathVariable Long id) {
        return unitRepository.findByCourseIdOrderByOrderIndexAsc(id);
    }

    @GetMapping("/units/{unitId}/lessons")
    public List<Lesson> getUnitLessons(@PathVariable Long unitId) {
        return lessonRepository.findByUnitIdOrderByOrderIndexAsc(unitId);
    }

    @PostMapping("/lessons/{lessonId}/complete")
    public ResponseEntity<?> completeLesson(@PathVariable Long lessonId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow();

        if (lessonProgressRepository.findByUserAndLessonId(user, lessonId).isEmpty()) {
            LessonProgress progress = new LessonProgress();
            progress.setUser(user);
            progress.setLesson(lesson);
            progress.setCompleted(true);
            lessonProgressRepository.save(progress);
        }

        return ResponseEntity.ok("Lesson marked as complete");
    }

    @GetMapping("/{id}/progress")
    public ResponseEntity<Double> getCourseProgress(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        
        List<Unit> units = unitRepository.findByCourseIdOrderByOrderIndexAsc(id);
        int totalLessons = 0;
        for (Unit unit : units) {
            totalLessons += lessonRepository.findByUnitIdOrderByOrderIndexAsc(unit.getId()).size();
        }
        
        if (totalLessons == 0) return ResponseEntity.ok(0.0);

        List<LessonProgress> completed = lessonProgressRepository.findByUserAndLessonCourseId(user, id);
        double percentage = (double) completed.size() / totalLessons * 100;
        
        return ResponseEntity.ok(percentage);
    }
}
