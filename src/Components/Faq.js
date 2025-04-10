import React, { useState } from 'react';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const Faqs = [
    {
      id: 1,
      question: 'Is it possible to pay for more than one plan?',
      answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus error numquam, enim laudantium excepturi nesciunt nostrum laboriosam labore aliquid ab similique, cumque.',
    },
    {
      id: 2,
      question: 'What is the difference between the silver,gold and diamond plan?',
      answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus error numquam, enim laudantium excepturi nesciunt nostrum laboriosam labore aliquid ab similique, cumque.',
    },
    {
      id: 3,
      question: 'Can i cancel my subscription?',
      answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus error numquam, enim laudantium excepturi nesciunt nostrum laboriosam labore aliquid ab similique, cumque.',
    },
    {
      id: 4,
      question: 'How often do you update the plan?',
      answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus error numquam, enim laudantium excepturi nesciunt nostrum laboriosam labore aliquid ab similique, cumque.',
    },
    {
      id: 5,
      question: 'What is your refund policy?',
      answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus error numquam, enim laudantium excepturi nesciunt nostrum laboriosam labore aliquid ab similique, cumque.',
    }
    
  ];
const Faq = () => {

    const [open, setOpen] = useState(Array(Faqs.length).fill(false));

    const toggleAnswer = (index) => {
      setOpen(open.map((item, i) => (i === index ? !item : item)));
    };


  return (
    <div className='faqs' id='faq'>
      <h1>Frequently Asked Questions</h1>
      <div className='w-r'>
        {Faqs.map((item, index) => (
          <div className="ques" key={item.id}>
            
            <div>
              <h4>{item.question}</h4>
              {open[index] && <p>{item.answer}</p>}
            </div>

            <div onClick={() => toggleAnswer(index)}>
              {open[index] ? (
                <IoIosArrowDropup className='arr-icon' />
              ) : (
                <IoIosArrowDropdown className='arr-icon' />
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq