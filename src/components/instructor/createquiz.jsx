import React, { useEffect } from 'react'
import { useState } from 'react'
import '../../style/createquiz.css';
import { addTest } from '../../services/couces.services.js';
const QuestionFormat=({questionIndex,questions,onQuestionChange,onOptionChange,onAnswerChange})=>{
  return(
   <>
   <div className="questions">
    <div className='question_name'>
      <h4 className="question_number">{questionIndex+1}</h4>
      <input type="text"
       value={questions.question}
       placeholder='Add question here'
       onChange={e=> onQuestionChange(questionIndex,e.target.value)}
      />
      </div>
      <div className="options">
         {
          questions.options.map((opData,index)=>(
            <input
            key={index}
            placeholder={`option ${index+1}`}
            value={opData}
            onChange={e=> onOptionChange(questionIndex,index,e.target.value)}
            />
          ))
         }
      </div>
      <div className="answer">
          <h4>correct answer</h4>
           <input type="text"
           value={questions.answer}
            placeholder='Add correct option here'
            onChange={e=>onAnswerChange(e.target.value,questionIndex)}/>
      </div>
      </div>
   </>
  )
}

function CreateQuiz(props) {
  const courseId=props.id;
  const [quizData,setQuizData]=useState(()=>{
    const localdata=localStorage.getItem("quizData");
    return localdata ? JSON.parse(localdata) : {
      quizName:"",
      course:{
        name:"",
        details:""
      },
      questions:[]
    }
  })
  const handleCancle=()=>{
  const conditon=prompt("you want to cancle  this test");
  console.log("prompt",conditon)
  if(conditon=='yes'){
    localStorage.removeItem("quizData");
     props.setAddTest(false);
  }
  }
useEffect(()=>{
  localStorage.setItem("quizData",JSON.stringify(quizData))
},[quizData])

const addQuestion=()=>{
  setQuizData(preData => ({
    ...preData,
    questions:[
      ...(preData.questions || []),
      {
        question:"",
        options:["","","",""],
        answer:"" 
      }
    ]
  }))
}
async function submitQuiz(courseid,quizData){
  try {
    const quizAdding=await addTest(courseid,quizData);
    console.log("qioooo",quizAdding);
    if (quizAdding.ok) {
      const data = await quizAdding.json(); // Parse the JSON from the response
      console.log("Response data:", data);
    } else {
      console.error("Error:", quizAdding.statusText); 
    }

    if(quizAdding.ok){
      clearLocalStorage();
    } 
  } catch (error) {
    console.log(error);
  }
}
const clearLocalStorage=()=>{
  localStorage.getItem("quizData");
  setQuizData({
    quizName:"",
    course:{
      name:"",
      details:""
    },
    questions:[]
  })
}

const handleQuestionChange=(questionIndex,newQuestion)=>{
      const newQuestions=quizData.questions.slice();
      newQuestions[questionIndex].question=newQuestion;
      setQuizData({...quizData,questions:newQuestions})
};

const handleAnswerChange=(answer,index)=>{
  const correctAnswer=quizData.questions.slice();
  correctAnswer[index].answer=answer;
  setQuizData({...quizData,questions:correctAnswer})
}
const handleOptionChange=(questionIndex,index,opVlaue)=>{
      const questions=quizData.questions.slice();
      const optionsChange=questions[questionIndex].options.slice();
      optionsChange[index]=opVlaue;
      questions[questionIndex] = {
        ...questions[questionIndex],
        options: optionsChange
      };
      setQuizData(predata=>({
        ...predata,
        questions:questions
      }))
}
const handleNameChange=(event)=>{
  let value=event.target.value;
  let stored=localStorage.getItem("quizData")
  let nameStore=stored ?JSON.parse(stored).quizName :null;

    setQuizData(prevData => ({
      ...prevData,
      quizName:value
    }))

    const updateData={
      ...JSON.parse(stored || '{}'),
      quizName:value
    }

    localStorage.setItem("quizData",JSON.stringify(updateData))
}

const handleCourseNameChange=(event)=>{
  let name=event.target.value
  setQuizData(prevdata => ({
    ...prevdata,
    course:{
      ...prevdata.course,
     
    }
    
  }))
  console.log(quizData)
}
const handleDetailChange=(event)=>{
   let detail=event.target.value
   setQuizData(prevdata=>({
    ...prevdata,
    course:{
      ...prevdata.course,
      details:detail
    }
   }))
}

  return (
    <div className='Quiz' style={{ position: 'relative' }}>
      <div className="cancle">
        <button onClick={()=>handleCancle()}>X</button>
      </div>
      <div className="quiz_name">
        <h1>Enter quiz name</h1>
        <input type="text" id="name_input"
        onChange={handleNameChange}
         />   
      </div>
      <div className='corse_detail' >
        <h1>Enter corse name and detail</h1>
        <input type="text" placeholder='name' onChange={handleCourseNameChange}/>
        <input type="text" placeholder='quiz description' onChange={handleDetailChange}/>
      </div>
      <div className='Add_question'>
        {
          quizData.questions?.map((item,index)=>{
            return(
             <QuestionFormat
            key={index}
            questionIndex={index}
            questions={item}
            onQuestionChange={handleQuestionChange}
            onOptionChange={handleOptionChange}
            onAnswerChange={handleAnswerChange}
            />
            )
          })
        }
      </div>
      <div className="container" style={{display:'flex'}}>
      <button onClick={addQuestion}> add question </button>
      <button onClick={clearLocalStorage}>Clear all question </button>
      <button onClick={()=>{submitQuiz(courseId,quizData)}}>submit test</button>
      </div>

    </div>
  )
}

export default CreateQuiz;
