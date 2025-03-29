import mockData from '../data/mockData.json';

class LocalDataProcessor {
  constructor() {
    this.data = mockData;
  }

  // Helper function to filter data based on conditions
  filterData(data, conditions) {
    return data.filter(item => {
      return Object.entries(conditions).every(([key, value]) => {
        if (typeof value === 'object') {
          if (value.operator === '>') return item[key] > value.value;
          if (value.operator === '<') return item[key] < value.value;
          if (value.operator === '>=') return item[key] >= value.value;
          if (value.operator === '<=') return item[key] <= value.value;
          if (value.operator === '===') return item[key] === value.value;
          if (value.operator === '!==') return item[key] !== value.value;
          if (value.operator === 'includes') return item[key].includes(value.value);
          return true;
        }
        return item[key] === value;
      });
    });
  }

  // Process natural language query
  async processQuery(query) {
    if (!query || typeof query !== 'string' || !query.trim()) {
      throw new Error('Please enter a valid query');
    }

    try {
      // Simple keyword-based query processing
      const queryLower = query.toLowerCase().trim();
      
      // Sales-related queries
      if (queryLower.includes('sales') || queryLower.includes('revenue')) {
        return {
          title: "Sales Data Analysis",
          content: "Comprehensive analysis of sales performance across different metrics",
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            values: [12000, 19000, 15000, 25000, 22000, 30000],
            summary: "Sales have shown a positive trend over the past 6 months, with significant growth in Q2.",
            metrics: {
              "Total Sales": "$123,000",
              "Average Monthly": "$20,500",
              "Growth Rate": "+25%"
            },
            insights: [
              "Q2 showed the strongest performance",
              "Monthly growth rate averaged 8%",
              "Peak sales occurred in June"
            ]
          }
        };
      }

      // Customer-related queries
      if (queryLower.includes('customer') || queryLower.includes('client')) {
        return {
          title: "Customer Database Analysis",
          content: "Analysis of customer demographics and purchasing patterns",
          data: {
            labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
            values: [150, 300, 250, 200, 100],
            summary: "Customer base shows a strong middle-aged demographic with diverse purchasing patterns.",
            metrics: {
              "Total Customers": "1,000",
              "Average Age": "35",
              "Active Customers": "850"
            },
            insights: [
              "26-35 age group is largest segment",
              "High customer retention rate",
              "Diverse age distribution"
            ]
          }
        };
      }

      // Inventory-related queries
      if (queryLower.includes('inventory') || queryLower.includes('stock')) {
        return {
          title: "Inventory Status Report",
          content: "Current inventory levels and stock analysis",
          data: {
            labels: ['Electronics', 'Clothing', 'Books', 'Food', 'Sports'],
            values: [150, 300, 200, 400, 250],
            summary: "Inventory levels are well-maintained across all categories with optimal stock levels.",
            metrics: {
              "Total Items": "1,300",
              "Average Stock": "260",
              "Stock Value": "$45,000"
            },
            insights: [
              "Food category has highest inventory",
              "Electronics show lowest stock levels",
              "Overall inventory health is good"
            ]
          }
        };
      }

      // Order-related queries
      if (queryLower.includes('order')) {
        let orders = [...this.data.orders];
        return {
          title: "Order Analysis",
          content: "Analysis of order patterns and status",
          data: {
            labels: ['Processing', 'Completed', 'Cancelled', 'Pending'],
            values: [30, 150, 20, 10],
            summary: "Order processing shows high completion rate with minimal cancellations.",
            metrics: {
              "Total Orders": "210",
              "Completion Rate": "71.4%",
              "Average Value": "$250"
            },
            insights: [
              "High order completion rate",
              "Low cancellation rate",
              "Efficient processing system"
            ]
          }
        };
      }

      // Product-related queries
      if (queryLower.includes('product') || queryLower.includes('item')) {
        return {
          title: "Product Analysis",
          content: "Overview of product categories and performance",
          data: {
            labels: ['Electronics', 'Clothing', 'Books', 'Food', 'Sports'],
            values: [200, 300, 150, 400, 250],
            summary: "Product categories show balanced distribution with strong performance across all sectors.",
            metrics: {
              "Total Products": "1,300",
              "Categories": "5",
              "Average Price": "$45"
            },
            insights: [
              "Balanced category distribution",
              "Strong product diversity",
              "Competitive pricing strategy"
            ]
          }
        };
      }

      // Default response for unrecognized queries
      return {
        title: "General Analysis",
        content: "Overview of key business metrics",
        data: {
          labels: ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4', 'Metric 5'],
          values: [100, 150, 200, 250, 300],
          summary: "General overview of business performance across key metrics.",
          metrics: {
            "Total Revenue": "$500,000",
            "Active Users": "2,500",
            "Conversion Rate": "3.2%"
          },
          insights: [
            "Overall performance is stable",
            "Positive growth in key metrics",
            "Room for improvement in some areas"
          ]
        }
      };
    } catch (error) {
      console.error('Error in Local Data Processor:', error);
      throw new Error(error.message || 'Failed to process local database query');
    }
  }
}

// Export a singleton instance
export default new LocalDataProcessor();

// Export the runDatabaseQuery function that uses the singleton instance
export const runDatabaseQuery = async (query) => {
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
      content: "Analysis of Vivo projects in India",
      data: {
        labels: ['Smartphones', 'Accessories', 'Service Centers', 'R&D Centers', 'Manufacturing Units'],
        values: [45, 20, 15, 10, 10],
        summary: "Vivo's presence in India includes various projects across different sectors.",
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
  if (lowerQuery.includes('sales')) {
    return {
      title: query,
      content: "Sales Analysis Report",
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        values: [120, 150, 180, 200],
        summary: "Quarterly sales performance analysis",
        metrics: {
          'Total Sales': '₹650 Cr',
          'Growth Rate': '15%',
          'Average Order Value': '₹25,000',
          'Customer Count': '2,500'
        },
        insights: [
          'Consistent quarter-over-quarter growth',
          'Strong performance in Q4',
          'Increasing average order value',
          'Growing customer base'
        ]
      }
    };
  }

  if (lowerQuery.includes('inventory')) {
    return {
      title: query,
      content: "Inventory Status Report",
      data: {
        labels: ['In Stock', 'Low Stock', 'Out of Stock', 'Discontinued'],
        values: [60, 20, 15, 5],
        summary: "Current inventory status across categories",
        metrics: {
          'Total SKUs': '1,500',
          'Stock Value': '₹450 Cr',
          'Turnover Rate': '4.2',
          'Stockout Rate': '3%'
        },
        insights: [
          'Healthy inventory levels',
          'Low stockout rate',
          'Efficient stock management',
          'Regular inventory updates'
        ]
      }
    };
  }

  if (lowerQuery.includes('customer')) {
    return {
      title: query,
      content: "Customer Analysis Report",
      data: {
        labels: ['New', 'Regular', 'VIP', 'Inactive'],
        values: [30, 45, 15, 10],
        summary: "Customer segment analysis",
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
    content: "Query Analysis Results",
    data: {
      labels: ['Category A', 'Category B', 'Category C', 'Category D'],
      values: [25, 30, 20, 25],
      summary: "Analysis of the requested data",
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