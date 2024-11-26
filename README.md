# sistema-inventario

## Install node & npm
- install version 18 or greater
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
pnpm quasar dev
```

## Start the app in development mode and electron mode
```bash
pnpm quasar dev -m electron
```

### Build the app for production
```bash
pnpm quasar build
```

### Run tailwind
```bash
pnpm tailwindcss -i ./src/css/tailwind.css -o ./src/css/app.css --watch
```

### Run vue-mess-detector
```bash
pnpm vue-mess-detector analyze .
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
