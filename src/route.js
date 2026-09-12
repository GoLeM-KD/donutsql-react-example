import { route } from "@react-router/dev/routes";

export default [
  route("/", "./views/Home.jsx"),
  route("/transaction", "./views/Transaction.jsx"),
  route("/procedure", "./views/Procedure.jsx"),
];
