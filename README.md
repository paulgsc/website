# Nice To Know

## Cloning a Git Repository with Sparse Checkout

```bash
git clone --no-checkout --depth 1 https://github.com/username/repository.git
```

cd repository

```bash
git sparse-checkout init --cone
```

git sparse-checkout set path/to/dir1 path/to/dir2 path/to/file1
git sparse-checkout reapply
git checkout
