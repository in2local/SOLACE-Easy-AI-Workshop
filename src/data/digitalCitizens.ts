import { Scenario } from './types';

export const digitalCitizens: Scenario[] = [
  {
    id: 'd1', title: 'First Job Interview Prep', description: 'You are preparing for your first job interview.', type: 'ai-usage',
    content: 'Prompt: "Act as a hiring manager for a Junior Analyst role in Luxembourg. Ask me 3 interview questions one by one."',
    options: [
      { id: 'd1-a', text: 'Start the mock interview.', isSafe: true, feedback: 'Excellent! AI is a powerful tool to practice communication skills.' },
      { id: 'd1-b', text: 'Upload your ID to verify your profile to the AI.', isSafe: false, feedback: 'Never upload official ID documents to free AI chatbots!', suggestion: 'Use AI for practice safely without sharing highly sensitive personal documents.' }
    ]
  },
  {
    id: 'd2', title: 'University Essay Outline', description: 'You have a 10-page essay due next week.', type: 'ai-usage',
    content: 'Prompt: "Can you help me outline a 10-page essay on European climate policy?"',
    options: [
      { id: 'd2-a', text: 'Ask for the outline.', isSafe: true, feedback: 'Great! Using AI to structure your thoughts helps you write a better essay yourself.' },
      { id: 'd2-a2', text: 'Ask AI to write the whole essay.', isSafe: false, feedback: 'Universities will fail you for AI plagiarism.', suggestion: 'Use AI as a brainstorming buddy and outliner, not a ghostwriter.' }
    ]
  },
  {
    id: 'd3', title: 'Monthly Budgeting', description: 'You are moving out and need a budget.', type: 'ai-usage',
    content: 'Prompt: "I make €2,500 a month in Luxembourg. Create a standard monthly budget percentage breakdown for rent, groceries, and savings."',
    options: [
      { id: 'd3-a', text: 'Generate the budget.', isSafe: true, feedback: 'Smart! AI is great at providing standard financial templates.' },
      { id: 'd3-b', text: 'Paste your bank account credentials for it to track.', isSafe: false, feedback: 'Never share banking credentials with an AI chatbot!', suggestion: 'Ask for templates and do the math on your own spreadsheet.' }
    ]
  },
  {
    id: 'd4', title: 'Official Commune Document', description: 'You received an official letter from the local commune in French, but you prefer English.', type: 'ai-usage',
    content: 'Prompt: "Translate this official letter from French to English: [Pasted Letter]"',
    options: [
      { id: 'd4-a', text: 'Ensure you removed your social security number, then paste.', isSafe: true, feedback: 'Perfect data hygiene! Anonymizing documents before translating keeps you safe.' },
      { id: 'd4-b', text: 'Paste the entire letter with your name, address, and ID number.', isSafe: false, feedback: 'Data Leak! Public AI models can retain your personal data.', suggestion: 'Always censor sensitive numbers and names before pasting documents into AI.' }
    ]
  },
  {
    id: 'd5', title: 'React Animation Tools', description: 'You are building a personal website and want to use React.', type: 'ai-usage',
    content: 'Prompt: "What are the best React animation libraries to use in 2024?"',
    options: [
      { id: 'd5-a', text: 'Ask for recommendations.', isSafe: true, feedback: 'AI is fantastic for discovering new tools and comparing libraries.' },
      { id: 'd5-b', text: 'Copy-paste blind code from AI without reading it.', isSafe: false, feedback: 'Pasting code without understanding it can introduce bugs and security flaws.', suggestion: 'Always review generated code before adding it to your projects.' }
    ]
  },
  {
    id: 'd6', title: 'Gym Workout Plan', description: 'You want to start working out at the gym 3 days a week.', type: 'ai-usage',
    content: 'Prompt: "Create a beginner 3-day full body workout plan focusing on dumbbells and machines."',
    options: [
      { id: 'd6-a', text: 'Generate the workout plan.', isSafe: true, feedback: 'Great use case! AI can set up excellent foundational routines.' },
      { id: 'd6-b', text: 'Ask the AI to diagnose a sharp pain in your shoulder.', isSafe: false, feedback: 'AI is not a doctor. Relying on it for medical diagnosis is dangerous.', suggestion: 'Use AI for generic plans, but see a real doctor for injuries.' }
    ]
  },
  {
    id: 'd7', title: 'University Scholarship Email', description: 'You receive an email from "EU-Scholarships-AI.net".', type: 'phishing',
    content: 'Email: "You have been pre-selected by our AI for a €5000 grant. Pay the €50 processing fee here to claim it."',
    options: [
      { id: 'd7-a', text: 'Pay the fee. €50 for €5000 is a steal!', isSafe: false, feedback: 'Advance-fee scam! Real scholarships never ask you to pay a fee to win money.', suggestion: 'Delete the email and look for scholarships on verified university portals.' },
      { id: 'd7-b', text: 'Report as spam.', isSafe: true, feedback: 'Good catch! You saved yourself €50.' }
    ]
  },
  {
    id: 'd8', title: 'Social Media Investment Video', description: 'You see a video of Elon Musk offering a crypto giveaway.', type: 'deepfake',
    content: 'Video: "Send 0.05 BTC to the address below and my new AI trading bot will send you 0.10 BTC back immediately!"',
    options: [
      { id: 'd8-a', text: 'Send the Crypto!', isSafe: false, feedback: 'This is an AI voice and video deepfake. The scammers steal your money instantly.', suggestion: 'Remember: no legitimate billionaire or company is doubling crypto online.' },
      { id: 'd8-b', text: 'Report the video as fake.', isSafe: true, feedback: 'Excellent! Deepfakes are used widely to steal crypto.' }
    ]
  },
  {
    id: 'd9', title: 'Viral Political TikTok', description: 'Right before the Luxembourg elections, a shocking video of a politician goes viral.', type: 'misinformation',
    content: 'Video: The politician is seen saying they are cancelling all university scholarships. The lips look a little blurry.',
    options: [
      { id: 'd9-a', text: 'Share it to warn your friends!', isSafe: false, feedback: 'You just spread misinformation! This is a deepfake designed to manipulate civic engagement.', suggestion: 'Always check official news sources like RTL or Tageblatt to verify sensational claims.' },
      { id: 'd9-b', text: 'Check reliable news sources to verify.', isSafe: true, feedback: 'Perfect civic engagement! Verifying information protects our democracy.' }
    ]
  },
  {
    id: 'd10', title: 'Streaming Service SMS', description: 'You receive an urgent SMS on your phone.', type: 'phishing',
    content: 'SMS: "Netflix: Your last payment was declined by our AI risk system. Update your card at netflix-update-lux.com or lose access today."',
    options: [
      { id: 'd10-a', text: 'Click the link and update the card.', isSafe: false, feedback: 'Smishing scam! Scammers use urgency to make you panic and give up your card details.', suggestion: 'Never click links in unexpected texts. Open the app directly to check your account.' },
      { id: 'd10-b', text: 'Open the official Netflix app to check.', isSafe: true, feedback: 'Smart! Verifying directly through the official app is the safest route.' }
    ]
  },
  {
    id: 'd11', title: 'Fashion Brand Ad', description: 'An Instagram ad shows a highly discounted designer jacket.', type: 'phishing',
    content: 'Ad: "Flash Sale! AI-powered logistics let us sell this €300 jacket for €25! Click here!"',
    options: [
      { id: 'd11-a', text: 'Buy it quickly before it sells out!', isSafe: false, feedback: 'This is a drop-shipping scam or fake store generated quickly using AI tools.', suggestion: 'Check the domain name online for reviews (e.g. on Trustpilot) before buying from unknown ads.' },
      { id: 'd11-b', text: 'Search the store name on Trustpilot first.', isSafe: true, feedback: 'Excellent practice! Always verify unfamiliar stores.' }
    ]
  },
  {
    id: 'd12', title: 'Instagram Direct Message', description: 'A friend DMs you on Instagram begging for money.', type: 'phishing',
    content: 'Message: "Hey, I lost my wallet in Paris. Can you Apple Pay me €50 so I can get a train ticket back to Lux? I\'ll pay you tomorrow!"',
    options: [
      { id: 'd12-a', text: 'Send the money immediately.', isSafe: false, feedback: 'Your friend\'s account was likely hacked. Scammers target entire friend lists this way.', suggestion: 'Call your friend on their phone number to confirm before sending any money.' },
      { id: 'd12-b', text: 'Call your friend on their phone.', isSafe: true, feedback: 'Smart move! Always verify urgent requests out-of-band.' }
    ]
  }
];
