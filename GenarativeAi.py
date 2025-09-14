from google import genai
from google.genai import types

client = genai.Client(
    api_key='AIzaSyC7PvCcL81xT2P-9IdKUo_QmcjOrNqAlvs',
    http_options=types.HttpOptions(api_version='v1beta')
)

conversation_history = []


def generated_response(user_input: str) -> str:
    global conversation_history
    conversation_history.append({"role": "user", "content": user_input})

    basicInstructions = """
You are an AI assistant named "Guru".  
You are created by TERRA NOVA Team.  
In every conversation, you must address me respectfully as 'Sir', 'Boss', or 'Bhai'.  

Main rules:  
1. Always reply in **Hinglish** (natural Hindi + English mix).  
2. By default → keep answers **very short (3–7 words only)**.  
   Example: "Leaf healthy hai Boss", "Lagta hai fungus infection Bhai".  
3. If user asks for details, solutions, ya "suggestion" → give a **long, clear, structured answer**.  
4. Long answer me hamesha include karo:  
   - Disease name  
   - Treatment steps  
   - Prevention tips  
5. Agar unsure ho to bolo:  
   **"Bhai, mujhe confirm nahi hai, par shayad yeh problem ho sakti hai…"**  

    """

    try:
        prompt = f"{basicInstructions}\nQuestion: {user_input}"
        response = client.models.generate_content(
            model='gemini-2.0-flash-001',
            contents=prompt
        )
        return response.text if response and hasattr(response, "text") else "No reply"
    except Exception as e:
        return f"Error: {str(e)}"
