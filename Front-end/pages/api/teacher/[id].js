import asyncHandler from "@/libs/async.handler";

const headers = new Headers();
headers.append("Authorization", `Basic ${btoa(`${"admin"}:${"admin"}`)}`);
headers.append("Content-Type", "application/json");

const url = "http://localhost:8080/teacher";

const controllers = {
  GET: asyncHandler(async (req, res) => {
    const { id } = req.query; // Accede al parámetro 'id'
   
    const requestOptions = {
      headers: headers,
    };

    try {
      const response = await fetch(`${url}/${id}`, requestOptions);

      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }),
  PATCH: asyncHandler(async (req, res) => {
    const { id } = req.query; // Accede al parámetro 'id'
    const data = req.body;

    const requestOptions = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(`${url}/${id}`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(400).json({ message: "Bad Request" });
    }
  }),
  DELETE: asyncHandler(async (req, res) => {
    const { id } = req.query; // Accede al parámetro 'id'

    const requestOptions = {
      method: "DELETE",
      headers: headers
    };

    try {
      const response = await fetch(`${url}/${id}`, requestOptions);
      if (response.ok) {
        res.status(200).json({ message: "Eliminado correctamente" });
      }
    } catch (error) {
      res.status(400).json({ message: "Bad Request" });
    }
  }),
};

export default function handler(req, res) {
  const controller = controllers[req.method];
  if (controller) {
    controller(req, res);
  } else {
    res.status(405).json({
      messge: "Method not allowed",
    });
  }
}
