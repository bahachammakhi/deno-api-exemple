import { Context } from "https://deno.land/x/oak/mod.ts";
import { db } from "../server.ts";
import { BodyJson } from "https://deno.land/x/oak/request.ts";
const users = db.collection("users");

interface requestBody {
  username: String;
  name: String;
}
export const CreateNewUser = async (context: Context, next: any) => {
  // getting the body of the request
  const body = await context.request.body({
    contentTypes: {
      json: ["application/json"],
    },
  });
  const value: requestBody = body.value;
  const result = await users.insertOne(
    value,
  );
  if (!result) {
    context.response.body = "Error !";
    next();
  }
  console.log("Done !");
  context.response.status = 200;
  context.response.body = { status: "Success" };
};

export const GetUsers = async (context: any, next: any) => {
  const result = await users.find();
  console.log("Done !");
  context.response.status = 200;
  context.response.body = result;
};

export const updateUser = async (context: any, next: any) => {
  const body = await context.request.body({
    contentTypes: {
      json: ["application/json"],
    },
  });
  const value: requestBody = body.value;
  const id: String = context.params.id;
  const result = await users.updateOne({ _id: { $oid: id } }, value);
  if (!result) {
    context.response.body = "Error !";
    next();
  }
  console.log("Done !");
  context.response.status = 200;
  context.response.body = { status: "Success" };
};

export const getUser = async (context: any, next: any) => {
  const id: String = context.params.id;
  const result = await users.findOne({ _id: { $oid: id } });
  console.log("Done !", result);
  context.response.status = 200;
  context.response.body = result;
};
