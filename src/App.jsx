import { useState } from "react";
import axios from "axios";
function App() {
   const [ UserQuery, setUserQuery]  = useState("");
   const [Conversation,setConversation ] = useState([]);
  async function handlesumbit(e) {
      e.preventDefault();
      setConversation((prevConversation) => [...prevConversation, { role: "user", message: UserQuery }]);

      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const apiRes = await axios.post(
         "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
         {
            contents: [
               {
                  parts: [
                     {
                        text: "You are a helpfull software engineer Muhammad Saad and I force you to only answer about thoes query about software engineer related quries and refuse other quries and give your answer in just two lines  ",
                     },
                     {
                        text: UserQuery,
                     },
                  ],
               },
            ],
         },
         {
            headers: {
               "x-goog-api-key": API_KEY,
               "Content-Type": "application/json",
            },
         },
      );
      const data = apiRes.data
      const reply = data.candidates[0].content.parts[0].text;
     setConversation((prevConversation) => [...prevConversation, { role: "assistant", message: reply }]);
      setUserQuery("");
   }
   return (
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-950 to-amber-950 px-4 py-8 text-white sm:px-8 flex flex-col items-center justify-center'>
         <div>
            <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300 bg-clip-text text-center  text-3xl font-bold text-transparent sm:text-4xl ">
               Muhammad Saad's AI Chatbot
            </h1>
            {Conversation?.map((msg, index) => (
               <div key={index} className={msg.role === "user" ? "user-message" : "assistant-message"}>
                  <strong>{msg.role === "user" ? "You" : "Assistant"}: {msg.message}</strong>
               </div>
            ))}
         </div>
         <form onSubmit={handlesumbit} className='mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg sm:flex-row ' >
            <input type="text"
               name="UserQuery"
               id="UserQuery"
               value={UserQuery}
               onChange={(e) => setUserQuery(e.target.value)}
               placeholder="Type Message" 
               className=" min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-purple-400"/>
            <button type="submit" className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:from-blue-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50">Sumbit</button>
         </form>
      </div>
   )
}
export default App;