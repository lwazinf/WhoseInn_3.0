// pages/api/houses.ts

import { NextApiRequest, NextApiResponse } from 'next';
import housesData from './mock-houses.json';

interface House {
  id: number;
  description: string;
  distance: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  // Add other properties as needed
}

const performSemanticSearch = (houses: House[], query: string): House[] => {
  // Implement your semantic search logic here
  // This is a placeholder, you may need to use a natural language processing library
  return houses.filter((house) => house.description.toLowerCase().includes(query.toLowerCase()));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  // Simulate fetching data from a database or external API
  const searchResults = performSemanticSearch(housesData as House[], query as string);

  res.status(200).json(searchResults);
};
