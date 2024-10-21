export interface Recommendation {
  text: string;
  author: string;
}

export interface RecommendationCardProps {
  recommendations: recommendation[];
}
