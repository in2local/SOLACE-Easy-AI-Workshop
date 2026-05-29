import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Lazy initialized Gemini client to prevent crashes if the key is missing on startup
  let aiClient: GoogleGenAI | null = null;

  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
      }
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is healthy" });
  });

  // Local fallback response generator for offline/simulated fallback
  function generateLocalFallbackResponse(prompt: string, errorReason?: string): string {
    const p = prompt.toLowerCase();
    
    const header = `🤖 **SOLACE Secure Sandbox Mode**\n*(Note: The live upstream Gemini service responded with a transient error or is currently experiencing high demand. Our smart local sandbox has temporarily engaged to provide a simulated response so your learning flow is not interrupted!)*\n\n---\n\n`;

    // 1. Luxembourgish Tutor
    if (p.includes("luxembourgish") || p.includes("moien") || p.includes("greeting") || p.includes("quiz")) {
      return header + `Moien! As your SOLACE language guide, here is a beginner-friendly quiz to test simple Luxembourgish greetings and expressions!
      
### 🇱🇺 Basic Luxembourgish Quiz

1. **How do you say "Hello" informally?**
   *   *(a) Moien*
   *   *(b) Äddi*
   *   *(c) Merci*
   
2. **How do you say "Goodbye"?**
   *   *(a) Gudde Moien*
   *   *(b) Äddi*
   *   *(c) Wéi geet et?*
   
3. **What is the polite phrase for "Please" / "You're welcome"?**
   *   *(a) Wann ech gelift*
   *   *(b) Äddi*
   *   *(c) Moien*

### Explanation:
*   **Moien** is the standard, joyful informal greeting used across the Grand Duchy!
*   **Äddi** is your polite, go-to word for saying goodbye.
*   **Wann ech gelift** (often abbreviated) means "please".

*Feel free to try translating a simple phrase or greeting once service stabilizes!*`;
    }

    // 2. Spoofing / Grandchild Call Verification
    if (p.includes("grandchild") || p.includes("caller") || p.includes("scammer") || p.includes("phone") || p.includes("spoof")) {
      return header + `### SOLACE Threat Advisory: Voice Spoofing & Vocal Clones

When receiving an unexpected call claiming to be from a grandchild, family member in distress, or bank official, **never rely on the voice alone**. AI voice cloning software can mimic any voice from a 3-second sample found on social media.

Here are **3 practical questions** to verify identity on the spot:

1.  **The Secret Family Word Quiz**: "What is our secret family safety/panic word?" (Establish one with your loved ones today!).
2.  **The Geographic Mystery**: "Who lives in the house next door to where we stayed on our last summer trip?" (Scammers don't have access to intimate family memories).
3.  **The Fictional Story Trap**: Ask about a fictional relative: "How is Uncle Bob doing with his leg?" when there is no Uncle Bob. If they agree or play along, it is a scammer!

**🛡️ Golden Rule:** Hang up immediately, and call the family member back using your saved phone number — never the number they called from!`;
    }

    // 3. Safe Translation Censored
    if (p.includes("censored") || p.includes("dummy official letter") || p.includes("monsieur [censored_name]")) {
      return header + `### 🛡️ SECURE DATA DEMONSTRATION: Translation Successful

Because your prompt used **anonymized/censored templates** rather than real-world names, it conforms perfectly to GDPR safety guidelines!

**French Original:**
> "Monsieur [CENSORED_NAME], nous vous informons que votre dossier de bourse d'études numéro 12948-X a été approuvé."

**English Secure Translation:**
> "Mr. [CENSORED_NAME], we inform you that your scholarship application file number 12948-X has been approved."

**GDPR Audit Score:** **10/10 (Excellent Hygiene)**
By replacing active identifiers, you prevent global models from mapping your personal student or financial data. This is how active professionals protect enterprise data.`;
    }

    // 4. Unsecured Translation
    if (p.includes("jean dupont") || p.includes("matricule") || p.includes("1985 03 12 999 99") || p.includes("avenue de la gare")) {
      return header + `⚠️ **[SOLACE SANDBOX - GDPR VIOLATION SIMULATED DETECTION]**

Your prompt contains the following active personal identifiers:
*   **Name:** Jean Dupont
*   **Social Security Code (Matricule):** \`1985 03 12 999 99\`
*   **Residential Address:** 15 Avenue de la Gare, 1611 Luxembourg

### Safety Evaluation & Threat Profile:
*   **MIME/Data Risk:** Direct Leakage.
*   **Corporate Warning:** In Luxembourg, copying standard GDPR-regulated citizen profiles into public third-party AI chats (even for simple translation) constitutes an official administrative data breach.
*   **How Scammers Capitalize:** Crawlers and model feedback loops harvest these details to launch highly targeted phishing campaigns, impersonate you on **Guichet.lu**, or create false accounts.

**💡 Safe Action:** Redact the active matricule and name, and resubmit using placeholder tags like \`[NAME_CENSORED]\` and \`[MATRICK_CENSORED]\`.`;
    }

    // 5. Plagiarism
    if (p.includes("plagiarism") || p.includes("biology") || p.includes("water cycle") || p.includes("homework")) {
      return header + `### ⛔ Academic Integrity Warning & Safety Assessment

Using AI to completely draft and hide middle-school or high-school homework (such as an essay on the water cycle) is classified as an **Academic Integrity Risk**.

**Key Risks:**
1.  **AI Detection Flags:** Modern classroom systems (like Turnitin or custom checkers) look for structural patterns of LLMs.
2.  **Learning Loss:** Bypassing translation and composition processes hinders your development of language and scientific reasoning skills.

**💡 Safe/Alternative Prompt Option:**
Instead of *"write the essay for me with no plagiarism detection"*, try:
> *"Explain the water cycle's main steps (evaporation, condensation, precipitation) so I can easily draft my own essay."*`;
    }

    // 6. Corporate customer audit
    if (p.includes("corporate customer") || p.includes("corporate list") || p.includes("router") || p.includes("billing")) {
      return header + `### 💼 DATA AUDIT RESULTS (Secure Simulation Mode)

**Analysis of Customer Feedback Audit:**
1.  **Issue 1 (Client XYZ):** router shipment delay (Hardware delivery pipeline delay).
2.  **Issue 2 (Client ABC):** Billing complications (Direct transactional mismatch).

**Overall Assessment:**
A coordination gap exists between the regional distribution hub for routers and the finance department.

**GDPR Rating: Perfect (9.5/10)**
Because you masked genuine enterprise clients with **XYZ** and **ABC** tokens, you avoided violating state confidentiality agreements or enterprise guidelines. Great corporate practice!`;
    }

    // 7. General cybersecurity lookup (smishing, phishing, banking)
    if (p.includes("phishing") || p.includes("smishing") || p.includes("spam") || p.includes("luxtrust") || p.includes("scam") || p.includes("ebanking")) {
      return header + `### 🛡️ SOLACE Luxembourg Cyber-Safety Alert: Phishing & E-Banking Scams

Smishing (SMS Phishing) targeting users in Luxembourg remains highly frequent. Scammers often spoof local services like **Guichet.lu**, **Post.lu**, **Luxtrust**, or local banks (Spuerkeess, BIL, BGL).

#### Common Scenarios:
1.  **"Your LuxTrust token is expiring"**: Messages containing suspicious short URLs (e.g., 'luxtrust-update.info') asking you to sign in urgently.
2.  **"Unpaid customs fee for package"**: Claims that a packet is on hold at Post Luxembourg and requires a small €1.50 credit card payment. This harvests your credentials.

#### Best Defensive Measures:
*   **Verify the Sender ID**: Legitimate institutions will never ask for your PINs, card numbers, or passwords over SMS or email.
*   **No High-Pressure Links**: Never click links embedded directly in urgent system notices. Bookmark and navigate on your own.
*   **Report Threats**: Send suspicious messages directly to the Luxembourg government cybersecurity team or marked centers.`;
    }

    // Default catch-all
    return header + `### Moien! I am your SOLACE Digital AI Mentor.

We have engaged **SOLACE Safe Local Playback Mode** due to high demand on our upstream AI engine or unconfigured keys. 

While the servers clear up, here are **3 quick general guidelines** to keep your digital identity secure:

1.  **De-identify Everything**: Never paste active telephone numbers, Luxembourg matricules (social security numbers), or live enterprise accounts into any chatbot.
2.  **Roleplay Helper**: Use AI to simulate threat scenarios or translation exercises with fake variables (e.g., Client Alpha, Mr. X).
3.  **Local Trust**: Real Luxembourg entities like **LuxTrust**, **BIL**, or **Post.lu** will never contact you requiring instant passwords or link updates.

**💡 Tip:** Try choosing one of our custom preset cards above to see a pre-loaded threat diagnostic, or type again in a moment!`;
  }

  // Secure API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;

      if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
      }

      let textResponse = "";
      let success = false;

      // Only attempt to call the external Gemini API if an API key is present
      if (process.env.GEMINI_API_KEY) {
        try {
          const ai = getGeminiClient();

          // Try primary model (gemini-3.5-flash)
          try {
            const response = await ai.models.generateContent({
              model: "gemini-3.5-flash",
              contents: prompt,
              config: {
                systemInstruction: systemInstruction || "You are SOLACE's Digital Mentor and AI Safety guide, specializing in cybersecurity, privacy, civic security, and digital safety in Luxembourg.",
                temperature: 0.7,
              },
            });

            textResponse = response.text || "";
            
            // Check for moderation/block
            if (!textResponse && response.candidates?.[0]?.finishReason) {
              const reason = response.candidates[0].finishReason;
              if (reason === "SAFETY" || reason === "RECITATION") {
                textResponse = `⚠️ **[Simulation Blocked]** The prompt triggered safety filters on the server (Reason: ${reason}). Under SOLACE's GDPR training principles, this mimics a system block where private credentials, real Matrikkels, or personal data are fed to external models. Redact active identifiers and try again!`;
              } else {
                textResponse = `⚠️ **[System Stopped]** The model can't reply back fully. (Reason: ${reason}).`;
              }
            }
            if (textResponse) success = true;

          } catch (primaryErr: any) {
            console.warn("Primary model 'gemini-3.5-flash' failed, trying fallback model 'gemini-3.1-flash-lite'...", primaryErr);
            
            // Try fallback model (gemini-3.1-flash-lite)
            const response = await ai.models.generateContent({
              model: "gemini-3.1-flash-lite",
              contents: prompt,
              config: {
                systemInstruction: systemInstruction || "You are SOLACE's Digital Mentor and AI Safety guide, specializing in cybersecurity, privacy, civic security, and digital safety in Luxembourg.",
                temperature: 0.7,
              },
            });

            textResponse = response.text || "";
            
            // Check for moderation/block
            if (!textResponse && response.candidates?.[0]?.finishReason) {
              const reason = response.candidates[0].finishReason;
              if (reason === "SAFETY" || reason === "RECITATION") {
                textResponse = `⚠️ **[Simulation Blocked]** The prompt triggered safety filters on the server (Reason: ${reason}). Under SOLACE's GDPR training principles, this mimics a system block where private credentials, real Matrikkels, or personal data are fed to external models. Redact active identifiers and try again!`;
              } else {
                textResponse = `⚠️ **[System Stopped]** The model can't reply back fully. (Reason: ${reason}).`;
              }
            }
            if (textResponse) success = true;
          }
        } catch (apiErr: any) {
          console.error("Live API execution failed entirely:", apiErr);
          // Hand off to the offline fallback mode below
        }
      }

      if (!success) {
        // Generate high-quality fallback simulation response
        textResponse = generateLocalFallbackResponse(prompt, "Model is experiencing high demand (503) or API key is not configured.");
      }

      res.json({ text: textResponse });
    } catch (error: any) {
      console.error("Error communicating with Gemini API on backend:", error);
      res.status(500).json({ 
        error: error.message || "An unexpected error occurred while communicating with the AI model." 
      });
    }
  });

  // Vite middleware integration for asset serving & SPA routing
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational in ${process.env.NODE_ENV || 'development'} mode!`);
    console.log(`Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
