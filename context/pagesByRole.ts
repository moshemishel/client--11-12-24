import { User, PagesByRole } from '@/types/context/AuthContext';



// const getPagesByRole = (user: User | null): PagesByRole=> {
const getPagesByRole = (role: number, userName :string): PagesByRole=> {

    switch (role) {
        case 0: // Super admin of a app
            return [
                { name: "paymentForm", link: `/superAdmin/${userName}/paymentForm` },
                { name: "userCenter", link: `/superAdmin/${userName}/userCenter` },
                { name: "Dashboard", link: `/superAdmin/${userName}/CustomersTransactions` },
                { name: "usersDashboard", link: `/superAdmin/${userName}/usersDashboard` },
            ];
        case 10: // admin of account
        case 20: // co-owner of account
        case 50: // Store manager
        case 100: // Accountant of store
            return [
                { name: "paymentForm", link: `/${userName}/paymentForm` },
                { name: "userCenter", link: `/${userName}/userCenter` },
                { name: "Dashboard", link: `/${userName}/dashboard` },
                { name: "usersDashboard", link: `/${userName}/usersDashboard` },
            ];            
        default:
            return []; // משתמש ללא גישה
    }
}; 
export default getPagesByRole;

