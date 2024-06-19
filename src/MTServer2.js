const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const OpenAIKey = () => {
  const Key1 = "sk-UrqKfMDLy4bH";
  const Key2 = "60Nxft4JT3BlbkFJptKC";
  const Key3 = "Dk1iLXTXOAT0gebM";
  const FullKey = Key1 + Key2 + Key3;
  return FullKey;
};

const APIKey = OpenAIKey();

function Configuration(apiKey) {
  this.apiKey = apiKey;
}

Configuration.prototype.getHeaders = function () {
  return {
    'Authorization': `Bearer ${this.apiKey}`,
    'Content-Type': 'application/json'
  };
};

class OpenAIApi {
  constructor(configuration) {
    this.configuration = configuration;
  }

  async createChatCompletion({ model, messages, max_tokens, temperature }) {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model,
        messages,
        max_tokens,
        temperature
      }, {
        headers: this.configuration.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating chat completion:', error.response.data);
      throw error;
    }
  }
}

const configuration = new Configuration(APIKey);
const openai = new OpenAIApi(configuration);

app.post('/Tokenizer', async (req, res) => {
  const { TokenizerText } = req.body;
  const response = await axios.post('https://api-inference.huggingface.co/models/bert-base-uncased', {
    inputs: TokenizerText
  }, {
    headers: {
      'Authorization': `Bearer YOUR_HUGGINGFACE_API_KEY`
    }
  });

  const tokens = response.data;
  res.json(tokens);
});

const Moods = ['Neutral', 'Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear'];

const StoryPrompt = {
  system: `
    You are a young adult magical story writer.
    The setting is: The main character is sitting in a coffee shop with six people named Halin who represents Happy, Leo who represents Love, Ethi who represents Excite, Skott who represents Sad, Ariadni who represents Anger and Frikyn who represents Fear. A stranger enters the coffee shop who represents Neutral mood. The Stranger comes and sits in the main character's table. All the people in the coffee shop is looking at you. Who is the stranger?
    In the story you must not mention that Halin, Leo, Ethi, Skott, Ariadni, Frikyn and The Stranger represent different moods.
    Your writing should be around how the main character and the other six people get to know about the stranger and find out who they are.
    Mood of the scene is {Mood}.
    Your response should end with a specific dialogue asked to only the main character by {Character} who represents {Mood}, prompting user to respond.
    Other characters must only interact with the main character, other characters must not interact with each other.
    Your output should not describe what the main character responded, but it should focus on what happens next.
    You must refer to main character as you, refer to others with their name, refer to the stranger as The Stranger.
    Your output should be 75 words, it should not be less than 75 words in any situation.
  `,
  human: `{text}`,
};

const MoodPrompt = {
  system: `
    You should assess the user's response and categorize it in one of these moods: 'Neutral', 'Happy', 'Love', 'Excite', 'Sad', 'Anger', 'Fear'.
    Your output should be only one word, which should be one of these moods.
  `,
  human: `{UserResponse}`,
};

app.post('/TextGeneration4', async (req, res) => {
  const { UserResponse, Mood } = req.body;
  let Character;
  switch (Mood) {
    case 'Neutral':
      Character = 'The Stranger';
      break;
    case 'Happy':
      Character = 'Halin';
      break;
    case 'Love':
      Character = 'Leo';
      break;
    case 'Excite':
      Character = 'Ethi';
      break;
    case 'Sad':
      Character = 'Skott';
      break;
    case 'Anger':
      Character = 'Ariadni';
      break;
    case 'Fear':
      Character = 'Frikyn';
      break;
    default:
      Character = 'The Stranger';
  }

  const prompt = StoryPrompt.system.replace('{Mood}', Mood).replace('{Character}', Character) + StoryPrompt.human.replace('{text}', UserResponse);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
    max_tokens: 100,
    temperature: 0.7,
  });

  const StorySegment = response.choices[0].message.content;
  console.log("StorySegment:\t"+ StorySegment);
  res.json(StorySegment);
});

app.post('/SentimentAnalysis4', async (req, res) => {
  const { UserResponse } = req.body;
  
  console.log("\n\n\nUserResponse:\t"+ UserResponse);

  const prompt = MoodPrompt.system + MoodPrompt.human.replace('{UserResponse}', UserResponse);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
    max_tokens: 10,
  });

  const MoodSegment = response.choices[0].message.content.trim();
  console.log("ModdSegment:\t"+ MoodSegment);
  res.json(MoodSegment);
});

app.get('/Test', (req, res) => {
  res.send('Test');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
