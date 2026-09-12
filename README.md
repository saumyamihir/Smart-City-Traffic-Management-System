# 🚦 Smart City Traffic Management System

A full-stack **Smart City Traffic Management System** that helps users find the best route between cities, visualize routes on an interactive map, check traffic conditions, estimate travel time and fuel cost, and explore nearby places.

The project uses **Graph Data Structures and Dijkstra's Algorithm** for route finding and provides an interactive frontend with a **satellite map view**.

---

## 🌟 Features

### 🗺️ Interactive Live Map

- Interactive city map using **Leaflet.js**
- Satellite map view
- Normal map view
- City markers
- Source and destination highlighting
- Route visualization on the map
- Automatic zoom to selected cities
- Automatic route fitting on the map

---

### 🚗 Smart Route Finder

Users can:

- Select a source city
- Select a destination city
- Select a vehicle
- Find the best available route
- View intermediate cities
- View total distance
- View traffic condition
- View estimated travel time
- View fuel cost

---

### 🚦 Traffic Management

The system supports different traffic conditions:

- 🟢 Low Traffic
- 🟡 Medium Traffic
- 🔴 High Traffic

Traffic conditions affect the estimated travel time.

---

### 🚙 Vehicle Support

The route system supports multiple vehicles:

- 🚗 Car
- 🏍️ Bike
- 🚌 Bus

Travel time is calculated based on vehicle speed and traffic conditions.

---

### 📍 City Highlighting

When a user selects:

- Source City → The city is highlighted with a special marker.
- Destination City → The destination is highlighted separately.

The map automatically moves and zooms to the selected city.

---

### 🛣️ Route Visualization

After clicking **Find Best Route**:

- The route is calculated using Dijkstra's Algorithm.
- The route is displayed on the map.
- Source and destination are highlighted.
- The map automatically adjusts to show the complete route.
- Intermediate cities are included in the route.

Example:

Patna ➜ Hajipur ➜ Muzaffarpur ➜ Motihari

📏 Route Information

The system displays:

📍 Source City
🎯 Destination City
🛣️ Best Route
📏 Total Distance
🚗 Vehicle
🚦 Traffic Condition
⏱️ Estimated Travel Time
⛽ Fuel Cost
📍 Nearby Places

The system can also display nearby important places for the selected destination city.

Examples include:

🏥 Hospitals
🏧 ATMs
⛽ Petrol Pumps
🍕 Restaurants
🏦 Banks
🏙️ Supported Cities

The project currently includes multiple cities from different Indian states.

Bihar
Patna
Hajipur
Muzaffarpur
Samastipur
Motihari
Bihar Sharif
Gaya
Ara
Buxar
Begusarai
Darbhanga
Madhubani
Sitamarhi
Bettiah
Bhagalpur
Purnia
Uttar Pradesh
Varanasi
Prayagraj
Lucknow
Kanpur
Agra
Noida
Jharkhand
Ranchi
Bokaro
Dhanbad
Jamshedpur
West Bengal
Kolkata
Asansol
Siliguri
Delhi & Haryana
Delhi
Gurugram
Faridabad
Punjab
Chandigarh
Ludhiana
Amritsar
🧠 Algorithms Used
1️⃣ Dijkstra's Algorithm

Dijkstra's Algorithm is used to find the shortest path between two cities.

It calculates:

Shortest route
Minimum distance
Best path between source and destination

Example:

Source → City A → City B → Destination
2️⃣ Graph Data Structure

Cities are represented as nodes.

Road connections are represented as edges.

Example:

Patna
  |
  | 20 KM
  |
Hajipur
  |
  | 52 KM
  |
Muzaffarpur

The graph stores:

City → Connected City → Distance → Traffic
3️⃣ BFS Algorithm

Breadth First Search (BFS) is used for handling nearby places.

It helps retrieve nearby location data based on the selected city.

🛠️ Technologies Used
Frontend
HTML5
CSS3
JavaScript
Leaflet.js
OpenStreetMap
Esri Satellite Map
Backend
Node.js
Express.js
REST API
CORS
Algorithms & Data Structures
Graph
Dijkstra's Algorithm
BFS Algorithm
📂 Project Structure
Smart-City-Traffic-Management-System
│
├── client
│   │
│   ├── assets
│   │   ├── HomePage.png
│   │   ├── Live Map.png
│   │   ├── Route Finder.png
│   │   ├── Route Summary.png
│   │   └── Other Project Images
│   │
│   ├── css
│   │   └── style.css
│   │
│   ├── js
│   │   ├── app.js
│   │   ├── map.js
│   │   └── theme.js
│   │
│   └── index.html
│
├── server
│   │
│   ├── algorithms
│   │   ├── bfs.js
│   │   ├── dijkstra.js
│   │   └── graph.js
│   │
│   ├── controllers
│   │   ├── cityController.js
│   │   ├── placeController.js
│   │   └── routeController.js
│   │
│   ├── data
│   │   ├── cities.js
│   │   ├── cityCoordinates.js
│   │   ├── places.js
│   │   └── roads.js
│   │
│   ├── routes
│   │   ├── city.js
│   │   ├── place.js
│   │   └── route.js
│   │
│   ├── services
│   │   └── routeService.js
│   │
│   └── server.js
│
├── README.md
│
└── Smart-City-Traffic-Management-System.pptx
⚙️ How the System Works
Step 1: Select Source City

