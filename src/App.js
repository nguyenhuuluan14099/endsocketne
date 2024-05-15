import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth-context";
import React, { Suspense } from "react";

const CategoryAddNew = React.lazy(() =>
  import("module/category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("module/category/CategoryMange")
);
const CategoryUpdate = React.lazy(() =>
  import("module/category/CategoryUpdate")
);
const DashboardLayout = React.lazy(() =>
  import("module/dashboard/DashboardLayout")
);

const PostAddNew = React.lazy(() => import("module/posts/PostAddNew"));
const PostManage = React.lazy(() => import("module/posts/PostManage"));
const PostUpdate = React.lazy(() => import("module/posts/PostUpdate"));
const UserAddNew = React.lazy(() => import("module/user/UserAddNew"));
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserProfile = React.lazy(() => import("module/user/UserProfile"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));

const CategoryPage = React.lazy(() => import("pages/CategoryPage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const HomePage = React.lazy(() => import("pages/HomePage"));
const NotAccessiblePage = React.lazy(() => import("pages/NotAccessiblePage"));
const NotFoundPage = React.lazy(() => import("pages/NotFoundPage"));
const PostDetailPage = React.lazy(() => import("pages/PostDetailPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route
              path="/:slug"
              element={<PostDetailPage></PostDetailPage>}
            ></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path=""
                element={<NotAccessiblePage></NotAccessiblePage>}
              ></Route>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/post-add"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="manage/user-add"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
