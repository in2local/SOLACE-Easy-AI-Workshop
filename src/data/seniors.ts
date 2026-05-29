import { Scenario } from './types';

export const seniors: Scenario[] = [
  {
    id: 's1', title: 'Email to Grandchild', description: 'You want to write a long email to your grandchildren abroad but struggle with typing.', type: 'ai-usage',
    content: 'Prompt/Voice: "Help me write a warm, loving email to my grandson telling him about my garden and wishing him luck on his exams."',
    options: [
      { id: 's1-a', text: 'Have the AI draft the outline.', isSafe: true, feedback: 'Wonderful! AI is a great tool to help overcome writer\'s block and compose loving messages.' },
      { id: 's1-b', text: 'Don\'t write the email because typing is too hard.', isSafe: false, feedback: 'AI voice-to-text and drafting can make staying connected much easier!', suggestion: 'Try using voice commands to tell AI what you want to say.' }
    ]
  },
  {
    id: 's2', title: 'Retirement Trip to Italy', description: 'You are planning a retirement trip to Italy.', type: 'ai-usage',
    content: 'Prompt: "Create a relaxing 7-day itinerary for an older couple visiting Florence, focusing on easy walking tours and art."',
    options: [
      { id: 's2-a', text: 'Generate the itinerary.', isSafe: true, feedback: 'Excellent use of AI! It can create fantastic, highly customized travel plans.' },
      { id: 's2-b', text: 'Give the AI your credit card to book everything for you.', isSafe: false, feedback: 'Never give AI chatbots your credit card to book things!', suggestion: 'Use AI for ideas, but book through official airline and hotel websites safely.' }
    ]
  },
  {
    id: 's3', title: 'Medical Test Summary', description: 'Your doctor gave you a summary of your blood test, and the words are confusing.', type: 'ai-usage',
    content: 'Prompt: "Explain what \'hypercholesterolemia\' means in simple, everyday terms."',
    options: [
      { id: 's3-a', text: 'Ask for the simple explanation.', isSafe: true, feedback: 'Good! AI is great at explaining complex terms easily.' },
      { id: 's3-b', text: 'Assume whatever AI says is medical advice and stop taking medication.', isSafe: false, feedback: 'AI is not a doctor. It can make mistakes (hallucinations).', suggestion: 'Use AI to understand terms, but ALWAYS consult your doctor before changing medications.' }
    ]
  },
  {
    id: 's4', title: 'Low-Sugar Dinner Recipes', description: 'You have diabetes and need new dinner ideas.', type: 'ai-usage',
    content: 'Prompt: "Give me 3 easy-to-cook, low-sugar dinner recipes using chicken and vegetables."',
    options: [
      { id: 's4-a', text: 'Generate the recipes.', isSafe: true, feedback: 'Perfect! AI is fantastic for generating customizable recipes based on dietary needs.' },
      { id: 's4-b', text: 'Eat the same thing every day.', isSafe: false, feedback: 'AI can help you find joy in cooking again by tailoring recipes to you.', suggestion: 'Ask AI for simple, step-by-step cooking instructions.' }
    ]
  },
  {
    id: 's5', title: 'Daily Vitamin Reminder', description: 'You keep forgetting to take your vitamins at 2 PM.', type: 'ai-usage',
    content: 'Action: You ask your phone\'s AI voice assistant, "Remind me every day at 2 PM to take my vitamins."',
    options: [
      { id: 's5-a', text: 'Set the AI voice reminder.', isSafe: true, feedback: 'Brilliant! Conversational AI on phones is highly effective for daily memory aids.' },
      { id: 's5-b', text: 'Try to just remember it.', isSafe: false, feedback: 'Using technology to offload mental strain is a smart way to stay healthy!', suggestion: 'Use Siri, Google Assistant, or Alexa to set daily alerts.' }
    ]
  },
  {
    id: 's6', title: 'Local News Updates', description: 'You want to hear local Luxembourg news but have trouble reading small text.', type: 'ai-usage',
    content: 'Action: You ask your smart speaker, "Read me the top news headlines for Luxembourg today."',
    options: [
      { id: 's6-a', text: 'Listen to the AI read the news.', isSafe: true, feedback: 'Great! Voice-activated AI makes the internet much more accessible.' },
      { id: 's6-b', text: 'Assume AI cannot read local news.', isSafe: false, feedback: 'AI can pull headlines from reliable local sources like RTL!', suggestion: 'Ask your assistant for news or even the local weather forecast.' }
    ]
  },
  {
    id: 's7', title: 'Distressing Phone Call', description: 'You receive a frantic phone call that sounds exactly like your grandchild.', type: 'deepfake',
    content: 'Audio: "Hi Grandma/Grandpa, it\'s me. I was in an accident and lost my phone. Wire 500 Euros to my lawyer immediately! Don\'t tell mom!"',
    options: [
      { id: 's7-a', text: 'Send the money out of panic.', isSafe: false, feedback: 'Scam! AI voice cloning (deepfakes) can mimic your loved ones perfectly using just a 3-second clip from social media.', suggestion: 'Always hang up and call them back on their known phone number, or establish a secret family "safe word".' },
      { id: 's7-b', text: 'Hang up and call their regular phone number.', isSafe: true, feedback: 'Excellent! You verified their identity and protected yourself from a distressing scam.' }
    ]
  },
  {
    id: 's8', title: 'Tax Authority SMS', description: 'You get a text message claiming to be from the Luxembourg tax authority.', type: 'phishing',
    content: 'Text: "Guichet.lu: You have an unpaid tax bill of €120. Pay immediately at guichet-refund-lux.com or face a fine."',
    options: [
      { id: 's8-a', text: 'Click the link and pay.', isSafe: false, feedback: 'Smishing Scam! The government will NOT send you random links via SMS asking for payment.', suggestion: 'Log into the official MyGuichet app or website safely, or call the commune directly.' },
      { id: 's8-b', text: 'Ignore the text and report as spam.', isSafe: true, feedback: 'Great eye! You protected your bank account.' }
    ]
  },
  {
    id: 's9', title: 'Facebook Connection Request', description: 'A handsome/beautiful stranger messages you on Facebook, always sharing perfect photos but never video chatting.', type: 'deepfake',
    content: 'Message: "I love our chats so much. I want to visit you in Luxembourg, but my bank account is frozen. Can you send €300 for a flight?"',
    options: [
      { id: 's9-a', text: 'Send the money to help them visit.', isSafe: false, feedback: 'Romance Scam! Scammers use AI to generate fake, perfect pictures (catfishing). If they won\'t video call, they aren\'t real.', suggestion: 'Never send money to someone you have only met online.' },
      { id: 's9-b', text: 'Refuse and block the account.', isSafe: true, feedback: 'Smart decision. You guarded your heart and your wallet.' }
    ]
  },
  {
    id: 's10', title: 'Postal Delivery Alert', description: 'You get a text about a package you aren\'t expecting.', type: 'phishing',
    content: 'Text: "Post Luxembourg: Your parcel is held at the depot due to an unpaid €2.99 customs fee. Pay here: post-lux-fees.com"',
    options: [
      { id: 's10-a', text: 'Pay the €2.99 just in case.', isSafe: false, feedback: 'Phishing! They don\'t want the €2.99; they want to steal your full credit card details on the fake website.', suggestion: 'Check tracking numbers directly on the official Post.lu website.' },
      { id: 's10-b', text: 'Delete the message.', isSafe: true, feedback: 'Perfect! If you aren\'t expecting a package, it\'s almost certainly a scam.' }
    ]
  },
  {
    id: 's11', title: 'Investment Endorsement Video', description: 'You see a video on Facebook of a trusted Luxembourg politician.', type: 'deepfake',
    content: 'Video: "I have doubled my pension using this new AI trading platform. Click here to invest €250 and secure your retirement!"',
    options: [
      { id: 's11-a', text: 'Click the link and invest.', isSafe: false, feedback: 'Fake Endorsement! Scammers use AI video deepfakes to make trusted figures say things they never said.', suggestion: 'Politicians and news anchors do not endorse crypto platforms in ads.' },
      { id: 's11-b', text: 'Report the advertisement as fake.', isSafe: true, feedback: 'Great eye! Reporting deepfakes protects others in the community.' }
    ]
  },
  {
    id: 's12', title: 'Software Invoice Email', description: 'An email arrives with a massive invoice.', type: 'phishing',
    content: 'Email: "Your Norton Antivirus AI subscription has automatically renewed for €399. If you did not authorize this, call this number to cancel: 1-800-FAKE."',
    options: [
      { id: 's12-a', text: 'Call the number to cancel the charge.', isSafe: false, feedback: 'Refund Scam! The charge is fake. If you call, they will ask for remote access to your computer to "process the refund" and steal your money.', suggestion: 'Ignore the email. Check your actual bank app to see if a charge was made (it wasn\'t).' },
      { id: 's12-b', text: 'Check your bank app to confirm no charge was made, then delete the email.', isSafe: true, feedback: 'Excellent! Staying calm and verifying facts stops scammers in their tracks.' }
    ]
  }
];