The user selects a source city.

Example:

Patna

The map automatically highlights the selected city.

Step 2: Select Destination City

The user selects a destination city.

Example:

Varanasi

The destination city is highlighted on the map.

Step 3: Select Vehicle

Users can select:

Car
Bike
Bus

Different vehicles have different average speeds.

Step 4: Find Best Route

When the user clicks:

Find Best Route →

The frontend sends a request to:

/api/route

Example:

http://localhost:5000/api/route?source=Patna&destination=Muzaffarpur&vehicle=Car
Step 5: Route Calculation

The backend:

Reads the source city.
Reads the destination city.
Uses the Graph data structure.
Runs Dijkstra's Algorithm.
Finds the shortest available route.
Calculates traffic conditions.
Calculates estimated travel time.
Calculates fuel cost.
Sends the result to the frontend.
Step 6: Map Visualization

The frontend:

Draws the route.
Highlights source city.
Highlights destination city.
Adjusts map zoom.
Shows the complete route.
🚀 Installation and Setup
1️⃣ Clone the Repository
git clone https://github.com/saumyamihir/Smart-City-Traffic-Management-System.git

Move into the project folder:

cd Smart-City-Traffic-Management-System
🔧 Backend Setup

Move into the server folder:

cd server

Install dependencies:

npm install

Start the server:

node server.js

The backend will run on:

http://localhost:5000

You should see:

Server running at http://localhost:5000
💻 Frontend Setup

Open the client folder.

You can run the frontend using VS Code Live Server.

Using Live Server
Open the project in VS Code.
Open:
client/index.html
Right-click on index.html.
Click:
Open with Live Server

The website will open in your browser.

🔌 API Endpoints
Get All Cities
GET /api/cities

Example:

http://localhost:5000/api/cities

Response:

[
  "Patna",
  "Hajipur",
  "Muzaffarpur"
]
Find Route
GET /api/route

Example:

/api/route?source=Patna&destination=Muzaffarpur&vehicle=Car

Example Response:

{
  "path": [
    "Patna",
    "Hajipur",
    "Muzaffarpur"
  ],
  "distance": 72,
  "traffic": "Medium",
  "estimatedTime": "1 Hour 34 Min",
  "fuelCost": "360"
}
Get Nearby Places
GET /api/places

Example:

/api/places?city=Patna

Example Response:

[
  "AIIMS Hospital",
  "SBI ATM",
  "Indian Oil Petrol Pump",
  "Domino's Pizza"
]
🚦 Traffic Calculation

Traffic conditions are used to adjust travel time.

const trafficMultiplier = {
    Low: 1,
    Medium: 1.3,
    High: 1.6
};

Higher traffic results in longer travel time.

🚗 Vehicle Speed

Example vehicle speeds:

const vehicleSpeed = {
    Car: 60,
    Bike: 45,
    Bus: 40
};

The estimated travel time depends on:

Distance
+
Vehicle Speed
+
Traffic Condition
🗺️ Map Features

The system includes:

🛰️ Satellite Map
🗺️ Normal Map
📍 City Markers
🟢 Source Marker
🔴 Destination Marker
🛣️ Route Line
🔍 Automatic Zoom
📌 Interactive Popups
📸 Project Screenshots
🏠 Home Page

🗺️ Live Map

🚗 Route Finder

🛣️ Route Visualization

🚦 Route Summary

🔮 Future Improvements

The following features can be added in future versions:

🌍 Real-time traffic data
🛰️ GPS tracking
📡 Live vehicle tracking
🚨 Accident detection
🚑 Emergency vehicle priority
🤖 AI-based traffic prediction
📊 Traffic analytics dashboard
🚦 Smart traffic signal control
🛣️ Real road routing using external routing APIs
📱 Mobile application
🌐 Complete cloud deployment
⚠️ Current Limitations

Currently, the route is calculated using manually defined city connections.

The system does not yet use real-time GPS navigation data.

The route displayed on the map connects the stored city coordinates and may not exactly follow real roads.

Future versions can integrate services such as:

OpenRouteService
OSRM
Google Maps API

for real-world road navigation.

🎯 Learning Concepts Covered

This project demonstrates:

Frontend Development
Backend Development
REST APIs
Graph Data Structure
Dijkstra's Algorithm
BFS Algorithm
Route Optimization
JavaScript Fetch API
Node.js
Express.js
Interactive Maps
Satellite Maps
API Integration
👨‍💻 Author

Saumya Mihir

GitHub:

https://github.com/saumyamihir

Project Repository:

https://github.com/saumyamihir/Smart-City-Traffic-Management-System

⭐ Support

If you like this project, please consider giving the repository a ⭐ on GitHub.

🚀 Smart City Traffic Management System

Making city transportation smarter through algorithms, interactive maps, route optimization, and modern web technologies. 🚦🛣️


### Ab kya karna hai:

1. Project folder me `README.md` open kar.
2. Purana content **Ctrl + A → Delete**.
3. Upar wala pura code paste kar.
4. Save kar.
5. Phir terminal me:

bash
git add README.md
git commit -m "Update README for complete Smart City Traffic Management System"
git push origin main
