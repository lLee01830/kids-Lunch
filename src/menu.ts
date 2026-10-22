export type MenuCategory = "Breakfast" | "Lunch boxes" | "Snacks" | "Drinks";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  emoji: string;
  color: string;
  lunchbox?: boolean;
  note?: string;
};

export const menu: MenuItem[] = [
  { id: "breakfast-sandwich", name: "Mini breakfast sandwich", description: "A cheerful start to the school day.", price: 25, category: "Breakfast", emoji: "🥪", color: "peach" },
  { id: "yoghurt-fruit-cup", name: "Yoghurt and fruit cup", description: "Cool, creamy and full of fruity colour.", price: 22, category: "Breakfast", emoji: "🍓", color: "pink" },
  { id: "mini-pancakes", name: "Mini pancakes", description: "Little fluffy pancakes for a bright start.", price: 28, category: "Breakfast", emoji: "🥞", color: "yellow" },
  { id: "chicken-mayo", name: "Chicken mayo sandwich lunchbox", description: "A lunchbox favourite, made for little hands.", price: 40, category: "Lunch boxes", emoji: "🥪", color: "green", lunchbox: true },
  { id: "cheese-tomato", name: "Cheese and tomato sandwich", description: "A simple, tasty lunchtime classic.", price: 32, category: "Lunch boxes", emoji: "🍅", color: "peach", lunchbox: true },
  { id: "chicken-wrap", name: "Chicken wrap", description: "A soft wrap with a satisfying filling.", price: 45, category: "Lunch boxes", emoji: "🌯", color: "yellow", lunchbox: true },
  { id: "beef-burger", name: "Beef burger lunchbox", description: "A mini burger for a big lunchtime smile.", price: 48, category: "Lunch boxes", emoji: "🍔", color: "pink", lunchbox: true },
  { id: "mac-cheese", name: "Macaroni and cheese", description: "A warm, comforting bowl of pasta.", price: 38, category: "Lunch boxes", emoji: "🧀", color: "yellow", lunchbox: true },
  { id: "chicken-rice", name: "Chicken strips with rice", description: "A familiar favourite with a filling side.", price: 45, category: "Lunch boxes", emoji: "🍗", color: "peach", lunchbox: true },
  { id: "mini-pizza", name: "Mini pizza with fruit", description: "A little pizza with a fruity finish.", price: 40, category: "Lunch boxes", emoji: "🍕", color: "green", lunchbox: true },
  { id: "fruit-cup", name: "Fresh fruit cup", description: "A colourful cup of seasonal fruit.", price: 15, category: "Snacks", emoji: "🍇", color: "pink" },
  { id: "popcorn", name: "Popcorn", description: "A light, crunchy snack for break time.", price: 10, category: "Snacks", emoji: "🍿", color: "yellow" },
  { id: "yoghurt", name: "Yoghurt", description: "A handy little snack for the school bag.", price: 12, category: "Snacks", emoji: "🥣", color: "peach" },
  { id: "ice-cream", name: "Ice cream", description: "A cool, creamy treat for a happy break.", price: 15, category: "Snacks", emoji: "🍦", color: "pink" },
  { id: "water", name: "Bottled water", description: "A refreshing drink to keep them going.", price: 10, category: "Drinks", emoji: "💧", color: "blue" },
  { id: "fruit-juice", name: "Fruit juice", description: "A fruity lunchbox drink.", price: 15, category: "Drinks", emoji: "🧃", color: "yellow" },
  { id: "strawberry-milkshake", name: "Strawberry milkshake", description: "A smooth, fruity milkshake made with strawberry.", price: 25, category: "Drinks", emoji: "🥤", color: "pink" },
  { id: "chocolate-milkshake", name: "Chocolate milkshake", description: "A cool, creamy chocolate milkshake.", price: 25, category: "Drinks", emoji: "🥤", color: "brown" },
  { id: "vanilla-milkshake", name: "Vanilla milkshake", description: "A classic, creamy vanilla milkshake.", price: 25, category: "Drinks", emoji: "🥤", color: "yellow" },
  { id: "banana-milkshake", name: "Banana milkshake", description: "A smooth, creamy milkshake with banana.", price: 25, category: "Drinks", emoji: "🥤", color: "yellow" },
];

export const delivery = {
  singleLearnerFee: 10,
  multipleLunchboxesFee: 15,
  freeDeliveryThreshold: 250,
};

export const business = {
  name: "Happy Lunchbox",
  slogan: "Little Tummies. Big Smiles!",
  phone: "+27684429460",
  email: "mthutlane@gmail.com",
  whatsapp: "+27684429460",
  hours: "Add your business hours",
  serviceNote: "Delivery depends on your school's location and our delivery schedule. Please confirm your school is on a participating route.",
};

export const categories = ["All", "Breakfast", "Lunch boxes", "Snacks", "Drinks"] as const;
