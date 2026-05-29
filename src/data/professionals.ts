import { Scenario } from './types';

export const professionals: Scenario[] = [
  {
    id: 'p1', title: 'Vendor Proposal Response', description: 'You need to politely decline a vendor proposal.', type: 'ai-usage',
    content: 'Prompt: "Draft a polite and professional 3-sentence email declining a software proposal from Vendor X because it exceeds our current budget."',
    options: [
      { id: 'p1-a', text: 'Generate the email.', isSafe: true, feedback: 'Perfect! AI is fantastic for tone-matching and drafting routine communications.' },
      { id: 'p1-b', text: 'Include the vendor\'s confidential pricing sheet in the prompt.', isSafe: false, feedback: 'Data Leak! Do not feed confidential pricing data into public AI models.', suggestion: 'Keep prompts generic and fill in specific confidential details yourself later.' }
    ]
  },
  {
    id: 'p2', title: 'Sales Data Analysis', description: 'You need to find trends in an Excel spreadsheet of sales.', type: 'ai-usage',
    content: 'Prompt: "Analyze this data for seasonal trends: [Anonymized Data with generic item names and no customer IDs]"',
    options: [
      { id: 'p2-a', text: 'Analyze the anonymized data.', isSafe: true, feedback: 'Great job anonymizing! Removing PII (Personally Identifiable Information) keeps you GDPR compliant.' },
      { id: 'p2-b', text: 'Upload the raw sheet with customer names and emails.', isSafe: false, feedback: 'Massive GDPR Violation! You just leaked customer data to a public AI.', suggestion: 'Always strip PII and confidential identifiers before using external AI.' }
    ]
  },
  {
    id: 'p3', title: 'German Contract Translation', description: 'You receive a German contract from a partner in Trier.', type: 'ai-usage',
    content: 'Action: You use your company\'s approved, secure enterprise AI translation tool to read it.',
    options: [
      { id: 'p3-a', text: 'Use the enterprise tool.', isSafe: true, feedback: 'Excellent! Enterprise-approved tools ensure your data is not stored or used to train public models.' },
      { id: 'p3-b', text: 'Copy-paste it into a free public AI to save time.', isSafe: false, feedback: 'You just leaked a legal contract! Public tools can ingest this data.', suggestion: 'Always use internal, locally-hosted, or zero-retention enterprise AI tools for legal documents.' }
    ]
  },
  {
    id: 'p4', title: 'Q3 Board Presentation', description: 'You need to present Q3 results to the board.', type: 'ai-usage',
    content: 'Prompt: "Give me a 5-slide presentation outline for a quarterly financial review highlighting growth and operational challenges."',
    options: [
      { id: 'p4-a', text: 'Generate the outline.', isSafe: true, feedback: 'Great! Using AI to structure your thoughts helps overcome writer\'s block.' },
      { id: 'p4-b', text: 'Ask AI to write the whole presentation and present it as is.', isSafe: false, feedback: 'AI can hallucinate (make up facts). Presenting unverified AI content to a board is career suicide.', suggestion: 'Always review, edit, and fact-check AI-generated content.' }
    ]
  },
  {
    id: 'p5', title: 'Sustainable Packaging Campaign', description: 'You need fresh ideas for a sustainable packaging launch.', type: 'ai-usage',
    content: 'Prompt: "Brainstorm 5 creative marketing taglines for a new eco-friendly coffee cup in Luxembourg."',
    options: [
      { id: 'p5-a', text: 'Generate ideas.', isSafe: true, feedback: 'Perfect! AI excels at divergent thinking and brainstorming.' },
      { id: 'p5-b', text: 'Do it entirely manually.', isSafe: false, feedback: 'You are missing out on a huge productivity boost!', suggestion: 'Use AI as a collaborative partner to spark your own creativity.' }
    ]
  },
  {
    id: 'p6', title: 'Strategic Meeting Notes', description: 'You want to summarize a 1-hour strategic planning meeting.', type: 'data-leak',
    content: 'Prompt: "Summarize this transcript: Project Titan is launching on Q3. We are acquiring Company X for $50M... "',
    options: [
      { id: 'p6-a', text: 'Paste all notes into a public AI tool.', isSafe: false, feedback: 'Data Leak Alert! Never paste confidential corporate merger data into public tools.', suggestion: 'Use an enterprise-approved local AI, or heavily anonymize data before pasting.' },
      { id: 'p6-b', text: 'Use your company\'s private Microsoft Copilot or enterprise AI.', isSafe: true, feedback: 'Perfect! Using approved enterprise tools ensures your data stays private.' }
    ]
  },
  {
    id: 'p7', title: 'Executive Voicemail', description: 'You get a voicemail that sounds exactly like your CEO, asking for an urgent vendor payment.', type: 'deepfake',
    content: 'Audio Transcript: "Hi, I am boarding a flight and forgot to pay the new agency. Wire 50,000 Euros to this account immediately so we don\'t lose the contract."',
    options: [
      { id: 'p7-a', text: 'Wire the money immediately—it is the CEO!', isSafe: false, feedback: 'Scam! AI voice cloning can replicate your boss\'s voice perfectly.', suggestion: 'Always follow established financial protocols and verify urgent requests through a secondary channel (like Slack).' },
      { id: 'p7-b', text: 'Follow protocol and call the CEO back to verify.', isSafe: true, feedback: 'Excellent! You verified the identity and avoided a dangerous Business Email Compromise (BEC) scam.' }
    ]
  },
  {
    id: 'p8', title: 'Supplier Invoice Email', description: 'An email from your regular supplier "TechCorp" arrives.', type: 'phishing',
    content: 'Email: "Please note our banking details have changed. Send this month\'s payment of €12,000 to the new IBAN attached. - IT Dept"',
    options: [
      { id: 'p8-a', text: 'Update the IBAN in the system and pay.', isSafe: false, feedback: 'This is Invoice Redirection Fraud. Scammers intercept emails and change banking details.', suggestion: 'Always call the vendor on a known, verified phone number to confirm IBAN changes.' },
      { id: 'p8-b', text: 'Call TechCorp directly to verify the IBAN change.', isSafe: true, feedback: 'Smart move! Strict verification prevents massive financial losses.' }
    ]
  },
  {
    id: 'p9', title: 'Job Opportunity Pitch', description: 'An AI recruitment tool emails you a dream job offer in Luxembourg City.', type: 'phishing',
    content: 'Email: "Our AI matched your profile for a Senior Director role. Download this PDF to start the interview process."',
    options: [
      { id: 'p9-a', text: 'Download the PDF!', isSafe: false, feedback: 'Spear-phishing! The attachment likely contains malware that will infect your corporate network.', suggestion: 'Verify the recruiter via LinkedIn and never download unexpected attachments.' },
      { id: 'p9-b', text: 'Verify the recruiter on LinkedIn first.', isSafe: true, feedback: 'Good job safeguarding your network from malware.' }
    ]
  },
  {
    id: 'p10', title: 'Internal Support Notification', description: 'You get a Microsoft Teams message from "IT Support".', type: 'phishing',
    content: 'Message: "We detected unauthorized AI access on your account. Please send the 6-digit MFA code you just received on your phone to secure it."',
    options: [
      { id: 'p10-a', text: 'Send the 6-digit code.', isSafe: false, feedback: 'MFA Bypass Scam! They already have your password and just need the code to log in.', suggestion: 'Never share MFA codes with ANYONE, not even IT. Real IT will never ask for your code.' },
      { id: 'p10-b', text: 'Ignore and report to the real IT department.', isSafe: true, feedback: 'Perfect! You protected your corporate identity.' }
    ]
  },
  {
    id: 'p11', title: 'Cloud Software Alert', description: 'An email claiming to be from Microsoft 365 arrives.', type: 'phishing',
    content: 'Email: "Your Office 365 license expires in 2 hours. Click here to login and renew immediately or your emails will be deleted."',
    options: [
      { id: 'p11-a', text: 'Click and log in quickly.', isSafe: false, feedback: 'Credential harvesting! Scammers use false urgency to steal your login details.', suggestion: 'Go directly to portal.office.com by typing it in your browser to check your license status.' },
      { id: 'p11-b', text: 'Check the license status directly via your IT portal.', isSafe: true, feedback: 'Excellent! Navigating directly bypasses phishing links.' }
    ]
  },
  {
    id: 'p12', title: 'Industry News Link', description: 'A colleague links an article claiming a major competitor is bankrupt.', type: 'misinformation',
    content: 'Colleague: "Did you see this? We should cancel our deal with them!" (Article is from an unknown blog with AI-generated text).',
    options: [
      { id: 'p12-a', text: 'Cancel the deal immediately based on the article.', isSafe: false, feedback: 'AI is often used to generate fake market news for stock manipulation or sabotage.', suggestion: 'Verify market news through Bloomberg, Reuters, or official press releases.' },
      { id: 'p12-b', text: 'Search verified financial news outlets first.', isSafe: true, feedback: 'Great critical thinking! You protected the company from acting on misinformation.' }
    ]
  }
];
