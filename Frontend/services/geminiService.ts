import { GoogleGenAI, Type } from "@google/genai";
import { CampusUpdate } from '../types';

const apiKey = process.env.API_KEY || '';
// Only initialize if key is present to avoid runtime crashes in demo environment without key
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const fetchCampusUpdates = async (): Promise<CampusUpdate[]> => {
  if (!ai) {
    console.warn("No API Key found, returning mock data.");
    return getMockData();
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate 3 exciting news updates for a "GeeksforGeeks Student Chapter". They should be about coding contests, DSA workshops, hackathons, and tech seminars. They should sound professional and engaging for computer science students.',
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              date: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['Event', 'Workshop', 'Contest', 'News'] }
            },
            required: ['id', 'title', 'summary', 'date', 'category']
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as CampusUpdate[];
    }
    return getMockData();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getMockData();
  }
};

const getMockData = (): CampusUpdate[] => [
  {
    id: '1',
    title: 'DSA Bootcamp: Mastering Arrays',
    summary: 'Join us for an intensive session on Array manipulation and optimization techniques. Beginner friendly!',
    date: 'Oct 24, 2025',
    category: 'Workshop'
  },
  {
    id: '2',
    title: 'Annual Coding Hackathon',
    summary: '48 hours of non-stop coding. Solve real-world problems and win exciting prizes. Teams of 4.',
    date: 'Oct 28, 2025',
    category: 'Contest'
  },
  {
    id: '3',
    title: 'Tech Talk: System Design',
    summary: 'Industry experts from top tech companies share insights on building scalable systems.',
    date: 'Nov 01, 2025',
    category: 'Event'
  }
];