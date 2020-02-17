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

git log ：查看历史提交
	git log --author="用户名" ： 查看制定用户提交
	
git mv ：移动文件（status均显示重命名）
	git mv 旧文件名 新文件名 ：重命名
	git mv 旧文件名 文件夹/旧文件名 ：移动文件
	git mv 旧文件名 文件夹/新文件名 ：移动文件并重命名
	
	
git rm 文件名 ：删除该文件（文件commit后）
git rm --cached 移除缓存文件（不删除文件）
	git rm --cached 文件名 ：移除缓存的单个文件
	git rm --cached -r . ：移除所有缓存文件
	
git add	添加文件至缓存区(相当于写内容)
	git add 文件名 ：添加单个文件
	git add . ：添加所有文件
	 
git commit 提交文件（相当于确认保存）
	-m "文本" ：添加提示文件
	am "文本" ：相当于git add .和 git commit -m "文本"两步


```