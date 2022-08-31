import React, { useState, useContext, useEffect } from 'react';

import AContainer from './AContainer.jsx';
import AnswerContainer from './AnswerContainer.jsx';
import AddAQuestion from './AddAQuestion.jsx';
import AInfo from './AInfo.jsx';
import AnswerReponses from './AnswerResponses.jsx';
import LoadMoreAnswers from './LoadMoreAnswers.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import QContainer from './QContainer.jsx';
import ResponsePhotos from './ResponsePhotos.jsx';
import SearchBox from './SearchBox.jsx';
import Title from './Title.jsx';

import styles from '../../styles/QA/qa.css';

import { FcCollapse } from 'react-icons/fc';

import { QuestionsContext } from '../../contexts/question.context.jsx';

const QuestionAnswers = () => {
  const { productID, results } = useContext(QuestionsContext);
  const [questionCount, setQuestionCount] = useState(4);
  const [countLimit, setCountLimit] = useState({});
  const [answerCount, setAnswerCount] = useState({});
  const [answerLimit, setAnswerLimit] = useState({});

  useEffect(() => {
    if (results.length > 0) {
      const temp = {};
      const tempTwo = {};
      results.forEach(({ question_id, answers }) => {
        temp[question_id] = 2;
        tempTwo[question_id] = Object.keys(answers).length;
      })
      setAnswerCount(temp);
      setAnswerLimit(tempTwo);
    }
  }, [results])

  return (
    <div className='QA-Container'>
      <Title />
      <SearchBox />
      {
        results ?
          results.map((data, index) => {
            if (index < questionCount) {
              return (<div key={data.question_id}>
                <QContainer
                  key={`question-${data.question_id}`}
                  id={data.question_id}
                  question_body={data.question_body}
                  question_helpfulness={data.question_helpfulness}
                  answerCount={answerCount}
                  setAnswerCount={setAnswerCount}
                />
                {
                  Object.values(data.answers).map((val, index) => {
                    if (index < answerCount[data.question_id]) {
                      return <AnswerContainer key={index} data={val} />
                    }
                  })
                }
                {
                  answerCount[data.question_id] <= answerLimit[data.question_id] ?
                    <LoadMoreAnswers
                      question_id={data.question_id}
                      answerCount={answerCount}
                      setAnswerCount={setAnswerCount}
                    />
                    : <></>
                }

              </div>)
            }
          })
          :
          <></>
      }
      <MoreAnsweredQuestions
        questionCount={questionCount}
        setQuestionCount={setQuestionCount}
        product_id={productID}
      />
    </div>
  )
}

export default QuestionAnswers;