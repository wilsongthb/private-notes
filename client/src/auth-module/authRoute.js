export const authRoute = {
  path: "/login",
  name: "login",
  component: () => import("./Login.vue"),
  props: {
    afterLogged: ({ $router, $route, $store }) => {
      $store.dispatch("authAfterLogged").then(() => {
        $router.push($route.query.redirect || "/");
      });
    }
  }
};
