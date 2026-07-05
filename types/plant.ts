export type PlantType = {
  id: string;
  code: string;
  name: string;
  scientific_name: string | null;
  description: string | null;
  benefits: string | null;
  symbolism: string | null;
  care_water: string | null;
  care_light: string | null;
  care_soil: string | null;
  care_temperature: string | null;
  image_url: string | null;
};