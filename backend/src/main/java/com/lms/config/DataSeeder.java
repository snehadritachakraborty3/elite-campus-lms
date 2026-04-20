package com.lms.config;

import com.lms.model.*;
import com.lms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import jakarta.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired private CourseRepository courseRepository;
    @Autowired private UnitRepository unitRepository;
    @Autowired private LessonRepository lessonRepository;
    @Autowired private QuizRepository quizRepository;
    @Autowired private QuestionRepository questionRepository;
    @Autowired private EnrollmentRepository enrollmentRepository;
    @Autowired private LessonProgressRepository lessonProgressRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        lessonProgressRepository.deleteAll();
        enrollmentRepository.deleteAll();
        questionRepository.deleteAll();
        quizRepository.deleteAll();
        lessonRepository.deleteAll();
        unitRepository.deleteAll();
        courseRepository.deleteAll();

        seedDemoCourse("COMPUTER SCIENCE", "Full Stack Systems", "Dr. Alan Turing", 
            "Software engineering focusing on distributed systems.",
            Arrays.asList("Front-End Architecture", "Server-Side Logic", "Deployment & Scale"));

        seedDemoCourse("MECHANICAL ENGINEERING", "Thermodynamics & Design", "Dr. James Watt",
            "Advanced study of thermal energy and machine dynamics.",
            Arrays.asList("Thermal Systems", "Machine Design", "Fluid Mechanics"));

        seedDemoCourse("CIVIL ENGINEERING", "Structural Mechanics", "Dr. Gustave Eiffel",
            "Mastering the physics of large-scale infrastructure.",
            Arrays.asList("Statics & Dynamics", "Material Science", "Hydrology"));

        System.out.println("LMS V5.2 DEPLOYED: High-Fidelity Chapters Live.");
    }

    private void seedDemoCourse(String category, String title, String instructor, String desc, List<String> unitTitles) {
        Course course = new Course(null, title, desc, instructor, "12 Weeks", category, List.of("#"), null);
        course = courseRepository.save(course);

        for (int i = 0; i < unitTitles.size(); i++) {
            Unit unit = new Unit(null, unitTitles.get(i), i + 1, course, null, null);
            unit = unitRepository.save(unit);

            for (int j = 1; j <= 5; j++) {
                String subTopic = getTopicData(category, i + 1, j);
                Lesson lesson = new Lesson(null, "Chapter " + (i+1) + "." + j + ": " + subTopic.split(":")[0],
                    subTopic, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", j, unit);
                lessonRepository.save(lesson);
            }
        }
    }

    private String getTopicData(String cat, int unit, int chapter) {
        if (cat.equals("COMPUTER SCIENCE")) {
            if (unit == 1) return "Component Design: Learn how to build modular UI components using Atomic Design principles. Focus on props, state isolation, and lifecycle hooks for maximum reusability.";
            if (unit == 2) return "API Architecture: Mastering RESTful principles, JSON serialization, and Spring Boot Controller design for secure data exchange.";
            return "Global Scaling: Strategies for CDN integration, Load Balancing, and Kubernetes containerization in high-traffic environments.";
        }
        if (cat.equals("MECHANICAL ENGINEERING")) {
             if (unit == 1) return "Heat Transfer: Analysis of conduction, convection, and radiation in industrial thermal systems. Learning the Fourier's Law applications.";
             if (unit == 2) return "Mechanism Synthesis: Designing linkages and gear trains for precise motion control in robotics.";
             return "Laminar Flow: Study of fluid dynamics at low Reynolds numbers and the Navier-Stokes equations.";
        }
        return "Stress Analysis: Calculating the internal forces and deformations in reinforced concrete beams under varying loads.";
    }
}
