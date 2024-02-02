const booksRoute = require("./booksRoute");


const routes = [
  {
    path: "/api/books",
    handler: booksRoute,
  },
  {
    path: "/api/",
    handler: (req, res) => {
      res.json({
        message: "RUET_UNKNOWNS",
      });
    },
  },
];

// Handle 404
routes.push({
  path: "*",
  handler: (req, res) => {
    res.status(404).json({ title: "404 Route not found" });
  },
});

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
