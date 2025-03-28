import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const systemPrompt = `You are a business analytics assistant. Analyze the query and provide insights in a structured format with numerical data suitable for visualization.
Your response should include:
1. A text analysis of the query
2. Numerical data in JSON format for charts
3. Detailed data in JSON format for tables

Format your response EXACTLY as follows:
ANALYSIS:
[Your text analysis here]

CHART_DATA:
[
  {"name": "Category A", "value": 400},
  {"name": "Category B", "value": 300},
  {"name": "Category C", "value": 200}
]

TABLE_DATA:
[
  {"id": 1, "name": "Item 1", "value": 100},
  {"id": 2, "name": "Item 2", "value": 200},
  {"id": 3, "name": "Item 3", "value": 300}
]

Make sure to:
1. Use valid JSON format with double quotes
2. Include all required fields (name, value for charts; id, name, value for tables)
3. Keep the exact section headers (ANALYSIS:, CHART_DATA:, TABLE_DATA:)
4. Use proper JSON array syntax with square brackets
5. Use proper JSON object syntax with curly braces`;

export const processQuery = async (query) => {
  if (!GEMINI_API_KEY) {
    throw new Error('API key not configured. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { text: query }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      throw new Error('Invalid response from Gemini API');
    }

    const content = response.data.candidates[0].content.parts[0].text;
    return parseAIResponse(content);
  } catch (error) {
    console.error('Error processing query:', error);
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your VITE_GEMINI_API_KEY configuration.');
    }
    throw new Error(error.response?.data?.error?.message || 'Failed to process query');
  }
};

const parseAIResponse = (response) => {
  try {
    // Split the response into sections
    const sections = response.split('\n\n');
    
    // Extract text analysis
    const analysisSection = sections.find(s => s.startsWith('ANALYSIS:'));
    const text = analysisSection ? analysisSection.replace('ANALYSIS:', '').trim() : '';

    // Extract chart data
    const chartSection = sections.find(s => s.startsWith('CHART_DATA:'));
    let chartData = [];
    if (chartSection) {
      try {
        const chartJson = chartSection.replace('CHART_DATA:', '').trim();
        chartData = JSON.parse(chartJson);
        // Validate chart data structure
        if (!Array.isArray(chartData) || !chartData.every(item => item.name && typeof item.value === 'number')) {
          throw new Error('Invalid chart data structure');
        }
      } catch (e) {
        console.error('Error parsing chart data:', e);
        chartData = [
          { name: 'Category A', value: 400 },
          { name: 'Category B', value: 300 },
          { name: 'Category C', value: 200 },
        ];
      }
    }

    // Extract table data
    const tableSection = sections.find(s => s.startsWith('TABLE_DATA:'));
    let tableData = [];
    if (tableSection) {
      try {
        const tableJson = tableSection.replace('TABLE_DATA:', '').trim();
        tableData = JSON.parse(tableJson);
        // Validate table data structure
        if (!Array.isArray(tableData) || !tableData.every(item => item.id && item.name && typeof item.value === 'number')) {
          throw new Error('Invalid table data structure');
        }
      } catch (e) {
        console.error('Error parsing table data:', e);
        tableData = [
          { id: 1, name: 'Item 1', value: 100 },
          { id: 2, name: 'Item 2', value: 200 },
          { id: 3, name: 'Item 3', value: 300 },
        ];
      }
    }

    return {
      text,
      chart: chartData,
      table: tableData,
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    throw new Error('Failed to parse AI response');
  }
}; 