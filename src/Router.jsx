import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import BrowsePage from "./pages/BrowsePage";
import CreatePage from "./pages/CreatePage";
import SelectGoodsPage from "./pages/SelectGoodsPage";
import MyGoodsPage from "./pages/MyGoodsPage";
import MyPage from "./pages/MyPage";
import OrderAllListPage from "./pages/OrderAllListPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import QuestionPage from "./pages/QuestionPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import SubscribePage from "./pages/SubscribePage";
import DeployPage from "./pages/DeployPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
        <Route path="/deploy" element={<DeployPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/selectGoods" element={<SelectGoodsPage />} />
          <Route path="/mygoods" element={<MyGoodsPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/orders" element={<OrderAllListPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
