import Duke from "../assets/Duke.jpg";
import Activa6G from "../assets/Activa_6G.jpg";
import R15 from "../assets/R15.jpeg";
import Classic from "../assets/classic_350.jpeg";

const bikes = [
  {
    id: 1,
    name: "Royal Enfield Classic",
    location: "Karimnagar",
    price: 200,
    rating:4.5,
    images: [Classic, Classic, Classic],
  },
  {
    id: 2,
    name: "KTM Duke 200",
    location: "Karimnagar",
    price: 180,
    rating:4.3,
    images: [Duke,Duke,Duke],
  },
  {
    id: 3,
    name: "Activa 6G",
    location: "Karimnagar",
    price: 100,
    rating:4.1,
    images: [Activa6G,Activa6G,Activa6G],
  },
  {
    id: 4,
    name: "Yamaha R15",
    location: "Karimnagar",
    price: 220,
    rating:4.9,
    images: [R15,R15,R15],
  },
];

export default bikes