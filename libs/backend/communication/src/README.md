# Fluence TypeScript Template

## Usage

```sh
# Compile example aqua code to TypeScript
fluence aqua

# `cd` into `ts` directory
cd src/ts

# Install dependencies
npm i

# Run example code
npm start

# You can also deploy deal and run the deployed code

# Generate a service template and add it to the default worker
fluence service new myService

# Deploy the default worker
fluence deal deploy

# Uncomment `runDeployedServices` aqua function in `src/aqua/main.aqua` and compile it
fluence aqua

# Import `runDeployedServices` function in `src/ts/src/index.ts` and run it
npm start
```
