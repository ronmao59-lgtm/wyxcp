# 本地工作记录

## 项目整理

项目已经整理为标准 Next.js App Router 项目结构：

```text
app/
components/
lib/
public/
```

根目录包含：

```text
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

已完成的发布前整理：

- 完善 `.gitignore`
- 使用 npm 官方 registry
- 声明 Node.js 最低版本
- 完善 README 手动上传和部署说明
- 移除远程 Google 字体构建依赖，改用系统字体
- 确认不需要环境变量
- 确认没有后端 API
- 确认没有本机绝对路径
- 确认没有代码硬编码 localhost

## 结果页优化记录

### 下一步打法

结果页不再直接向用户展示“高分项 / 中分项 / 低分项”。

展示顺序改为：

1. 先从这里被看见
2. 再把这里说清楚
3. 最后先补这个洞

已修复同一维度同时出现在入口和短板中的问题。

### 用户背景信息

首页增加可选背景信息：

- 方向/领域
- 服务人群
- 人群问题
- 能力/经验

背景信息保存到浏览器 `localStorage`，结果页读取后参与动态生成。

### 不可替代性表达句

表达句已经改成动态生成，并提供空字段自然兜底。

已移除以下占位符：

```text
【领域】
【具体场景】
【具体人群】
【具体结果】
____
```

### 最小组合建议

已改为根据用户背景信息和最低维度动态生成：

- 小场景
- 新能力
- 公开作品

### 48 小时具体行动

已改为根据以下信息动态生成：

- 最高维度
- 最低维度
- 用户背景信息
- 结果类型

行动结构固定为 4 步，并使用自然组合标题。

### 复制结果和分享卡

复制结果和分享卡已同步显示：

- 动态表达句
- 动态 48 小时行动标题
- 动态行动步骤
- 最低维度对应的作品或动作

## 构建稳定性

曾出现 `next/font/google` 在受限网络下下载字体失败的问题。

处理方式：

- 从 `app/layout.tsx` 移除 `next/font/google`
- 在 `app/globals.css` 使用系统字体栈

这可以避免本地或部署环境因 Google 字体连接失败而中断构建。

## 最近验证结果

最后一次发布前检查：

```text
npm install     通过
npm test        通过，17 个测试
npm run lint    通过
npm run build   通过
```

生产构建生成的路由：

```text
/
/_not-found
/quiz
/result
```

这些页面均为静态预渲染内容。

本地检查：

```text
http://localhost:3000         HTTP 200
http://localhost:3000/result  HTTP 200
```

## 已知事项

`npm audit` 报告 Next.js 内置 PostCSS 存在 2 个中等级依赖问题，审计结果显示当前没有可用修复。

这不是项目业务代码漏洞，不影响当前测试、构建和 Vercel 部署。后续升级 Next.js 时应重新运行 `npm audit`。

浏览器自动化检查曾受到本地 Windows 沙箱限制。遇到此情况时，应至少完成：

- 自动测试
- ESLint
- 生产构建
- 源码规则扫描
- 本地 HTTP 状态检查

