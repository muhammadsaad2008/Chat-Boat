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
                        text: "YOUR PARENT PROMPT",
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
      <div>
         <div>
            {Conversation?.map((msg, index) => (
               <div key={index} className={msg.role === "user" ? "user-message" : "assistant-message"}>
                  <strong>{msg.role === "user" ? "You" : "Assistant"}: {msg.message}</strong>
               </div>
            ))}
         </div>
         <form onSubmit={handlesumbit}>
            <input type="text"
               name="UserQuery"
               id="UserQuery"
               value={UserQuery}
               onChange={(e) => setUserQuery(e.target.value)}
               placeholder="Type Message" />
            <button type="submit">Sumbit</button>
         </form>
      </div>
   )
}
export default App;