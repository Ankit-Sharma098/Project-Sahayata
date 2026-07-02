export const analyzePollution = async (imageUrl) => {

  // Temporary AI Mock
  // Later Gemini API se replace karenge

  return {

    predictedCategory: "Industrial Smoke",

    confidence: 98,

    severity: "Critical",

    recommendation:
      "Deploy Water Mist Cannon and restrict heavy vehicles.",

    healthRisk:
      "High risk for children, elderly and asthma patients.",

    suggestedAuthority:
      "Municipal Corporation & Pollution Control Board",

  };

};