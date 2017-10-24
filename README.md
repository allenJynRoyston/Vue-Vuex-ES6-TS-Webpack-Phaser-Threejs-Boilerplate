# Vue + ES6 / Webpack / Express4

### Install instructions:
```sh
$ git clone https://github.com/allenRoyston/weather-forecast-demo.git
$ cd weather-forecast-demo
$ npm install
$ gulp build
$ gulp  
OR
$ npm run dev
```

### When to use gulp vs npm run dev
Webpack won't instantiate the Express server, so any endpoints you need to access will be returned as a 404.  If you can don't need access to endpoints, I'd recommened npm run dev since it's much faster.  

### Deployment instructions:
```sh
$ gulp build
$ git push heroku master
```

### Deployment preview (what you see is what you'll get):
```sh
$ gulp build
$ npm start
```
