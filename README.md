# sistema-inventario

## Install node & npm
- https://nodejs.org/en/download/package-manager

## Install pnpm
```bash
npm install -g pnpm
```

## Install the dependencies
```bash
pnpm i
```

## Start the app in development mode and web mode
```bash
quasar dev
```

## Start the app in development mode and electron mode
```bash
quasar dev -m electron
```

### Build the app for production
```bash
quasar build
```

### Run tailwind
```bash
pnpm tailwindcss -i ./src/css/tailwind.css -o ./src/css/app.css --watch
```


### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
