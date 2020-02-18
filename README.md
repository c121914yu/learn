# git

## 常见shell指令
```bash
Git Bash下执行
pwd 查看当前路径
cd 更改路径，相对路径或绝对路径，将文件夹拉入可生成绝对路径
	cd . ：当前路径
	cd .. ： 返回上一层
	cd ~ ：默认路径，用户路径
	cd / ：根路径
ls 查看当前文件夹的文件，文件夹为.../格式
	ls : 查看当前文件夹
	ls 文件夹名 ：查看文件夹里的文件
	ls -la ：查看可见/不可见文件
mkdir 名称 ： 创建文件夹
touch 名称.格式 ：创建文件
rm ： 删除文件/文件夹
	rm 文件名.格式 ：删除文件
	rm -rf 文件夹名 ： 强制删除文件夹
```

## Git配置
```bash
git config --list ：查看所有git配置
git config  user.name：查看git配置的用户名
git config --global user.name "名称" ： 配置用户名
git config --global user.email "邮箱" ： 配置邮箱
git help ：查询帮助
git help commit ：查询commit详细用法
```

## Git命令
### 查询指令
```bash
git init : 初始化git项目

git status 查看当前项目状态(不包含commit后)
	红色 ：未add的文件
		空 : 新增文件
		modified : 修改的文件
		deleted : 删除的文件
	绿色 ：已添加到缓存区(可commit)

git diff 查看修改的内容
	git diff : add前查看 
	git diff--staged ：add后commit前查看
	- : 删掉的内容
	+ ：新增的内容

git log ：查看提交信息
	git log --author="用户名" ： 查看制定用户提交
	--oneline ：简略查看提交信息
	--oneline --graph ：查看线图
	--oneline --graph --all : 查看所以分支线图
	--oneline --graph -n ：查看最近n次线图
	
git reflog : 查看历史提交简略信息及版本回退信息
```
### 文件操作指令
```bash
git mv ：移动文件（status均显示重命名）
	git mv 旧文件名 新文件名 ：重命名
	git mv 旧文件名 文件夹/旧文件名 ：移动文件
	git mv 旧文件名 文件夹/新文件名 ：移动文件并重命名
	
	
git rm 文件名 ：删除该文件（文件commit后）
git rm --cached 移除缓存文件（不删除文件）（撤销追踪）
	git rm --cached 文件名 ：移除缓存的单个文件
	git rm --cached -r . ：移除所有缓存文件
```

### 提交指令
```bash
git add	添加文件至缓存区(相当于写内容)
	git add 文件名 ：添加单个文件
	git add . ：添加所有文件
	
git checkout 返回修改前状态
	-- 文件名 ：指定返回add前状态，若原代码可用，修改后出现错误并且未提交，可以使用。
  -- . ：所有文件返回add前状态（都需要在add前使用）
	
git restore 从缓存区中撤销（不撤销追踪）
	--staged 文件名 ：指定文件撤销缓存
git reset HEAD 从缓存区中撤销
	文件名 ：指定文件撤销缓存
	. ：所有文件撤销缓存
	 
git commit 提交文件（相当于确认保存）
	-m "文本" ：添加提示文件
	-am "文本" ：相当于git add .和 git commit -m "文本"两步
```
### 版本控制
```bash
git reset --hard 版本倒退（会把新的版本删除，只保留倒退版本及更早版本）不推荐！
	v1 > v2 > v3 > v4
	git checkout v2 -- .
	v1 > v2
	HEAD^ ：倒退至上一个版本
	HEAD^^ ：倒退至上两个版本
	哈希值 ： 倒退至指定版本（不需要输入完整哈希值，通常前7位即可）
	ORIG_HEAD : 回到合并前状态
	
git checkout 恢复旧版本（不删除新版本）相当于文件复制
	v1 > v2 > v3 
	git checkout v1 -- .
	v1 > v2 > v3 > v1
	版本哈希值 -- 文件名 ： 指定文件恢复到旧版本
	版本哈希值 -- . ： 所有文件恢复到旧版本
```
### 远程仓库与本地仓库
```bash
git remote 
	-v 查看绑定的远程仓库
	add 远端名 远端地址 ：与远端仓库连接
	remove 远端名 ：与远端仓库解绑
	set-url 远端名 远端地址 ：修改remote地址

git clone 
	地址 项目名: 复制代码
	--no-checkout 地址 : 复制代码，不切换分支
	--bare 地址 ：裸文件
	
git fetch ：本地更新远端代码(包括分支更新)
	若拉取到信息到新的远端分支，可直接git checkout 分支名，自动创建新分支
	
git merge 远端名/分支：合并远端与本地代码

git pull 远端名 分支 ：git fetch + git merge 远端名/分支
	--allow-unrelated-histories : 强制合并
```
### 分支管理
```bash
git branch 分支管理
  空 ：查看本地分支
	-r : 查看远端分支
	-a : 查看本地及远程所以分钟
	
	分支名 ：创建分支(将原分支内容复制给新分支)
	分支名 删除时的哈希值 ：恢复删除的分支
	
	checkout 分支名 ：切换分支
	checkout -b 分支名 ：创建并切换至新分支
	
	-d 分支名 ：删除分支，需要切换至其他分支才可删除(只能删除合并了的分支)
	-D 分支名 ：强制删除分支(通常用来删除未合并的分钟)
	
	--merge ：查看已合并的分支，新建分支默认合并（若所在分支是为合并的也会显示，所以尽量在主分支中查看）
	--no-merge : 查看未合并分支
	
git push 远端名 --delete 分支名 ：删除远端分支
----------------------------
git branch | xargs git branch -d 删除当前分支外其他合并了的分支
git branch | xargs git branch -D 删除当前分支外所有分支

git branch --merged | egrep -v "(^\*|master|dev)" 查看除master和dev外已经合并的分支
git branch --merged | egrep -v "(^\*|master|dev)" | xargs git branch -d 删除除master和dev外已经合并的分支

git branch --no-merged | egrep -v "(^\*|master|dev)" 查看除master和dev外未合并的分钟
git branch --no-merged | egrep -v "(^\*|master|dev)" | xargs git branch -D 删除除master和dev外未合并的分钟
---------------------------
	
git merge 分支合并（需要合并到哪个分支，就切换到哪个分支下执行）
	通常本地合并分支时阻止快转机制，从远端合并时使用快转机制
	分支名 ：将指定分支合并到当前分支
	分支名 --no-ff : 阻止快转情况下合并,可以使线图更清晰
	分支名 --no-commit : 合并但是不提交，停留到commit前
	分支名 --squash ：将分支的提交忽略不显示在主线图上，不能与--no-ff同时使用。通常是用来做小功能测试，不影响主体的操作
	
冲突解决
1 git merge --abort ：取消本次合并
2 手动解决冲突后 git add . > git commit > 填写记录
```
### 仓库迁移
```bash
git remote set-url 远端名 远端地址 ：修改远端分支
git push --all 提交所有分支至新仓库
```