export const calculateImpactScore = (

    weather,

    aqi,

    ai

) => {

    let score = 0;

    score += aqi.value / 5;

    if (weather.windSpeed < 5)
        score += 20;

    if (ai.severity === "Critical")
        score += 25;

    score = Math.min(100, Math.round(score));

    let level = "Low";

    if (score >= 80)
        level = "Critical";

    else if (score >= 60)
        level = "High";

    else if (score >= 40)
        level = "Medium";

    return {

        score,

        level,

        calculatedAt: new Date(),

    };

};