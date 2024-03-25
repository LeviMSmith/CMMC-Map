# CMMC-Map Frontend

This is a nextjs project that interfaces with the django backend to manage cmmc policy.

Like the backend, this is still heavily in development and probably won't as intended.

## Dependancies

The project uses [yarn](https://yarnpkg.com/) to manage dependancies. To install all dependancies, simply run `yarn`

## Running

### Development environment

Run `yarn dev`

This will run a development server most likely located at ![](http://localhost:3000) that will update as files are changed.

### Production environment

This is a work in progress as scripts/docker resources are still in development to run this with the backend seamlessly, but in the meantime you can copy .env.local.example to .env.local, modify to your liking and run `yarn build` and `yarn start`
