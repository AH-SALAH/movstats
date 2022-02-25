<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="/public/android-chrome-192x192.png" alt="Project logo"></a>
</p>

<h3 align="center">Movstats</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/AH-SALAH/movstats.svg)](https://github.com/AH-SALAH/movstats/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/AH-SALAH/movstats.svg)](https://github.com/AH-SALAH/movstats/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Movie DB stats demo assessment.
    <br> 
</p>

<p align="center" style="text-align: center;">
<a href="https://movstats.vercel.app/">App</a>
</p>

### 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Deployment](#deployment)
-   [Authors](#authors)
-   [Acknowledgments](#acknowledgement)

---

#### 🧐 About <a name = "about"></a>

This is a demo assessment by creating a website utilizing the moviedb api.
By adding functionalities like search, sort, rate, Using react, redux, scss.
Using d3js to demo the stats & get some stats for movies.

---

### 🏁 Getting Started <a name = "getting_started"></a>

#### Structure

```
.
├── components  ----------------> // single components
│   ├── Auth
│   │   └── useGuestAuth.jsx
│   ├── Card
│   │   ├── card.module.scss
│   │   └── index.jsx
│   ├── CustomHead
│   │   └── index.jsx
│   ├── Meta
│   │   └── index.jsx
│   ├── Nav
│   │   └── index.jsx
│   ├── Pagination
│   │   └── index.jsx
│   ├── Popover
│   │   └── index.jsx
│   ├── Skeletons
│   │   ├── Loading.jsx
│   │   └── ShimmerPlaceholder.jsx
│   ├── Slider
│   │   └── index.jsx
│   └── Sort
│       └── index.jsx
├── data  --------------------------> // data service & apis
│   ├── index.jsx
│   └── movies.jsx
├── layout -------------------------> // site layout 
│   ├── Details
│   │   ├── index.jsx
│   │   ├── LeftSlice.jsx
│   │   └── RightSlice.jsx
│   ├── Footer
│   │   └── index.jsx
│   ├── Header
│   │   ├── header.module.scss
│   │   └── index.jsx
│   ├── Main
│   │   └── index.jsx
│   ├── Stats
│   │   ├── Charts
│   │   │   ├── Barchart
│   │   │   │   └── index.jsx
│   │   │   └── useGradient.jsx
│   │   ├── index.jsx
│   │   └── StatsHeader.jsx
│   └── index.jsx
├── pages ---------------------------> // site pages/routes
│   ├── details
│   │   └── [slug]
│   │       └── [id].jsx
│   ├── _app.jsx
│   ├── _document.jsx
│   ├── index.jsx
│   └── stats.jsx
├── store --------------------------> // redux store
│   ├── features
│   │   ├── movies
│   │   │   └── moviesSlice.jsx
│   │   └── users
│   │       └── usersSlice.jsx
│   └── index.jsx
├── styles ------------------------> // global sass styles
│   └── global.scss
└── utils -------------------------> // utilities functions
    ├── AppConfig.js
    ├── formatCurrency.js
    ├── formatDate.js
    ├── formatMins.js
    └── slugify.js

```

##### documentation

###### Components : 
- Components which had been used throughout the app.
###### Data: 
- Server apis list to utilize throughout the app & the axios/http handler default instance.
###### Layout: 
- Main app layout like header, footer & content.
###### Pages: 
- The app pages or routes (mandatory for nextjs as it's being used as folder/file routing).
###### Store: 
- Redux store data slices/reducers+actions.
###### Styles: 
- Global styles and other styles may be imported in, also if sass in use could be other sass related files be here (e.g. mixins, vars, etc..). 
Other module css/sass files can be found in it's same module/component folder.
###### Utils: 
- Other helpers functions to use through the project (e.g. formaters, app config, slugify strings etc..)



---

#### Tech Used

This project using:

✔ React - Nextjs \
✔ Tailwind - to use just it's css utilities instead of bootstrap\
✔ scss\
✔ Redux\
✔ Redux-toolkit\
✔ D3js

---

#### Installing

-   clone repo & cd to it's folder & install yarn then

```
yarn install

// for dev
yarn dev

// for prod/build
yarn build
yarn start

then go to http://localhost:3000/

```

-   Don't forget Create .env.local file with credentials with those env var.\
    ** NEXT_PUBLIC_SITENAME\
    ** NEXT_PUBLIC_MOVIEDB_APIKEY\
    ** NEXT_PUBLIC_MOVIEDB_BASEURL\
    ** NEXT_PUBLIC_MOVIEDB_BASEIMGURL

---

#### 🚀 Deployment <a name = "deployment"></a>

It can be deployed any where staticly as there is no ssr used.
Deployed on vercel <a href="https://movstats.vercel.app/">App</a>

---

##### ✍️ Authors <a name = "authors"></a>

-   [@AH-SALAH](https://github.com/AH-SALAH)

---

#### 🎉 Acknowledgements <a name = "acknowledgement"></a>

Challenges had been met through.

-   getting charts do its drawing correctly from the first times, it needed some Patience & searching.
-   dealing with redux toolkit new syntax. "not much"

---

#### 🎈 Enhancement proposed <a name = "acknowledgement"></a>

may as TODO

-   Add persistant to the redux store\
    or may use reactQuery/swr to utilize their cache mechanizm.
-   maybe converting to typescript.
-   Add some tests.
-   UI enhancement.
-   dockerizing the app.

---

Thank you. \
*see also [facebook clone](https://github.com/AH-SALAH/facebook-clone) 🦆 
