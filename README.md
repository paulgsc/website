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

### Checking the Status of Your Repository

Check the current status of your repository to see which files are staged, unstaged, or untracked:

```bash
git status
```
