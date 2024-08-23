# Air Quality Tracker
=====================

Overview
-----------

The Air Quality Tracker is a web application that allows users to select a city and view its air quality data. The application is built using modern web technologies and follows best practices for development and optimization.

Tech Stack
-------------

* **Frontend**: HTML, CSS, JavaScript (ES6+)
* **Build Tool**: Webpack
* **Transpiler**: Babel
* **CSS Preprocessor**: None (using vanilla CSS)
* **Image Optimization**: Webpack's built-in image optimization

Why this Tech Stack?
-----------------------

I chose this tech stack because it provides a modern and efficient way to build and deploy web applications. HTML, CSS, and JavaScript are the foundation of the web, and using ES6+ syntax ensures that the code is compatible with modern browsers. Webpack is a popular build tool that allows for efficient bundling and optimization of code. Babel is used to transpile modern JavaScript code to older syntax for browser compatibility. Finally, using vanilla CSS eliminates the need for a CSS preprocessor, keeping the tech stack simple and lightweight.

Approach
----------

I followed a modular approach to building the application, breaking down the code into smaller, reusable components. This made it easier to maintain and update the codebase. I also used a data-driven approach, extracting data from an external JSON file and using JavaScript to dynamically render the data in the UI.

Building and Running
----------------------

To build and run the application, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/iSaurabhMeshram28/airquality
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Build the application:

```bash
npm run build
```

### 4. Start the development server:

```bash
npm run start
```

### 5. Open the application in your browser:

```bash
http://localhost:9000
```


Tackling Problems
-------------------

During development, I encountered several challenges, including:

* **Optimizing image loading**: I used Webpack's built-in image optimization to compress images and reduce page load times.
* **Handling city data**: I used a data-driven approach to store city data in an external JSON file, making it easier to update and maintain.
* **Debouncing city list updates**: I used a debouncing function to limit the rate of city list updates, improving performance and reducing unnecessary computations.

Optimizations
----------------

To optimize the code:

* **Used efficient data structures**: I used arrays and objects to store data, reducing memory allocation and improving performance.
* **Minimized DOM manipulation**: I used JavaScript to dynamically render data in the UI, reducing the number of DOM mutations and improving performance.
* **Optimized image loading**: I used Webpack's built-in image optimization to compress images and reduce page load times.

