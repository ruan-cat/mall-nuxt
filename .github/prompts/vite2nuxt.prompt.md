# nuxt 项目改造

在该对话中，我们将共同完成 vite 项目改造。我们最终的目的是为了把一个 vite 项目改造成 nuxt 项目。

## 参考项目

你的参考项目如下： https://github.com/antfu/vitesse-nuxt

## 被更改的项目

将本项目改造成 nuxt 项目，在本工作区内，相对路径地址如下：

frontend\apps\mall

该项目接下来将会被称呼为 `mall` ，即商城项目。

## 已有的项目基架

其相对路径为：

frontend\apps\nuxt

该项目接下来称呼为 `nuxt` 项目。

## 工作方式

我会引用 mall 项目的内容，然后由你做出修改。修改后的文件按照 nuxt 架构移动到 nuxt 项目内。

## 注意事项

### 注意修改目标

不要修改 mall 项目的源代码，mall 项目仍旧保持 vite 项目架构。

只修改 nuxt 项目的源代码。

### nuxt 项目本身就是来自模板的

nuxt 项目现在是时来自以下仓库的。本身就是已经可以使用的模板。

- https://github.com/antfu/vitesse-nuxt

### 每次修改确保可用

每次修改都要确保项目是可以用的。你的每次修改都要保证当前的 nuxt 项目是可以运行的，可以打包的。不要生成不可用的代码，以至于项目无法本地运行。

### 每次只在一个范围内做出迁移和修改

在 vite 项目迁移至 nuxt 项目时，会有很多迁移项，例如：

自动导入
修正类型错误
生成 layout 布局
……

请确保你每次只做一件事，不要多个内容一起做。

## `v-img-lazy` 自定义指令的改造方案

使用 Nuxt 的图片组件 NuxtImg。将项目内 img 标签，换成 NuxtImg 组件。

我们不直接使用 v-img-lazy 自定义指令来实现图片懒加载，而是使用 NuxtImg 实现图片懒加载。

当你遇到 mall 项目的组件出现了 v-img-lazy 自定义指令时，就自主使用 NuxtImg 实现图片懒加载。

## `store`状态的导入路径

在迁移基于 pinia 实现的状态变量时，请注意路径有变化。在 nuxt 项目内，store 存储的路径为 `app\composables\states`

## 路径别名

在你导入模块时，请先识别 nuxt 项目内的 `nuxt.config.ts` 文件，明确可用的路径别名以及路径别名的起始地址。在 nuxt 项目中，我们一律只使用统一的 `@` 作为起点。

在 nuxt 项目内，该导入路径是错误的：

```txt
@/app/apis/order
```

在 nuxt 项目内，该导入路径是正确的，请注意识别正确的导入路径：

```txt
@/apis/order
```

在 nuxt 项目内，导入模块的路径是没有多余的 `app` 路径的。

### 不要处理因为路径别名产生的 typescript 类型报错

请不要使用 `@/app/*` 的写法来导入模块，要使用 `@/*` 的写法。如果 ide 显示有类型报错，请不要去处理。nuxt 项目会正确的解析该路径。

## 组件名称

在 nuxt 项目中，我们用的是基于路径名的方式导入组件的。

比如 `<GoodsItem>` 组件，来自于`app\components\goods\Item.vue` ，这个组件命名就是正确的。

请不要改成 `<Item>` 写法，这个写法是错的，不是 nuxt 项目的组件导入方式。

## 参考信息

为了协助你完成 vite 项目转换成 nuxt 项目，我会提供给你一些关键内容，以便帮助你了解项目架构。

### mall 项目

- package.json

- main.ts

- vite.config.ts

- 路由配置文件
  src\router\index.ts

- 布局用的组件
  src\components\layout

### nuxt 项目

- nuxt.config.ts

## 边缘性质的改造

以下改造项收益率较低，改造可有可无。在大多数的改造项完成后，再考虑完成以下项目的改造。
