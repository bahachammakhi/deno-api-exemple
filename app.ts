import {
  Application,
  Router,
  send,
  Context,
} from "https://deno.land/x/oak/mod.ts";
import {
  CreateNewUser,
  getUser,
  updateUser,
  GetUsers,
} from "./controllers/usersControllers.ts";

const router = new Router();
router.post("/create", CreateNewUser);
router.get("/users", GetUsers);
router.get("/user/:id", getUser);
router.post("/user/:id", updateUser);
const app = new Application();
app.use(async (context: Context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});
app.use(router.routes());
app.use(router.allowedMethods());
console.log("App listening on port 8000");
await app.listen({ port: 8000 });
