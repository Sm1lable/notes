# 开始`git`

## 本地操作

**本地追踪**

```bash
git add *
```

**撤销追踪**

```bash
git reset .
```

**提交**

```bash
git commit -m "<content>"
```

**查看分支**

```bash
git branch
```

**创建分支**

```bash
git branch <name>
```

**选择分支**

```bash
git checkout <name>
```

**删除分支**

```bash
git branch -d <name>
```

## 远程操作

**推送到远程仓库同名分支**

```bash
git push
```

**使用`-u`命令上传一个本地分支**
`origin`之后的参数为本地分支名称，远程仓库会新建一个同名分支

```bash
git push -u origin <name>

git push --set-upstream origin <name>
```

**将本地分支推送到远程指定分支**

```bash
git push origin <local-branch-name>:<remote-branch-name>
```

**查看远程分支**

```bash
git branch -r
```

**将远程分支拉取到本地同名分支**

```bash
git pull
```

**将指定的远程分支拉取到本地的当前分支**

```bash
git pull origin <branch-name>
```

**合并远程分支到本地**

```bash
git merge origin/<name>
```

**设置跟踪分支**
分支跟踪之后，使用`git pull`命令可以不用再指定分支名，`git`将自动合并到对应的分支

```bash
git branch -u <remote-branch-name>:<local-branch-name>

# 当前分支追踪指定远程分支
git checkout -t origin/<remote-branch-name>
```

**创建并追踪远程分支**

```bash
git checkout -b <local-branch-name> origin:<remote-branch-name>
```

**删除远程分支**

```bash
git push origin --delete <remote-branch-name>
```
