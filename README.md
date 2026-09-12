# 🚦 Smart City Traffic Management System

A modern web-based **Smart City Traffic Management System** that helps users find the best route between cities, visualize routes on an interactive live map, check traffic conditions, estimate travel time and fuel cost, and explore nearby places.

The project uses **Graph Data Structures and Dijkstra's Algorithm** for route finding and provides an interactive frontend with a satellite map interface.

---

## 🌐 Live Features

The system allows users to:

- Select a source city
- Select a destination city
- Choose a vehicle type
- Find the best available route
- View the route on an interactive map
- Highlight source and destination cities
- Check route distance
- View estimated travel time
- Check traffic conditions
- Calculate estimated fuel cost
- View nearby places
- Switch between map layers
- Use satellite map view
- Use light and dark mode
- Explore multiple cities across different Indian states

---

# ✨ Features

## 🗺️ Interactive Live Map

The application uses an interactive map to display cities and routes.

Features include:

- Satellite map view
- Normal map view
- City labels
- City markers
- Source city highlighting
- Destination city highlighting
- Automatic zoom to selected cities
- Automatic route fitting
- Route visualization

---

## 🚦 Smart Route Finding

The system finds the best route between selected cities using graph-based algorithms.

Example: Patna → Hajipur → Muzaffarpur → Motihari

The route is displayed both as:
Route summary
Interactive map route

🧠 Algorithms Used :

Dijkstra's Algorithm : Used to find the shortest route between two cities based on distance.

Source City
     ↓
Graph Traversal
     ↓
Shortest Distance Calculation
     ↓
Best Route

BFS (Breadth First Search) : Used for nearby place searching.

The system retrieves nearby locations associated with a selected city.

Example:

City
 ↓
Nearby Places
 ↓
Hospital
ATM
Petrol Pump
Restaurant

🌆 Multiple Cities

The system supports cities from multiple Indian states.

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

🚗 Vehicle Support

Users can select different vehicle types.

Currently supported:

🚗 Car
🏍️ Bike
🚌 Bus

The estimated travel time is calculated according to the selected vehicle speed and traffic conditions.

🚦 Traffic System

The application supports different traffic levels.

🟢 Low Traffic

Fast travel conditions.

🟡 Medium Traffic

Moderate traffic conditions.

🔴 High Traffic

Slow travel conditions.

Traffic conditions affect the estimated travel time.

📊 Route Summary

After finding a route, the system displays:

📍 Source City

🎯 Destination City

🛣️ Best Route

📏 Distance

🚗 Vehicle

🚦 Traffic Level

⏱️ Estimated Travel Time

⛽ Estimated Fuel Cost

📍 Nearby Places

The application can display nearby places for the destination city.

Examples include:

🏥 Hospitals
🏧 ATMs
⛽ Petrol Pumps
🍕 Restaurants
🏦 Banks
🌙 Dark Mode

The application includes a modern theme switching system.

Users can switch between:

☀️ Light Mode

and

🌙 Dark Mode

The interface automatically updates its colors and appearance.

🗺️ Map Features

The project uses Leaflet.js for map visualization.

Available map layers include:

🛰️ Satellite Map
🗺️ Normal Map
📍 City Labels

The satellite layer provides a realistic geographical view including:

Roads
Rivers
Forest areas
Terrain
Buildings

🛠️ Technologies Used :

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
CORS

Algorithms
Graph Data Structure
Dijkstra's Algorithm
Breadth First Search (BFS)

📁 Project Structure :

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
│   ├── server.js
│   └── package.json
│
├── README.md
│
├── Smart-City-Traffic-Management-System.pptx
│
└── Internship Project Report.pdf

⚙️ Installation
1. Clone the Repository
git clone https://github.com/saumyamihir/Smart-City-Traffic-Management-System.git
Move into the project folder:
cd Smart-City-Traffic-Management-System

🖥️ Backend Setup
Move to the server folder:
cd server
Install dependencies:
npm install
Start the server:
node server.js
The backend will run on:
http://localhost:5000
Test the backend:
http://localhost:5000

🌐 API Endpoints
Get All Cities
GET /api/cities

Example:
http://localhost:5000/api/cities
Find Best Route
GET /api/route

Parameters:
source
destination
vehicle

Example:
http://localhost:5000/api/route?source=Patna&destination=Motihari&vehicle=Car
Get Nearby Places
GET /api/places
Example:
http://localhost:5000/api/places?city=Patna

▶️ Frontend Setup
Open the client folder.
The frontend can be run using:
VS Code Live Server
A local development server
Netlify deployment
Open:
client/index.html
For best results, use the Live Server extension in VS Code.

🔄 How the System Works

User Selects Source City
          │
          ▼
User Selects Destination
          │
          ▼
Select Vehicle
          │
          ▼
Find Best Route
          │
          ▼
Backend API Request
          │
          ▼
Graph Data Structure
          │
          ▼
Dijkstra Algorithm
          │
          ▼
Best Route Found
          │
          ├───────────────┐
          ▼               ▼
Route Summary       Live Map Route
          │
          ▼
Traffic + Time + Fuel Cost
          │
          ▼
Nearby Places

🧮 Route Calculation

The system calculates travel time based on:

Distance
+
Vehicle Speed
+
Traffic Condition

Example traffic multiplier:

Low Traffic     → Normal Speed

Medium Traffic  → Moderate Delay

High Traffic    → Higher Delay
🎨 User Interface Features

The application provides a modern and responsive interface.

Features include:

Professional navigation bar
Responsive layout
Animated UI components
Light and dark theme
Interactive route finder
Satellite map
Route summary cards
Traffic badges
Automatic scrolling to route map
Source and destination markers
🚀 Future Improvements

Future versions of the project can include:
Real-time traffic data
Google Maps API integration
Real road route geometry
Live GPS tracking
Traffic camera integration
Accident detection
Emergency vehicle route priority
AI-based traffic prediction
Real-time weather integration
Public transport routes
Database integration
User authentication
Mobile application
Real-time notifications
📸 Project Screenshots

Screenshots of the project are available in:

client/assets/
Including:
Home Page
Live Map
Route Finder
Route Summary
City Working Map

👨‍💻 Developer
Saumya Mihir,Naureen,Shubham Yadav

GitHub:

Saumya Mihir on GitHub

⭐ Support

If you like this project, please consider giving the repository a ⭐.

📄 License

This project is developed for educational and academic purposes.

🚦 Smart City Traffic Management System

Find Smart Routes. Save Time. Travel Better.

