import { User, PagesByRole } from '@/types/context/AuthContext';

const getPagesByRole = (user: User | null): PagesByRole=> {
    if (user === null) {
        return [];
    }
    switch (user.role) {
        case 10: // Super admin of a store
        case 50: // Admin of a store
            return [
                { name: "paymentForm", link: `/${user.userName}/paymentForm` },
                { name: "userCenter", link: `/${user.userName}/userCenter` },
                { name: "Dashboard", link: `/${user.userName}/dashboard` },
            ];
        case 100: // Super admin of the entire system
            return [
                { name: "paymentForm", link: `/superAdmin/${user.userName}/paymentForm` },
                { name: "userCenter", link: `/superAdmin/${user.userName}/userCenter` },
                { name: "Customers’ Transactions", link: `/superAdmin/${user.userName}/Customers’-Transactions` },
            ];
        default:
            return []; // משתמש ללא גישה
    }
}; 

export default getPagesByRole;