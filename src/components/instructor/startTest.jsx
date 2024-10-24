import React, { useEffect, useState } from "react";
import "./QuizInterface.css"; // Import the CSS for styling
import { useLocation } from "react-router-dom";
import {getScore} from "./../../services/couces.services.js"
import {submitTest} from "../../services/couces.services.js"
import { useNavigate } from "react-router-dom";
const StartTest = () => {
  const [id,setId]=useState('');
  const [quizName, setQuizname] = useState('');
  const [questions, setquestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [no, setNo] = useState(0);
  const locate = useLocation(); 
  const [testGiven,setTestGiven]=useState(false);
  const [score,setScore]=useState();
  const [correctSelected,setCorrectSelected]=useState([]);
  const [wrongSelected,setWrongSelected]=useState([]);
  
  const [selectOption, setSelectOption] = useState(() => {
    // Initialize from localStorage or empty object
    const savedData = localStorage.getItem(`${locate.state?.item._id}`);
    return savedData ? JSON.parse(savedData) : {};
  });

  const courseid=locate.state?.courseId;
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = locate.state?.item;
      const isTestGiven=locate.state?.valid; 
      if(isTestGiven){
      const item=locate.state?.scoreItem;
      setTestGiven(isTestGiven);
      setScore(item?.Score);
      setCorrectSelected(item?.correctSelected);
      setWrongSelected(item?.wrongSelected);
      }
      if (data && data.questions && data.questions.length > 0) {
        setId(data._id);
        setQuizname(data.quizName);
        setquestions(data.questions);
        setQuestion(data.questions[0]?.question);
        setOptions(data.questions[0].options);
      }
    };
  
    fetchData();
  }, [locate]);
  

  useEffect(() => {
    // Update localStorage whenever selectOption changes
    localStorage.setItem(`${locate.state?.item._id}`, JSON.stringify(selectOption));
  }, [selectOption]);

 const handleSubmit = () => {
    // Check if the next question exists before incrementing
    if (no < questions.length - 1) {
      setNo(no + 1);
      setQuestion(questions[no + 1]?.question);
      setOptions(questions[no + 1]?.options);
    } else {
      console.log("No more questions.");
    }
    console.log("Current question:", question);
  };
  
  function handleOptionSelect(questionId, value) {
    setSelectOption((prevData) => ({
      ...prevData,
      [questionId]: value
    }));
    console.log("Selected data:", questionId, value);
    console.log("Select options state:", selectOption);
  }

  function previousQuestion() {
    if (no > 0) {
      setNo(no - 1);
      setQuestion(questions[no - 1]?.question);
      setOptions(questions[no - 1]?.options);
    }
  }
  
  async function handleSubmitTest(selectOption,id,courseid){
    try {
      const resp=await submitTest(selectOption ,id,courseid);
      const data = await resp.json();
      if(resp.ok){
         localStorage.removeItem(`${locate.state?.item._id}`,);
         navigate(-1);
      }
      
    } catch (error) {
      console.error(error);
    }
    
  }

  if(testGiven){
    return(
      <div className="display-score">
  <h1>Score: {score}%</h1>
  {correctSelected?.length > 0 && (
    <div className="correctSelct">
      <h1>Correctly Selected Answers</h1>
      {correctSelected.map((item, index) => (
        <div key={index} className="answer-card">
          <p className="question-text">{item.question}</p>
          <p className="correct-answer">Your Answer: {item.selecteAnswer}</p>
        </div>
      ))}
    </div>
  )}

  {wrongSelected?.length > 0 && (
    <div className="wrongSelected">
    <h1>Incorrectly Selected Answers</h1>
    {wrongSelected.map((item, index) => (
      <div key={index} className="answer-card">
        <p className="question-text">
          <strong>Question {index + 1}:</strong> {item.question}
        </p>
        <div className="answer-details">
          <p className="your-answer">
            <span className="label">Your Answer:</span> {item.selecteAnswer}
          </p>
          <p className="correct-answer">
            <span className="label">Correct Answer:</span> {item.correctAnswer}
          </p>
        </div>
      </div>
    ))}
  </div>
  
  )}
</div>

    )
  }
  return (
    <div className="quiz-container">
      <h2 className="quiz-title">{quizName}</h2>
      <div id="carouselExampleFade" className="quiz-slider">
        <div className="quiz-name">
          {quizName}
        </div>
        <div className="container-portion">
          <div className="question">
            {(no+1) + ')  '  + question}
          </div>
          <div className="option">
            {
              options.map((item, index) => (
                <div key={index}>
                 <input
                    type="radio"
                    className="click-button"
                    name={`${question}`}
                    id={`option-${index}`}
                    value={item}
                    checked={selectOption[questions[no]?._id] === item} // Check if this option is selected
                    onChange={(e) => handleOptionSelect(questions[no]?._id, e.target.value)}
                  />
                  <label htmlFor={`option-${index}`}>{item}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div className="button-save">
          <button onClick={previousQuestion}>Previous</button>
          <button onClick={handleSubmit}>Save and Next</button>
        </div>
      </div>
      <div className="quiz-buttons">
        <button
          className="submit-button"
          onClick={() => handleSubmitTest(selectOption,id,courseid)}
        >
          Submit answer
        </button>
      </div>
    </div>
  );
};

export default StartTest;
