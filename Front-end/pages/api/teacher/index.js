import asyncHandler from "@/libs/async.handler";
import { hasAccessToken } from "@/utilities/utility";

const headers = new Headers();
headers.append("Authorization", `Basic ${btoa(`${"admin"}:${"admin"}`)}`);
headers.append("Content-Type", "application/json");

const url = "http://localhost:8080/teacher";

const controllers = {
  GET: asyncHandler(async (req, res) => {
    const requestOptions = {
      headers: headers,
    };

    try {
      const response = await fetch(`${url}`, requestOptions);

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }),
  POST: asyncHandler(async (req, res) => {
    const data = req.body;

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`${url}`, requestOptions);
      if (response.ok) {
        const resJson = await response.json();
        res.status(200).json(resJson);
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }),
};

export default function handler(req, res) {
  const controller = controllers[req.method];

  if (controller) {
    controller(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
