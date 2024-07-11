import { 
  ContactRound, 
  DollarSign, 
  Home, 
  MessageCircle, 
  ShoppingBasketIcon, 
  ShoppingCart, 
  UserCog, 
  Users 
} from "lucide-react";
import { LiaFileInvoiceSolid } from "react-icons/lia";

export const sidebar = [
  {
    nav_name: "ড্যাশবোর্ড",
    nav_Link: "/",
    icon: Home,
  },

  {
    nav_name: "প্রোডাক্ট",
    children: [
      {
        nav_name: "প্রোডাক্ট প্রসেস",
        nav_Link: "/products-process",
        icon: ShoppingBasketIcon
      },
      {
        nav_name: "ক্রয়",
        nav_Link: "/products/buy",
        icon: ShoppingCart,
      },
      {
        nav_name: "বিক্রয়",
        nav_Link: "/products/sell",
        icon: DollarSign,
      },
     
      
    ]
  },


  {
    nav_name: "হিসাব",
    children: [
      {
        nav_name: "কাস্টমার",
        nav_Link: "/account/customers",
        icon: Users
      },
      {
        nav_name: "সাপ্লাইয়ার",
        nav_Link: "/account/suppliers",
        icon: UserCog,
      },
      {
        nav_name: "কর্মী",
        nav_Link: "/account/workers",
        icon: ContactRound,
      },
      
    ]
  },

  {
    nav_name: "অন্যন্য",
    children: [
      {
        nav_name: "ক্যাটাগরি",
        nav_Link: "/others/category",
        icon: Users
      },
      {
        nav_name: "মেসেজ",
        nav_Link: "/others/message",
        icon: MessageCircle
      },
      // {
      //   nav_name: "সাপ্লাইয়ার",
      //   nav_Link: "/others/suppliers",
      //   icon: UserCog,
      // },
      // {
      //   nav_name: "কর্মী",
      //   nav_Link: "/others/workers",
      //   icon: ContactRound,
      // },
      
    ]
  },
];
