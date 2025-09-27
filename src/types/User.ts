export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: "USER" | "ADMIN"; 
}
