# blog
**blog** is a blockchain built using Cosmos SDK(v0.50.12) and Tendermint and created with [Ignite CLI](https://ignite.com/cli)(v28.8.1-dev).

## Get started

```
ignite chain build
ignite chain serve
```

---

## Interface Functionalities

### a. Create a Resource

```bash
blogd tx blog create-post hello world --from alice --chain-id blog
```


### b. List resources with basic filters

```bash
blogd tx blog create-post hello world --from alice --chain-id blog
```

### c. Get details of a resource

```bash
blogd q blog show-post 0
```

### d. Update resource details

```bash
blogd tx blog update-post "Hello" "Cosmos" 0 --from alice --chain-id blog
```

### e. Delete a resource

```bash
blogd tx blog delete-post 0 --from alice  --chain-id blog
```