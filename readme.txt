vue2.0 创建前端项目：
1、vue项目依赖node.js npm，先安装node.js,
   校验是否已经安装：cmd下查看版本：node -v , npm -v , vue -v
2、安装vue
	npm install -g vue-cli //-g表示全局安装，vue-cli是模块，全局安装的模块可以在命令行直接使用
	npm网站在国内速度非常慢，所以可以在命令后面加上淘宝的镜像
	npm install -g vue-cli --registry=https://registry.npm.taobao.org （采用此命令）
	vue -V或者 vue --version查看是否安装成功
3、创建基于webpack项目框架，规划项目目录：D:\workspace\yinlian-res>
   cd进入到对应目录下：D:\workspace\yinlian-res>
   D:D:\workspace\yinlian-res>>vue init webpack yinlian-res（项目名称）
	安装过程如下：
	? Target directory exists. Continue? Yes
	'git' ????????????????????????е????
	?????????
	? Project name yinlian-res （项目名称）
	? Project description yinlian-res static res（项目描述）
	? Author yinlian （创建者）
	? Vue build
	? Runtime + Compiler: recommended for most users（选择此项）
	  Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere；
	? Install vue-router? Yes （是否使用vue-router）
	? Use ESLint to lint your code? Yes （代码语法规范检查的工具）
	? Pick an ESLint preset Standard（选择此项）
	? Set up unit tests No （单元测试）
	? Setup e2e tests with Nightwatch? No（单元测试）
	? Should we run `npm install` for you after the project has been created? (reco
	mmended) no （npm install 较慢，赞不安装）

	   vue-cli · Generated "csioss-admin-res".

	# Project initialization finished!
	# ========================

	To get started:

	  cd yinlian-res
	  npm install (or if using yarn: yarn)
	  npm run lint -- --fix (or for yarn: yarn run lint --fix)
	  npm run dev

	Documentation can be found at https://vuejs-templates.github.io/webpack
4、安装项目依赖包，npm较慢，使用淘宝镜像（安装模块都是在package.json定义的）
    npm install --registry=https://registry.npm.taobao.org
5、运行测试（流览器会自动跳转出界面http://localhost:8080/，也可以手动打开流览器器输入地址）
   npm run dev


====================================================================================================
npm相关命令：
查看配置
npm config list
设置配置
config set metrics-registry=https://registry.npm.taobao.org
config set registry=https://registry.npm.taobao.org

====================================================================================================
前端与web整合：
编译：
npm run build
编译后产生dist文件夹，只需把此文件夹放到webapp即可
cd命令：xcopy D:\workspace\yinlian-res\dist\*  D:\workspace\yinlian\WebRoot\reborn /E/I/D/Y
