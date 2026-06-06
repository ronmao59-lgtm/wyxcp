# GitHub 上传与 Vercel 部署检查清单

## 1. 上传前本地检查

- [ ] `npm install` 通过
- [ ] `npm test` 通过
- [ ] `npm run lint` 通过
- [ ] `npm run build` 通过
- [ ] 首页可以访问
- [ ] 答题页可以完成全部题目
- [ ] 结果页可以访问
- [ ] 保存结果图正常
- [ ] 复制结果正常
- [ ] 重新测评正常
- [ ] 表达句没有占位符
- [ ] 48 小时行动没有自相矛盾文案

## 2. 必须上传的核心文件

上传项目根目录：

```text
C:\Users\RON\mrcode\wyxcp
```

核心上传内容：

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

`AGENTS.md` 可以上传，它记录了项目维护时需要遵守的 Next.js 规则。

## 3. 不要上传的内容

```text
.git/
node_modules/
.next/
.vercel/
out/
dist/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

还应避免上传：

- 系统临时文件
- npm/yarn/pnpm 调试日志
- 本机密钥
- 私人账号信息

## 4. 手动上传 GitHub

1. 打开 GitHub。
2. 新建一个空仓库。
3. 上传项目根目录中的代码和配置文件。
4. 确认没有上传“不要上传的内容”。
5. 如果使用 GitHub Desktop，确认 `.gitignore` 已生效。

项目维护工具默认不执行登录、创建仓库或 push 操作。

## 5. 手动部署 Vercel

1. 打开 Vercel。
2. 选择 Add New Project 或 Import Git Repository。
3. 选择刚上传的 GitHub 仓库。
4. Framework Preset 选择 Next.js。
5. Build Command 使用：

```text
npm run build
```

6. Output Directory 保持默认。
7. Node.js 使用 20 或更高版本。
8. 不需要配置环境变量。
9. 点击 Deploy。

## 6. 部署后检查

- [ ] 首页能正常打开
- [ ] 首页背景信息可以填写
- [ ] 可以进入答题页
- [ ] 20 道题可以正常作答
- [ ] 结果页雷达图正常
- [ ] 动态表达句正常
- [ ] 最小组合建议正常
- [ ] 48 小时行动正常
- [ ] 保存结果图正常
- [ ] 复制结果正常
- [ ] 刷新页面后 localStorage 数据仍可读取
- [ ] 手机和桌面端内容没有重叠

