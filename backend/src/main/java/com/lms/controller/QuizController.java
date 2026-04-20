package com.lms.controller;

import com.lms.model.Quiz;
import com.lms.model.Question;
import com.lms.repository.QuizRepository;
import com.lms.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/unit/{unitId}")
    public List<Quiz> getUnitQuizzes(@PathVariable Long unitId) {
        return quizRepository.findByUnitId(unitId);
    }

    @GetMapping("/{quizId}/questions")
    public List<Question> getQuizQuestions(@PathVariable Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    @GetMapping("/course/{courseId}/final")
    public List<Quiz> getFinalExam(@PathVariable Long courseId) {
        return quizRepository.findByCourseIdAndIsFinalExamTrue(courseId);
    }
}
