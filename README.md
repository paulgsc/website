# Nice To Know

## Purpose

This document serves as a handy reference for various useful commands and techniques that can simplify and streamline your development workflow. Whether you're working with large repositories, managing branches, or tracking changes, these commands will help you navigate Git and other tools with ease.

## Cloning a Git Repository with Sparse Checkout

Sparse checkout allows you to clone and work with only a subset of a repository, which is especially useful when dealing with large repositories.

1. Clone the repository without checking out files:

   ```bash
   git clone --no-checkout --depth 1 https://github.com/username/repository.git
   ```

2. Change into the repository directory:

   ```bash
   cd repository
   ```

3. Initialize sparse checkout:

   ```bash
   git sparse-checkout init --cone
   ```

4. Specify the directories and files you want:

   ```bash
   git sparse-checkout set path/to/dir1 path/to/dir2 path/to/file1
   ```

5. Reapply sparse checkout settings:

   ```bash
   git sparse-checkout reapply
   ```

6. Checkout the specified files and directories:
   ```bash
   git checkout
   ```

## Additional Useful Commands

# Handling Subdirectories

If you also need to move subdirectories and their contents, you will need to use a more complex command since `move` in Windows Command Prompt does not handle directories by default. You can use `xcopy` for this:

## Move All Files and Directories from the Subdirectory to the Current Directory

Use `xcopy` to copy everything and then remove the original subdirectory.

````sh
xcopy <dir_name>\*.* . /s /e /h
rmdir /s /q <dir_name>


### Checking the Status of Your Repository

Check the current status of your repository to see which files are staged, unstaged, or untracked:

```bash
git status
````

### Run docker image on port 3000

```sh
sudo docker run -d -p 3000:3000 pgathondu/self-hosting-maishatu:latest
```

### Stop all containers

```sh
docker stop $(sudo docker ps -aq)
```

#### Remove all Docker containers from your system.

```sh
# Regardless of their state (running, stopped, or exited).
docker rm $(sudo docker ps -aq)
```

```sh
# same for images
 docker rmi $(sudo docker images -q)
```

### Remove All Stopped Containers

```sh
docker container prune -f
```

### Remove All Unused Images

```sh
docker image prune -a -f
```

### Removel all Unused Volumes

```sh
docker volume prune -f
```

### Remove all Unused Networks

```sh
docker network prune -f
```
