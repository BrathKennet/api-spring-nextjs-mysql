import asyncHandler from "@/libs/async.handler";
import { hasAccessToken } from "@/utilities/utility";

const headers = new Headers();
headers.append("Authorization", `Basic ${btoa(`${"admin"}:${"admin"}`)}`);
headers.append("Content-Type", "application/json");

const url = "http://localhost:8080/user";

const controllers = {
  POST: asyncHandler(async (req, res) => {
    const data = req.body;

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    if (data.type === "login") {
      try {
        const response = await fetch(`${url}/login`,requestOptions);
        if (response.ok) {
          const accessToken = await response.text();
          res.status(200).json({ accessToken: accessToken });
        }
      } catch (error) {
        res.status(400).json({ message: "Bad Request" });
      }

    } else if (data.type === "signin") {
      try {
        const response = await fetch(`${url}/sign_in`, requestOptions);
        if (response.ok) {
          const accessToken = await response.text();
          res.status(200).json({ accessToken: accessToken });
        }
      } catch (error) {
        res.status(400).json({ message: "Bad Request" });
      }
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  })
};

export default function handler(req, res) {
  const controller = controllers[req.method];

  if (controller) {
    controller(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}