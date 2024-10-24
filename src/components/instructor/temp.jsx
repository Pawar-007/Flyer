if (testGiven) {
   return (
     <div className="score-page">
       <h1 className="score-heading">Your Score: {scoreData?.Score}</h1>
 
       <div className="score-container">
         {/* Correct Answers Section */}
         {scoreData?.correctSelected?.length > 0 && (
           <div className="correct-answers">
             <h2 className="section-title">Correct Answers</h2>
             {scoreData.correctSelected.map((item, index) => (
               <div key={index} className="answer-card correct">
                 <p className="question-text"><strong>Question:</strong> {item.question}</p>
                 <p className="answer-text"><strong>Correct Answer:</strong> {item.correctAnswer}</p>
               </div>
             ))}
           </div>
         )}
 
         {/* Wrong Answers Section */}
         {scoreData?.wrongSelected?.length > 0 && (
           <div className="wrong-answers">
             <h2 className="section-title">Wrong Answers</h2>
             {scoreData.wrongSelected.map((item, index) => (
               <div key={index} className="answer-card wrong">
                 <p className="question-text"><strong>Question:</strong> {item.question}</p>
                 <p className="answer-text"><strong>Your Answer:</strong> {item.selecteAnswer}</p>
                 <p className="answer-text"><strong>Correct Answer:</strong> {item.correctAnswer}</p>
               </div>
             ))}
           </div>
         )}
       </div>
     </div>
   );
 }
 const [testGiven,setTestGiven]=useState(false);
  const [scoreData,setScoreData]=useState();
  useEffect(() => {
   const fetchData = async () => {
     const data = locate.state?.item;
     if (data?.isGiven) {
       try {
         const id=data._id;
         const courseid=locate.state?.courseId;
         const selectOption={};
         const resp = await submitTest(selectOption, id, courseid);
         const responseData = await resp.json();
         console.log("res", responseData.data);
         
       } catch (error) {
         console.log(error);
       }
       return; // Exit the function if the test is already given
     }
 
     if (data && data.questions && data.questions.length > 0) {
       console.log(data._id);
       setId(data._id);
       setQuizname(data.quizName);
       setquestions(data.questions);
       setQuestion(data.questions[0]?.question);
       setOptions(data.questions[0].options);
     }
   };
 
   fetchData();
 }, [locate, selectOption, id, courseid]);
 