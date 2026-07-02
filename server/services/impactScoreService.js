export const calculateImpactScore = (weather, aqi, ai) => {

  let score = 0;

  score += (aqi.value || 0) / 4;

  if ((weather.windSpeed || 0) < 5)
    score += 20;

  if (weather.humidity > 70)
    score += 10;

  if (ai.severity === "Critical")
    score += 30;

  if (ai.confidence > 90)
    score += 10;

  score = Math.min(100, Math.round(score));

  let level = "Low";

  if (score >= 80)
    level = "Critical";
  else if (score >= 60)
    level = "High";
  else if (score >= 40)
    level = "Moderate";

  return {
    score,
    level,
    calculatedAt: new Date(),
  };

};