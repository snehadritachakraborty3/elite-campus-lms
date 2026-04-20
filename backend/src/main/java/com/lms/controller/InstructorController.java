package com.lms.controller;

import com.lms.model.Course;
import com.lms.model.Lesson;
import com.lms.model.User;
import com.lms.repository.CourseRepository;
import com.lms.repository.LessonRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructor")
@CrossOrigin
public class InstructorController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/courses")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        course.setInstructorName(username); // simplified
        return ResponseEntity.ok(courseRepository.save(course));
    }

    @PostMapping("/courses/{courseId}/lessons")
    public ResponseEntity<Lesson> addLesson(@PathVariable Long courseId, @RequestBody Lesson lesson) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        lesson.setCourse(course);
        return ResponseEntity.ok(lessonRepository.save(lesson));
    }

    @GetMapping("/courses")
    public List<Course> getMyCreatedCourses() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        // Simplified: using instructorName as a string check. In production, use User object.
        return courseRepository.findAll().stream()
                .filter(c -> c.getInstructorName().equals(username))
                .toList();
    }
}
