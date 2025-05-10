import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, PATCH, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/places", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/places.json");

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {
  const placeId = req.body.placeId;

  const fileContent = await fs.readFile("./data/places.json");
  const placesData = JSON.parse(fileContent);

  const place = placesData.find((place) => place.id === placeId);

  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent);

  let updatedUserPlaces = userPlacesData;

  if (!userPlacesData.some((p) => p.id === place.id)) {
    updatedUserPlaces = [...userPlacesData, place];
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
});

app.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id;

  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent);

  const placeIndex = userPlacesData.findIndex((place) => place.id === placeId);

  let updatedUserPlaces = userPlacesData;

  if (placeIndex >= 0) {
    updatedUserPlaces.splice(placeIndex, 1);
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
});

const stringFilePath = "./data/strings.json";

// GET endpoint to retrieve the string
app.get("/strings", async (req, res) => {
  try {
    const fileContent = await fs.readFile(stringFilePath, "utf-8");
    const data = JSON.parse(fileContent);
    res.status(200).json({ string: data.string });
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(200).json({ string: "" }); // Return empty string if file doesn't exist
    } else {
      res.status(500).json({ message: "Failed to read the string" });
    }
  }
});

// POST endpoint to save a new string
app.post("/strings", async (req, res) => {
  const newString = req.body.string;

  if (!newString || typeof newString !== "string") {
    return res.status(400).json({ message: "Invalid string provided" });
  }

  try {
    await fs.writeFile(stringFilePath, JSON.stringify({ string: newString }));
    res.status(201).json({ message: "String saved successfully", string: newString });
  } catch (error) {
    res.status(500).json({ message: "Failed to save the string" });
  }
});

// PATCH endpoint to update the string
app.patch("/strings", async (req, res) => {
  const updatedString = req.body.string;

  if (!updatedString || typeof updatedString !== "string") {
    return res.status(400).json({ message: "Invalid string provided" });
  }

  console.log("Receiving PATCH in the route /strings");
  console.log("Datas received:", req.body);

  console.log('Receiving PATCH with datas:', req.body);

  try {
    const fileContent = await fs.readFile(stringFilePath, "utf-8");
    const data = JSON.parse(fileContent);

    data.string = updatedString;

    await fs.writeFile(stringFilePath, JSON.stringify(data));
    res.status(200).json({ message: "String updated successfully", string: updatedString });
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({ message: "String not found" });
    } else {
      res.status(500).json({ message: "Failed to update the string" });
    }
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
