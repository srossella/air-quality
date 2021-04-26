[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]

<br />
<p align="center">

  <h1 align="center">Air Quality Data</h1>

  <h3 align="center">
    Get air quality data for any specific location in the world.
  </h3>
</p>



<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


## About The Project

![Product Name Screen Shot](build/img/screenshot.PNG)

This is a simple website that displays data about the air quality in a specific city or location. It fetches data from [AQICN](aqicn.org) through their [API](https://aqicn.org/api/).
Data can be retrieved through geolocation or manual input of a city name. When geolocation is used, data of the closest station are shown. 
A map made with [Leaflet](https://leafletjs.com/) is also displayed with a marker placed in the station location. 

This project is deployed and accessible at [epic-cray-3682ff.netlify.app](https://epic-cray-3682ff.netlify.app/). 
If you prefer to run a local copy please follow the steps below.

### Built With

* [Leaflet](https://leafletjs.com/)
* [Axios](https://github.com/axios/axios)


## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
Install the latest version of `npm`

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/srossella/air-quality.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Build from source

   ```sh
   npm run build
   ```

4. Get a free API key at [Air Quality Open Data Platform](https://aqicn.org/data-platform/token/#/)

5. Create a .env file in the root folder with just one line:

   ```sh
   API_SECRET = 'your API key here'
   ```

6. Open `build/index.html`

## Usage

Search a specific location through the input box or through geolocation. 

Data displayed, when available, include:

* Air Quality Index 
* Comment on the level of the AQI like good, moderate, unhealthy, hazardous etc. taken from [AQICN](aqicn.org). 
* PM10
* PM2.5
* NO2
* O3


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Rossella Salaro - rossella.salaro@gmail.com

Project Link: [Air Quality](https://github.com/srossella/air-quality)

## Acknowledgements

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Air Pollution: Real-time Air Quality Index (AQI)](https://aqicn.org/)

[contributors-shield]: https://img.shields.io/github/contributors/srossella/air-quality?style=for-the-badge
[contributors-url]: https://github.com/srossella/air-quality/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/srossella/air-quality?style=for-the-badge
[forks-url]: https://github.com/srossella/air-quality/network/members
[stars-shield]: https://img.shields.io/github/stars/srossella/air-quality?style=for-the-badge
[stars-url]: https://github.com/srossella/air-quality/stargazers
[issues-shield]: https://img.shields.io/github/issues/srossella/air-quality?style=for-the-badge
[issues-url]: https://github.com/srossella/air-quality/issues
[license-shield]: https://img.shields.io/github/license/srossella/air-quality?style=for-the-badge
[license-url]: https://github.com/srossella/repo/air-quality/main/LICENSE.txt



