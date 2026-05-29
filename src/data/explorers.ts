import { Scenario } from './types';

export const explorers: Scenario[] = [
  {
    id: 'e1', title: 'Science Project Help', description: 'You are stuck on a science project and want to use AI.', type: 'safe-prompt',
    content: 'Prompt: "Write my entire 500-word essay on the water cycle."',
    options: [
      { id: 'e1-a', text: 'Send the prompt as is.', isSafe: false, feedback: 'You won\'t learn anything this way, and teachers use tools to detect AI writing.', suggestion: 'Ask: "Can you explain the water cycle in simple terms and give me an outline?"' },
      { id: 'e1-b', text: 'Ask for an explanation and outline instead.', isSafe: true, feedback: 'Perfect! AI is a great tutor when used to learn, not cheat.' }
    ]
  },
  {
    id: 'e2', title: 'School Talent Show', description: 'You need an idea for the school talent show.', type: 'ai-usage',
    content: 'Prompt: "Give me 5 unique talent show ideas for a 12-year-old that don\'t involve singing."',
    options: [
      { id: 'e2-a', text: 'Submit this prompt to the AI.', isSafe: true, feedback: 'Great! Brainstorming is one of the best ways to use AI for creativity.' },
      { id: 'e2-b', text: 'Search Google for days instead.', isSafe: false, feedback: 'You can save a lot of time by using AI for creative brainstorming!', suggestion: 'Use AI to generate a list of ideas, then pick your favorite to develop yourself.' }
    ]
  },
  {
    id: 'e3', title: 'Luxembourgish Vocabulary Practice', description: 'You want to practice Luxembourgish vocabulary.', type: 'ai-usage',
    content: 'Prompt: "Act as a language teacher. Give me a 5-question quiz on basic Luxembourgish greetings."',
    options: [
      { id: 'e3-a', text: 'Send prompt and take the quiz.', isSafe: true, feedback: 'Awesome! Role-prompting makes AI an interactive study buddy.' },
      { id: 'e3-b', text: 'Assume AI cannot help with localized languages.', isSafe: false, feedback: 'AI knows many languages, including Luxembourgish!', suggestion: 'Try asking AI to translate phrases or quiz you.' }
    ]
  },
  {
    id: 'e4', title: 'Historical Article Assignment', description: 'You have a long historical article to read for class.', type: 'ai-usage',
    content: 'Prompt: "Can you summarize this article in 3 paragraphs for a 7th grader?"',
    options: [
      { id: 'e4-a', text: 'Submit the prompt.', isSafe: true, feedback: 'Great! AI is excellent at simplifying complex information so you can understand it better.' },
      { id: 'e4-b', text: 'Tell the AI to take the test for you.', isSafe: false, feedback: 'Cheating won\'t help you in the long run.', suggestion: 'Use AI to break down complex texts, but always do your own assignments.' }
    ]
  },
  {
    id: 'e5', title: 'Exam Study Plan', description: 'You are stressed about exams and need a study plan.', type: 'ai-usage',
    content: 'Prompt: "Create a 5-day study schedule for Math and Science, 1 hour a day after 5 PM."',
    options: [
      { id: 'e5-a', text: 'Ask AI to generate the plan.', isSafe: true, feedback: 'Excellent! AI can help you manage your time and reduce stress.' },
      { id: 'e5-b', text: 'Give up because planning is hard.', isSafe: false, feedback: 'AI is a great tool for personal organization!', suggestion: 'Ask AI to create personalized schedules for you.' }
    ]
  },
  {
    id: 'e6', title: 'Python Syntax Error', description: 'You are learning Python and hit a bug.', type: 'ai-usage',
    content: 'Prompt: "Why is my Python statement giving a syntax error? Code: print \'Hello\'"',
    options: [
      { id: 'e6-a', text: 'Ask AI for the fix.', isSafe: true, feedback: 'Great! AI will explain that Python 3 needs parentheses: print("Hello").' },
      { id: 'e6-b', text: 'Install a random "fixer" software online.', isSafe: false, feedback: 'Never install unknown software to fix code.', suggestion: 'Use AI to debug your code securely.' }
    ]
  },
  {
    id: 'e7', title: 'Direct Message in Game', description: 'An AI chatbot in a game sends you a message.', type: 'phishing',
    content: 'Message: "Congratulations! I am the game admin. You won 10,000 Robux. Verify your parent\'s credit card here!"',
    options: [
      { id: 'e7-a', text: 'Give the card number.', isSafe: false, feedback: 'Danger! Scammers program AI bots to trick you.', suggestion: 'Never share financial information online. Real admins never ask for credit cards in chat.' },
      { id: 'e7-b', text: 'Ignore and report the bot.', isSafe: true, feedback: 'Excellent! You protected your personal data.' }
    ]
  },
  {
    id: 'e8', title: 'Message from a Friend', description: 'A message from a "friend" who talks weirdly asks for your password.', type: 'deepfake',
    content: 'Message: "Hey bro, it\'s me Max! My account got blocked, can I borrow your password to play a match quickly?"',
    options: [
      { id: 'e8-a', text: 'Share your password, it\'s Max!', isSafe: false, feedback: 'Scammers can use AI to mimic the way your friends type, or hijack their accounts.', suggestion: 'Call or text your friend in real life to verify before doing anything.' },
      { id: 'e8-b', text: 'Refuse and contact Max in person.', isSafe: true, feedback: 'Smart move! Always verify out of band.' }
    ]
  },
  {
    id: 'e9', title: 'YouTube Advertisement', description: 'You see an AI-generated YouTube ad for a free version of an expensive game.', type: 'phishing',
    content: 'Ad: "Download GTA 6 Beta Full Version for free here!"',
    options: [
      { id: 'e9-a', text: 'Click and download the .exe file.', isSafe: false, feedback: 'Malware alert! AI makes it cheap for hackers to create realistic fake ads.', suggestion: 'Only download games from official stores like Steam, Epic, or console stores.' },
      { id: 'e9-b', text: 'Skip the ad, knowing it\'s fake.', isSafe: true, feedback: 'Good job! If it looks too good to be true, it probably is.' }
    ]
  },
  {
    id: 'e10', title: 'Browser Pop-up', description: 'While researching for school, a loud pop-up appears on screen.', type: 'phishing',
    content: 'Pop-up: "WARNING! Virus Detected! Call this number immediately or your hard drive will be erased!"',
    options: [
      { id: 'e10-a', text: 'Call the number out of panic.', isSafe: false, feedback: 'This is a classic tech support scam. They will try to steal your money.', suggestion: 'Close the browser tab immediately. Real antivirus software doesn\'t ask you to call a number.' },
      { id: 'e10-b', text: 'Close the browser tab.', isSafe: true, feedback: 'Perfect! Scare tactics are a scammer\'s best weapon.' }
    ]
  },
  {
    id: 'e11', title: 'Discord Message', description: 'An AI avatar account on Discord asks for a picture of your house.', type: 'phishing',
    content: 'Message: "Hey! I\'m doing a school mapping project. Can you send a photo of the front of your house? I\'ll send you a gift card!"',
    options: [
      { id: 'e11-a', text: 'Send the photo for the gift card.', isSafe: false, feedback: 'Never share location details or photos of your home with strangers online.', suggestion: 'Block the user and inform a parent or teacher.' },
      { id: 'e11-b', text: 'Block the user.', isSafe: true, feedback: 'Great job! Guarding your physical location is crucial.' }
    ]
  },
  {
    id: 'e12', title: 'Supermarket Email', description: 'You get an email saying you won a new iPad from a Luxembourg store.', type: 'phishing',
    content: 'Email: "You are the lucky winner of our Cactus Supermarket giveaway! Click here and log in with your email to claim your iPad!"',
    options: [
      { id: 'e12-a', text: 'Click and log in.', isSafe: false, feedback: 'Phishing scam! They just want to steal your email password.', suggestion: 'Check the sender\'s email address carefully. Genuine giveaways rarely ask for passwords.' },
      { id: 'e12-b', text: 'Mark as spam.', isSafe: true, feedback: 'Smart choice. Stores don\'t randomly email you about iPads in exchange for passwords.' }
    ]
  }
];
