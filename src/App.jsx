import { Route, Routes } from "react-router-dom"
import DashboardLayout from "./layouts/dashboardLayout"
import DashboardPage from "./pages/dashboardPage"
import ProductsPage from "./pages/productsPage"
import BuyPage from "./pages/buyPage"
import SellPage from "./pages/sellPage"
import WorkerPage from "./pages/workerPage"
import CaregoryPage from "./pages/categoryPage"
import SupplierPage from "./pages/supplierPage"
import CustomerPage from "./pages/customersPage"
import MyAccountPage from "./pages/profilepages/myAccountPage"
import SettingsPage from "./pages/profilepages/settingsPage"
import ProductProcess from "./pages/productsPage/productProcess"
import SendMessagePage from "./pages/sendMessagePage"
import AttendacePage from "./pages/workerPage/attendancePage"
import TransactionPage from "./pages/customersPage/transactionPage"
import Invoice from "./components/landing/invoice"
import Preview from "./components/landing/preview"
import SupplierListPage from "./pages/supplierListPage"
import CustomerDetails from "./pages/CustomerDetails"
import WorkersDetails from "./pages/workerPage/WorkersDetails/WorkersDetails"
import LoginPage from "./pages/LoginPage/LoginPage"
import SellHistoryPage from "./pages/SellHistoryPage/SellHistoryPage"


function App() {


  return (
    <Routes>


      {/* LoginPage  */}

      <Route path="/login" element={<LoginPage />} />

      {/* invoice */}
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/preview" element={<Preview />} />

      <Route path="/" element={<DashboardLayout />} >

        {/* dashboard page */}
        <Route index element={<DashboardPage />} />

        {/* product page */}
        <Route path="/products-process" element={<ProductsPage />} />
        <Route path="/products-process/:id" element={<ProductProcess />} />

        {/* buy page */}
        <Route path="/products/buy" element={<BuyPage />} />

        {/* sell page */}
        <Route path="/products/sell" element={<SellPage />} />
        {/* sell history page */}
        <Route path="/sellHistory" element={<SellHistoryPage />} />



        {/* worker page */}
        <Route path="/account/workers" element={<WorkerPage />} />
        <Route path="/account/workers/:workerId" element={<WorkersDetails />} />

        <Route path="/account/workers/attendance" element={<AttendacePage />} />


        // {/* atttandace */}

        {/* category page */}
        <Route path="/others/category" element={<CaregoryPage />} />

        {/* supplier page */}
        {/* <Route path="/account/suppliers" element={<SupplierPage />} /> */}
        <Route path="/account/suppliers" element={<SupplierListPage />} />
        <Route path="/account/suppliers/:productId" element={<SupplierPage />} />


        {/* customer page */}
        <Route path="/account/customers" element={<CustomerPage />} />
        <Route path="/account/customers/:customerId" element={<CustomerDetails />} />

        <Route path="/account/customer/transaction" element={<TransactionPage />} />



        {/* My Account page */}
        <Route path="/profile" element={<MyAccountPage />} />

        {/* Settings page */}
        <Route path="/profile/settings" element={<SettingsPage />} />



        <Route path="/others/message" element={<SendMessagePage />} />












      </Route>
    </Routes>
  )
}

export default App
