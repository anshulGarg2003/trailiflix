import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import toast from "react-hot-toast";

const Feedback = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  // const [isDone, setIsDone] = useState("");
  const form = useRef();
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setMail("");
    setName("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name !== "" && mail !== "" && message !== "" && selectedEmoji!== "") {
      emailjs
        .sendForm(
          `${process.env.REACT_APP_EMAIL_SERVICE_ID}`,
          `${process.env.REACT_APP_EMAIL_TEMPLATE_ID}`,
          form.current,
          `${process.env.REACT_APP_EMAIL_PUBLIC_KEY}`
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success("Email sent Successfully!");
            handleReset(e);
          },
          (error) => {
            console.log(error.text);
            alert("Error Found " + error.text);
          }
        );
    } else {
      toast.error("Fill Up the details first");
    }
  };
  return (
    <>
      <form ref={form} className="flex flex-col items-center font-bold m-5 ">
        <div className=" text-white h-[50%] m-5">
          <div className="flex flex-col items-center text-3xl mt-5 mb-5">
            <h1 className="flex justify-center text-3xl mb-5">
              Any Suggestions...✏️
            </h1>
            <div className="flex text-5xl m-2 ">
              <p
                className={` cursor-pointer p-5 border m-2 rounded-md ${
                  selectedEmoji === "😍" ? "border-green-600" : ""
                } hover:scale-125 transition-transform duration-300`}
                onClick={() => handleEmojiClick("😍")}
              >
                😍
              </p>
              <p
                className={` cursor-pointer p-5 border m-2 rounded-md ${
                  selectedEmoji === "😊" ? "border-green-600" : ""
                } hover:scale-125 transition-transform duration-300`}
                onClick={() => handleEmojiClick("😊")}
              >
                😊
              </p>
              <p
                className={` cursor-pointer p-5 border m-2 rounded-md ${
                  selectedEmoji === "😐" ? "border-green-600" : ""
                } hover:scale-125 transition-transform duration-300`}
                onClick={() => handleEmojiClick("😐")}
              >
                😐
              </p>
              <p
                className={` cursor-pointer p-5 border m-2 rounded-md ${
                  selectedEmoji === "😞" ? "border-green-600" : ""
                } hover:scale-125 transition-transform duration-300`}
                onClick={() => handleEmojiClick("😞")}
              >
                😞
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center  text-black items-center w-full">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Name"
              name="to_name"
              className="text-xl w-full m-2 text-center p-2 rounded-md"
            />
            <input
              onChange={(e) => setMail(e.target.value)}
              type="text"
              value={mail}
              placeholder="Enter Your Email"
              name="mail"
              className="text-xl w-full m-5 text-center p-2 rounded-md "
            />
            <input type="hidden" name="emoji" value={selectedEmoji} />
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message..."
              value={message}
              name="message"
              className="w-full text-xl m-2 p-2 rounded-md text-center mb-3"
              row
              cursor-pointer
              s={8}
            ></textarea>
            <div>
              <button
                onClick={handleSubmit}
                className="bg-red-600 rounded-md p-3 m-3"
              >
                Submit
              </button>
              <button
                onClick={handleReset}
                className="bg-red-600 rounded-md p-3 m-3"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Feedback;
