# AI一人公司不可替代性测评

这是一个用于测评个人在市场中不可替代性壁垒的 Next.js 网页应用，包含首页、答题页、结果页、六维雷达图、结果长图保存、复制结果、重新测评等功能。

## 项目文档

- [项目维护规则](docs/PROJECT_MAINTENANCE_GUIDE.md)
- [本地工作记录](docs/WORK_LOG.md)
- [GitHub 上传与 Vercel 部署检查清单](docs/RELEASE_CHECKLIST.md)

## 本地运行

```bash
npm install
npm run dev
```

访问地址：

```text
http://localhost:3000
```

## 构建

```bash
npm run build
```

## 手动上传 GitHub

1. 打开 GitHub，新建一个空仓库。
2. 上传本项目根目录中的源代码和配置文件。
3. 不要上传 `node_modules`、`.next`、`.vercel`、`out`、`dist`、`.env*` 和 `.git`。
4. 如果使用 GitHub Desktop，请先确认 `.gitignore` 已生效。

## Vercel 部署说明

1. 把项目上传到 GitHub。
2. 在 Vercel 中选择 Import Git Repository。
3. 选择该 GitHub 仓库。
4. Framework Preset 选择 Next.js。
5. Build Command 使用 `npm run build`。
6. Output Directory 保持默认。
7. 不需要额外环境变量。
8. 点击 Deploy。

建议使用 Node.js 20 或更高版本。项目已在 `package.json` 中声明最低版本为 Node.js 20.9。

## 项目结构

```text
app/              Next.js App Router 页面
components/       页面组件
lib/              测评数据、计分逻辑、测试
public/           静态资源
package.json      项目脚本和依赖
next.config.ts    Next.js 配置
tsconfig.json     TypeScript 配置
eslint.config.mjs ESLint 配置
```

## 环境变量

本项目不需要配置环境变量。测评结果使用浏览器本地 `localStorage` 暂存，保存结果图功能在浏览器端执行。

## 上传范围

应上传当前项目根目录：

```text
C:\Users\RON\mrcode\wyxcp
```

需要上传的核心内容包括：

```text
app/
components/
docs/
lib/
public/
.gitignore
.npmrc
eslint.config.mjs
next.config.ts
package.json
package-lock.json
postcss.config.mjs
README.md
tsconfig.json
```

不要上传本地生成目录、环境变量文件和 Git 元数据。
