export default interface FilterModel {
  maxPrice: number;
  minPrice: number;
  brand: string;
  category: string;
  vendor?: string;
  color?: string;
  limit?: number;
}
