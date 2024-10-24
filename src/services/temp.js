import { json } from "react-router-dom"

// const arr=[
//    {
//      question: 'What is React?',
//      options: ['Library', 'Framework', 'Language', 'Tool'],
//      answer: 'Library',
//    },
//    {
//      question: 'What is JSX?',
//      options: ['JavaScript', 'XML', 'Both', 'None'],
//      answer: 'Both',
//    },
//    {
//    }
//  ]

// function array(arr){
//   arr.map((question,index)=>{
//     console.log({
//       "question":question.question,
//       "index":index
//     })
//   })
// }
// function array2(){
//   const t=arr.slice()
//   t[2]=({
//     question: 'What is JSX?',
//     options: [ 'JavaScript', 'XML', 'Both', 'None' ],
//     answer: 'Both'
//   })
//   console.log(t)
// }
// array2(arr);
try {
  const response = await fetch("http://localhost:8000/api/v1/presentCourses");
  const {statuscode,data}=await response.json();
  console.log(data[0].description)
 
} catch (error) {
  console.error("Error fetching courses:", error);
}
