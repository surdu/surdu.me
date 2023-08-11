# My Website

Website is deployed at [surdu.me](https://surdu.me)

## Development

First, install the dependencies:

```bash
npm install
```

On Mac with Apple silicone, I had an error when `npm` tried to install `canvas`, so first I had to install the following with `brew`.

```bash
brew install pkg-config pixman cairo pango
```

Then you'll be able to run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Deployment is done automatically via [GitHub actions](/.github/workflows/pages.yml) when code is pushed to the `main` branch.
