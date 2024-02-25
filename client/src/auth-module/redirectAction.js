function redirectAction(bind) {
  bind.$store.dispatch("setup").then(() => {
    if (bind.$route.query.redirect) {
      bind.$router.push(bind.$route.query.redirect);
    } else {
      bind.$router.push({
        name: "home"
      });
    }
  });
}

export default redirectAction;
