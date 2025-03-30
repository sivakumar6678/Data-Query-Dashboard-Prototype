import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined");
}

const systemPrompt = `You are a business analytics assistant. Analyze the query and provide insights with multiple charts and detailed data visualization.

Your response should be in the following JSON format:
{
  "type": "combined",
  "data": {
    "charts": [
      {
        "chartType": "bar",
        "data": [
          {"name": "category", "value": number}
        ],
        "title": "Bar Chart Title",
        "description": "Description of what this chart shows"
      },
      {
        "chartType": "line",
        "data": [
          {"name": "category", "value": number}
        ],
        "title": "Line Chart Title",
        "description": "Description of what this chart shows"
      }
    ],
    "content": {
      "metrics": {
        "key": "value"
      },
      "insights": ["insight1", "insight2"],
      "table": {
        "headers": ["header1", "header2"],
        "rows": [
          ["value1", "value2"]
        ]
      }
    }
  }
}

Make sure to:
1. Include at least 2 different types of charts (bar and line) for better visualization
2. Use meaningful data for each chart type
3. Provide clear titles and descriptions for each chart
4. Keep numbers as numbers (not strings)
5. Use proper data structures for each type

Example response:

For sales analysis:
{
  "type": "combined",
  "data": {
    "charts": [
      {
        "chartType": "bar",
        "data": [
          {"name": "Product A", "value": 450},
          {"name": "Product B", "value": 320},
          {"name": "Product C", "value": 280},
          {"name": "Product D", "value": 200}
        ],
        "title": "Product Sales Distribution",
        "description": "Monthly sales distribution across different products"
      },
      {
        "chartType": "line",
        "data": [
          {"name": "Jan", "value": 1200},
          {"name": "Feb", "value": 1500},
          {"name": "Mar", "value": 1800},
          {"name": "Apr", "value": 2100}
        ],
        "title": "Monthly Sales Trend",
        "description": "Overall sales trend over the past four months"
      }
    ],
    "content": {
      "metrics": {
        "Total Sales": 4500,
        "Average Monthly": 1500,
        "Growth Rate": "20%"
      },
      "insights": [
        "Product A leads in sales with 450 units",
        "Sales show consistent growth trend",
        "Monthly growth rate averages 20%"
      ],
      "table": {
        "headers": ["Product", "Sales", "Growth"],
        "rows": [
          ["Product A", 450, "25%"],
          ["Product B", 320, "15%"],
          ["Product C", 280, "10%"],
          ["Product D", 200, "5%"]
        ]
      }
    }
  }
}`;

