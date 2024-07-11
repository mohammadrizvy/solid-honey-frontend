import { 
    Codepen, 
    ContactRound, 
    DollarSign, 
    RotateCcw, 
    ShoppingCart, 
    UserCog, 
    Users 
} from "lucide-react";

export const dashboardCard = [
    {
        title: "কাস্টমার",
        value: "28",
        icon: Users

    },
    {
        title: "সাপ্লাইয়ার",
        value: "30",
        icon: UserCog

    },

    {
        title: "কর্মী",
        value: "30",
        icon: ContactRound

    },

    {
        title: "আউটলেট",
        value: "30",
        icon: Codepen

    },

    {
        title: "বিক্রয়",
        value: "30",
        icon: DollarSign

    },

    {
        title: "রিটার্ন পণ্য",
        value: "30",
        icon: RotateCcw

    }
]


const status = {
    paid: "PAID",
    unpaid: "UNPAID"
}

const method = {
    online: "ONLINE",
    cash: "CASH"
}
export const products = [
    {
        name: "k-50",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "BKD-DF",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "DDFA",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "BALER PRO",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "CH-10",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "k-50",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "BKD-DF",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "DDFA",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "BALER PRO",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "k-50",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "BKD-DF",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "DDFA",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
    {
        name: "BALER PRO",
        status: status.paid,
        method: method.cash,
        date: new Date().toLocaleDateString(),
        totalAmount: 10000
    },
]