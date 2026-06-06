# 项目维护规则

## 1. 项目目标

项目名称：AI一人公司不可替代性测评

这是一个纯前端 Next.js 测评应用。用户填写可选背景信息并完成 20 道题后，项目根据六个维度生成结果页、雷达图、行动建议、表达句、最小组合建议和分享卡。

项目不连接 AI API，不依赖数据库，不需要后端服务或环境变量。

## 2. 技术栈

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts
- html2canvas
- Vitest
- ESLint

运行环境要求：

```text
Node.js >= 20.9.0
```

## 3. 核心目录职责

```text
app/
  page.tsx             首页和背景信息输入
  quiz/page.tsx        答题流程
  result/page.tsx      结果页、复制结果、保存结果图
components/            页面通用组件
lib/
  background.ts        背景信息清洗和 localStorage 解析
  quiz-data.ts         六个维度、题目、维度优先级
  score.ts             分数计算和结果类型判断
  result-content.ts    结果类型基础文案
  report-content.ts    结果页动态文案生成规则
  *.test.ts            规则与功能测试
public/                静态资源
```

## 4. 不可随意修改的业务边界

除非用户明确要求，否则不要修改：

- 20 道测评题目
- 每道题所属维度
- 计分逻辑
- 结果类型判断
- 六维雷达图数据
- 保存结果图功能
- 已确认的页面文案

修改结果页文案时，应优先修改 `lib/report-content.ts`，不要把复杂生成规则直接写进页面组件。

## 5. 数据流程

### 背景信息

首页可选填写：

- `domain`：想做的方向或领域
- `audience`：最想服务的人群
- `problem`：人群最常遇到的问题
- `strength`：最能拿出来的能力或经验

本地存储键：

```text
ai-one-company-assessment-background
```

背景信息通过 `lib/background.ts` 清洗和解析。

### 答题结果

答题结果本地存储键：

```text
ai-one-company-assessment-answers
```

`lib/score.ts` 负责：

1. 校验 20 道题答案。
2. 计算六维分数和百分比。
3. 计算组合成熟度和总分。
4. 选出最高维度和最低维度。
5. 判断结果类型。

### 结果页

结果页读取背景信息和答题结果后，调用 `lib/report-content.ts` 生成：

- 雷达图解读
- 下一步打法
- 六维短卡片
- 不可替代性表达句
- 最小组合建议
- 48 小时具体行动

## 6. 动态结果生成规则

### 不可替代性表达句

生成结构：

```text
我不是最懂{domain}的人，
但我可能是更懂{audience}在{problem}这件事上，
如何用{strength}帮他们走出第一步的人。
```

空字段必须使用自然兜底：

- `domain`：这个方向
- `audience`：这类人
- `problem`：这个具体问题
- `strength`：你的经验和方法

界面和复制结果中不允许出现：

```text
【领域】
【具体场景】
【具体人群】
【具体结果】
____
```

### 最小组合建议

固定由三部分组成：

- 一个小场景：根据 `audience + problem` 生成
- 一个新能力：根据 `strength + domain` 生成
- 一个公开作品：根据最低维度生成

### 48 小时具体行动

生成公式：

```text
最高维度作为启动方式
+ 最低维度作为补强目标
+ 用户背景信息
+ 当前结果类型提示
```

行动固定为 4 步：

1. 从最高维度启动。
2. 针对最低维度补强。
3. 带入用户背景信息。
4. 发布并收集反馈。

同一个维度不能同时作为最高入口和最低短板。

所有分数相同时：

- 最高入口取排序前两个维度
- 最低维度取排序最后一个维度
- 不允许生成“用 X 启动，补 X 短板”一类自相矛盾文案

### 下一步打法

界面卡片标题固定为：

- 先从这里被看见
- 再把这里说清楚
- 最后先补这个洞

用户界面不显示“高分项 / 中分项 / 低分项”这类内部算法标签。

## 7. 客户端规则

以下功能必须只在客户端组件、点击事件或客户端初始化中运行：

- `window`
- `document`
- `localStorage`
- `navigator.clipboard`
- `html2canvas`

当前使用这些浏览器 API 的页面均已标记 `"use client"`。

## 8. 保存结果图规则

保存结果图由 `app/result/page.tsx` 中的 `html2canvas` 在浏览器端执行。

修改结果页样式时必须注意：

- 不要引入 html2canvas 不兼容的现代颜色函数。
- 保持 `.capture-safe` 背景和文字颜色明确。
- 修改结果页样式后运行 `npm test`，其中包含截图样式兼容测试。

## 9. 开发流程

每次修改建议按以下顺序：

1. 阅读相关文件和现有测试。
2. 如果涉及 Next.js API，先阅读 `node_modules/next/dist/docs/` 中对应文档。
3. 明确本次允许修改和禁止修改的边界。
4. 先补充或更新测试。
5. 实现最小必要修改。
6. 运行测试、lint 和生产构建。
7. 扫描占位符、本机路径、环境变量和旧文案。
8. 手动检查相关页面。

标准验证命令：

```bash
npm install
npm test
npm run lint
npm run build
```

Windows PowerShell 如果阻止 `npm.ps1`，使用：

```bash
npm.cmd install
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

## 10. 代码修改规则

- 保持 TypeScript 严格模式通过。
- 新的文案生成规则放在 `lib/report-content.ts`。
- 新的本地存储解析规则放在独立的 `lib/` 文件中。
- UI 组件尽量只负责展示和交互。
- 不添加没有实际用途的依赖。
- 不添加会失败的测试脚本。
- 不硬编码本机绝对路径。
- 不在代码中硬编码 `localhost`。
- 不引入不必要的后端 API。
- 不提交环境变量文件。

## 11. GitHub 和 Vercel 操作边界

默认只做本地项目整理。

未经用户明确要求，不执行：

- 登录 GitHub
- 创建 GitHub 仓库
- `git push`
- 连接 Vercel
- 创建或触发 Vercel 部署
- 上传任何代码到外部平台

项目维护完成后，只向用户说明手动上传和部署步骤。