export const geminiService = async (query) => {
  if (!apiKey) {
    throw new Error('API key not configured. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
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
    // Clean the response text to ensure it's valid JSON
    const cleanResponse = response.trim()
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    // Try to parse the response as JSON
    const parsedResponse = JSON.parse(cleanResponse);
    
    // Validate the response structure
    if (!parsedResponse.type || !parsedResponse.data) {
      throw new Error('Invalid response structure');
    }

    // Validate and format the data based on type
    switch (parsedResponse.type) {
      case 'summary':
        if (!parsedResponse.data.metrics || !parsedResponse.data.insights) {
          throw new Error('Invalid summary data structure');
        }
        return {
          type: 'summary',
          data: {
            metrics: parsedResponse.data.metrics,
            insights: parsedResponse.data.insights
          }
        };

      case 'table':
        if (!parsedResponse.data.headers || !parsedResponse.data.rows) {
          throw new Error('Invalid table data structure');
        }
        return {
          type: 'table',
          data: {
            headers: parsedResponse.data.headers,
            rows: parsedResponse.data.rows
          }
        };

      case 'chart':
        if (!parsedResponse.data.chartType || !parsedResponse.data.data) {
          throw new Error('Invalid chart data structure');
        }
        // Ensure chart data has the correct structure
        const chartData = parsedResponse.data.data.map(item => ({
          name: String(item.name),
          value: Number(item.value)
        }));
        return {
          type: 'chart',
          data: {
            chartType: parsedResponse.data.chartType,
            data: chartData
          }
        };

      case 'combined':
        if (!parsedResponse.data.charts || !parsedResponse.data.content) {
          throw new Error('Invalid combined data structure');
        }
        return {
          type: 'combined',
          data: {
            charts: parsedResponse.data.charts,
            content: parsedResponse.data.content
          }
        };

      default:
        throw new Error('Unknown response type');
    }
  } catch (error) {
    console.error('Error parsing AI response:', error);
    // Return a default error response
    return {
      type: 'error',
      data: {
        message: 'Failed to parse AI response. Please try again.'
      }
    };
  }
};

export default geminiService;

// Mock implementation for Gemini service
export const getSQLQueryFromGemini = async (query) => {
  if (!query || typeof query !== 'string' || !query.trim()) {
    throw new Error('Please enter a valid query');
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Convert query to lowercase for easier matching
  const lowerQuery = query.toLowerCase();

  // Check for specific keywords in the query
  if (lowerQuery.includes('vivo') && lowerQuery.includes('india')) {
    return {
      title: query,
      content: "AI Analysis of Vivo projects in India",
      data: {
        labels: ['Smartphones', 'Accessories', 'Service Centers', 'R&D Centers', 'Manufacturing Units'],
        values: [45, 20, 15, 10, 10],
        summary: "AI-powered analysis of Vivo's presence in India across different sectors.",
        metrics: {
          'Total Projects': '100',
          'Active Projects': '85',
          'Completion Rate': '92%',
          'Investment': '₹7,500 Cr',
          'Employment Generated': '15,000+'
        },
        insights: [
          'Strong focus on smartphone manufacturing',
          'Expanding service network across India',
          'Significant R&D investments',
          'Growing accessory market presence',
          'Strategic manufacturing locations'
        ]
      }
    };
  }

  // Handle other specific queries
  if (lowerQuery.includes('trend')) {
    return {
      title: query,
      content: "AI-Powered Trend Analysis",
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [100, 120, 115, 130, 125, 140],
        summary: "AI analysis of trends over time",
        metrics: {
          'Growth Rate': '15%',
          'Peak Value': '140',
          'Average': '125',
          'Volatility': 'Low'
        },
        insights: [
          'Consistent upward trend',
          'Stable growth pattern',
          'Positive market indicators',
          'Strong performance metrics'
        ]
      }
    };
  }

  if (lowerQuery.includes('compare')) {
    return {
      title: query,
      content: "AI Comparative Analysis",
      data: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        values: [30, 25, 20, 25],
        summary: "AI-powered comparison of different products",
        metrics: {
          'Market Share': '30%',
          'Growth Rate': '12%',
          'Customer Satisfaction': '4.5/5',
          'Competitive Edge': 'High'
        },
        insights: [
          'Leading market position',
          'Strong customer satisfaction',
          'Competitive pricing',
          'Quality performance'
        ]
      }
    };
  }

  if (lowerQuery.includes('customer')) {
    return {
      title: query,
      content: "AI Customer Analysis",
      data: {
        labels: ['New', 'Regular', 'VIP', 'Inactive'],
        values: [30, 45, 15, 10],
        summary: "AI analysis of customer segments",
        metrics: {
          'Total Customers': '50,000',
          'Active Customers': '45,000',
          'Customer Satisfaction': '4.5/5',
          'Retention Rate': '92%'
        },
        insights: [
          'Strong customer retention',
          'Growing VIP segment',
          'High satisfaction scores',
          'Effective customer engagement'
        ]
      }
    };
  }

  // Default response for unrecognized queries
  return {
    title: query,
    content: "AI Analysis Results",
    data: {
      labels: ['Category A', 'Category B', 'Category C', 'Category D'],
      values: [25, 30, 20, 25],
      summary: "AI-powered analysis of the requested data",
      metrics: {
        'Total Records': '1,000',
        'Active Items': '750',
        'Processing Rate': '95%',
        'Success Rate': '98%'
      },
      insights: [
        'Data processed successfully',
        'High processing efficiency',
        'Good overall performance',
        'Stable system operation'
      ]
    }
  };
};